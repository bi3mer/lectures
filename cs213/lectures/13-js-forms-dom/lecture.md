---
marp: true
theme: lecture
paginate: true
---

<style>
/* Code on the left, the page it makes (or a diagram) on the right. */
.side-by-side { display: grid; grid-template-columns: 560px minmax(0, 1fr); gap: 24px; align-items: start; }
.side-by-side p { margin: 0; }
.caption { font-size: 20px; color: var(--secondary); }
/* The theme draws a .demo as a white panel whose 12px edge is a shadow, so the margins keep
   that edge clear of the caption above and the slide's sides. The slide's dark color-scheme
   would reach the live controls inside, so a .demo goes back to the browser's light one. */
.demo { margin: 20px 12px 28px; color-scheme: light; }
.demo p { margin: 0; }
.demo div + div { margin-top: 8px; }
.demo input, .demo select, .demo button { font: inherit; }
/* Answer choices for the Predict slides, all on one line. */
.choices { display: flex; gap: 48px; }
</style>

# Forms and the DOM

Colan Biemer

---

## Outline

- HTML Forms
- The DOM

---

# HTML Forms

---

## Forms

A **form** collects what someone types or picks. Every login, search box, and checkout is one.

<div class="side-by-side">
<div>

```html
<form>
  <label for="credit">Credit</label>
  <input id="credit" />
  <button>Export</button>
</form>
```

</div>
<div>
<p class="caption">Page</p>
<div class="demo"><label for="demo-credit">Credit</label> <input id="demo-credit" size="12" /> <button type="button">Export</button></div>
</div>
</div>

---

## The `type` Attribute

![w:900 Four input tags were the same except for their type attribute, which was "text", "range", "checkbox", and "color". Each one pointed to the control it made on the page: a text box, a slider, a ticked checkbox, and an orange color swatch.](examples/diagrams/type-attribute.svg)

An `<input>`'s `type` attribute picks what kind of control it is.

---

## Input Types

<!-- TODO: Colan to look at this slide. -->

<style scoped>
table { font-size: 0.7em; }
</style>

<center>

| `type`     | Shows                          | Try it                                    |
| ---------- | ------------------------------ | ----------------------------------------- |
| `text`     | a one-line box, the default    | <input type="text" size="12" />           |
| `number`   | a box for numbers, with arrows | <input type="number" value="3" />         |
| `password` | a box that hides what's typed  | <input type="password" value="hunter2" /> |
| `email`    | a box for an email address     | <input type="email" size="12" />          |
| `checkbox` | a box to tick                  | <input type="checkbox" />                 |
| `range`    | a slider                       | <input type="range" />                    |
| `color`    | a color picker                 | <input type="color" value="#f99d1b" />    |
| `date`     | a date picker                  | <input type="date" />                     |

</center>

For many lines of text, `<textarea>` makes a bigger box. Unlike `<input>`, it has a closing tag.

---

## `<label>`

![w:1040 An input tag with the id "show-credit" sat above a label tag whose for was "show-credit". An arrow ran from the label's for value up to the matching id value. On the page, a pointer clicked the words Show credit, and an arrow ran from the words to the checkbox, which was ticked.](examples/diagrams/label-for-id.svg)

A label's `for` matches its control's `id`. Clicking the label clicks the control, which makes a small checkbox easier to hit. A screen reader reads the label aloud when the control is selected, so every control except a button needs one.

---

## Input Attributes

<!-- prettier-ignore -->
```html
<input id="size" type="range" min="16" max="48" value="32" />
<input id="credit" placeholder="your name" />
<input id="show-credit" type="checkbox" checked />
<input id="email" type="email" disabled />
```

- `value` is the starting value. `min`, `max`, and `step` limit a slider or a number box.
- `placeholder` is a gray hint. It disappears when we type, and it's never the value.
- `checked` and `disabled` need no value: having the attribute means yes.

---

## Setting Up the Starter

Today's page is [Shutterbug](https://bi3mer.github.io/lectures/cs213/lectures/13-js-forms-dom/examples/photo-final/), a photo editor. Its starter has four files on GitHub: [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/13-js-forms-dom/examples/photo-starter/index.html), [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/13-js-forms-dom/examples/photo-starter/practice.js), [photo.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/13-js-forms-dom/examples/photo-starter/photo.js), and the photo, [lake.svg](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/13-js-forms-dom/examples/photo-starter/lake.svg). Set them up in WebStorm, in a new folder:

1. Open each file, and click **Copy raw file**, the copy icon above the code.
2. Paste each one into a new file in WebStorm with the same name.

---

## Problem (You): Text

<style scoped>
pre { font-size: 0.75em; }
</style>

Like a meme, a photo can have optional text on it. Paste its controls under the Text comment in `index.html`, then tell me what each one does.

```html
<div>
  <label for="text">Text</label>
  <textarea id="text" name="text" placeholder="Optional"></textarea>
  <span id="chars-left"></span>
</div>
<div>
  <label for="color">Text color</label>
  <input id="color" name="color" type="color" value="#ffffff" />
</div>
```

- Click each label. What happens?
- Why is the `<span>` empty?
- Why does each control have both an `id` and a `name`?

---

## Solution (You): Text

- Clicking a label clicks its control, since its `for` matches the control's `id`.
- The `<span>` is a spot for a count that our code will add later: how many characters are left.
- The `id` is for the label and our code, and the `name` is for [submitting the form](#23).

<div class="footnote">Color inputs took only hex, like <code>#ffffff</code>, until 2025, when Safari 18.4 and Firefox 143 began taking <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color">any CSS color</a>. Chrome still turns any other value into black, <code>#000000</code>. If you're curious about hex, see <a href="https://www.pluralsight.com/resources/blog/upskilling/understanding-hexadecimal-colors-simple">Hexadecimal Colors Explained</a>.</div>

---

## Problem (You): Find the Bug

**There is a bug** in this HTML. Find it.

```html
<div>
  <label for="credit">Credit</label>
  <input id="credit" name="credit" />
</div>
<div>
  <input id="show-credit" name="show-credit" type="checkbox" />
  <label for="credit">Show credit on the photo</label>
</div>
```

---

## Problem (You): Credit

<style scoped>
pre { font-size: 0.75em; }
</style>

The second label's `for` should be `show-credit`, [the checkbox's `id`](#7). Paste the fixed HTML under the Credit comment, then tell me what happens.

```html
<div>
  <label for="credit">Credit</label>
  <input id="credit" name="credit" />
</div>
<div>
  <input id="show-credit" name="show-credit" type="checkbox" />
  <label for="show-credit">Show credit on the photo</label>
</div>
```

---

## `<select>` and `<option>`

```html
<label for="crop">Crop</label>
<select id="crop">
  <option value="square">Square</option>
  <option value="portrait">Portrait, 4:5</option>
  <option value="wide" selected>Widescreen, 16:9</option>
</select>
```

<div class="demo"><label for="demo-crop">Crop</label> <select id="demo-crop"><option value="square">Square</option><option value="portrait">Portrait, 4:5</option><option value="wide" selected>Widescreen, 16:9</option></select></div>

A `<select>` is a drop-down list. Each `<option>` shows its text, but code sees its `value`. `selected` picks the starting option. Without it, the first one starts picked.

---

## Radio Buttons

<!-- prettier-ignore -->
```html
<input type="radio" id="light" name="theme" value="light" checked />
<label for="light">Light</label>
<input type="radio" id="dark" name="theme" value="dark" />
<label for="dark">Dark</label>
```

<div class="demo"><input type="radio" id="demo-light" name="demo-theme" value="light" checked /> <label for="demo-light">Light</label> <input type="radio" id="demo-dark" name="demo-theme" value="dark" /> <label for="demo-dark">Dark</label></div>

Radio buttons that share a `name` are one group, so picking one unpicks the others. Each one still needs its own `id`, for its label.

---

## `<fieldset>` and `<legend>`

<div class="side-by-side">
<div>

```html
<fieldset>
  <legend>Adjust</legend>
  <label for="brightness">Brightness</label>
  <input id="brightness" type="range" />
  <label for="contrast">Contrast</label>
  <input id="contrast" type="range" />
</fieldset>
```

</div>
<div>
<p class="caption">Page</p>
<div class="demo"><fieldset><legend>Adjust</legend><div><label for="demo-brightness">Brightness</label> <input id="demo-brightness" type="range" /></div><div><label for="demo-contrast">Contrast</label> <input id="demo-contrast" type="range" /></div></fieldset></div>
</div>
</div>

A `<fieldset>` draws a box around controls that go together, and its `<legend>` is the box's caption. Screen readers read the legend as the group's name.

---

## Problem (You): Position

Paste this under the Position comment, then tell me what each one does.

```html
<fieldset>
  <legend>Position</legend>
  <input id="top" name="position" type="radio" value="top" checked />
  <label for="top">Top</label>
  <input id="bottom" name="position" type="radio" value="bottom" />
  <label for="bottom">Bottom</label>
</fieldset>
```

- Pick Bottom, then Top. Why can't both be picked?
- Both buttons have the same `name`. Why does each need its own `id`?
- Which one starts picked, and why?

---

## Solution (You): Position

- Radio buttons that share a `name` are [one group](#15), so picking one unpicks the other.
- Each label's `for` points at its own button's `id`.
- Top, since it has `checked`.

---

## Font

Paste this under the Font comment, then tell me what each one does.

```html
<div>
  <label for="font">Font</label>
  <select id="font" name="font">
    <option value="impact">Impact</option>
    <option value="georgia">Georgia</option>
    <option value="comic">Comic Sans</option>
  </select>
</div>
```

- Pick Comic Sans. What will our code see?
- No option has `selected`. Which one starts picked?

---

## Photo Sliders

<style scoped>
pre { font-size: 0.65em; }
</style>

Paste this under the Adjust comment, then tell me what each one does.

<!-- prettier-ignore -->
```html
<fieldset>
  <legend>Adjust</legend>
  <div>
    <label for="brightness">Brightness</label>
    <input id="brightness" name="brightness" type="range" min="0" max="200" value="100" />
  </div>
  <div>
    <label for="contrast">Contrast</label>
    <input id="contrast" name="contrast" type="range" min="0" max="200" value="100" />
  </div>
  <div>
    <label for="saturation">Saturation</label>
    <input id="saturation" name="saturation" type="range" min="0" max="200" value="100" />
  </div>
</fieldset>
```

- Drag Brightness. Why doesn't the photo change?
- Why does each slider start at 100 and stop at 200?

---

## Hue and Text Size

<style scoped>
pre { font-size: 0.7em; }
</style>

Paste these in the Adjust fieldset, just before `</fieldset>`, then tell me what each one does.

<!-- prettier-ignore -->
```html
<div>
  <label for="hue">Hue</label>
  <input id="hue" name="hue" type="color" value="#3399ff" />
</div>
<div>
  <label for="strength">Hue strength</label>
  <input id="strength" name="strength" type="range" min="0" max="1" step="0.01" value="0" />
</div>
<div>
  <label for="size">Text size</label>
  <input id="size" name="size" type="range" min="16" max="48" value="32" />
</div>
```

- Why does Hue strength need `step="0.01"`?
- What do 16, 48, and 32 mean for Text size?

---

## Solution (You): Hue and Text Size

- A slider [steps](#8) by 1 unless told otherwise, so from 0 to 1 it would stop only at 0 and 1. `0.01` gives it 101 stops.
- They're pixels: the text on the photo goes from 16px to 48px, and starts at 32px.

---

## Submitting a Form

```html
<form action="https://www.google.com/search">
  <input name="q" />
  <button>Search</button>
</form>
```

<form class="demo" action="https://www.google.com/search" target="_blank"><input name="q" value="sunset" /> <button>Search</button></form>

**Submitting** a form loads its `action` address with what we typed, so clicking **Search** loads `https://www.google.com/search?q=sunset`. With no `action`, submitting loads the same page again. Before JavaScript, it was how a page [talked to the server](../08-js-intro/lecture.html#8).

---

## The Query String

<style scoped>
table { font-size: 0.75em; }
</style>

```text
index.html?text=Golden+hour&color=%23ffffff&position=top&…&credit=ada&show-credit=on
```

<center>

| Piece         | Means                                                 |
| ------------- | ----------------------------------------------------- |
| `?`           | the query string starts here                          |
| `credit=ada`  | one control: its `name` attribute, `=`, and its value |
| `&`           | goes between two controls                             |
| `+` and `%23` | a space and a `#`, written so they fit in an address  |

</center>

Only controls with a `name` are submitted, a checkbox only when it's ticked, and a radio group as its picked button's value.

---

## Button Types

<!-- prettier-ignore -->
```html
<button type="submit">Export</button>
<button type="reset">Start Over</button>
<button type="button" onclick="showText()">Preview</button>
```

- `submit` [submits the form](#23). It's the default.
- `reset` puts every control back to its starting value.
- `button` calls the function in its `onclick`.

---

## Problem (Us): Export Button

Paste this under the Export Button comment.

```html
<div>
  <button id="export">Export</button>
  <span id="message"></span>
</div>
```

1. Type `cs213` in the **Text** box. What will happen when we click **Export**?
2. Click **Export**. What happened to the page, and to the address?
3. **Export** should call `exportPhoto()`, not submit the form. Fix it.

---

## Solution (Us): Export Button

```html
<div>
  <button id="export" type="button" onclick="exportPhoto()">Export</button>
  <span id="message"></span>
</div>
```

- With no `type`, **Export** was a [submit button](#25). Clicking it loaded the page again, so the **Text** box was empty.
- The address now ends with the [query string](#24), starting `?text=cs213`.
- With `type="button"`, **Export** only calls `exportPhoto()`, which is empty until later.

---

# The DOM

---

## The DOM

When the browser loads a page, it turns the HTML into objects: one for each tag, each piece of text, and each comment. Together, they're the **DOM** (Document Object Model).

- `document` is the object for the whole page. We reach every other object through it.
- Changing an object changes the page right away. The file doesn't change, so reloading starts over.
- Right-click -> **Inspect** shows the DOM as it is now. **View Page Source** shows the file.

---

## The DOM Is a Tree

<div class="side-by-side">
<div>

```html
<body>
  <h1>Shutterbug</h1>
  <!-- the text -->
  <p id="top-text">Golden <b>hour</b></p>
</body>
```

Each object is a **node**. A node's **children** hang below it, and its **parent** sits above it, so `<p>` is the parent of `"Golden "` and `<b>`.

</div>

![w:540 The body element was the root of this tree. Its children were the h1 element, a comment node holding "the text", and the p element. The h1's one child was the text node "Shutterbug". The p's children were the text node "Golden " and the b element. The b's one child was the text node "hour". Elements were blue, text nodes yellow, and the comment gray.](examples/diagrams/dom-tree.svg)

</div>

---

## `getElementById`

<!-- prettier-ignore -->
```js
const topText = document.getElementById("top-text");
console.log(topText);                              // <p id="top-text">…</p>
console.log(document.getElementById("Top-text"));  // null
console.log(document.getElementById("#top-text")); // null
```

`getElementById` returns the one element whose `id` matches exactly, capitals included, and `null` when nothing matches. Leave off the `#`: that's how CSS writes an id. Each `id` must be unique on the page.

---

## When the `id` Is Wrong

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
document.getElementById("top-txet").textContent = "Hi";
```

<p class="caption">Console</p>

```text
Uncaught TypeError: Cannot set properties of null (setting 'textContent')
```

No element has the id `top-txet`, so `getElementById` returned `null`, which has no properties. Reading `.value` from `null` fails the same way. Check the id's spelling and capitals.

---

## When the Script Runs Too Early

```html
<head>
  <script src="practice.js"></script>
</head>
<body>
  <p id="top-text">Golden hour</p>
</body>
```

The browser builds the DOM from the top and runs each script when it gets there, before `<p id="top-text">` exists, so `getElementById("top-text")` returns `null`. Every starter puts its script at the end of `<body>`.

---

## `childNodes`

```html
<p id="top-text">Golden <b>hour</b></p>
```

```js
const topText = document.getElementById("top-text");
console.log(topText.childNodes.length); // 2
```

`childNodes` is the list of a node's children from [the tree](#30). This `<p>` has two: the text `"Golden "` and `<b>`.

---

## Indexes and `nodeName`

<!-- prettier-ignore -->
```js
const topText = document.getElementById("top-text");
console.log(topText.childNodes[0].nodeName); // #text
console.log(topText.childNodes[1].nodeName); // B
```

`childNodes` is a [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList), not a JavaScript array, though its indexes also start at 0. `nodeName` says what each child is: `"B"` for `<b>`, the tag's name in capital letters, and `"#text"` for text.

---

## Looping Over `childNodes`

```js
const topText = document.getElementById("top-text");

for (let i = 0; i < topText.childNodes.length; i++) {
  console.log(topText.childNodes[i].nodeName); // #text, then B
}

for (let node of topText.childNodes) {
  console.log(node.nodeName); // #text, then B
}
```

These two loops do the same thing, [just as on an array](../11-js-arrays/lecture.html#20). The index loop counts up to `length`, and `for...of` hands the loop one child at a time.

---

## An Element Is an Object

```js
const topText = document.getElementById("top-text");
topText.textContent = "Blue hour";
topText.style.color = "tomato";
```

An element is an [object](../10-js-objects-loops/lecture.html#3), and its properties are what we read and set. `topText` holds a [reference](../11-js-arrays/lecture.html#24) to the element, not a copy, so setting `topText.textContent` changes the page.

---

## Output: `textContent`

```js
const topText = document.getElementById("top-text");
console.log(topText.textContent); // Golden hour
topText.textContent = "Blue <b>hour</b>";
```

<p class="caption">Page</p>
<div class="demo"><p>Blue &lt;b&gt;hour&lt;/b&gt;</p></div>

`textContent` is the text inside an element, without its tags: `Golden hour`. Assigning a string to it puts in plain text, so `<b>` shows up just as we typed it.

---

## Output: `innerHTML`

```js
const topText = document.getElementById("top-text");
console.log(topText.innerHTML); // Golden <b>hour</b>
topText.innerHTML = "Blue <b>hour</b>";
```

<p class="caption">Page</p>
<div class="demo"><p>Blue <b>hour</b></p></div>

`innerHTML` is the HTML inside an element, tags and all: `Golden <b>hour</b>`. Assigning a string to it turns the HTML into elements, so `<b>` makes the text bold. `+=` adds HTML at the end, which is how [the trading desk drew its order book](../10-js-objects-loops/lecture.html#33).

---

## `innerHTML` and Typed Text

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
const text = document.getElementById("text").value;
document.getElementById("top-text").innerHTML = text;
```

```html
<img src="nope" onerror="alert('Your photos are mine')" />
```

Typed in the **Text** box, that `<img>` fails to load and runs its `onerror`. If Shutterbug showed everyone's photos on one page, it would run for every visitor: **cross-site scripting** (XSS). `textContent` never makes tags, so typed text goes in with it.

---

## More Properties

<center>

| Property      | Holds                        | Does                  |
| ------------- | ---------------------------- | --------------------- |
| `disabled`    | a boolean                    | turns a control off   |
| `hidden`      | a boolean                    | hides an element      |
| `style.color` | a CSS value, like `"tomato"` | sets one CSS property |

</center>

We used all three at [Colan's Coffee](../09-js-if/lecture.html#8). `style` has every CSS property, in camel case: `font-family` is `style.fontFamily`, and `line-height` is `style.lineHeight`. Setting one to `""` takes it off, so the page's CSS applies again.

---

## Input: `value`

<!-- prettier-ignore -->
```js
// ada is typed in <input id="credit">
console.log(document.getElementById("credit").value); // ada

// Widescreen is picked in <select id="crop">
console.log(document.getElementById("crop").value);   // wide

document.getElementById("credit").value = "";          // empties the box
```

`value` is what's in a box right now. For a `<select>`, it's the picked option's `value`, not its text. Setting `value` changes what's in the box.

---

## Predict: Adding to a Slider

```html
<input id="size" type="range" min="16" max="48" value="32" />
```

```js
const size = document.getElementById("size").value;
console.log(size + 4);
```

What does it print? Vote, then convince a neighbor.

<div class="choices">

**A.** `36`

**B.** `324`

**C.** `NaN`

**D.** `TypeError`

</div>

---

## Answer: Adding to a Slider

**B.** `value` is always a string, even from a slider or a number box, just like [`prompt`](../08-js-intro/lecture.html#68). `+` with a string glues, so `"32" + 4` is `"324"`. Convert the value first:

```js
const size = Number(document.getElementById("size").value);
console.log(size + 4); // 36
```

---

## Checkboxes: `checked`

<!-- prettier-ignore -->
```js
// <input id="show-credit" type="checkbox" />, not ticked
const showCredit = document.getElementById("show-credit");
console.log(showCredit.value);   // on
console.log(showCredit.checked); // false
```

A checkbox's `value` is `on` whether it's ticked or not, so read `checked`, a boolean, instead. Setting `checked` ticks or unticks the box. For radio buttons, check each one's `checked`.

---

## Calling Our Code

<style scoped>
table { font-size: 0.8em; }
</style>

<center>

| Attribute  | Calls our function when                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------- |
| `onclick`  | the element is clicked                                                                         |
| `oninput`  | the value changes: each keystroke, or each step of a slider                                    |
| `onchange` | a change is done: leaving a box, letting go of a slider, picking an option, ticking a checkbox |

</center>

```html
<input id="credit" name="credit" oninput="showText()" />
```

These are **events**, which get [their own lecture](../15-js-events/lecture.html). Setting `value` from code calls neither.

---

## Problem (Us): Text on the Photo

The photo should show the text as we type it, at the top or the bottom.

1. In `index.html`, have the **Text** box call `showText()` [as we type](#46), and each radio button when it's picked.
2. In the Text on the Photo section of `practice.js`, read the **Text** box, and [trim](../12-js-math-dates-strings/lecture.html#24) what's in it.
3. If **Top** is [`checked`](#45), put the text in `top-text`, and empty `bottom-text`. If not, do the reverse.
4. Type `<i>hi</i>` in the box. What does the photo show? What would it show with [`innerHTML`](#39)?

---

## Solution (Us): Text on the Photo

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function showText() {
  const text = document.getElementById("text").value.trim();

  if (document.getElementById("top").checked) {
    document.getElementById("top-text").textContent = text;
    document.getElementById("bottom-text").textContent = "";
  } else {
    document.getElementById("top-text").textContent = "";
    document.getElementById("bottom-text").textContent = text;
  }
}
```

The **Text** box gets `oninput="showText()"`, and each radio button `onchange="showText()"`. `textContent` shows `<i>hi</i>` just as typed. `innerHTML` would put _hi_ in italics, and it would [run a typed `onerror`](#40) too.

---

## Problem (You): Font and Color

The text on the photo should take the picked font and color.

1. In `index.html`, have the font picker call `showText()` [when it changes](#46), and the **Text color** picker as it changes.
2. In the Font and Color section, set the [`style.fontFamily`](#41) of `preview`, the box around the photo, to the picked font's entry in `fonts`.
3. Set `preview`'s `style.color` to the **Text color**.

`fonts` has a CSS font for each option value, so `fonts["georgia"]` is `"Georgia, serif"`. The text inside `preview` takes its font and color.

---

## Solution (You): Font and Color

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```html
<select id="font" name="font" onchange="showText()">
<input id="color" name="color" type="color" value="#ffffff" oninput="showText()" />
```

```js
const font = fonts[document.getElementById("font").value];
const color = document.getElementById("color").value;
document.getElementById("preview").style.fontFamily = font;
document.getElementById("preview").style.color = color;
```

The picked option's value is a key, so [brackets](../10-js-objects-loops/lecture.html#6) look it up in `fonts`. `oninput` works too, since picking an option sets off both.

---

## Problem (Us): Adjust

Let's make the Adjust box change the photo, in the Adjust section.

1. In `index.html`, have each slider and the **Hue** picker call `showAdjust()` as they change.
2. Set the photo's `style.filter` from the first three sliders, like `brightness(120%) contrast(100%) saturate(100%)`. The photo's id is `photo`.
3. `tint` is a box over the photo, and the photo takes its color as its hue. Set its `style.backgroundColor` to the **Hue** color, and its `style.opacity` to the hue strength.
4. Set `preview`'s font size to the text size in pixels, like `32px`, and its line height to 4 pixels more. Read `size` [as a number](#44).
5. What does the page show if we leave out `Number()`?

---

## Solution (Us): Adjust

<style scoped>
pre { font-size: 0.7em; }
</style>

```js
function showAdjust() {
  const brightness = document.getElementById("brightness").value;
  const contrast = document.getElementById("contrast").value;
  const saturation = document.getElementById("saturation").value;
  const hue = document.getElementById("hue").value;
  const strength = document.getElementById("strength").value;
  const size = Number(document.getElementById("size").value);

  document.getElementById("photo").style.filter =
    `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
  document.getElementById("tint").style.backgroundColor = hue;
  document.getElementById("tint").style.opacity = strength;
  document.getElementById("preview").style.fontSize = `${size}px`;
  document.getElementById("preview").style.lineHeight = `${size + 4}px`;
}
```

Each slider and the **Hue** picker get `oninput="showAdjust()"`. The other values can stay strings, but without `Number()`, `size + 4` glues `"324"`, so each line of text is 324 pixels tall, and the text slides toward the middle of the photo.

---

## Problem (You): Slider Values

Each slider should show its value as it moves.

1. In `index.html`, after each slider, add an empty `<span>` whose `id` is the slider's `id` and `-value`, like `<span id="brightness-value">`. The **Hue** picker needs none.
2. In the Slider Values section of `showAdjust()`, put each value in its span: the first three as percents, like `120%`, Hue strength as it is, like `0.4`, and Text size in pixels, like `32px`.

---

## Solution (You): Slider Values

<style scoped>
pre { font-size: 0.75em; }
</style>

```html
<span id="brightness-value"></span>
```

```js
document.getElementById("brightness-value").textContent = `${brightness}%`;
document.getElementById("contrast-value").textContent = `${contrast}%`;
document.getElementById("saturation-value").textContent = `${saturation}%`;
document.getElementById("strength-value").textContent = strength;
document.getElementById("size-value").textContent = `${size}px`;
```

The Adjust section already read each value into a variable. The page calls `showAdjust()` when it loads, so the spans start filled in.

---

## Problem (You): Credit on the Photo

<style scoped>
pre { font-size: 0.75em; }
</style>

In `index.html`, have the **Credit** box call `showText()` as we type, and the **Show credit** checkbox when it's ticked or unticked. Then turn the pseudocode into code in the Credit on the Photo section.

```text
set credit to the credit box's value, without spaces at either end
set showCredit to whether the show-credit box is ticked

if credit is empty
  put "📷 Shutterbug" in photo-credit
else
  put "📷 credit" in photo-credit
hide photo-credit unless showCredit is true
```

[`hidden`](#41) can do the hiding.

---

## Solution (You): Credit on the Photo

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
const credit = document.getElementById("credit").value.trim();
const showCredit = document.getElementById("show-credit").checked;

if (credit === "") {
  document.getElementById("photo-credit").textContent = "📷 Shutterbug";
} else {
  document.getElementById("photo-credit").textContent = `📷 ${credit}`;
}

document.getElementById("photo-credit").hidden = !showCredit;
```

The checkbox gets `onchange="showText()"`, and the **Credit** box `oninput`. With `value` in place of `checked`, `showCredit` would be `"on"` every time, so the credit would never hide.

---

## Problem (You): Text Limit

Text longer than `limit` won't fit on the photo. Turn the pseudocode into code in `showText()`'s Text Limit section.

```text
set left to limit minus the length of text
put "left characters left" in chars-left
if left is below 0
  make the chars-left text tomato
  turn off the export button
else
  give the chars-left text back its own color
  turn on the export button
```

[Strings have `length`](../11-js-arrays/lecture.html#6), and [`style.color` and `disabled`](#41) can do the rest.

---

## Solution (You): Text Limit

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
const left = limit - text.length;
document.getElementById("chars-left").textContent = `${left} characters left`;

if (left < 0) {
  document.getElementById("chars-left").style.color = "tomato";
  document.getElementById("export").disabled = true;
} else {
  document.getElementById("chars-left").style.color = "";
  document.getElementById("export").disabled = false;
}
```

`disabled` takes a boolean, so one line outside the `if` can do both `export` lines, the way [a comparison turned off **Buy**](../09-js-if/lecture.html#12): `document.getElementById("export").disabled = left < 0;`

---

## Problem (You): Export

<style scoped>
pre { font-size: 0.75em; }
</style>

**Export** [already calls `exportPhoto()`](#27). Turn the pseudocode into code in the Export section.

```text
set text to the text box's value, without spaces at either end
set name to "shutterbug"
if text is not empty
  set name to text in lowercase, with each space as a dash
save the photo as name.png
put "Exported name.png" in message
```

`savePhoto("golden-hour.png")`, from `photo.js`, saves the photo as `golden-hour.png`. [`replaceAll`](../12-js-math-dates-strings/lecture.html#31) can swap the spaces.

---

## Solution (You): Export

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function exportPhoto() {
  const text = document.getElementById("text").value.trim();
  let name = "shutterbug";

  if (text !== "") {
    name = text.toLowerCase().replaceAll(" ", "-");
  }

  savePhoto(`${name}.png`);
  document.getElementById("message").textContent = `Exported ${name}.png`;
}
```

---

## Problem (You): Parsons 1

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
document.getElementById("#brightness").value = look.brightness;
document.getElementById("saturation").value = look.saturation;
}
showAdjust();
function parsons1() {
document.getElementById("contrast").textContent = look.contrast;
const look = looks[Math.floor(Math.random() * looks.length)];
document.getElementById("brightness").value = look.brightness;
document.getElementById("contrast").value = look.contrast;
```

- Assemble the program in the Parsons 1 section of `practice.js`. Two of the lines are wrong.
- What does `parsons1` do? What should it be named?

---

## Solution (You): Parsons 1

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function parsons1() {
  const look = looks[Math.floor(Math.random() * looks.length)];

  document.getElementById("brightness").value = look.brightness;
  document.getElementById("contrast").value = look.contrast;
  document.getElementById("saturation").value = look.saturation;
  showAdjust();
}
```

Each click on 🎲 moves the photo sliders to a random look from `looks`, so `randomLook` would be a better name. Setting `value` from code doesn't call `oninput`, so it calls `showAdjust()` itself.

---

## Problem (You): Extras

Done early? Pick any of these. Their solutions come after **Questions?**.

- **Blur.** Add a Blur slider, from 0 to 10, to the Adjust box. At 3, the photo's filter should end with `blur(3px)`.
- **Both.** Add a third Position button, Both, that puts the text at the top and the bottom.

---

# Conclusion

---

## The Finished Page

Every solution from today, together:

- [Shutterbug](https://bi3mer.github.io/lectures/cs213/lectures/13-js-forms-dom/examples/photo-final/), running live
- [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/13-js-forms-dom/examples/photo-final/index.html) and [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/13-js-forms-dom/examples/photo-final/practice.js) on GitHub, with every section filled in

`index.html` is the starter's, with the whole form built. The extras aren't in it.

---

## Summary

- A form collects input with `<input>`, `<select>`, and `<textarea>`, each labeled.
- A form's `<button>` submits by default, reloading the page. Use `type="button"`.
- Submitting sends each named control as `name=value` in the query string.
- The DOM is a tree of nodes: elements, text, and comments.
- `getElementById` returns one element, or `null` when no `id` matches.
- `value` is always a string. `checked` is a checkbox's or radio button's boolean.
- `textContent` writes text. Typed text never goes in `innerHTML`.
- Scripts go at the end of `<body>`, after the elements they use.

---

# Questions?

---

## Extras: Blur

<style scoped>
pre { font-size: 0.65em; }
</style>

In `index.html`, after the Text size slider:

<!-- prettier-ignore -->
```html
<div>
  <label for="blur">Blur</label>
  <input id="blur" name="blur" type="range" min="0" max="10" value="0" oninput="showAdjust()" />
</div>
```

At the end of `showAdjust()`, read it, and add it to the end of the filter:

```js
const blur = document.getElementById("blur").value;
document.getElementById("photo").style.filter += ` blur(${blur}px)`;
```

---

## Extras: Both

<style scoped>
pre { font-size: 0.65em; }
</style>

In `index.html`, after Bottom in the Position fieldset:

<!-- prettier-ignore -->
```html
<input id="both" name="position" type="radio" value="both" onchange="showText()" />
<label for="both">Both</label>
```

In the Text on the Photo section, in place of the `if...else`:

```js
if (document.getElementById("top").checked) {
  document.getElementById("top-text").textContent = text;
  document.getElementById("bottom-text").textContent = "";
} else if (document.getElementById("bottom").checked) {
  document.getElementById("top-text").textContent = "";
  document.getElementById("bottom-text").textContent = text;
} else {
  document.getElementById("top-text").textContent = text;
  document.getElementById("bottom-text").textContent = text;
}
```
