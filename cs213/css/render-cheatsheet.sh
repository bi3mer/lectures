#!/usr/bin/env bash
# Render cheatsheet-css.md to cheatsheet-css.pdf.
# Markdown -> HTML with pandoc, then HTML -> PDF with headless Chromium.
set -euo pipefail

cd "$(dirname "$0")"

for tool in pandoc chromium; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "error: $tool is not installed or not on PATH" >&2
    exit 1
  fi
done

in=cheatsheet-css.md
html=cheatsheet-css.html
pdf=cheatsheet-css.pdf

style=$(mktemp --suffix=.html)
trap 'rm -f "$style" "$html"' EXIT

cat > "$style" <<'CSS'
<style>
  body { font-family: Georgia, serif; font-size: 11pt; line-height: 1.4; max-width: 100%; margin: 0; padding: 0; }
  h1 { font-size: 20pt; margin-top: 0; }
  h2 { font-size: 15pt; border-bottom: 1px solid #999; padding-bottom: 2px; margin-top: 18pt; }
  h3 { font-size: 12pt; margin-top: 12pt; }
  code { font-family: "DejaVu Sans Mono", monospace; font-size: 9.5pt; background: #f2f2f2; padding: 0 2px; }
  pre { background: #f2f2f2; padding: 6px 8px; font-size: 9.5pt; overflow-x: auto; page-break-inside: avoid; }
  pre code { background: none; padding: 0; }
  table { border-collapse: collapse; width: 100%; margin: 6pt 0; font-size: 10pt; page-break-inside: avoid; }
  th, td { border: 1px solid #bbb; padding: 3px 6px; text-align: left; vertical-align: top; }
  th { background: #e8e8e8; }
  a { color: #1a4d8f; text-decoration: none; }
  h2, h3 { page-break-after: avoid; }
  @page { size: letter; margin: 1.5cm; }
</style>
CSS

pandoc "$in" -s --metadata pagetitle="CSS Cheatsheet" -H "$style" -o "$html"

chromium --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$pdf" "$html" 2>/dev/null

echo "wrote $pdf"
