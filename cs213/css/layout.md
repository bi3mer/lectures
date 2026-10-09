---
marp: true
theme: lecture
paginate: true
---

<style>
/* Layout demos are mini pages built from <div class="header"> and friends, because the
   slide renderer strips real <header> and <footer> tags. The colors make the boxes
   visible; they are not layout. */
.demo,
.plain {
  width: 720px;
  font-size: 18px;
  line-height: 1.4;
  font-family: Georgia, "Times New Roman", serif;
  display: flow-root; /* keeps a demo's floats inside the demo */
}
.demo .header, .demo .footer { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); }
.demo .nav, .demo .ad { background-color: rgb(230, 201, 168); }
.demo .article { background-color: rgb(251, 243, 232); }
.padded .header, .padded .nav, .padded .article, .padded .ad, .padded .footer { padding: 10px; }
.padded * { box-sizing: border-box; }
.demo h1, .demo h2, .plain h1, .plain h2 { border: none; color: inherit; padding: 0; }
.demo h1 { font-size: 1.3em; margin: 4px 0; }
.demo h2 { font-size: 1.1em; margin: 4px 0; }
.demo p { margin: 4px 0; }
.demo ul { margin: 4px 0; padding-left: 1.4em; }
.demo li + li { margin-top: 0; }
.demo a { color: rgb(138, 75, 31); }
.demo.phone { width: 360px; }

/* The unstyled page, drawn the way a browser draws it. */
.plain { font-size: 13px; font-family: "Times New Roman", serif; }
.plain h1 { font-size: 2em; margin: 0.5em 0; }
.plain h2 { font-size: 1.5em; margin: 0.5em 0; }
.plain p, .plain ul { margin: 0.5em 0; }
.plain ul { padding-left: 40px; }
.plain li + li { margin-top: 0; }
.plain a { color: rgb(0, 0, 238); text-decoration: underline; }

/* A table used for layout. Undo the slide theme's table styling and go back to the
   browser's defaults; each table slide adds its own layout rules in a scoped style. */
.demo table { display: table; margin: 0; border-collapse: separate; border-spacing: 2px; overflow: visible; }
.demo td { border: none; padding: 6px 10px; vertical-align: middle; }
.demo tr, .demo tr:nth-child(2n) { background-color: transparent; border-top: none; }
.demo td.head { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); }
.demo td.side { background-color: rgb(230, 201, 168); }
.demo td.main { background-color: rgb(251, 243, 232); }

/* The dashed box stands in for the browser window. */
.window { height: 330px; outline: 2px dashed rgb(138, 75, 31); margin-bottom: 20px; }

/* Numbered boxes for the grid slides. */
.boxes { width: 720px; font-size: 22px; line-height: 1.3; }
.boxes div { background-color: rgb(230, 201, 168); border: 2px solid rgb(138, 75, 31); padding: 6px 10px; text-align: center; }

/* Code (and a property table) beside a demo, or two demos beside each other. */
.side-by-side { display: grid; grid-template-columns: 560px minmax(0, 1fr); gap: 24px; align-items: start; }
.side-by-side .demo, .side-by-side .boxes { width: auto; }
.side-by-side .demo.phone { width: 360px; }
.side-by-side table { margin-top: 0; }
.two-demos { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
.two-demos .demo, .two-demos .boxes { width: auto; }
.laptop-phone { grid-template-columns: minmax(0, 1fr) 360px; }
.laptop-phone .demo.phone { width: 360px; }

/* The target layout, drawn small. */
.sketch { display: grid; width: 340px; font-size: 14px; gap: 4px; grid-template-columns: 1fr 3fr 1fr; grid-template-areas: "header header header" "nav article aside" "footer footer footer"; }
.sketch div { padding: 8px; text-align: center; }
.sketch .header, .sketch .footer { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); }
.sketch .header { grid-area: header; }
.sketch .footer { grid-area: footer; }
.sketch .nav, .sketch .aside { background-color: rgb(230, 201, 168); }
.sketch .nav { grid-area: nav; }
.sketch .aside { grid-area: aside; }
.sketch .article { background-color: rgb(251, 243, 232); grid-area: article; padding-bottom: 60px; }
</style>

# CSS: Layout

Colan Biemer

---

## The Page So Far

<div class="side-by-side">
<div class="plain">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="aside">Ad</div>
</div>
<div class="sketch">
<div class="header">header</div>
<div class="nav">nav</div>
<div class="article">article</div>
<div class="aside">ad</div>
<div class="footer">footer</div>
</div>
</div>

We have learned how to make the website on the left, but what we want is for our page to be in the format of what we see on the right. This format is known as the ["holy grail" layout](https://alistapart.com/article/holygrail/). (It earned the name because it used to be incredibly difficulty to build, but, as we'll see, that isn't the case today.)

---

## Review: Block Boxes Stack

<style scoped>
.plain { width: 1000px; font-size: 20px; }
.plain .box { border: 4px solid red; padding: 2px 6px; }
</style>

<div class="plain">
<p class="box">A paragraph is a block box. It takes the full width of its parent, even when the text is short.</p>
<p class="box">A <span class="box">span</span> is an inline box. It is only as wide as its content, and it sits in the line of text with the words around it.</p>
</div>

---

## Review: Block Boxes Stack (Continued)

| Block boxes                                         | Inline boxes                                 |
| --------------------------------------------------- | -------------------------------------------- |
| `<h1>`, `<p>`, `<ul>`, `<li>`, `<div>`, `<section>` | `<a>`, `<span>`, `<img>`, `<strong>`, `<em>` |

A block box starts on a new line and takes the full width. Every region of the page is a block box, so each one lands under the one before it: the page is a **stack** of boxes, top to bottom. Layout is the job of putting block boxes side by side instead.

---

## Tables for Layouts

```html
<table>
  <tr>
    <td colspan="3">Colan's Coffee Blog</td>
  </tr>
  <tr>
    <td>the nav links</td>
    <td>the reviews</td>
    <td>the ad</td>
  </tr>
  <tr>
    <td colspan="3">Copyright 2026</td>
  </tr>
</table>
```

Three rows. The header and footer cells span all three columns with `colspan`. The middle row is the three columns.

---

## Problem: Color the Cells

<div class="demo window">
<table>
<tr><td colspan="3"><h1>Colan's Coffee Blog</h1></td></tr>
<tr>
<td><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td>Ad</td>
</tr>
<tr><td colspan="3">Copyright 2026</td></tr>
</table>
</div>

The table with the page's content in its cells and no CSS. The dashed box is the browser window. Cells have no background, so nothing shows where one region ends and the next begins. How do we color each region?

---

## Solution: Color the Cells

<div class="side-by-side">
<div>

```html
<td colspan="3" class="head">...</td>
<td class="side">...</td>
<td class="main">...</td>
```

```css
.head {
  background-color: rgb(43, 26, 14);
  color: rgb(246, 231, 210);
}
.side {
  background-color: rgb(230, 201, 168);
}
.main {
  background-color: rgb(251, 243, 232);
}
```

</div>
<div class="demo window">
<table>
<tr><td colspan="3" class="head"><h1>Colan's Coffee Blog</h1></td></tr>
<tr>
<td class="side"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td class="main"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td class="side">Ad</td>
</tr>
<tr><td colspan="3" class="head">Copyright 2026</td></tr>
</table>
</div>
</div>

One class for each rule to set the color. In this case, the top and the bottom share the same color. The navigation and ad sides also share the same color.

---

## Problem: Gaps Between the Cells

<style scoped>
.window {background-color: gray; }
.demo table { border-spacing: 20px;  }
</style>

<div class="demo window">
<table>
<tr><td colspan="3" class="head"><h1>Colan's Coffee Blog</h1></td></tr>
<tr>
<td class="side"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td class="main"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td class="side">Ad</td>
</tr>
<tr><td colspan="3" class="head">Copyright 2026</td></tr>
</table>
</div>

The browser puts 2px of space between table cells, and the white page shows through it. This demo widens the gaps to 10px so they are easy to see. How do we close the gaps?

---

## Solution: `border-collapse`

<style scoped>
.demo table { border-collapse: collapse; }
</style>

<div class="side-by-side">
<div>

```css
table {
  border-collapse: collapse;
}
```

| Property                                                                                                   | Values                           |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [`border-collapse`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-collapse) | `separate` (default), `collapse` |

</div>
<div class="demo window">
<table>
<tr><td colspan="3" class="head"><h1>Colan's Coffee Blog</h1></td></tr>
<tr>
<td class="side"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td class="main"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td class="side">Ad</td>
</tr>
<tr><td colspan="3" class="head">Copyright 2026</td></tr>
</table>
</div>
</div>

`collapse` makes neighboring cells share their edges, so the space between them is gone.

---

## Problem: The Table Is Too Narrow

<style scoped>
.demo table { border-collapse: collapse; }
</style>

<div class="demo window">
<table>
<tr><td colspan="3" class="head"><h1>Colan's Coffee Blog</h1></td></tr>
<tr>
<td class="side"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td class="main"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td class="side">Ad</td>
</tr>
<tr><td colspan="3" class="head">Copyright 2026</td></tr>
</table>
</div>

A table is only as wide as its content, so it stops short of the right edge of the window. How do we make it span the window?

---

## Solution: `width: 100%`

<style scoped>
.demo table { border-collapse: collapse; }
.demo table { width: 100%; }
</style>

<div class="side-by-side">
<div>

```css
table {
  width: 100%;
}
```

</div>
<div class="demo window">
<table>
<tr><td colspan="3" class="head"><h1>Colan's Coffee Blog</h1></td></tr>
<tr>
<td class="side"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td class="main"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td class="side">Ad</td>
</tr>
<tr><td colspan="3" class="head">Copyright 2026</td></tr>
</table>
</div>
</div>

A percentage width is a share of the parent's width. The table's parent is the `<body>`, which spans the window.

---

## Problem: Uneven Sides

<style scoped>
.demo table { border-collapse: collapse; }
.demo table { width: 100%; }
</style>

<div class="demo window">
<table>
<tr><td colspan="3" class="head"><h1>Colan's Coffee Blog</h1></td></tr>
<tr>
<td class="side"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td class="main"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td class="side">Ad</td>
</tr>
<tr><td colspan="3" class="head">Copyright 2026</td></tr>
</table>
</div>

The browser splits the width between the columns by how much content each one has, so the nav column and the ad column come out different widths. How do we give both side columns the same width?

---

## Solution: A Width for the Side Cells

<style scoped>
.demo table { border-collapse: collapse; }
.demo table { width: 100%; }
.demo td.side { width: 20%; }
</style>

<div class="side-by-side">
<div>

```css
.side {
  width: 20%;
}
```

</div>
<div class="demo window">
<table>
<tr><td colspan="3" class="head"><h1>Colan's Coffee Blog</h1></td></tr>
<tr>
<td class="side"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td class="main"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td class="side">Ad</td>
</tr>
<tr><td colspan="3" class="head">Copyright 2026</td></tr>
</table>
</div>
</div>

Each side cell gets a fifth of the table's width, and the reviews column gets what is left. A cell's width sets the width of its whole column.

---

## Problem: Text in the Middle

<style scoped>
.demo table { border-collapse: collapse; }
.demo table { width: 100%; }
.demo td.side { width: 20%; }
</style>

<div class="demo window">
<table>
<tr><td colspan="3" class="head"><h1>Colan's Coffee Blog</h1></td></tr>
<tr>
<td class="side"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td class="main"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td class="side">Ad</td>
</tr>
<tr><td colspan="3" class="head">Copyright 2026</td></tr>
</table>
</div>

Cells in a row are the same height, so the nav and ad cells are as tall as the reviews cell. A cell puts its content in its vertical middle by default, so the nav links and the ad sit halfway down. How do we move them to the top?

---

## Solution: `vertical-align: top`

<style scoped>
.demo table { border-collapse: collapse; }
.demo table { width: 100%; }
.demo td.side { width: 20%; }
.demo td { vertical-align: top; }
</style>

<div class="side-by-side">
<div>

```css
td {
  vertical-align: top;
}
```

| Property                                                                                                 | Values                                        |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [`vertical-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/vertical-align) | `top`, `middle` (default in a cell), `bottom` |

</div>
<div class="demo window">
<table>
<tr><td colspan="3" class="head"><h1>Colan's Coffee Blog</h1></td></tr>
<tr>
<td class="side"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td class="main"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td class="side">Ad</td>
</tr>
<tr><td colspan="3" class="head">Copyright 2026</td></tr>
</table>
</div>
</div>

`vertical-align` places a cell's content inside the cell. The cells keep their height; only the content moves.

---

## Problem: The Page Ends Early

<style scoped>
.demo table { border-collapse: collapse; }
.demo table { width: 100%; }
.demo td.side { width: 20%; }
.demo td { vertical-align: top; }
</style>

<div class="demo window">
<table>
<tr><td colspan="3" class="head"><h1>Colan's Coffee Blog</h1></td></tr>
<tr>
<td class="side"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td class="main"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td class="side">Ad</td>
</tr>
<tr><td colspan="3" class="head">Copyright 2026</td></tr>
</table>
</div>

The table is as tall as its content, and the window below the footer is empty. How do we put the footer at the bottom of the window?

---

## Solution: `height: 100vh`

<style scoped>
.demo table { border-collapse: collapse; }
.demo table { width: 100%; }
.demo td.side { width: 20%; }
.demo td { vertical-align: top; }
.demo table { height: 100%; }
</style>

<div class="side-by-side">
<div>

```css
body {
  margin: 0;
}
table {
  height: 100vh;
}
```

</div>
<div class="demo window">
<table>
<tr><td colspan="3" class="head"><h1>Colan's Coffee Blog</h1></td></tr>
<tr>
<td class="side"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td class="main"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td class="side">Ad</td>
</tr>
<tr><td colspan="3" class="head">Copyright 2026</td></tr>
</table>
</div>
</div>

`vh` is 1% of the window's height, so `100vh` is the whole window. Browsers give the `<body>` an 8px margin on every side by default. That adds 8px above the table and 8px below it, so the page would be 16px taller than the window and scroll. `margin: 0` removes the margin. The footer is at the bottom now, but look at the header.

---

## Problem: The Header and Footer Grow

<style scoped>
.demo table { border-collapse: collapse; }
.demo table { width: 100%; }
.demo td.side { width: 20%; }
.demo td { vertical-align: top; }
.demo table { height: 100%; }
</style>

<div class="demo window">
<table>
<tr><td colspan="3" class="head"><h1>Colan's Coffee Blog</h1></td></tr>
<tr>
<td class="side"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td class="main"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td class="side">Ad</td>
</tr>
<tr><td colspan="3" class="head">Copyright 2026</td></tr>
</table>
</div>

The browser shares the extra height among all three rows, so the header and the footer get taller along with the middle row. How do we give all of the extra height to the middle row?

---

## Solution: A Height for the Middle Row

<style scoped>
.demo table { border-collapse: collapse; }
.demo table { width: 100%; }
.demo td.side { width: 20%; }
.demo td { vertical-align: top; }
.demo table { height: 100%; }
.demo tr.middle { height: 100%; }
</style>

<div class="side-by-side">
<div>

```html
<tr class="middle"></tr>
```

```css
.middle {
  height: 100%;
}
```

</div>
<div class="demo window">
<table>
<tr><td colspan="3" class="head"><h1>Colan's Coffee Blog</h1></td></tr>
<tr class="middle">
<td class="side"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></td>
<td class="main"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></td>
<td class="side">Ad</td>
</tr>
<tr><td colspan="3" class="head">Copyright 2026</td></tr>
</table>
</div>
</div>

The middle row asks for the whole table's height. The header and footer rows keep the height their content needs, and the middle row gets the rest.

---

## Why It Didn't Work Out

- `<table>` was built for data in rows and columns, so a screen reader announces the page as a table of data [[WCAG F49](https://www.w3.org/WAI/WCAG21/Techniques/failures/F49)].
- HTML should hold the content, and CSS should decide where it goes. With a table, the layout lives in the HTML, so changing the layout means changing the markup on every page.
- What if we want a different layout for different screen sizes? On a small screen, maybe we want the nav links moved into the header while the ad stays on the right. On a phone, maybe we want the ad at the top, then the header, then the content stacked below. Each of these moves cells to different rows, and a table's rows are in the HTML, so we can't do it without rewriting the HTML.

---

## After Table Layouts: `float`

<style scoped>
.demo img { float: left; width: 90px; margin: 0 12px 4px 0; }
</style>

<div class="side-by-side">
<div>

```css
img {
  float: left;
}
```

| Property                                                                               | Values                            |
| -------------------------------------------------------------------------------------- | --------------------------------- |
| [`float`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/float) | `none` (default), `left`, `right` |

</div>
<div class="demo">
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23e6c9a8'/><circle cx='44' cy='50' r='30' fill='%23fbf3e8'/><circle cx='44' cy='50' r='24' fill='%236b4226'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23fbf3e8' stroke-width='6'/></svg>" alt="A cup of coffee, seen from above" />
<p>Here is some text about the purpose of my made-up blog. I drink a lot of coffee, and I have opinions about where. Every review is one shop, one drink, and one rating out of five. The list grows each time I find a new place, and the ratings change each time I go back.</p>
</div>
</div>

`float` takes a box out of the stack and pushes it to one side. What comes after it moves up and flows around it instead of starting below it. Wrapping text around an image is the job `float` was built for ([MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Floats)).

---

## Our Page in Five Boxes

```html
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav">
  <ul>
    <li><a href="#">Visited</a></li>
    <!-- ... -->
  </ul>
</div>
<div class="article">the reviews</div>
<div class="ad">the ad</div>
<div class="footer">Copyright 2026</div>
```

Five block boxes, one per region, and each `class` is a hook for CSS. Float three of them and the layout from the first slide comes out, with no table anywhere.

---

## Problem: Three Columns

<div class="demo">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>

We need `.nav`, `.article`, and `.ad` in the same row, but `.article` needs to take more space then the other two.

---

## Solution: Three Columns

<style scoped>
.demo .nav, .demo .article, .demo .ad { float: left; }
.demo .nav, .demo .ad { width: 20%; }
.demo .article { width: 60%; }
</style>

<div class="side-by-side">
<div>

```css
.nav,
.article,
.ad {
  float: left;
}
.nav,
.ad {
  width: 20%;
}
.article {
  width: 60%;
}
```

</div>
<div class="demo">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>

Three columns and no table. `width` is required: a floated box shrinks to fit its content otherwise. Now look at the footer.

---

## Problem: The Footer Climbs Up

<style scoped>
.demo .nav, .demo .article, .demo .ad { float: left; }
.demo .nav, .demo .ad { width: 20%; }
.demo .article { width: 60%; }
</style>

<div class="demo">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>

<br/>

The footer's text sits beside the columns and its dark box is behind them. The three floats were pulled out of the stack, so the footer's box starts right under the header, and its text flows around the floats the way the paragraph flowed around the image. How do we get the footer below all three columns?

---

## Solution: `clear`

<style scoped>
.demo .nav, .demo .article, .demo .ad { float: left; }
.demo .nav, .demo .ad { width: 20%; }
.demo .article { width: 60%; }
.demo .footer { clear: both; }
</style>

<div class="side-by-side">
<div>

```css
.footer {
  clear: both;
}
```

| Property                                                                               | Values                                    |
| -------------------------------------------------------------------------------------- | ----------------------------------------- |
| [`clear`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clear) | `none` (default), `left`, `right`, `both` |

</div>
<div class="demo">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>

`clear: both` moves the footer down until no float is beside it on either side. `clear: left` only drops below the floats on the left, and `clear: right` only below the floats on the right.

---

## Problem: The Image Pokes Out of Its Box

<style scoped>
.demo .card { border: 2px solid rgb(201, 123, 58); padding: 6px 10px; }
.demo img { float: left; width: 90px; margin: 0 12px 4px 0; }
</style>

<div class="side-by-side">
<div>

<!-- prettier-ignore -->
```html
<div class="card">
  <img src="cortado.png" alt="A cortado" />
  <p>Recreo - Dynamite.</p>
</div>
<p>The next paragraph starts here.</p>
```

```css
.card {
  border: 2px solid rgb(201, 123, 58);
}
img {
  float: left;
}
```

</div>
<div>
<div class="demo">
<div class="card">
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23e6c9a8'/><circle cx='44' cy='50' r='30' fill='%23fbf3e8'/><circle cx='44' cy='50' r='24' fill='%236b4226'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23fbf3e8' stroke-width='6'/></svg>" alt="A cup of coffee, seen from above" />
<p>Recreo - Dynamite. The cortado is the best in town.</p>
</div>
<p>The next paragraph on the page starts here, and it wraps around the image too.</p>
</div>

</div>
</div>

The card's border closes above the bottom of the image, and the next paragraph wraps around the part that sticks out. A floated child does not count toward its parent's height. How do we make the card grow to hold the image?

---

## Solution: `display: flow-root`

<style scoped>
.demo .card { border: 2px solid rgb(201, 123, 58); padding: 6px 10px; display: flow-root; }
.demo img { float: left; width: 90px; margin: 0 12px 4px 0; }
</style>

<div class="side-by-side">
<div>

```css
.card {
  border: 2px solid rgb(201, 123, 58);
  display: flow-root;
}
```

| Property                                                                                   | Values                                   |
| ------------------------------------------------------------------------------------------ | ---------------------------------------- |
| [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display) | `block`, `inline`, `flow-root`, and more |

</div>
<div class="demo">
<div class="card">
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23e6c9a8'/><circle cx='44' cy='50' r='30' fill='%23fbf3e8'/><circle cx='44' cy='50' r='24' fill='%236b4226'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23fbf3e8' stroke-width='6'/></svg>" alt="A cup of coffee, seen from above" />
<p>Recreo - Dynamite. The cortado is the best in town.</p>
</div>
<p>The next paragraph on the page starts here, below the card.</p>
</div>
</div>

`flow-root` makes the card hold its floats: the card's height now counts the floated image, so the border closes below it and the next paragraph starts below the card.

---

## Problem: Ragged Bottoms

<style scoped>
.demo .nav, .demo .article, .demo .ad { float: left; }
.demo .nav, .demo .ad { width: 20%; }
.demo .article { width: 60%; }
.demo .footer { clear: both; }
</style>

<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>

Look at the bottoms of the three columns. The nav's tan box stops after three links, the ad's after one line, and the article keeps going. Make all three columns end on the same line, the way the table's cells did.

---

## Solution: Fake It

<style scoped>
.demo .nav, .demo .article, .demo .ad { float: left; }
.demo .nav, .demo .ad { width: 20%; }
.demo .article { width: 60%; }
.demo .columns { display: flow-root; background: linear-gradient(to right, rgb(230, 201, 168) 20%, rgb(251, 243, 232) 20% 80%, rgb(230, 201, 168) 80%); }
</style>

<div class="side-by-side">
<div>

```css
.columns {
  display: flow-root;
  background: linear-gradient(
    to right,
    rgb(230, 201, 168) 20%,
    rgb(251, 243, 232) 20% 80%,
    rgb(230, 201, 168) 80%
  );
}
```

The wrapper is as tall as the tallest column, so its striped background ([`linear-gradient`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/linear-gradient)) reaches the footer. The boxes underneath are still ragged, and the wrapper `<div>` exists only for the layout.

</div>
<div>
<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="columns">
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li><li>Blue Bottle - worth the line.</li><li>Peet's - strong.</li></ul></div>
<div class="ad">Ad</div>
</div>
<div class="footer">Copyright 2026</div>
</div>

```html
<div class="columns">
  <div class="nav">...</div>
  <div class="article">...</div>
  <div class="ad">...</div>
</div>
```

</div>
</div>

---

## What Floats Fixed

- **Pro:** the layout is in CSS, not HTML.
- **Con:** every fix needed another fix. The footer needs `clear: both`, the box around the columns needs `display: flow-root`, and equal-height columns need a wrapper `<div>` with a painted background.
- **Con:** the widths are percentages that must add up to 100%, and `width` leaves out padding and border unless `box-sizing: border-box` is set. Adding a fourth column means changing the width of every other column so the total is still 100%.
- **Con:** moving one column can move another. Floats fill in from the edges in source order, so after `.nav { float: right; }` the ad slides to the middle.

---

## Summary: Floats

- `float: left` or `right` pulls a box out of the stack and lets what follows flow around it. Wrapping text around an image is the job it was built for
- Three floated boxes with widths make three columns
- The first box after the columns needs `clear: both`, or it climbs up beside them
- A box that holds floats needs `display: flow-root` to grow around them; without it, its height counts only the children that are not floating
- `width` leaves out padding and border unless `* { box-sizing: border-box; }`
- Columns of the same height have to be faked with a background painted on a wrapper

---

## Problem: Is This Semantic HTML?

```html
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav">
  <ul>
    <li><a href="#">Visited</a></li>
  </ul>
</div>
<div class="article">the reviews</div>
<div class="ad">the ad</div>
<div class="footer">Copyright 2026</div>
```

Three columns, a footer that stays put, and every rule in the CSS. Read the HTML on its own, without the class names, and say what each box holds.

---

## Solution: Is This Semantic HTML?

| Element                                                                                     | Holds                                               |
| ------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [`<header>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/header)   | the top of the page: title, logo                    |
| [`<nav>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav)         | links to the rest of the site                       |
| [`<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/article) | the content itself                                  |
| [`<aside>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/aside)     | something beside the content: an ad, a related link |
| [`<footer>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer)   | the bottom of the page: copyright, contact          |

No. A `<div>` means "some box" and nothing else, and `class="nav"` is invisible to everything but CSS. What is inside still carries meaning, since a `<ul>` of links is a list of links either way, but the box around it is anonymous. HTML already has names for these five.

---

## Semantic HTML Update

<!-- prettier-ignore -->
```html
<header><h1>Colan's Coffee Blog</h1></header>
<nav><ul><li><a href="#">Visited</a></li></ul></nav>
<article>
  <h2>Visited</h2>
  <ul>
    <li>Recreo - Dynamite</li>
    <li>Nero - at least it looks nice.</li>
  </ul>
</article>
<aside>the ad</aside>
<footer>Copyright 2026</footer>
```

---

## Semantic HTML Update (Continued)

<!-- prettier-ignore -->
```css
nav, article, aside { float: left; }
footer { clear: both; }
```

Rather than selecting by class, we can select by tag with very similar CSS to before.

---

## Six Boxes

<div class="side-by-side">
<div>

```html
<div class="boxes">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>
```

</div>
<div class="boxes">
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>
</div>
</div>

Six `<div>`s, numbered 1 to 6, inside a `<div class="boxes">`. Each one is a block box, so they stack.

---

## A Layout System

<style scoped>
.boxes { display: grid; }
</style>

<div class="side-by-side">
<div>

```css
.boxes {
  display: grid;
}
```

| Property                                                                                   | Values                                    |
| ------------------------------------------------------------------------------------------ | ----------------------------------------- |
| [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/display) | `block`, `inline`, `grid`, `flex`, `none` |

</div>
<div class="boxes">
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>
</div>
</div>

Grid is the first part of CSS built for page layout, and every browser has had it since 2017. `display: grid` on the parent makes it a **grid container**; its children become **grid items**. With no columns declared, the grid is one column wide, so nothing visible changes yet.

---

## Columns: `grid-template-columns`

<style scoped>
.boxes { display: grid; grid-template-columns: 50% 50%; }
</style>

<div class="side-by-side">
<div>

```css
.boxes {
  display: grid;
  grid-template-columns: 50% 50%;
}
```

| Property                                                                                                               | Values                          |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| [`grid-template-columns`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns) | one width per column: `50% 50%` |

</div>
<div class="boxes">
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>
</div>
</div>

Two values, two columns. The boxes fill the cells in HTML order: left to right, then the next row.

---

## Problem: Three Columns, Again

<style scoped>
.boxes { display: grid; grid-template-columns: 50% 50%; }
</style>

<div class="boxes">
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>
</div>

Change the grid to three columns: 20%, 60% and 20% of the width, the same columns as the float layout.

---

## Solution: Three Columns, Again

<style scoped>
.boxes { display: grid; grid-template-columns: 20% 60% 20%; }
</style>

<div class="side-by-side">
<div>

```css
.boxes {
  display: grid;
  grid-template-columns: 20% 60% 20%;
}
```

</div>
<div class="boxes">
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>
</div>
</div>

Three values, three columns. No `width` on the boxes, no `float`, no `clear`.

---

## The `fr` Unit

<style scoped>
.boxes { display: grid; }
.a { grid-template-columns: 1fr 1fr 1fr; }
.b { grid-template-columns: 1fr 2fr 1fr; }
.c { grid-template-columns: 200px 1fr; }
</style>

<div class="side-by-side">

```css
grid-template-columns: 1fr 1fr 1fr;
```

<div class="boxes a">
<div>1</div>
<div>2</div>
<div>3</div>
</div>

```css
grid-template-columns: 1fr 2fr 1fr;
```

<div class="boxes b">
<div>1</div>
<div>2</div>
<div>3</div>
</div>

```css
grid-template-columns: 200px 1fr;
```

<div class="boxes c">
<div>1</div>
<div>2</div>
</div>

</div>

`1fr` is one share of the space left after the fixed columns are placed ([`fr`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/flex_value)). Three `1fr` columns are equal thirds; `1fr 2fr 1fr` gives the middle column twice the width of the others. The shares divide whatever space is left after the fixed columns and the gaps, so there is no arithmetic to get wrong.

---

## Space Between Cells: `gap`

<style scoped>
.boxes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
</style>

<div class="side-by-side">
<div>

```css
.boxes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```

| Property                                                                           | Values                                                       |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| [`gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap) | one length (`10px`), or two: rows then columns (`10px 20px`) |

</div>
<div class="boxes">
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>
</div>
</div>

`gap` goes on the container and only puts space between cells, never around the outside. [`row-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/row-gap) and [`column-gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/column-gap) set one direction. `grid-gap` is the old name for `gap` and still works.

---

## Rows

<style scoped>
.boxes { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: 50px 120px; gap: 10px; }
</style>

<div class="side-by-side">
<div>

```css
.boxes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px 120px;
  gap: 10px;
}
```

| Property                                                                                                         | Values                           |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [`grid-template-rows`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-rows) | one height per row: `50px 120px` |

</div>
<div class="boxes">
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>
</div>
</div>

Rows work the same way as columns. Rows you do not list are made as the boxes need them, and they size themselves to their content.

---

## Grid Lines

<style scoped>
.linenums { display: grid; grid-template-columns: repeat(3, 1fr); position: relative; font-size: 20px; font-weight: bold; color: rgb(138, 75, 31); margin-bottom: 2px; }
.linenums span { justify-self: start; transform: translateX(-40%); }
.linenums span:last-child { position: absolute; right: 0; transform: translateX(40%); }
.boxes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.boxes .wide { grid-column: 1 / 4; }
.boxes + table { margin-top: 16px; }
</style>

<div class="side-by-side">
<div>

```html
<div class="boxes">
  <div class="wide">1</div>
  <div>2</div>
  ...
</div>
```

```css
.wide {
  grid-column: 1 / 4;
}
```

</div>
<div>
<div class="linenums"><span>1</span><span>2</span><span>3</span><span>4</span></div>
<div class="boxes">
<div class="wide">1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>
</div>

| Property                                                                                                                                                                                         | Values                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| [`grid-column`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-column), [`grid-row`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-row) | `1 / 4`, `3`, `span 2` |

</div>
</div>

Column lines are numbered from 1 at the left edge, so three columns have lines 1 to 4. `grid-column: 1 / 4` stretches box 1 from line 1 to line 4. `1 / span 3` says the same thing by counting columns instead of naming the end line. `grid-row` numbers the lines between rows the same way.

---

## Problem: The Holy Grail

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; }
.demo { width: 1000px; font-size: 15px; }
</style>

Back to the blog, with `body { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; }`:

<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>

`<body>` is the container, so its five children are the items. They fill the cells in order: header, nav, article, then the ad and the footer. Put the header and the footer across all three columns.

---

## Solution: `grid-column: 1 / 4`

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; }
.demo .header, .demo .footer { grid-column: 1 / 4; }
</style>

<div class="side-by-side">
<div>

```css
header,
footer {
  grid-column: 1 / 4;
}
```

</div>
<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>

Header on top, footer on the bottom, three columns between: the holy grail in nine lines. The nav and the ad fill their row's full height, so the columns end on the same line for free, the way the table's cells did.

---

## Problem: Move the Nav to the Right

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; }
.demo .header, .demo .footer { grid-column: 1 / 4; }
</style>

<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>

Put the nav on the right edge and the ad on the left, without touching the HTML.

---

## First Try: Columns Only

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; }
.demo .header, .demo .footer { grid-column: 1 / 4; }
.demo .nav { grid-column: 3; }
.demo .ad { grid-column: 1; }
.side-by-side { grid-template-columns: 440px minmax(0, 1fr); }
.demo { font-size: 13px; }
</style>

<div class="side-by-side">
<div>

```css
nav {
  grid-column: 3;
}
aside {
  grid-column: 1;
}
```

Neither rule names a row. Grid places boxes in HTML order and never goes back, so once the nav fills column 3 of row 2, the article starts row 3, in column 1.

</div>
<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>

---

## Solution: Move the Nav to the Right

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; }
.demo .header, .demo .footer { grid-column: 1 / 4; }
.demo .nav { grid-column: 3; grid-row: 2; }
.demo .ad { grid-column: 1; grid-row: 2; }
.demo .article { grid-column: 2; grid-row: 2; }
</style>

<div class="side-by-side">
<div>

```css
nav {
  grid-column: 3;
  grid-row: 2;
}
aside {
  grid-column: 1;
  grid-row: 2;
}
article {
  grid-column: 2;
  grid-row: 2;
}
```

</div>
<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>

Six numbers to move one column. It works. Now read the CSS and say where the article is.

---

## Two Columns, by Line Number

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr; gap: 10px; }
.demo .header { grid-column: 1 / 3; grid-row: 1; }
.demo .nav { grid-column: 1; grid-row: 2; }
.demo .ad { grid-column: 1; grid-row: 3; }
.demo .article { grid-column: 2; grid-row: 2 / 4; }
.demo .footer { grid-column: 1 / 3; grid-row: 4; }
.side-by-side { grid-template-columns: 660px minmax(0, 1fr); }
</style>

<div class="side-by-side">
<div>

<!-- prettier-ignore -->
```css
body    { grid-template-columns: 1fr 3fr; }
header  { grid-column: 1 / 3; grid-row: 1; }
nav     { grid-column: 1;     grid-row: 2; }
aside   { grid-column: 1;     grid-row: 3; }
article { grid-column: 2;     grid-row: 2 / 4; }
footer  { grid-column: 1 / 3; grid-row: 4; }
```

</div>
<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>

Nav above the ad on the left, the article beside both. It works, and every rule is a pair of coordinates. To read it, you draw the grid on paper. To add a row above the nav, you change five numbers.

---

## Name the Areas

```css
body {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 10px;
  grid-template-areas:
    "header header header"
    "nav    article aside"
    "footer footer footer";
}
```

| Property                                                                                                           | Values                                    |
| ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| [`grid-template-areas`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-areas) | one string per row; `.` for an empty cell |

A picture of the layout: one string per row, one name per cell. Nothing moves yet; an element still has to claim a name.

---

## Name the Areas (Continued)

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; grid-template-areas: "header header header" "nav article aside" "footer footer footer"; }
.demo .header { grid-area: header; }
.demo .nav { grid-area: nav; }
.demo .article { grid-area: article; }
.demo .ad { grid-area: aside; }
.demo .footer { grid-area: footer; }
</style>

<div class="side-by-side">
<div>

<!-- prettier-ignore -->
```css
header  { grid-area: header; }
nav     { grid-area: nav; }
article { grid-area: article; }
aside   { grid-area: aside; }
footer  { grid-area: footer; }
```

| Property                                                                                       | Values                            |
| ---------------------------------------------------------------------------------------------- | --------------------------------- |
| [`grid-area`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-area) | a name from `grid-template-areas` |

</div>
<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>

`grid-area: nav` puts the element in the cells labeled `nav`, and `grid-area: header` does what `grid-column: 1 / 4; grid-row: 1` did. Same layout, and the CSS now reads like the layout it produces.

---

## Move the Nav with One Edit

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; grid-template-areas: "header header header" "aside article nav" "footer footer footer"; }
.demo .header { grid-area: header; }
.demo .nav { grid-area: nav; }
.demo .article { grid-area: article; }
.demo .ad { grid-area: aside; }
.demo .footer { grid-area: footer; }
</style>

<div class="side-by-side">
<div>

```css
grid-template-areas:
  "header header header"
  "aside  article nav"
  "footer footer footer";
```

</div>
<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>

One string changed. Not the HTML (the table needed that), not float directions and clears (floats needed that), not a single line number. Keyboard and screen-reader users still meet the boxes in HTML order, so keep the two orders close ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Accessibility)).

---

## Exercise: Two Columns, by Name

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr; gap: 10px; grid-template-areas: "header header" "nav article" "aside article" "footer footer"; }
.demo .header { grid-area: header; }
.demo .nav { grid-area: nav; }
.demo .article { grid-area: article; }
.demo .ad { grid-area: aside; }
.demo .footer { grid-area: footer; }
</style>

<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>

The two-column layout from before: nav above the ad on the left, the article beside both, header and footer across. Write the `grid-template-columns` and the `grid-template-areas`.

---

## Exercise: Two Columns, by Name (Continued)

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr; gap: 10px; grid-template-areas: "header header" "nav article" "aside article" "footer footer"; }
.demo .header { grid-area: header; }
.demo .nav { grid-area: nav; }
.demo .article { grid-area: article; }
.demo .ad { grid-area: aside; }
.demo .footer { grid-area: footer; }
</style>

<div class="side-by-side">
<div>

```css
body {
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    "header header"
    "nav    article"
    "aside  article"
    "footer footer";
}
```

</div>
<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>

Four strings replace thirteen line numbers. A name that appears in two rows spans them. An area has to be a rectangle: `"nav article" "article nav"` is an error, and the browser ignores the whole property.

---

## The Whole Layout

```css
body {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 10px;
  grid-template-areas:
    "header header header"
    "nav    article aside"
    "footer footer footer";
}
header {
  grid-area: header;
}
nav {
  grid-area: nav;
}
article {
  grid-area: article;
}
aside {
  grid-area: aside;
}
footer {
  grid-area: footer;
}
```

---

## The Whole Layout (Result)

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; grid-template-areas: "header header header" "nav article aside" "footer footer footer"; }
.demo .header { grid-area: header; }
.demo .nav { grid-area: nav; }
.demo .article { grid-area: article; }
.demo .ad { grid-area: aside; }
.demo .footer { grid-area: footer; }
</style>

<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>

Fourteen lines of CSS and the HTML from the start of the lecture.

---

## Floats Versus Grid

|                             | Floats                                            | Grid            |
| --------------------------- | ------------------------------------------------- | --------------- |
| Footer below the columns    | `clear: both` on the footer                       | nothing to do   |
| The box holding the columns | `display: flow-root` on it                        | nothing to do   |
| Column widths               | percentages that must add up                      | `1fr 3fr 1fr`   |
| Columns the same height     | a wrapper with painted stripes                    | free            |
| Moving a column             | change float directions and check what else moved | edit one string |

---

## Problem: The Ad Scrolls Away

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; grid-template-areas: "header header header" "nav article aside" "footer footer footer"; font-size: 13px; }
.demo .header { grid-area: header; }
.demo .nav { grid-area: nav; }
.demo .article { grid-area: article; }
.demo .ad { grid-area: aside; }
.demo .footer { grid-area: footer; }
/* The dashed box is the browser window. The page inside is shifted up to show it
   scrolled; sticky boxes stick to the window's edge either way. */
.window { height: 260px; overflow: hidden; margin-bottom: 12px; }
.scrolled .demo { margin-top: -170px; }
.label { font-size: 18px; color: rgb(138, 75, 31); margin-bottom: 4px; }
</style>

<div class="two-demos">
<div>
<div class="label">Top of the page</div>
<div class="window">
<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li><li>Blue Bottle - worth the line.</li><li>Peet's - strong.</li><li>Dunkin - it was open.</li><li>Tim Hortons - fine.</li><li>La Colombe - the draft latte.</li><li>Intelligentsia - bright.</li><li>Stumptown - cold brew.</li><li>Joe - a good cortado.</li><li>Gregorys - loud.</li><li>Blank Street - quick.</li><li>Birch - quiet upstairs.</li><li>Think - good for work.</li><li>Ninth Street - espresso.</li><li>Devoción - the beans.</li><li>Sey - light roasts.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>
</div>
<div>
<div class="label">Scrolled down</div>
<div class="window scrolled">
<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li><li>Blue Bottle - worth the line.</li><li>Peet's - strong.</li><li>Dunkin - it was open.</li><li>Tim Hortons - fine.</li><li>La Colombe - the draft latte.</li><li>Intelligentsia - bright.</li><li>Stumptown - cold brew.</li><li>Joe - a good cortado.</li><li>Gregorys - loud.</li><li>Blank Street - quick.</li><li>Birch - quiet upstairs.</li><li>Think - good for work.</li><li>Ninth Street - espresso.</li><li>Devoción - the beans.</li><li>Sey - light roasts.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>
</div>
</div>

The reviews run long. Once the reader scrolls down, the ad has gone off the top of the window. Keep the ad on screen while the reader scrolls.

---

## First Try: `position: sticky`

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; grid-template-areas: "header header header" "nav article aside" "footer footer footer"; font-size: 13px; }
.demo .header { grid-area: header; }
.demo .nav { grid-area: nav; }
.demo .article { grid-area: article; }
.demo .ad { grid-area: aside; }
.demo .footer { grid-area: footer; }
/* The dashed box is the browser window. The page inside is shifted up to show it
   scrolled; sticky boxes stick to the window's edge either way. */
.window { height: 260px; overflow: hidden; margin-bottom: 12px; }
.scrolled .demo { margin-top: -170px; }
.label { font-size: 18px; color: rgb(138, 75, 31); margin-bottom: 4px; }
.demo .ad { position: sticky; top: 0; }
</style>

<div class="side-by-side">
<div>

```css
aside {
  position: sticky;
  top: 0;
}
```

| Property                                                                                     | Values                                            |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position) | `static` (default), `sticky`, and more            |
| [`top`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/top)           | how far from the top of the window it sticks: `0` |

</div>
<div>
<div class="label">Scrolled down</div>
<div class="window scrolled">
<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li><li>Blue Bottle - worth the line.</li><li>Peet's - strong.</li><li>Dunkin - it was open.</li><li>Tim Hortons - fine.</li><li>La Colombe - the draft latte.</li><li>Intelligentsia - bright.</li><li>Stumptown - cold brew.</li><li>Joe - a good cortado.</li><li>Gregorys - loud.</li><li>Blank Street - quick.</li><li>Birch - quiet upstairs.</li><li>Think - good for work.</li><li>Ninth Street - espresso.</li><li>Devoción - the beans.</li><li>Sey - light roasts.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>
</div>
</div>

A sticky box slides down to stay on screen until its bottom edge reaches the bottom of its parent, here the page. The ad is stretched as tall as the article, so it can only slide about as far as the footer is tall, and it is still off the top of the window.

---

## Solution: Stick the Ad, Not the Column

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; grid-template-areas: "header header header" "nav article aside" "footer footer footer"; font-size: 13px; }
.demo .header { grid-area: header; }
.demo .nav { grid-area: nav; }
.demo .article { grid-area: article; }
.demo .ad { grid-area: aside; }
.demo .footer { grid-area: footer; }
/* The dashed box is the browser window. The page inside is shifted up to show it
   scrolled; sticky boxes stick to the window's edge either way. */
.window { height: 260px; overflow: hidden; margin-bottom: 12px; }
.scrolled .demo { margin-top: -170px; }
.label { font-size: 18px; color: rgb(138, 75, 31); margin-bottom: 4px; }
.demo .ad div { position: sticky; top: 0; }
</style>

<div class="side-by-side">
<div>

```html
<aside>
  <div>Ad</div>
</aside>
```

```css
aside div {
  position: sticky;
  top: 0;
}
```

</div>
<div>
<div class="label">Scrolled down</div>
<div class="window scrolled">
<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li><li>Blue Bottle - worth the line.</li><li>Peet's - strong.</li><li>Dunkin - it was open.</li><li>Tim Hortons - fine.</li><li>La Colombe - the draft latte.</li><li>Intelligentsia - bright.</li><li>Stumptown - cold brew.</li><li>Joe - a good cortado.</li><li>Gregorys - loud.</li><li>Blank Street - quick.</li><li>Birch - quiet upstairs.</li><li>Think - good for work.</li><li>Ninth Street - espresso.</li><li>Devoción - the beans.</li><li>Sey - light roasts.</li></ul></div>
<div class="ad"><div>Ad</div></div>
<div class="footer">Copyright 2026</div>
</div>
</div>
</div>
</div>

A sticky box slides only inside its parent. The `<aside>` stays stretched, so its background still fills the column, and the ad inside it has the whole column to slide down.

---

## Aligning Boxes in Their Cells

<style scoped>
.boxes { display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: 90px 90px; gap: 10px; justify-items: center; align-items: center; }
.side-by-side > div { min-width: 0; }
.boxes + table { margin-top: 16px; }
</style>

<div class="side-by-side">
<div>

```css
.boxes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 90px 90px;
  gap: 10px;
  justify-items: center;
  align-items: center;
}
```

`stretch`, the default, is why every box has filled its cell so far. `align-` moves boxes up and down, `justify-` left and right. `-items` on the container sets every item; `-self` on one item overrides it.

</div>
<div>
<div class="boxes">
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>
</div>

| Property                                                                                                                                                                                                   | Values                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [`align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-items), [`justify-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-items) | `stretch` (default), `start`, `center`, `end` |
| [`align-self`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/align-self), [`justify-self`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-self)     | the same, for one item                        |

</div>
</div>

---

## Exercise: A Photo Gallery

```html
<div class="gallery">
  <img src="cortado.png" alt="A cortado, seen from above" />
  <img src="latte.png" alt="A latte in a brown mug" />
  <!-- four more -->
</div>
```

Six photos, three across, `10px` gaps, every row `150px` tall, every photo filling its cell.

| Property                                                                                                 | Values                                                             |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [`grid-auto-rows`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-auto-rows) | the height of every row you did not list: `150px`                  |
| [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit)         | `fill` (default: stretch to fit), `cover` (crop to fit), `contain` |

Hint: the image needs a `width` and a `height` to fill its cell, and `object-fit` to keep its shape.

---

## Exercise: A Photo Gallery (Continued)

<style scoped>
.demo .gallery { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 150px; gap: 10px; }
.demo .gallery img { width: 100%; height: 100%; object-fit: cover; }
</style>

<div class="side-by-side">
<div>

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 150px;
  gap: 10px;
}
.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

</div>
<div class="demo">
<div class="gallery">
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23e6c9a8'/><circle cx='44' cy='50' r='30' fill='%23fbf3e8'/><circle cx='44' cy='50' r='24' fill='%236b4226'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23fbf3e8' stroke-width='6'/></svg>" alt="A cortado, seen from above" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect width='120' height='100' fill='%23fbf3e8'/><rect x='10' y='20' width='70' height='60' rx='10' fill='%236b4226'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%236b4226' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%23c97b3a'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%232b1a0e'/></svg>" alt="A latte in a brown mug" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23c97b3a'/><circle cx='44' cy='50' r='30' fill='%23fbf3e8'/><circle cx='44' cy='50' r='24' fill='%232b1a0e'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23fbf3e8' stroke-width='6'/></svg>" alt="A drip coffee, seen from above" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect width='120' height='100' fill='%23e6c9a8'/><rect x='10' y='20' width='70' height='60' rx='10' fill='%232b1a0e'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%232b1a0e' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%23c97b3a'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%236b4226'/></svg>" alt="An espresso in a dark cup" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%232b1a0e'/><circle cx='44' cy='50' r='30' fill='%23f6e7d2'/><circle cx='44' cy='50' r='24' fill='%238a4b1f'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23f6e7d2' stroke-width='6'/></svg>" alt="A flat white, seen from above" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect width='120' height='100' fill='%23c97b3a'/><rect x='10' y='20' width='70' height='60' rx='10' fill='%23fbf3e8'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%23fbf3e8' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%236b4226'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%232b1a0e'/></svg>" alt="A cappuccino in a cream mug" />
</div>
</div>
</div>

The container is the same recipe as the blog, and `grid-auto-rows` sizes rows that were never listed.

---

## Exercise: Feature One Photo

<style scoped>
.demo .gallery { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 120px; gap: 10px; }
.demo .gallery img { width: 100%; height: 100%; object-fit: cover; }
.demo .gallery img:first-child { grid-column: span 2; grid-row: span 2; }
</style>

<div class="demo">
<div class="gallery">
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23e6c9a8'/><circle cx='44' cy='50' r='30' fill='%23fbf3e8'/><circle cx='44' cy='50' r='24' fill='%236b4226'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23fbf3e8' stroke-width='6'/></svg>" alt="A cortado, seen from above" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect width='120' height='100' fill='%23fbf3e8'/><rect x='10' y='20' width='70' height='60' rx='10' fill='%236b4226'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%236b4226' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%23c97b3a'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%232b1a0e'/></svg>" alt="A latte in a brown mug" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23c97b3a'/><circle cx='44' cy='50' r='30' fill='%23fbf3e8'/><circle cx='44' cy='50' r='24' fill='%232b1a0e'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23fbf3e8' stroke-width='6'/></svg>" alt="A drip coffee, seen from above" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect width='120' height='100' fill='%23e6c9a8'/><rect x='10' y='20' width='70' height='60' rx='10' fill='%232b1a0e'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%232b1a0e' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%23c97b3a'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%236b4226'/></svg>" alt="An espresso in a dark cup" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%232b1a0e'/><circle cx='44' cy='50' r='30' fill='%23f6e7d2'/><circle cx='44' cy='50' r='24' fill='%238a4b1f'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23f6e7d2' stroke-width='6'/></svg>" alt="A flat white, seen from above" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect width='120' height='100' fill='%23c97b3a'/><rect x='10' y='20' width='70' height='60' rx='10' fill='%23fbf3e8'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%23fbf3e8' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%236b4226'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%232b1a0e'/></svg>" alt="A cappuccino in a cream mug" />
</div>
</div>

Make the first photo twice as wide and twice as tall, as above, with no change to the HTML. (Hint: `span`, and a pseudo-class that picks the first child.)

---

## Exercise: Feature One Photo (Continued)

<style scoped>
.demo .gallery { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 120px; gap: 10px; }
.demo .gallery img { width: 100%; height: 100%; object-fit: cover; }
.demo .gallery img:first-child { grid-column: span 2; grid-row: span 2; }
</style>

<div class="side-by-side">
<div>

```css
.gallery img:first-child {
  grid-column: span 2;
  grid-row: span 2;
}
```

| Selector                                                                                            | Matches                                                    |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| [`:first-child`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:first-child) | the first child of its parent; `:nth-child(1)` with a name |

</div>
<div class="demo">
<div class="gallery">
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23e6c9a8'/><circle cx='44' cy='50' r='30' fill='%23fbf3e8'/><circle cx='44' cy='50' r='24' fill='%236b4226'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23fbf3e8' stroke-width='6'/></svg>" alt="A cortado, seen from above" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect width='120' height='100' fill='%23fbf3e8'/><rect x='10' y='20' width='70' height='60' rx='10' fill='%236b4226'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%236b4226' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%23c97b3a'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%232b1a0e'/></svg>" alt="A latte in a brown mug" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23c97b3a'/><circle cx='44' cy='50' r='30' fill='%23fbf3e8'/><circle cx='44' cy='50' r='24' fill='%232b1a0e'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23fbf3e8' stroke-width='6'/></svg>" alt="A drip coffee, seen from above" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect width='120' height='100' fill='%23e6c9a8'/><rect x='10' y='20' width='70' height='60' rx='10' fill='%232b1a0e'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%232b1a0e' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%23c97b3a'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%236b4226'/></svg>" alt="An espresso in a dark cup" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%232b1a0e'/><circle cx='44' cy='50' r='30' fill='%23f6e7d2'/><circle cx='44' cy='50' r='24' fill='%238a4b1f'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23f6e7d2' stroke-width='6'/></svg>" alt="A flat white, seen from above" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect width='120' height='100' fill='%23c97b3a'/><rect x='10' y='20' width='70' height='60' rx='10' fill='%23fbf3e8'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%23fbf3e8' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%236b4226'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%232b1a0e'/></svg>" alt="A cappuccino in a cream mug" />
</div>
</div>
</div>

`span 2` covers two cells without naming lines, so the rule keeps working if a column is added. The other five photos flow around the big one in order.

---

## Problem: On a Phone

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; grid-template-areas: "header header header" "nav article aside" "footer footer footer"; }
.demo .header { grid-area: header; }
.demo .nav { grid-area: nav; }
.demo .article { grid-area: article; }
.demo .ad { grid-area: aside; }
.demo .footer { grid-area: footer; }
</style>

<div class="two-demos laptop-phone">
<div class="demo padded">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
<div class="demo padded phone">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>

Left: a laptop. Right: the same page 360px wide, where the nav column is 68px. One column on the phone, three on the laptop, from one file.

---

## Media Queries

```css
@media (max-width: 600px) {
  /* rules in here apply only while the window is at most 600px wide */
}
```

| Rule                                                                                   | Condition                                            |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| [`@media`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media) | `(max-width: 600px)`, `(min-width: 601px)`, and more |

`@media` wraps rules in a condition: they switch on at 600px and under, and off above it. A phone also needs one line of HTML, already in the starter file:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

Without it, a phone lays the page out about 980px wide and shrinks it to fit ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport)), and the media query never fires.

---

## Exercise: Hide the Ad on Phones

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; grid-template-areas: "header header header" "nav article aside" "footer footer footer"; }
.demo .header { grid-area: header; }
.demo .nav { grid-area: nav; }
.demo .article { grid-area: article; }
.demo .ad { grid-area: aside; }
.demo .footer { grid-area: footer; }
.demo.phone { grid-template-columns: 1fr; grid-template-areas: "header" "nav" "article" "aside" "footer"; }
</style>

<div class="side-by-side">
<div>

```css
@media (max-width: 600px) {
  body {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "nav"
      "article"
      "aside"
      "footer";
  }
}
```

</div>
<div class="demo padded phone">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>

Leave the ad out below 600px. Two edits, both inside the `@media` block.

---

## Exercise: Hide the Ad on Phones (Continued)

<style scoped>
.demo { display: grid; grid-template-columns: 1fr 3fr 1fr; gap: 10px; grid-template-areas: "header header header" "nav article aside" "footer footer footer"; }
.demo .header { grid-area: header; }
.demo .nav { grid-area: nav; }
.demo .article { grid-area: article; }
.demo .ad { grid-area: aside; }
.demo .footer { grid-area: footer; }
.demo.phone { grid-template-columns: 1fr; grid-template-areas: "header" "nav" "article" "footer"; }
.demo.phone .ad { display: none; }
</style>

<div class="side-by-side">
<div>

```css
@media (max-width: 600px) {
  body {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "nav"
      "article"
      "footer";
  }
  aside {
    display: none;
  }
}
```

</div>
<div class="demo padded phone">
<div class="header"><h1>Colan's Coffee Blog</h1></div>
<div class="nav"><ul><li><a href="#">Visited</a></li><li><a href="#">Wishlist</a></li><li><a href="#">About</a></li></ul></div>
<div class="article"><h2>Visited</h2><p>Here is some text about the purpose of my made-up blog.</p><ul><li>Recreo - Dynamite</li><li>Nero - at least it looks nice.</li><li>Starbucks - it's fine.</li></ul></div>
<div class="ad">Ad</div>
<div class="footer">Copyright 2026</div>
</div>
</div>

`display: none` removes the box entirely. A removed box is not a grid item, so `"aside"` comes out of the picture too, or the row stays behind as a gap. Hiding a box hides it from screen readers too, so drop only what the page can spare.

---

## Summary: Layout

- Block boxes stack. A table or a float can put them side by side, and each one costs a list of workarounds
- `display: grid` on the parent; `grid-template-columns` with `px`, `fr`, and `repeat()`; `gap` for the space between
- `grid-column: 1 / 4` places by line number; `grid-template-areas` and `grid-area` place by name, and the CSS reads like the layout
- `align-self` and `justify-self` move a box inside its cell; `-items` on the container does it for all of them
- `@media (max-width: 600px)` swaps in a different picture on a narrow screen; the HTML never changes
