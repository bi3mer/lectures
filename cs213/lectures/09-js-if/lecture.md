---
marp: true
theme: lecture
paginate: true
---

<style>
/* Code on the left, the values it gave on the right. */
.side-by-side { display: grid; grid-template-columns: 560px minmax(0, 1fr); gap: 24px; align-items: start; }
.side-by-side p { margin: 0; }
.caption { font-size: 20px; color: var(--secondary); }
/* A table on its own, centered across the slide. */
.centered table { margin-left: auto; margin-right: auto; }
</style>

# `if`

Colan Biemer

---

# Comparisons

---

## Every Line Runs

```js
let score = 45;
console.log("You passed!");
```

Every program so far runs every line, from top to bottom, so a 45 still passes. How can a program decide what to do?

---

## Yes-or-No Questions

A program makes decisions by asking yes-or-no questions. Is the order at least \$50? Did the user leave the password box empty?

The answer is a **boolean**: `true` or `false`. A variable can hold it, like any other value:

```js
let total = 60;
let freeShipping = total >= 50; // true
```

---

## Comparison Operators

| Operator | Meaning               | Example   | Gives   |
| -------- | --------------------- | --------- | ------- |
| `===`    | equal                 | `5 === 5` | `true`  |
| `!==`    | not equal             | `5 !== 5` | `false` |
| `<`      | less than             | `3 < 5`   | `true`  |
| `>`      | greater than          | `3 > 5`   | `false` |
| `<=`     | less than or equal    | `5 <= 5`  | `true`  |
| `>=`     | greater than or equal | `4 >= 5`  | `false` |

A comparison always gives a boolean.

`=` is already taken, so why three equals signs?

---

## `=` vs. `===`

`=` **puts** a value in a variable. `===` **asks** whether two values are equal, and gives back `true` or `false`.

```js
let a = 5;
let isFive = a === 5; // true
```

The second line has both: `===` asked the question, and `=` put the answer in `isFive`.

---

## Where Is `==`? Why `===`?

| Year | What Happened                                                                                                                                                       |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1995 | Netscape programmers asked for `"404" == 404` to be `true`, since web servers send numbers as strings. Brendan Eich made `==` change both sides to the same type.   |
| 1997 | Programmers found those rules confusing, so Eich took most of them out. The standards committee kept the old `==`, since changing it would break existing websites. |
| 1997 | Microsoft added `===` and `!==` to Internet Explorer 4. They never change types.                                                                                    |
| 1999 | `===` and `!==` joined the official JavaScript standard.                                                                                                            |

<p class="caption">Source: Allen Wirfs-Brock and Brendan Eich, <a href="https://doi.org/10.1145/3386327">"JavaScript: The First 20 Years"</a> (2020)</p>

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
    <script src="practice.js"></script>
  </body>
</html>
```

`practice.js` starts empty. Open the page and its console, and clear `practice.js` before each problem.

---

## Problem: Passed (us)

```js
let score = 72;
// Store whether score is 60 or more in passed, then print it.
```

<p class="caption">Console</p>

```text
true
```

- Which comparison operator do we need?
- What type of value does it give?

---

## Solution: Passed (us)

```js
let score = 72;
let passed = score >= 60;
console.log(passed);
```

`>=` asks the question, and `=` stores the answer.

---

## Pseudocode

**Pseudocode** is a plan for a program, written in plain English but laid out like code. Your problems use it.

<div class="side-by-side">
<div>

<p class="caption">Pseudocode</p>

```text
set first to "Ada"
print first
```

</div>
<div>

<p class="caption">JavaScript</p>

```js
let first = "Ada";
console.log(first);
```

</div>
</div>

Pseudocode drops the `let`, `;`, and `( )`. We write the plan first, then turn each line into code.

---

## Problem: Same Name (you)

```text
set first to "Ada"
set second to "Grace"
set same to whether first and second are equal
print same
```

<p class="caption">Console</p>

```text
false
```

---

## Solution: Same Name (you)

```js
let first = "Ada";
let second = "Grace";
let same = first === second;
console.log(same);
```

`===` compares strings as well as numbers.

---

# `if` and `else`

---

## Knowing Is Not Enough

```js
let score = 45;
let passed = score >= 60; // false
console.log("You passed!");
```

`passed` holds the right answer, but the last line runs anyway. How do we run a line only when something is `true`?

---

## `if`

```js
if (condition) {
  // runs only when condition is true
}
```

- The condition goes in `( )`, and the code to run goes in `{ }`.
- When the condition is `true`, the code inside runs. When it's `false`, JavaScript skips that code.
- As with a function, the code inside is indented, and there's no `;` after the `}`.

---

## Example: Passing Score

<div class="side-by-side">
<div>

```js
let score = 45;
let warning = "";

if (score < 60) {
  warning = "Below passing";
}
```

</div>
<div>

| `score` | `warning`         |
| ------- | ----------------- |
| 45      | `"Below passing"` |
| 80      | `""`              |

</div>
</div>

For 80, `80 < 60` was `false`, so the code inside of the if-statement brackets (`{ ... }`) was never run.

---

## Two Questions

```js
if (score >= 60) {
  console.log("Pass");
}

if (score < 60) {
  console.log("Fail");
}
```

These two checks ask the same question twice. How do we say "otherwise"?

---

## `else`

<div class="side-by-side">
<div>

```js
let total = 60;
let shipping;

if (total >= 50) {
  shipping = "free";
} else {
  shipping = "$5";
}
```

</div>
<div>

| `total` | `shipping` |
| ------- | ---------- |
| 60      | `"free"`   |
| 20      | `"$5"`     |

</div>
</div>

`else` runs when the condition is `false`. Exactly one of the two blocks runs, every time.

---

## Problem: Even or Odd (us)

```js
let number = 7;
// Print "even" if number is even. Otherwise, print "odd".
```

<p class="caption">Console</p>

```text
odd
```

- How can the [remainder](../08-js-intro/lecture.html#72) tell us?

---

## Solution: Even or Odd (us)

```js
let number = 7;

if (number % 2 === 0) {
  console.log("even");
} else {
  console.log("odd");
}
```

An even number has a remainder of 0 when divided by 2.

---

## Problem: Guest (you)

```text
set name to ""
if name is empty
  print "Guest"
else
  print name
```

<p class="caption">Console</p>

```text
Guest
```

---

## Solution: Guest (you)

```js
let name = "";

if (name === "") {
  console.log("Guest");
} else {
  console.log(name);
}
```

`""` is an _empty_ string. We could also test with `name.length === 0`.

---

# `else if`

---

## Only Two Paths

```js
if (score >= 80) {
  grade = "A";
} else {
  grade = "F";
}
```

`if` and `else` give two paths, but a 75 is neither an A nor an F. How do we choose from three?

---

## More Than Two Choices

```js
if (firstCondition) {
  // runs when firstCondition is true
} else if (secondCondition) {
  // runs when firstCondition is false and secondCondition is true
} else {
  // runs when both are false
}
```

JavaScript checks the conditions from top to bottom. It runs the block under the first `true` condition and skips the rest. We can add as many `else if`s as we need, and the `else` at the end is optional.

---

## Example: Letter Grades

<div class="side-by-side">
<div>

```js
let score = 75;
let grade;

if (score < 60) {
  grade = "F";
} else if (score < 80) {
  grade = "C";
} else {
  grade = "A";
}
```

</div>
<div>

![w:530 score held 75. Step 1 checked score < 60. 75 < 60 was false, so JavaScript skipped the block that stored "F". Step 2 checked score < 80. 75 < 80 was true, so JavaScript ran the block that stored "C". Step 3 skipped the else block, since a check above it was true. grade held "C".](examples/diagrams/else-if-chain.svg)

</div>
</div>

Reaching the `else if` already means `score >= 60`, so we don't check it again.

---

## Order Matters

<div class="side-by-side">
<div>

```js
if (score < 80) {
  grade = "C";
} else if (score < 60) {
  grade = "F";
} else {
  grade = "A";
}
```

</div>
<div>

We swapped the first two checks from Letter Grades. For a score of 40, `40 < 80` was `true`, so JavaScript ran the first block and skipped the rest.

Every number that's `< 60` is also `< 80`, so `grade` can never be `"F"`.

</div>
</div>

Put the narrowest check first.

---

## Problem: Weather (us)

```js
let temperature = 75;
// Below 50, print "Cold". Below 80, print "Warm". Otherwise, print "Hot".
```

<p class="caption">Console</p>

```text
Warm
```

- Which check should go first?

---

## Solution: Weather (us)

```js
let temperature = 75;

if (temperature < 50) {
  console.log("Cold");
} else if (temperature < 80) {
  console.log("Warm");
} else {
  console.log("Hot");
}
```

Reaching the `else if` already means `temperature` is 50 or more.

---

## Problem: Sign of a Number (you)

```text
set number to -4
if number is above 0
  print "positive"
else if number is below 0
  print "negative"
else
  print "zero"
```

<p class="caption">Console</p>

```text
negative
```

---

## Solution: Sign of a Number (you)

```js
let number = -4;

if (number > 0) {
  console.log("positive");
} else if (number < 0) {
  console.log("negative");
} else {
  console.log("zero");
}
```

The `else` catches the one number left: 0.

---

# Combining Conditions

---

## One Question Inside Another

```js
if (score >= 90) {
  if (absences < 3) {
    console.log("Honor roll");
  }
}
```

Each new rule adds another level, and an `else` would need to go in both. How do we ask two questions at once?

---

## Logical Operators

- `a && b`: **and**, `true` when both are `true`
- `a || b`: **or**, `true` when at least one is `true`
- `!a`: **not**, `true` becomes `false` and `false` becomes `true`

Each side of `&&` and `||` is a full comparison, like `total >= 10`, or a boolean.

---

## And: `&&`

<div class="centered">

| `a`     | `b`     | `a && b` |
| ------- | ------- | -------- |
| `true`  | `true`  | `true`   |
| `true`  | `false` | `false`  |
| `false` | `true`  | `false`  |
| `false` | `false` | `false`  |

</div>

`&&` gives `true` only when both sides are `true`.

---

## Or: `||`

<div class="centered">

| `a`     | `b`     | `a \|\| b` |
| ------- | ------- | ---------- |
| `true`  | `true`  | `true`     |
| `true`  | `false` | `true`     |
| `false` | `true`  | `true`     |
| `false` | `false` | `false`    |

</div>

`||` gives `false` only when both sides are `false`.

---

## Not: `!`

<div class="centered">

| `a`     | `!a`    |
| ------- | ------- |
| `true`  | `false` |
| `false` | `true`  |

</div>

---

## Example: Member Discount

To get 10% off, a customer has to spend at least \$10 **and** be a member.

```js
let total = 8;
let isMember = true;
let getsDiscount = total >= 10 && isMember;
```

<div class="centered">

| `total` | `isMember` | `getsDiscount` |
| ------- | ---------- | -------------- |
| 8       | `true`     | `false`        |
| 12      | `true`     | `true`         |
| 12      | `false`    | `false`        |

</div>

---

## Example: Vowels

Say we only care about two letters, `a` and `e`.

```js
let letter = "a";
let isMatch = letter === "a" || letter === "e";
```

<div class="centered">

| `letter` | `isMatch` |
| -------- | --------- |
| `"a"`    | `true`    |
| `"e"`    | `true`    |
| `"z"`    | `false`   |

</div>

Each side of `||` needs its own `letter ===`. For `"z"`, `letter === "a" || "e"` gives `"e"`, not `false`, and an `if` treats that string as `true`, so every letter would match.

---

## Example: Not Failing

A student passes when they are **not** failing.

<div class="side-by-side">
<div>

```js
let isFailing = score < 60;
let passed = !isFailing;
```

</div>
<div>

| `score` | `isFailing` | `passed` |
| ------- | ----------- | -------- |
| 45      | `true`      | `false`  |
| 80      | `false`     | `true`   |

</div>
</div>

`!` flips the boolean right after it, so `!isFailing` reads as "not failing."

---

## A Range in One Step

In math class, 13 ≤ age ≤ 19 means "from 13 to 19." In JavaScript, it lets 45 through:

<div class="side-by-side">
<div>

```js
let age = 45;
let isTeen = 13 <= age <= 19; // true
```

<p class="caption">Fixed</p>

```js
let isTeen = age >= 13 && age <= 19;
```

</div>
<div>

![w:530 age held 45. Step 1 had 13 <= 45 <= 19. JavaScript went left to right, so 13 <= 45 ran first. In step 2, 13 <= 45 was true, which gave true <= 19. In step 3, JavaScript counted true as 1 next to a number, which gave 1 <= 19. In step 4, 1 <= 19 was true, so 45 passed the check.](examples/diagrams/range-gotcha.svg)

</div>
</div>

A range takes two comparisons, joined with `&&`.

---

## Problem: Honor Roll (us)

```js
let score = 95;
let absences = 1;
// With a score of 90 or more and under 3 absences, print "Honor roll".
// Otherwise, print "Keep going".
```

<p class="caption">Console</p>

```text
Honor roll
```

- Do we need `&&` or `||`?

---

## Solution: Honor Roll (us)

```js
let score = 95;
let absences = 1;

if (score >= 90 && absences < 3) {
  console.log("Honor roll");
} else {
  console.log("Keep going");
}
```

Both rules have to hold, so we join them with `&&`.

---

## Problem: Weekend (you)

```text
set day to "Sunday"
if day is "Saturday" or day is "Sunday"
  print "Weekend"
else
  print "Weekday"
```

<p class="caption">Console</p>

```text
Weekend
```

---

## Solution: Weekend (you)

```js
let day = "Sunday";

if (day === "Saturday" || day === "Sunday") {
  console.log("Weekend");
} else {
  console.log("Weekday");
}
```

Each side of `||` needs its own `day ===`.

---

## Five Lines for One Word

```js
let result;

if (score >= 60) {
  result = "Pass";
} else {
  result = "Fail";
}
```

All of this picks one of two values. Is there a shorter way?

---

## Shortcut: The Ternary Operator

![w:1120 isOpen held hour >= 7 && hour < 18. With the ternary operator, let text = isOpen ? "Open" : "Closed"; had three parts: isOpen was the condition, "Open" was the value if it was true, and "Closed" was the value if it was false. The same choice with if and else declared text, checked if (isOpen), stored "Open" in text when it was true, and stored "Closed" in text when it was false.](examples/diagrams/ternary.svg)

The ternary operator fits an `if`/`else` on one line. _Ternary_ means three parts. Use it when both branches only pick a value; otherwise, use `if` and `else`.

---

## Problem: Pass or Fail (you)

```text
set score to 72
set result to "Pass" if score is 60 or more, otherwise "Fail"
print result
```

<p class="caption">Console</p>

```text
Pass
```

Use the ternary operator.

---

## Solution: Pass or Fail (you)

```js
let score = 72;
let result = score >= 60 ? "Pass" : "Fail";
console.log(result);
```

Both branches only pick a value, so the ternary fits.

---

# Conclusion

---

## Build It Yourself

[Colan's Coffee](../../demos/09-coffee/instruction.html) is a full page built from today's `if` statements, with step-by-step instructions.

---

## Summary

- A comparison gives a boolean: `true` or `false`.
- Compare with `===` and `!==`, and turn what the user types into a number first.
- `if` runs its block when the condition is `true`, and `else` runs when it's `false`.
- `else if` checks from top to bottom and runs only the first match, so order matters.
- `&&` needs both sides `true`, `||` needs one, and `!` flips a boolean.
- A range takes two comparisons: `age >= 13 && age <= 19`.
- `condition ? a : b` picks between two values on one line.

---

## Next Up: Objects and Loops

[Objects and Loops](../10-js-objects-loops/lecture.html) groups related values together and repeats code.
