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
/* What the page showed, one column for each answer the user typed. */
.runs { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 24px; }
.runs p { margin: 0; }
/* The theme draws a .demo as a white panel whose 12px edge is a shadow, so the margins keep
   that edge clear of the caption above and the slide's sides. */
.demo { margin: 20px 12px 28px; }
.demo p { margin: 0; }
</style>

# `if` Statements

Colan Biemer

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

`"21" === 21` is `false`, so we turn `prompt` answers into numbers before comparing them.

---

## Let's Write a Program

Open [if-starter.html](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/if-starter.html) on GitHub and set it up in WebStorm:

- Click **Copy raw file**, the copy icon above the code.
- Paste it into a new HTML file in WebStorm.

Our code goes in its `<script>`. Each problem gives us the lines that change the page.

---

## Problem (Me): Caffeine

Every coffee on our menu has caffeine, except `decaf`.

1. Ask which coffee the user wants.
2. Check whether it has caffeine.
3. Show `Has caffeine: true` on the page, with the real answer.

Use this line to change the page:

```js
document.getElementById("message").textContent = "Has caffeine: true";
```

---

## Solution (Me): Caffeine

```js
let coffee = prompt("Which coffee?");
let hasCaffeine = coffee !== "decaf";

document.getElementById("message").textContent = `Has caffeine: ${hasCaffeine}`;
```

<div class="runs">
<div>
<p class="caption">Typed latte</p>
<div class="demo"><p>Has caffeine: true</p></div>
</div>
<div>
<p class="caption">Typed decaf</p>
<div class="demo"><p>Has caffeine: false</p></div>
</div>
<div>
<p class="caption">Typed Decaf</p>
<div class="demo"><p>Has caffeine: true</p></div>
</div>
</div>

We compared the answer with a string, so there's no `Number()`. `Decaf` got `true`, since `!==` treats capital letters as different.

---

## Problem (Us): Today's Number

Anyone who guesses today's number, 7, gets a free coffee. Let's ask for a guess, then show `Free coffee: true`, with the real answer.

1. Ask for a guess.
2. Check whether the guess is 7. What happens if we skip `Number()`?
3. Show the answer on the page.

Use this line to change the page:

```js
document.getElementById("message").textContent = "Free coffee: true";
```

---

## Solution (Us): Today's Number

```js
let guess = Number(prompt("Guess today's number:"));
let getsFreeCoffee = guess === 7;

document.getElementById("message").textContent = `Free coffee: ${getsFreeCoffee}`;
```

<div class="runs">
<div>
<p class="caption">Typed 7</p>
<div class="demo"><p>Free coffee: true</p></div>
</div>
<div>
<p class="caption">Typed 3</p>
<div class="demo"><p>Free coffee: false</p></div>
</div>
</div>

Without `Number()`, typing 7 shows `Free coffee: false`, since `"7" === 7` is `false`.

---

## Problem (You): Can You Vote?

You can vote at 18 or older.

1. Ask the user's age, and turn the answer into a number.
2. Check whether they're old enough to vote.
3. Show `Can vote: true` on the page, with the real answer.

Use this line to change the page:

```js
document.getElementById("message").textContent = "Can vote: true";
```

---

## Solution (You): Can You Vote?

```js
let age = Number(prompt("How old are you?"));
let canVote = age >= 18;

document.getElementById("message").textContent = `Can vote: ${canVote}`;
```

<div class="runs">
<div>
<p class="caption">Typed 25</p>
<div class="demo"><p>Can vote: true</p></div>
</div>
<div>
<p class="caption">Typed 18</p>
<div class="demo"><p>Can vote: true</p></div>
</div>
<div>
<p class="caption">Typed 15</p>
<div class="demo"><p>Can vote: false</p></div>
</div>
</div>

`>=` let 18 through. With `>`, an 18-year-old would see `Can vote: false`.

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

## Example: Low Stock

<div class="side-by-side">
<div>

```js
let bagsLeft = Number(prompt("Bags left?"));
let warning = "";

if (bagsLeft < 5) {
  warning = "Running low!";
}
```

</div>
<div>

| Typed | `warning`        |
| ----- | ---------------- |
| 3     | `"Running low!"` |
| 12    | `""`             |

</div>
</div>

For 12, `12 < 5` was `false`, so JavaScript skipped the block, and `warning` stayed `""`.

---

## `else`

<div class="side-by-side">
<div>

```js
let total = Number(prompt("Order total?"));
let shipping;

if (total >= 50) {
  shipping = "free";
} else {
  shipping = "$5";
}
```

</div>
<div>

| Typed | `shipping` |
| ----- | ---------- |
| 60    | `"free"`   |
| 20    | `"$5"`     |

</div>
</div>

`else` runs when the condition is `false`. Exactly one of the two blocks runs, every time.

---

## Problem (Me): Open or Closed

The coffee shop closes at 6 PM, which is hour 18 on a 24-hour clock.

1. Ask what hour it is (0 to 23), and turn the answer into a number.
2. Before hour 18, show `We're open!` in green.
3. Otherwise, show `Sorry, we're closed.` in red.

Use these lines to change the page:

```js
document.getElementById("message").textContent = "We're open!";
document.getElementById("message").style.color = "green";
```

---

## Solution (Me): Open or Closed

```js
let hour = Number(prompt("What hour is it?"));

if (hour < 18) {
  document.getElementById("message").textContent = "We're open!";
  document.getElementById("message").style.color = "green";
} else {
  document.getElementById("message").textContent = "Sorry, we're closed.";
  document.getElementById("message").style.color = "red";
}
```

<div class="runs">
<div>
<p class="caption">Typed 9</p>
<div class="demo"><p style="color: green">We're open!</p></div>
</div>
<div>
<p class="caption">Typed 18</p>
<div class="demo"><p style="color: red">Sorry, we're closed.</p></div>
</div>
<div>
<p class="caption">Typed 20</p>
<div class="demo"><p style="color: red">Sorry, we're closed.</p></div>
</div>
</div>

Each block can hold as many lines as we need.

---

## Problem (Us): Even or Odd

Let's ask the user for a whole number, then say whether it's even or odd, like `7 is odd.`

1. Ask for a number, and turn the answer into a number.
2. How can we tell that a number is even? (Hint: remember splitting the cookies?)
3. Show the sentence on the page, with the real number.

Use this line to change the page:

```js
document.getElementById("message").textContent = "7 is odd.";
```

---

## Solution (Us): Even or Odd

```js
let number = Number(prompt("Whole number?"));

if (number % 2 === 0) {
  document.getElementById("message").textContent = `${number} is even.`;
} else {
  document.getElementById("message").textContent = `${number} is odd.`;
}
```

<div class="runs">
<div>
<p class="caption">Typed 8</p>
<div class="demo"><p>8 is even.</p></div>
</div>
<div>
<p class="caption">Typed 7</p>
<div class="demo"><p>7 is odd.</p></div>
</div>
</div>

An even number leaves no remainder when divided by 2. `%` runs before `===`, so JavaScript worked out `number % 2` first, then compared the result with `0`.

---

## Problem (You): Logging In

In our first lecture, the browser had to send the login form to the server just to find out the password box was empty. Now the page can check that itself.

1. Ask the user for their password.
2. If they left it empty, show `Please enter a password.` in red.
3. Otherwise, show `Logging in...`.

Use these lines to change the page:

```js
document.getElementById("message").textContent = "Logging in...";
document.getElementById("message").style.color = "red";
```

---

## Solution (You): Logging In

```js
let password = prompt("Password?");

if (password === "") {
  document.getElementById("message").textContent = "Please enter a password.";
  document.getElementById("message").style.color = "red";
} else {
  document.getElementById("message").textContent = "Logging in...";
}
```

<div class="runs">
<div>
<p class="caption">Left it empty</p>
<div class="demo"><p style="color: red">Please enter a password.</p></div>
</div>
<div>
<p class="caption">Typed latte123</p>
<div class="demo"><p>Logging in...</p></div>
</div>
</div>

We compared the answer with a string, so there's no `Number()` this time. What if the user clicks **Cancel**? We'll come back to that.

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
let ounces = Number(prompt("Ounces?"));
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

![w:530 The user typed 10, so ounces held 10. Step 1 checked ounces <= 8. 10 <= 8 was false, so JavaScript skipped the block that stored "Small". Step 2 checked ounces <= 12. 10 <= 12 was true, so JavaScript ran the block that stored "Medium". Step 3 skipped the else block, since a check above it was true. size held "Medium".](examples/diagrams/else-if-chain.svg)

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

Our coffee shop gives each member a level, based on their reward points. Ask for the member's points, then show their level on its background color:

- 500 and up: `Gold member` on `gold`
- 200 to 499: `Silver member` on `silver`
- Below 200: `Bronze member` on `tan`

Use these lines to change the page:

```js
document.getElementById("message").textContent = "Gold member";
document.getElementById("message").style.backgroundColor = "gold";
```

---

## Solution (Me): Reward Levels

```js
let points = Number(prompt("Reward points?"));

if (points >= 500) {
  document.getElementById("message").textContent = "Gold member";
  document.getElementById("message").style.backgroundColor = "gold";
} else if (points >= 200) {
  document.getElementById("message").textContent = "Silver member";
  document.getElementById("message").style.backgroundColor = "silver";
} else {
  document.getElementById("message").textContent = "Bronze member";
  document.getElementById("message").style.backgroundColor = "tan";
}
```

<div class="runs">
<div>
<p class="caption">Typed 650</p>
<div class="demo"><p style="background-color: gold">Gold member</p></div>
</div>
<div>
<p class="caption">Typed 320</p>
<div class="demo"><p style="background-color: silver">Silver member</p></div>
</div>
<div>
<p class="caption">Typed 40</p>
<div class="demo"><p style="background-color: tan">Bronze member</p></div>
</div>
</div>

---

## Problem (Us): Stock Levels

Let's improve the low-stock warning from earlier. Ask how many bags are left, then show:

- 0: `Sold out.` in red
- 1 to 4: `Only 3 left!`, with the real count
- 5 or more: `In stock.`

Which check should go first? Use these lines to change the page:

```js
document.getElementById("message").textContent = "Sold out.";
document.getElementById("message").style.color = "red";
```

---

## Solution (Us): Stock Levels

```js
let bagsLeft = Number(prompt("Bags left?"));

if (bagsLeft === 0) {
  document.getElementById("message").textContent = "Sold out.";
  document.getElementById("message").style.color = "red";
} else if (bagsLeft < 5) {
  document.getElementById("message").textContent = `Only ${bagsLeft} left!`;
} else {
  document.getElementById("message").textContent = "In stock.";
}
```

<div class="runs">
<div>
<p class="caption">Typed 0</p>
<div class="demo"><p style="color: red">Sold out.</p></div>
</div>
<div>
<p class="caption">Typed 3</p>
<div class="demo"><p>Only 3 left!</p></div>
</div>
<div>
<p class="caption">Typed 12</p>
<div class="demo"><p>In stock.</p></div>
</div>
</div>

`0 < 5` is also `true`, so the `=== 0` check had to come first.

---

## Problem (You): A Greeting

Show `Good morning!` before hour 12, `Good afternoon!` before hour 18, and `Good evening!` after that.

```js
} else if (hour < 18) {
  document.getElementById("message").textContent = "Good evening!";
let hour = Number(prompt("What hour is it?"));
} else (hour >= 18) {
  document.getElementById("message").textContent = "Good morning!";
}
if (hour < 12) {
  document.getElementById("message").textContent = "Good afternoon!";
} else if hour < 18 {
} else {
```

Assemble the program from the lines above. Two of the lines are wrong.

---

## Solution (You): A Greeting

```js
let hour = Number(prompt("What hour is it?"));

if (hour < 12) {
  document.getElementById("message").textContent = "Good morning!";
} else if (hour < 18) {
  document.getElementById("message").textContent = "Good afternoon!";
} else {
  document.getElementById("message").textContent = "Good evening!";
}
```

<div class="runs">
<div>
<p class="caption">Typed 9</p>
<div class="demo"><p>Good morning!</p></div>
</div>
<div>
<p class="caption">Typed 14</p>
<div class="demo"><p>Good afternoon!</p></div>
</div>
<div>
<p class="caption">Typed 20</p>
<div class="demo"><p>Good evening!</p></div>
</div>
</div>

`else` never takes a condition, and every condition needs parentheses.

---

# Combining Conditions

---

## Logical Operators

- `a && b`: **and**, `true` when both are `true`
- `a || b`: **or**, `true` when at least one is `true`
- `!a`: **not**, `true` becomes `false` and `false` becomes `true`

Each side of `&&` and `||` is a full comparison, like `age >= 25`, or a boolean.

---

## Example: Renting a Car

To rent a car, you need to be at least 25 **and** have a license.

<div class="side-by-side">
<div>

```js
let age = 22;
let hasLicense = true;
let canRent = age >= 25 && hasLicense;
```

</div>
<div>

| `age` | `hasLicense` | `canRent` |
| ----- | ------------ | --------- |
| 22    | `true`       | `false`   |
| 30    | `true`       | `true`    |
| 30    | `false`      | `false`   |

</div>
</div>

`&&` gives `true` only when both sides are `true`. `hasLicense` already holds a boolean, so it works as a condition by itself.

---

## Example: Empty or Cancel

Clicking **Cancel** on a `prompt` gives `null`, which isn't `""`, so our login check let it through. With `||`, one condition covers both:

```js
let password = prompt("Password?");
let isMissing = password === "" || password === null;
```

| The user           | `password`   | `isMissing` |
| ------------------ | ------------ | ----------- |
| left it empty      | `""`         | `true`      |
| clicked **Cancel** | `null`       | `true`      |
| typed latte123     | `"latte123"` | `false`     |

---

## Example: Not Sold Out

A customer can order a bag when it's **not** sold out.

<div class="side-by-side">
<div>

```js
let bagsLeft = 3;
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

## Problem (Me): Open or Closed, Again

Our page from earlier said `We're open!` at 3 AM. The shop opens at 7 and closes at 18.

1. Ask what hour it is, and turn the answer into a number.
2. From 7 up to 18, show `We're open!` in green.
3. Otherwise, show `Sorry, we're closed.` in red.

Use these lines to change the page:

```js
document.getElementById("message").textContent = "We're open!";
document.getElementById("message").style.color = "green";
```

---

## Solution (Me): Open or Closed, Again

```js
let hour = Number(prompt("What hour is it?"));

if (hour >= 7 && hour < 18) {
  document.getElementById("message").textContent = "We're open!";
  document.getElementById("message").style.color = "green";
} else {
  document.getElementById("message").textContent = "Sorry, we're closed.";
  document.getElementById("message").style.color = "red";
}
```

<div class="runs">
<div>
<p class="caption">Typed 3</p>
<div class="demo"><p style="color: red">Sorry, we're closed.</p></div>
</div>
<div>
<p class="caption">Typed 9</p>
<div class="demo"><p style="color: green">We're open!</p></div>
</div>
<div>
<p class="caption">Typed 20</p>
<div class="demo"><p style="color: red">Sorry, we're closed.</p></div>
</div>
</div>

Only the condition changed. 3 failed `hour >= 7`, and 20 failed `hour < 18`.

---

## Problem (Us): Free Shipping

Remember shipping from `else`? Orders of \$50 or more still ship free, and now members ship free too.

1. Ask for the order total, and turn it into a number.
2. Ask `Member? (yes/no)`.
3. If either rule applies, show `Free shipping!`. Otherwise, show `Shipping is $5.`

Use this line to change the page:

```js
document.getElementById("message").textContent = "Free shipping!";
```

---

## Solution (Us): Free Shipping

```js
let total = Number(prompt("Order total?"));
let isMember = prompt("Member? (yes/no)") === "yes";

if (total >= 50 || isMember) {
  document.getElementById("message").textContent = "Free shipping!";
} else {
  document.getElementById("message").textContent = "Shipping is $5.";
}
```

<div class="runs">
<div>
<p class="caption">Typed 20, then yes</p>
<div class="demo"><p>Free shipping!</p></div>
</div>
<div>
<p class="caption">Typed 20, then no</p>
<div class="demo"><p>Shipping is $5.</p></div>
</div>
</div>

`isMember` stored the answer to `=== "yes"`, a boolean. Typing `Yes` gives `false`, since `===` treats capital letters as different.

---

## Problem (You): Order Limits

Each order must be 1 to 10 bags.

1. Ask how many bags the user wants, and turn the answer into a number.
2. From 1 to 10, show `You ordered 3 bags.`, with the real number.
3. Otherwise, show `Please order 1 to 10 bags.` in red.

Use these lines to change the page:

```js
document.getElementById("message").textContent = "You ordered 3 bags.";
document.getElementById("message").style.color = "red";
```

---

## Solution (You): Order Limits

```js
let bags = Number(prompt("How many bags?"));

if (bags >= 1 && bags <= 10) {
  document.getElementById("message").textContent = `You ordered ${bags} bags.`;
} else {
  document.getElementById("message").textContent = "Please order 1 to 10 bags.";
  document.getElementById("message").style.color = "red";
}
```

<div class="runs">
<div>
<p class="caption">Typed 3</p>
<div class="demo"><p>You ordered 3 bags.</p></div>
</div>
<div>
<p class="caption">Typed abc</p>
<div class="demo"><p style="color: red">Please order 1 to 10 bags.</p></div>
</div>
</div>

With `bags < 1 || bags > 10` and the blocks swapped, `abc` shows `You ordered NaN bags.`, since every comparison with `NaN` gives `false`.

---

## Shortcut: The Ternary Operator

When both blocks only pick a value, the **ternary operator** fits the choice on one line:

```js
let sign = hour < 18 ? "We're open!" : "Sorry, we're closed.";
```

`condition ? a : b` gives back `a` when the condition is `true`, and `b` when it's `false`. When a block needs more than one line, like setting the color too, use `if` and `else`.

---

# Conclusion

---

## Summary

- A comparison gives a boolean: `true` or `false`.
- Compare with `===` and `!==`, and turn `prompt` answers into numbers first.
- `if` runs its block when the condition is `true`, and `else` runs when it's `false`.
- `else if` checks from top to bottom and runs only the first match, so order matters.
- `&&` needs both sides `true`, `||` needs one, and `!` flips a boolean.
- A range takes two comparisons: `hour >= 7 && hour < 18`.

---

# Questions?

---

## Why `===` Instead of `==`?

Before it compares, `==` changes both sides to the same type. Its rules for that surprise even experienced programmers:

| Code        | Gives   |
| ----------- | ------- |
| `0 == "0"`  | `true`  |
| `0 == ""`   | `true`  |
| `"0" == ""` | `false` |

`0` equals both strings, but the two strings aren't equal to each other. `===` never changes types, so all three would give `false`.
