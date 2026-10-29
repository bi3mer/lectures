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
.demo p + p { margin-top: 8px; }
.demo input, .demo select, .demo button { font: inherit; }
/* Answer choices for the Predict slides, all on one line. */
.choices { display: flex; gap: 48px; }
</style>

# Forms and the DOM

Colan Biemer

---

## The Lines We Copied

Since [the `if` lecture](../09-js-if/lecture.html#2), every starter has come with page lines like these, and we copied them without asking how they work:

```js
document.getElementById("sign").hidden = true;
let name = document.getElementById("name").value;
```

Today we take them apart: `document`, `getElementById`, and properties like `hidden` and `value`. First, though, we build the form those lines read from.

---

# HTML Forms

---

## Forms

A **form** collects what someone types or picks. Every login, search box, and checkout is one.

<div class="side-by-side">
<div>

```html
<form>
  <label for="hero">Hero name</label>
  <input id="hero" />
  <button>Join</button>
</form>
```

</div>
<div>
<p class="caption">Page</p>
<div class="demo"><label for="demo-hero">Hero name</label> <input id="demo-hero" size="12" /> <button type="button">Join</button></div>
</div>
</div>

`<form>` holds the controls. `<input>` is a box to type in, and like `<img>`, it has no closing tag.

---

## Input Types

<style scoped>
table { font-size: 0.7em; }
</style>

<center>

| `type`     | Shows                                   | Try it                                    |
| ---------- | --------------------------------------- | ----------------------------------------- |
| `text`     | a one-line box, the default             | <input type="text" size="12" />           |
| `number`   | a box for numbers, with arrows          | <input type="number" value="3" />         |
| `password` | a box that hides what's typed           | <input type="password" value="hunter2" /> |
| `email`    | a box that wants an `@` when it's sent  | <input type="email" size="12" />          |
| `checkbox` | a box to tick                           | <input type="checkbox" />                 |
| `range`    | a slider                                | <input type="range" />                    |
| `color`    | a color picker                          | <input type="color" value="#f99d1b" />    |
| `date`     | a date picker                           | <input type="date" />                     |

</center>

For many lines of text, `<textarea>` makes a bigger box. Unlike `<input>`, it has a closing tag.

---

## `<label>`

<div class="side-by-side">
<div>

```html
<input id="hardcore" type="checkbox" />
<label for="hardcore">Hardcore mode</label>
```

</div>
<div>
<p class="caption">Page: click the words</p>
<div class="demo"><input id="demo-hardcore" type="checkbox" /> <label for="demo-hardcore">Hardcore mode</label></div>
</div>
</div>

A label's `for` matches its control's `id`. Clicking the label clicks the control, which makes a small checkbox easier to hit. A screen reader reads the label aloud when the control is selected, so every control needs one.

---

## Input Attributes

<!-- prettier-ignore -->
```html
<input id="str" type="range" min="1" max="10" value="5" />
<input id="motto" placeholder="Code bravely" />
<input id="hardcore" type="checkbox" checked />
<input id="email" type="email" disabled />
```

- `value` is the starting value. `min`, `max`, and `step` limit a slider or a number box.
- `placeholder` is a gray hint. It disappears when we type, and it's never the value.
- `checked` and `disabled` need no value: having the attribute means yes.

---

## Setting Up the Starter

Today's page signs heroes up for the Guild of the Curly Brace. Its starter has two files on GitHub: [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/13-js-forms-dom/examples/guild-starter/index.html) and [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/13-js-forms-dom/examples/guild-starter/practice.js). Set them up in WebStorm, in a new folder:

1. Open each file, and click **Copy raw file**, the copy icon above the code.
2. Paste each one into a new file in WebStorm with the same name.

The form in `index.html` holds only comments, so we'll build it, and `practice.js` has no page lines to copy. Sit with a partner, and talk through each line before you type it.

---

## Problem (Us): Name and Motto

Every hero needs a name and a motto. Let's add both under the Name and Motto comment in `index.html`, each in its own `<p>`.

1. A text box whose `id` and `name` are `name`, with the label `Name`.
2. A text box whose `id` and `name` are `motto`, with the label `Motto` and the gray hint `Code bravely`.
3. Click each label. What happens?

---

## Solution (Us): Name and Motto

```html
<p>
  <label for="name">Name</label>
  <input id="name" name="name" />
</p>
<p>
  <label for="motto">Motto</label>
  <input id="motto" name="motto" placeholder="Code bravely" />
</p>
```

Clicking a label puts the cursor in its box, since its `for` matches the box's `id`. The `id` is for the label and our code, and the `name` is for [sending the form](#21).

---

## Problem (You): Banner and Hardcore

Each in its own `<p>`, add:

1. Under the Banner Color comment, a color picker whose `id` and `name` are `color`, with the label `Banner color`. It starts at `#e0b354`, a gold.
2. Under the Hardcore comment, a checkbox whose `id` and `name` are `hardcore`, with the label `Hardcore mode: one life only` after it.

---

## Solution (You): Banner and Hardcore

```html
<p>
  <label for="color">Banner color</label>
  <input id="color" name="color" type="color" value="#e0b354" />
</p>
```

```html
<p>
  <input id="hardcore" name="hardcore" type="checkbox" />
  <label for="hardcore">Hardcore mode: one life only</label>
</p>
```

A color picker's `value` must be a hex color like `#e0b354`. The label comes after the checkbox, so the box sits at the start of the line.

---

## `<select>` and `<option>`

```html
<label for="mount">Mount</label>
<select id="mount">
  <option value="horse">Horse</option>
  <option value="camel">Camel</option>
  <option value="snail" selected>Giant Snail</option>
</select>
```

<div class="demo"><label for="demo-mount">Mount</label> <select id="demo-mount"><option value="horse">Horse</option><option value="camel">Camel</option><option value="snail" selected>Giant Snail</option></select></div>

A `<select>` is a drop-down list. Each `<option>` shows its text, but code sees its `value`. `selected` picks the starting option. Without it, the first one starts picked.

---

## Radio Buttons

<!-- prettier-ignore -->
```html
<input type="radio" id="day" name="watch" value="day" checked />
<label for="day">Day watch</label>
<input type="radio" id="night" name="watch" value="night" />
<label for="night">Night watch</label>
```

<div class="demo"><input type="radio" id="demo-day" name="demo-watch" value="day" checked /> <label for="demo-day">Day watch</label> <input type="radio" id="demo-night" name="demo-watch" value="night" /> <label for="demo-night">Night watch</label></div>

Radio buttons that share a `name` are one group, so picking one unpicks the others. Each one still needs its own `id`, for its label.

---

## `<fieldset>` and `<legend>`

<div class="side-by-side">
<div>

```html
<fieldset>
  <legend>Stats</legend>
  <label for="str">Strength</label>
  <input id="str" type="range" />
  <label for="dex">Dexterity</label>
  <input id="dex" type="range" />
</fieldset>
```

</div>
<div>
<p class="caption">Page</p>
<div class="demo"><fieldset><legend>Stats</legend><p><label for="demo-str">Strength</label> <input id="demo-str" type="range" /></p><p><label for="demo-dex">Dexterity</label> <input id="demo-dex" type="range" /></p></fieldset></div>
</div>
</div>

A `<fieldset>` draws a box around controls that go together, and its `<legend>` is the box's caption. A screen reader reads the legend as the group's name.

---

## Problem (You): Class Picker

Under the Class Picker comment, add a `<p>` with the label `Class` and a [`<select>`](#13) whose `id` and `name` are `role`.

Its options are Warrior, Ranger, and Mage, with the values `warrior`, `ranger`, and `mage`.

---

## Solution (You): Class Picker

```html
<p>
  <label for="role">Class</label>
  <select id="role" name="role">
    <option value="warrior">Warrior</option>
    <option value="ranger">Ranger</option>
    <option value="mage">Mage</option>
  </select>
</p>
```

The hero sees each option's text, and our code will see its lowercase `value`.

---

## Problem (You): Stat Sliders

Under the Stats comment, add a [fieldset](#15) with the legend `Stats`. In it, add three sliders, each in its own `<p>` with a label:

<center>

| Label     | `id` and `name` |
| --------- | --------------- |
| Strength  | `str`           |
| Dexterity | `dex`           |
| Wisdom    | `wis`           |

</center>

Each slider goes from 1 to 10 and starts at 5. End the fieldset with `<p id="points-left"></p>`, where the points left will go.

---

## Solution (You): Stat Sliders

```html
<fieldset>
  <legend>Stats</legend>
  <p>
    <label for="str">Strength</label>
    <input id="str" name="str" type="range" min="1" max="10" value="5" />
  </p>
  <!-- Dexterity and Wisdom, the same way, with dex and wis -->
  <p id="points-left"></p>
</fieldset>
```

`min` and `max` stop the slider at 1 and 10, and `value` puts it at 5 when the page loads.

---

## Button Types

<!-- prettier-ignore -->
```html
<button type="submit">Join</button>
<button type="reset">Start Over</button>
<button type="button" onclick="rollName()">🎲</button>
```

- `submit` sends the form. It's the default, so a `<button>` in a form with no `type` sends it.
- `reset` puts every control in the form back to its starting value.
- `button` does nothing on its own, only what its `onclick` says.

---

## Submitting a Form

```html
<form action="https://www.google.com/search">
  <input name="q" />
  <button>Search</button>
</form>
```

<form class="demo" action="https://www.google.com/search" target="_blank"><input name="q" value="owlbear" /> <button>Search</button></form>

Clicking **Search**, or pressing Enter in the box, sends the form: the browser loads the `action` address with what we typed, like `https://www.google.com/search?q=owlbear`. With no `action`, it loads the same page again. Before JavaScript, this was how a page [talked to the server](../08-js-intro/lecture.html#8).

---

## The Query String

<style scoped>
table { font-size: 0.75em; }
</style>

```text
index.html?name=Ada&motto=Code+bravely&color=%23e0b354&hardcore=on
```

<center>

| Piece         | Means                                                 |
| ------------- | ----------------------------------------------------- |
| `?`           | the query string starts here                          |
| `name=Ada`    | one control: its `name` attribute, `=`, and its value |
| `&`           | goes between two controls                             |
| `+` and `%23` | a space and a `#`, written so they fit in an address  |

</center>

Only controls with a `name` are sent, and a checkbox only when it's ticked. `method="post"` sends the pairs inside the request instead, so passwords stay out of the address.

---

## Problem (Us): Join Button

Let's finish the form, under the Join Button comment.

1. Add a `<p>` with a button whose `id` is `join`, which says `Join the Guild` and has no `type`. After it, add an empty `<span id="message">` for messages.
2. Fill in the form. What will happen when we click **Join the Guild**? Vote, then click it.
3. Read the query string in the address. Is every control there?
4. The button should run our code later, not send the form. Fix it.

---

## Solution (Us): Join Button

```html
<p>
  <button id="join" type="button">Join the Guild</button>
  <span id="message"></span>
</p>
```

With no `type`, the button was a [submit button](#20). The page loaded again, empty, with something like `?name=Ada&motto=&role=mage&color=%23e0b354&str=5&dex=5&wis=5` in the address. A control missing from it is missing its `name`. A `type="button"` button never sends the form.

---

# The DOM

---

## The DOM

When the browser loads a page, it turns the HTML into objects: one for each tag, each piece of text, and each comment. Together, they're the **DOM** (Document Object Model).

- `document` is the object for the whole page. We reach every other object through it.
- Changing an object changes the page right away. The file doesn't change, so reloading starts over.
- Right-click → **Inspect** shows the DOM as it is now. **View Page Source** shows the file.

---

## The DOM Is a Tree

<div class="side-by-side">
<div>

```html
<body>
  <h1>Guild</h1>
  <!-- the motto -->
  <p id="motto">Code <b>bravely</b></p>
</body>
```

Each object is a **node**. A node's **children** hang below it, and its **parent** sits above it, so `<p>` is the parent of `"Code "` and `<b>`.

This tree leaves out the spaces between the tags. We'll come back to them.

</div>

![w:540 The body element was the root of this tree. Its children were the h1 element, a comment node holding "the motto", and the p element. The h1's one child was the text node "Guild". The p's children were the text node "Code " and the b element. The b's one child was the text node "bravely". Elements were blue, text nodes yellow, and the comment gray.](examples/diagrams/dom-tree.svg)

</div>

---

## `getElementById`

<!-- prettier-ignore -->
```js
const motto = document.getElementById("motto");
console.log(motto);                             // <p id="motto">…</p>
console.log(document.getElementById("Motto"));  // null
console.log(document.getElementById("#motto")); // null
```

`getElementById` returns the one element whose `id` matches exactly, capitals included, and `null` when nothing matches. Leave off the `#`: that's how CSS writes an id. Each `id` must be unique on the page.

---

## When the `id` Is Wrong

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
document.getElementById("moto").textContent = "Hi";
```

<p class="caption">Console</p>

```text
Uncaught TypeError: Cannot set properties of null (setting 'textContent')
```

No element has the id `moto`, so `getElementById` returned `null`, which has no properties. Reading `.value` from `null` fails the same way. Check the id's spelling and capitals.

---

## When the Script Runs Too Early

```html
<head>
  <script src="practice.js"></script>
</head>
<body>
  <p id="motto">Code bravely</p>
</body>
```

The browser builds the DOM from the top down, and runs a script as soon as it reaches it. Here, `practice.js` runs before `<p id="motto">` exists, so `getElementById("motto")` returns `null`. Put the script at the end of `<body>`, as every starter does.

---

## Node Types

<center>

| Node     | Example              | `nodeType` | `nodeName`                 |
| -------- | -------------------- | ---------- | -------------------------- |
| Element  | `<p id="motto">`     | `1`        | `"P"`, the tag in capitals |
| Text     | `Code `              | `3`        | `"#text"`                  |
| Comment  | `<!-- the motto -->` | `8`        | `"#comment"`               |
| Document | `document`           | `9`        | `"#document"`              |

</center>

`Node.ELEMENT_NODE` is another name for `1`, `Node.TEXT_NODE` for `3`, and `Node.COMMENT_NODE` for `8`. `node.nodeType === Node.ELEMENT_NODE` says what it checks, and `node.nodeType === 1` doesn't.

<div class="footnote">Attributes and <code>&lt;!doctype html&gt;</code> have node types too, but they aren't children in the tree.</div>

---

## Moving Around the Tree

<!-- prettier-ignore -->
```js
const motto = document.getElementById("motto");
console.log(motto.nodeName);             // P
console.log(motto.parentNode.nodeName);  // BODY
console.log(motto.firstChild.nodeName);  // #text
console.log(motto.firstChild.nodeValue); // Code
console.log(motto.lastChild.nodeName);   // B
console.log(document.nodeType);          // 9
```

`parentNode` is a node's parent, and `firstChild` and `lastChild` are its first and last children. A text node's `nodeValue` is its text, here `"Code "`, with its space. An element's `nodeValue` is `null`.

---

## `childNodes`

<!-- prettier-ignore -->
```js
const motto = document.getElementById("motto");
console.log(motto.childNodes.length); // 2

for (const node of motto.childNodes) {
  console.log(node.nodeName); // #text, then B
}
```

`childNodes` lists a node's children in order. It has `length` and indexes, and [`for...of`](../11-js-arrays/lecture.html#20) works on it. It isn't an array, though, so `push` and `join` don't.

---

## Predict: How Many Children?

```html
<ul id="party">
  <li>Ada</li>
  <li>Grace</li>
  <li>Linus</li>
</ul>
```

```js
console.log(document.getElementById("party").childNodes.length);
```

What does it print? Vote, then convince a neighbor.

<div class="choices">

**A.** `3`

**B.** `4`

**C.** `6`

**D.** `7`

</div>

---

## Answer: How Many Children?

![w:900 The ul element with id party had seven child nodes, at indexes 0 to 6. Indexes 0, 2, 4, and 6 were text nodes holding only whitespace: a line break and two spaces before each li, and a line break after the last one. Indexes 1, 3, and 5 were the li elements, whose text nodes held "Ada", "Grace", and "Linus".](examples/diagrams/whitespace-text-nodes.svg)

**D.** The line breaks and spaces between the tags are text too, so `<ul>` has a text node before each `<li>` and one after the last. To count only the `<li>`s, check each node's [`nodeType`](#31).

---

## Problem (You): Party Size

The party has three members, but its heading says `Party (9 members)`. The line in the Party Size section of `practice.js` counts every node in `party.childNodes`.

1. In the console, run `party.childNodes`. What are the nine nodes?
2. Turn the pseudocode into code in the Party Size section, in place of the line that counts.

```text
set count to 0
for each node in party's childNodes
  if the node is an element
    add 1 to count
put "Party (count members)" in party-size
```

---

## Solution (You): Party Size

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
const party = document.getElementById("party");
let count = 0;

for (const node of party.childNodes) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    count++;
  }
}

document.getElementById("party-size").textContent = `Party (${count} members)`;
```

The nine nodes are the comment, the three `<li>`s, and five text nodes of [whitespace](#35). `party.children` holds only the element children, so `party.children.length` is 3 too.

---

# Reading and Writing the Page

---

## An Element Is an Object

```js
const motto = document.getElementById("motto");
motto.textContent = "Code carefully";
motto.style.color = "tomato";
```

An element is an [object](../10-js-objects-loops/lecture.html#3), and its properties are what we read and set. `motto` holds a [reference](../11-js-arrays/lecture.html#24) to the element, not a copy, so setting `motto.textContent` changes the page.

---

## Output: `textContent`

```js
const motto = document.getElementById("motto");
console.log(motto.textContent); // Code bravely
motto.textContent = "Code <b>carefully</b>";
```

<p class="caption">Page</p>
<div class="demo"><p>Code &lt;b&gt;carefully&lt;/b&gt;</p></div>

Reading gives all the text inside, with the tags left out. Setting replaces everything inside with one text node, so tags show up just as we typed them.

---

## Output: `innerHTML`

```js
const motto = document.getElementById("motto");
console.log(motto.innerHTML); // Code <b>bravely</b>
motto.innerHTML = "Code <b>carefully</b>";
```

<p class="caption">Page</p>
<div class="demo"><p>Code <b>carefully</b></p></div>

Reading gives the HTML inside, tags and all. Setting turns the string into nodes, so `<b>` becomes an element. `+=` adds HTML at the end, which is how the trading desk drew its order book.

---

## `innerHTML` and Typed Text

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
const name = document.getElementById("hero").value;
document.getElementById("greeting").innerHTML = `Welcome, ${name}!`;
```

```html
<img src="nope" onerror="alert('Your gold is mine')" />
```

If someone types that `<img>` as their name, it fails to load, so its `onerror` runs their code on our page. This is **cross-site scripting** (XSS), and real attacks steal logins instead. Typed text goes in with `textContent`, which never makes tags.

---

## Input: `value`

<!-- prettier-ignore -->
```js
// Ada is typed in <input id="hero">
console.log(document.getElementById("hero").value);  // Ada

// Giant Snail is picked in <select id="mount">
console.log(document.getElementById("mount").value); // snail

document.getElementById("hero").value = "";          // empties the box
```

`value` is what's in a box right now. For a `<select>`, it's the picked option's `value`, not its text. Setting `value` changes what's in the box.

---

## Calling Our Code

<style scoped>
table { font-size: 0.8em; }
</style>

<center>

| Attribute  | Calls our function when                                                    |
| ---------- | -------------------------------------------------------------------------- |
| `onclick`  | the element is clicked                                                     |
| `oninput`  | the value changes: each keystroke, or each step of a slider                |
| `onchange` | a change is done: leaving a box, letting go of a slider, picking an option |

</center>

```html
<input id="name" name="name" oninput="showCard()" />
```

These are **events**, which get their own lecture. Setting `value` from code calls neither.

---

## Problem (Us): Name on the Card

The card on the right should show the hero's name as we type it.

1. In `index.html`, have the **Name** box call `showCard()` [as we type](#44).
2. In the Name on the Card section of `practice.js`, read the **Name** box, and [trim](../12-js-math-dates-strings/lecture.html#24) what's in it.
3. Put the name in the element with the id `card-name`, or `Nameless` if the name is empty.
4. Type `<i>Ada</i>` in the box. What does the card show? What would it show with [`innerHTML`](#41)?

---

## Solution (Us): Name on the Card

<style scoped>
pre { font-size: 0.75em; }
</style>

```html
<input id="name" name="name" oninput="showCard()" />
```

```js
function showCard() {
  const name = document.getElementById("name").value.trim();

  if (name === "") {
    document.getElementById("card-name").textContent = "Nameless";
  } else {
    document.getElementById("card-name").textContent = name;
  }
}
```

`textContent` shows `<i>Ada</i>` just as typed. `innerHTML` would show _Ada_ in italics, and it would [run a typed `onerror`](#42) too.

---

## Problem (You): Class on the Card

The card should show the class, too.

1. In `index.html`, have the class picker call `showCard()` [when it changes](#44).
2. In the Class on the Card section, put the class's icon and title, like `🔮 Mage`, in `card-role`.

`roles` has both for each class, keyed by the option values, so `roles["mage"].icon` is `🔮`.

---

## Solution (You): Class on the Card

<style scoped>
pre { font-size: 0.75em; }
</style>

```html
<select id="role" name="role" onchange="showCard()">
```

```js
const role = roles[document.getElementById("role").value];
document.getElementById("card-role").textContent = `${role.icon} ${role.title}`;
```

The picked option's value is a key, so [brackets](../10-js-objects-loops/lecture.html#6) look it up in `roles`. `oninput` works too, since picking an option sets off both.

---

## Predict: Adding Stats

```html
<input id="str" type="range" min="1" max="10" value="5" />
<input id="dex" type="range" min="1" max="10" value="3" />
```

```js
const str = document.getElementById("str").value;
const dex = document.getElementById("dex").value;
console.log(str + dex);
```

What does it print? Vote, then convince a neighbor.

<div class="choices">

**A.** `8`

**B.** `53`

**C.** `NaN`

**D.** `TypeError`

</div>

---

## Answer: Adding Stats

**B.** `value` is always a string, even from a slider or a number box, just like [`prompt`](../08-js-intro/lecture.html#68). `+` glues `"5"` and `"3"`, so convert each value first:

```js
const str = Number(document.getElementById("str").value);
const dex = Number(document.getElementById("dex").value);
console.log(str + dex); // 8
```

---

## Problem (Us): Stats

Let's bring the sliders to life, in the Stats section.

1. In `index.html`, have each slider call `showStats()` as it moves.
2. Read the sliders `str`, `dex`, and `wis` [as numbers](#50).
3. Draw each stat as a bar of `█` in `str-bar`, `dex-bar`, and `wis-bar`, so 5 draws `█████`. [`repeat`](../12-js-math-dates-strings/lecture.html#33) can make the bars.
4. Show how many of the `budget` points are left in `points-left`, like `Points left: 0`.
5. What does the page show if we leave out `Number()`?

---

## Solution (Us): Stats

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function showStats() {
  const str = Number(document.getElementById("str").value);
  const dex = Number(document.getElementById("dex").value);
  const wis = Number(document.getElementById("wis").value);
  const pointsLeft = budget - (str + dex + wis);

  document.getElementById("str-bar").textContent = "█".repeat(str);
  document.getElementById("dex-bar").textContent = "█".repeat(dex);
  document.getElementById("wis-bar").textContent = "█".repeat(wis);
  document.getElementById("points-left").textContent = `Points left: ${pointsLeft}`;
}
```

Each slider gets `oninput="showStats()"`. Without `Number()`, `str + dex + wis` glues `"555"`, and `budget -` turns that into a number, so the page says `Points left: -540`.

---

## More Properties

<center>

| Property      | Holds                        | Does                  |
| ------------- | ---------------------------- | --------------------- |
| `disabled`    | a boolean                    | turns a control off   |
| `hidden`      | a boolean                    | hides an element      |
| `style.color` | a CSS value, like `"tomato"` | sets one CSS property |

</center>

We used all three at [Colan's Coffee](../09-js-if/lecture.html#8). `style` has every CSS property, in camel case: `background-color` is `style.backgroundColor`, and `border-color` is `style.borderColor`. Setting one to `""` takes it off, so the page's CSS applies again.

---

## Problem (You): Over Budget

Heroes can't spend more than `budget`. Turn the pseudocode into code in `showStats()`'s Over Budget section.

```text
if pointsLeft is below 0
  make the points-left text tomato
  turn off the join button
else
  give the points-left text back its own color
  turn on the join button
```

[`style.color` and `disabled`](#53) can do both jobs, and `""` takes a style off.

---

## Solution (You): Over Budget

```js
if (pointsLeft < 0) {
  document.getElementById("points-left").style.color = "tomato";
  document.getElementById("join").disabled = true;
} else {
  document.getElementById("points-left").style.color = "";
  document.getElementById("join").disabled = false;
}
```

`disabled` takes a boolean, so the two `join` lines could be one line outside the `if`, as in [Sold Out](../09-js-if/lecture.html#12): `document.getElementById("join").disabled = pointsLeft < 0;`

---

## Checkboxes: `checked`

```js
// <input id="hardcore" type="checkbox" />, not ticked
const hardcore = document.getElementById("hardcore");
console.log(hardcore.value);   // on
console.log(hardcore.checked); // false
```

A checkbox's `value` is `on` whether it's ticked or not, so read `checked`, a boolean, instead. Setting `checked` ticks or unticks the box. For radio buttons, check each one's `checked`.

---

## Problem (You): Finishing the Card

<style scoped>
pre { font-size: 0.75em; }
</style>

In `index.html`, have the **Motto** box and the color picker call `showCard()` as they change, and the **Hardcore** checkbox when it's ticked. Then turn the pseudocode into code in the Finishing the Card section.

```text
set color to the color picker's value
set motto to the motto box's value, without spaces at either end
set hardcore to whether the hardcore box is ticked

make the card's border color
if motto is empty
  put nothing in card-motto
else
  put motto, in double quotes, in card-motto
hide card-hardcore unless hardcore is true
```

The card's id is `card`, and [`style.borderColor`](#53) sets its border.

---

## Solution (You): Finishing the Card

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
const color = document.getElementById("color").value;
const motto = document.getElementById("motto").value.trim();
const hardcore = document.getElementById("hardcore").checked;

document.getElementById("card").style.borderColor = color;

if (motto === "") {
  document.getElementById("card-motto").textContent = "";
} else {
  document.getElementById("card-motto").textContent = `"${motto}"`;
}

document.getElementById("card-hardcore").hidden = !hardcore;
```

The checkbox gets `onchange="showCard()"`, and the other two `oninput`. With `value` in place of `checked`, `hardcore` would be `"on"` every time.

---

## Problem (You): Join the Guild

<style scoped>
pre { font-size: 0.75em; }
</style>

In `index.html`, have the **Join the Guild** button call `joinGuild()` when it's clicked. Then turn the pseudocode into code in the Join the Guild section.

```text
set name to the name box's value, without spaces at either end
set role to the picked class's entry in roles
if name is empty
  put "Every hero needs a name." in message
else
  put "Welcome, name the role's title!" in message
```

With the name `Ada Nullbane` and the class Mage, the message is `Welcome, Ada Nullbane the Mage!`.

---

## Solution (You): Join the Guild

<style scoped>
pre { font-size: 0.75em; }
</style>

```html
<button id="join" type="button" onclick="joinGuild()">Join the Guild</button>
```

```js
function joinGuild() {
  const name = document.getElementById("name").value.trim();
  const role = roles[document.getElementById("role").value];

  if (name === "") {
    document.getElementById("message").textContent = "Every hero needs a name.";
  } else {
    document.getElementById("message").textContent =
      `Welcome, ${name} the ${role.title}!`;
  }
}
```

---

## Problem (You): Parsons 1

<style scoped>
pre { font-size: 0.75em; }
</style>

In `index.html`, after the **Name** box, add a 🎲 button that calls `parsons1()` and doesn't send the form.

<!-- prettier-ignore -->
```js
document.getElementById("#name").value = `${first} ${last}`;
const last = lastNames[Math.floor(Math.random() * lastNames.length)];
}
showCard();
function parsons1() {
document.getElementById("name").textContent = `${first} ${last}`;
const first = firstNames[Math.floor(Math.random() * firstNames.length)];
document.getElementById("name").value = `${first} ${last}`;
```

- Assemble the program in the Parsons 1 section of `practice.js`. Two of the lines are wrong.
- What does `parsons1` do? What should it be named?

---

## Solution (You): Parsons 1

<style scoped>
pre { font-size: 0.75em; }
</style>

```html
<button type="button" onclick="parsons1()">🎲</button>
```

```js
function parsons1() {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];

  document.getElementById("name").value = `${first} ${last}`;
  showCard();
}
```

Each click on 🎲 puts a random name in the **Name** box, so `rollName` would be a better name. Setting `value` from code doesn't call `oninput`, so it calls `showCard()` itself.

---

## Problem (You): Extras

Done early? Pick any of these. Their solutions come after **Questions?**.

- **A fourth stat.** Add a Charisma slider to the Stats box and a `CHA` bar to the card. Count it in `showStats()`, and raise `budget` to 20.
- **Day or night.** Add [radio buttons](#14) for Day watch and Night watch to the form. Show `☀ Day watch` or `☾ Night watch` on the card.
- **Node report.** Add a `<p id="node-report">` under the party list. Show how many of each node type `party` has in it, like `Elements: 3, text: 5, comments: 1`.

---

# Conclusion

---

## The Finished Page

Every solution from today, together:

- [Guild of the Curly Brace](https://bi3mer.github.io/lectures/cs213/lectures/13-js-forms-dom/examples/guild-final/), running live
- [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/13-js-forms-dom/examples/guild-final/index.html) and [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/13-js-forms-dom/examples/guild-final/practice.js) on GitHub, with every section filled in

`index.html` is the starter's, with the whole form built. The extras aren't in it.

---

## Summary

- A form collects input with `<input>`, `<select>`, and `<textarea>`, each labeled.
- A form's `<button>` submits by default, reloading the page. Use `type="button"`.
- Submitting sends each named control as `name=value` in the query string.
- The DOM is a tree: elements (1), text (3), comments (8), and the document (9).
- Whitespace between tags is text, so `childNodes` holds more than the tags.
- `getElementById` returns one element, or `null` when no `id` matches.
- `value` is always a string. `checked` is a checkbox's boolean.
- `textContent` writes text. Typed text never goes in `innerHTML`.
- Scripts go at the end of `<body>`, after the elements they use.

---

# Questions?

---

## Extras: A Fourth Stat

<style scoped>
pre { font-size: 0.65em; }
</style>

In `index.html`, after Wisdom's slider, and after the card's `WIS` bar:

<!-- prettier-ignore -->
```html
<p>
  <label for="cha">Charisma</label>
  <input id="cha" name="cha" type="range" min="1" max="10" value="5" oninput="showStats()" />
</p>

<p class="bar">CHA <span id="cha-bar"></span></p>
```

In `practice.js`, `budget` becomes 20, and `showStats()` gets three new or changed lines:

```js
const cha = Number(document.getElementById("cha").value);
const pointsLeft = budget - (str + dex + wis + cha);
document.getElementById("cha-bar").textContent = "█".repeat(cha);
```

---

## Extras: Day or Night

<style scoped>
pre { font-size: 0.65em; }
</style>

In `index.html`, a group of radio buttons in the form, and a line on the card:

<!-- prettier-ignore -->
```html
<p>
  <input type="radio" id="day" name="watch" value="day" onchange="showCard()" checked />
  <label for="day">Day watch</label>
  <input type="radio" id="night" name="watch" value="night" onchange="showCard()" />
  <label for="night">Night watch</label>
</p>

<p id="card-watch"></p>
```

At the end of `showCard()`:

```js
if (document.getElementById("day").checked) {
  document.getElementById("card-watch").textContent = "☀ Day watch";
} else {
  document.getElementById("card-watch").textContent = "☾ Night watch";
}
```

---

## Extras: Node Report

<style scoped>
pre { font-size: 0.65em; }
</style>

After `<ul id="party">` in `index.html`, add `<p id="node-report"></p>`. At the end of the Party Size section:

```js
let elements = 0;
let texts = 0;
let comments = 0;
for (const node of party.childNodes) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    elements++;
  } else if (node.nodeType === Node.TEXT_NODE) {
    texts++;
  } else if (node.nodeType === Node.COMMENT_NODE) {
    comments++;
  }
}
document.getElementById("node-report").textContent =
  `Elements: ${elements}, text: ${texts}, comments: ${comments}`;
```
