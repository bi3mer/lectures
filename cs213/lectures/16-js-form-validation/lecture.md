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

**Validation** is checking what was typed before the form is [submitted](../13-js-forms-dom/lecture.html#22). The browser does the checks we ask for in HTML, and our JavaScript does the rest.

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

`required` needs no value, like [`checked`](../13-js-forms-dom/lecture.html#9). Submitting with the box empty stops the submit, and the browser shows a message by the box.

---

## Predict: Only Spaces

```html
<input id="name" required />
```

We type three spaces in **Name** and click **Send**. What happens? Vote, then convince a neighbor.

<div class="choices">

**A.** It's submitted

**B.** It asks for a name

**C.** It removes the spaces

**D.** The box won't take spaces

</div>

---

## Answer: Only Spaces

**A.** `required` only checks that the value isn't `""`, and `"   "` isn't. [`trim`](../12-js-math-dates-strings/lecture.html#34) can catch it, which we'll do in JavaScript.

What other rules can HTML check?

---

## `minlength` and `maxlength`

```html
<input id="code" minlength="2" maxlength="7" />
```

<p class="caption">Page</p>
<form class="demo" onsubmit="return false"><label for="demo-code">Code</label> <input id="demo-code" minlength="2" maxlength="7" /> <button>Send</button></form>

`maxlength` stops typing at 7 characters, and `minlength` stops the submit under 2. An empty box passes both, unless it's also `required`. [Characters Left counted them itself](../13-js-forms-dom/lecture.html#57).

---

## Types That Check Themselves

```html
<input id="email" type="email" />
<input id="count" type="number" min="1" max="5" />
```

<p class="caption">Page</p>
<form class="demo" onsubmit="return false"><input type="email" size="14" /> <input type="number" min="1" max="5" value="1" /> <button>Send</button></form>

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

When does the browser run these checks?

---

## When the Browser Checks

```js
document.getElementById("signup").addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("every box passed");
});
```

On a submit, the browser checks every control. If one fails, it shows the first one's message and stops, so [`submit`](../15-js-events/lecture.html#45) never fires. `novalidate` on the `<form>` turns the checks off.

How do we show which boxes fail?

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

## Setting Up

Make these two files in a new WebStorm folder:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Practice</title>
  </head>
  <body>
    <!-- each problem's HTML goes here -->
    <script src="practice.js"></script>
  </body>
</html>
```

`practice.js` starts empty. Before each problem, clear it and paste in the new HTML.

---

## Problem: Name Rules (us)

```html
<form>
  <label for="name">Name</label>
  <input id="name" />
  <button>Send</button>
</form>
```

```text
Make Name required, with 2 to 10 characters.
```

- Which attribute stops the typing, and which stops the submit?

---

## Solution: Name Rules (us)

```html
<input id="name" required minlength="2" maxlength="10" />
```

Try an empty box, then one letter. Try to type an eleventh letter.

---

## Problem: Age Box (you)

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

## Solution: Age Box (you)

```html
<input id="age" type="number" min="18" max="99" required />
```

An age is an amount, so a `number` box fits.

How do we say that a ZIP is exactly five digits?

---

## `pattern`

```html
<input id="zip" pattern="[0-9]{5}" title="5 digits" />
```

<p class="caption">Page</p>
<form class="demo" onsubmit="return false"><label for="demo-zip">ZIP</label> <input id="demo-zip" pattern="[0-9]{5}" title="5 digits" /> <button>Send</button></form>

A **regular expression** describes which text is allowed. `pattern` checks the whole value against one: `[0-9]{5}` means five characters, each a digit. The browser can show `title` in its message, so say the rule there.

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

Square brackets match one character from the set inside them. A `^` first inside the brackets flips the set.

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

## Predict: A Lowercase Code

```html
<input id="code" pattern="[A-Z0-9]{2,7}" />
```

We type `cs213` and click **Send**. What happens? Vote, then convince a neighbor.

<div class="choices">

**A.** It's submitted

**B.** It fails: lowercase

**C.** It fails: too long

**D.** It's submitted as `CS213`

</div>

---

## Answer: A Lowercase Code

**B.** `[A-Z]` holds only capitals, and `pattern` can't be told to ignore case. A listener can put what's typed in capitals, so a code never fails for being lowercase.

What if the rule has to run in our own code?

---

## Problem: Course Code (us)

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

## Solution: Course Code (us)

```html
<input id="course" pattern="[A-Z]{2}[0-9]{3}" title="like CS213" />
```

Each class matches one character, and the count goes after it.

---

## Problem: ZIP Box (you)

```html
<form>
  <label for="zip">ZIP</label>
  <input id="zip" />
  <button>Send</button>
</form>
```

```text
allow exactly 5 digits, with no typing past 5
say the rule in title
```

---

## Solution: ZIP Box (you)

```html
<input id="zip" maxlength="5" pattern="[0-9]{5}" title="5 digits" />
```

A ZIP is not an amount, so it stays a text box.

---

## Regular Expressions in JavaScript

<!-- prettier-ignore -->
```js
console.log(/^[0-9]{5}$/.test("19104")); // true
console.log(/^[0-9]{5}$/.test("1910"));  // false
```

In JavaScript, a regular expression goes between slashes, and `test` says whether a string matches it. `^` means the start of the string and `$` the end. `pattern` adds them for us, so we leave them out there.

Do we need the `^` and `$`?

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

What about capitals and dots?

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

[`Number.isInteger`](../12-js-math-dates-strings/lecture.html#3) passes all four. A ZIP is a string of digits, not an amount, so check it with `/^[0-9]{5}$/` and keep it a string. Use `Number` for amounts, like an age.

---

## Problem: Test a Code (us)

```js
const code = "CS213";
// Print whether code is two capital letters and three digits.
```

<p class="caption">Console</p>

```text
true
```

- What would `XCS213` print without `^`?

---

## Solution: Test a Code (us)

```js
const code = "CS213";
console.log(/^[A-Z]{2}[0-9]{3}$/.test(code));
```

`^` and `$` make the regular expression check the whole string.

---

## Problem: Test the Emails (you)

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

## Solution: Test the Emails (you)

```js
const emails = ["ada@school.edu", "ada@school"];

for (let email of emails) {
  console.log(/^[^ @]+@[^ @]+\.[^ @]+$/.test(email));
}
```

The second has no dot after the `@`.

The browser also keeps track of what failed.

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
| `customError`                     | our code set a message, [next](#38)         |
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

What happens when the rule passes again?

---

## Predict: Fixing the Name

```js
document.getElementById("name").addEventListener("input", (event) => {
  if (event.target.value.trim() === "") {
    event.target.setCustomValidity("Enter your name");
  }
});
```

We type a space in **Name**, delete it, type `Ada`, and click **Send**. What happens? Vote, then convince a neighbor.

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

## Problem: Blank Name (us)

```html
<form>
  <input id="name" required />
  <button>Send</button>
</form>
```

```js
// On each input, fail a name of only spaces with "Enter your name".
```

<p class="caption">Page</p>

```text
Enter your name
```

- What happens without the `else`?

---

## Solution: Blank Name (us)

```js
document.getElementById("name").addEventListener("input", (event) => {
  if (event.target.value.trim() === "") {
    event.target.setCustomValidity("Enter your name");
  } else {
    event.target.setCustomValidity("");
  }
});
```

The `else` clears the message, or the box would fail forever.

---

## Problem: Confirm Password (you)

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

<p class="caption">Page</p>

```text
Passwords don't match
```

---

## Solution: Confirm Password (you)

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

Two boxes that must match is a rule HTML cannot say.

How do we run every check from code?

---

## `checkValidity` and `reportValidity`

<!-- prettier-ignore -->
```js
const form = document.getElementById("signup");
console.log(form.checkValidity()); // false
form.reportValidity();             // shows the first failing box's message
```

Both give back `true` only when every control in the form passes. `reportValidity` also shows the message, as a submit would. Each one works on a single control too.

Can we trust all of this?

---

## Checking Again on the Server

Anyone can open DevTools, delete `required`, and submit, or send the form's data without the page at all. The browser's checks help the person typing. The server has to check everything again.

With so many checks, which do we use?

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

# Conclusion

---

## Build It Yourself

[Plate Expectations](../../demos/16-plate-expectations/instruction.html) is a license plate shop built from today's checks, with step-by-step instructions.

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

## Next Up: Creating a Web API / TypeScript

[Creating a Web API / TypeScript](../17-js-web-api-typescript/lecture.html)

---

# Questions?
