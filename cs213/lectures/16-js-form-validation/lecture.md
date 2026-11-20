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
/* Answer choices for the Predict slide, all on one line. */
.choices { display: flex; gap: 48px; }
</style>

# Form Validation

Colan Biemer

---

## Validation

<style scoped>
table { font-size: 0.75em; }
</style>

[Say Hello](../15-js-events/lecture.html#61) greets an empty box with `Hello, `. A form submits whatever is typed, like these:

<center>

| Box   | Typed        | What's wrong         |
| ----- | ------------ | -------------------- |
| Name  |              | nothing typed        |
| ZIP   | `1910`       | one digit short      |
| ZIP   | `l9104`      | a letter l, not a 1  |
| Email | `ada@school` | no dot after the `@` |

</center>

**Validation** is checking what was typed against a form's rules before the form is [submitted](../13-js-forms-dom/lecture.html#22). The browser does the checks we ask for in HTML, and our JavaScript does the rest.

---

## `required`

```html
<form>
  <label for="name">Name</label>
  <input id="name" required />
  <button>Send</button>
</form>
```

<p class="caption">Page</p>
<form class="demo" onsubmit="return false"><label for="demo-name">Name</label> <input id="demo-name" required /> <button>Send</button></form>

[`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/required) is a [boolean attribute](../13-js-forms-dom/lecture.html#9): with it, an empty box fails, and **Send** shows a message instead of submitting. Spaces count as typed, so a box of only spaces passes.

---

## `minlength` and `maxlength`

```html
<input id="initials" minlength="2" maxlength="3" />
```

<p class="caption">Page</p>
<form class="demo" onsubmit="return false"><label for="demo-initials">Initials</label> <input id="demo-initials" minlength="2" maxlength="3" /> <button>Send</button></form>

[`maxlength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/maxlength) stops typing at 3 characters, and [`minlength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/minlength) fails a value under 2. Both pass an empty box, unless it's also `required`.

---

## Types That Check Themselves

```html
<input id="email" type="email" />
<input id="count" type="number" min="1" max="5" />
```

<p class="caption">Page</p>
<form class="demo" onsubmit="return false"><input type="email" size="14" /> <input type="number" min="1" max="5" value="1" /> <button>Send</button></form>

An [`email` box](../13-js-forms-dom/lecture.html#6) fails without a name, an `@`, and a domain, but the domain needs no dot, so `ada@school` passes. A `number` box fails outside its [`min` and `max`](../13-js-forms-dom/lecture.html#8).

When does the browser run these checks?

---

## When the Browser Checks

```html
<form id="signup">
  <input id="name" required />
  <button>Send</button>
</form>
```

```js
document.getElementById("signup").addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("every box passed");
});
```

On a submit, the browser checks every control. If any fail, it shows the first failing box's message and stops, so [`submit`](../15-js-events/lecture.html#60) never fires.

How do we show which boxes fail?

---

## `:invalid` and `:user-invalid`

<style scoped>
#demo-invalid:invalid, #demo-user-invalid:user-invalid { border-color: tomato; }
</style>

<!-- prettier-ignore -->
```css
input:invalid { border-color: tomato; }
input:user-invalid { border-color: tomato; }
```

<p class="caption">Page</p>
<form class="demo" onsubmit="return false"><input id="demo-invalid" required placeholder=":invalid" /> <input id="demo-user-invalid" required placeholder=":user-invalid" /> <button>Send</button></form>

[`:invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:invalid) is a [pseudo-class](../03-css-intro/lecture.html#100) for a failing control, so an empty `required` box is red as soon as the page loads. [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid) waits until we've changed the box and left it, or tried to submit. `:valid` and `:user-valid` match the boxes that pass.

---

## Problem: Name Rules

```html
<form>
  <label for="name">Name</label>
  <input id="name" />
  <button>Send</button>
</form>
```

```text
make Name required
allow 2 to 10 characters
give it a tomato border when it fails, but not at page load
```

- Which attribute stops the typing, and which stops the submit?

---

## Solution: Name Rules

```html
<input id="name" required minlength="2" maxlength="10" />
```

```css
input:user-invalid {
  border-color: tomato;
}
```

`maxlength` stops the typing at 10 characters, while `required` and `minlength` stop the submit. `:invalid` would color the empty box at page load.

---

## Problem: Age Box

```html
<form>
  <label for="age">Age</label>
  <input id="age" />
  <button>Send</button>
</form>
```

```text
make Age a required number box
allow 18 to 99
```

---

## Solution: Age Box

```html
<input id="age" type="number" min="18" max="99" required />
```

An age is an amount, so a `number` box fits. A ZIP is a code: `min` and `max` can't tell `02134` from `2134`.

How do we say that a ZIP is exactly five digits?

---

# Regular Expressions

---

## `pattern`

```html
<input id="zip" pattern="[0-9]{5}" title="5 digits" />
```

<p class="caption">Page</p>
<form class="demo" onsubmit="return false"><label for="demo-zip">ZIP</label> <input id="demo-zip" pattern="[0-9]{5}" title="5 digits" /> <button>Send</button></form>

A [**regular expression**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) describes text, such as "five digits", that a string either matches or doesn't. [`pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/pattern) checks the whole value against one: `[0-9]{5}` means five characters, each a digit, so `1910` and `l9104` fail. The browser can show `title` in its message, so say the rule there.

What else can go in a pattern?

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

A **character class** is a set of characters in square brackets, and it matches any one of them. A `^` first inside the brackets flips the set.

How do we say how many?

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
| `*`           | 0 or more | `""`, `2026`            |
| `?`           | 0 or 1    | `""`, `7`               |

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

## Problem: Course Code

```html
<form>
  <label for="course">Course</label>
  <input id="course" />
  <button>Send</button>
</form>
```

```text
allow two capital letters, then three digits, like CS213
say the rule in title
```

- Try `cs213` and `CS21`.

---

## Solution: Course Code

```html
<input id="course" pattern="[A-Z]{2}[0-9]{3}" title="2 capitals, 3 digits" />
```

`cs213` fails, since `[A-Z]` holds only capitals; `[A-Za-z]` would allow both. `CS21` fails, since `{3}` wants three digits.

---

## Problem: Username

```html
<form>
  <label for="username">Username</label>
  <input id="username" />
  <button>Send</button>
</form>
```

```text
allow 3 to 12 letters or digits
say the rule in title
```

---

## Solution: Username

```html
<input
  id="username"
  pattern="[A-Za-z0-9]{3,12}"
  title="3 to 12 letters or digits"
/>
```

`minlength="3"` and `maxlength="12"` with `pattern="[A-Za-z0-9]+"` work too, and also stop the typing at 12.

How do we try a pattern without typing into a box?

---

## Regular Expressions in JavaScript

<!-- prettier-ignore -->
```js
console.log(/^[0-9]{5}$/.test("19104")); // true
console.log(/^[0-9]{5}$/.test("1910"));  // false
```

In JavaScript, a regular expression goes between slashes, and [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) gives back `true` when a string matches it. Outside brackets, `^` means the start of the string and `$` the end. `pattern` adds them for us, so we leave them out there.

Do we need the `^` and `$`?

---

## Predict: Without `^` and `$`

```js
const zip = /[0-9]{5}/;
console.log(zip.test("191045"));
console.log(zip.test("ZIP 19104"));
```

What prints?

<div class="choices">

**A.** `false` `false`

**B.** `true` `false`

**C.** `false` `true`

**D.** `true` `true`

</div>

---

## Answer: Without `^` and `$`

<p class="caption">Console</p>

```text
true
true
```

**D.** Without `^` and `$`, `test` looks for five digits anywhere in the string, and both have them. To check a whole value, start with `^` and end with `$`:

```js
const zip = /^[0-9]{5}$/;
```

What about capitals and dots?

---

## The `i` Flag and `\.`

<!-- prettier-ignore -->
```js
console.log(/^[A-Z]{2}[0-9]{3}$/i.test("cs213")); // true
console.log(/^cs.213$/.test("cs-213"));           // true
console.log(/^cs\.213$/.test("cs-213"));          // false
console.log(/^cs\.213$/.test("cs.213"));          // true
```

A **flag** after the last slash changes how the whole regular expression matches, and `i` ignores case, so [the course code](#18) now passes `cs213`; `pattern` can't take flags. Outside brackets, `.` matches any one character, and `\.` matches only a dot.

Can we turn away `ada@school` now?

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

Without `^` and `$`, the same rule can go in an email box's `pattern` to turn away `ada@school`. Only sending an email shows that an address works.

---

## Problem: Test the Emails

```text
set emails to ["ada@school.edu", "ada@school"]

for each email in emails
  print whether it matches the email regular expression
```

<p class="caption">Console</p>

```text
true
false
```

---

## Solution: Test the Emails

```js
const emails = ["ada@school.edu", "ada@school"];

for (const email of emails) {
  console.log(/^[^ @]+@[^ @]+\.[^ @]+$/.test(email));
}
```

The second has no dot after the `@`.

How do we make a box fail from JavaScript?

---

# Custom Rules

---

## `setCustomValidity`

```html
<input id="zip" pattern="[0-9]{5}" />
```

<!-- prettier-ignore -->
```js
const zip = document.getElementById("zip");
zip.setCustomValidity("We don't ship there"); // zip fails, with this message
zip.setCustomValidity("");                    // zip's own checks decide again
```

[`setCustomValidity`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity) lets JavaScript fail a control: any message but `""` makes it fail, with that message. It's for rules like a name that isn't only spaces, or two boxes that must match.

---

## Problem: Blank Name

```html
<form>
  <label for="name">Name</label>
  <input id="name" required />
  <button>Send</button>
</form>
```

```js
// On each input, fail a name of only spaces with "Enter your name".
```

<p class="caption">Page, after typing three spaces and clicking Send</p>

```text
Enter your name
```

- [`required` passes a box of only spaces](#3), and [`trim`](../12-js-math-dates-strings/lecture.html#34) removes them.
- What happens without the `else`?

---

## Solution: Blank Name

```js
document.getElementById("name").addEventListener("input", (event) => {
  if (event.target.value.trim() === "") {
    event.target.setCustomValidity("Enter your name");
  } else {
    event.target.setCustomValidity("");
  }
});
```

Without the `else`, the message set by the first space never clears, so **Name** fails even after we type `Ada`.

---

## Problem: Confirm Password

```html
<form>
  <input id="password" type="password" />
  <input id="again" type="password" />
  <button>Send</button>
</form>
```

```text
when something is typed in the again box
  if its value is different from the password box's
    set its message to "Passwords don't match"
  else
    clear its message
```

<p class="caption">Page, after typing two different passwords and clicking Send</p>

```text
Passwords don't match
```

---

## Solution: Confirm Password

```js
const again = document.getElementById("again");

again.addEventListener("input", () => {
  if (again.value !== document.getElementById("password").value) {
    again.setCustomValidity("Passwords don't match");
  } else {
    again.setCustomValidity("");
  }
});
```

Only `again` listens, so changing the password box afterward doesn't check the match again.

Can we trust all of this?

---

## Checking Again on the Server

Anyone can open DevTools, delete `required`, and submit, or send the form's data without the page at all. Checks in the browser help the person typing, but the server has to check everything again.

---

## Next Up: Creating a Web API / TypeScript

[Creating a Web API / TypeScript](../17-js-web-api-typescript/lecture.html)
