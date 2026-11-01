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
<button type="button" onclick="placeOrder()">Place order</button>
```

Every page so far has called our code from an [event attribute](../13-js-forms-dom/lecture.html#45), like Pie Chart's `onclick`. Today, the JavaScript listens for events itself.

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
clear.addEventListener("click", clearCanvas);
```

`addEventListener` takes the event's name, with no `on`, and the function to call. Like [`setInterval`](../12-js-math-dates-strings/lecture.html#42), it takes the function as a value, with no `()`.

---

## Predict: Calling the Listener

```js
clear.addEventListener("click", clearCanvas());
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

**B.** `clearCanvas()` runs as the line runs, and gives back `undefined`. That's what gets passed, so nothing listens for clicks, and the browser shows no error.

```js
clear.addEventListener("click", clearCanvas);
```

---

## Arrow Functions as Listeners

```js
clear.addEventListener("click", () => {
  clearCanvas();
  document.getElementById("message").textContent = "Cleared";
});
```

Code that only one listener uses can be an [arrow function](../11-js-arrays/lecture.html#30), written right in the call.

---

## Attributes or `addEventListener`?

<style scoped>
table { font-size: 0.7em; }
</style>

<center>

| Way to listen                                   | Written in | Listeners per event                       |
| ----------------------------------------------- | ---------- | ----------------------------------------- |
| `onclick="clearCanvas()"`                       | HTML       | one                                       |
| `clear.onclick = clearCanvas;`                  | JavaScript | one, and setting it again replaces it     |
| `clear.addEventListener("click", clearCanvas);` | JavaScript | as many as we add, run in the order added |

</center>

From today on, listeners go in the JavaScript, so the HTML only says what's on the page.

---

## `removeEventListener`

<!-- prettier-ignore -->
```js
clear.addEventListener("click", clearCanvas);
clear.removeEventListener("click", clearCanvas);         // Clear does nothing now

clear.addEventListener("click", () => clearCanvas());
clear.removeEventListener("click", () => clearCanvas()); // Clear still clears
```

`removeEventListener` needs the same function that's listening. [Functions are references](../11-js-arrays/lecture.html#26), and each arrow we write makes a new one, so the second arrow isn't the one listening.

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

---

## `event.target`

```js
for (const box of document.querySelectorAll('input[name="topping"]')) {
  box.addEventListener("change", (event) => {
    showTopping(event.target.value);
  });
}
```

Pie Chart wrote [each topping's name in its `onchange`](../14-js-dom/lecture.html#41). With `event.target`, one function serves every box, since it reads the name from the box that changed.

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

---

## Where the Mouse Is

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
canvas.addEventListener("mousemove", (event) => {
  console.log(event.offsetX, event.offsetY);
  console.log(event.clientX, event.clientY);
});
```

![w:540 A large box, the browser window, held a smaller box, the canvas, toward its bottom right. The mouse was a dot inside the canvas. A dashed blue line ran from the window's top-left corner to the mouse, labeled clientX: 276, clientY: 152. A dashed yellow line ran from the canvas's top-left corner to the mouse, labeled offsetX: 100, offsetY: 80.](examples/diagrams/mouse-position.svg)

Both are in pixels. `offsetX` and `offsetY` count from the target's top-left corner, and `clientX` and `clientY` from the window's.

---

## `mouseenter` or `:hover`?

```css
.swatch:hover {
  outline: 3px solid orange;
}
```

```js
canvas.addEventListener("mouseenter", () => {
  document.getElementById("message").textContent = "Drag to draw";
});
```

A look that changes on hover goes in the CSS, with [`:hover`](../03-css-intro/lecture.html#100). When code has to run, like changing the page's text, listen for `mouseenter` and `mouseleave`.

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

---

## Events Bubble Up

<style scoped>
pre { font-size: 0.75em; }
</style>

```html
<body>
  <main>
    <form id="tools">
      <input id="title" name="title" />
    </form>
  </main>
</body>
```

<p class="caption">A key typed in the Title box runs the listeners on</p>

```text
input#title -> form#tools -> main -> body -> html -> document -> window
```

After the listeners on its target run, an event **bubbles**: it goes up the [DOM tree](../13-js-forms-dom/lecture.html#30), running each parent's listeners. `event.target` still names where it started.

---

## Predict: Typing a Shortcut

```js
document.addEventListener("keydown", (event) => {
  if (event.key === "c") {
    clearCanvas();
  }
});
```

We type `cat` in the **Title** box. Does the drawing clear, and what does the box say? Vote, then convince a neighbor.

<div class="choices">

**A.** Stays, `cat`

**B.** Clears, `cat`

**C.** Clears, `at`

**D.** Stays, `at`

</div>

---

## Answer: Typing a Shortcut

**B.** The `c` bubbles up from the box to `document`, which clears the drawing. Nothing stopped the default action, so the box still gets its `c`. A listener can skip keys typed in a box:

```js
if (event.target.nodeName === "INPUT") {
  return;
}
```

[`nodeName`](../13-js-forms-dom/lecture.html#34) is the tag in capitals, and [`return`](../08-js-intro/lecture.html#98) ends the listener before the shortcuts.

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

These go on `window`, except `DOMContentLoaded`, which goes on `document`. A script in `<head>` can wait for it, since [it runs before the body exists](../13-js-forms-dom/lecture.html#33).

---

## `resize`

```js
window.addEventListener("resize", () => {
  const size = `${window.innerWidth} × ${window.innerHeight}`;
  document.getElementById("message").textContent = size;
});
```

`innerWidth` and `innerHeight` are the window's size in pixels. Dragging the window's edge fires `resize` many times, once for each step.

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

These are the events behind [`oninput` and `onchange`](../13-js-forms-dom/lecture.html#45). `focus` and `blur` don't bubble.

---

## `focus` and `blur`

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
const title = document.getElementById("title");

title.addEventListener("focus", () => {
  document.getElementById("message").textContent = "Name your drawing";
});

title.addEventListener("blur", () => {
  title.value = title.value.trim();
});
```

`focus` fires when we click or Tab into a box, and `blur` when we leave it, a good time to tidy what was typed.

---

## `submit`

```js
document.getElementById("tools").addEventListener("submit", (event) => {
  event.preventDefault();
  document.getElementById("message").textContent = "Saved";
});
```

A form fires `submit` when it's sent, by its submit button or by Enter in a text box, so listen on the form. `preventDefault()` stops [the reload](../13-js-forms-dom/lecture.html#23).

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

# Building Sketchy

---

## Setting Up the Starter

Today's page is [Sketchy](https://bi3mer.github.io/lectures/cs213/lectures/15-js-events/examples/sketch-final/), a drawing pad. Its starter has three files on GitHub: [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/15-js-events/examples/sketch-starter/index.html), [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/15-js-events/examples/sketch-starter/practice.js), and [draw.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/15-js-events/examples/sketch-starter/draw.js). Set them up in WebStorm, in a new folder:

1. Open each file, and click **Copy raw file**, the copy icon above the code.
2. Paste each one into a new file in WebStorm with the same name.

Nothing in `index.html` calls our code, so every listener goes in `practice.js`. `draw.js` draws on the canvas, ready-made.

---

## Problem (Us): Brush Size

The brush, the circle in the middle of the canvas, should take the brush's size and color. Let's fill in `showBrush()`, in the Brush Size section.

1. Put the size slider's value in `size-value`, in pixels, like `12px`.
2. Set the brush's `style.width` and `style.height` to that size, and its `style.backgroundColor` to the **Color** picker's value. The brush's id is `brush`.
3. Under `showBrush();`, have the size slider and the **Color** picker call `showBrush` on each `input`.
4. Why does `showBrush` have no `()` there?

---

## Solution (Us): Brush Size

<style scoped>
pre { font-size: 0.7em; }
</style>

```js
function showBrush() {
  const size = document.getElementById("size").value;
  const color = document.getElementById("color").value;

  document.getElementById("size-value").textContent = `${size}px`;
  document.getElementById("brush").style.width = `${size}px`;
  document.getElementById("brush").style.height = `${size}px`;
  document.getElementById("brush").style.backgroundColor = color;
}

showBrush();
document.getElementById("size").addEventListener("input", showBrush);
document.getElementById("color").addEventListener("input", showBrush);
```

The browser calls `showBrush` on each `input`. [With `()`](#5), it would run once, now.

---

## Problem (Us): Draw

Holding the mouse button down and dragging should draw. Let's fill in the Draw section.

1. `startDrawing`: set `drawing` to `true`, and `lastX` and `lastY` to [where the mouse is](#15) on the canvas.
2. `keepDrawing`: while `drawing`, call `drawLine(lastX, lastY, x, y)`, from `draw.js`, to where the mouse is now. Then move `lastX` and `lastY` there, and set `unsaved` to `true`.
3. Under them, have `canvas` call `startDrawing` on each `mousedown`, and `keepDrawing` on each `mousemove`.

`drawLine` draws in the picked color and size.

---

## Solution (Us): Draw

<style scoped>
pre { font-size: 0.7em; }
</style>

```js
function startDrawing(event) {
  drawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
}

function keepDrawing(event) {
  if (drawing) {
    drawLine(lastX, lastY, event.offsetX, event.offsetY);
    lastX = event.offsetX;
    lastY = event.offsetY;
    unsaved = true;
  }
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", keepDrawing);
```

Each `mousemove` adds a short line, and together they make a stroke.

---

## Problem (You): Stop Drawing

Nothing stops drawing yet. Write the Stop Drawing section.

1. When the mouse button is let go over the canvas, set `drawing` to `false`.
2. Press on the canvas, drag off its edge, let go, and come back. What happens? Fix it so letting go anywhere stops drawing.

---

## Solution (You): Stop Drawing

```js
window.addEventListener("mouseup", () => {
  drawing = false;
});
```

A `mouseup` off the canvas happens on another element, so a listener on `canvas` never hears it, and `drawing` stays `true`. [Every `mouseup` bubbles up](#20) to `window`.

---

## Problem (You): Brush Preview

The brush should follow the mouse. Turn the pseudocode into code in the Brush Preview section.

```text
when the mouse moves over the canvas
  move the brush's left and top to the mouse, in pixels
when the mouse enters the canvas
  show the brush
when the mouse leaves the canvas
  hide the brush
```

The CSS centers the brush on its spot, and lets the mouse reach the canvas through it.

---

## Solution (You): Brush Preview

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
canvas.addEventListener("mousemove", (event) => {
  document.getElementById("brush").style.left = `${event.offsetX}px`;
  document.getElementById("brush").style.top = `${event.offsetY}px`;
});

canvas.addEventListener("mouseenter", () => {
  document.getElementById("brush").hidden = false;
});

canvas.addEventListener("mouseleave", () => {
  document.getElementById("brush").hidden = true;
});
```

`canvas` now has two `mousemove` listeners, and each one runs, in the order they were added.

---

## Problem (Us): Palette

Clicking a swatch should pick its color. Each swatch's `value` is its color, like `#c8371d`. Let's write the Palette section.

1. Loop over every element with the class `swatch`, found with [`querySelectorAll`](../14-js-dom/lecture.html#11).
2. On each one's `click`, set the **Color** picker to the clicked swatch's `value`.
3. Why do we have to call `showBrush()` ourselves?

---

## Solution (Us): Palette

```js
for (const swatch of document.querySelectorAll(".swatch")) {
  swatch.addEventListener("click", (event) => {
    document.getElementById("color").value = event.target.value;
    showBrush();
  });
}
```

[`event.target`](#11) is the swatch that was clicked. [Setting `value` from code fires no event](../13-js-forms-dom/lecture.html#61), so the picker's `input` listener never runs.

---

## Problem (Us): Shortcuts

Keys should work as shortcuts anywhere on the page. Let's fill in the Shortcuts section of `useShortcut`.

1. Under the function, have `document` call `useShortcut` on each `keydown`.
2. If the key is `c`, call `clearCanvas()`, from `draw.js`.
3. If the key is `1` to `5`, set the **Color** picker to that color in `colors`, and call `showBrush()`. [`includes`](../12-js-math-dates-strings/lecture.html#26) can check `"12345"`.
4. Type `cat` in the **Title** box. What happens? [Fix it](#22).

---

## Solution (Us): Shortcuts

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function useShortcut(event) {
  if (event.target.nodeName === "INPUT") {
    return;
  }

  if (event.key === "c") {
    clearCanvas();
  } else if ("12345".includes(event.key)) {
    document.getElementById("color").value = colors[Number(event.key) - 1];
    showBrush();
  }
}

document.addEventListener("keydown", useShortcut);
```

`Number("2") - 1` is index 1, the second color. The `if` that skips typed keys goes first, so they never reach a shortcut.

---

## Problem (You): Brush Keys

Turn the pseudocode into code in `useShortcut`'s Brush Keys section.

```text
set size to the size slider's value, as a number
if the key is [
  set the size slider to size minus 2
  show the brush
else if the key is ]
  set the size slider to size plus 2
  show the brush
```

Hold `[` down. Where does the brush stop?

---

## Solution (You): Brush Keys

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
const size = Number(document.getElementById("size").value);

if (event.key === "[") {
  document.getElementById("size").value = size - 2;
  showBrush();
} else if (event.key === "]") {
  document.getElementById("size").value = size + 2;
  showBrush();
}
```

[Holding `[` repeats `keydown`](#17), and a slider keeps its value between its `min` and `max`, so the brush stops at 2. Without `Number()`, `size + 2` [glues `"122"`](../13-js-forms-dom/lecture.html#43), and the slider jumps to 40.

---

## Problem (Us): Fit the Window

1. Make the browser window narrower, then draw. Where does the line land? Why?
2. `fitCanvas()`, from `draw.js`, gives the canvas as many pixels as the page shows it with, and draws every line again. In the Fit the Window section, have `window` call it on each `resize`.

---

## Solution (Us): Fit the Window

```js
window.addEventListener("resize", fitCanvas);
```

The canvas kept the pixels it had at load, and the browser shrank them to fit the page, so each line landed toward the corner. Now each `resize` fits the canvas again.

---

## Problem (You): Unsaved Drawing

Turn the pseudocode into code in the Unsaved Drawing section.

```text
when the page is about to close or reload
  if unsaved is true
    make the browser ask first
```

[`preventDefault`](#25) can make the browser ask. Draw something, then reload to test it.

---

## Solution (You): Unsaved Drawing

```js
window.addEventListener("beforeunload", (event) => {
  if (unsaved) {
    event.preventDefault();
  }
});
```

`keepDrawing` sets `unsaved` to `true`, and the next problem's **Save** sets it back to `false`, so a saved drawing closes without asking.

---

## Problem (Us): Save

**Save** is the form's submit button. Let's write the Save section.

1. Listen for the `submit` of the form whose id is `tools`.
2. [Stop the reload](#28), and save the drawing as `fileName()`. `saveDrawing(name)`, from `draw.js`, downloads it.
3. Put `Saved golden-hour.png` in `message`, and set `unsaved` to `false`.
4. Press Enter in the **Title** box. What happens?

`fileName()` turns a title like Golden hour into `golden-hour.png`, the way [Export named the photo](../13-js-forms-dom/lecture.html#59).

---

## Solution (Us): Save

```js
document.getElementById("tools").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = fileName();
  saveDrawing(name);
  document.getElementById("message").textContent = `Saved ${name}`;
  unsaved = false;
});
```

Enter in **Title** sends the form too, so it saves the drawing. Without `preventDefault()`, the page would reload, and the drawing would be gone.

---

## Problem (You): Title Hint

Turn the pseudocode into code in the Title Hint section.

```text
when the title box gets focus
  show the hint
when the title box loses focus
  hide the hint
```

The hint, whose id is `hint`, says shortcuts are off while we type.

---

## Solution (You): Title Hint

```js
document.getElementById("title").addEventListener("focus", () => {
  document.getElementById("hint").hidden = false;
});

document.getElementById("title").addEventListener("blur", () => {
  document.getElementById("hint").hidden = true;
});
```

[`hidden`](../13-js-forms-dom/lecture.html#40) shows and hides the hint, as it did the brush.

---

## Problem (You): Parsons 1

<!-- prettier-ignore -->
```js
canvas.addEventListener("mousemove", parsons1());
const y = Math.round(event.offsetY);
}
canvas.addEventListener("mousemove", parsons1);
function parsons1(event) {
document.getElementById("where").textContent = `${x}, ${y}`;
canvas.addEventListener("onmousemove", parsons1);
const x = Math.round(event.offsetX);
```

- Assemble the program in the Parsons 1 section of `practice.js`. Two of the lines are wrong.
- What does `parsons1` do? What should it be named?

---

## Solution (You): Parsons 1

```js
function parsons1(event) {
  const x = Math.round(event.offsetX);
  const y = Math.round(event.offsetY);
  document.getElementById("where").textContent = `${x}, ${y}`;
}

canvas.addEventListener("mousemove", parsons1);
```

It shows where the mouse is on the canvas, like `120, 48`, so `showPosition` would be a better name. `"onmousemove"` names no event, and `parsons1()` passes `undefined`.

---

## Problem (You): Extras

Done early? Pick any of these. Their solutions come after **Questions?**.

- **Eraser.** `e` should set the **Color** picker to white, and the next `e` should set it back to the color before.
- **Wheel size.** Scrolling over the canvas should change the brush size, without scrolling the page.
- **Touch.** Drawing should work with a finger or a pen too.

---

# Conclusion

---

## The Finished Page

Every solution from today, together:

- [Sketchy](https://bi3mer.github.io/lectures/cs213/lectures/15-js-events/examples/sketch-final/), running live
- [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/15-js-events/examples/sketch-final/index.html), [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/15-js-events/examples/sketch-final/practice.js), and [draw.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/15-js-events/examples/sketch-final/draw.js) on GitHub, with every section filled in

`index.html` and `draw.js` are the same as the starter's. The extras aren't in it.

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

# Questions?

---

## Extras: Eraser

<style scoped>
pre { font-size: 0.75em; }
</style>

At the top of `practice.js`, add `let inkColor = colors[0];`. Then, in `useShortcut`:

```js
if (event.key === "e") {
  const color = document.getElementById("color");

  if (color.value === "#ffffff") {
    color.value = inkColor;
  } else {
    inkColor = color.value;
    color.value = "#ffffff";
  }

  showBrush();
}
```

The canvas is white, so drawing in white erases.

---

## Extras: Wheel Size

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  const size = Number(document.getElementById("size").value);

  if (event.deltaY < 0) {
    document.getElementById("size").value = size + 2;
  } else {
    document.getElementById("size").value = size - 2;
  }

  showBrush();
});
```

`deltaY` is below 0 when the wheel scrolls up. `preventDefault()` keeps the page from scrolling while the mouse is over the canvas.

---

## Extras: Touch

<center>

| Mouse event  | Pointer event  |
| ------------ | -------------- |
| `mousedown`  | `pointerdown`  |
| `mousemove`  | `pointermove`  |
| `mouseup`    | `pointerup`    |
| `mouseenter` | `pointerenter` |
| `mouseleave` | `pointerleave` |

</center>

**Pointer events** come from a mouse, a pen, or a finger, with the same `offsetX` and `offsetY`. Swap each mouse event for its pointer event, and add `touch-action: none;` to `#canvas`, so a finger draws instead of scrolling the page.
