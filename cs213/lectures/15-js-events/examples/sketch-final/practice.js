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

// ----------------------------------- Draw ------------------------------------
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

// ------------------------------- Stop Drawing --------------------------------
window.addEventListener("mouseup", () => {
  drawing = false;
});

// ------------------------------- Brush Preview -------------------------------
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

// ---------------------------------- Palette ----------------------------------
for (let swatch of document.querySelectorAll(".swatch")) {
  swatch.addEventListener("click", (event) => {
    document.getElementById("color").value = event.target.value;
    showBrush();
  });
}

// --------------------------------- Keyboard ----------------------------------
function useShortcut(event) {
  // -------------------------------- Shortcuts --------------------------------
  if (event.target.nodeName === "INPUT") {
    return;
  }

  if (event.key === "c") {
    clearCanvas();
  } else if ("12345".includes(event.key)) {
    document.getElementById("color").value = colors[Number(event.key) - 1];
    showBrush();
  }

  // ------------------------------- Brush Keys --------------------------------
  const size = Number(document.getElementById("size").value);

  if (event.key === "[") {
    document.getElementById("size").value = size - 2;
    showBrush();
  } else if (event.key === "]") {
    document.getElementById("size").value = size + 2;
    showBrush();
  }
}

document.addEventListener("keydown", useShortcut);

// ------------------------------ Fit the Window -------------------------------
window.addEventListener("resize", fitCanvas);

// ------------------------------ Unsaved Drawing ------------------------------
window.addEventListener("beforeunload", (event) => {
  if (unsaved) {
    event.preventDefault();
  }
});

// ----------------------------------- Save ------------------------------------
document.getElementById("tools").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = fileName();
  saveDrawing(name);
  document.getElementById("message").textContent = `Saved ${name}`;
  unsaved = false;
});

// -------------------------------- Title Hint ---------------------------------
document.getElementById("title").addEventListener("focus", () => {
  document.getElementById("hint").hidden = false;
});

document.getElementById("title").addEventListener("blur", () => {
  document.getElementById("hint").hidden = true;
});

// --------------------------------- Parsons 1 ---------------------------------
function parsons1(event) {
  const x = Math.round(event.offsetX);
  const y = Math.round(event.offsetY);
  document.getElementById("where").textContent = `${x}, ${y}`;
}

canvas.addEventListener("mousemove", parsons1);
