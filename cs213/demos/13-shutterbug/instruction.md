# Build Shutterbug

You will build a photo editor, using HTML forms and the DOM. `photo.js` is ready-made: it handles upload and export. The first steps add the form to `index.html`, and the later steps make it work in `practice.js`.

See the [finished page](final/) to know where you are headed, and the [lecture](../../lectures/13-js-forms-dom/lecture.html) if a step uses something you want to review.

## Setup

1. Open the [starter files on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/13-shutterbug/starter): `index.html`, `practice.js`, `photo.js`, and the photo, `lake.svg`.
2. Make a new folder in WebStorm. For each file, click **Copy raw file**, the copy icon above the code, and paste it into a new file with the same name.
3. Open `index.html` in the browser, and reload the page after each step.

`practice.js` has a banner comment for each section below. Commented-out page lines in a section are there for you to use: uncomment them where your code needs them.

## Step 1: Text Controls

Paste this under the Text comment in `index.html`:

```html
<div>
  <label for="text">Text</label>
  <textarea id="text" name="text" placeholder="Optional" oninput="showText()"></textarea>
  <span id="chars-left"></span>
</div>
<div>
  <label for="color">Text color</label>
  <input id="color" name="color" type="color" value="#ffffff" oninput="showText()" />
</div>
```

## Step 2: Credit

Paste this under the Credit comment. Each `for` must match its control's `id`.

```html
<div>
  <label for="credit">Credit</label>
  <input id="credit" name="credit" oninput="showText()" />
</div>
<div>
  <input id="show-credit" name="show-credit" type="checkbox" onchange="showText()" />
  <label for="show-credit">Show credit on the photo</label>
</div>
```

## Step 3: Position

Paste this under the Position comment. Radio buttons with the same `name` form one group, so only one can be picked.

```html
<fieldset>
  <legend>Position</legend>
  <input id="top" name="position" type="radio" value="top" onchange="showText()" checked />
  <label for="top">Top</label>
  <input id="bottom" name="position" type="radio" value="bottom" onchange="showText()" />
  <label for="bottom">Bottom</label>
</fieldset>
```

## Step 4: Font

Paste this under the Font comment.

```html
<div>
  <label for="font">Font</label>
  <select id="font" name="font" onchange="showText()">
    <option value="impact">Impact</option>
    <option value="georgia">Georgia</option>
    <option value="comic">Comic Sans</option>
  </select>
</div>
```

## Step 5: Adjust Sliders

Paste this under the Adjust comment:

```html
<fieldset>
  <legend>Adjust</legend>
  <div>
    <label for="brightness">Brightness</label>
    <input id="brightness" name="brightness" type="range" min="0" max="200" value="100" oninput="showAdjust()" />
    <span id="brightness-value"></span>
  </div>
  <div>
    <label for="contrast">Contrast</label>
    <input id="contrast" name="contrast" type="range" min="0" max="200" value="100" oninput="showAdjust()" />
    <span id="contrast-value"></span>
  </div>
  <div>
    <label for="saturation">Saturation</label>
    <input id="saturation" name="saturation" type="range" min="0" max="200" value="100" oninput="showAdjust()" />
    <span id="saturation-value"></span>
  </div>
</fieldset>
```

Then paste these just before its `</fieldset>`:

```html
<div>
  <label for="hue">Hue</label>
  <input id="hue" name="hue" type="color" value="#3399ff" oninput="showAdjust()" />
</div>
<div>
  <label for="strength">Hue strength</label>
  <input id="strength" name="strength" type="range" min="0" max="1" step="0.01" value="0" oninput="showAdjust()" />
  <span id="strength-value"></span>
</div>
<div>
  <label for="size">Text size</label>
  <input id="size" name="size" type="range" min="16" max="48" value="32" oninput="showAdjust()" />
  <span id="size-value"></span>
</div>
```

## Step 6: Export Button

Paste this under the Export Button comment. A button in a form submits the form unless you say otherwise, which reloads the page, so this one needs `type="button"`.

```html
<div>
  <button id="export" type="button" onclick="exportPhoto()">Export</button>
  <span id="message"></span>
</div>
```

## Step 7: Text on the Photo

In `showText()`, put the trimmed text at the top or the bottom. `textContent` keeps anything typed as plain text.

```js
const text = document.getElementById("text").value.trim();

if (document.getElementById("top").checked) {
  document.getElementById("top-text").textContent = text;
  document.getElementById("bottom-text").textContent = "";
} else {
  document.getElementById("top-text").textContent = "";
  document.getElementById("bottom-text").textContent = text;
}
```

## Step 8: Font and Color

`fonts` has a CSS font for each option value. The text inside `preview` takes its font and color.

```js
const font = fonts[document.getElementById("font").value];
const color = document.getElementById("color").value;
document.getElementById("preview").style.fontFamily = font;
document.getElementById("preview").style.color = color;
```

## Step 9: Credit on the Photo

Show the credit, or `📷 Shutterbug` when the box is empty, while **Show credit** is ticked.

```js
const credit = document.getElementById("credit").value.trim();
const showCredit = document.getElementById("show-credit").checked;

if (credit === "") {
  document.getElementById("photo-credit").textContent = "📷 Shutterbug";
} else {
  document.getElementById("photo-credit").textContent = `📷 ${credit}`;
}

document.getElementById("photo-credit").hidden = !showCredit;
```

## Step 10: Text Limit

`limit` is set at the top of `practice.js`. Show how many characters are left, and turn off **Export** past the limit.

```js
const left = limit - text.length;
document.getElementById("chars-left").textContent = `${left} characters left`;

if (left < 0) {
  document.getElementById("chars-left").style.color = "tomato";
  document.getElementById("export").disabled = true;
} else {
  document.getElementById("chars-left").style.color = "";
  document.getElementById("export").disabled = false;
}
```

## Step 11: Adjust

In `showAdjust()`, read each control, and set the photo's filter, its tint, and the text size.

```js
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
```

Drag **Brightness**: the photo should change.

## Step 12: Slider Values

Put each value in the empty `<span>` after its slider.

```js
document.getElementById("brightness-value").textContent = `${brightness}%`;
document.getElementById("contrast-value").textContent = `${contrast}%`;
document.getElementById("saturation-value").textContent = `${saturation}%`;
document.getElementById("strength-value").textContent = strength;
document.getElementById("size-value").textContent = `${size}px`;
```

## Step 13: Export

Name the file after the text, and save it with `savePhoto`, from `photo.js`.

```js
function exportPhoto() {
  const text = document.getElementById("text").value.trim();
  let name = "shutterbug";

  if (text !== "") {
    name = text.toLowerCase().replaceAll(" ", "-");
  }

  savePhoto(`${name}.png`);
  document.getElementById("message").textContent = `Exported ${name}.png`;
}
```

## Step 14: Random Look

The 🎲 button picks a random entry from `looks` and sets the sliders. Setting `value` from code does not fire `oninput`, so call `showAdjust()` yourself.

```js
function pickRandomLook() {
  const look = looks[Math.floor(Math.random() * looks.length)];

  document.getElementById("brightness").value = look.brightness;
  document.getElementById("contrast").value = look.contrast;
  document.getElementById("saturation").value = look.saturation;
  showAdjust();
}
```

## Compare

Your page should now match the [finished page](final/). If something differs, compare your files with the [final code on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/13-shutterbug/final).
