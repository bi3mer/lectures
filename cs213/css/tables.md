---
marp: true
theme: lecture
paginate: true
---

<style>
/* Demo tables should look like a browser's defaults, not like the slide theme. */
.demo table {
  display: table;
  width: auto;
  margin: 0;
  border-collapse: separate;
  border-spacing: 2px;
  overflow: visible;
}
.demo th,
.demo td {
  border: none;
  padding: 1px;
}
.demo th {
  font-weight: bold;
  text-align: center;
}
.demo tr,
.demo tr:nth-child(2n) {
  background-color: transparent;
  border-top: none;
}
</style>

# CSS: Tables

Colan Biemer

---

## Review: Tables in HTML

```html
<table>
  <tr>
    <th>Shop</th>
    <th>Drink</th>
    <th>Rating</th>
  </tr>
  <tr>
    <td>Recreo</td>
    <td>Cortado</td>
    <td>5</td>
  </tr>
  <!-- two more rows: Nero and Starbucks -->
</table>
```

`<table>` holds rows (`<tr>`); each row holds header cells (`<th>`) or data cells (`<td>`).

---

## What the Browser Draws

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

- No lines at all. The browser's stylesheet makes `<th>` bold and centered.
- You may have seen `<table border="1">`. That attribute is obsolete. Lines are the job of CSS.
- [examples/table/index.html](examples/table/index.html) is this table with an empty `<style>`. We will fill it in as we go.

---

## Problem: Where Are the Lines?

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

Give every cell a `1px` solid black border. (Hint: `<th>` and `<td>` are elements like any other.)

---

## Solution: Where Are the Lines?

<style scoped>
.demo th, .demo td { border: 1px solid black; }
</style>

```css
th,
td {
  border: 1px solid black;
}
```

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

Every cell is its own box with its own border. Close, but look between the cells.

---

## Problem: The Gaps

<style scoped>
.demo th, .demo td { border: 1px solid black; }
</style>

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

The browser leaves a small gap (`2px`) between neighboring cells, so two borders sit side by side with space between them. How do we get single lines?

| Property                                                                                                   | Values                           |
| ---------------------------------------------------------------------------------------------------------- | -------------------------------- |
| [`border-collapse`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-collapse) | `separate` (default), `collapse` |

---

## Solution: The Gaps

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; }
</style>

```css
table {
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
}
```

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

`collapse` makes neighboring cells share one border. (To keep the gaps and change their size instead, use [`border-spacing`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/border-spacing).)

---

## Exercise: Outline Only

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

Draw a `2px` solid line around the whole table, and no lines between the cells.

---

## Exercise: Outline Only (Continued)

<style scoped>
.demo table { border: 2px solid black; }
</style>

```css
table {
  border: 2px solid black;
}
```

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

`<table>` is an element too. Its border is the outside edge. The cells' borders are the inside lines.

---

## Problem: Cramped Cells

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; }
</style>

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

The text touches the lines. Push it away from them.

---

## Solution: Cramped Cells

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
</style>

```css
th,
td {
  border: 1px solid black;
  padding: 8px;
}
```

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

Same fix as the paragraph: `padding` is the space between a cell's content and its border.

---

## Problem: A Header Row That Stands Out

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
</style>

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

Give the header cells a dark background (`rgb(43, 26, 14)`), light text (`rgb(246, 231, 210)`), and left-aligned text instead of centered. (Hint: `text-align`)

---

## Solution: A Header Row That Stands Out

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
.demo th { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); text-align: left; }
</style>

```css
th {
  background-color: rgb(43, 26, 14);
  color: rgb(246, 231, 210);
  text-align: left;
}
```

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

Nothing new. A `<th>` is an element, so every property from last lecture works on it.

---

## Pseudo-Class: `:nth-child()`

Last time, pseudo-classes picked elements by state: `:hover`, `:visited`, `:active`. [`:nth-child()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:nth-child) picks by **position** among the children of the same parent.

| Selector             | Matches                       |
| -------------------- | ----------------------------- |
| `li:nth-child(2)`    | the second `<li>` in its list |
| `tr:nth-child(even)` | rows 2, 4, 6, ... of a table  |
| `tr:nth-child(odd)`  | rows 1, 3, 5, ...             |
| `td:nth-child(3)`    | the third cell in its row     |

- Counting starts at 1.
- For which rule wins, it counts like a class, the same as `:hover`.

---

## Problem: Zebra Stripes

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
.demo th { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); text-align: left; }
</style>

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

Shade every other row (`rgb(251, 243, 232)`) so the eye can follow a row across the table.

---

## Solution: Zebra Stripes

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
.demo th { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); text-align: left; }
.demo tr:nth-child(even) { background-color: rgb(251, 243, 232); }
</style>

```css
tr:nth-child(even) {
  background-color: rgb(251, 243, 232);
}
```

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

The header row is child 1, so the even rows are Recreo and Starbucks. A fourth row would be striped too, with no change to the CSS.

---

## Problem: Highlight the Row Under the Mouse

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
.demo th { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); text-align: left; }
.demo tr:nth-child(even) { background-color: rgb(251, 243, 232); }
</style>

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

While the mouse is over a row, give it a `rgb(246, 231, 210)` background. (Hint: `:hover` works on any element, not just links.)

---

## Solution: Highlight the Row Under the Mouse

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
.demo th { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); text-align: left; }
.demo tr:nth-child(even) { background-color: rgb(251, 243, 232); }
.demo tr:hover { background-color: rgb(246, 231, 210); }
</style>

```css
tr:hover {
  background-color: rgb(246, 231, 210);
}
```

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

Move the mouse over the rows above. A row is an element, so it has a hover state like anything else.

---

## Problem: Hover Does Nothing on Striped Rows

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
.demo th { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); text-align: left; }
.demo tr:hover { background-color: rgb(246, 231, 210); }
.demo tr:nth-child(even) { background-color: rgb(251, 243, 232); }
</style>

```css
tr:hover {
  background-color: rgb(246, 231, 210);
}
tr:nth-child(even) {
  background-color: rgb(251, 243, 232);
}
```

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

Hover over Nero: it changes. Hover over Recreo: nothing. Why?

---

## Solution: Hover Does Nothing on Striped Rows

```css
tr:nth-child(even) {
  background-color: rgb(251, 243, 232);
}
tr:hover {
  background-color: rgb(246, 231, 210);
}
```

- `tr:hover` and `tr:nth-child(even)` are equally specific: one tag and one pseudo-class each.
- On an even row, both match. The tie goes to the rule further down, which was the stripe.
- Move `tr:hover` below the stripe rule and hovering wins on every row.
- On a tie, order decides

---

## Problem: Right-Align the Ratings

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
.demo th { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); text-align: left; }
.demo tr:nth-child(even) { background-color: rgb(251, 243, 232); }
</style>

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

Numbers are easier to compare when they line up on the right. Right-align every cell in the Rating column, and only that column.

---

## Solution: Right-Align the Ratings

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
.demo th { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); text-align: left; }
.demo tr:nth-child(even) { background-color: rgb(251, 243, 232); }
.demo .rating { text-align: right; }
</style>

```css
.rating {
  text-align: right;
}
```

```html
<td class="rating">5</td>
<!-- and so on -->
```

A class on every cell in the column, and a rule for the class.

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td class="rating">5</td></tr>
<tr><td>Nero</td><td>Latte</td><td class="rating">3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td class="rating">2</td></tr>
</table>
</div>

---

## Solution: Right-Align the Ratings (Continued)

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
.demo th { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); text-align: left; }
.demo tr:nth-child(even) { background-color: rgb(251, 243, 232); }
.demo td:nth-child(3) { text-align: right; }
</style>

```css
td:nth-child(3) {
  text-align: right;
}
```

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

Same result with no class: the third `<td>` in every row. The class says what the column _is_; `:nth-child(3)` says where it _sits_, and breaks if you add a column in front of it.

---

## Problem: A Skinny Table

<style scoped>
.demo table { border-collapse: collapse; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
.demo th { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); text-align: left; }
.demo tr:nth-child(even) { background-color: rgb(251, 243, 232); }
</style>

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

The table is only as wide as its content. Make it span the full width of the page.

| Property                                                                               | Values                                      |
| -------------------------------------------------------------------------------------- | ------------------------------------------- |
| [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/width) | a length (`600px`) or a percentage (`100%`) |

---

## Solution: A Skinny Table

<style scoped>
.demo table { border-collapse: collapse; width: 100%; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
.demo th { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); text-align: left; }
.demo tr:nth-child(even) { background-color: rgb(251, 243, 232); }
</style>

```css
table {
  width: 100%;
}
```

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td>5</td></tr>
<tr><td>Nero</td><td>Latte</td><td>3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td>2</td></tr>
</table>
</div>

`100%` means the full width of the parent, here the `<body>`. `width` works on any box.

---

## The Whole Table

```css
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
  padding: 8px;
}
th {
  background-color: rgb(43, 26, 14);
  color: rgb(246, 231, 210);
  text-align: left;
}
```

---

## The Whole Table (Continued)

```css
tr:nth-child(even) {
  background-color: rgb(251, 243, 232);
}
tr:hover {
  background-color: rgb(246, 231, 210);
}
.rating {
  text-align: right;
}
```

---

## The Whole Table (Result)

<style scoped>
.demo table { border-collapse: collapse; width: 100%; }
.demo th, .demo td { border: 1px solid black; padding: 8px; }
.demo th { background-color: rgb(43, 26, 14); color: rgb(246, 231, 210); text-align: left; }
.demo tr:nth-child(even) { background-color: rgb(251, 243, 232); }
.demo tr:hover { background-color: rgb(246, 231, 210); }
.demo .rating { text-align: right; }
</style>

<div class="demo">
<table>
<tr><th>Shop</th><th>Drink</th><th>Rating</th></tr>
<tr><td>Recreo</td><td>Cortado</td><td class="rating">5</td></tr>
<tr><td>Nero</td><td>Latte</td><td class="rating">3</td></tr>
<tr><td>Starbucks</td><td>Drip</td><td class="rating">2</td></tr>
</table>
</div>

---

## Summary: Tables

- Browsers draw no lines. `th, td { border: 1px solid black; }` draws them
- `table { border-collapse: collapse; }` merges neighboring borders into single lines
- `padding` on `th, td` keeps the text off the lines
- `<table>`, `<tr>`, `<th>`, and `<td>` are elements: `background-color`, `color`, and `text-align` all work on them
- `tr:nth-child(even)` stripes rows; `tr:hover` highlights the row under the mouse; on a tie, the rule further down wins
- `table { width: 100%; }` stretches the table to fill its parent
