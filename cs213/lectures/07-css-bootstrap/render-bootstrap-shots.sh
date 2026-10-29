#!/usr/bin/env bash
# Screenshot the pages in examples/bootstrap/ for the slides in lecture.md.
# The slides cannot load Bootstrap themselves (it would restyle the whole deck), so each
# Bootstrap demo is a real page, and the slide shows a picture of it.
#
# Each `shot` line below is: output name, page, window size, and an optional sed script.
#   - A size of "560" means 560px wide; the empty space below the content is trimmed off.
#   - A size of "560x120" means exactly that window, scrollbars included, with no trimming.
#   - The sed script edits a copy of the page first (a dark or Bootswatch version, say),
#     so a variant does not need its own file.
# The pages load Bootstrap from the CDN, so this needs a network connection.
set -euo pipefail

cd "$(dirname "$0")"

for tool in chromium magick sed; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "error: $tool is not installed or not on PATH" >&2
    exit 1
  fi
done

src=examples/bootstrap
out=examples/bootstrap/shots
mkdir -p "$out"

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# Cut the rows below the content, keeping 16px (32 device pixels) of the page's background.
trim_bottom() {
  local png=$1
  local bg geom h y w total keep
  bg=$(magick "$png" -format '%[pixel:p{0,h-1}]' info:)
  geom=$(magick "$png" -bordercolor "$bg" -border 1 -fuzz 3% -format '%@' info:)
  h=${geom#*x}
  h=${h%%+*}
  y=${geom##*+}
  w=$(magick identify -format '%w' "$png")
  total=$(magick identify -format '%h' "$png")
  keep=$((y - 1 + h + 32))
  if ((keep > total)); then keep=$total; fi
  magick "$png" -crop "${w}x${keep}+0+0" +repage "$png"
}

shot() {
  local name=$1 page=$2 size=$3 edit=${4:-}
  local file="$src/$page" width height trim=yes
  if [[ $size == *x* ]]; then
    width=${size%x*}
    height=${size#*x}
    trim=no
  else
    width=$size
    height=1600
  fi
  if [[ -n $edit ]]; then
    file="$src/.shot-$name.html"
    sed "$edit" "$src/$page" >"$file"
  fi
  chromium --headless --disable-gpu --user-data-dir="$tmp/profile" \
    --force-device-scale-factor=2 --virtual-time-budget=4000 \
    --window-size="$width,$height" --screenshot="$out/$name.png" \
    "file://$PWD/$file" >/dev/null 2>&1
  if [[ -n $edit ]]; then rm -f "$file"; fi
  if [[ $trim == yes ]]; then trim_bottom "$out/$name.png"; fi
  echo "wrote $out/$name.png"
}

# Swap Bootstrap's stylesheet for a Bootswatch theme, and drop the integrity hash that
# belonged to Bootstrap's file.
bootswatch() {
  echo "s#npm/bootstrap@5.3.8/dist/css/bootstrap.min.css#npm/bootswatch@5.3.8/dist/$1/bootstrap.min.css#;/sha384-sRIl/d"
}

# Why Bootstrap exists: last lecture's grid page at desktop width, which a phone shrank to fit.
shot phone-980 ../../../06-css-layout/examples/layout/grid.html 980
# The same page on a phone that has the viewport line.
shot phone-375 ../../../06-css-layout/examples/layout/grid.html 375x420

# Adding Bootstrap
shot reboot-before reboot-before.html 560
shot reboot-after reboot-after.html 560
shot link-btn link-btn.html 560

# The grid
shot grid-three grid-three.html 560
shot grid-twelve grid-twelve.html 1000
shot grid-3-6-3 grid-3-6-3.html 560
shot grid-exercise grid-exercise.html 560
shot grid-auto grid-auto.html 560
shot grid-nested-phone grid-nested.html 375
shot grid-nested-tablet grid-nested.html 800
shot grid-nested-laptop grid-nested.html 1100
shot grid-wrap grid-wrap.html 560

# Responsive layouts
shot reviews-col-4-phone reviews-col-4.html 375
shot reviews-col-4-laptop reviews-col-4.html 1000
shot reviews-col-md-4-phone reviews-col-md-4.html 375
shot reviews-col-md-4-laptop reviews-col-md-4.html 1000
shot cards-col-phone cards-responsive.html 375 's/col-md-6 col-lg-3/col/'
shot cards-col-laptop cards-responsive.html 1100 's/col-md-6 col-lg-3/col/'
shot cards-phone cards-responsive.html 375
shot cards-tablet cards-responsive.html 800
shot cards-laptop cards-responsive.html 1100
shot containers containers.html 1280

# Buttons: the browser's default (no Bootstrap at all), then Bootstrap's.
shot button-plain button.html 560 '/<link/,/\/>/d;s/ class="btn btn-primary"//'
shot button-btn button-btn.html 560
# The navbar before navbar-expand-md: the brand alone, then the links.
shot navbar-brand navbar-plain.html 560 '/<ul/,/<\/ul>/d'
shot navbar-plain navbar-plain.html 900
shot navbar-phone navbar.html 375
shot navbar-phone-open navbar.html 375 's/class="collapse navbar-collapse"/class="collapse navbar-collapse show"/'
shot navbar-laptop navbar.html 900
shot blog-phone-ad blog.html 375 's/ d-none d-md-block//'
shot blog-phone blog.html 375

# Gutters
shot gutters-inner gutters-inner.html 560
shot gutters-sizes gutters-sizes.html 560
shot gutters-rows gutters-rows.html 560
shot gutters-rows-gy gutters-rows-gy.html 560
shot gutters-one-row gutters-one-row.html 560
shot gutters-margin gutters-margin.html 560
shot gutters-no-container gutters-no-container.html 560x110
shot gutters-with-container gutters-inner.html 560x110
shot gutters-exercise gutters-exercise.html 560

# Tables
shot table-plain table-plain.html 560
shot table-striped-wrong table-striped-wrong.html 560
shot table-thead table-thead.html 560
shot table-variants table-variants.html 1000
shot table-rebuild table-rebuild.html 560
shot table-context table-context.html 560
shot table-wide-page table-wide.html 375x360 's/<div class="table-responsive">/<div>/'
shot table-wide-responsive table-wide.html 375x360

# Themes
shot buttons buttons.html 900
shot blog blog.html 1100
shot blog-dark blog.html 1100 's/<html lang="en">/<html lang="en" data-bs-theme="dark">/'
shot blog-coffee blog-coffee.html 1100
# One window size for all four, so they line up on the slide.
for theme in minty sketchy vapor journal; do
  shot "blog-$theme" blog.html 1100x500 "$(bootswatch "$theme")"
done
