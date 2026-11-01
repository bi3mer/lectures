// Ready-made drawing code. practice.js calls drawLine, clearCanvas, fitCanvas, and saveDrawing.

// every line drawn so far, measured in canvas widths, so the drawing can be drawn at any size
let lines = [];

// the canvas's size on the page, in pixels, when fitCanvas last sized it
let fittedWidth = 0;
let fittedHeight = 0;

// draws a line from one spot to another, in pixels from the canvas's top-left corner, in the
// picked color and size
function drawLine(fromX, fromY, toX, toY) {
  const line = {
    fromX: fromX / fittedWidth,
    fromY: fromY / fittedWidth,
    toX: toX / fittedWidth,
    toY: toY / fittedWidth,
    color: document.getElementById("color").value,
    size: Number(document.getElementById("size").value) / fittedWidth,
  };

  lines.push(line);
  strokeLine(document.getElementById("canvas").getContext("2d"), line, fittedWidth);
}

// takes every line off the canvas
function clearCanvas() {
  lines = [];
  paint(document.getElementById("canvas").getContext("2d"), fittedWidth, fittedHeight);
}

// gives the canvas as many pixels as the page shows it with, then draws every line again.
// Until it runs again, the canvas keeps those pixels, even when the page shows it smaller.
function fitCanvas() {
  const canvas = document.getElementById("canvas");
  const scale = window.devicePixelRatio;

  fittedWidth = canvas.clientWidth;
  fittedHeight = canvas.clientHeight;
  canvas.width = Math.round(fittedWidth * scale);
  canvas.height = Math.round(fittedHeight * scale);

  // a screen with more than one pixel per CSS pixel gets them all, so lines stay sharp
  const context = canvas.getContext("2d");
  context.setTransform(scale, 0, 0, scale, 0, 0);
  paint(context, fittedWidth, fittedHeight);
}

// downloads the drawing as a PNG 1200 pixels wide named name, like golden-hour.png
function saveDrawing(name) {
  const picture = document.createElement("canvas");
  picture.width = 1200;
  picture.height = Math.round((1200 * fittedHeight) / fittedWidth);
  paint(picture.getContext("2d"), picture.width, picture.height);

  const link = document.createElement("a");
  link.download = name;
  link.href = picture.toDataURL("image/png");
  link.click();
}

// fills a canvas with white, then draws every line on it, for a canvas width pixels wide
function paint(context, width, height) {
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);

  for (const line of lines) {
    strokeLine(context, line, width);
  }
}

// draws one line, with round ends, for a canvas width pixels wide
function strokeLine(context, line, width) {
  context.strokeStyle = line.color;
  context.lineWidth = line.size * width;
  context.lineCap = "round";
  context.beginPath();
  context.moveTo(line.fromX * width, line.fromY * width);
  context.lineTo(line.toX * width, line.toY * width);
  context.stroke();
}

fitCanvas();
