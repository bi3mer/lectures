---
marp: true
theme: lecture
paginate: true
---

# CSS: Borders

Colan Biemer

---

## Every Element Is a Box

<style scoped>
.demo h1, .demo p, .demo ul, .demo li { border: 1px dashed red; }
.demo h1 { font-size: 1.2em; margin: 0 0 6px; padding: 0; }
.demo p { margin: 0 0 6px; }
.demo ul { margin: 0; }
.demo li { margin: 0; }
</style>

```html
<h1>Colan's Coffee Blog</h1>
<p>Here is some text about the purpose of my made-up blog.</p>
<ul>
  <li>Recreo - Dynamite</li>
  <li>Nero - at least it looks nice.</li>
</ul>
```

<div class="demo">
<h1>Colan's Coffee Blog</h1>
<p>Here is some text about the purpose of my made-up blog.</p>
<ul>
<li>Recreo - Dynamite</li>
<li>Nero - at least it looks nice.</li>
</ul>
</div>

The browser lays out every element as a rectangle. Text properties style what is inside the rectangle. Border properties draw its edge.

---

## Problem: Boxes Around Paragraphs

```html
<p>Here is some text about the purpose of my made-up blog.</p>
```

Draw a line around every paragraph. ([examples/borders/index.html](examples/borders/index.html) has this page with an empty `<style>`.)

| Property                                                                                             | Values                                        |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| [`border-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-style) | `none`, `solid`, `dashed`, `dotted`, `double` |

---

## Solution: Boxes Around Paragraphs

<style scoped>
.demo p { border-style: solid; }
</style>

```css
p {
  border-style: solid;
}
```

<div class="demo">
<p>Here is some text about the purpose of my made-up blog.</p>
</div>

We said what kind of line, but we didn't give any specifics and the default style sheet was used. In this case `medium` width (3px) and the text color.

---

## A Border Has Three Parts

| Property                                                                                             | Values                                             | Default        |
| ---------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------- |
| [`border-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-style) | `none`, `solid`, `dashed`, `dotted`, `double`      | `none`         |
| [`border-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-width) | a length (`1px`, `3px`), `thin`, `medium`, `thick` | `medium` (3px) |
| [`border-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-color) | any color                                          | the text color |

---

## Border Styles

<style scoped>
.demo p { border-width: 3px; padding: 4px 10px; margin: 0 0 8px; }
.demo .solid { border-style: solid; }
.demo .dashed { border-style: dashed; }
.demo .dotted { border-style: dotted; }
.demo .double { border-style: double; }
.demo .none { border-style: none; }
</style>

<div class="demo">
<p class="solid">border-style: solid</p>
<p class="dashed">border-style: dashed</p>
<p class="dotted">border-style: dotted</p>
<p class="double">border-style: double</p>
<p class="none">border-style: none (the default)</p>
</div>

There are a few more (`groove`, `ridge`, `inset`, `outset`). [MDN shows them all](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-style).

---

## Problem: Where Is the Border?

```css
p {
  border-width: 5px;
  border-color: red;
}
```

```html
<p>Here is some text about the purpose of my made-up blog.</p>
```

What does the paragraph look like?

---

## Solution: Where Is the Border?

```css
p {
  border-width: 5px;
  border-color: red;
}
```

<div class="demo">
<p>Here is some text about the purpose of my made-up blog.</p>
</div>

Nothing changes. `border-style` defaults to `none`, and a border with no style is never drawn, whatever its width and color. Always set a style.

---

## Exercise: Dashed, Red, 2px

```html
<p>Here is some text about the purpose of my made-up blog.</p>
```

Give every paragraph a dashed red border, `2px` thick.

---

## Exercise: Dashed, Red, 2px (Continued)

<style scoped>
.demo p { border-style: dashed; border-color: red; border-width: 2px; }
</style>

```css
p {
  border-style: dashed;
  border-color: red;
  border-width: 2px;
}
```

<div class="demo">
<p>Here is some text about the purpose of my made-up blog.</p>
</div>

---

## The `border` Shorthand

<style scoped>
.demo p { border: 2px dashed red; }
</style>

```css
p {
  border: 2px dashed red;
}
```

<div class="demo">
<p>Here is some text about the purpose of my made-up blog.</p>
</div>

Same result. [`border`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border) is a **shorthand**: one property that sets `border-width`, `border-style`, and `border-color` together.

---

## Problem: A Line Under the Heading

```html
<h2>Visited</h2>
```

Draw a line under the heading, and only under it. `border` draws all four sides. Each side also has a property of its own:

| Property                                                                                               | Values                                 |
| ------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| [`border-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-top)       | same as `border`, e.g. `2px solid red` |
| [`border-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-right)   | same as `border`                       |
| [`border-bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-bottom) | same as `border`                       |
| [`border-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-left)     | same as `border`                       |

---

## Solution: A Line Under the Heading

<style scoped>
.demo h2 { border-bottom-style: solid; padding-bottom: 4px; }
</style>

```css
h2 {
  border-bottom: solid;
}
```

<div class="demo">
<h2>Visited</h2>
</div>

`border-bottom` takes the same three parts as `border`, but only draws the bottom side. The other three sides stay at their default, `none`.

The line runs the full width of the page, not just under the word. A heading's box is that wide.

---

## Problem: An Accent Bar

```html
<ul>
  <li>Recreo - Dynamite</li>
  <li>Nero - at least it looks nice.</li>
  <li>Starbucks - it's fine.</li>
</ul>
```

Put a `6px` solid bar down the left side of every review, like the styled page from the start of the last lecture. Use `rgb(201, 123, 58)` for the color.

---

## Solution: An Accent Bar

<style scoped>
.demo li { border-left: 6px solid rgb(201, 123, 58); padding-left: 10px; margin-bottom: 6px; }
</style>

```css
li {
  border-left: 6px solid rgb(201, 123, 58);
}
```

<div class="demo">
<ul>
<li>Recreo - Dynamite</li>
<li>Nero - at least it looks nice.</li>
<li>Starbucks - it's fine.</li>
</ul>
</div>

The bar is there, but the bullets are still there too, sitting outside each `<li>`'s box.

---

## Problem: Remove the Bullets

<style scoped>
.demo li { border-left: 6px solid rgb(201, 123, 58); padding-left: 10px; margin-bottom: 6px; }
</style>

<div class="demo">
<ul>
<li>Recreo - Dynamite</li>
<li>Nero - at least it looks nice.</li>
<li>Starbucks - it's fine.</li>
</ul>
</div>

The bullets came from the browser's default stylesheet (`ul { list-style: disc; }`. Get rid of them.

| Property                                                                                         | Values                            |
| ------------------------------------------------------------------------------------------------ | --------------------------------- |
| [`list-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/list-style) | `disc` (the default), `none`, ... |

---

## Solution: Remove the Bullets

<style scoped>
.demo ul { list-style: none; }
.demo li { border-left: 6px solid rgb(201, 123, 58); padding-left: 10px; margin-bottom: 6px; }
</style>

```css
ul {
  list-style: none;
}
li {
  border-left: 6px solid rgb(201, 123, 58);
}
```

<div class="demo">
<ul>
<li>Recreo - Dynamite</li>
<li>Nero - at least it looks nice.</li>
<li>Starbucks - it's fine.</li>
</ul>
</div>

The rule goes on the `<ul>`, because that is where the browser put `list-style: disc`.

---

## Exercise: Four Sides, Four Colors

```css
p {
  border-style: solid;
  border-width: 5px 4px 3px 2px;
  border-color: red green blue orange;
}
```

```html
<p>Here is some text about the purpose of my made-up blog.</p>
```

We can set individual properties of each border.

---

## Exercise: Four Sides, Four Colors (Continued)

<style scoped>
.demo p { border-style: solid; border-width: 5px 4px 3px 2px; border-color: red green blue orange; padding: 6px 10px; }
</style>

<div class="demo">
<p>Here is some text about the purpose of my made-up blog.</p>
</div>

Red on top, green on the right, blue on the bottom, orange on the left. Same order as `border-width`: clockwise from the top.

---

## Problem: Rounded Corners

<style scoped>
.demo p { border: 4px solid rgb(201, 123, 58); padding: 6px 10px; }
</style>

```css
p {
  border: 4px solid rgb(201, 123, 58);
}
```

<div class="demo">
<p>Here is some text about the purpose of my made-up blog.</p>
</div>

The corners are sharp. Round them off with `10px` and add a background-color of gray in RGB.

| Property                                                                                               | Values                                     |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| [`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-radius) | a length (`100px`) or a percentage (`50%`) |

---

## Solution: Rounded Corners

<style scoped>
.demo p { border: 4px solid rgb(201, 123, 58); border-radius: 10px; padding: 6px 10px; background-color: gray; }
</style>

```css
p {
  border: 4px solid rgb(201, 123, 58);
  border-radius: 10px;
  background-color: rgb(128, 128, 128);
}
```

<div class="demo">
<p>Here is some text about the purpose of my made-up blog.</p>
</div>

`border-radius` rounds the corners of the box. It rounds the background too, so it works even with no border. One to four values, clockwise from the top-left corner.

---

## Problem: A Round Image

```html
<img src="cup.png" alt="A cup of coffee" />
```

Make every image a circle. (Hint: `border-radius` takes a percentage.)

---

## Solution: A Round Image

<style scoped>
.demo img { width: 140px; margin-right: 48px; }
.demo .round { border-radius: 50%; }
</style>

```css
img {
  border-radius: 50%;
}
```

<div class="demo">
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23e6c9a8'/><circle cx='44' cy='50' r='30' fill='%23fbf3e8'/><circle cx='44' cy='50' r='24' fill='%236b4226'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23fbf3e8' stroke-width='6'/></svg>" alt="A cup of coffee, seen from above" />
<img class="round" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23e6c9a8'/><circle cx='44' cy='50' r='30' fill='%23fbf3e8'/><circle cx='44' cy='50' r='24' fill='%236b4226'/><circle cx='80' cy='50' r='9' fill='none' stroke='%23fbf3e8' stroke-width='6'/></svg>" alt="A cup of coffee, seen from above, cropped to a circle" />
</div>

- Left: as is. Right: `border-radius: 50%`.
- A radius of half the width turns a square into a circle. A rectangle becomes an oval.

---

## Problem: The Border Hugs the Text

<style scoped>
.demo p { border: 2px solid rgb(201, 123, 58); }
</style>

```css
p {
  border: 2px solid rgb(201, 123, 58);
}
```

<div class="demo">
<p>Here is some text about the purpose of my made-up blog.</p>
</div>

The line sits right against the letters. How do we push it away from the text?

---

## Solution: The Border Hugs the Text

<style scoped>
.demo p { border: 2px solid rgb(201, 123, 58); padding: 10px; }
</style>

```css
p {
  border: 2px solid rgb(201, 123, 58);
  padding: 10px;
}
```

<div class="demo">
<p>Here is some text about the purpose of my made-up blog.</p>
</div>

[`padding`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/padding) is the space between the content and the border. It takes one to four values like `border-width` does.

---

## Summary: Borders

- A border has three parts: `border-style`, `border-width`, `border-color`. Style is required; its default is `none`
- `border: 2px solid red` is the shorthand that sets all three at once
- `border-top`, `border-right`, `border-bottom`, `border-left` for one side
- One to four values go clockwise from the top: top, right, bottom, left
- `border-radius` rounds the corners; `50%` turns a square into a circle
- `padding` keeps the border off the text
