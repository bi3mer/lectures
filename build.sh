#!/usr/bin/env bash
# Build the course site into _site/.
#
# Every file is copied over as is, except Markdown:
#   - a file whose front matter says `marp: true` becomes a slide deck (Marp)
#   - any other Markdown file becomes a web page (pandoc, templates/page.html)
# Either way, foo.md becomes foo.html next to where foo.md was, so links like
# `css/lecture-css.html` in the index pages work.
#
# Needs pandoc and Node. Run it from anywhere: ./build.sh
set -euo pipefail

cd "$(dirname "$0")"

out=_site
marp=(npx --yes @marp-team/marp-cli@4.5.1)

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

rm -rf "$out"
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

slides=()
pages=()
while IFS= read -r md; do
  md=${md#./}
  is_skipped "$md" && continue
  # A deck starts with front matter that turns Marp on.
  if head -n 10 "$md" | grep -q '^marp: true'; then
    slides+=("$md")
  else
    pages+=("$md")
  fi
done < <(find . -name '*.md' -not -path './.git/*' -not -path "./$out/*" -not -path '*/node_modules/*' | sort)

for md in "${slides[@]}"; do
  html="$out/${md%.md}.html"
  echo "slides  $md"
  # --html lets the decks' <div class="demo"> examples through.
  "${marp[@]}" --no-stdin --no-config-file --html --theme-set themes -o "$html" "$md" >/dev/null 2>&1 || {
    echo "error: marp failed on $md" >&2
    "${marp[@]}" --no-stdin --no-config-file --html --theme-set themes -o "$html" "$md"
    exit 1
  }
done

for md in "${pages[@]}"; do
  html="$out/${md%.md}.html"
  echo "page    $md"

  # Path back to the site root, e.g. "../../" for cs213/css/foo.md.
  depth=$(tr -cd '/' <<<"$md" | wc -c)
  root=$(printf '../%.0s' $(seq 1 "$depth"))
  course=${md%%/*}

  # The page title is the file's first heading.
  title=$(grep -m 1 '^# ' "$md" | sed 's/^# //')

  pandoc "$md" \
    --from gfm+footnotes \
    --to html5 \
    --standalone \
    --template templates/page.html \
    --syntax-highlighting=breezedark \
    --metadata pagetitle="${title:-${md##*/}}" \
    --variable root="$root" \
    --variable course="$course" \
    --output "$html"
done

echo "built ${#slides[@]} slide decks and ${#pages[@]} pages into $out/"
