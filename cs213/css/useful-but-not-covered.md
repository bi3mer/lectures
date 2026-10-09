---

## Color

<style scoped>
.named { color: red; }
.hex { color: #c97b3a; }
.rgb { color: rgb(201, 123, 58); background-color: #fbf3e8; }
</style>

```css
h1 {
  color: red;
} /* named   */
h1 {
  color: #c97b3a;
} /* hex     */
h1 {
  color: rgb(201, 123, 58);
} /* rgb     */
```

<span class="named">named</span> &nbsp; <span class="hex">hex</span> &nbsp; <span class="rgb">rgb with a background</span>

- `color` sets the text
- `background-color` sets the box behind it

---

## Hex Colors

`#RRGGBB`: two hex digits each for red, green, and blue, from `00` to `ff`.

- `#ff0000` red
- `#00ff00` green
- `#0000ff` blue
- `#000000` black
- `#ffffff` white

Do not memorize these. Any color picker will give you the hex code.

---

## Fonts

```css
body {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
}
```

`font-family` is a list. The browser uses the first font it has installed, so end with a generic family (`serif`, `sans-serif`, `monospace`) as a fallback.

---

## Font Properties

| Property      | Example values          |
| ------------- | ----------------------- |
| `font-family` | `Arial, sans-serif`     |
| `font-size`   | `16px`, `1.2em`, `120%` |
| `font-weight` | `normal`, `bold`, `700` |
| `font-style`  | `normal`, `italic`      |

---

## Styling Text

<style scoped>
.demo-h2 { text-align: center; text-transform: uppercase; letter-spacing: 2px; }
</style>

```css
h2 {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}
```

```html
<h2>Visited</h2>
```

<p class="demo-h2">Visited</p>

---

## Text Properties

| Property          | Example values                         |
| ----------------- | -------------------------------------- |
| `text-align`      | `left`, `center`, `right`              |
| `text-decoration` | `none`, `underline`, `line-through`    |
| `text-transform`  | `uppercase`, `lowercase`, `capitalize` |
| `letter-spacing`  | `2px`                                  |
| `line-height`     | `1.6` (space between lines)            |

---

## Links

Browsers give links a default look: blue and underlined, purple once visited.

```css
a {
  color: #c97b3a;
  text-decoration: none;
}
```

`text-decoration: none` removes the underline.

---

## Link States

<style scoped>
a.demo { color: #c97b3a; text-decoration: none; }
a.demo:hover { text-decoration: underline; }
</style>

```css
a:link {
  color: #c97b3a;
} /* not yet visited */
a:visited {
  color: #8a4b1f;
} /* already visited */
a:hover {
  text-decoration: underline;
} /* mouse over      */
a:active {
  color: red;
} /* being clicked   */
```

<a class="demo" href="#">Hover over me</a>

`:hover` and friends are **pseudo-classes**: they select an element based on its state. Write them in this order (**L**ink, **V**isited, **H**over, **A**ctive) or later rules override earlier ones.

---

## Putting It Together

```css
body {
  font-family: Georgia, serif;
  background-color: #fbf3e8;
  color: #2b1a0e;
}
#header {
  background-color: #2b1a0e;
  color: #f6e7d2;
  text-align: center;
}
h2 {
  color: #8a4b1f;
  text-transform: uppercase;
  letter-spacing: 2px;
}
.favorite {
  font-weight: bold;
}
a {
  color: #c97b3a;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
```

[link](examples/styled-blog/index.html)

---

## Flexbox

Grid lays boxes out in two directions at once: rows and columns. [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox) lays them out in one, along a single row or column, and sizes them to their content.

<style scoped>
.row { display: flex; gap: 10px; align-items: center; justify-content: space-between; background-color: #e6c9a8; padding: 10px; font-family: Georgia, serif; }
.row div { background-color: #fbf3e8; border: 2px solid #8a4b1f; padding: 6px 12px; }
</style>

```css
nav {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}
```

<div class="row">
<div>Visited</div>
<div>Wishlist</div>
<div>About</div>
</div>

`display: flex` on the parent, then `gap` for the space between and `justify-content` to spread the children along the row. A nav bar, a row of buttons, and a header with a logo on one side and links on the other are the usual jobs.

Use grid for the page; use flex for a single row or column inside it.
