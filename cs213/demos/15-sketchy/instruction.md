# Build Sketchy

You will build a drawing pad, using events. `draw.js` is ready-made: it gives you `drawLine`, `clearCanvas`, `fitCanvas`, and `saveDrawing`.

See the [finished page](final/) to know where you are headed, and the [lecture](../../lectures/15-js-events/lecture.html) if a step uses something you want to review.

## Setup

1. Open the [starter files on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/15-sketchy/starter): `index.html`, `practice.js`, and `draw.js`.
2. Make a new folder in WebStorm. For each file, click **Copy raw file**, the copy icon above the code, and paste it into a new file with the same name.
3. Open `index.html` in the browser, and reload the page after each step.

`practice.js` has a banner comment for each section below. Commented-out page lines in a section are there for you to use: uncomment them where your code needs them.

## Step 1: Brush Size

Fill in `showBrush()`, then have the size slider and the **Color** picker call it on each `input`. `showBrush` has no `()` in the listener, because we pass the function and let the browser call it. The section should end up like this:

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

## Step 2: Draw

Drawing starts on `mousedown`, and each `mousemove` draws a line from the last spot to the mouse.

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

## Step 3: Stop Drawing

Listen on `window`, so letting go anywhere stops drawing, even off the canvas.

```js
window.addEventListener("mouseup", () => {
  drawing = false;
});
```

## Step 4: Brush Preview

The brush follows the mouse, and shows only while the mouse is over the canvas.

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

## Step 5: Palette

Clicking a swatch picks its color. Setting `value` from code does not fire `input`, so call `showBrush()` yourself.

```js
for (let swatch of document.querySelectorAll(".swatch")) {
  swatch.addEventListener("click", (event) => {
    document.getElementById("color").value = event.target.value;
    showBrush();
  });
}
```

## Step 6: Shortcuts

Inside `useShortcut`, `c` clears the canvas and `1` to `5` pick a color. Skip keys typed in a box, or typing `cat` in **Title** clears the drawing.

```js
if (event.target.nodeName === "INPUT") {
  return;
}

if (event.key === "c") {
  clearCanvas();
} else if ("12345".includes(event.key)) {
  document.getElementById("color").value = colors[Number(event.key) - 1];
  showBrush();
}
```

## Step 7: Brush Keys

Also inside `useShortcut`, `[` makes the brush smaller and `]` makes it bigger.

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

Under the function, have `document` call it on each `keydown`:

```js
document.addEventListener("keydown", useShortcut);
```

## Step 8: Fit the Window

`fitCanvas()` makes the canvas match the page again after the window changes size.

```js
window.addEventListener("resize", fitCanvas);
```

## Step 9: Unsaved Drawing

`preventDefault()` on `beforeunload` makes the browser ask before leaving. Draw something, then reload to test it.

```js
window.addEventListener("beforeunload", (event) => {
  if (unsaved) {
    event.preventDefault();
  }
});
```

## Step 10: Save

**Save** is the form's submit button. Stop the reload, then download the drawing.

```js
document.getElementById("tools").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = fileName();
  saveDrawing(name);
  document.getElementById("message").textContent = `Saved ${name}`;
  unsaved = false;
});
```

## Step 11: Title Hint

The hint shows only while the **Title** box has focus.

```js
document.getElementById("title").addEventListener("focus", () => {
  document.getElementById("hint").hidden = false;
});

document.getElementById("title").addEventListener("blur", () => {
  document.getElementById("hint").hidden = true;
});
```

## Step 12: Mouse Position

Show where the mouse is on the canvas.

```js
function showPosition(event) {
  const x = Math.round(event.offsetX);
  const y = Math.round(event.offsetY);
  document.getElementById("where").textContent = `${x}, ${y}`;
}

canvas.addEventListener("mousemove", showPosition);
```

## Compare

Your page should now match the [finished page](final/). If something differs, compare your files with the [final code on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/15-sketchy/final).

## Extras

Pick any of these once the page works.

### Eraser

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

### Wheel Size

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

### Touch

| Mouse event  | Pointer event  |
| ------------ | -------------- |
| `mousedown`  | `pointerdown`  |
| `mousemove`  | `pointermove`  |
| `mouseup`    | `pointerup`    |
| `mouseenter` | `pointerenter` |
| `mouseleave` | `pointerleave` |

**Pointer events** come from a mouse, a pen, or a finger, with the same `offsetX` and `offsetY`. Swap each mouse event for its pointer event, and add `touch-action: none;` to `#canvas`, so a finger draws instead of scrolling the page.
