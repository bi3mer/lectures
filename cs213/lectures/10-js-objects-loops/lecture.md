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

# Objects and Loops

Colan Biemer

---

# Objects

---

## Objects

```js
let object = {
  key: value,
  anotherKey: anotherValue,
};
```

- An **object** keeps related values together under one name.
- Its `{ }` holds **properties**. Each property is a **key**, a `:`, and a value.
- Commas separate the properties. The comma after the last one is optional.

---

## Example: One Student

<div class="side-by-side">
<div>

```js
let studentName = "Ada";
let studentMajor = "Math";
let studentYear = 2;
let studentScore = 95;
```

</div>
<div>

```js
let student = {
  name: "Ada",
  major: "Math",
  year: 2,
  score: 95,
};
```

</div>
</div>

Both describe one student. Nothing ties the four variables on the left together, and 100 students would need 400 of them. The object on the right keeps them under one name, `student`.

How do we read one value back out?

---

## Reading and Changing Properties

<style scoped>
/* The left code's first line is 58 characters, too wide for the usual 560px column. */
.side-by-side { grid-template-columns: 760px minmax(0, 1fr); }
</style>

<div class="side-by-side">
<div>

<!-- prettier-ignore -->
```js
let student = { name: "Ada", major: "Math", year: 2 };

console.log(student.year);  // 2
console.log(student.score); // undefined

student.year = 3;           // changes year
student.score = 95;         // adds score
```

</div>
<div>

```js
let student = {};
student.name = "Ada";
student.major = "Math";
student.year = 2;
student.score = 95;
```

</div>
</div>

A dot reads a property. A key the object doesn't have gives `undefined`. Storing a value with `=` changes a property, or adds it when the object doesn't have it yet. The code on the right starts from `{}`, an empty object, and adds one property per line.

What if the key is in a variable?

---

## Brackets

<!-- prettier-ignore -->
```js
let key = "name";

console.log(student["name"]); // Ada
console.log(student[key]);    // Ada
console.log(student.key);     // undefined
```

Brackets take a string, so the key can come from a variable. A dot always uses the name written after it, so `student.key` looks for a property named `key`.

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

## Problem: Birthday (us)

```js
let student = { name: "Ada", age: 20 };
// Add 1 to age, add a major of "Math", then print both.
```

<p class="caption">Console</p>

```text
21
Math
```

- Which line changes a property, and which adds one?

---

## Solution: Birthday (us)

```js
let student = { name: "Ada", age: 20 };
student.age += 1;
student.major = "Math";
console.log(student.age);
console.log(student.major);
```

Storing a value in a key the object lacks adds the property.

---

## Problem: Look Up a Score (you)

```text
set scores to { ADA: 95, GRACE: 88, ALAN: 91 }
set name to "grace"
print the score under name, in capitals
```

<p class="caption">Console</p>

```text
88
```

---

## Solution: Look Up a Score (you)

```js
let scores = { ADA: 95, GRACE: 88, ALAN: 91 };
let name = "grace";
console.log(scores[name.toUpperCase()]);
```

`toUpperCase()` gives the string in capitals. The key is in a variable, so we need brackets.

---

# `while`

---

## Counting to 5

```js
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);
```

Counting to 100 this way takes 100 lines. Counting to a number in a variable can't be written this way at all, since we don't know how many lines to write.

A **loop** runs the same code again and again, as many times as we need.

---

## `while`

<div class="side-by-side">
<div>

```js
while (condition) {
  // runs while condition is true
}
```

</div>
<div>

![w:530 A while loop went in a cycle. JavaScript started by checking the condition. When it was true, JavaScript ran the block, then went back and checked the condition again. When it was false, JavaScript skipped the block and moved on to the code after the loop.](examples/diagrams/while-loop.svg)

</div>
</div>

- As in an [`if`](../09-js-if/lecture.html#16), the condition goes in `( )`, and the code to run goes in `{ }`.
- An `if` checks its condition once. A `while` checks it again each time the block finishes.
- Each run through the block is one **iteration**.

---

## Example: Counting to 5

<div class="side-by-side">
<div>

```js
let count = 1;

while (count <= 5) {
  console.log(count);
  count++;
}

console.log("Done");
```

</div>
<div>

| `count` | `count <= 5` | Printed |
| ------- | ------------ | ------- |
| 1       | `true`       | `1`     |
| 2       | `true`       | `2`     |
| 3       | `true`       | `3`     |
| 4       | `true`       | `4`     |
| 5       | `true`       | `5`     |
| 6       | `false`      | `Done`  |

</div>
</div>

[`count++`](../08-js-intro/lecture.html#76) moves `count` toward 6, which makes `count <= 5` false.

What happens if we forget `count++`?

---

## Infinite Loops

```js
let count = 1;

while (count <= 5) {
  console.log(count);
}
```

Without `count++`, `count` stays 1, and `1 <= 5` is `true` forever. This is an **infinite loop**. The page can't do anything else until the loop ends, so the tab freezes. Close the tab, fix the loop, and open the page again.

Something in the block has to move the condition toward `false`.

Loops often build up a result. How do we add to a string?

---

## `+=` with Strings

```js
let message = "Hello";
message += " there"; // "Hello there"
```

`message += " there"` is short for `message = message + " there"` ([Assignment Shortcuts](../08-js-intro/lecture.html#76)), and `+` glues strings together ([Concatenation](../08-js-intro/lecture.html#57)). Here we start from an empty string (`""`) and add one piece at a time:

```js
let bar = "";
bar += "█"; // "█"
bar += "█"; // "██"
```

---

## Problem: Doubling (us)

```js
let amount = 1;
let days = 0;
// Double amount each day until it reaches 100, counting the days.
// Then print days.
```

<p class="caption">Console</p>

```text
7
```

- What moves the condition toward `false`?

---

## Solution: Doubling (us)

```js
let amount = 1;
let days = 0;

while (amount < 100) {
  amount *= 2;
  days++;
}

console.log(days);
```

We do not know how many days it takes, so `while` fits.

---

## Problem: Add to Ten (you)

```text
set total to 0
set number to 1

while number is 10 or less
  add number to total
  add 1 to number

print total
```

<p class="caption">Console</p>

```text
55
```

---

## Solution: Add to Ten (you)

```js
let total = 0;
let number = 1;

while (number <= 10) {
  total += number;
  number++;
}

console.log(total);
```

Without `number++`, this would be an infinite loop.

---

# `for`

---

## Three Places to Look

```js
let count = 1; // setup

while (count <= 5) {
  // condition
  console.log(count);
  count++; // update
}
```

Forget the last line and the tab freezes. Could all three parts sit on one line?

---

## `for`

```js
for (let i = 0; i < 5; i++) {
  // runs 5 times, with i at 0, 1, 2, 3, then 4
}
```

The `( )` holds three parts, separated by `;`:

1. **Setup**: `let i = 0` runs once, before the first iteration.
2. **Condition**: `i < 5` is checked before each iteration, as in a `while`.
3. **Update**: `i++` runs after each iteration.

`i` is short for _index_, and it's the usual name for a loop's counter.

How does this compare to the `while` we wrote?

---

## One Loop, Two Ways

![w:1120 The same loop written two ways. With while, the setup let count = 1; came before the loop, the condition count <= 5 sat in the parentheses after while, and the update count++ was the last line of the block. With for, the setup, the condition, and the update sat together on one line, separated by semicolons: for (let count = 1; count <= 5; count++). Both blocks printed count.](examples/diagrams/for-loop.svg)

A `for` loop is a `while` loop with the setup, the condition, and the update on one line.

How do we know how many times a `for` will run?

---

## How Many Times?

<div class="centered">

| Loop                               | `i` Takes        | Iterations |
| ---------------------------------- | ---------------- | ---------- |
| `for (let i = 0; i < 5; i++)`      | 0, 1, 2, 3, 4    | 5          |
| `for (let i = 1; i <= 5; i++)`     | 1, 2, 3, 4, 5    | 5          |
| `for (let i = 0; i <= 5; i++)`     | 0, 1, 2, 3, 4, 5 | 6          |
| `for (let i = 3; i > 0; i--)`      | 3, 2, 1          | 3          |
| `for (let i = 0; i <= 20; i += 5)` | 0, 5, 10, 15, 20 | 5          |

</div>

If we want 5 iterations, the third loop runs once too many, an **off-by-one** error. To run a loop `n` times, start at 0 with `<`, or at 1 with `<=`.

---

## Problem: Progress Bar (us)

```js
let filled = 6;
// Build a bar of 10 slots: █ for each filled slot, ░ for the rest.
// Then print it.
```

<p class="caption">Console</p>

```text
██████░░░░
```

- Do we start at 0 or at 1?

---

## Solution: Progress Bar (us)

```js
let filled = 6;
let bar = "";

for (let i = 1; i <= 10; i++) {
  if (i <= filled) {
    bar += "█";
  } else {
    bar += "░";
  }
}

console.log(bar);
```

Slots 1 to 6 are at or below `filled`.

---

## Problem: Countdown (you)

```text
set countdown to ""

for each i from 5 down to 1
  add "i... " to countdown

add "Go!" to countdown
print countdown
```

<p class="caption">Console</p>

```text
5... 4... 3... 2... 1... Go!
```

---

## Solution: Countdown (you)

```js
let countdown = "";

for (let i = 5; i > 0; i--) {
  countdown += `${i}... `;
}

countdown += "Go!";
console.log(countdown);
```

`i--` counts down, so the condition is `i > 0`.

---

# `for...in`

---

## Counting Does Not Reach Keys

```js
let student = { name: "Ada", year: 2 };
console.log(student[0]); // undefined
```

A `for` loop counts numbers, but an object's keys are names. How do we visit every key?

---

## `for...in`

<div class="side-by-side">
<div>

```js
for (let key in student) {
  console.log(`${key}: ${student[key]}`);
}
```

</div>
<div>

<p class="caption">Console</p>

```text
name: Ada
major: Math
year: 2
score: 95
```

</div>
</div>

- The loop runs once for each property, with `key` set to the property's name, as a string.
- To get the property's value, use brackets: `student[key]`. With `student.key`, every line would end in `undefined`.
- Keys come in the order they were added, except whole numbers like `"7"`, which come first, smallest to largest.

---

## Problem: Print the Scores (us)

```js
let scores = { Ada: 95, Grace: 88, Alan: 91 };
// Print each name and score.
```

<p class="caption">Console</p>

```text
Ada: 95
Grace: 88
Alan: 91
```

---

## Solution: Print the Scores (us)

```js
let scores = { Ada: 95, Grace: 88, Alan: 91 };

for (let name in scores) {
  console.log(`${name}: ${scores[name]}`);
}
```

`name` holds the key, and `scores[name]` holds its value.

---

## Problem: Total Score (you)

```text
set scores to { Ada: 95, Grace: 88, Alan: 91 }
set total to 0

for each name in scores
  add the score under name to total

print total
```

<p class="caption">Console</p>

```text
274
```

---

## Solution: Total Score (you)

```js
let scores = { Ada: 95, Grace: 88, Alan: 91 };
let total = 0;

for (let name in scores) {
  total += scores[name];
}

console.log(total);
```

The loop visits each key once.

These scores were values. What if the numbers are the keys?

---

## Keys Are Strings

Let's find the longest throw, the highest key in `throws`:

```js
let throws = { 100.25: "Ada", 99.75: "Grace" };
```

<div class="side-by-side">
<div>

<p class="caption">Bug</p>

```js
let best = 0;

for (let meters in throws) {
  if (meters > best) {
    best = meters;
  }
}
```

</div>
<div>

<p class="caption">Fixed with <a href="../08-js-intro/lecture.html#68"><code>Number()</code></a></p>

```js
let best = 0;

for (let meters in throws) {
  if (Number(meters) > best) {
    best = Number(meters);
  }
}
```

</div>
</div>

The bug finds `"99.75"`. After the first key, `best` holds a string, and JavaScript compares two strings one character at a time. `"9"` comes after `"1"`, so `"99.75" > "100.25"`.

---

## Problem: Shortest Throw (you)

```text
set throws to { 100.25: "Ada", 99.75: "Grace" }
set shortest to Infinity

for each meters in throws
  if meters, as a number, is below shortest
    set shortest to meters, as a number

print shortest
```

<p class="caption">Console</p>

```text
99.75
```

Why start at `Infinity`?

---

## Solution: Shortest Throw (you)

```js
let throws = { 100.25: "Ada", 99.75: "Grace" };
let shortest = Infinity;

for (let meters in throws) {
  if (Number(meters) < shortest) {
    shortest = Number(meters);
  }
}

console.log(shortest);
```

Every number is below `Infinity`, so the first key always replaces it.

---

# `break` and `continue`

---

## A Loop That Keeps Going

```js
for (let i = 1; i <= 1000000; i++) {
  if (i % 7 === 0) {
    console.log(i); // the first is 7
  }
}
```

We wanted the first match, but the loop checks a million numbers. How do we stop early?

---

## Stopping Early: `break`

Who is the first student in `scores` under 90?

<div class="side-by-side">
<div>

```js
let scores = { Ada: 95, Grace: 88, Alan: 75 };

for (let name in scores) {
  if (scores[name] < 90) {
    console.log(name);
    break;
  }
}
```

</div>
<div>

<p class="caption">Console</p>

```text
Grace
```

</div>
</div>

`break` ends the loop right away, even with keys left to visit, so the loop never checks Alan. Without `break`, it would print Alan too, since 75 is also under 90.

---

## Problem: First Multiple (us)

```js
// Starting at 1, print the first number that both 4 and 6 divide evenly.
```

<p class="caption">Console</p>

```text
12
```

- What happens without `break`?

---

## Solution: First Multiple (us)

```js
for (let i = 1; i <= 100; i++) {
  if (i % 4 === 0 && i % 6 === 0) {
    console.log(i);
    break;
  }
}
```

`break` stops the loop at the first match.

`break` ends the whole loop. What if we only want to skip one item?

---

## Skipping Ahead: `continue`

<div class="side-by-side">
<div>

```js
for (let name in scores) {
  if (name === "Ada") {
    continue;
  }
  console.log(name);
}
```

</div>
<div>

<p class="caption">Console</p>

```text
Grace
Alan
```

</div>
</div>

`continue` ends this iteration right away, and the loop goes on to the next one. Here it skips Ada. With `break`, the loop would end at Ada and print nothing.

Does `continue` work the same in a `while`?

---

## `continue` in a `while`

<div class="side-by-side">
<div>

<p class="caption">Freezes the tab</p>

```js
let i = 0;

while (i < 5) {
  if (i === 2) {
    continue;
  }
  console.log(i);
  i++;
}
```

</div>
<div>

<p class="caption">Prints 0, 1, 3, 4</p>

```js
for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue;
  }
  console.log(i);
}
```

</div>
</div>

In the `while`, `continue` jumps back to the condition before `i++` runs, so `i` stays 2 forever. A `for` loop runs its update after a `continue`, so `i` moves on to 3.

---

## Problem: Weekdays (you)

This month has 30 days, and day 1 is a Monday.

```text
set weekdays to 0

for each day from 1 to 30
  if day % 7 is 6 or 0
    continue
  add 1 to weekdays

print weekdays
```

<p class="caption">Console</p>

```text
22
```

---

## Solution: Weekdays (you)

```js
let weekdays = 0;

for (let day = 1; day <= 30; day++) {
  if (day % 7 === 6 || day % 7 === 0) {
    continue;
  }
  weekdays++;
}

console.log(weekdays);
```

Day 1 is a Monday here, so `day % 7` is 6 on Saturdays and 0 on Sundays.

We now have three loops. Which do we pick?

---

## Which Loop?

<div class="centered">

| Loop       | Use It When                                | Example from Today |
| ---------- | ------------------------------------------ | ------------------ |
| `while`    | we don't know how many iterations it needs | Doubling           |
| `for`      | we know how many iterations it needs       | Progress Bar       |
| `for...in` | we need every key in an object             | Print the Scores   |

</div>

`while` and `for` can do each other's jobs. Pick the loop that says what it's for.

---

# Conclusion

---

## Build It Yourself

The [order book](../../demos/10-order-book/instruction.html) is a full page built from today's objects and loops, with step-by-step instructions.

---

## Summary

- An object holds values under keys: `student.year`, or `student[key]`.
- A `while` loop repeats until something in its block makes the condition `false`.
- A `for` loop puts the setup, condition, and update on one line.
- To run a loop `n` times, start at 0 with `<`, or at 1 with `<=`.
- `for...in` gives keys as strings, so compare numbers with `Number()`.
- `break` ends a loop early, and `continue` skips to the next iteration.

---

## Next Up: Arrays

[Arrays](../11-js-arrays/lecture.html)

---

# Questions?

---

## Keys We Didn't Write

Looking up `toString` in `scores` does not give `undefined`:

```js
let scores = { Ada: 95 };
console.log(scores["toString"]); // a function
```

Every object comes with keys we didn't write, like `toString` and `constructor`. `Object.hasOwn(scores, name)` is `true` only for keys we put in `scores`, and [`!`](../09-js-if/lecture.html#38) flips it:

<!-- prettier-ignore -->
```js
if (scores[name] === undefined) {   // before
if (!Object.hasOwn(scores, name)) { // after
```
