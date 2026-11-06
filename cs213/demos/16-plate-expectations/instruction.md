# Build Plate Expectations

You will build a shop for custom license plates, using form validation and regular expressions. The first steps add checks to `index.html`, and the later steps add JavaScript in `practice.js`.

See the [finished page](final/) to know where you are headed, and the [lecture](../../lectures/16-js-form-validation/lecture.html) if a step uses something you want to review.

## Setup

1. Open the [starter files on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/16-plate-expectations/starter): `index.html` and `practice.js`.
2. Make a new folder in WebStorm. For each file, click **Copy raw file**, the copy icon above the code, and paste it into a new file with the same name.
3. Open `index.html` in the browser, and reload the page after each step.

`practice.js` has a banner comment for each section below. Commented-out page lines in a section are there for you to use: uncomment them where your code needs them.

## Step 1: Live Plate

Typing in **Plate** or **Tagline** shows on the plate, in capitals. The box's own value changes too, because that is what the form checks.

```js
function typePlate(event) {
  event.target.value = event.target.value.toUpperCase();
  showPlate();
}

plate.addEventListener("input", typePlate);
document.getElementById("tagline").addEventListener("input", typePlate);
```

## Step 2: Attributes

Replace these boxes in `index.html`:

```html
<input
  id="plate"
  name="plate"
  placeholder="CS213"
  required
  maxlength="7"
  pattern="[A-Z0-9]{2,7}"
  title="2 to 7 letters and numbers"
/>
<input
  id="tagline"
  name="tagline"
  placeholder="ROAD TRIP"
  maxlength="20"
  pattern="[A-Z ]+"
  title="letters and spaces"
/>
<input id="name" name="name" placeholder="Ada Lovelace" required />
<input
  id="zip"
  name="zip"
  placeholder="19104"
  required
  maxlength="5"
  inputmode="numeric"
  pattern="[0-9]{5}"
  title="5 digits"
/>
<input
  id="email"
  name="email"
  placeholder="ada@school.edu"
  type="email"
  required
  pattern="[^ @]+@[^ @]+\.[^ @]+"
  title="an address like ada@school.edu"
/>
```

Each box stays in its own spot in the form. Click **Order** with every box empty: the first box should get a message.

## Step 3: Red and Green

Add this under the Red and Green comment in `index.html`'s `<style>`. `:user-invalid` waits until the box has been used, while `:invalid` would color empty boxes as soon as the page loads.

```css
input:user-invalid {
  border-color: tomato;
}

input:user-valid {
  border-color: mediumseagreen;
}
```

## Step 4: Checklist

In `showChecklist()`, tick the plate rules:

```js
const text = plate.value;
const goodLength = text.length >= 2 && text.length <= 7;
const goodChars = /^[A-Z0-9]+$/.test(text);

document.getElementById("rule-length").classList.toggle("met", goodLength);
document.getElementById("rule-chars").classList.toggle("met", goodChars);
```

Then tick the ZIP and email rules:

```js
const email = document.getElementById("email").value;
const goodZip = document.getElementById("zip").validity.valid;
const goodEmail = /^[^ @]+@[^ @]+\.[^ @]+$/.test(email);

document.getElementById("rule-zip").classList.toggle("met", goodZip);
document.getElementById("rule-email").classList.toggle("met", goodEmail);
```

Under `showChecklist();`, call it on each `input`:

```js
plate.addEventListener("input", showChecklist);
document.getElementById("zip").addEventListener("input", showChecklist);
document.getElementById("email").addEventListener("input", showChecklist);
```

## Step 5: Blank Name

A name of only spaces passes `required`, so check it in JavaScript. The `else` clears the message, or the box would fail forever.

```js
document.getElementById("name").addEventListener("input", (event) => {
  if (event.target.value.trim() === "") {
    event.target.setCustomValidity("Enter your name");
  } else {
    event.target.setCustomValidity("");
  }
});
```

## Step 6: Confirm Email

**Email again** fails unless it matches **Email**.

```js
function checkEmails() {
  const email = document.getElementById("email").value;
  const again = document.getElementById("email-again");

  if (again.value !== email) {
    again.setCustomValidity("Emails don't match");
  } else {
    again.setCustomValidity("");
  }
}

document.getElementById("email").addEventListener("input", checkEmails);
document.getElementById("email-again").addEventListener("input", checkEmails);
```

## Step 7: Error Messages

The browser shows one message at a time. Show each box's message under it when the box loses focus.

```js
for (const box of document.querySelectorAll("#order-form input")) {
  box.addEventListener("blur", (event) => {
    const error = document.getElementById(`${event.target.id}-error`);
    error.textContent = event.target.validationMessage;
  });
}
```

## Step 8: Place Order

**Order** is the form's submit button. Stop the reload, stamp the plate, and show a message. The listener runs only when every check passes.

```js
document.getElementById("order-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const zip = document.getElementById("zip").value;
  const text = `Ordered ${plate.value}, shipping to ${zip}`;

  document.getElementById("plate-preview").classList.add("ordered");
  document.getElementById("message").textContent = text;
});
```

## Step 9: Digits Only

A plate needs at least one letter.

```js
function checkDigits() {
  if (/^[0-9]+$/.test(plate.value)) {
    plate.setCustomValidity("Add at least one letter");
  } else {
    plate.setCustomValidity("");
  }
}

plate.addEventListener("input", checkDigits);
```

## Compare

Your page should now match the [finished page](final/). If something differs, compare your files with the [final code on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/16-plate-expectations/final).

## Extras

Pick any of these once the page works.

### Plate Count

```html
<label for="count">Plates</label>
<input id="count" name="count" type="number" min="1" max="5" value="1" required />
<span id="total"></span>
```

```js
function showTotal() {
  const count = Number(document.getElementById("count").value);
  document.getElementById("total").textContent = `$${count * 35}`;
}

showTotal();
document.getElementById("count").addEventListener("input", showTotal);
```

A count is an amount, so it's a `number` box. `min` and `max` stop an order of 0 or 6.

### Taken Plates

```js
const taken = ["CS213", "HELLO", "GOFAST"];

function checkDigits() {
  if (/^[0-9]+$/.test(plate.value)) {
    plate.setCustomValidity("Add at least one letter");
  } else if (taken.includes(plate.value)) {
    plate.setCustomValidity("That plate is taken");
  } else {
    plate.setCustomValidity("");
  }
}
```

Add the `else if` to `checkDigits`. A second listener that set **Plate**'s message would clear this one's with its `else`, and the other way around.

### Phone

```html
<label for="phone">Phone</label>
<input id="phone" name="phone" type="tel" placeholder="215-555-0123"
  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="like 215-555-0123" />
```

`type="tel"` shows a phone's number keys and checks nothing itself, so `pattern` does the checking. Outside brackets, `-` matches itself.
