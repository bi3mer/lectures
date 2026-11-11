---
marp: true
theme: lecture
paginate: true
---

<style>
.caption { font-size: 20px; color: var(--secondary); }
/* Shrinks a code block or table that would crowd the slide. */
.small-code pre { font-size: 0.75em; }
.small-table table { font-size: 0.7em; }
/* The theme draws a .demo as a white panel whose 12px edge is a shadow, so the margins keep
   that edge clear of the caption above and the slide's sides. */
.demo { margin: 20px 12px 28px; color-scheme: light; }
/* Answer choices for the Predict slides, all on one line. */
.choices { display: flex; gap: 48px; }
</style>

# Events

Colan Biemer

---

## Calling Our Code, So Far

```html
<button type="button" onclick="sayHello()">Say hello</button>
<p id="message"></p>
```

```js
function sayHello() {
  document.getElementById("message").textContent = "Hello";
}
```

Every page so far has called our code from an [event attribute](../13-js-forms-dom/lecture.html#49), like `onclick`. Today, the JavaScript listens for events itself.

---

## Events

An **event** is a message the browser sends when something happens on the page, like a click, a key press, or the page finishing loading. A **listener** is a function the browser calls each time a given event happens to a given element.

Today's events come in four kinds: mouse, keyboard, window, and form. There are [many more](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events).

---

## `addEventListener`

```html
<button id="hello" type="button">Say hello</button>
<p id="message"></p>
```

```js
const hello = document.getElementById("hello");
hello.addEventListener("click", sayHello);
```

[`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) takes the event's name, with no `on`, and the function to call. Like [`setInterval`](../12-js-math-dates-strings/lecture.html#27), it takes the function as a value, with no `()`.

What happens if we add the `()`?

---

## Predict: Calling the Listener

```js
hello.addEventListener("click", sayHello());
```

What happens when we click **Say hello**?

<div class="choices">

**A.** Hello on each click

**B.** Hello once, at load

**C.** `TypeError`

**D.** Never says hello

</div>

---

## Answer: Calling the Listener

**B.** `sayHello()` runs as the line runs, and gives back `undefined`. That's what gets passed, so nothing listens for clicks, and the browser shows no error.

```js
hello.addEventListener("click", sayHello);
```

---

## Arrow Functions as Listeners

```js
hello.addEventListener("click", () => {
  sayHello();
  hello.disabled = true;
});
```

Code that only one listener uses can be an [arrow function](../11-js-arrays/lecture.html#34), written right in the call.

---

## Attributes or `addEventListener`?

<div class="small-table">
<center>

| Way to listen                                | Written in | Listeners per event                       |
| -------------------------------------------- | ---------- | ----------------------------------------- |
| `onclick="sayHello()"`                       | HTML       | one                                       |
| `hello.onclick = sayHello;`                  | JavaScript | one, and setting it again replaces it     |
| `hello.addEventListener("click", sayHello);` | JavaScript | as many as we add, run in the order added |

</center>
</div>

From today on, listeners go in the JavaScript, so the HTML only says what's on the page.

---

## `removeEventListener`

<!-- prettier-ignore -->
```js
hello.addEventListener("click", sayHello);
hello.removeEventListener("click", sayHello);         // does nothing now

hello.addEventListener("click", () => sayHello());
hello.removeEventListener("click", () => sayHello()); // still says hello
```

[`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) needs the same function that's listening. [Functions are references](../11-js-arrays/lecture.html#30), and each arrow we write makes a new one, so the second arrow isn't the one listening.

---

## The Event Object

```js
hello.addEventListener("click", (event) => {
  console.log(event.type);
  console.log(event.target);
});
```

<p class="caption">Console</p>

```text
click
<button id="hello" type="button">Say hello</button>
```

The browser calls each listener with an [**event object**](https://developer.mozilla.org/en-US/docs/Web/API/Event), which describes what happened. `type` is the event's name, and `target` is the element it happened to.

---

## `event.target`

```html
<ul>
  <li>Ada</li>
  <li>Grace</li>
</ul>
```

```js
function showName(event) {
  console.log(event.target.textContent);
}

for (const item of document.querySelectorAll("li")) {
  item.addEventListener("click", showName);
}
```

<p class="caption">Console, after clicking Grace</p>

```text
Grace
```

`showName` is one function for every `<li>`. It has no `item`, so `event.target` tells it which one was clicked.

---

## Problem: Click Counter

```html
<button id="add" type="button">Add</button>
<p id="count">0</p>
```

```js
// Each click of Add adds 1 to the number on the page.
```

<p class="caption">Page</p>

```text
3
```

- Where should `count` live?

---

## Solution: Click Counter

```js
let count = 0;

document.getElementById("add").addEventListener("click", () => {
  ++count;
  document.getElementById("count").textContent = count;
});
```

`count` sits outside the listener, so it keeps its value between clicks.

---

## Problem: Which Button

```html
<button class="pick" type="button">Ada</button>
<button class="pick" type="button">Grace</button>
<p id="picked"></p>
```

```text
for each element with the class pick
  when it is clicked
    put the clicked button's text in picked
```

<p class="caption">Page</p>

```text
Grace
```

---

## Solution: Which Button

```js
function showPick(event) {
  document.getElementById("picked").textContent = event.target.textContent;
}

for (const button of document.querySelectorAll(".pick")) {
  button.addEventListener("click", showPick);
}
```

An arrow inside the loop works too, but makes a new function for each button. With `event.target`, one function serves both.

---

# The Mouse

---

## Mouse Events

<div class="small-table">
<center>

| Event        | Fires when                                                |
| ------------ | --------------------------------------------------------- |
| `click`      | the main mouse button is pressed and let go on an element |
| `dblclick`   | two clicks come quickly, one after the other              |
| `mousedown`  | a mouse button is pressed                                 |
| `mouseup`    | a mouse button is let go                                  |
| `mousemove`  | the mouse moves, many times a second                      |
| `mouseenter` | the mouse moves onto an element                           |
| `mouseleave` | the mouse moves off an element                            |

</center>
</div>

A click is a `mousedown` and then a `mouseup`, both on the same element.

---

## Predict: A Double Click

```js
hello.addEventListener("click", () => console.log("click"));
hello.addEventListener("dblclick", () => console.log("dblclick"));
```

We double-click **Say hello**. How many lines print?

<div class="choices">

**A.** `1`

**B.** `2`

**C.** `3`

**D.** `4`

</div>

---

## Answer: A Double Click

<p class="caption">Console</p>

```text
click
click
dblclick
```

**C.** A double click is two clicks first, then a `dblclick`. A page that listens for both runs the `click` code twice before the `dblclick` code.

---

## Where the Mouse Is

<div class="small-code">

```js
const box = document.getElementById("box");
box.addEventListener("mousemove", (event) => {
  console.log(event.offsetX, event.offsetY);
  console.log(event.clientX, event.clientY);
});
```

</div>

![w:500 A large box, the browser window, held a smaller box toward its bottom right. The mouse was a dot inside the smaller box. A dashed blue line ran from the window's top-left corner to the mouse, labeled clientX: 276, clientY: 152. A dashed yellow line ran from the smaller box's top-left corner to the mouse, labeled offsetX: 100, offsetY: 80.](examples/diagrams/mouse-position.svg)

Both are in pixels. [`offsetX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetX) and `offsetY` count from the target's top-left corner, and [`clientX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX) and `clientY` from the window's.

---

## `mouseenter` or `:hover`?

```css
#box:hover {
  outline: 3px solid orange;
}
```

```js
box.addEventListener("mouseenter", () => {
  box.textContent = "Hello";
});
```

A look that changes on hover goes in the CSS, with [`:hover`](../03-css-intro/lecture.html#100). When code has to run, like changing the box's text, listen for `mouseenter` and `mouseleave`.

---

## Problem: Mouse Position

```html
<div id="box" style="height: 200px; background: lightblue"></div>
<p id="where"></p>
```

```js
// As the mouse moves over the box, show where it is, like 40, 120.
```

<p class="caption">Page</p>

```text
40, 120
```

- Which pair of properties counts from the box?

---

## Solution: Mouse Position

```js
document.getElementById("box").addEventListener("mousemove", (event) => {
  document.getElementById("where").textContent =
    `${event.offsetX}, ${event.offsetY}`;
});
```

`offsetX` and `offsetY` count from the box's top-left corner.

---

## Problem: In or Out

```html
<div id="box" style="height: 200px; background: lightblue"></div>
<p id="status">Out</p>
```

```text
when the mouse enters the box
  put "In" in status
when the mouse leaves the box
  put "Out" in status
```

<p class="caption">Page</p>

```text
In
```

---

## Solution: In or Out

```js
const box = document.getElementById("box");

box.addEventListener("mouseenter", () => {
  document.getElementById("status").textContent = "In";
});

box.addEventListener("mouseleave", () => {
  document.getElementById("status").textContent = "Out";
});
```

Changing the text takes code, so `:hover` cannot do this.

---

# The Keyboard

---

## Keyboard Events

<div class="small-code">

```js
document.addEventListener("keydown", (event) => {
  console.log(`down: ${event.key}`);
});

document.addEventListener("keyup", (event) => {
  console.log(`up: ${event.key}`);
});
```

<p class="caption">Console, holding <code>a</code> down for a moment</p>

```text
down: a
down: a
down: a
up: a
```

</div>

The element with **focus** is the one that gets typed keys: the box we clicked into, or `body` when none has it. Holding a key repeats `keydown`.

---

## `event.key`

<div class="small-table">
<center>

| Press      | `event.key`   | `event.code`  |
| ---------- | ------------- | ------------- |
| a          | `"a"`         | `"KeyA"`      |
| Shift + a  | `"A"`         | `"KeyA"`      |
| 1          | `"1"`         | `"Digit1"`    |
| Space      | `" "`         | `"Space"`     |
| Left arrow | `"ArrowLeft"` | `"ArrowLeft"` |
| Enter      | `"Enter"`     | `"Enter"`     |
| Escape     | `"Escape"`    | `"Escape"`    |

</center>
</div>

[`key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) is what the key types, or its name, and [`code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) is which key it is on the keyboard. `shiftKey`, `ctrlKey`, `altKey`, and `metaKey` (⌘ on a Mac) say which are held.

---

## Default Actions

```js
document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    event.preventDefault();
  }
});
```

A **default action** is what the browser does on its own after an event, like scrolling on Space, opening a clicked link, or reloading on submit. [`preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) stops it.

---

## Events Bubble Up

<div class="small-code">

```html
<body>
  <main>
    <form id="signup">
      <input id="name" name="name" />
    </form>
  </main>
</body>
```

</div>

<p class="caption">A key typed in the name box runs the listeners on</p>

```text
input#name -> form#signup -> main -> body -> html -> document -> window
```

After the listeners on its target run, an event **bubbles**: it goes up the [DOM tree](../13-js-forms-dom/lecture.html#29), running the listeners on everything above it. `event.target` still names where it started.

---

## Predict: Typing a Shortcut

```js
document.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    console.log("Hello");
  }
});
```

We type `hi` in the name box. What does the console show, and what does the box say?

<div class="choices">

**A.** Nothing, `hi`

**B.** `Hello`, `hi`

**C.** `Hello`, `i`

**D.** Nothing, `i`

</div>

---

## Answer: Typing a Shortcut

**B.** The `h` bubbles up from the box to `document`, which logs `Hello`. Nothing stopped the default action, so the box still gets its `h`. A listener can skip keys typed in a box:

```js
if (event.target.nodeName === "INPUT") {
  return;
}
```

[`nodeName`](../13-js-forms-dom/lecture.html#37) is the tag in capitals, and [`return`](../08-js-intro/lecture.html#98) ends the listener before the shortcuts.

---

## Problem: Last Key

```html
<p id="key">Press a key</p>
```

```js
// Show the last key pressed anywhere on the page.
```

<p class="caption">Page</p>

```text
Enter
```

- Which element should we listen on?

---

## Solution: Last Key

```js
document.addEventListener("keydown", (event) => {
  document.getElementById("key").textContent = event.key;
});
```

Listening on `document` hears keys from the whole page.

---

## Problem: Escape Clears

```html
<input id="note" />
```

```text
when a key goes down in the note box
  if the key is Escape
    empty the box
```

<p class="caption">Page, after typing Ada and pressing Escape</p>
<div class="demo"><input /></div>

---

## Solution: Escape Clears

```js
const note = document.getElementById("note");

note.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    note.value = "";
  }
});
```

The listener is on the box, so Escape anywhere else on the page does nothing.

---

# The Window

---

## Window Events

<div class="small-table">
<center>

| Event              | Fires when                                                     |
| ------------------ | -------------------------------------------------------------- |
| `load`             | the page and everything on it, like its images, have loaded    |
| `DOMContentLoaded` | the HTML has been read, so every element exists                |
| `resize`           | the window changes size                                        |
| `scroll`           | the page scrolls, and `window.scrollY` says how far down it is |
| `beforeunload`     | the page is about to close or reload                           |

</center>
</div>

These go on `window`, except `DOMContentLoaded`, which goes on `document`. A script in `<head>` runs [before the body exists](../13-js-forms-dom/lecture.html#32), so it can wait for `DOMContentLoaded`.

---

## `resize`

```js
window.addEventListener("resize", () => {
  console.log(window.innerWidth, window.innerHeight);
});
```

<p class="caption">Console, dragging the window's edge</p>

```text
1024 768
1016 768
1008 768
```

`innerWidth` and `innerHeight` are the window's size in pixels. Dragging fires `resize` many times, once for each step.

---

## `beforeunload`

```js
window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
});
```

For [`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event), `preventDefault()` makes the browser ask before the page closes or reloads. The browser writes the question, and asks only once we've clicked or typed on the page.

---

## Problem: Window Size

```html
<p id="size"></p>
```

```js
// Show the window's width at load, and again each time it changes size.
```

<p class="caption">Page</p>

```text
1024
```

- How can the same code run at load and on every `resize`?

---

## Solution: Window Size

```js
function showWidth() {
  document.getElementById("size").textContent = window.innerWidth;
}

showWidth();
window.addEventListener("resize", showWidth);
```

`showWidth()` fills the paragraph at load, and `resize` gets [`showWidth` with no `()`](#6), so it runs again on each change.

---

## Problem: Unsaved Note

```html
<textarea id="note"></textarea>
```

```text
when the page is about to close or reload
  if the note is not empty
    make the browser ask first
```

<p class="caption">Chrome, after typing and reloading</p>

```text
Reload site?
Changes that you made may not be saved.
```

---

## Solution: Unsaved Note

```js
window.addEventListener("beforeunload", (event) => {
  if (document.getElementById("note").value !== "") {
    event.preventDefault();
  }
});
```

The `if` lets an empty note close without asking. Type something, then reload to test it.

---

# Forms

---

## Form Events

<div class="small-table">
<center>

| Event    | Fires when                                                                 |
| -------- | -------------------------------------------------------------------------- |
| `input`  | the value changes: each keystroke, or each step of a slider                |
| `change` | a change is done: leaving a box, letting go of a slider, picking an option |
| `focus`  | a control gets focus                                                       |
| `blur`   | a control loses focus                                                      |
| `submit` | the form is submitted                                                      |
| `reset`  | the form's reset button puts every control back                            |

</center>
</div>

These are the events behind [`oninput` and `onchange`](../13-js-forms-dom/lecture.html#49). `focus` and `blur` don't bubble.

---

## `input`

```html
<input id="name" />
<p id="greeting"></p>
```

```js
document.getElementById("name").addEventListener("input", (event) => {
  document.getElementById("greeting").textContent =
    `Hello, ${event.target.value}`;
});
```

This [greets as we type](../13-js-forms-dom/lecture.html#50) like before, with no `oninput` in the HTML. `event.target.value` is what the box holds.

---

## `focus` and `blur`

```js
const name = document.getElementById("name");

name.addEventListener("blur", () => {
  name.value = name.value.trim();
});
```

`focus` fires when we click or Tab into a box, and `blur` when we leave it, a good time to [`trim`](../12-js-math-dates-strings/lecture.html#34) what was typed.

---

## `submit`

```js
document.getElementById("signup").addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Signed up");
});
```

A form's submit button and Enter in one of its text boxes both submit it, so listen on the form for `submit`. `preventDefault()` stops [the reload](../13-js-forms-dom/lecture.html#22).

---

## Problem: Say Hello

```html
<form id="hello">
  <input id="name" />
  <button>Say hello</button>
</form>
<p id="message"></p>
```

```js
// On submit, stop the reload and show "Hello, " and the name.
```

<p class="caption">Page</p>

```text
Hello, Ada
```

- Press Enter in the box. What happens?

---

## Solution: Say Hello

```js
document.getElementById("hello").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  document.getElementById("message").textContent = `Hello, ${name}`;
});
```

Enter in the box submits too, so we listen on the form, not the button.

---

## Problem: Hint

```html
<input id="name" />
<p id="hint" hidden>First name only</p>
```

```text
when the box gets focus
  show the hint
when the box loses focus
  hide the hint
```

<p class="caption">Page</p>

```text
First name only
```

---

## Solution: Hint

```js
const name = document.getElementById("name");

name.addEventListener("focus", () => {
  document.getElementById("hint").hidden = false;
});

name.addEventListener("blur", () => {
  document.getElementById("hint").hidden = true;
});
```

`focus` and `blur` don't bubble, so each goes on the box itself.

---

## Next Up: Form Validation

[Form Validation](../16-js-form-validation/lecture.html)
