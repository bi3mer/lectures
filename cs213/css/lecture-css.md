---
marp: true
theme: lecture
paginate: true
---

# CSS

Colan Biemer

---

## A Web Page

```html
<h1>Colan's Coffee Blog</h1>
<p>Here is some text about the purpose of my made-up blog.</p>
<h2>Visited</h2>
<ul>
  <li>Recreo - Dynamite</li>
  <li>Nero - at least it looks nice.</li>
  <li>Starbucks - it's fine.</li>
</ul>
```

- [HTML](examples/basic-website/basic-website.html)
- [HTML + CSS](examples/basic-website/css-website.html)

---

## What Is CSS?

**CSS** stands for **Cascading Style Sheets**.

- Style Sheet: a list of rules for how the page should look
- Cascading: when more than one rule could apply to an element, later or more specific rules override earlier ones

---

## Example: A Red Paragraph

<style scoped>
.result { color: red; }
</style>

```html
<p style="color: red;">This paragraph is red.</p>
```

<div class="demo">
<p class="result">This paragraph is red.</p>
</div>

The `style` attribute puts CSS directly on one element. This is **inline** CSS.

---

## Exercise: Blue and Red

<style scoped>
.blue { color: blue; }
.red { color: red; }
</style>

Write two paragraphs. Make the first one <span class="demo blue">blue</span> and the second one <span class="demo red">red</span>.

<div class="demo">
<p class="blue">Paragraph 1</p>
<p class="red">Paragraph 2</p>
</div>

---

## Exercise: Blue and Red (Continued)

```html
<p style="color: blue;">Paragraph 1</p>
<p style="color: red;">Paragraph 2</p>
```

---

## Exercise: Red, Green, Blue

<style scoped>
.red { color: red; }
.green { color: green; }
.blue { color: blue; }
</style>

Add a third paragraph. Make them <span class="demo red">red</span>, <span class="demo green">green</span>, and <span class="demo blue">blue</span>, in that order.

<div class="demo">
<p class="red">Paragraph 1</p>
<p class="green">Paragraph 2</p>
<p class="blue">Paragraph 3</p>
</div>

---

## Exercise: Red, Green, Blue (Continued)

```html
<p style="color: red;">Paragraph 1</p>
<p style="color: green;">Paragraph 2</p>
<p style="color: blue;">Paragraph 3</p>
```

---

## Brief Aside: Named Colors

CSS currently defines 148 named colors: red, blue, green, rebeccapurple, antiquewhite, burlywood, darkgoldenrod, ... [MDN lists them all](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/named-color).

We aren't limited to just those, though.

---

## Any Color with `rgb()`

<style scoped>
.rgb { color: rgb(201, 123, 58); }
</style>

```html
<p style="color: rgb(201, 123, 58);">Paragraph 1</p>
```

<div class="demo">
<p class="rgb">Paragraph 1</p>
</div>

`rgb(red, green, blue)`: how much of each, from `0` (none) to `255` (full).

You will also see hex (`#c97b3a`) and `hsl(...)`. Same idea, but we won't be covering these in any depth.

---

## Problem: What Color Is Each Paragraph?

```html
<p style="color: rgb(255, 0, 0);">Paragraph 1</p>
<p style="color: rgb(0, 255, 0);">Paragraph 2</p>
<p style="color: rgb(0, 0, 255);">Paragraph 3</p>
<p style="color: rgb(0, 0, 0);">Paragraph 4</p>
<p style="color: rgb(128, 128, 128);">Paragraph 5</p>
<p style="color: rgb(255, 255, 255);">Paragraph 6</p>
```

---

## Solution: What Color Is Each Paragraph?

<style scoped>
.c1 { color: rgb(255, 0, 0); }
.c2 { color: rgb(0, 255, 0); }
.c3 { color: rgb(0, 0, 255); }
.c4 { color: rgb(0, 0, 0); }
.c5 { color: rgb(128, 128, 128); }
.c6 { color: rgb(255, 255, 255); }
</style>

<div class="demo">
<p class="c1">Paragraph 1: rgb(255, 0, 0)</p>
<p class="c2">Paragraph 2: rgb(0, 255, 0)</p>
<p class="c3">Paragraph 3: rgb(0, 0, 255)</p>
<p class="c4">Paragraph 4: rgb(0, 0, 0)</p>
<p class="c5">Paragraph 5: rgb(128, 128, 128)</p>
<p class="c6">Paragraph 6: rgb(255, 255, 255)</p>
</div>

---

## Exercise: All `red` with `rgb()`

<style scoped>
.red { color: red; }
</style>

Make all three paragraphs red with `rgb()`.

<div class="demo">
<p class="red">Paragraph 1</p>
<p class="red">Paragraph 2</p>
<p class="red">Paragraph 3</p>
</div>

---

## Exercise: All `red` with `rgb()` (Continued)

```html
<p style="color: rgb(255, 0, 0);">Paragraph 1</p>
<p style="color: rgb(255, 0, 0);">Paragraph 2</p>
<p style="color: rgb(255, 0, 0);">Paragraph 3</p>
```

---

## Problem: All `red`

What if we had 40 paragraphs, and we decided we wanted them to be red? We would have to do each paragraph individually:

```html
<p style="color: rgb(255, 0, 0);">Paragraph 1</p>
<p style="color: rgb(255, 0, 0);">Paragraph 2</p>
<p style="color: rgb(255, 0, 0);">Paragraph 3</p>
...
<p style="color: rgb(255, 0, 0);">Paragraph 40</p>
```

If we ever want to change the color, we have a ton of work ahead of us. (Find and replace all is a great tool but can get messy.)

---

## Problem: All `red` (Continued)

Inline CSS works for one-off tweaks (e.g. this one link should be a different color). To style a whole group of elements at once, we need a way to select a group.

---

## Solution: `<style>`

A `<style>` element in the `<head>` holds rules for the whole page. This is **internal** CSS.

```html
<style>
  [SELECTOR] {
    [property]: [VALUE];
  }
</style>
```

---

## Selector in CSS

```css
[SELECTOR] {
  [property]: [VALUE];
}
```

The **selector** picks which elements the rule applies to. Any tag name works: `p`, `div`, `h1`, `li`, `a`, ...

---

## Original Problem: All Red

What internal-CSS will make all paragraphs red?

---

## Solution: All Red

<style scoped>
.red { color: red; }
</style>

```css
p {
  color: red;
}
```

<div class="demo">
<p class="red">Paragraph 1</p>
<p class="red">Paragraph 2</p>
<p class="red">Paragraph 3</p>
</div>

---

## New Problem: Inline Versus Internal CSS

```html
<head>
  <style>
    p {
      color: red;
    }
  </style>
</head>
<body>
  <p style="color: blue;">Paragraph 1</p>
  <p>Paragraph 2</p>
</body>
```

What will the color of paragraph 1 be? What about paragraph 2?

---

## Inline > Internal

<style scoped>
.blue { color: blue; }
.red { color: red; }
</style>

<div class="demo">
<p class="blue">Paragraph 1</p>
<p class="red">Paragraph 2</p>
</div>

Inline-CSS will overwrite internal CSS. The only exception is when you use `!important`.

---

## Example: `!important`

```html
<head>
  <style>
    p {
      color: red !important;
    }
  </style>
</head>
<body>
  <p style="color: blue;">Paragraph 1</p>
  <p>Paragraph 2</p>
</body>
```

Now, what will the output look like?

---

## Result: `!important`

<style scoped>
.red { color: red; }
</style>

<div class="demo">
<p class="red">Paragraph 1</p>
<p class="red">Paragraph 2</p>
</div>

`!important` overrides inline-CSS.

---

## Exercise: Purple Divs

<style scoped>
.purple { color: purple; }
</style>

How do I make text in every `<div>` <span class="demo purple">purple</span>?

---

## Exercise: Purple Divs (Continued)

```css
div {
  color: purple;
}
```

---

## Exercise: Everything Blue

<style scoped>
.blue { color: blue; }
</style>

How can I make all the text in the whole document <span class="demo blue">blue</span>?

---

## Exercise: Everything Blue (Continued)

```css
body {
  color: blue;
}
```

All the text is inside the `<body>` element. Every element inside `<body>` **inherits** the font color.

---

## Exercise: All Red, Except Divs

<style scoped>
.red { color: red; }
.purple { color: purple; }
</style>

How can I make all the font <span class="demo red">red</span>, except `<div>` font, which will be <span class="demo purple">purple</span>?

---

## Exercise: All Red, Except Divs (Continued)

```css
body {
  color: red;
}

div {
  color: purple;
}
```

`<body>` says red, so any font inside it will be red, _unless_ a tag inside `<body>` (the `<div>` in this case) has a `color` rule of its own.

---

## Software Nomenclature: Parents and Children

```html
<body>
  <ul>
    <li>Recreo</li>
    <li>Nero</li>
  </ul>
</body>
```

- An element that sits inside another element is that element's **child**
- The element it sits inside is its **parent**
- Each `<li>` is a child of `<ul>`. `<ul>` is the parent of both, and is itself a child of `<body>` which is a child of `<html>`

---

## Inheritance

- When a rule sets a property on an element, its children start out with the same value
- Style `<ul>` and every `<li>` inside it matches. Style `<body>` and everything on the page matches
- CSS calls this **inheritance**: values flow down from parent to child

---

## Inheritance Is a Fallback

- A child only uses the inherited value when no rule matches it directly
- If a rule matches the child itself, that rule wins, and the inherited value is ignored

---

## What Inherits?

Generally, text- and color-related properties inherit (`color`, `font-size`, `line-height`) and box properties do not (`border`, `margin`, `width`). When in doubt, look it up: every MDN property page has an **Inherited: yes/no** row.

---

## Problem: Red Body, Blue Link

```css
body {
  color: red;
}
```

```html
<body>
  <p>Read the <a href="reviews.html">reviews</a>.</p>
</body>
```

`<a>` is a child of `<p>`, which is a child of `<body>`. What color is the word "reviews"?

---

## Solution: Red Body, Blue Link

<style scoped>
.demo p { color: red; }
.demo a { color: blue; text-decoration: underline; }
</style>

<div class="demo"><p>Read the <a href="#">reviews</a>.</p></div>

Blue. The paragraph inherits red from `<body>`, but the link does not: a rule matches `<a>` directly, so inheritance is skipped.

We never wrote a rule for `<a>`. The browser did.

---

## The Browser's Default Stylesheet

Every browser ships with its own stylesheet (the **user agent stylesheet**). It gave the HTML-only page on the first slide its big heading and bullets. A simplified piece of it:

```css
h1 {
  font-size: 2em;
}
a {
  color: blue;
  text-decoration: underline;
}
ul {
  list-style: disc;
  padding-left: 40px;
}
```

---

## Your CSS Sits on Top

- The browser's stylesheet applies first; yours is layered after it
- If one of your rules matches an element, it beats the browser's rule for that element
- To change a default, write a rule that matches the element (e.g. `a { color: red; }`)

---

## Example: Changing Font Size and Family for Italicized Text

- How do we make every `<i>` one and a half times bigger? (`font-size`)
- How do we make every `<i>` use a serif font like Georgia? (`font-family`)

---

## Brief Aside: Fonts

<style scoped>
.serif { font-family: Georgia, serif; }
.sans { font-family: Arial, sans-serif; }
.mono { font-family: "Courier New", monospace; }
</style>

`font-family` takes a list. The browser uses the first font it has installed from the list. End the list with a generic family, which every browser has:

- <span class="serif">`serif`: letters with little feet (Georgia, Times New Roman)</span>
- <span class="sans">`sans-serif`: no feet (Arial, Helvetica)</span>
- <span class="mono">`monospace`: every letter the same width (Courier New)</span>

---

## Example: Changing Font Size and Family for Italicized Text (Continued)

```css
i {
  font-size: 150%;
  font-family: Georgia, serif;
}
```

<style scoped>
.fancy { font-size: 150%; font-family: Georgia, serif; }
</style>
<div class="demo">
<p>Example <i class="fancy">italicized</i> text.</p>
</div>

---

## Example: Link Background Color

- How do we give every link a yellow background? (`background-color`)

---

## Example: Link Background Color (Continued)

```css
a {
  background-color: yellow;
}
```

<style scoped>
.highlight { background-color: yellow; }
</style>
<div class="demo">
<p>Documentation on <a class="highlight" href="#">MDN</a> is good.</p>
</div>

---

## Example: Low-Opacity Images

- How do we make every image half transparent? (`opacity`, from `0` to `1`)

---

## Example: Low-Opacity Images (Continued)

```css
img {
  opacity: 0.5;
}
```

<style scoped>
.demo img { width: 140px; margin-right: 48px; }
.faded { opacity: 0.5; }
</style>
<div class="demo">
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect x='10' y='20' width='70' height='60' rx='10' fill='%236b4226'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%236b4226' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%23c97b3a'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%232b1a0e'/></svg>" />
<img class="faded" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect x='10' y='20' width='70' height='60' rx='10' fill='%236b4226'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%236b4226' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%23c97b3a'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%232b1a0e'/></svg>" />
</div>

- Left: `opacity: 1` (the default).
- Right: `opacity: 0.5`.
- `0` is invisible, `1` is solid, and anything between lets the background show through.

---

## There Are Hundreds of Properties

You have seen `color`, `font-size`, `font-family`, `background-color`, and `opacity`, but there are hundreds more. Few memorize them, but you don't have to. Instead, focus on learning how to use CSS (`selector { property: value; }`) and then look things up as you go. The [MDN CSS reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference) is an excellent resource for this.

---

## Problem: Two Kinds of Paragraphs

How do we give every paragraph a `padding` of `100px`, but a few of them a `padding` of `50px`?

- `padding` is the space between an element's text and the edge of its box. More on it later.
- `px` is short for pixels.

---

## Solution: Two Kinds of Paragraphs

```html
<head>
  <style>
    p {
      padding: 100px;
    }
  </style>
</head>
<body>
  <p>Paragraph 1</p>
  <p style="padding: 50px;">Paragraph 2</p>
  <p>Paragraph 3</p>
</body>
```

This works. Inline beats internal, so paragraph 2 gets `50px`.

---

## Problem: 40 Paragraphs, Again

```html
<p>Paragraph 1</p>
<p style="padding: 50px;">Paragraph 2</p>
<p>Paragraph 3</p>
<p style="padding: 50px;">Paragraph 4</p>
...
<p style="padding: 50px;">Paragraph 40</p>
```

Say that ten of the paragraphs have the `50px` styling, but we decide `50px` should really be `40px`. Then we have to make ten updates, and if we change our mind again, we have to make ten more. There needs to be a better way.

---

## Solution: Classes

```css
p {
  padding: 100px;
}
.compact {
  padding: 50px;
}
```

```html
<p>Paragraph 1</p>
<p class="compact">Paragraph 2</p>
<p>Paragraph 3</p>
```

Name the special paragraphs with the `class` attribute; `.compact` (with the dot) selects them. Change `50px` to `40px` once and all ten follow.

---

## Solution: Classes (Continued)

<style scoped>
.demo p { padding: 100px; border: solid }
.demo .compact { padding: 50px;  }
</style>

<div class="demo">
  <p>Paragraph 1</p>
  <p class="compact">Paragraph 2</p>
</div>

---

## Selecting by Class

```css
.[CLASS_NAME] {
  ...
}
```

---

## Problem: `<span>` with Class to Be Bold and/or Italicized

I want to make classes for `<span>` (`"bold"` and `"italicized"`) that let me make inline text bold and/or italicized. What is the CSS for this?

<style scoped>
.w { font-weight: bold; }
.s { font-style: italic; }
</style>

| Property                                                                                           | Values                           | Result                                           |
| -------------------------------------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------ |
| [`font-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-weight) | `normal`, `bold`, `100` to `900` | <span class="w">how heavy the letters are</span> |
| [`font-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-style)   | `normal`, `italic`               | <span class="s">whether the letters slant</span> |

---

## Solution: `<span>` with Class to Be Bold and/or Italicized (But Not Right)

```css
.bold {
  font-weight: bold;
}

.italicized {
  font-style: italic;
}
```

Why is this not right? "I want to make <u>classes for `<span>`</u> (`"bold"` and `"italicized"`) that let me make inline text bold and/or italicized." I want a class that only activates in a `<span>`.

---

## Solution: `<span>` with Class to Be Bold and/or Italicized

```css
/* This is a CSS comment */
span.bold {
  font-weight: bold;
}

span.italicized {
  font-style: italic;
}
```

- No space in `span.bold`: a `<span>` that has class `bold`.
- With a space, `span .bold` means an element with class `bold` _inside_ a `<span>`.

---

## Solution: `<span>` with Class to Be Bold and/or Italicized (Continued)

<style scoped>
span.bold { font-weight: bold; }
span.italicized { font-style: italic; }
</style>

```html
<p>
  Recreo is <span class="bold">dynamite</span>, Nero is
  <span class="italicized">fine</span>, Starbucks is
  <span class="bold italicized">everywhere</span>.
</p>
```

<div class="demo">
<p>Recreo is <span class="bold">dynamite</span>, Nero is <span class="italicized">fine</span>, Starbucks is <span class="bold italicized">everywhere</span>.</p>
</div>

Two classes (`<span class="bold italicized">`) on one element get both rules.

---

## Problem: No Space

```css
p.bold {
  font-weight: bold;
}
```

```html
<p class="bold">One</p>
<p><span class="bold">Two</span></p>
```

Which word is bold?

---

## Solution: No Space

<style scoped>
.demo p.bold { font-weight: bold; }
</style>

<div class="demo">
<p class="bold">One</p>
<p><span class="bold">Two</span></p>
</div>

No space means **and**: `p.bold` is a `<p>` that also has class `bold`. "Two" has the class, but on a `<span>`, so it stays plain.

---

## Problem: Space

```css
p .underline {
  text-decoration: underline;
}
```

```html
<p class="underline">One</p>
<p><span class="underline">Two</span></p>
<p class="underline"><span>Three</span></p>
```

Which words are underlined?

---

## Solution: Space

<style scoped>
.demo p .underline { text-decoration: underline; }
</style>

<div class="demo">
<p class="underline">One</p>
<p><span class="underline">Two</span></p>
<p class="underline"><span>Three</span></p>
</div>

A space means **inside**: `p .underline` is anything with class `underline` inside a `<p>`. "One" and "Three" put the class on the `<p>` itself, and nothing _inside_ them has it, so both stay plain.

---

## Problem: Spans and Links

- How do we give every `<span>`, every `<a>`, and everything with class `blackAndYellow` a black background with yellow text? (`background-color`, `color`)

---

## Solution: Spans and Links

```css
span {
  background-color: black;
  color: yellow;
}

a {
  background-color: black;
  color: yellow;
}

.blackAndYellow {
  background-color: black;
  color: yellow;
}
```

This works, but if we ever make a change, we have to change the other two.

---

## Solution: Spans and Links (Continued)

<style scoped>
.demo span, .demo a, .demo .blackAndYellow { background-color: black; color: yellow; }
</style>

```css
span,
a,
.blackAndYellow {
  background-color: black;
  color: yellow;
}
```

```html
<p>This is a <span>span</span> and this is a <a href="#">link</a>.</p>
<p class="blackAndYellow">This paragraph has class blackAndYellow.</p>
```

<div class="demo">
<p>This is a <span>span</span> and this is a <a href="#">link</a>.</p>
<p class="blackAndYellow">This paragraph has class blackAndYellow.</p>
</div>

---

## Commas Explained

```css
span,
a,
.blackAndYellow {
  background-color: black;
  color: yellow;
}
```

A comma makes a list: the rule applies to every `<span>`, every `<a>`, and everything with class `blackAndYellow`. So far: no space means **and**, a space means **inside**, a comma means **each of these**.

---

## Problem: Blue Divs and Paragraphs

- How do we give every `<div>` and every `<p>` a blue background? (`background-color`)

---

## Solution: Blue Divs and Paragraphs

<style scoped>
.demo div, .demo p { background-color: blue; }
</style>

```css
div,
p {
  background-color: blue;
}
```

```html
<div>This is a div.</div>
<p>This is a paragraph.</p>
<span>This is a span.</span>
```

<div class="demo">
<div>This is a div.</div>
<p>This is a paragraph.</p>
<span>This is a span.</span>
</div>

---

## Review: Jump to a Section

Imagine we have a blog and we want to allow users to jump to the header:

```html
<a [WHAT GOES HERE?]>Visited</a>

<!--Code in Between -->

<h2 [WHAT GOES HERE?]>Visited</h2>
```

---

## Review: Jump to a Section (Solution)

```html
<a href="#visited">Visited</a>

<!--Code in Between -->

<h2 id="visited">Visited</h2>
```

`<a>` (anchor) lets us navigate to elements in our HTML by `id`.

---

## HTML IDs

```html
<h2 id="visited">Visited</h2>
<p id="intro">Here is some text about the purpose of my made-up blog.</p>
<div id="footer">Copyright 2026</div>
```

- `id` is an attribute, like `class`, and any element can have one.
- Its value is a name for that element, and the name must be **unique** within the document: no two elements share an `id`.

---

## Problem: Two Elements, One ID

```html
<p id="visited">I have visited a lot of coffee shops.</p>
<div id="visited">Visited</div>
```

Is this valid HTML?

---

## Solution: Two Elements, One ID

No. An `id` must be **unique**: one element per name on a page. Two elements named `visited` would leave `href="#visited"` with nowhere definite to go.

The browser will not stop you (it quietly picks the first one), but the HTML is invalid. This is the difference from `class`: a class can go on as many elements as you like; an ID goes on exactly one.

---

## Selecting by ID

```css
#[ID_NAME] {
  ...
}
```

```css
#visited {
  color: green;
}
```

```html
<h2 id="visited">Visited</h2>
```

`.` selects by class; `#` selects by ID.

---

## Problem: Green Links

```html
<p>
  Read the <a href="reviews.html">reviews</a> or my
  <a href="about.html">about page</a>.
</p>
```

- Let's say that we don't like the default behavior for `<a>` and we want our links to be green. How can we do that?

---

## Solution: Green Links

<style scoped>
.demo a { color: green; text-decoration: underline; }
</style>

```css
a {
  color: green;
}
```

<div class="demo">
<p>Read the <a href="#">reviews</a> or my <a href="#">about page</a>.</p>
</div>

---

## Problem: About Link Without Underline

```css
a {
  color: green;
}
```

```html
<p>
  Read the <a href="reviews.html">reviews</a> or my
  <a href="about.html">about page</a>.
</p>
```

- Now that every link is green, let's give the "about page" link special behavior: no underline. How can we do that with [text-decoration](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-decoration)?

---

## Solution: About Link Without Underline

<style scoped>
.demo a { color: green; text-decoration: underline; }
.demo .about { text-decoration: none; }
</style>

```css
a {
  color: green;
}

#about {
  text-decoration: none;
}
```

```html
<p>
  Read the <a href="reviews.html">reviews</a> or my
  <a id="about" href="about.html">about page</a>.
</p>
```

<div class="demo">
<p>Read the <a href="#">reviews</a> or my <a class="about" href="#">about page</a>.</p>
</div>

---

## Exercise: Use a Class Instead

```css
a {
  color: green;
}
```

```html
<p>
  Read the <a href="reviews.html">reviews</a> or my
  <a href="about.html">about page</a>.
</p>
```

- Remove the underline from the "about page" link using a class instead of an id.

---

## Exercise: Use a Class Instead (Continued)

```css
.about {
  text-decoration: none;
}
```

```html
<p>
  Read the <a href="reviews.html">reviews</a> or my
  <a class="about" href="about.html">about page</a>.
</p>
```

Same result as `#about`. Only the selector and the attribute changed.

---

## Exercise: No Class, No ID

```css
a {
  color: green;
}
```

```html
<p>
  Read the <a href="reviews.html">reviews</a> or my
  <a href="about.html">about page</a>.
</p>
```

- Remove the underline from the "about page" link without adding a class or an id. (Hint: a space in a selector means _inside_.)

---

## Exercise: No Class, No ID (Continued)

```css
span a {
  text-decoration: none;
}
```

```html
<p>
  Read the <a href="reviews.html">reviews</a> or my
  <span><a href="about.html">about page.</a></span>
</p>
```

---

## Which Is Best? Which Is Worst? Why?

```css
/* id */
#about {
  text-decoration: none;
}

/* class */
.about {
  text-decoration: none;
}

/* trick */
span a {
  text-decoration: none;
}
```

---

## Which Is Best? Which Is Worst? Why? My Thoughts

```css
/* id */
#about {
  text-decoration: none;
}
/* class */
.about {
  text-decoration: none;
}
/* trick */
span a {
  text-decoration: none;
}
```

The worst is the "trick." It wouldn't make sense to others reading the HTML. Given the name "about", I'd say `id` makes the most sense. But a renamed class like "link-no-underline" would be reusable.

---

## Which One?

| Selector          | Use when                                        |
| ----------------- | ----------------------------------------------- |
| Tag `p`           | Every element of that type should look the same |
| Class `.favorite` | A group of elements share a look                |
| ID `#header`      | Exactly one element needs its own look          |

---

## Problem: Class and ID (Line 1)

```css
.section {
  color: gray;
  background-color: yellow;
}

#visited {
  color: green;
}
```

```html
<a href="#visited">Jump to visited</a>
```

What does this link look like? What happens when it is clicked?

---

## Solution: Class and ID (Line 1)

```css
.section {
  color: gray;
  background-color: yellow;
}

#visited {
  color: green;
}
```

```html
<a href="#visited">Jump to visited</a>
```

Neither rule matches: the link has no class and no id, so it keeps the default look. Clicking it scrolls to the element with `id="visited"`. If no element has that id, the address bar still changes to `#visited`, but the page does not move and no error appears.

---

## Problem: Class and ID (Line 2)

```css
.section {
  color: gray;
  background-color: yellow;
}

#visited {
  color: green;
}
```

```html
<h2 class="section" id="wishlist">Wishlist</h2>
```

What does this heading look like?

---

## Solution: Class and ID (Line 2)

<style scoped>
.demo h2 { border-bottom: none; }
.demo .section { color: gray; background-color: yellow; }
</style>

```css
.section {
  color: gray;
  background-color: yellow;
}

#visited {
  color: green;
}
```

```html
<h2 class="section" id="wishlist">Wishlist</h2>
```

<div class="demo"><h2 class="section">Wishlist</h2></div>

Matches `.section`: gray text on yellow. `#visited` does not match, because this id is `wishlist`.

---

## Problem: Class and ID (Line 3)

```css
.section {
  color: gray;
  background-color: yellow;
}

#visited {
  color: green;
}
```

```html
<h2 class="section" id="visited">Visited</h2>
```

What does this heading look like? It shares `class="section"` with line 2: is that valid?

---

## Solution: Class and ID (Line 3)

<style scoped>
.demo h2 { border-bottom: none; }
.demo .section { color: gray; background-color: yellow; }
.demo .green { color: green; }
</style>

```css
.section {
  color: gray;
  background-color: yellow;
}

#visited {
  color: green;
}
```

```html
<h2 class="section" id="visited">Visited</h2>
```

<div class="demo"><h2 class="section green">Visited</h2></div>

Matches both. The ID wins on `color`, so the text is green. The yellow is from `.section`. Id `visited` is unique. (This is where the link would navigate to.)

---

## When Rules Conflict

More than one rule can match the same element. When they disagree, CSS picks one:

- The most specific selector wins: **ID > class > tag**. If two rules are equally specific, the one further down in the CSS wins.
- Within a tier (e.g. `ID`), more pieces beat fewer: `span a` (two tags) beats `a` (one tag). A higher tier still wins first: `.about` (one class) beats `span a` (two tags)

---

## Problem: Two Rules, One Selector

The most specific selector wins: **ID > class > tag**. If two rules are equally specific, the one further down in the CSS wins.

```css
p {
  font-size: 16px;
}

p {
  font-size: 48px;
}
```

```html
<p>Will I have a font size of 16 pixels or 48 pixels?</p>
```

---

## Solution: Two Rules, One Selector

<style scoped>
.demo p { font-size: 48px; }
</style>

```css
p {
  font-size: 16px;
}

p {
  font-size: 48px;
}
```

<div class="demo"><p>Will I have a font size of 16 pixels or 48 pixels?</p></div>

`48px`. Both selectors are the same, so neither is more specific. The tie goes to the rule further down in the CSS.

---

## Problem: When Rules Conflict

```css
p {
  color: black;
}
.note {
  color: blue;
}
#warning {
  color: red;
}
```

```html
<p class="note" id="warning">What color am I?</p>
```

All three rules match this paragraph. What color will it be?

(Hint: **ID > class > tag**)

---

## Solution: When Rules Conflict

<style scoped>
.demo p { color: black; }
.demo .note { color: blue; }
.demo .warning { color: red; }
</style>

```css
p {
  color: black;
}
.note {
  color: blue;
}
#warning {
  color: red;
}
```

<div class="demo"><p class="note warning">What color am I?</p></div>

Red. The most specific selector wins: **ID > class > tag**. If two rules are equally specific, the one further down in the CSS wins.

---

## Styling Text

<style scoped>
.demo p { text-align: center; text-transform: uppercase; letter-spacing: 2px; line-height: 2; }
</style>

```css
p {
  text-align: center; /* left, center, right              */
  text-transform: uppercase; /* uppercase, lowercase, capitalize */
  letter-spacing: 2px; /* space between letters            */
  line-height: 2; /* space between lines (x font size) */
}
```

<div class="demo">
<p>Here is some text about the purpose of my made-up blog. It runs onto a second line so the line height shows.</p>
</div>

---

## Problem: Centered and Uppercase

```html
<h2>Visited</h2>
```

Center the heading and make it all caps.

| Property                                                                                                 | Values                                 |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-align)         | `left`, `center`, `right`              |
| [`text-transform`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-transform) | `uppercase`, `lowercase`, `capitalize` |

---

## Solution: Centered and Uppercase

<style scoped>
.demo h2 { border-bottom: none; text-align: center; text-transform: uppercase; }
</style>

```css
h2 {
  text-align: center;
  text-transform: uppercase;
}
```

<div class="demo">
<h2>Visited</h2>
</div>

---

## Problem: Letter and Line Spacing

```html
<h2>Visited</h2>
<p>
  Here is some text about the purpose of my made-up blog. I drink a lot of
  coffee, I have opinions about where to drink it, and I wanted somewhere to
  write those opinions down. That is the whole plan.
</p>
```

Put `2px` of space between the heading's letters, and make the paragraph's lines twice as tall as normal.

| Property                                                                                                 | Values                                             |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [`letter-spacing`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/letter-spacing) | a length, e.g. `2px`                               |
| [`line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-height)       | a number, e.g. `1.6` (a multiple of the font size) |

---

## Solution: Letter and Line Spacing

<style scoped>
.demo h2 { border-bottom: none; letter-spacing: 2px; }
.demo p { line-height: 2; }
</style>

```css
h2 {
  letter-spacing: 2px;
}

p {
  line-height: 2;
}
```

<div class="demo">
<h2>Visited</h2>
<p>Here is some text about the purpose of my made-up blog. I drink a lot of coffee, I have opinions about where to drink it, and I wanted somewhere to write those opinions down. That is the whole plan.</p>
</div>

---

## Pseudo-Classes

So far, selectors pick elements by what they _are_: a tag, a class, an id. A **pseudo-class** picks elements by what _state_ they are in:

- the mouse is over it (`:hover`)
- the user has already visited it (`:visited`)
- it is being clicked right now (`:active`)

There are [many more](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-classes).

---

## Pseudo-Class Format

```css
[SELECTOR]:[STATE] {
  [property]: [VALUE];
}
```

```css
a:hover {
  color: orange;
}
```

- A colon, no space: `a:hover` is a link _and_ the mouse is over it, the same way `span.bold` is a span _and_ has class `bold`.
- For "which rule wins", a pseudo-class counts like a class. `a:hover` is more specific than `a`.

---

## Problem: Hover

```css
a {
  color: green;
  text-decoration: none;
}
```

```html
<a href="index.html">Home</a>
<p>
  Read the <a href="reviews.html">reviews</a> or my
  <a href="about.html">about page</a>.
</p>
```

While the mouse is over a link _inside a paragraph_, make its text `48px`. The Home link is not in a paragraph and should not change on hover.

---

## Solution: Hover

<style scoped>
.demo a { color: green; text-decoration: none; }
.demo p a:hover { font-size: 48px; }
</style>

```css
p a:hover {
  font-size: 48px;
}
```

<div class="demo">
<a href="#">Home</a>
<p>Read the <a href="#">reviews</a> or my <a href="#">about page</a>.</p>
</div>

Space means inside, colon means state: a link inside a `<p>` that the mouse is over. Home is not inside a `<p>`, so it never matches.

---

## Problem: Visited

```css
a {
  color: green;
  text-decoration: none;
}
```

```html
<p>Read my <a href="about.html">about page</a>.</p>
<ul class="reviews">
  <li><a href="recreo.html">Recreo</a></li>
  <li><a href="nero.html">Nero</a></li>
</ul>
```

Browsers turn a link purple once you have visited it. Our `a` rule makes every link green, visited or not. In the reviews list only, make links the user has already visited gray, so they can see which reviews they have read.

---

## Solution: Visited

<style scoped>
.demo a { color: green; text-decoration: none; }
.demo .reviews a.seen { color: gray; }
</style>

```css
.reviews a:visited {
  color: gray;
}
```

<div class="demo">
<p>Read my <a class="seen" href="#">about page</a>.</p>
<ul class="reviews">
<li><a class="seen" href="#">Recreo</a></li>
<li><a href="#">Nero</a></li>
</ul>
</div>

Pretend the user has already read the about page and the Recreo review. Both links are visited, but only Recreo is inside `.reviews`, so only Recreo turns gray.

NOTE: `:visited` can only change colors. Browsers block anything else for [privacy](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Selectors/Privacy_and_:visited).

---

## Problem: Active

```css
a {
  color: green;
  text-decoration: none;
}
```

```html
<p>
  Read the <a href="reviews.html">reviews</a> or my
  <a class="about" href="about.html">about page</a>.
</p>
```

While the mouse button is held down on the about link, and only that one, make it red and uppercase.

---

## Solution: Active

<style scoped>
.demo a { color: green; text-decoration: none; }
.demo .about:active { color: red; text-transform: uppercase; }
</style>

```css
.about:active {
  color: red;
  text-transform: uppercase;
}
```

```html
<p>
  Read the <a href="reviews.html">reviews</a> or my
  <a class="about" href="about.html">about page</a>.
</p>
```

<div class="demo">
<p>Read the <a href="#">reviews</a> or my <a class="about" href="#">about page</a>.</p>
</div>

No space: class `about` _and_ being clicked. Press and hold on it above; `:active` matches from mouse down to mouse up.

---

## Problem: Order Matters

```css
a {
  color: green;
  text-decoration: none;
}
a:hover {
  color: orange;
}
a:visited {
  color: gray;
}
```

```html
<a href="https://www.google.com">Example</a>
```

- What color is the link when the mouse is not over it?
- What color is the link when the mouse is over it?

---

## Solution: Order Matters

```css
a {
  color: green;
  text-decoration: none;
}
a:hover {
  color: orange;
}
a:visited {
  color: gray;
}
```

- Not over it: green if you have never been to google.com, gray if you have. (You have.)
- Over it: orange if never visited. Gray if visited: `a:hover` and `a:visited` both match and are equally specific, so the one further down wins.

---

## Pseudo-Elements

A pseudo-class (`:hover`) selects a whole element by its state. A **pseudo-element** selects _part_ of an element: its first letter, its first line, the text the user has highlighted.

```css
[SELECTOR]::[PART] {
  [property]: [VALUE];
}
```

- Two colons: `p::first-letter` is the first letter of every `<p>`.
- Others you will see: `::first-line`, `::selection`, `::before`, `::after`. [MDN lists them all](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Pseudo-elements).

---

## Problem: Big First Letter

```html
<p>
  Here is some text about the purpose of my made-up blog. I drink a lot of
  coffee, I have opinions about where to drink it, and I wanted somewhere to
  write those opinions down. That is the whole plan.
</p>
```

Make the first letter of every paragraph `48px`, like the oversized letter that starts a book chapter. (Hint: `::first-letter` `font-size`)

---

## Solution: Big First Letter

<style scoped>
.demo p::first-letter { font-size: 48px; }
</style>

```css
p::first-letter {
  font-size: 48px;
}
```

<div class="demo">
<p>Here is some text about the purpose of my made-up blog. I drink a lot of coffee, I have opinions about where to drink it, and I wanted somewhere to write those opinions down. That is the whole plan.</p>
</div>

---

## Problem: Uppercase First Line

```html
<p>
  Here is some text about the purpose of my made-up blog. I drink a lot of
  coffee, I have opinions about where to drink it, and I wanted somewhere to
  write those opinions down. That is the whole plan.
</p>
```

Make the first line of every paragraph uppercase. (Hint: `::first-line` `text-transform`)

---

## Solution: Uppercase First Line

<style scoped>
.demo p::first-line { text-transform: uppercase; }
</style>

```css
p::first-line {
  text-transform: uppercase;
}
```

<div class="demo">
<p>Here is some text about the purpose of my made-up blog. I drink a lot of coffee, I have opinions about where to drink it, and I wanted somewhere to write those opinions down. That is the whole plan.</p>
</div>

Which words are on the first line depends on the width of the page. Make the window narrower and the uppercase part follows.

---

## Review: Attributes

```html
<a href="about.html" target="_blank">about page</a>
<img src="cup.png" alt="A cup of coffee" />
<p class="compact" id="intro">Here is some text.</p>
```

- An **attribute** is a `name="value"` pair inside an opening tag.
- `href`, `target`, `src`, `alt`, `class`, `id`, `style` are all attributes.

---

## Attribute Selectors

An **attribute selector** works for any attribute: `alt`, `href`, `target`, ...

```css
[SELECTOR][[ATTRIBUTE]] {
  [property]: [VALUE];
}
```

---

## Attribute Selectors (Continued)

<style scoped>
.demo a[href] { text-transform: capitalize; }
</style>

```css
a[href] {
  text-transform: capitalize;
}
```

```html
<a href="reviews.html">reviews</a> <a>coming soon</a>
```

<div class="demo"><a href="#">reviews</a> &nbsp; <a>coming soon</a></div>
<br/>

`[href]` asks one question: **does this element have an `href` attribute?** The value does not matter. The first link does, so it matches; the second has no `href`, so it is left alone.

---

## Problem: Images Without Alt Text

```html
<img src="cup.png" alt="A cup of coffee" /> <img src="beans.png" />
```

Make any image without `alt` text have `20%` opacity.

---

## Solution: Images Without Alt Text

<style scoped>
.demo img { width: 140px; margin-right: 48px; opacity: 0.2; }
.demo img[alt] { opacity: 1; }
</style>

```css
img {
  opacity: 0.2;
}

img[alt] {
  opacity: 1;
}
```

<div class="demo">
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect x='10' y='20' width='70' height='60' rx='10' fill='%236b4226'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%236b4226' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%23c97b3a'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%232b1a0e'/></svg>" alt="A cup of coffee" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect x='10' y='20' width='70' height='60' rx='10' fill='%236b4226'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%236b4226' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%23c97b3a'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%232b1a0e'/></svg>" />
</div>

---

## Solution: Images Without Alt Text (Continued)

<style scoped>
.demo img { width: 140px; margin-right: 48px; }
.demo img:not([alt]) { opacity: 0.2; }
</style>

```css
img:not([alt]) {
  opacity: 0.2;
}
```

<div class="demo">
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect x='10' y='20' width='70' height='60' rx='10' fill='%236b4226'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%236b4226' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%23c97b3a'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%232b1a0e'/></svg>" alt="A cup of coffee" />
<img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><rect x='10' y='20' width='70' height='60' rx='10' fill='%236b4226'/><path d='M80 35h12a14 14 0 0 1 0 28H80' fill='none' stroke='%236b4226' stroke-width='9'/><ellipse cx='45' cy='20' rx='35' ry='7' fill='%23c97b3a'/><rect x='5' y='84' width='90' height='8' rx='4' fill='%232b1a0e'/></svg>" />
</div>

Same result in one rule. `:not()` is a pseudo-class that flips whatever is inside the parentheses: `img:not([alt])` is an image that does _not_ have an `alt` attribute.

---

## Attribute Selectors: A Specific Value

```css
[SELECTOR][[ATTRIBUTE="VALUE"]] {
  [property]: [VALUE];
}
```

```css
a[href="index.html"] {
  font-weight: bold;
}
```

Add `="VALUE"` inside the brackets to require an exact value: a link _and_ its `href` is exactly `index.html`. Quotes around the value.

---

## Problem: Links That Open a New Tab

```html
<p>
  Read the <a href="reviews.html">reviews</a> or
  <a href="https://www.google.com" target="_blank">search</a>.
</p>
```

`target="_blank"` in `<a>` will cause the link to open in a new page. Say that we want to spread out the letters (`5px`) of every link that opens in a new tab. What is the CSS to do this?

---

## Solution: Links That Open a New Tab

<style scoped>
.demo a[target="_blank"] { letter-spacing: 5px; }
</style>

```css
a[target="_blank"] {
  letter-spacing: 5px;
}
```

```html
<p>
  Read the <a href="reviews.html">reviews</a> or
  <a href="https://www.google.com" target="_blank">search</a>.
</p>
```

<div class="demo">
<p>Read the <a href="#">reviews</a> or <a href="#" target="_blank">search</a>.</p>
</div>

---

## Attribute Selectors: The Full Set

| Selector       | Matches when the attribute...            | Example               |
| -------------- | ---------------------------------------- | --------------------- |
| `[attr]`       | exists                                   | `img[alt]`            |
| `[attr="v"]`   | is exactly `v`                           | `a[target="_blank"]`  |
| `[attr^="v"]`  | starts with `v`                          | `a[href^="https"]`    |
| `[attr$="v"]`  | ends with `v`                            | `a[href$=".pdf"]`     |
| `[attr*="v"]`  | contains `v` anywhere                    | `a[href*="google"]`   |
| `[attr~="v"]`  | is a space-separated list containing `v` | `p[class~="compact"]` |
| `[attr\|="v"]` | is `v` or starts with `v-`               | `p[lang\|="en"]`      |

CSS gives you many more ways to select attributes: [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Attribute_selectors).

---

## What If the CSS Is Hundreds of Lines?

```html
<head>
  <style>
    body { ... }
    h1 { ... }
    h2 { ... }
    p { ... }
    ul { ... }
    li { ... }
    a { ... }
    /* 300 more lines */
  </style>
</head>
```

The `<head>` is now mostly CSS, and a second page needs all of it copied again.

Can I separate my HTML from my CSS?

---

## External CSS

`style.css`

```css
p {
  color: red;
}
```

`index.html`

```html
<head>
  <link rel="stylesheet" href="style.css" />
</head>
```

Yes. Put the rules in their own file and `<link>` it from the `<head>`. This is **external** CSS. One file styles every page that links to it.

---

## Three Places for CSS

| Kind     | Where it goes                                    | Use when                               |
| -------- | ------------------------------------------------ | -------------------------------------- |
| Inline   | `style` attribute on one element                 | A one-off tweak to a single element    |
| Internal | `<style>` in the `<head>` (also called embedded) | Rules for this one page                |
| External | `<link rel="stylesheet" href="style.css" />`     | Rules shared by every page on the site |

Inline beats the other two (unless `!important`). Between internal and external, the usual rules apply: more specific wins, and on a tie, whichever comes later in the `<head>`.

---

## Summary: Writing Rules

```css
selector {
  property: value;
}
```

- Select by tag (`p`), class (`.compact`), id (`#about`), or attribute (`a[target="_blank"]`)
- No space means _and_ (`span.bold`), a space means _inside_ (`p a`), a comma means _each of these_ (`span, a`)
- `:hover`, `:visited`, `:active` select by state; `::first-letter`, `::first-line` select part of an element
- An id is unique on the page; a class can go on as many elements as you like
- There are hundreds of properties. Learn the pattern, then look them up on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

---

## Summary: Which Rule Wins

- Children inherit text and color properties from their parent; a rule on the child itself wins
- Inline beats internal and external, unless a rule says `!important`
- The most specific selector wins: **ID > class > tag** (a pseudo-class counts like a class)
- Within a tier, more pieces beat fewer: `span a` beats `a`
- On a tie, the rule further down in the CSS wins
