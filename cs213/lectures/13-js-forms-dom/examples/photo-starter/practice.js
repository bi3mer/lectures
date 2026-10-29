const limit = 40; // the most characters that fit on the photo

const fonts = {
  impact: "Impact, sans-serif",
  georgia: "Georgia, serif",
  comic: '"Comic Sans MS", cursive',
};

const looks = [
  { brightness: 110, contrast: 120, saturation: 170 }, // vivid
  { brightness: 105, contrast: 140, saturation: 0 }, // black and white
  { brightness: 120, contrast: 80, saturation: 60 }, // faded
  { brightness: 85, contrast: 130, saturation: 120 }, // moody
];

// ------------------------------- Text Preview --------------------------------
function showText() {
  // ---------------------------- Text on the Photo ----------------------------
  // the text, without spaces at either end, at the top or the bottom of the photo
  // ----------------------------- Font and Color ------------------------------
  // the picked font, like Georgia, serif, and the picked text color
  // --------------------------- Credit on the Photo ---------------------------
  // 📷 and the credit, or 📷 Shutterbug when it's empty, shown when Show credit is ticked
  // ------------------------------- Text Limit --------------------------------
  // how many characters are left, in tomato with no exporting when it's below 0
}

showText();

// ------------------------------ Adjust Preview -------------------------------
function showAdjust() {
  // --------------------------------- Adjust ----------------------------------
  // the photo's filter from three sliders, its tint from Hue, and the text size
  // ------------------------------ Slider Values ------------------------------
  // each slider's value in the span after it, like 120%, 0.4, or 32px
}

showAdjust();

// ---------------------------------- Export -----------------------------------
function exportPhoto() {
  // a file name from the text, like golden-hour.png, for savePhoto, and a message
}

// --------------------------------- Parsons 1 ---------------------------------
