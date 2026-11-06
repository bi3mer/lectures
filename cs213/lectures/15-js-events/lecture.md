---
marp: true
theme: lecture
paginate: true
---

<style>
.caption { font-size: 20px; color: var(--secondary); }
/* Answer choices for the Predict slides, all on one line. */
.choices { display: flex; gap: 48px; }
</style>

# Events

Colan Biemer

---

## Calling Our Code, So Far

```html
<button type="button" onclick="sayHello()">Say hello</button>
```

Every page so far has called our code from an [event attribute](../13-js-forms-dom/lecture.html#49), like `onclick`. Today, the JavaScript listens for events itself.

What is the browser telling us when a button is clicked?

---

## Events

An **event** is a message the browser sends when something happens on the page, like a click, a key press, or the page finishing loading. A **listener** is a function the browser calls each time a given event happens to a given element.

Today's events come in four kinds: mouse, keyboard, window, and form.

---

## `addEventListener`

```html
<button id="clear" type="button">Clear</button>
```

```js
const clear = document.getElementById("clear");
clear.addEventListener("click", clearList);
```

`addEventListener` takes the event's name, with no `on`, and the function to call. Like [`setInterval`](../12-js-math-dates-strings/lecture.html#27), it takes the function as a value, with no `()`.

What happens if we add the `()`?

---

## Predict: Calling the Listener

```js
clear.addEventListener("click", clearList());
```

What happens when we click **Clear**? Vote, then convince a neighbor.

<div class="choices">

**A.** It clears on each click

**B.** It clears once, at load

**C.** `TypeError`

**D.** It never clears

</div>

---

## Answer: Calling the Listener

**B.** `clearList()` runs as the line runs, and gives back `undefined`. That's what gets passed, so nothing listens for clicks, and the browser shows no error.

```js
clear.addEventListener("click", clearList);
```

Does the listener have to be a named function?

---

## Arrow Functions as Listeners

```js
clear.addEventListener("click", () => {
  clearList();
  document.getElementById("message").textContent = "Cleared";
});
```

Code that only one listener uses can be an [arrow function](../11-js-arrays/lecture.html#34), written right in the call.

We already had `onclick`. Why change?

---

## Attributes or `addEventListener`?

<style scoped>
table { font-size: 0.7em; }
</style>

<center>

| Way to listen                                 | Written in | Listeners per event                       |
| --------------------------------------------- | ---------- | ----------------------------------------- |
| `onclick="clearList()"`                       | HTML       | one                                       |
| `clear.onclick = clearList;`                  | JavaScript | one, and setting it again replaces it     |
| `clear.addEventListener("click", clearList);` | JavaScript | as many as we add, run in the order added |

</center>

From today on, listeners go in the JavaScript, so the HTML only says what's on the page.

How do we stop listening?

---

## `removeEventListener`

<!-- prettier-ignore -->
```js
clear.addEventListener("click", clearList);
clear.removeEventListener("click", clearList);         // Clear does nothing now

clear.addEventListener("click", () => clearList());
clear.removeEventListener("click", () => clearList()); // Clear still clears
```

`removeEventListener` needs the same function that's listening. [Functions are references](../11-js-arrays/lecture.html#30), and each arrow we write makes a new one, so the second arrow isn't the one listening.

---

## The Event Object

```js
clear.addEventListener("click", (event) => {
  console.log(event.type);
  console.log(event.target);
});
```

<p class="caption">Console</p>

```text
click
<button id="clear" type="button">Clear</button>
```

The browser calls each listener with an **event object**, which describes what happened. `type` is the event's name, and `target` is the element it happened to.

Why is `target` useful?

---

## `event.target`

```js
for (let box of document.querySelectorAll('input[name="color"]')) {
  box.addEventListener("change", (event) => {
    showColor(event.target.value);
  });
}
```

With `event.target`, one function serves every box, since it reads the value from the box that changed.

---

## Setting Up

Make these two files in a new WebStorm folder:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Practice</title>
  </head>
  <body>
    <!-- each problem's HTML goes here -->
    <script src="practice.js"></script>
  </body>
</html>
```

`practice.js` starts empty. Before each problem, clear it and paste in the new HTML.

---

## Problem: Click Counter (us)

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

## Solution: Click Counter (us)

```js
let count = 0;

document.getElementById("add").addEventListener("click", () => {
  count++;
  document.getElementById("count").textContent = count;
});
```

`count` sits outside the listener, so it keeps its value between clicks.

---

## Problem: Which Button (you)

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

## Solution: Which Button (you)

```js
for (let button of document.querySelectorAll(".pick")) {
  button.addEventListener("click", (event) => {
    document.getElementById("picked").textContent = event.target.textContent;
  });
}
```

`event.target` is the button that was clicked, so one function serves both.

So far we only click. What else can the mouse do?

---

## Mouse Events

<style scoped>
table { font-size: 0.75em; }
</style>

<center>

| Event        | Fires when                                         |
| ------------ | -------------------------------------------------- |
| `click`      | a mouse button is pressed and let go on an element |
| `dblclick`   | two clicks come quickly, one after the other       |
| `mousedown`  | a mouse button is pressed                          |
| `mouseup`    | a mouse button is let go                           |
| `mousemove`  | the mouse moves, many times a second               |
| `mouseenter` | the mouse moves onto an element                    |
| `mouseleave` | the mouse moves off an element                     |

</center>

A click is a `mousedown` and then a `mouseup`, both on the same element.

---

## Predict: A Double Click

```js
clear.addEventListener("click", () => console.log("click"));
clear.addEventListener("dblclick", () => console.log("dblclick"));
```

We double-click **Clear**. How many lines print? Vote, then convince a neighbor.

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

How do we know where the mouse is?

---

## Where the Mouse Is

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
box.addEventListener("mousemove", (event) => {
  console.log(event.offsetX, event.offsetY);
  console.log(event.clientX, event.clientY);
});
```

![w:540 A large box, the browser window, held a smaller box toward its bottom right. The mouse was a dot inside the smaller box. A dashed blue line ran from the window's top-left corner to the mouse, labeled clientX: 276, clientY: 152. A dashed yellow line ran from the smaller box's top-left corner to the mouse, labeled offsetX: 100, offsetY: 80.](examples/diagrams/mouse-position.svg)

Both are in pixels. `offsetX` and `offsetY` count from the target's top-left corner, and `clientX` and `clientY` from the window's.

When do we need code, and when is CSS enough?

---

## `mouseenter` or `:hover`?

```css
.card:hover {
  outline: 3px solid orange;
}
```

```js
box.addEventListener("mouseenter", () => {
  document.getElementById("message").textContent = "Hello";
});
```

A look that changes on hover goes in the CSS, with [`:hover`](../03-css-intro/lecture.html#100). When code has to run, like changing the page's text, listen for `mouseenter` and `mouseleave`.

---

## Problem: Mouse Position (us)

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

## Solution: Mouse Position (us)

```js
document.getElementById("box").addEventListener("mousemove", (event) => {
  document.getElementById("where").textContent =
    `${event.offsetX}, ${event.offsetY}`;
});
```

`offsetX` and `offsetY` count from the box's top-left corner.

---

## Problem: In or Out (you)

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

## Solution: In or Out (you)

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

What about the keyboard?

---

## Keyboard Events

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
document.addEventListener("keydown", (event) => {
  console.log(`down: ${event.key}`);
});

document.addEventListener("keyup", (event) => {
  console.log(`up: ${event.key}`);
});
```

<p class="caption">Console, holding a down for a moment</p>

```text
down: a
down: a
down: a
up: a
```

The element with **focus** is the one that gets typed keys: the box we clicked into, or `body` when none has it. Holding a key repeats `keydown`.

---

## `event.key`

<style scoped>
table { font-size: 0.7em; }
</style>

<center>

| Press     | `event.key`   | `event.code`  |
| --------- | ------------- | ------------- |
| a         | `"a"`         | `"KeyA"`      |
| Shift + a | `"A"`         | `"KeyA"`      |
| 1         | `"1"`         | `"Digit1"`    |
| Space     | `" "`         | `"Space"`     |
| ←         | `"ArrowLeft"` | `"ArrowLeft"` |
| Enter     | `"Enter"`     | `"Enter"`     |
| Escape    | `"Escape"`    | `"Escape"`    |

</center>

`key` is what the key types, or its name, and `code` is which key it is on the keyboard. `shiftKey`, `ctrlKey`, `altKey`, and `metaKey` (⌘ on a Mac) say which are held.

---

## Default Actions

```js
document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    event.preventDefault();
  }
});
```

A **default action** is what the browser does on its own after an event, like scrolling on Space, opening a clicked link, or reloading on submit. `preventDefault()` stops it.

Where does a key press go after its listener runs?

---

## Events Bubble Up

<style scoped>
pre { font-size: 0.75em; }
</style>

```html
<body>
  <main>
    <form id="signup">
      <input id="title" name="title" />
    </form>
  </main>
</body>
```

<p class="caption">A key typed in the Title box runs the listeners on</p>

```text
input#title -> form#signup -> main -> body -> html -> document -> window
```

After the listeners on its target run, an event **bubbles**: it goes up the [DOM tree](../13-js-forms-dom/lecture.html#29), running each parent's listeners. `event.target` still names where it started.

---

## Predict: Typing a Shortcut

```js
document.addEventListener("keydown", (event) => {
  if (event.key === "c") {
    clearList();
  }
});
```

We type `cat` in the **Title** box. Does the list clear, and what does the box say? Vote, then convince a neighbor.

<div class="choices">

**A.** Stays, `cat`

**B.** Clears, `cat`

**C.** Clears, `at`

**D.** Stays, `at`

</div>

---

## Answer: Typing a Shortcut

**B.** The `c` bubbles up from the box to `document`, which clears the list. Nothing stopped the default action, so the box still gets its `c`. A listener can skip keys typed in a box:

```js
if (event.target.nodeName === "INPUT") {
  return;
}
```

[`nodeName`](../13-js-forms-dom/lecture.html#37) is the tag in capitals, and [`return`](../08-js-intro/lecture.html#98) ends the listener before the shortcuts.

---

## Problem: Last Key (us)

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

## Solution: Last Key (us)

```js
document.addEventListener("keydown", (event) => {
  document.getElementById("key").textContent = event.key;
});
```

Listening on `document` hears keys from the whole page.

---

## Problem: Escape Clears (you)

```html
<input id="note" />
```

```text
when a key goes down in the note box
  if the key is Escape
    empty the box
```

<p class="caption">Page</p>

```text
[        ]
```

---

## Solution: Escape Clears (you)

```js
const note = document.getElementById("note");

note.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    note.value = "";
  }
});
```

`event.key` is `"Escape"` for the Escape key.

Some events belong to the whole window.

---

## Window Events

<style scoped>
table { font-size: 0.75em; }
</style>

<center>

| Event              | Fires when                                                     |
| ------------------ | -------------------------------------------------------------- |
| `load`             | the page and everything on it, like its images, have loaded    |
| `DOMContentLoaded` | the HTML has been read, so every element exists                |
| `resize`           | the window changes size                                        |
| `scroll`           | the page scrolls, and `window.scrollY` says how far down it is |
| `beforeunload`     | the page is about to close or reload                           |

</center>

These go on `window`, except `DOMContentLoaded`, which goes on `document`. A script in `<head>` can wait for it, since [it runs before the body exists](../13-js-forms-dom/lecture.html#32).

---

## `resize`

```js
window.addEventListener("resize", () => {
  const size = `${window.innerWidth} × ${window.innerHeight}`;
  document.getElementById("message").textContent = size;
});
```

`innerWidth` and `innerHeight` are the window's size in pixels. Dragging the window's edge fires `resize` many times, once for each step.

How do we warn someone before they leave?

---

## `beforeunload`

```js
window.addEventListener("beforeunload", (event) => {
  if (document.getElementById("title").value !== "") {
    event.preventDefault();
  }
});
```

For `beforeunload`, `preventDefault()` makes the browser ask before the page closes or reloads. The browser writes the question, and asks only once we've clicked or typed on the page.

---

## Problem: Window Size (us)

```html
<p id="size"></p>
```

```js
// Show the window's width each time the window changes size.
```

<p class="caption">Page</p>

```text
1024
```

---

## Solution: Window Size (us)

```js
window.addEventListener("resize", () => {
  document.getElementById("size").textContent = window.innerWidth;
});
```

Drag the window's edge: `resize` fires many times.

---

## Problem: Unsaved Note (you)

```html
<textarea id="note"></textarea>
```

```text
when the page is about to close or reload
  if the note is not empty
    make the browser ask first
```

<p class="caption">Page</p>

```text
Leave site?
```

---

## Solution: Unsaved Note (you)

```js
window.addEventListener("beforeunload", (event) => {
  if (document.getElementById("note").value !== "") {
    event.preventDefault();
  }
});
```

Type something, then reload to test it.

Forms have events of their own.

---

## Form Events

<style scoped>
table { font-size: 0.75em; }
</style>

<center>

| Event    | Fires when                                                                 |
| -------- | -------------------------------------------------------------------------- |
| `input`  | the value changes: each keystroke, or each step of a slider                |
| `change` | a change is done: leaving a box, letting go of a slider, picking an option |
| `focus`  | a control gets focus                                                       |
| `blur`   | a control loses focus                                                      |
| `submit` | the form is sent                                                           |
| `reset`  | the form's reset button puts every control back                            |

</center>

These are the events behind [`oninput` and `onchange`](../13-js-forms-dom/lecture.html#49). `focus` and `blur` don't bubble.

---

## `focus` and `blur`

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
const title = document.getElementById("title");

title.addEventListener("focus", () => {
  document.getElementById("message").textContent = "Add a title";
});

title.addEventListener("blur", () => {
  title.value = title.value.trim();
});
```

`focus` fires when we click or Tab into a box, and `blur` when we leave it, a good time to tidy what was typed.

How do we run code when the form is sent?

---

## `submit`

```js
document.getElementById("signup").addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("message").textContent = "Saved";
});
```

A form fires `submit` when it's sent, by its submit button or by Enter in a text box, so listen on the form. `preventDefault()` stops [the reload](../13-js-forms-dom/lecture.html#22).

---

## Problem: Say Hello (us)

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

## Solution: Say Hello (us)

```js
document.getElementById("hello").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  document.getElementById("message").textContent = `Hello, ${name}`;
});
```

Enter in the box submits too, so we listen on the form, not the button.

---

## Problem: Hint (you)

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

## Solution: Hint (you)

```js
const name = document.getElementById("name");

name.addEventListener("focus", () => {
  document.getElementById("hint").hidden = false;
});

name.addEventListener("blur", () => {
  document.getElementById("hint").hidden = true;
});
```

`focus` and `blur` each go on the box itself.

That is a lot of events. Which one do we need?

---

## Which Event?

<style scoped>
table { font-size: 0.65em; }
</style>

<center>

| To run code when               | Listen for                              | On                       |
| ------------------------------ | --------------------------------------- | ------------------------ |
| a button is clicked            | `click`                                 | the button               |
| a mouse button goes down or up | `mousedown`, `mouseup`                  | the element, or `window` |
| the mouse moves, on or off     | `mousemove`, `mouseenter`, `mouseleave` | the element              |
| a key is pressed               | `keydown`                               | `document`, or a box     |
| a control's value changes      | `input`, `change`                       | the control              |
| a box gets or loses focus      | `focus`, `blur`                         | the box                  |
| a form is sent                 | `submit`                                | the form                 |
| the window changes size        | `resize`                                | `window`                 |
| the page is about to close     | `beforeunload`                          | `window`                 |

</center>

Each one is an `addEventListener` call, on the element where the event happens or one it bubbles up to.

---

# Conclusion

---

## Build It Yourself

[Sketchy](../../demos/15-sketchy/instruction.html) is a drawing pad built from today's events, with step-by-step instructions.

---

## Summary

- An event is a message from the browser. `addEventListener` runs a function each time one happens.
- Pass the function itself, with no `()`, and name the event with no `on`.
- The event object says what happened: its `type`, its `target`, the `key`, or where the mouse is.
- `keydown` goes to the element with focus, so shortcuts listen on `document`.
- Events bubble up through each parent, and `event.target` still says where one started.
- `window` hears `resize` and `beforeunload`. Forms fire `input`, `change`, `focus`, `blur`, and `submit`.
- `preventDefault()` stops the browser's default action, like the reload after a submit.

---

## Next Up: Form Validation

[Form Validation](../16-js-form-validation/lecture.html)

---

# Questions?
