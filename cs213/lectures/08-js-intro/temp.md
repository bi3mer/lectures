---
marp: true
theme: lecture
paginate: true
---

<style>
/* Code on the left, what the console shows on the right. */
.side-by-side { display: grid; grid-template-columns: 560px minmax(0, 1fr); gap: 24px; align-items: start; }
.side-by-side p { margin: 0; }
.caption { font-size: 20px; color: var(--secondary); }
</style>

## Numbers

```js
let bags = 3;
let price = 14.5;
let temperature = -4;
```

Whole numbers, decimals, and negative numbers are all the same type: **number**.

---

## Problem: Strange Numbers

```js
console.log(16 / 0);
console.log("Text" / 2);
```

What did these print?

---

## Solution: Strange Numbers

```js
console.log(16 / 0);
console.log("Text" / 2);
```

<p class="caption">Console</p>

```text
Infinity
NaN
```

- Dividing by zero gives `Infinity`.
- Math that can't give a number, like dividing a word by 2, gives `NaN`, which stands for "Not a Number."
- Both are still the number type.

---

## Strings

<!-- prettier-ignore -->
```js
let a = 'Hi there!'; // single quotes
let b = "Hi there!"; // double quotes
let c = `Hi there!`; // backticks
```

A **string** is text. All three kinds of quotes make a string. Backticks can do one extra thing, which we'll see with formatted strings.

---

## Quotes Inside Quotes

```js
let quote = "He said "Hello" and left.";
```

```text
Uncaught SyntaxError: Unexpected identifier 'Hello'
```

The string ended at the second `"`, right before `Hello`. We can use the other kind of quote on the outside, or put a `\` before each inner quote:

```js
let quote = 'He said "Hello" and left.';
let plan = "Let's get coffee.";
let escaped = "He said \"Hello\" and left.";
```

---

## Booleans

```js
let isOpen = true;
let isSoldOut = false;
```

A **boolean** is `true` or `false`, with no quotes. Starting the name with `is` or `has` makes it read like a yes-or-no question.

---

## Problem: A Variable With No Value

```js
let a;
console.log(a);
```

We made `a`, but never gave it a value. What printed?

---

## Solution: A Variable With No Value

```text
undefined
```

`undefined` means "this never got a value."

---

## `null` vs. `undefined`

Both mean "no value," for different reasons.

- `undefined`: never assigned
- `null`: assigned on purpose

<!-- prettier-ignore -->
```js
let a;            // undefined
let order = null; // null
```

Let's say a customer hadn't picked a coffee yet. `null` said "no order yet," on purpose.

---

## Arrays and Objects

```js
let roasts = ["light", "medium", "dark"];
let bag = { name: "Yirgacheffe", roast: "light", price: 14.5 };

console.log(bag.price);
```

An **array** is a list in `[ ]`. An **object** groups named values in `{ }`, and a `.` gets one of them out: `bag.price` is `14.5`.

---

## `typeof`

| Code                  | Gives         |
| --------------------- | ------------- |
| `typeof 15`           | `"number"`    |
| `typeof 42.7`         | `"number"`    |
| `typeof "Bentley"`    | `"string"`    |
| `typeof true`         | `"boolean"`   |
| `typeof undefined`    | `"undefined"` |
| `typeof [1, 2, 3]`    | `"object"`    |
| `typeof { doors: 4 }` | `"object"`    |

`typeof` tells us a value's type, as a string.

---

## Problem: `typeof "12"`

```js
console.log(typeof 12);
console.log(typeof "12");
```

Did these print the same thing?

---

## Solution: `typeof "12"`

```text
number
string
```

Quotes make a string, even if what's inside looks like a number. We'll run into this again with `prompt`.

---

## Problem: `typeof null`

```js
console.log(typeof null);
```

What did this print?

---

## Solution: `typeof null`

```text
object
```

That's a bug from the first version of JavaScript in 1995. Changing it now would break old websites, so it stays.

---

## Dynamic Typing

<div class="side-by-side">
<div>

```js
let x = 5;
console.log(typeof x);

x = "now I'm a string";
console.log(typeof x);
```

</div>
<div>

<p class="caption">Console</p>

```text
number
string
```

</div>
</div>

`x` held a number, then a string. The value has a type, but the variable can hold any type. This is what **dynamically typed** means.

---

## Exercise: A Coffee Order

Make a variable for each part of a coffee order:

- the drink's name
- its size in ounces
- its price
- whether it's iced

Print each one, then print its `typeof`.

---

## Exercise: A Coffee Order (Continued)

<div class="side-by-side">
<div>

```js
const drink = "Cold Brew";
const ounces = 16;
const price = 4.75;
const isIced = true;

console.log(drink);
console.log(typeof drink);
console.log(ounces);
console.log(typeof ounces);
console.log(price);
console.log(typeof price);
console.log(isIced);
console.log(typeof isIced);
```

</div>
<div>

<p class="caption">Console</p>

```text
Cold Brew
string
16
number
4.75
number
true
boolean
```

</div>
</div>

---

## `console.log()` With Several Values

```js
console.log("Total:", 15);
console.log("Bags:", 3, "Price:", 14.5);
```

```text
Total: 15
Bags: 3 Price: 14.5
```

With commas between values, `console.log` prints them all, with a space between each.

---

## Moving the Code to `script.js`

<div class="side-by-side">
<div>

`index.html`

```html
<body>
  <h1>JavaScript Starter</h1>
  <script src="script.js"></script>
</body>
```

</div>
<div>

`script.js`

```js
console.log("Hello, Bentley!");
```

</div>
</div>

Our code got longer, so we moved it to its own file. The `src` tells the browser which file to run. The tag stays at the end of the `<body>`.

Starter files: [index.html](examples/script-starter/index.html) and [script.js](examples/script-starter/script.js).

---

## `+` With Strings

<div class="side-by-side">
<div>

```js
let first = "Bentley";
let second = " University";
console.log(first + second);

first += second;
console.log(first);
```

</div>
<div>

<p class="caption">Console</p>

```text
Bentley University
Bentley University
```

</div>
</div>

`+` and `+=` work on strings too. On strings, they glue.

---

# Functions

---

## Problem: The Same Math Three Times

```js
let price1 = 14.5;
console.log(`Total: $${(price1 * 1.0625).toFixed(2)}`);

let price2 = 18;
console.log(`Total: $${(price2 * 1.0625).toFixed(2)}`);

let price3 = 12.25;
console.log(`Total: $${(price3 * 1.0625).toFixed(2)}`);
```

If the tax rate changes, we have to fix it in three places (like the 40 red paragraphs in CSS). How can we write it once?

---

## Solution: Functions

```js
function printTotal(price) {
  console.log(`Total: $${(price * 1.0625).toFixed(2)}`);
}

printTotal(14.5);
printTotal(18);
printTotal(12.25);
```

A **function** is a named group of statements that we can run whenever we want. Now the tax rate is in one place.

---

## Use a Function

We covered how to write and use a function today. You must do it in this format for the exercises this week:

```js
function functionName() {
  console.log("hi");
}
```

Which is to say, use `function` to declare functions, not arrow format.

> **IMPORTANT:** No credit will be given if this exercise does not use a function as otherwise it is exactly the example shown in class!

---

## Writing a Function

```js
function sayHello() {
  console.log("Hello, welcome to the coffee blog!");
}

sayHello();
```

- `function`, then a name, then `()`
- The statements to run go inside `{ }`
- `sayHello();` **calls** the function, which runs it

---

## Problem: Nothing Prints

```js
function sayHello() {
  console.log("Hello, welcome to the coffee blog!");
}
```

We reloaded the page, and the console was empty. Why?

---

## Solution: Nothing Prints

Writing a function only defines it. Nothing inside runs until we call it:

```js
sayHello();
```

We can call it as many times as we want.

---

## Parameters and Arguments

<div class="side-by-side">
<div>

```js
function displaySum(num1, num2) {
  let total = num1 + num2;
  console.log(`The total is: ${total}`);
}

displaySum(6, 20);
displaySum(-5, 17);
```

</div>
<div>

<p class="caption">Console</p>

```text
The total is: 26
The total is: 12
```

</div>
</div>

`num1` and `num2` are **parameters**: variables that get their values when we call the function. The values we pass in, like `6` and `20`, are **arguments**.

---

## Problem: A Missing Argument

```js
function showFullName(firstName, lastName) {
  console.log(`${firstName} ${lastName}`);
}

showFullName("Colan", "Biemer");
showFullName("Colan");
```

The first call printed `Colan Biemer`. What did the second one print?

---

## Solution: Default Values

```text
Colan undefined
```

A parameter we don't pass is `undefined`. We can give it a **default value** to use instead:

```js
function showFullName(firstName, lastName = "Guest") {
  console.log(`${firstName} ${lastName}`);
}

showFullName("Colan"); // Colan Guest
```

---

## Problem: Using the Result

<div class="side-by-side">
<div>

```js
function addTax(price) {
  console.log(price * 1.0625);
}

let total = addTax(10);
console.log(total * 2);
```

</div>
<div>

<p class="caption">Console</p>

```text
10.625
NaN
```

</div>
</div>

We wanted double the total. Why `NaN`?

---

## Solution: `return`

<div class="side-by-side">
<div>

```js
function addTax(price) {
  return price * 1.0625;
}

let total = addTax(10);
console.log(total * 2);
```

</div>
<div>

<p class="caption">Console</p>

```text
21.25
```

</div>
</div>

`console.log` only shows a value. The first `addTax` never gave a value back, so `total` was `undefined`, and `undefined * 2` is `NaN`. **`return`** gives a value back to whoever called the function.

---

## `return` Ends the Function

```js
function addTax(price) {
  return price * 1.0625;
  console.log("This never runs");
}
```

Once a function reaches `return`, it stops. Anything after it is skipped.

---

## Exercise: `toCelsius`

Write a function `toCelsius` that takes a temperature in Fahrenheit and returns it in Celsius. Use it to print:

```text
212°F is 100°C
50°F is 10°C
```

---

## Exercise: `toCelsius` (Continued)

<!-- prettier-ignore -->
```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

console.log(`212°F is ${toCelsius(212)}°C`);
console.log(`50°F is ${toCelsius(50)}°C`);
```

---

## Anonymous Functions

```js
const college = function () {
  return "Bentley University";
};

console.log(college());
```

```text
Bentley University
```

There's no name after `function`, so this function is **anonymous**. We stored it in a variable, and called it through the variable.

---

## Problem: Forgot the Parentheses

```js
console.log(`The value is ${college}`);
```

```text
The value is function () {
  return "Bentley University";
}
```

We wanted `The value is Bentley University`. What happened?

---

## Solution: Forgot the Parentheses

`college` is the function itself, so the console printed its code. `college()` runs it and gives back what it returns:

```js
console.log(`The value is ${college()}`);
```

```text
The value is Bentley University
```

---

## Why Leave Out the Name?

```js
setTimeout(function () {
  console.log("Your coffee is ready!");
}, 3000);
```

`setTimeout` runs a function after a wait, in milliseconds (3000 is 3 seconds). We only used this function here, so it didn't need a name.

---

## Arrow Functions

```js
const addTax = (price) => price * 1.0625;

console.log(addTax(10));
```

```text
10.625
```

An **arrow function** is a shorter way to write a function: the parameters in `( )`, then `=>`, then the value it gives back.

---

## Arrow Function Shapes

<!-- prettier-ignore -->
```js
// One parameter: the ( ) are optional
const greet = name => console.log(`Hi ${name}!`);

// Several parameters
const multiply = (num1, num2) => num1 * num2;

// No parameters
const hello = () => console.log("Bentley University!");

// Several statements: use { } and return
const receipt = (price) => {
  const total = price * 1.0625;
  return `Total: $${total.toFixed(2)}`;
};
```

---

## Problem: Braces Without `return`

<!-- prettier-ignore -->
```js
const double = (n) => { n * 2 };
console.log(double(4));
```

```text
undefined
```

Why not `8`?

---

## Solution: Braces Without `return`

With `{ }`, an arrow function works like a regular function: it only gives back what we `return`. We can drop the braces, or add `return`:

<div class="side-by-side">
<div>

```js
const double = (n) => n * 2;
```

</div>
<div>

```js
const double = (n) => {
  return n * 2;
};
```

</div>
</div>

---

## Three Ways to Write the Same Function

```js
// Basic
function addTax(price) {
  return price * 1.0625;
}

// Anonymous, stored in a variable
const addTax = function (price) {
  return price * 1.0625;
};

// Arrow
const addTax = (price) => price * 1.0625;
```

We'd pick one, since they share a name. All three are called the same way: `addTax(10)`.

---

## Exercise: Arrow Functions

Rewrite both of these as arrow functions:

<!-- prettier-ignore -->
```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function showFullName(firstName, lastName = "Guest") {
  console.log(`${firstName} ${lastName}`);
}
```

---

## Exercise: Arrow Functions (Continued)

<!-- prettier-ignore -->
```js
const toCelsius = (fahrenheit) => (fahrenheit - 32) * 5 / 9;

const showFullName = (firstName, lastName = "Guest") =>
  console.log(`${firstName} ${lastName}`);
```

---

# Getting User Input with `prompt`

---

## Problem: Numbers in the Code

Every program so far had its numbers typed into the code. To price a different order, we had to edit the file.

How can the person visiting the page give us the numbers?

---

## Solution: `prompt()`

```js
const name = prompt("What's your name?");
console.log(`Hello, ${name}!`);
```

`prompt()` opens a box with our question and a place to type. The page waits until they click OK, and then `prompt` gives back what they typed.

---

## `alert()`

```js
alert("Your coffee is ready!");
```

`alert()` shows a message in a box and waits for OK. `console.log` only shows up in the console, but anyone visiting the page sees an `alert`.

---

## Exercise: Coffee Order

Ask how many bags they want and the price per bag. Write a function that returns the total with 6.25% tax, then print:

```text
3 bags at $14.50 comes to $46.22
```

---

## Exercise: Coffee Order (Continued)

<!-- prettier-ignore -->
```js
const TAX_RATE = 0.0625;

function orderTotal(bags, price) {
  return bags * price * (1 + TAX_RATE);
}

const bags = Number(prompt("How many bags?"));
const price = Number(prompt("Price per bag?"));
const total = orderTotal(bags, price);

console.log(`${bags} bags at $${price.toFixed(2)} comes to $${total.toFixed(2)}`);
```

---

## Exercise: Tip Calculator

Ask for the bill and the tip percentage. Use an arrow function to work out the tip, then `alert` the tip and the total. For a 42.50 bill and a 20% tip:

```text
Tip: $8.50
Total: $51.00
```

---

## Exercise: Tip Calculator (Continued)

```js
const tipAmount = (bill, percent) => (bill * percent) / 100;

const bill = Number(prompt("How much was the bill?"));
const percent = Number(prompt("What percent tip?"));
const tip = tipAmount(bill, percent);
const total = bill + tip;

alert(`Tip: $${tip.toFixed(2)}
Total: $${total.toFixed(2)}`);
```

---

## Summary: Statements and Data Types

- A statement is one instruction ending in `;`, and the browser runs them top to bottom
- `let` for values that change, `const` for values that don't
- Types: number, string, boolean, `undefined`, `null`, array, object
- `typeof` tells us a value's type
- A variable can hold any type, and switch types (dynamic typing)

---

## Summary: Output and Operators

- `console.log()` prints to the console
- Template literals drop values into a string: `` `Total: $${total.toFixed(2)}` ``
- Math: `+ - * / % **`, with parentheses first
- `+` with a string glues; `-`, `*`, and `/` turn strings into numbers

---

## Summary: Functions and Input

- Basic: `function name(params) { ... }`, called with `name(args)`
- Anonymous: `const name = function (params) { ... };`
- Arrow: `const name = (params) => value;`
- `return` gives a value back; `console.log` only shows it
- `prompt()` gives back a string, so we wrap it in `Number()` before doing math

---

## Before You Start the Exercise

We covered how to write and use a function today. You must do it in this format for the exercises this week:

```js
function functionName() {
  console.log("hi");
}
```

Which is to say, use `function` to declare functions, not arrow format.

> **IMPORTANT:** No credit will be given if this exercise does not use a function as otherwise it is exactly the example shown in class!

---

# Questions?

---

## What Is C10k?

Can one server handle ten thousand concurrent connections?

Named by Dan Kegel, 1999. The "C" is _concurrent_: it's a benchmark, not a bug.

- One thread per connection, ~1MB of stack each - ~10GB before any work
- The scheduler thrashes context-switching between them
- Almost all of them are just blocked on a socket, doing nothing

**The fix:** stop mapping connections to threads. One event loop asks the OS which sockets are ready (`epoll`, `kqueue`) and handles only those. Idle connections cost a file descriptor.

---

## What Was CGI?

Common Gateway Interface. Spec, 1993, National Center for Supercomputing Applications (NCSA).

- Server gets request - spawns process (Perl, C, shell script) - process prints HTML to stdout - server ships it back
- New process per request - spawn cost every time
- No shared memory between requests - reconnect to DB each time
- Paved the way for PHP and other server-side rendering approaches

---

## Why Were Java Applets Slow?

- Before the first applet could run, the plugin had to start a full Java runtime (the JVM), not just run some code
- The whole `.class`/`.jar` had to download before anything could run: no incremental execution
- Ran in a separate plugin, bridged into the page: constant overhead crossing that boundary

---

## What Were the Security Risks?

- The plugin ran with access to the machine, not just the sandboxed page: a much bigger attack surface
- Years of CVEs: remote code execution, sandbox escapes
- Browsers started blocking Java by default in the 2010s; Chrome 45 removed the plugin system Java needed (NPAPI) in 2015

---

## What Were the Browser Wars?

- Netscape vs. Internet Explorer, mid-to-late 1990s: each pushed incompatible extensions to win developers
- Microsoft shipped its own version of Java in IE that broke compatibility with Sun's
- Sun sued Microsoft over it in 1997; they settled in 2001, with Microsoft paying Sun 20 million dollars
- Result: no single Java applet worked reliably across every browser

---

## What Is the DOM?

The page, as objects your code can touch.

- Browser parses HTML - tree of nodes
- Every tag is an object with properties
- Change the object - the page changes

---

## What Is ECMAScript?

- Netscape handed JS to Ecma International in November 1996 to standardize it; the first standard came out in June 1997
- "JavaScript" was Sun's trademark (Oracle's now), so the spec was named ECMAScript
- Still, generally, we just say JavaScript

---

## Static vs Dynamically Typed

- **Statically typed** (Java, C, TypeScript) - types fixed and checked before the program runs
- **Dynamically typed** (JavaScript, Python) - types checked at runtime; a variable can hold any type
- **Gradually typed** (TypeScript, Python w/ type hints) - optional static checks layered on top, erased at runtime

---

## Why Semicolons If Not Required?

JS has **ASI** (Automatic Semicolon Insertion): the engine guesses line ends for you. If the guess is wrong, the code breaks. Make your code explicit, and you can avoid a ton of pain.

---

## `let` vs `var`?

```js
if (true) {
  var a = 1;
  let b = 2;
}
console.log(a); // 1 - var leaks out of the block
console.log(b); // ReferenceError - let scoped to the block
```

- `var`: function-scoped, hoisted + initialized as `undefined`
- `let`: block-scoped, hoisted but not initialized (**temporal dead zone** until declaration line)
- `var` redeclare same name no error; `let` redeclare same scope → error
- Modern default: `let` (and `const`); `var` is mostly legacy code now

---

## Why Is `typeof null` `"object"`?

- Bug from 1995, kept forever.
- Early JS used type tags for values; object's tag was `0`
- `null` was the NULL pointer (`0x00`): same tag as object, by accident
- Fixing it would break too much existing code, so it's frozen into the spec

```js
typeof null; // "object"
value === null; // correct way to check for null
```

---

## Why Is `typeof [1, 2, 3]` `"object"`?

- Array is an object with numeric keys (`"0"`, `"1"`, ...) plus a `length` property

```js
typeof [1, 2, 3]; // "object"
Array.isArray([1, 2, 3]); // true: correct way to check for array
```

---

# Replaced Operator Slides

---

## Problem: The Perimeter Is 86

```js
let length = prompt("How long is the rectangle?");
let width = prompt("How wide is the rectangle?");
let perimeter = 2 * (length + width);
console.log(`The perimeter is ${perimeter}`);
```

The user typed `4` and `3`, and the console said `The perimeter is 86`. It should have been 14. What went wrong?

---

## Solution: `prompt` Gives Back a String

`prompt` always gives back a string, so `length + width` was `"4" + "3"`, which is `"43"`. Then `2 * "43"` is `86`.

```js
let length = Number(prompt("How long is the rectangle?"));
let width = Number(prompt("How wide is the rectangle?"));
```

`Number()` turns a string into a number.

---

## Problem: Strings and Numbers

```js
console.log("5" + 3);
console.log("5" - 3);
console.log("5" * 3);
console.log(5 + 3 + "5");
```

What did each line print?

---

## Solution: Strings and Numbers

```text
53
2
15
85
```

If either side of `+` is a string, `+` glues. `-`, `*`, and `/` only do math, so they turn `"5"` into `5`. JavaScript goes left to right: `5 + 3` is `8`, then `8 + "5"` is `"85"`.

---

## Problem: Cancel and Typos

```js
let bags = Number(prompt("How many bags?"));
console.log(bags);
```

What if they typed `abc`? What if they clicked **Cancel**?

---

## Solution: Cancel and Typos

| They...                 | `prompt` gives | `Number()` gives |
| ----------------------- | -------------- | ---------------- |
| type `3`                | `"3"`          | `3`              |
| type `abc`              | `"abc"`        | `NaN`            |
| click OK, nothing typed | `""`           | `0`              |
| click Cancel            | `null`         | `0`              |

Next week, `if` statements let us check for these.

---

## Math Inside `${ }`

```js
let bags = 3;
let price = 14.5;
console.log(`${bags} bags cost ${bags * price}`);
```

```text
3 bags cost 43.5
```

Any expression works inside `${ }`, not just a variable name.

---

## Problem: Leftover Cookies

Let's say we had 17 cookies to split evenly among 5 people. Everyone got 3.

How many cookies were left over, and which operator tells us?

---

## Solution: `%`

```js
console.log(17 % 5);
```

```text
2
```

`%` gives the **remainder** after dividing. A number is even when `n % 2` is `0`: `10 % 2` is `0`, and `7 % 2` is `1`.

---

## Problem: Order of Operations

```js
console.log(2 + 3 * 4);
```

Did this print `20` or `14`?

---

## Solution: Order of Operations

```text
14
```

Same as math class: `**` first, then `*`, `/`, and `%`, then `+` and `-`. Parentheses go before all of them, so `(2 + 3) * 4` is `20`.

---

## Problem: Too Many Decimals

```js
let total = 3 * 14.5 * 1.0625; // with 6.25% tax
console.log(`Total: ${total}`);
```

```text
Total: 46.21875
```

Nobody pays \$46.21875. How do we show dollars and cents?

---

## Solution: `toFixed(2)`

```js
console.log(`Total: ${total.toFixed(2)}`);
```

```text
Total: 46.22
```

`toFixed(2)` rounds to two decimal places. It gives back a string, so we use it when printing, not in the middle of math.

---

## Problem: A Dollar Sign

We wanted the console to show `Total: $46.22`.

Template literals already use `$` for `${ }`. How do we print a dollar sign?

---

## Solution: A Dollar Sign

```js
console.log(`Total: $${total.toFixed(2)}`);
```

```text
Total: $46.22
```

A `$` that isn't followed by `{` is plain text. So the first `$` printed, and `${` started the value.

---

## Problem (Me): Fahrenheit to Celsius

To convert, subtract 32, then multiply by 5/9.

<!-- prettier-ignore -->
```js
let fahrenheit = 212;
let celsius = fahrenheit - 32 * 5 / 9;
console.log(celsius);
```

```text
194.22222222222223
```

Water boils at 100°C. Fix the code.

---

## Solution (Me): Fahrenheit to Celsius

<!-- prettier-ignore -->
```js
let celsius = (fahrenheit - 32) * 5 / 9;
```

```text
100
```

Without parentheses, `32 * 5 / 9` happened first, and then we subtracted that from 212.

---

## Problem (Us): Predict, Then Check

Write down what each line gives, then type them into the console to check.

<!-- prettier-ignore -->
```js
10 % 3
2 ** 3
"Colan" + 3 * 2
"8" - 2
"8" + 2
```

---

## Solution (Us): Predict, Then Check

<!-- prettier-ignore -->
```js
10 % 3          // 1
2 ** 3          // 8
"Colan" + 3 * 2 // "Colan6"
"8" - 2         // 6
"8" + 2         // "82"
```

---

## Problem (You): A Receipt

```js
const item = "Yirgacheffe";
const quantity = 3;
const price = 14.5;
const TAX_RATE = 0.0625;
```

Using these variables, print:

```text
3 x Yirgacheffe at $14.50
Subtotal: $43.50
Tax: $2.72
Total: $46.22
```

---

## Solution (You): A Receipt

```js
const subtotal = quantity * price;
const tax = subtotal * TAX_RATE;
const total = subtotal + tax;

console.log(`${quantity} x ${item} at $${price.toFixed(2)}`);
console.log(`Subtotal: $${subtotal.toFixed(2)}`);
console.log(`Tax: $${tax.toFixed(2)}`);
console.log(`Total: $${total.toFixed(2)}`);
```

---

## Problem (You): Coupons and Shipping

Add a coupon and shipping to the receipt. The user bought 9 bags and had a \$5 coupon:

```text
Bags: 10
Subtotal: $130.50
Tax: $8.16
Coupon: -$5.00
Total: $133.66
Shipping: 2 boxes + 2 bags
```

1. Ask for the coupon amount, and take it off `total` with `-=`.
2. Bags ship 4 to a box. Work out the full boxes and the bags left over.
3. Add both to the receipt.

---

## Solution (You): Coupons and Shipping

<div class="side-by-side">
<div>

```js
// the math from A Receipt
let coupon = Number(prompt("Coupon amount?"));
total -= coupon;

let leftover = totalBags % 4;
let boxes = (totalBags - leftover) / 4;

console.log(`Bags: ${totalBags}`);
console.log(`Subtotal: $${subtotal.toFixed(2)}`);
console.log(`Tax: $${tax.toFixed(2)}`);
console.log(`Coupon: -$${coupon.toFixed(2)}`);
console.log(`Total: $${total.toFixed(2)}`);
console.log(`Shipping: ${boxes} boxes + ${leftover} bags`);
```

</div>
<div>

<p class="caption">Console</p>

```text
Bags: 10
Subtotal: $130.50
Tax: $8.16
Coupon: -$5.00
Total: $133.66
Shipping: 2 boxes + 2 bags
```

</div>
</div>

`total -= coupon` took the coupon off the total. `%` gave the bags left over, and the parentheses subtracted them before dividing.
