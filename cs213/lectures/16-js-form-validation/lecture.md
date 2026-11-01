---
marp: true
theme: lecture
paginate: true
---

<style>
.caption { font-size: 20px; color: var(--secondary); }
/* The theme draws a .demo as a white panel whose 12px edge is a shadow, so the margins keep
   that edge clear of the caption above and the slide's sides. The slide's dark color-scheme
   would reach the live controls inside, so a .demo goes back to the browser's light one. */
.demo { margin: 20px 12px 28px; color-scheme: light; }
.demo input, .demo button { font: inherit; }
/* Answer choices for the Predict slides, all on one line. */
.choices { display: flex; gap: 48px; }
</style>

# Form Validation

Colan Biemer

---

## Validation

<style scoped>
table { font-size: 0.75em; }
</style>

<center>

| Box   | Typed        | What's wrong         |
| ----- | ------------ | -------------------- |
| Name  |              | nothing typed        |
| ZIP   | `1910`       | one digit short      |
| ZIP   | `l9104`      | a letter l, not a 1  |
| Email | `ada@school` | no dot after the `@` |

</center>

**Validation** is checking what was typed before the form is [submitted](../13-js-forms-dom/lecture.html#23). The browser does the checks we ask for in HTML, and our JavaScript does the rest.

---

## `required`

```html
<form>
  <label for="name">Name</label>
  <input id="name" required />
  <button>Order</button>
</form>
```

<p class="caption">Page</p>
<form class="demo" onsubmit="return false"><label for="demo-name">Name</label> <input id="demo-name" required /> <button>Order</button></form>

`required` needs no value, like [`checked`](../13-js-forms-dom/lecture.html#8). Submitting with the box empty stops the submit, and the browser shows a message by the box.

---

## Predict: Only Spaces

```html
<input id="name" required />
```

We type three spaces in **Name** and click **Order**. What happens? Vote, then convince a neighbor.

<div class="choices">

**A.** It's submitted

**B.** It asks for a name

**C.** It removes the spaces

**D.** The box won't take spaces

</div>

---

## Answer: Only Spaces

**A.** `required` only checks that the value isn't `""`, and `"   "` isn't. [`trim`](../12-js-math-dates-strings/lecture.html#24) can catch it, which we'll do in JavaScript.

---

## `minlength` and `maxlength`

```html
<input id="plate" minlength="2" maxlength="7" />
```

<p class="caption">Page</p>
<form class="demo" onsubmit="return false"><label for="demo-plate">Plate</label> <input id="demo-plate" minlength="2" maxlength="7" /> <button>Order</button></form>

`maxlength` stops typing at 7 characters, and `minlength` stops the submit under 2. An empty box passes both, unless it's also `required`. [Shutterbug counted characters itself](../13-js-forms-dom/lecture.html#59).

---

## Types That Check Themselves

```html
<input id="email" type="email" />
<input id="count" type="number" min="1" max="5" />
```

<p class="caption">Page</p>
<form class="demo" onsubmit="return false"><input type="email" size="14" /> <input type="number" min="1" max="5" value="1" /> <button>Order</button></form>

An [`email` box](../13-js-forms-dom/lecture.html#6) wants an address, and a `number` box wants a number from its `min` to its `max`.

---

## Predict: Which Emails Pass?

```text
ada@school.edu
ada@school
ada smith@school.edu
@school.edu
```

We submit each one in a `type="email"` box. Which does the browser let through? Vote, then convince a neighbor.

<div class="choices">

**A.** The first

**B.** The first two

**C.** The first three

**D.** All four

</div>

---

## Answer: Which Emails Pass?

**B.** The browser wants a name, an `@`, and a domain, and a domain can be one word with no dot, like `localhost`. A space, or nothing before the `@`, fails.

To also want a dot, we'll need a pattern of our own.

---

## When the Browser Checks

```js
document.getElementById("order-form").addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("every box passed");
});
```

On a submit, the browser checks every control. If one fails, it shows the first one's message and stops, so [`submit`](../15-js-events/lecture.html#28) never fires. `novalidate` on the `<form>` turns the checks off.

---

## `:invalid` and `:user-invalid`

```css
input:invalid {
  border-color: tomato;
}

input:user-invalid {
  border-color: tomato;
}
```

`:invalid` matches a control that fails its checks, so an empty `required` box is red as soon as the page loads. `:user-invalid` waits until we've changed the box and left it, or tried to submit. `:valid` and `:user-valid` match the ones that pass.

---

## `pattern`

```html
<input id="zip" pattern="[0-9]{5}" title="5 digits" />
```

<p class="caption">Page</p>
<form class="demo" onsubmit="return false"><label for="demo-zip">ZIP</label> <input id="demo-zip" pattern="[0-9]{5}" title="5 digits" /> <button>Order</button></form>

A **regular expression** describes which text is allowed. `pattern` checks the whole value against one: `[0-9]{5}` means five characters, each a digit. The browser can show `title` in its message, so say the rule there.

---

## Character Classes

<style scoped>
table { font-size: 0.7em; }
</style>

<center>

| Class         | One character that's        | Matches  | Doesn't |
| ------------- | --------------------------- | -------- | ------- |
| `[0-9]`       | a digit                     | `7`      | `a`     |
| `[A-Z]`       | a capital letter            | `Q`      | `q`     |
| `[a-z]`       | a lowercase letter          | `q`      | `Q`     |
| `[A-Za-z0-9]` | a letter or a digit         | `Q`, `7` | `-`     |
| `[aeiou]`     | one of the letters listed   | `e`      | `b`     |
| `[^ @]`       | anything but a space or `@` | `a`, `.` | `@`     |

</center>

Square brackets match one character from the set inside them. A `^` first inside the brackets flips the set.

---

## How Many

<style scoped>
table { font-size: 0.75em; }
</style>

<center>

| After a piece | Means     | `[0-9]` with it matches |
| ------------- | --------- | ----------------------- |
| `{5}`         | exactly 5 | `19104`                 |
| `{2,7}`       | 2 to 7    | `42`, `1234567`         |
| `+`           | 1 or more | `7`, `2026`             |
| `*`           | 0 or more | nothing, `2026`         |
| `?`           | 0 or 1    | nothing, `7`            |

</center>

A count goes after the piece it repeats. Letters outside brackets match themselves, so `CS[0-9]{3}` matches `CS213`.

---

## Numbers, Letters, or Both

<style scoped>
table { font-size: 0.75em; }
</style>

<center>

| Allows             | `pattern`      | Passes      | Fails       |
| ------------------ | -------------- | ----------- | ----------- |
| numbers only       | `[0-9]+`       | `19104`     | `1910A`     |
| letters only       | `[A-Za-z]+`    | `Ada`       | `Ada2`      |
| both               | `[A-Za-z0-9]+` | `CS213`     | `CS 213`    |
| letters and spaces | `[A-Za-z ]+`   | `Ada Smith` | `Ada-Smith` |

</center>

`pattern` passes an empty box, unless it's also `required`. Letters only turns away names like O'Brien and José, so save it for codes.

---

## Predict: A Lowercase Plate

```html
<input id="plate" pattern="[A-Z0-9]{2,7}" />
```

We type `cs213` and click **Order**. What happens? Vote, then convince a neighbor.

<div class="choices">

**A.** It's submitted

**B.** It fails: lowercase

**C.** It fails: too long

**D.** It's submitted as `CS213`

</div>

---

## Answer: A Lowercase Plate

**B.** `[A-Z]` holds only capitals, and `pattern` can't be told to ignore case. Today's page puts what's typed in capitals as we type, so a plate never fails for being lowercase.

---

## Regular Expressions in JavaScript

<!-- prettier-ignore -->
```js
console.log(/^[0-9]{5}$/.test("19104")); // true
console.log(/^[0-9]{5}$/.test("1910"));  // false
```

In JavaScript, a regular expression goes between slashes, and `test` says whether a string matches it. `^` means the start of the string and `$` the end. `pattern` adds them for us, so we leave them out there.

---

## Predict: Without `^` and `$`

```js
const zip = /[0-9]{5}/;
console.log(zip.test("191045"));
console.log(zip.test("ZIP 19104"));
```

What prints? Vote, then convince a neighbor.

<div class="choices">

**A.** `false` `false`

**B.** `true` `false`

**C.** `false` `true`

**D.** `true` `true`

</div>

---

## Answer: Without `^` and `$`

**D.** Without `^` and `$`, `test` looks for five digits anywhere in the string, and both have them. To check a whole value, start with `^` and end with `$`:

```js
const zip = /^[0-9]{5}$/;
```

---

## The `i` Flag and `\.`

<!-- prettier-ignore -->
```js
console.log(/^[a-z]+$/i.test("Ada"));    // true
console.log(/^cs.213$/.test("cs-213"));  // true
console.log(/^cs\.213$/.test("cs-213")); // false
console.log(/^cs\.213$/.test("cs.213")); // true
```

An `i` after the last slash ignores case. Outside brackets, `.` matches any one character, and `\.` matches only a dot.

---

## Checking an Email

<style scoped>
table { font-size: 0.75em; }
</style>

```js
const email = /^[^ @]+@[^ @]+\.[^ @]+$/;
```

<center>

| Piece     | Matches                                    |
| --------- | ------------------------------------------ |
| `^[^ @]+` | the name, like `ada`: no spaces and no `@` |
| `@`       | one `@`                                    |
| `[^ @]+`  | the domain, like `school`                  |
| `\.`      | a dot                                      |
| `[^ @]+$` | the rest, like `edu`                       |

</center>

No regular expression can tell whether an address works. Sending an email with a link to click is the only sure check.

---

## Digits or a Number?

<!-- prettier-ignore -->
```js
console.log(Number("02134")); // 2134
console.log(Number(""));      // 0
console.log(Number(" 42 "));  // 42
console.log(Number("1e3"));   // 1000
```

[`Number.isInteger`](../12-js-math-dates-strings/lecture.html#3) passes all four. A ZIP is a string of digits, not an amount, so check it with `/^[0-9]{5}$/` and keep it a string. Use `Number` for amounts, like how many plates.

---

## The `validity` Object

<style scoped>
table { font-size: 0.65em; }
</style>

<center>

| `validity.`                       | `true` when                                 |
| --------------------------------- | ------------------------------------------- |
| `valueMissing`                    | a `required` box is empty                   |
| `tooShort`, `tooLong`             | the value breaks `minlength` or `maxlength` |
| `rangeUnderflow`, `rangeOverflow` | a number is below `min` or above `max`      |
| `patternMismatch`                 | the value doesn't match `pattern`           |
| `typeMismatch`                    | an `email` box doesn't hold an address      |
| `customError`                     | our code set a message, [next](#25)         |
| `valid`                           | none of the above                           |

</center>

Every control has a `validity` object, which says which check failed. `validationMessage` is the browser's message, or `""` when the control passes.

---

## `setCustomValidity`

<!-- prettier-ignore -->
```js
const zip = document.getElementById("zip");
zip.setCustomValidity("We don't ship there"); // zip fails, with this message
zip.setCustomValidity("");                    // zip's own checks decide again
```

`setCustomValidity` is for a rule HTML can't say, like a name that isn't only spaces, or two boxes that must match. Any message but `""` makes the control fail, with that message.

---

## Predict: Fixing the Name

```js
document.getElementById("name").addEventListener("input", (event) => {
  if (event.target.value.trim() === "") {
    event.target.setCustomValidity("Enter your name");
  }
});
```

We type a space in **Name**, delete it, type `Ada`, and click **Order**. What happens? Vote, then convince a neighbor.

<div class="choices">

**A.** It's submitted

**B.** "Enter your name"

**C.** "Please fill out this field."

**D.** `TypeError`

</div>

---

## Answer: Fixing the Name

**B.** The message set on the first space is never cleared, so **Name** still fails. An `if` that sets a message needs an `else` that sets `""`:

```js
} else {
  event.target.setCustomValidity("");
}
```

---

## `checkValidity` and `reportValidity`

<!-- prettier-ignore -->
```js
const form = document.getElementById("order-form");
console.log(form.checkValidity()); // false
form.reportValidity();             // shows the first failing box's message
```

Both give back `true` only when every control in the form passes. `reportValidity` also shows the message, as a submit would. Each one works on a single control too.

---

## Checking Again on the Server

Anyone can open DevTools, delete `required`, and submit, or send the form's data without the page at all. The browser's checks help the person typing. The server has to check everything again.

---

## Which Check?

<style scoped>
table { font-size: 0.7em; }
</style>

<center>

| To check that                  | Use                                |
| ------------------------------ | ---------------------------------- |
| a box isn't empty              | `required`                         |
| a box isn't only spaces        | `trim` and `setCustomValidity`     |
| a value's length               | `minlength`, `maxlength`           |
| it's numbers, letters, or both | `pattern`, or `test` in JavaScript |
| an email has an `@` and a dot  | `type="email"` and `pattern`       |
| a number is in a range         | `type="number"`, `min`, `max`      |
| two boxes match                | `setCustomValidity`                |

</center>

HTML first, and JavaScript for the rules HTML can't say.

---

# Building Plate Expectations

---

## Setting Up the Starter

Today's page is [Plate Expectations](https://bi3mer.github.io/lectures/cs213/lectures/16-js-form-validation/examples/plate-final/), a shop for custom license plates. Its starter has two files on GitHub: [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/16-js-form-validation/examples/plate-starter/index.html) and [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/16-js-form-validation/examples/plate-starter/practice.js). Set them up in WebStorm, in a new folder:

1. Open each file, and click **Copy raw file**, the copy icon above the code.
2. Paste each one into a new file in WebStorm with the same name.

Every listener goes in `practice.js`. The HTML checks go in `index.html`, so today we change it too.

---

## Problem (Us): Live Plate

Typing in **Plate** or **Tagline** should show on the plate, in capitals. Let's fill in the Live Plate section.

1. Write `typePlate(event)`: put the typed box's value back in capitals, with `toUpperCase()`, then call `showPlate()`.
2. Have `plate` and the **Tagline** box, whose id is `tagline`, call it on each `input`.
3. Why change the box's value, and not only what the plate shows?

---

## Solution (Us): Live Plate

```js
function typePlate(event) {
  event.target.value = event.target.value.toUpperCase();
  showPlate();
}

plate.addEventListener("input", typePlate);
document.getElementById("tagline").addEventListener("input", typePlate);
```

The browser checks the box's value, and [`[A-Z]` takes only capitals](#17). [`event.target`](../15-js-events/lecture.html#11) is whichever box was typed in.

---

## Problem (Us): Required Fields

The order form's boxes have no checks yet. Let's add some in `index.html`.

1. Make **Plate**, **Name**, **ZIP**, and **Email** required.
2. Click **Order** with every box empty. Which box gets the message?
3. Type a space in **Name**, fill in the other three, and click **Order**. What happens?

---

## Solution (Us): Required Fields

<!-- prettier-ignore -->
```html
<input id="plate" name="plate" placeholder="CS213" required />
<input id="name" name="name" placeholder="Ada Lovelace" required />
<input id="zip" name="zip" placeholder="19104" required />
<input id="email" name="email" placeholder="ada@school.edu" required />
```

- **Plate**: the browser goes down the form and shows the first box that fails.
- [A space passes `required`](#5), so the form is submitted, and the page reloads with a [query string](../13-js-forms-dom/lecture.html#24).

---

## Problem (You): Plate, Tagline, and ZIP

Add the attributes these rules need in `index.html`. Give each `pattern` a `title` that says its rule.

- **Plate:** 2 to 7 capital letters or digits, with no typing past 7
- **Tagline:** capital letters and spaces, up to 20
- **ZIP:** exactly 5 digits, with no typing past 5. Add `inputmode="numeric"` too, so a phone shows its number keys.

Try `CS 213`, a plate of 1 letter, and a ZIP of `1910`. Why isn't **ZIP** a `type="number"` box?

---

## Solution (You): Plate, Tagline, and ZIP

<style scoped>
pre { font-size: 0.7em; }
</style>

<!-- prettier-ignore -->
```html
<input id="plate" name="plate" placeholder="CS213" required maxlength="7"
  pattern="[A-Z0-9]{2,7}" title="2 to 7 letters and numbers" />
<input id="tagline" name="tagline" placeholder="ROAD TRIP" maxlength="20"
  pattern="[A-Z ]+" title="letters and spaces" />
<input id="zip" name="zip" placeholder="19104" required maxlength="5"
  inputmode="numeric" pattern="[0-9]{5}" title="5 digits" />
```

- An empty **Tagline** passes its `pattern`, so it stays optional.
- `maxlength` and `pattern` don't work on a `number` box, and its arrows would step a ZIP up by 1. A ZIP is [digits, not an amount](#23).

---

## Problem (You): Email

Make **Email** an `email` box in `index.html`, and give it a `pattern` that also wants a dot after the `@`, with a `title`.

Then try the [four addresses](#8). Which ones pass now?

---

## Solution (You): Email

<!-- prettier-ignore -->
```html
<input id="email" name="email" placeholder="ada@school.edu"
  type="email" required pattern="[^ @]+@[^ @]+\.[^ @]+"
  title="an address like ada@school.edu" />
```

Only `ada@school.edu` passes now, since `ada@school` has no dot. `pattern` adds `^` and `$`, so it leaves out what [the JavaScript version](#22) needs.

---

## Problem (Us): Red and Green

Let's color each box by whether it passes, under the Red and Green comment in `index.html`'s `<style>`.

1. A box that fails gets a `tomato` border, but only once we've used it.
2. A box that passes gets a `mediumseagreen` border, the same way.
3. What would `:invalid` do when the page loads?

---

## Solution (Us): Red and Green

```css
input:user-invalid {
  border-color: tomato;
}

input:user-valid {
  border-color: mediumseagreen;
}
```

With [`:invalid`](#11), every empty `required` box would be red as soon as the page loads, before we've typed anything.

---

## Problem (Us): Checklist

The checklist under the plate should tick each rule as it's met. Let's fill in `showChecklist()`'s Plate Rules section.

1. Set `goodLength` to whether the plate is 2 to 7 characters long, and `goodChars` to whether it's only capital letters and digits, [with `test`](#18).
2. Toggle the class `met` on `rule-length` and `rule-chars`, [with `classList`](../14-js-dom/lecture.html#16).
3. Under `showChecklist();`, have `plate` call it on each `input`.

---

## Solution (Us): Checklist

<style scoped>
pre { font-size: 0.7em; }
</style>

```js
function showChecklist() {
  const text = plate.value;
  const goodLength = text.length >= 2 && text.length <= 7;
  const goodChars = /^[A-Z0-9]+$/.test(text);

  document.getElementById("rule-length").classList.toggle("met", goodLength);
  document.getElementById("rule-chars").classList.toggle("met", goodChars);
}

showChecklist();
plate.addEventListener("input", showChecklist);
```

`toggle` adds `met` when its second argument is `true`, and removes it when it's `false`. `plate` has two `input` listeners now, and both run.

---

## Problem (You): Checklist, ZIP and Email

Turn the pseudocode into code in `showChecklist()`'s ZIP and Email section.

```text
set goodZip to whether the ZIP box passes its own checks
set goodEmail to whether the email box's value matches the email regex
toggle met on rule-zip with goodZip
toggle met on rule-email with goodEmail
have the ZIP and Email boxes call showChecklist on each input
```

[`validity`](#24) and [the email regex](#22) can help.

---

## Solution (You): Checklist, ZIP and Email

<style scoped>
pre { font-size: 0.7em; }
</style>

```js
const email = document.getElementById("email").value;
const goodZip = document.getElementById("zip").validity.valid;
const goodEmail = /^[^ @]+@[^ @]+\.[^ @]+$/.test(email);

document.getElementById("rule-zip").classList.toggle("met", goodZip);
document.getElementById("rule-email").classList.toggle("met", goodEmail);
```

```js
document.getElementById("zip").addEventListener("input", showChecklist);
document.getElementById("email").addEventListener("input", showChecklist);
```

`goodEmail` could be the email box's `validity.valid` too, since its `pattern` makes the same check.

---

## Problem (Us): Blank Name

A name of only spaces [passes `required`](#5). Let's fill in the Blank Name section.

1. On each `input` of **Name**, if its value, trimmed, is `""`, set its message to `Enter your name`.
2. Otherwise, clear its message.
3. What happens without step 2?

---

## Solution (Us): Blank Name

```js
document.getElementById("name").addEventListener("input", (event) => {
  if (event.target.value.trim() === "") {
    event.target.setCustomValidity("Enter your name");
  } else {
    event.target.setCustomValidity("");
  }
});
```

Without the `else`, [the message stays](#27) after we type `Ada`, and the order can never be sent.

---

## Problem (You): Confirm Email

Turn the pseudocode into code in the Confirm Email section.

```text
function checkEmails
  if the Email again box's value is different from the Email box's
    set Email again's message to "Emails don't match"
  else
    clear Email again's message

have both email boxes call checkEmails on each input
```

The **Email again** box's id is `email-again`.

---

## Solution (You): Confirm Email

<style scoped>
pre { font-size: 0.7em; }
</style>

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

Fixing **Email** so it matches has to clear the message too, so both boxes call `checkEmails`.

---

## Problem (You): Error Messages

The browser shows one message at a time. Turn the pseudocode into code in the Error Messages section, so each box shows its own.

```text
for each input in the order form
  when the input loses focus
    put its validation message in the p whose id is its id plus -error
```

[`querySelectorAll`](../14-js-dom/lecture.html#11) can find the inputs, and [`event.target`](../15-js-events/lecture.html#11) is the box that lost focus.

---

## Solution (You): Error Messages

```js
for (const box of document.querySelectorAll("#order-form input")) {
  box.addEventListener("blur", (event) => {
    const error = document.getElementById(`${event.target.id}-error`);
    error.textContent = event.target.validationMessage;
  });
}
```

`validationMessage` is `""` when a box passes, so leaving a fixed box clears its message. Waiting for [`blur`](../15-js-events/lecture.html#27) keeps a message from showing while we're still typing.

---

## Problem (Us): Place Order

**Order** is the form's submit button. Let's write the Place Order section.

1. Listen for the `submit` of `order-form`, and [stop the reload](../15-js-events/lecture.html#28).
2. Add the class `ordered` to `plate-preview`, which stamps the plate.
3. Put `Ordered CS213, shipping to 19104` in `message`, with the plate and ZIP that were typed.
4. Leave **ZIP** empty and click **Order**. Does our listener run?

---

## Solution (Us): Place Order

<style scoped>
pre { font-size: 0.7em; }
</style>

```js
document.getElementById("order-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const zip = document.getElementById("zip").value;
  const text = `Ordered ${plate.value}, shipping to ${zip}`;

  document.getElementById("plate-preview").classList.add("ordered");
  document.getElementById("message").textContent = text;
});
```

No. [The browser checks first](#10), and `submit` fires only once every box passes, so this listener never sees a bad order.

---

## Problem (You): Parsons 1

<!-- prettier-ignore -->
```js
plate.addEventListener("input", parsons1);
plate.setCustomValidity("");
if (/[0-9]+/.test(plate.value)) {
function parsons1() {
}
plate.setCustomValidity("Add at least one letter");
if (plate.value.test(/^[0-9]+$/)) {
} else {
if (/^[0-9]+$/.test(plate.value)) {
}
```

- Assemble the program in the Parsons 1 section of `practice.js`. Two of the lines are wrong.
- What does `parsons1` do? What should it be named?

---

## Solution (You): Parsons 1

```js
function parsons1() {
  if (/^[0-9]+$/.test(plate.value)) {
    plate.setCustomValidity("Add at least one letter");
  } else {
    plate.setCustomValidity("");
  }
}

plate.addEventListener("input", parsons1);
```

It turns away a plate of only digits, like `2026`, so `needsLetter` would be a better name. Without `^` and `$`, any plate with a digit would fail, and `test` belongs to the regular expression, not the string.

---

## Problem (You): Extras

Done early? Pick any of these. Their solutions come after **Questions?**.

- **Plate count.** A box for how many plates, 1 to 5, and the total beside it, at $35 a plate.
- **Taken plates.** `CS213`, `HELLO`, and `GOFAST` are taken, so **Plate** should fail with `That plate is taken`.
- **Phone.** A **Phone** box that wants a number like `215-555-0123`.

---

# Conclusion

---

## The Finished Page

Every solution from today, together:

- [Plate Expectations](https://bi3mer.github.io/lectures/cs213/lectures/16-js-form-validation/examples/plate-final/), running live
- [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/16-js-form-validation/examples/plate-final/index.html) and [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/16-js-form-validation/examples/plate-final/practice.js) on GitHub, with every section filled in

`index.html` has the attributes and CSS we added. The extras aren't in it.

---

## Summary

- `required`, `minlength`, `maxlength`, `type="email"`, and `pattern` make the browser check a box before the form is submitted.
- When a box fails, the browser shows its message, and `submit` doesn't fire.
- A regular expression describes the text allowed: `[0-9]+`, `[A-Za-z]+`, and `[A-Za-z0-9]+` for numbers, letters, or both.
- In JavaScript, `/^...$/.test(value)` checks a whole value. Without `^` and `$`, a match anywhere counts.
- `:user-invalid` and `:user-valid` style a box once it's been used.
- `validity` says which check failed. `setCustomValidity` adds a rule HTML can't say, and `""` clears it.
- The server checks everything again.

---

# Questions?

---

## Extras: Plate Count

<style scoped>
pre { font-size: 0.7em; }
</style>

<!-- prettier-ignore -->
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

---

## Extras: Taken Plates

<style scoped>
pre { font-size: 0.7em; }
</style>

```js
const taken = ["CS213", "HELLO", "GOFAST"];

function parsons1() {
  if (/^[0-9]+$/.test(plate.value)) {
    plate.setCustomValidity("Add at least one letter");
  } else if (taken.includes(plate.value)) {
    plate.setCustomValidity("That plate is taken");
  } else {
    plate.setCustomValidity("");
  }
}
```

Add the `else if` to `parsons1`. A second listener that set **Plate**'s message would clear this one's with its `else`, and the other way around.

---

## Extras: Phone

<!-- prettier-ignore -->
```html
<label for="phone">Phone</label>
<input id="phone" name="phone" type="tel" placeholder="215-555-0123"
  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="like 215-555-0123" />
```

`type="tel"` shows a phone's number keys and checks nothing itself, so `pattern` does the checking. Outside brackets, `-` matches itself.
