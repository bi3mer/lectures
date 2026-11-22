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

Our sign-up form starts with one box. Click **Sign Up** with Username empty, and the form still sends.

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

[`maxlength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/maxlength) stops typing at 12 characters, and [`minlength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/minlength) fails a value under 3. Both pass an empty box, unless it's also `required`.

---

## Types That Check Themselves

<!-- prettier-ignore -->
```html
<label for="email">Email</label>
<input id="email" type="email" required />
```

<p class="caption">Page</p>
<form class="demo signup" onsubmit="return false"><label for="demo9-username">Username</label> <input id="demo9-username" required minlength="3" maxlength="12" /> <label for="demo9-email">Email</label> <input id="demo9-email" type="email" required /> <button>Sign Up</button></form>

An [`email` box](../13-js-forms-dom/lecture.html#6) fails without a name, an `@`, and a domain, but the domain needs no dot, so `ada@school` passes. A `number` box fails outside its [`min` and `max`](../13-js-forms-dom/lecture.html#8).

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

An age is an amount, so a `number` box with `min` and `max` fits.

---

## Problem: Password

<!-- prettier-ignore -->
```html
<label for="password">Password</label>
<input id="password" type="password" />
```

```text
add Password under Age
make it required, with at least 8 characters
```

---

## Solution: Password

```html
<input id="password" type="password" required minlength="8" />
```

The `:user-invalid` rule already covers every box, so a short password turns red once we leave it.

---

# Custom Rules

---

## `setCustomValidity`

<!-- prettier-ignore -->
```js
const email = document.getElementById("email");
email.setCustomValidity("Use your school email"); // fails, with this message
email.setCustomValidity("");                      // its own checks decide again
```

[`setCustomValidity`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity) lets JavaScript fail a control: any message but `""` makes it fail, with that message. It's for rules HTML can't say, like a username that's taken, or two boxes that must match.

---

## Problem: Taken Username

```js
// On each input, fail a username in ["ada", "grace", "alan"]
// with "That username is taken".
```

<p class="caption">Page, after typing ada in Username and clicking Sign Up</p>

```text
That username is taken
```

- [Arrays have `includes`](../11-js-arrays/lecture.html#21).
- What happens without the `else`?

---

## Solution: Taken Username

```js
const taken = ["ada", "grace", "alan"];

document.getElementById("username").addEventListener("input", (event) => {
  if (taken.includes(event.target.value)) {
    event.target.setCustomValidity("That username is taken");
  } else {
    event.target.setCustomValidity("");
  }
});
```

Without the `else`, the message set at `ada` never clears, so **Username** fails even after we type `ada99`.

---

## Problem: Confirm Password

<!-- prettier-ignore -->
```html
<label for="again">Password again</label>
<input id="again" type="password" required />
```

```text
add Password again under Password

when something is typed in the again box
  if its value is different from the password box's
    set its message to "Passwords don't match"
  else
    clear its message
```

<p class="caption">Page, after typing two different passwords and clicking Sign Up</p>

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
