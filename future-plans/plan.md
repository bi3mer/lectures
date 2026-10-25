# Plan: Build the Site with No External Dependencies

Status: proposal, written 2026-10-25. No phase has started.

## Goal

Build and serve the course site with code from this repository only. Today `build.sh` calls Marp
(through npm), pandoc, rsync, and zip, and every CI run installs Node and downloads pandoc. After
this plan, one program written in this repository replaces `build.sh`, Marp, pandoc, rsync, and
zip. A small JavaScript file replaces Marp's slide viewer. Published pages load nothing from other
domains, apart from any exception kept on purpose under [Decisions](#decisions).

The phases follow the order you set: replace Marp and the build first, write the slide JavaScript
second, and revisit math last.

## Current External Dependencies

<!-- prettier-ignore -->
| Dependency | What it does | Where | Replaced in |
| --- | --- | --- | --- |
| Marp CLI 4.5.1, from npm through `npx` | Turns decks into HTML and PDF | `build.sh`, `run_marp` | Phases 2 to 4 |
| Node.js 22 | Runs Marp | `.github/workflows/pages.yml`, `setup-node` | Phase 7 |
| pandoc 3.10.2 | Turns pages into HTML, highlights their code | `build.sh`, `templates/page.html`, CI download | Phase 2 |
| rsync | Copies non-Markdown files into `_site/` | `build.sh` | Phase 1 |
| zip | Makes `cs230/data.zip` | `build.sh` | Phase 1 |
| Chrome, driven by Marp's puppeteer-core | Prints the 22 deck PDFs | `build.sh`, `--pdf` | Phase 5, decision D3 |
| Marp's default theme | Base type sizes, code colors, page numbers | `themes/lecture.css:20`, `@import 'default'` | Phase 3 |
| MathJax, inside Marp | Renders the one formula | `cs230/02-variables-and-statements.md:379` | Phase 8 |
| CodeMirror 5.65.16 from cdnjs | Code editor on the JavaScript exercises page | `cs213/js/exercises/index.html:9` and `:311-312`, `runner.js:21` | Phase 6 |
| Umami from cloud.umami.is | Counts page views | `build.sh`, `analytics` | Decision D4 |
| Bootstrap 5.3.8 and Bootswatch Minty from jsDelivr | Teaching examples | 38 HTML files under `cs213/`, `cs213/css/bootstrap.md` | Decision D5 |
| YouTube thumbnail from img.youtube.com | One slide image | `cs213/js/lecture-js.md:108` | Phase 6 |
| GitHub Actions `checkout`, `setup-node`, `upload-pages-artifact`, `deploy-pages` | CI and deploy | `.github/workflows/pages.yml` | Phase 7, decision D6 |

Three things that look like dependencies stay as they are:

- **Outbound links.** Links to starbucks.com in the examples and to GitHub folders on
  `cs213/index.html` are ordinary links. The three "Slides are made with Marp" credits need new
  text in Phase 9.
- **Absolute links to bi3mer.github.io.** These point at this site.
- **Prettier.** You run it through `npx` to format files, but the build never calls it.

## Decisions

### D1: Language for the Build Program

You named Common Lisp, [Goose](https://github.com/aardappel/goose), C, and Go. The table compares
them against what the program needs.

| Need                                               | Go                                           | C                                                          | Common Lisp (SBCL)                  | Goose                                                                                                                           |
| -------------------------------------------------- | -------------------------------------------- | ---------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Write `data.zip`                                   | `archive/zip` in the standard library        | Write a store-only zip writer with CRC-32, about 150 lines | Same as C                           | Same as C; the `binary` module writes the little-endian fields                                                                  |
| Build 4 files at a time                            | Goroutines                                   | pthreads                                                   | `sb-thread`, an SBCL extension      | `thread_spawn` workers and typed queues; needs `goose build` with gcc, because the in-process TinyCC backend cannot run threads |
| Walk and copy folders                              | `io/fs`, `path/filepath`                     | `nftw`, `open`, `read`, `write`                            | UIOP, which ships with SBCL's ASDF  | `os.list_dir`, `is_dir`, `read_file`, `write_file`; write a file copy and a recursive delete yourself                           |
| Strings and hash maps                              | Built in                                     | Write a string buffer and a hash map                       | Built in                            | `u8` arrays, the `dictionary` and `regex` modules                                                                               |
| Put the viewer JS and theme CSS inside the program | `embed`                                      | `#embed` (C23, GCC 15 or newer)                            | Read the files at build time        | Read the files at build time                                                                                                    |
| Serve `_site/` for local preview                   | `net/http`                                   | Write an HTTP server on sockets                            | `sb-bsd-sockets`, then write HTTP   | No networking in v1; call C sockets through `extern fn`                                                                         |
| On GitHub's `ubuntu-latest`                        | Preinstalled; confirm the version            | `gcc` preinstalled                                         | `apt-get install sbcl` on every run | Download the pinned release tarball on every run, as CI downloads pandoc today                                                  |
| On this machine                                    | Go 1.27.3                                    | gcc                                                        | SBCL 2.6.9                          | Goose v2026.2 (v2026.3 is out)                                                                                                  |
| Age                                                | Go 1.0 in 2012, with a compatibility promise | C89 onward                                                 | ANSI standard since 1994            | Repository created 2026-08-30; first release 2026-10-14, then two more in seven days                                            |

Goose's memory model shapes the program's design. A recursive function cannot keep growable data
across its recursive call, so the folder walk uses an explicit queue instead of recursion, and the
Markdown tree lives in one pool array with links between nodes. CommonMark's own parsing strategy
fits this model, since it keeps an explicit stack of open blocks and a stack of emphasis
delimiters.

Recommendation: Go, for the least code and the least risk. Everything the program needs is in the
standard library, so `go.mod` has no `require` lines. C needs a zip writer, hash map, string
buffer, and HTTP server written by hand. SBCL needs its own extensions for threads and sockets,
plus the same hand-written zip writer.

Goose is workable if you want to write the build in it. Its `os`, `dictionary`, and `regex`
modules cover files, folders, and the parser's tables. The costs are a hand-written zip writer, no
preview server without C, a toolchain download in CI, and a language eleven days past its first
release. Pin one release, and expect to update the program when Goose changes.

The rest of this plan says "the program" so it holds for any choice.

### D2: Presenter View and Overview

Marp's viewer has a presenter view (`p`: speaker notes, next slide, timer) and an overview (`o`: a
grid of slides). No deck has speaker notes. Every HTML comment in the decks is either
`<!-- prettier-ignore -->` or sits inside a code block. Without notes, presenter view shows only
the next slide and a timer.

Recommendation: leave both out of the first viewer, and add them if you miss them in class.

### D3: Deck PDFs

- **(a) Drop the PDF build step.** Each deck carries a print stylesheet, and students use the
  browser's Print, then Save as PDF. Students print from the live site, so links in their PDFs
  already point at the live site. That replaces `--base-url`, along with the one-deploy delay it
  causes for changed images. The cost: students make the PDF themselves, the index pages' PDF links
  change to a short "print this deck" note, and Safari has lagged other browsers on `@page` sizes,
  so it needs a check.
- **(b) Keep Chrome as the one build tool.** The program runs `chrome --headless --print-to-pdf`
  directly, with no puppeteer or npm. The PDFs stay as they are today.

Recommendation: (a), because (b) keeps a large external program in the build.

### D4: Analytics

GitHub Pages serves static files and gives no access logs, so no code in this repository can count
visits. Umami either stays as the single listed exception or goes.

Recommendation: remove it if you have not opened the Umami dashboard this term. Otherwise, keep it
and list it as the exception.

### D5: Bootstrap Examples

The slides in `cs213/css/bootstrap.md` teach students to paste the jsDelivr links, and the 38
example pages use those same links. Copying Bootstrap into the repository would make the examples
disagree with the slides.

Recommendation: keep them. They are course content that shows the CDN workflow; the build does not
use them.

### D6: GitHub's Own Actions

After Phase 7, CI uses only `checkout`, `upload-pages-artifact`, and `deploy-pages`, all published
by GitHub. Removing them means switching Pages to "Deploy from a branch" and pushing `_site/` to a
`gh-pages` branch with plain `git` in a `run:` step. That also needs `contents: write`.

Recommendation: keep the three actions. The site already depends on GitHub as its host.

### D7: Exercise Editor

CodeMirror gives the exercises page line numbers, Tab and Shift-Tab indenting, Ctrl-Enter or
Cmd-Enter to run, bracket matching, and JavaScript highlighting. `runner.js:21` already falls back
to the plain `<textarea>` when CodeMirror fails to load.

Recommendation: write the keys and line numbers first, and add JavaScript-only highlighting later.

## Target Design

### One Program

The program lives in `sitegen/`. `build.sh` shrinks to a wrapper (`go run ./sitegen build "$@"`
under Go), so `./build.sh` and the CI step keep working. The program takes over every job
`build.sh` does now:

- copy every non-Markdown file into `_site/`, with the same exclusions as the current `rsync` call;
- skip the files on the skip list (`README.md`, the `cs213` notes, and `future-plans/`);
- add the analytics tag to built pages and the four hand-written index pages, if D4 keeps it;
- zip each `*/data` folder with files at the top level, leaving out `*.md` and `.DS_Store`;
- build 4 files at a time, or `JOBS` at a time;
- rebuild only the named files when given paths, otherwise wipe and rebuild `_site/`.

It also adds one new job: `serve`, which serves `_site/` for local preview. Goose v1 has no
networking, so a Goose build would skip `serve` or reach C sockets through `extern fn`.

### Markdown Support

The program must produce what markdown-it (inside Marp) and pandoc's `gfm` reader produce today.
Both follow the CommonMark spec, so the parser implements CommonMark blocks and inlines, plus the
GitHub extensions the site uses:

| Feature                                | Use today                                                 | Note                                                              |
| -------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------- |
| Pipe tables                            | 434 table lines in pages, 417 in decks                    |                                                                   |
| HTML blocks with Markdown inside       | About 1,045 `<div>` tags in decks; 9 `<details>` in pages | CommonMark's seven HTML-block rules decide where Markdown resumes |
| Fenced code                            | python 587, js 228, css 167, html 132, text 95, bash 3    |                                                                   |
| Ordered and nested lists, block quotes | 128 ordered items and 11 quotes in decks                  |                                                                   |
| Bare URLs as links                     | Both renderers                                            | Marp sets `linkify: true`; `gfm` has autolinks                    |
| Strikethrough                          | 3 uses                                                    |                                                                   |
| Footnotes                              | 4 references, pages only                                  |                                                                   |
| Heading IDs                            | Pages only, e.g. `#which-rule-wins`                       | GitHub's ID rules                                                 |
| Single newline as `<br>`               | Decks only                                                | Marp sets `breaks: true`; pages keep newlines as spaces           |
| Marp image sizes, `![w:1000 alt](...)` | 13 images                                                 | Read `w:` and `h:` from the alt text so decks need no edits       |

Not needed: math (Phase 8), emoji shortcodes, smart quotes, and Marp directives beyond the front
matter (no deck uses any).

### Code Highlighting

The program highlights Python, JavaScript, CSS, HTML (including CSS and JavaScript inside
`<style>` and `<script>`), and Bash. `text` blocks stay plain. Decks get their code colors today
from Marp's default theme (highlight.js classes), with overrides in `themes/lecture.css` and
`themes/lecture-print.css`. Pages use pandoc's `breezedark` colors. Map the new token classes to
those same colors so neither surface changes.

### Deck HTML

```html
<main class="deck" data-total="50">
  <section id="1" data-page="1">…</section>
  <section id="2" data-page="2">…</section>
</main>
```

Each deck is one self-contained file with its CSS and viewer JavaScript inlined, as Marp's output
is today.

- **Slide breaks.** Split at `---` lines outside code fences. No deck has a `---` directly under a
  line of text, so no slide break turns into a CommonMark heading underline.
- **Slide links.** Numeric section IDs keep all 60 cross-deck links (`08-lists.html#27`) and 14
  in-deck links (`#15`) working unchanged. They work even without JavaScript, since the browser
  scrolls to the section.
- **Page numbers.** CSS reads `data-page` in `section::after`, replacing `paginate: true`.
- **Style cascade.** Marp prefixes theme styles and deck styles with the same container, so a
  deck's `<style>` wins ties against the theme, and `<style scoped>` wins against both. To keep
  that order:
  - rewrite the theme's leading `section` selectors as `.deck > section`;
  - prefix every selector in a deck-wide `<style>` with `.deck > section `;
  - prefix every selector in a `<style scoped>` with `.deck > section[id="N"] `.

  A bare `section` selector means the slide itself. None of the 200 scoped blocks uses an
  at-rule or nesting, so splitting selector lists at top-level commas is enough.

- **Theme.** Replace `@import 'default'` with the rules the decks rely on, copied from Marp's
  default theme (MIT license, so keep its notice in a comment). `lecture-print.css` imports
  `lecture`; the program resolves that import when it inlines the CSS.
- **Comments.** HTML comments pass through, and browsers ignore them. Marp turned comments into
  speaker notes, but no deck has real notes.
- **Front matter.** The program keeps detecting decks by `marp: true` until Phase 9, so both
  builds read the same files during comparison.

### Slide Viewer

The viewer is plain JavaScript with no libraries, roughly 200 to 300 lines (a guess). It matches
the Marp behavior that class and students rely on:

- show one slide at a time, scaling the 1280×720 canvas to the window with letterboxing;
- go forward with Right Arrow, Space, and Page Down; back with Left Arrow and Page Up; to the ends
  with Home and End;
- toggle fullscreen with `f`;
- read `#N` on load, update it on every move with `history.replaceState` (so Back leaves the deck
  instead of stepping through slides), and follow `hashchange` for in-deck links;
- change slides with a touch swipe;
- show previous, next, and fullscreen buttons when the mouse moves, as Marp's on-screen controls
  do.

Without JavaScript, the slides stack vertically at full size, readable and printable.

### Print Stylesheet

Under `@media print`, show every slide, one per page, with `@page { size: 1280px 720px; margin: 0 }`
and the colors from `themes/lecture-print.css`. This replaces Marp's `--pdf` under D3 (a), and
under (b) it is what headless Chrome prints.

## Phases

### Phase 0: Capture Reference Output

Before changing anything, run the current `./build.sh` and copy `_site/` to `_site-reference/`
(add it to `.gitignore`). Write a test in the program that pulls each slide's inner HTML out of
Marp's output (the `<section>` inside each `<foreignObject>`) and each page's `<main>` out of
pandoc's output. The test normalizes whitespace and strips highlighting spans so markup can be
compared without rendering.

Done when the reference covers all 22 decks (1,199 slides) and 13 pages.

### Phase 1: Program Skeleton

Implement copying, the skip list, analytics, zips, parallel builds, named-file builds, and the
`build.sh` wrapper. Markdown files are not built yet.

Done when `diff -r _site _site-reference` differs only in Markdown-built files, and `unzip -l`
lists the same entries for both copies of `cs230/data.zip`.

### Phase 2: Markdown and Pages

Write the parser, the highlighter, and page output with the variables `templates/page.html` uses
now: the page title from the first `# ` heading, `root`, `course`, and the highlighting CSS.

Done when each of the 13 pages matches the reference after normalization, or you have reviewed and
accepted each difference.

### Phase 3: Decks

Add slide splitting, numbered sections, the style cascade, the theme without `@import 'default'`,
`w:` image sizes, and single-newline breaks.

Done when every slide's normalized HTML matches the reference, and you have paged through each
deck beside its Marp version with nothing clipped at a slide edge. Fonts can wrap a few pixels
differently under CSS scaling than inside Marp's SVG, and the 61 scoped rules that shrink `pre`
show how tightly code is fit, so expect some slides to need a size adjustment.

### Phase 4: Slide Viewer

Write the viewer described above, inlined into every deck.

Done when the keys, `#N` links, swipe, and fullscreen work in Chrome, Firefox, and Safari, and a
sample of the 60 cross-deck links opens the right slide.

### Phase 5: PDFs

Under D3 (a), add the print stylesheet and change the PDF links on `cs213/index.html` and
`cs230/index.html` to a print note. Under (b), call headless Chrome from the program.

Done when a printed deck has one slide per page in the black-and-white theme.

### Phase 6: Other Runtime Dependencies

- Replace CodeMirror with a `<textarea>` editor in `cs213/js/exercises/runner.js`: Tab and
  Shift-Tab indent by two spaces, Ctrl-Enter or Cmd-Enter runs, and a gutter shows line numbers.
  Delete the CDN tags (`index.html:9`, `:311-312`) and the `.CodeMirror` rules from line 103.
- Replace the YouTube thumbnail at `cs213/js/lecture-js.md:108` with a local image or a text
  link to the video.
- Apply D4 to the analytics tag.

Done when `grep -rhoE '(src|href)="https?://[^"]+"' _site --include='*.html'` lists only outbound
links and the exceptions kept under D4 and D5.

### Phase 7: CI

Remove the `setup-node` step and the pandoc download from `.github/workflows/pages.yml`. Under Go,
check whether `go` is on `PATH` on `ubuntu-latest` and whether its version meets the `go` line in
`go.mod`. Set `GOTOOLCHAIN=local`, so a version mismatch fails the build instead of quietly
downloading a newer toolchain. Under Goose, download one pinned release
(`goose-v2026.N-linux-x64.tar.gz`), check its SHA-256 against a value stored in the workflow, and
run `goose build` with the runner's gcc. The Linux compiler needs glibc 2.35 or later, which
`ubuntu-latest` has.

Done when a push builds and deploys with no npm install or pandoc download in the log.

### Phase 8: Math

The only formula is `$|a - b| / ((a+b) / 2)$` at `cs230/02-variables-and-statements.md:379`. After
cutover it shows as raw text until this phase, unless you rewrite it as inline code during Phase 9.
Later options:

- keep it as inline code;
- teach the program a small TeX subset and output MathML, which current browsers render natively.

Recommendation: inline code, unless more formulas appear.

### Phase 9: Cutover and Cleanup

- Delete `run_marp`, the `npx`, `pandoc`, `rsync`, and `zip` checks, and `templates/page.html` if
  the template moved into the program.
- Rename the front matter key `marp: true` in all 22 decks (to `deck: true`, for example). Drop
  `theme:` and `paginate:` if the program ignores them.
- Remove `node_modules/` from `.gitignore`, and delete `_site-reference/`.
- Change the "Slides are made with Marp" line in `index.html`, `cs213/index.html`, and
  `cs230/index.html`.

## Risks

- **Silent layout changes.** A mismatch in CommonMark's HTML-block rules changes where Markdown is
  parsed inside a `<div>`, which can break a demo slide without any error. The Phase 0 reference
  is the guard.
- **Fit.** Slides are fit by hand to 1280×720. A new scaling method can push a line of code past
  the slide edge (Phase 3).
- **Maintenance.** The parser, highlighter, viewer, and editor become your code. Bugs that
  markdown-it, highlight.js, and CodeMirror fix upstream become yours to fix.

## Rough Size

These are guesses for sizing the work, not measurements.

| Part                                                   | Lines          |
| ------------------------------------------------------ | -------------- |
| Markdown parser (CommonMark plus the extensions above) | 1,500 to 2,500 |
| Highlighter for five languages                         | 400 to 700     |
| Copying, zips, parallel builds, `serve`                | 300 to 500     |
| Slide viewer                                           | 200 to 300     |
| Exercise editor                                        | 150 to 250     |
