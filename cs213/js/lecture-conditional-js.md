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
/* What the page showed, one column for each value we tried. */
.runs { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 24px; }
.runs p { margin: 0; }
/* A table on its own, centered across the slide. */
.centered table { margin-left: auto; margin-right: auto; }
/* The theme draws a .demo as a white panel whose 12px edge is a shadow, so the margins keep
   that edge clear of the caption above and the slide's sides. */
.demo { margin: 20px 12px 28px; }
.demo p { margin: 0; }
/* Pieces of the Colan's Coffee page, drawn small inside a .demo. */
.demo .sign { padding: 2px 10px; border-radius: 6px; background-color: dimgray; color: white; }
.demo .card { padding: 4px 12px; border: 4px solid lightgray; border-radius: 8px; }
.demo img { vertical-align: middle; }
</style>

# `if`

Colan Biemer

---

## Working with the DOM

JavaScript changes a webpage through the **DOM** (Document Object Model), e.g.:

```js
document.getElementById("sign").hidden = true;
```

We are going to use lines like this throughout the lecture, but I won't explain how these lines work. Copy them as given, and focus on the JavaScript part for now.

---

# Comparisons

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

## Let's Build Colan's Coffee

Today's exercises build a page for a coffee shop. Its starter has two files on GitHub: [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/if-starter/index.html) and [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/if-starter/practice.js). Set them up in WebStorm, in a new folder:

1. Open each file, and click **Copy raw file**, the copy icon above the code.
2. Paste each one into a new file in WebStorm with the same name.

`index.html` already links to `practice.js` with `<script src="practice.js"></script>`.

---

## Problem (Me): Open Sign

The sign next to the shop's name says `Open`. The shop closes at 6 PM, which is hour 18 on a 24-hour clock. `hour` (`practice.js`, line 1) holds the current hour, from 0 to 23.

In the Open Sign section, hide the sign from hour 18 on, with the page line for Open Sign.

---

## Solution (Me): Open Sign

```js
document.getElementById("sign").hidden = hour >= 18;
```

`hidden` takes a boolean, so the comparison's answer goes straight in. To see the sign at another hour for testing, change `new Date().getHours()` on line 1 to a number, like 20.

---

## Problem (Us): Sold Out

Let's turn off the **Buy** button for the beans when the shop runs out. `bagsLeft` (`practice.js`, line 2) holds how many bags are left.

1. In the Sold Out section, turn off the button when none are left, with the section's page line.
2. How can we test if there are no bags left?

---

## Solution (Us): Sold Out

```js
document.getElementById("buy").disabled = bagsLeft === 0;
```

The last line uses both: `===` asks whether `bagsLeft` is 0, and `=` puts the answer in `disabled`.

---

## Problem (You): Parsons 1

The page calls `parsons1()` from this input:

```html
<input id="age" type="number" oninput="parsons1()" />
```

```js
let age = Number(document.getElementById("age").value);
}
document.getElementById("latte").disabled = age < 12;
function parsons1() {
```

- Assemble the program in the Parsons 1 section of `practice.js`.
- What does `parsons1` do? What should it be named?

---

## Solution (You): Parsons 1

```js
function parsons1() {
  let age = Number(document.getElementById("age").value);

  document.getElementById("latte").disabled = age < 12;
}
```

What does `parsons1` do? What should it be named?

---

## Solution (You): Parsons 1 (Continued)

Drinks with caffeine are for ages 12 and up. Every time the age changes, `parsons1()` turns the latte's **Order** button off for anyone under 12 and on for anyone 12 or older, so `checkAge` would be a better name.

---

# `if` and `else`

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

## Example: Espresso Shots

<div class="side-by-side">
<div>

```js
let shots = 4;
let warning = "";

if (shots > 3) {
  warning = "Too much caffeine!";
}
```

</div>
<div>

| `shots` | `warning`              |
| ------- | ---------------------- |
| 4       | `"Too much caffeine!"` |
| 2       | `""`                   |

</div>
</div>

For 2, `2 > 3` was `false`, so the code inside of the if-statement brackets (`{ ... }`) was never run.

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

## Problem (Me): Open or Closed

A missing sign doesn't tell anyone we're closed. In the Open Sign section, let's replace the `hidden` line with an `if`:

1. Before hour 18, make the sign green.
2. Otherwise, the sign says `Closed` on red, and the page turns gray.

Use the page lines for Open or Closed.

---

## Solution (Me): Open or Closed

```js
if (hour < 18) {
  document.getElementById("sign").style.backgroundColor = "green";
} else {
  document.getElementById("sign").textContent = "Closed";
  document.getElementById("sign").style.backgroundColor = "red";
  document.body.style.backgroundColor = "gray";
}
```

Each block can hold as many lines as we need. `document.body` is the page's `<body>`, so it needs no id.

---

## Problem (Us): Member Name

Let's put the member's name on the rewards card. The card has a name box, and it calls `showName()` every time the name in it changes:

```html
<input id="name" oninput="showName()" />
```

1. In the Member Name section, write the `showName()` function.
2. Inside it, get the name with the section's first page line.
3. If the box is empty, show `Guest`. Otherwise, show their name. The section's second page line shows `Guest`.

---

## Solution (Us): Member Name

```js
function showName() {
  let name = document.getElementById("name").value;

  if (name === "") {
    document.getElementById("member").textContent = "Guest";
  } else {
    document.getElementById("member").textContent = name;
  }
}
```

`""` is an _empty_ string. We could also test with `name.length === 0`.

---

## Problem (You): Low Stock

Let's warn customers when the beans run low. In the Low Stock section:

1. Under 5 bags, the stock line says `Only 3 left!` in orange, with the real count.
2. Otherwise, it says `In stock.`

Use the page lines for Low Stock.

---

## Solution (You): Low Stock

```js
if (bagsLeft < 5) {
  document.getElementById("stock").textContent = `Only ${bagsLeft} left!`;
  document.getElementById("stock").style.color = "orange";
} else {
  document.getElementById("stock").textContent = "In stock.";
}
```

`bagsLeft` already exists on line 2, so there's no second `let`. `Only 0 left!` needs a third choice, which comes next.

---

# `else if`

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

## Example: Cup Sizes

<div class="side-by-side">
<div>

```js
let ounces = 10;
let size;

if (ounces <= 8) {
  size = "Small";
} else if (ounces <= 12) {
  size = "Medium";
} else {
  size = "Large";
}
```

</div>
<div>

![w:530 ounces held 10. Step 1 checked ounces <= 8. 10 <= 8 was false, so JavaScript skipped the block that stored "Small". Step 2 checked ounces <= 12. 10 <= 12 was true, so JavaScript ran the block that stored "Medium". Step 3 skipped the else block, since a check above it was true. size held "Medium".](examples/diagrams/else-if-chain.svg)

</div>
</div>

Reaching the `else if` already means `ounces > 8`, so we don't check it again.

---

## Order Matters

<div class="side-by-side">
<div>

```js
if (ounces <= 12) {
  size = "Medium";
} else if (ounces <= 8) {
  size = "Small";
} else {
  size = "Large";
}
```

</div>
<div>

We swapped the first two checks from Cup Sizes. For a 6-ounce cup, `6 <= 12` was `true`, so JavaScript ran the first block and skipped the rest.

Every number that's `<= 8` is also `<= 12`, so `size` can never be `"Small"`.

</div>
</div>

Put the narrowest check first.

---

## Problem (Me): Reward Levels

Each member gets a badge for their reward points. The rewards card has a points box that starts at 320, and it calls `showRewards()` every time the points in it change:

```html
<input id="points" type="number" value="320" oninput="showRewards()" />
```

1. In the Reward Levels section, write the `showRewards()` function.
2. Inside it, get the points as a number.
3. Set the badge and the color of the card's border, with the page lines for Reward Levels:
   - 500 and up: 🥇 with a `gold` border
   - 200 to 499: 🥈 with a `silver` border
   - Below 200: 🥉 with a `tan` border

---

## Solution (Me): Reward Levels

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function showRewards() {
  let points = Number(document.getElementById("points").value);

  if (points >= 500) {
    document.getElementById("badge").textContent = "🥇";
    document.getElementById("rewards").style.borderColor = "gold";
  } else if (points >= 200) {
    document.getElementById("badge").textContent = "🥈";
    document.getElementById("rewards").style.borderColor = "silver";
  } else {
    document.getElementById("badge").textContent = "🥉";
    document.getElementById("rewards").style.borderColor = "tan";
  }
}

showRewards();
```

---

## Problem (Us): Stock Levels

`Only 0 left!` should say `Sold out.` Let's replace the code in the Low Stock section with three levels:

- 0: `Sold out.` in red, and the bag fades to `0.3` opacity
- 1 to 4: `Only 3 left!` in orange, with the real count
- 5 or more: `In stock.`

Which check should go first? Use the page lines for Stock Levels, in the Low Stock section.

---

## Solution (Us): Stock Levels

```js
if (bagsLeft === 0) {
  document.getElementById("stock").textContent = "Sold out.";
  document.getElementById("stock").style.color = "red";
  document.getElementById("bag").style.opacity = "0.3";
} else if (bagsLeft < 5) {
  document.getElementById("stock").textContent = `Only ${bagsLeft} left!`;
  document.getElementById("stock").style.color = "orange";
} else {
  document.getElementById("stock").textContent = "In stock.";
}
```

`0 < 5` is also `true`, so the `=== 0` check had to come first.

---

## Problem (You): Parsons 2

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
} else (hour >= 18) {
} else {
document.getElementById("greeting").textContent = "Good afternoon! 🌤️";
parsons2();
document.getElementById("greeting").textContent = "Good morning! ☀️";
} else if hour < 18 {
}
function parsons2() {
} else if (hour < 18) {
}
if (hour < 12) {
document.getElementById("greeting").textContent = "Good evening! 🌙";
```

- Assemble the program in the Parsons 2 section of `practice.js`. Two of the lines are wrong.
- What does `parsons2` do? What should it be named?

---

## Solution (You): Parsons 2

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function parsons2() {
  if (hour < 12) {
    document.getElementById("greeting").textContent = "Good morning! ☀️";
  } else if (hour < 18) {
    document.getElementById("greeting").textContent = "Good afternoon! 🌤️";
  } else {
    document.getElementById("greeting").textContent = "Good evening! 🌙";
  }
}

parsons2();
```

<div class="runs">
<div>
<p class="caption">Hour 9</p>
<div class="demo"><p>Good morning! ☀️</p></div>
</div>
<div>
<p class="caption">Hour 14</p>
<div class="demo"><p>Good afternoon! 🌤️</p></div>
</div>
<div>
<p class="caption">Hour 20</p>
<div class="demo"><p>Good evening! 🌙</p></div>
</div>
</div>

It greets the visitor for the time of day, so `showGreeting` would be a better name.

---

# Combining Conditions

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

## Example: Plant Milk

Oat milk and almond milk cost 50 cents extra.

```js
let milk = "oat";
let costsExtra = milk === "oat" || milk === "almond";
```

<div class="centered">

| `milk`     | `costsExtra` |
| ---------- | ------------ |
| `"oat"`    | `true`       |
| `"almond"` | `true`       |
| `"whole"`  | `false`      |

</div>

Each side of `||` needs its own `milk ===`. For `"whole"`, `milk === "oat" || "almond"` gives `"almond"`, not `false`, and an `if` treats that string as `true`, so every milk would cost extra.

---

## Example: Not Sold Out

A customer can order a bag when it's **not** sold out. `bagsLeft` is on line 2 of `practice.js`.

<div class="side-by-side">
<div>

```js
let isSoldOut = bagsLeft === 0;
let canOrder = !isSoldOut;
```

</div>
<div>

| `bagsLeft` | `isSoldOut` | `canOrder` |
| ---------- | ----------- | ---------- |
| 0          | `true`      | `false`    |
| 3          | `false`     | `true`     |

</div>
</div>

`!` flips the boolean right after it, so `!isSoldOut` reads as "not sold out."

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

## Problem (Me): Opening Hours

Our sign says `Open` at 3 AM. The shop opens at 7 and closes at 18. Let's change the condition from Open or Closed, in the Open Sign section:

1. From 7 up to 18, the sign is green.
2. Otherwise, it says `Closed` on red, and the page turns gray.

---

## Solution (Me): Opening Hours

```js
if (hour >= 7 && hour < 18) {
  document.getElementById("sign").style.backgroundColor = "green";
} else {
  document.getElementById("sign").textContent = "Closed";
  document.getElementById("sign").style.backgroundColor = "red";
  document.body.style.backgroundColor = "gray";
}
```

---

## Problem (Us): Free Pastry

Early birds (before hour 9) and Gold members (500 points or more) get a free pastry.

1. At the end of `showRewards()`, in the Reward Levels section, show the pastry note on the rewards card if either rule applies.
2. The note starts out hidden. When neither rule applies, do we need an `else`?

Use the page line for Free Pastry, in the Reward Levels section.

---

## Solution (Us): Free Pastry

```js
function showRewards() {
  // The Reward Levels code stays here.

  if (hour < 9 || points >= 500) {
    document.getElementById("pastry").hidden = false;
  } else {
    document.getElementById("pastry").hidden = true;
  }
}
```

<div class="runs">
<div>
<p class="caption">Hour 8, 40 points</p>
<div class="demo"><div class="card" style="border-color: tan"><p>🥉 Sam</p><p>🥐 Free pastry!</p></div></div>
</div>
<div>
<p class="caption">Hour 14, 650 points</p>
<div class="demo"><div class="card" style="border-color: gold"><p>🥇 Sam</p><p>🥐 Free pastry!</p></div></div>
</div>
<div>
<p class="caption">Hour 14, 40 points</p>
<div class="demo"><div class="card" style="border-color: tan"><p>🥉 Sam</p></div></div>
</div>
</div>

---

## Problem (You): Happy Hour

From 2 PM until 4 PM (hours 14 and 15), lattes are half price.

1. In the Happy Hour section, during happy hour, cross out `$4.50` in red and show `$2.25` in green.
2. Outside happy hour, leave it at `$4.50`.

Use the section's page lines.

---

## Solution (You): Happy Hour

```js
if (hour >= 14 && hour < 16) {
  document.getElementById("latte-price").style.textDecoration = "line-through";
  document.getElementById("latte-price").style.color = "red";
  document.getElementById("happy-price").hidden = false;
}
```

---

## Shortcut: The Ternary Operator

![w:1120 isOpen held hour >= 7 && hour < 18. With the ternary operator, let text = isOpen ? "Open" : "Closed"; had three parts: isOpen was the condition, "Open" was the value if it was true, and "Closed" was the value if it was false. The same choice with if and else declared text, checked if (isOpen), stored "Open" in text when it was true, and stored "Closed" in text when it was false.](examples/diagrams/ternary.svg)

The ternary operator fits an `if`/`else` on one line. _Ternary_ means three parts. Use it when both branches only pick a value; otherwise, use `if` and `else`.

---

## Problem (Me): Parsons 3

<!-- prettier-ignore -->
```js
function parsons3() {
let ordered = false;
}
ordered = !ordered;
document.getElementById("latte").textContent = ordered ? "Cancel" : "Order";
```

- Assemble the program in the Parsons 3 section of `practice.js`.
- What does `parsons3` do? What should it be named?

---

## Solution (Me): Parsons 3

```js
let ordered = false;

function parsons3() {
  ordered = !ordered;
  document.getElementById("latte").textContent = ordered ? "Cancel" : "Order";
}
```

Each click on the latte's **Order** button switches it to `Cancel` and back, so `toggleOrder` would be a better name.

---

## Problem (You): Parsons 4

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
document.getElementById("buy").disabled = isSoldOut;
document.getElementById("stock").textContent = message;
let message = isSoldOut ? "Sold out." : `Only ${bagsLeft} left!`;
document.getElementById("bag").style.opacity = isSoldOut ? "0.3" : "1";
let isSoldOut = bagsLeft === 0;
}
document.getElementById("stock").style.color = isSoldOut ? "red" : "orange";
function parsons4() {
bagsLeft = bagsLeft - 1;
```

- Assemble the program in the Parsons 4 section of `practice.js`.
- What does `parsons4` do? What should it be named?

---

## Solution (You): Parsons 4

```js
function parsons4() {
  bagsLeft = bagsLeft - 1;
  let isSoldOut = bagsLeft === 0;
  let message = isSoldOut ? "Sold out." : `Only ${bagsLeft} left!`;
  document.getElementById("stock").textContent = message;
  document.getElementById("stock").style.color = isSoldOut ? "red" : "orange";
  document.getElementById("bag").style.opacity = isSoldOut ? "0.3" : "1";
  document.getElementById("buy").disabled = isSoldOut;
}
```

Each click on **Buy** takes away a bag and updates the stock line, the bag's fade, and the button, so `buyBag` would be a better name.

---

# Conclusion

---

## The Finished Page

- [Colan's Coffee](https://bi3mer.github.io/lectures/cs213/js/examples/if-final/), running live.
- [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/if-final/practice.js) on GitHub.

The HTML is the same as the starter's `index.html`, and `practice.js` starts with the starter's code. The page uses the real hour, so to see another time of day, change `new Date().getHours()` to a number, like 20.

---

## Summary

- A comparison gives a boolean: `true` or `false`.
- Compare with `===` and `!==`, and turn what the user types into a number first.
- `if` runs its block when the condition is `true`, and `else` runs when it's `false`.
- `else if` checks from top to bottom and runs only the first match, so order matters.
- `&&` needs both sides `true`, `||` needs one, and `!` flips a boolean.
- A range takes two comparisons: `hour >= 7 && hour < 18`.
- `condition ? a : b` picks between two values on one line.
