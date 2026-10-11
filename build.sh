#!/usr/bin/env bash
# Build the course site into _site/.
#
# Every file is copied over as is, except Markdown:
#   - a file whose front matter says `marp: true` becomes a slide deck (Marp)
#   - any other Markdown file becomes a web page (pandoc, templates/page.html)
# Either way, foo.md becomes foo.html next to where foo.md was, so links like
# `css/lecture-css.html` in the index pages work.
#
# Needs pandoc and Node. Run it from anywhere:
#   ./build.sh                              rebuild the whole site from scratch
#   ./build.sh cs230/string-cheatsheet.md   rebuild only the named files
#
# Files build 4 at a time. Set JOBS to change that, e.g. JOBS=1 ./build.sh.
set -euo pipefail

repo=$(cd "$(dirname "$0")" && pwd)

# Named files, as paths from the repo root. Resolve them before the cd below,
# so paths relative to wherever the script was run from still work.
targets=()
for arg in "$@"; do
  if [[ "$arg" != *.md || ! -f "$arg" ]]; then
    echo "error: $arg is not a Markdown file" >&2
    exit 1
  fi
  abs="$(cd "$(dirname "$arg")" && pwd)/$(basename "$arg")"
  if [[ "$abs" != "$repo"/* ]]; then
    echo "error: $arg is not inside $repo" >&2
    exit 1
  fi
  targets+=("${abs#"$repo"/}")
done

cd "$repo"

out=_site
workers=${JOBS:-4}

# Not named `marp`: this function gets exported, and where sh is bash, the
# shell npx starts to run the real `marp` would call this function instead,
# which calls npx again, forever.
run_marp() {
  npx --yes @marp-team/marp-cli@4.5.1 "$@"
}

# Notes and drafts that aren't pages on the site.
skip=(
  README.md
  cs213/css/useful-but-not-covered.md
  cs213/js/plans.md
  cs213/js/temp.md
  cs213/js/todo.md
)

for tool in pandoc npx rsync; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "error: $tool is not installed or not on PATH" >&2
    exit 1
  fi
done

# A full build starts from scratch so deleted files don't linger. A build of
# named files leaves the rest of the site alone.
if (( $# == 0 )); then
  rm -rf "$out"
fi
mkdir -p "$out"

# Everything that isn't Markdown or part of the build itself.
rsync -a \
  --exclude='.git/' --exclude='.github/' --exclude="$out/" \
  --exclude='node_modules/' --exclude='templates/' \
  --exclude='*.md' --exclude='build.sh' --exclude='.gitignore' \
  ./ "$out/"

is_skipped() {
  local f
  for f in "${skip[@]}"; do
    [[ "$1" == "$f" ]] && return 0
  done
  return 1
}

# Build one file. xargs runs this in a fresh bash, so everything it uses is
# exported below.
build_one() {
  local kind=$1 md=$2
  local html="$out/${md%.md}.html"

  if [[ "$kind" == slides ]]; then
    echo "slides  $md"
    # --html lets the decks' <div class="demo"> examples through.
    local log
    if ! log=$(run_marp --no-stdin --no-config-file --html --theme-set themes -o "$html" "$md" 2>&1); then
      echo "error: marp failed on $md" >&2
      echo "$log" >&2
      return 1
    fi
    return 0
  fi

  echo "page    $md"

  # Path back to the site root, e.g. "../../" for cs213/css/foo.md.
  local depth root course title
  depth=$(tr -cd '/' <<<"$md" | wc -c)
  root=$(printf '../%.0s' $(seq 1 "$depth"))
  course=${md%%/*}

  # The page title is the file's first heading.
  title=$(grep -m 1 '^# ' "$md" | sed 's/^# //' || true)

  pandoc "$md" \
    --from gfm+footnotes \
    --to html5 \
    --standalone \
    --template templates/page.html \
    --syntax-highlighting=breezedark \
    --metadata pagetitle="${title:-${md##*/}}" \
    --variable root="$root" \
    --variable course="$course" \
    --output "$html" || {
    echo "error: pandoc failed on $md" >&2
    return 1
  }
}
export -f run_marp build_one
export out

# With no files named, build every Markdown file that isn't skipped.
if (( ${#targets[@]} == 0 )); then
  while IFS= read -r md; do
    md=${md#./}
    is_skipped "$md" || targets+=("$md")
  done < <(find . -name '*.md' -not -path './.git/*' -not -path "./$out/*" -not -path '*/node_modules/*' | sort)
fi

slides=()
pages=()
for md in "${targets[@]}"; do
  # A deck starts with front matter that turns Marp on.
  if head -n 10 "$md" | grep -q '^marp: true'; then
    slides+=("$md")
  else
    pages+=("$md")
  fi
done

# Download Marp once before the parallel builds start. Several npx calls
# downloading it at the same time can trip over each other, and CI always
# starts with an empty cache.
if (( ${#slides[@]} > 0 )); then
  run_marp --version >/dev/null || {
    echo "error: could not run Marp through npx" >&2
    exit 1
  }
fi

# Decks go first since they take longest. xargs finishes the other files after
# a failure, then exits non-zero.
{
  for md in "${slides[@]}"; do printf 'slides\0%s\0' "$md"; done
  for md in "${pages[@]}"; do printf 'page\0%s\0' "$md"; done
} | xargs -0 -n 2 -P "$workers" bash -c 'set -euo pipefail; build_one "$@"' _ || {
  echo "error: build failed, see the errors above" >&2
  exit 1
}

echo "built ${#slides[@]} slide decks and ${#pages[@]} pages into $out/"
