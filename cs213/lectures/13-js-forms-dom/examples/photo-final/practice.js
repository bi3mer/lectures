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
  const text = document.getElementById("text").value.trim();

  if (document.getElementById("top").checked) {
    document.getElementById("top-text").textContent = text;
    document.getElementById("bottom-text").textContent = "";
  } else {
    document.getElementById("top-text").textContent = "";
    document.getElementById("bottom-text").textContent = text;
  }

  // ----------------------------- Font and Color ------------------------------
  const font = fonts[document.getElementById("font").value];
  const color = document.getElementById("color").value;
  document.getElementById("preview").style.fontFamily = font;
  document.getElementById("preview").style.color = color;

  // --------------------------- Credit on the Photo ---------------------------
  const credit = document.getElementById("credit").value.trim();
  const showCredit = document.getElementById("show-credit").checked;

  if (credit === "") {
    document.getElementById("photo-credit").textContent = "📷 Shutterbug";
  } else {
    document.getElementById("photo-credit").textContent = `📷 ${credit}`;
  }

  document.getElementById("photo-credit").hidden = !showCredit;

  // ------------------------------- Text Limit --------------------------------
  const left = limit - text.length;
  document.getElementById("chars-left").textContent = `${left} characters left`;

  if (left < 0) {
    document.getElementById("chars-left").style.color = "tomato";
    document.getElementById("export").disabled = true;
  } else {
    document.getElementById("chars-left").style.color = "";
    document.getElementById("export").disabled = false;
  }
}

showText();

// ------------------------------ Adjust Preview -------------------------------
function showAdjust() {
  // --------------------------------- Adjust ----------------------------------
  const brightness = document.getElementById("brightness").value;
  const contrast = document.getElementById("contrast").value;
  const saturation = document.getElementById("saturation").value;
  const hue = document.getElementById("hue").value;
  const strength = document.getElementById("strength").value;
  const size = Number(document.getElementById("size").value);

  document.getElementById("photo").style.filter =
    `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
  document.getElementById("tint").style.backgroundColor = hue;
  document.getElementById("tint").style.opacity = strength;
  document.getElementById("preview").style.fontSize = `${size}px`;
  document.getElementById("preview").style.lineHeight = `${size + 4}px`;

  // ------------------------------ Slider Values ------------------------------
  document.getElementById("brightness-value").textContent = `${brightness}%`;
  document.getElementById("contrast-value").textContent = `${contrast}%`;
  document.getElementById("saturation-value").textContent = `${saturation}%`;
  document.getElementById("strength-value").textContent = strength;
  document.getElementById("size-value").textContent = `${size}px`;
}

showAdjust();

// ---------------------------------- Export -----------------------------------
function exportPhoto() {
  const text = document.getElementById("text").value.trim();
  let name = "shutterbug";

  if (text !== "") {
    name = text.toLowerCase().replaceAll(" ", "-");
  }

  savePhoto(`${name}.png`);
  document.getElementById("message").textContent = `Exported ${name}.png`;
}

// --------------------------------- Parsons 1 ---------------------------------
function parsons1() {
  const look = looks[Math.floor(Math.random() * looks.length)];

  document.getElementById("brightness").value = look.brightness;
  document.getElementById("contrast").value = look.contrast;
  document.getElementById("saturation").value = look.saturation;
  showAdjust();
}
