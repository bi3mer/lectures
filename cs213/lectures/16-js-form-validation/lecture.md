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
/* The sign-up form so far: one label and box per row, with the button under the boxes. */
.signup { display: grid; grid-template-columns: max-content 16em; gap: 8px 16px; align-items: center; }
.signup button { grid-column: 2; justify-self: start; }
</style>

# Form Validation

Colan Biemer

---

## What We Are Making

[A sign-up form](examples/index.html) that checks every box before it submits.

---

## Validation

<style scoped>
table { font-size: 0.75em; }
</style>

<center>

| Box      | Typed   | What's wrong       |
| -------- | ------- | ------------------ |
| Username |         | nothing typed      |
| Username | `a`     | under 3 characters |
| Email    | `hello` | no `@`             |
| Password | `cat`   | under 8 characters |

</center>

**Validation** is checking what was typed against a form's rules before the form is [submitted](../13-js-forms-dom/lecture.html#22). The browser does the checks we ask for in HTML, and our JavaScript does the rest.

---

## An Empty Username

```html
<form id="signup">
  <label for="username">Username</label>
  <input id="username" />
  <button>Sign Up</button>
</form>
```

<p class="caption">Page</p>
<form class="demo signup" onsubmit="return false"><label for="demo3-username">Username</label> <input id="demo3-username" /> <button>Sign Up</button></form>

Our sign-up form starts with one box. Click **Sign Up** with Username empty, and the form still submits.

How do we stop it?

---

## Checking Username With JavaScript

```js
const form = document.getElementById("signup");
const username = document.getElementById("username");

form.addEventListener("submit", (event) => {
  if (username.value === "") {
    event.preventDefault();
    alert("Please fill out Username");
  }
});
```

A [`submit` listener](../15-js-events/lecture.html#60) can stop the form when Username is empty.

There is, though, an easier way...

---

## `required`

```html
<input id="username" required />
```

<p class="caption">Page</p>
<form class="demo signup" onsubmit="return false"><label for="demo5-username">Username</label> <input id="demo5-username" required /> <button>Sign Up</button></form>

[`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/required) is a [boolean attribute](../13-js-forms-dom/lecture.html#9): with it, an empty box fails, and **Sign Up** shows a message instead of submitting. Spaces count as typed, so a box of only spaces passes.

---

## A Username of Any Length

<p class="caption">Page</p>
<form class="demo signup" onsubmit="return false"><label for="demo6-username">Username</label> <input id="demo6-username" required value="a" /> <button>Sign Up</button></form>

We want usernames of 3 to 12 characters, but Username takes `a`, or a whole sentence.

---

## Checking Length With JavaScript

```js
const form = document.getElementById("signup");
const username = document.getElementById("username");

form.addEventListener("submit", (event) => {
  const length = username.value.length;
  if (length < 3 || length > 12) {
    event.preventDefault();
    alert("Use 3 to 12 characters");
  }
});
```

Again, there is an easier way!

---

## `minlength` and `maxlength`

```html
<input id="username" required minlength="3" maxlength="12" />
```

<p class="caption">Page</p>
<form class="demo signup" onsubmit="return false"><label for="demo8-username">Username</label> <input id="demo8-username" required minlength="3" maxlength="12" /> <button>Sign Up</button></form>

- [`minlength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/minlength) requires a minimum length of input.
- [`maxlength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/maxlength) requires a max length and prevents extra input.
- Without `required`, an empty box still submits.

---

## Types That Check Themselves

<!-- prettier-ignore -->
```html
<label for="email">Email</label>
<input id="email" type="email" required />
```

<p class="caption">Page</p>
<form class="demo signup" onsubmit="return false"><label for="demo9-username">Username</label> <input id="demo9-username" required minlength="3" maxlength="12" /> <label for="demo9-email">Email</label> <input id="demo9-email" type="email" required /> <button>Sign Up</button></form>

An [`email` box](../13-js-forms-dom/lecture.html#6) needs text on both sides of an `@`, so `hello` fails, but the domain needs no dot, so `ada@school` passes. A `number` box fails outside its [`min` and `max`](../13-js-forms-dom/lecture.html#8).

Can a failing box look different before we click **Sign Up**?

---

## `:invalid` and `:user-invalid`

<style scoped>
#demo10 input:user-invalid { border-color: tomato; }
</style>

```css
input:user-invalid {
  border-color: tomato;
}
```

<p class="caption">Page</p>
<form id="demo10" class="demo signup" onsubmit="return false"><label for="demo10-username">Username</label> <input id="demo10-username" required minlength="3" maxlength="12" /> <label for="demo10-email">Email</label> <input id="demo10-email" type="email" required /> <button>Sign Up</button></form>

[`:invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:invalid) is a [pseudo-class](../03-css-intro/lecture.html#100) for a failing control, so it would color both empty boxes at page load. [`:user-invalid`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-invalid) waits until we've changed a box and left it, or tried to submit.

---

## `:valid` and `:user-valid`

<style scoped>
#demo11 input:user-invalid { border-color: tomato; }
#demo11 input:user-valid { border-color: seagreen; }
</style>

```css
input:user-valid {
  border-color: seagreen;
}
```

<p class="caption">Page</p>
<form id="demo11" class="demo signup" onsubmit="return false"><label for="demo11-username">Username</label> <input id="demo11-username" required minlength="3" maxlength="12" /> <label for="demo11-email">Email</label> <input id="demo11-email" type="email" required /> <button>Sign Up</button></form>

[`:valid`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:valid) matches a passing box right away, and [`:user-valid`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:user-valid) waits, like `:user-invalid`, until we've changed the box and left it.

---

## Problem: Age Box

<!-- prettier-ignore -->
```html
<label for="age">Age</label>
<input id="age" />
```

```text
add Age under Email
make it a required number box
allow 13 to 120
```

---

## Solution: Age Box

```html
<input id="age" type="number" min="13" max="120" required />
```

A `number` box also fails `13.5`, since it steps by 1 from `min`.

---

## Problem: Password

<!-- prettier-ignore -->
```html
<label for="password1">Password</label>
<input id="password1" type="password" />
```

```text
add Password under Age
make it required, with at least 8 characters
```

---

## Solution: Password

```html
<input id="password1" type="password" required minlength="8" />
```

---

## `validity`

```js
const username = document.getElementById("username");

username.addEventListener("change", () => {
  console.log(username.validity.valueMissing);
  console.log(username.validity.tooShort);
  console.log(username.validity.valid);
});
```

<p class="caption">Console, after typing ad in Username and leaving it</p>

```text
false
true
false
```

Each control has a [`validity`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) object with one `true` or `false` for each check, so JavaScript can tell which rule failed.

---

## The Checks in `validity`

<style scoped>
table { margin: 0 auto; }
</style>

| Property         | `true` when the value is                |
| ---------------- | --------------------------------------- |
| `valueMissing`   | empty, with `required`                  |
| `tooShort`       | shorter than `minlength`                |
| `tooLong`        | longer than `maxlength`                 |
| `typeMismatch`   | not an email address, in an `email` box |
| `rangeUnderflow` | below `min`                             |
| `rangeOverflow`  | above `max`                             |

---

## Problem: Password Hint

```html
<p id="password-hint" style="color: red"></p>
```

<p class="caption">Page, after typing cat in Password</p>

```text
Use at least 8 characters
```

Put the paragraph below Password. Then, on each `input` in Password, show "Use at least 8 characters" in the hint while `validity.tooShort` is true, and empty it otherwise.

---

## Solution: Password Hint

```js
const password1 = document.getElementById("password1");
const hint = document.getElementById("password-hint");

password1.addEventListener("input", () => {
  if (password1.validity.tooShort) {
    hint.textContent = "Use at least 8 characters";
  } else {
    hint.textContent = "";
  }
});
```

The hint goes away at the eighth character, before we ever click **Sign Up**.

---

# Custom Rules

---

## `setCustomValidity`

```js
// fails, with this message
username.setCustomValidity("Use only letters and numbers");

// its own checks decide again
username.setCustomValidity("");
```

[`setCustomValidity`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity) lets JavaScript fail a control: any message but `""` makes it fail, with that message. It's for rules our attributes can't say, like a username of only letters and numbers, or two boxes that must match.

---

## A Message Blocks Submitting

```js
username.setCustomValidity("Use only letters and numbers");

form.addEventListener("submit", () => {
  console.log("submitted");
});
```

<p class="caption">Page, after clicking Sign Up</p>

```text
Use only letters and numbers
```

<p class="caption">Console</p>

```text

```

While a message is set, **Sign Up** stops just as it does for an empty `required` box, so the `submit` listener never runs.

---

## Problem: Username Characters

```js
const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";

// On each input, if a character of the lowercased username
// is not in allowed, fail it with "Use only letters and numbers".
// Otherwise, clear its message.
```

<p class="caption">Page, after typing ada lovelace in Username and clicking Sign Up</p>

```text
Use only letters and numbers
```

Hint: A [string has `includes`](../12-js-math-dates-strings/lecture.html#36), and `for (const char of "ada")` visits `a`, `d`, then `a`.

---

## Solution: Username Characters

```js
const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";

document.getElementById("username").addEventListener("input", (event) => {
  let valid = true;
  for (const char of event.target.value.toLowerCase()) {
    if (!allowed.includes(char)) {
      valid = false;
      break;
    }
  }
  if (!valid) {
    event.target.setCustomValidity("Use only letters and numbers");
  } else {
    event.target.setCustomValidity("");
  }
});
```

---

## Problem: Confirm Password

<!-- prettier-ignore -->
```html
<label for="password2">Password again</label>
<input id="password2" type="password" required />
```

Add Password again under the hint. On each input in it, set the message "Passwords don't match" while it differs from Password, and clear it otherwise.

<p class="caption">Page, after typing two different passwords and clicking Sign Up</p>

```text
Passwords don't match
```

---

## Solution: Confirm Password

```js
const password2 = document.getElementById("password2");

password2.addEventListener("input", () => {
  if (password2.value !== document.getElementById("password1").value) {
    password2.setCustomValidity("Passwords don't match");
  } else {
    password2.setCustomValidity("");
  }
});
```

Only `password2` listens, so changing the password box afterward doesn't recheck the match.

---

## `customError`

```js
password2.addEventListener("change", () => {
  console.log(password2.validity.customError);
  console.log(password2.validity.valid);
});
```

<p class="caption">Console, after typing two different passwords and leaving the Password again box</p>

```text
true
false
```

A `setCustomValidity` message turns on the [`customError`](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/customError) check in [`validity`](lecture.html#17), so `valid` is `false` like any other failed check.

---

## Can the Server Trust Submitted Form Data?

When the form submits, does the server always get valid data?

---

## No

Anyone can change the webpage in DevTools or send data the server without a browser. Checks in the browser help the user, but the server has to validate everything.

---

## Next Up: Creating a Web API / TypeScript

[Creating a Web API / TypeScript](../17-js-web-api-typescript/lecture.html)
