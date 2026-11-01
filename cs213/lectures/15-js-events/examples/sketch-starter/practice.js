// the palette's colors, in the order the keys 1 to 5 pick them
const colors = ["#1d1d1d", "#c8371d", "#f99d1b", "#3a8f5f", "#2b6cb0"];

const canvas = document.getElementById("canvas");

let drawing = false; // whether the mouse button is down, drawing
let lastX = 0; // where the last line ended, in pixels from the canvas's top-left corner
let lastY = 0;
let unsaved = false; // whether anything was drawn since the last save

// the title as a file name, in lowercase with a dash for each space: Golden hour becomes
// golden-hour.png, and an empty title becomes sketchy.png
function fileName() {
  const title = document.getElementById("title").value.trim();

  if (title === "") {
    return "sketchy.png";
  }

  return `${title.toLowerCase().replaceAll(" ", "-")}.png`;
}

// -------------------------------- Brush Size ---------------------------------
function showBrush() {
  // the size beside the slider, like 12px, and the brush's size and color
}

showBrush();

// ----------------------------------- Draw ------------------------------------
function startDrawing(event) {
  // drawing starts where the mouse is
}

function keepDrawing(event) {
  // while drawing, a line from where the last one ended to where the mouse is
}

// ------------------------------- Stop Drawing --------------------------------
// letting go of the mouse button stops drawing, even off the canvas

// ------------------------------- Brush Preview -------------------------------
// the brush follows the mouse, and shows only while the mouse is over the canvas

// ---------------------------------- Palette ----------------------------------
// clicking a swatch picks its color

// --------------------------------- Keyboard ----------------------------------
function useShortcut(event) {
  // -------------------------------- Shortcuts --------------------------------
  // c clears the canvas, and 1 to 5 pick a color, unless the key was typed in a box
  // ------------------------------- Brush Keys --------------------------------
  // [ makes the brush smaller, and ] makes it bigger
}

// ------------------------------ Fit the Window -------------------------------
// the canvas fits the page again each time the window changes size

// ------------------------------ Unsaved Drawing ------------------------------
// the browser asks before leaving a drawing that isn't saved

// ----------------------------------- Save ------------------------------------
// Save downloads the drawing, without reloading the page

// -------------------------------- Title Hint ---------------------------------
// the hint shows only while the Title box has focus

// --------------------------------- Parsons 1 ---------------------------------
