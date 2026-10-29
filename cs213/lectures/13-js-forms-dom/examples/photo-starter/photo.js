// Ready-made photo code. The Photo box calls showPhoto(), and practice.js calls savePhoto().

// shows the photo picked in the Photo box, or the lake when none is picked
function showPhoto() {
  const file = document.getElementById("upload").files[0];

  if (file === undefined) {
    document.getElementById("photo").src = "lake.svg";
    document.getElementById("photo").alt = "A lake at sunset, with mountains behind it";
  } else {
    document.getElementById("photo").src = URL.createObjectURL(file);
    document.getElementById("photo").alt = "Your photo";
  }
}

// downloads the preview as a 1080 by 1080 PNG named name: the photo with its filter and tint,
// and each piece of text where the preview shows it
function savePhoto(name) {
  const size = 1080;
  const photo = document.getElementById("photo");
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = size;
  canvas.height = size;

  // the middle square of the photo, which is the part the preview shows
  const side = Math.min(photo.naturalWidth, photo.naturalHeight);
  const left = (photo.naturalWidth - side) / 2;
  const top = (photo.naturalHeight - side) / 2;
  context.filter = getComputedStyle(photo).filter;
  context.drawImage(photo, left, top, side, side, 0, 0, size, size);
  context.filter = "none";

  // the tint over the photo, blended in as the photo's hue, the way the preview blends it
  const tint = getComputedStyle(document.getElementById("tint"));
  context.globalAlpha = Number(tint.opacity);
  context.globalCompositeOperation = tint.mixBlendMode;
  context.fillStyle = tint.backgroundColor;
  context.fillRect(0, 0, size, size);
  context.globalAlpha = 1;
  context.globalCompositeOperation = "source-over";

  const scale = size / photo.clientWidth;
  for (const id of ["top-text", "bottom-text", "photo-credit"]) {
    drawText(context, document.getElementById(id), scale);
  }

  const link = document.createElement("a");
  link.download = name;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// draws an element's text on the canvas, in the lines, font, and spot the preview shows it in
function drawText(context, element, scale) {
  if (element.hidden || element.textContent === "") {
    return;
  }

  const style = getComputedStyle(element);
  const photoBox = document.getElementById("photo").getBoundingClientRect();
  const box = element.getBoundingClientRect();
  const fontSize = parseFloat(style.fontSize) * scale;
  const lineHeight = (parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2) * scale;
  const padding = parseFloat(style.paddingLeft) * scale;
  const width = box.width * scale - 2 * padding;

  context.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`;
  context.fillStyle = style.color;
  context.textBaseline = "middle";

  // a soft shadow, like the credit's, keeps light text readable on a light photo
  context.shadowColor = "black";
  context.shadowBlur = 0;
  if (style.textShadow !== "none") {
    context.shadowBlur = 3 * scale;
  }

  // centered text is drawn from the middle of its box, and other text from the left
  let x = (box.left - photoBox.left) * scale + padding;
  context.textAlign = "left";
  if (style.textAlign === "center") {
    x = (box.left - photoBox.left + box.width / 2) * scale;
    context.textAlign = "center";
  }

  // breaks the words into lines that fit in the box, as the browser does, unless the preview
  // keeps the text on one line
  let words = element.textContent.split(/\s+/);
  if (style.whiteSpace === "nowrap") {
    words = [element.textContent];
  }

  const lines = [];
  let line = "";
  for (const word of words) {
    const longer = line === "" ? word : `${line} ${word}`;
    if (line !== "" && context.measureText(longer).width > width + scale) {
      lines.push(line);
      line = word;
    } else {
      line = longer;
    }
  }
  lines.push(line);

  let y = (box.top - photoBox.top) * scale + parseFloat(style.paddingTop) * scale;
  for (const text of lines) {
    context.fillText(text, x, y + lineHeight / 2);
    y += lineHeight;
  }
}
