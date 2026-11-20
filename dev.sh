#!/usr/bin/env bash
# Serve the site from _site/ and rebuild it as files change, with the browser
# reloading on its own after each rebuild. A dev version of build.sh: no PDFs.
#
#   ./dev.sh          build the site if _site/ is missing, then watch
#   ./dev.sh --fresh  rebuild the whole site first, e.g. after a git pull
#
# Then open http://localhost:3000. Stop it with Ctrl-C.
#
# What a change rebuilds:
#   - a Markdown file: that file, through ./build.sh --no-pdf
#   - anything in themes/: every deck, since each one embeds its theme
#   - any other file (images, data, CSS): copied into _site/ as is
# A draft in build.sh's skip list gets built when you save it. That only
# touches your local _site/; the deploy runs build.sh from scratch.
#
# Needs Node (for the watcher and browser-sync) plus what build.sh needs.
set -uo pipefail

repo=$(cd "$(dirname "$0")" && pwd)
cd "$repo"

out=_site
port=${PORT:-3000}

if [[ "${1:-}" == --fresh || ! -d "$out" ]]; then
  ./build.sh --no-pdf || echo "warning: the first build had errors, watching anyway" >&2
fi

# Every slide deck, as paths from the repo root.
all_decks() {
  find . -name '*.md' -not -path './.git/*' -not -path "./$out/*" -not -path '*/node_modules/*' |
    sed 's|^\./||' |
    while IFS= read -r md; do
      head -n 10 "$md" | grep -q '^marp: true' && echo "$md"
    done
}

# Copy everything that isn't Markdown, the same way build.sh does.
sync_assets() {
  rsync -a \
    --exclude='.git/' --exclude='.github/' --exclude="$out/" \
    --exclude='node_modules/' --exclude='templates/' \
    --exclude='*.md' --exclude='build.sh' --exclude='dev.sh' --exclude='.gitignore' \
    ./ "$out/"
}

# Rebuild for one batch of changed paths.
rebuild() {
  local file md mds=() themes=0 assets=0
  for file in "$@"; do
    [[ -e "$file" ]] || continue   # deleted, or an editor's temp file
    if [[ "$file" == themes/* ]]; then
      themes=1
    elif [[ "$file" == *.md ]]; then
      mds+=("$file")
    else
      assets=1
    fi
  done

  if (( themes )); then
    mds=()
    while IFS= read -r md; do mds+=("$md"); done < <(all_decks)
  fi

  # build.sh copies the other files too, so a Markdown build covers assets.
  if (( ${#mds[@]} > 0 )); then
    ./build.sh --no-pdf "${mds[@]}" || echo "error: rebuild failed, fix it and save again" >&2
  elif (( assets )); then
    echo "copy    other files"
    sync_assets
  fi
}

# browser-sync serves _site/ and reloads the page when anything in it changes.
# The debounce waits for a rebuild to finish writing before reloading.
npx --yes browser-sync@3.0.4 start \
  --server "$out" --files "$out" --port "$port" \
  --reload-debounce 500 --no-notify --no-open --no-ui --listen localhost &
server=$!
trap 'kill "$server" 2>/dev/null' EXIT

# Node's recursive fs.watch needs no install. It prints each changed path
# followed by a NUL, waits until saves stop for 300 ms, and then prints an
# empty path to end the batch.
node -e '
const fs = require("fs");
const skip = /^(\.git|_site|node_modules)(\/|$)|(^|\/)\.DS_Store$|~$|\.sw.$/;
let changed = new Set();
let timer;
fs.watch(".", { recursive: true }, (event, file) => {
  if (!file || skip.test(file)) return;
  changed.add(file);
  clearTimeout(timer);
  timer = setTimeout(() => {
    for (const f of changed) process.stdout.write(f + "\0");
    process.stdout.write("\0");
    changed = new Set();
  }, 300);
});
' | {
  batch=()
  while IFS= read -r -d '' file; do
    if [[ -n "$file" ]]; then
      batch+=("$file")
    else
      rebuild ${batch[@]+"${batch[@]}"}
      batch=()
    fi
  done
}
