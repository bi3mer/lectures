---
marp: true
theme: lecture
paginate: true
---

<style>
/* Code on the left, the values it gave on the right. */
.side-by-side { display: grid; grid-template-columns: 560px minmax(0, 1fr); gap: 24px; align-items: start; }
.side-by-side p { margin: 0; }
/* Two examples next to each other, in equal columns. */
.pair { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; align-items: start; }
.pair p { margin: 0; }
.caption { font-size: 20px; color: var(--secondary); }
</style>

# Arrays

Colan Biemer

---

## What We Did

```js
let points = { Ada: 600, Grace: 1200, Alan: 500 };
```

Last lecture [kept each value under a key](../10-js-objects-loops/lecture.html#33). For a list, that causes trouble:

- There is no first or second: `points[0]` is `undefined`.
- Finding the top score takes a loop over every key.
- Keys stay in the order we typed them, so a new one cannot go in the middle.

---

## What We Should Have Done

An **array** holds an ordered list of values. Each value sits at a numbered position, counting from 0. (This is where the term _zero-indexed_ comes from.)

Instead of an object, we should have used an **array of objects** where each value is an object, like one player with a name and points. We'll [rebuild this list](#36) that way, without any of these three problems.

---

## Arrays

```js
let colors = ["red", "green", "blue"];
let mixed = ["red", 42, true];
let empty = [];
```

- Write an array inside `[ ]`, with commas between the values. Each value is an **item**.
- Items don't have to be numbers. Any value works, including strings, booleans, and objects, and `mixed` holds three types at once.

How do we get one item back out?

---

## Indexes

<style scoped>
pre { font-size: 0.75em; }
</style>

<div class="pair">
<div>

```js
let colors = ["red", "green", "blue"];
console.log(colors[1]); // green
```

| Index | 0       | 1         | 2        |
| ----- | ------- | --------- | -------- |
| Item  | `"red"` | `"green"` | `"blue"` |

</div>
<div>

```js
let name = "Alan";
console.log(name[1]); // l
```

| Index     | 0     | 1     | 2     | 3     |
| --------- | ----- | ----- | ----- | ----- |
| Character | `"A"` | `"l"` | `"a"` | `"n"` |

</div>
</div>

- Each item has an **index**, its position in the list. Indexes start at 0, so the third item is at index 2.
- A string numbers its characters the same way, so `name[1]` is the second character, `"l"`.
- Brackets read an item by its index, as [they can be used to access objects](../10-js-objects-loops/lecture.html#6).

How do we know how many items there are?

---

## `length`

<!-- prettier-ignore -->
```js
let colors = ["red", "green", "blue"];
console.log(colors.length); // 3
console.log([].length);     // 0
console.log("Alan".length); // 4
```

- `length` counts the items. Indexes start at 0, so the last index is always `length - 1`: `colors[colors.length - 1]` is `"blue"`.
- [Strings have `length` too](../09-js-if/lecture.html#23), and it counts the characters.

What happens at the edges of the array?

---

## Reading Items

<!-- prettier-ignore -->
```js
// every quiz score so far, oldest first
let scores = [88, 75, 91, 82, 82, 95];

console.log(scores[0]);                 // 88
console.log(scores[2]);                 // 91
console.log(scores[scores.length - 1]); // 95
console.log(scores[scores.length]);     // undefined
console.log(scores[-1]);                // undefined
```

Only indexes 0 to `length - 1` hold items. Any other index gives `undefined`, the same as a missing key, and `-1` doesn't count back from the end.

---

## Aside: Why `undefined`?

Python and Java stop with an error on an index that is too large. JavaScript's first version (1995) had no way to catch errors, so it gave `undefined` instead.

Checking the index is up to us, or `undefined` [will break the program later on](#43).

How do we change an item?

---

## Replacing an Item

Let's follow one class list. Anna switches sections, and Mary takes that seat:

```js
let names = ["Alan", "Anna"];
names[1] = "Mary";
console.log(names); // ["Alan", "Mary"]
```

Assigning to an index replaces the item there, just as assigning to a key replaces a property's value.

Then Anna comes back. Mary stays, so the list has to grow.

---

## `push`

```js
names.push("Anna");
console.log(names); // ["Alan", "Mary", "Anna"]
```

`push` adds an item to the end of the array, so `length` grows by 1.

Anna has to leave early. How do we take the last name off?

---

## `pop`

<!-- prettier-ignore -->
```js
let popped = names.pop();
console.log(popped); // Anna
console.log(names);  // ["Alan", "Mary"]
```

`pop` takes the last item off and returns it.

Now Alan, at the front, is called away. What about the first name?

---

## `shift`

<!-- prettier-ignore -->
```js
let shifted = names.shift();
console.log(shifted); // Alan
console.log(names);   // ["Mary"]
```

`shift` takes the first item off and returns it. Every other item moves down one index.

Alan comes back and goes first again.

---

## `unshift`

```js
names.unshift("Alan");
console.log(names); // ["Alan", "Mary"]
```

`unshift` adds an item to the front of the array, where `push` adds to the end. Every other item moves up one index.

Anna is back too, and belongs between them.

---

## Problem: Into the Middle

```js
let names = ["Alan", "Mary"];
// Put "Anna" between them, using only push and pop.
```

<p class="caption">Console</p>

```text
["Alan", "Anna", "Mary"]
```

- What has to happen to Mary first?

---

## Solution: Into the Middle

```js
let last = names.pop();
names.push("Anna");
names.push(last);
```

That works for one name at the end. To reach the middle of a class of 30, we would pop 15 names and push them all back. We need another way...

---

## `splice`

```js
let names = ["Alan", "Mary"];
names.splice(1, 0, "Anna");
console.log(names); // ["Alan", "Anna", "Mary"]
```

- `splice(index, deleteCount, item)` goes to `index`, removes `deleteCount` items there, and inserts `item` in their place.
- `deleteCount` is how many items come out, not how many copies go in, so 0 removes nothing and `splice` only inserts.
- It changes the array itself and returns the removed items in an array.

---

## `splice`: Inserting

<!-- prettier-ignore -->
```js
// quizzes 1 and 4; the student was sick for quizzes 2 and 3
let scores = [88, 75];
let removed = scores.splice(1, 0, 82, 91);
console.log(scores);  // [88, 82, 91, 75]
console.log(removed); // []
```

Quiz 2 goes at index 1, since quizzes count from 1 and indexes count from 0. To insert two scores, list both after `deleteCount`. They go in once each, in order, and quiz 4's 75 moves up to index 3. Nothing came out, so `removed` is empty.

---

## `splice`: Removing

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
// the teacher drops quiz 2
let scores = [88, 82, 91, 75];
let dropped = scores.splice(1, 1);
console.log(dropped); // [82]
console.log(scores);  // [88, 91, 75]

// take out quizzes 3 and 4 to regrade them
let rest = scores.splice(1);
console.log(rest);   // [91, 75]
console.log(scores); // [88]
```

With no items after `deleteCount`, `splice` only removes. It returns an array even for one item, so the score itself is `dropped[0]`. Leaving out `deleteCount` too removes everything from `index` to the end.

---

## `splice`: Replacing

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
// the student retakes quiz 4 and scores 80
let scores = [88, 82, 91, 75];
let replaced = scores.splice(3, 1, 80);
console.log(replaced); // [75]
console.log(scores);   // [88, 82, 91, 80]

// quizzes 2 and 3 become one project, worth 95
let removed = scores.splice(1, 2, 95);
console.log(removed); // [82, 91]
console.log(scores);  // [88, 95, 80]
```

- `splice` removes first, then inserts. The retake swaps 1 score for 1, like `scores[3] = 80`, but `splice` also hands back the old score.
- The two counts don't have to match: for the project, 2 scores came out and 1 went in.

How do we check whether an item is in the array?

---

## Searching by Hand

```js
let found = false;

for (let name of names) {
  if (name === "Anna") {
    found = true;
  }
}
```

Is Anna on the list? That took six lines for one yes-or-no answer. Is there a shorter way?

---

## `includes`

<!-- prettier-ignore -->
```js
let names = ["Alan", "Mary", "Anna"];
console.log(names.includes("Anna")); // true
console.log(names.includes("anna")); // false
```

`includes` checks for an exact match, so `"anna"` doesn't match `"Anna"`.

How do we print the items as one string?

---

## Printing by Hand

```js
let line = "";

for (let name of names) {
  line += `${name}, `;
}

console.log(line); // Alan, Mary, Anna,
```

The list prints, with a comma left over at the end. How do we put commas only between items?

---

## `join`

<!-- prettier-ignore -->
```js
let names = ["Alan", "Mary", "Anna"];
console.log(names.join(", "));  // Alan, Mary, Anna
console.log(names.join(" | ")); // Alan | Mary | Anna
```

`join` glues the items into one string, with its argument between each pair.

How do we visit every item?

---

## Index or `for...of`

<style scoped>
pre { font-size: 0.75em; }
</style>

<div class="side-by-side">
<div>

<p class="caption">With an index</p>

```js
let scores = [88, 75, 91, 82, 82, 95];
for (let i = 0; i < scores.length; i++) {
  console.log(scores[i]);
}
```

<p class="caption"><code>for...of</code></p>

```js
let scores = [88, 75, 91, 82, 82, 95];
for (let score of scores) {
  console.log(score);
}
```

</div>
<div>

<p class="caption">Console, for both</p>

```text
88
75
91
82
82
95
```

</div>
</div>

- `i` takes [every index from 0 to `length - 1`](../10-js-objects-loops/lecture.html#26), so the loop fits any array.
- `for...of` hands the loop each item itself: `score` of `scores`. Use an index only to go backward, or to compare an item with the one before it.

---

## `for...in` on an Array

<div class="side-by-side">
<div>

```js
let scores = [88, 75, 91, 82, 82, 95];
for (let i in scores) {
  console.log(i + 1);
}
```

</div>
<div>

<p class="caption">Console</p>

```text
01
11
21
31
41
51
```

</div>
</div>

On an array, [`for...in`](../10-js-objects-loops/lecture.html#33) gives the indexes, and like every key, they're strings. `"0" + 1` glues into `"01"`. Loop over an array with `for...of`, or with `for` and an index.

Items can be any value. What about objects?

---

## Arrays of Objects

```js
let players = [
  { name: "Ada", points: 600 },
  { name: "Grace", points: 1200 },
  { name: "Alan", points: 500 },
];
console.log(players[1].name); // Grace
```

Each item is an object for one player, so `players[1].name` is the second player's name.

What happens when we store one of these objects in a new variable? Let's start with a number.

---

## Copy by Value

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let a = 600;
let b = a;
b -= 100;

console.log(`a = ${a}`);
console.log(`b = ${b}`);
```

<p class="caption">Console</p>

```text
a = 600
b = 500
```

`let b = a` puts a copy of 600 in `b`, so changing `b` leaves `a` alone. A parameter gets a copy the same way, as [`count` did in `addFreeBag(bags)`](../08-js-intro/lecture.html#99).

Does an object copy the same way?

---

## Copy by Reference

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let a = { points: 600 };
let b = a;

b.points -= 100;
console.log(`a.points = ${a.points}, b.points = ${b.points}`);

a.points -= 50;
console.log(`a.points = ${a.points}, b.points = ${b.points}`);
```

<p class="caption">Console</p>

```text
a.points = 500, b.points = 500
a.points = 450, b.points = 450
```

With an object, `let b = a` doesn't copy the object. `a` holds a **reference** to the object, not the object itself, and `b` gets the same reference. Both names point to one object, so `a.points` and `b.points` are the same property.

---

## Two Names, One Object

<style scoped>
pre { font-size: 0.75em; }
</style>

<div class="side-by-side">
<div>

```js
let players = [
  { name: "Ada", points: 600 },
  { name: "Grace", points: 1200 },
  { name: "Alan", points: 500 },
];

let first = players[0];
first.points -= 100;
console.log(players[0].points);
```

<p class="caption">Console</p>

```text
500
```

</div>
<div>

![w:500 Step 1: players[0] held a reference, an arrow to an object with name Ada and points 600. Step 2: let first = players[0] copied the reference into first, so first's arrow pointed to the same object. Step 3: first.points -= 100 changed that object's points from 600 to 500. Step 4: console.log(players[0].points) followed players[0]'s arrow to the same object and printed 500.](examples/diagrams/copy-by-reference.svg)

</div>
</div>

`first = players[0]` copied the arrow, not the object. Both arrows lead to the object that `first.points -= 100` changed.

---

## Value or Reference?

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
let watchList = ["Alan", "Anna"];
let list = watchlist;
list.push("Mary");
console.log(watchList); // ["Alan", "Anna", "Mary"]
```

<center>

| Copied by value              | Shared by reference               |
| ---------------------------- | --------------------------------- |
| numbers, like `600`          | objects, like `{ points: 600 }`   |
| strings, like `"Alan"`       | arrays, like `["Alan", "Anna"]`   |
| booleans, `true` and `false` | functions, like `(a, b) => a - b` |
| `undefined` and `null`       |                                   |

</center>

---

## Changing or Replacing

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let a = [100.25, 100];
let b = a;

b.push(99.75);
console.log(`a = [${a.join(", ")}], b = [${b.join(", ")}]`);

b = [101];
console.log(`a = [${a.join(", ")}], b = [${b.join(", ")}]`);
```

<p class="caption">Console</p>

```text
a = [100.25, 100, 99.75], b = [100.25, 100, 99.75]
a = [100.25, 100, 99.75], b = [101]
```

`b.push(99.75)` changes the one array that `a` and `b` both point to. `b = [101]` points `b` at a new array, and `a` still points to the old one.

---

## `forEach`

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let scores = [88, 75, 91, 82, 82, 95];

scores.forEach(function (score) {
  console.log(score);
});
```

- A [function](../08-js-intro/lecture.html#90) is a value, which means that we pass a function to another function as a parameter. `forEach` calls it once for each item, with that item as the argument.
- There's no name after `function`, so it is an **anonymous function**. It needs no name, since only `forEach` calls it. The `)` after the `}` closes `forEach(`.
- This prints every score, like [`for...of`](#24). `break` and `continue` are syntax errors inside `forEach`'s function, so use `for...of` when a loop might stop early.

Can a function go in a variable, like any other value?

---

## A Function in a Variable

```js
let fee = function (amount) {
  return amount * 0.01;
};

console.log(fee(500)); // 5
```

A variable can hold a function value, like `fee`, and we call it by the variable's name: `fee(500)`.

Is there a shorter way to write this?

---

## From `function` to `=>`

![w:1000 The same fee function written three ways. First, let fee = function (amount) { return amount * 0.01; }; stored a function in a variable. Second, the arrow function let fee = (amount) => { return amount * 0.01; }; dropped the word function and put => after the parameters. Third, let fee = (amount) => amount * 0.01; dropped the braces, return, and the inner semicolon, since the body was one expression, and returned amount * 0.01 by itself.](examples/diagrams/arrow-function.svg)

An **arrow function** is a shorter way to write a function value. Without `{ }`, it returns its one expression without writing `return`.

Now we can put an array in the order we want.

---

## `sort`

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let numbers = [100, 9, 25];

numbers.sort();
console.log(numbers); // [100, 25, 9]

numbers.sort((a, b) => a - b);
console.log(numbers); // [9, 25, 100]
```

- Without a function, `sort` [compares items as strings](../10-js-objects-loops/lecture.html#38).
- Given one, it passes two items, `a` and `b`, and a negative result puts `a` first. `a - b` sorts smallest first, and `b - a` largest first.
- For objects, subtract a property: `(a, b) => b.points - a.points` puts the most points first. `sort` changes the array itself.

---

## The List as an Array

```js
let players = [
  { name: "Ada", points: 600 },
  { name: "Grace", points: 1200 },
  { name: "Alan", points: 500 },
];
```

Each of [the three problems](#2) goes away:

- The list has an order, so `players[0]` is the first player.
- After a [`sort`](#35), the top score is always at `players[0]`, so finding it takes no loop.
- A new player goes in with `push`, and `sort` moves them to the right spot.

---

# Problems

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

## Problem: Add a Name (us)

```js
let names = ["Ada", "Grace"];
let newName = "Alan";
// Add newName if names does not include it yet.
// Then print the names, separated by commas.
```

<p class="caption">Console</p>

```text
Ada, Grace, Alan
```

- What should happen if `newName` is `"Ada"`?

---

## Solution: Add a Name (us)

```js
let names = ["Ada", "Grace"];
let newName = "Alan";

if (!names.includes(newName)) {
  names.push(newName);
}

console.log(names.join(", "));
```

`includes` checks first, `push` adds, and `join` builds the string.

---

## Problem: High and Low (us)

```js
let scores = [88, 75, 91, 82];
// Find the lowest and highest score, then print them.
```

<p class="caption">Console</p>

```text
75 to 91
```

- What should `low` and `high` start at?

---

## Solution: High and Low (us)

```js
let scores = [88, 75, 91, 82];
let low = scores[0];
let high = scores[0];

for (let score of scores) {
  if (score < low) {
    low = score;
  }
  if (score > high) {
    high = score;
  }
}

console.log(`${low} to ${high}`);
```

Both start at the first score, so they begin as real scores.

---

## What If the Array Is Empty?

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let scores = [];

let low = scores[0];
console.log(low.toFixed(2));
```

<p class="caption">Console</p>

```text
TypeError: Cannot read properties of undefined (reading 'toFixed')
```

Starting at `scores[0]` assumes there is at least one score. With none, `low` is `undefined`, and [it breaks the program a line later](#8). Checking `scores.length > 0` first would catch that.

---

## Problem: Ups and Downs (you)

```text
set scores to [88, 75, 91, 82]
set ups to 0
set downs to 0

for each index i from 1 to the last index
  if the score at i is above the score at i - 1
    add 1 to ups
  else if it is below
    add 1 to downs

print "ups up, downs down"
```

<p class="caption">Console</p>

```text
1 up, 2 down
```

---

## Solution: Ups and Downs (you)

```js
let scores = [88, 75, 91, 82];
let ups = 0;
let downs = 0;

for (let i = 1; i < scores.length; i++) {
  if (scores[i] > scores[i - 1]) {
    ups++;
  } else if (scores[i] < scores[i - 1]) {
    downs++;
  }
}

console.log(`${ups} up, ${downs} down`);
```

The loop starts at 1, because the first score has nothing before it.

---

## Problem: Next in Line (us)

```js
let line = ["Ada", "Grace", "Alan"];
// While anyone is in line, take the first name off and print it.
```

<p class="caption">Console</p>

```text
Ada
Grace
Alan
```

---

## Solution: Next in Line (us)

```js
let line = ["Ada", "Grace", "Alan"];

while (line.length > 0) {
  console.log(line.shift());
}
```

`shift` returns the item it removes, and the loop ends when the array is empty.

---

## Problem: Backward (you)

```text
set names to ["Ada", "Grace", "Alan"]

for each index i from the last index down to 0
  print the name at i
```

<p class="caption">Console</p>

```text
Alan
Grace
Ada
```

---

## Solution: Backward (you)

```js
let names = ["Ada", "Grace", "Alan"];

for (let i = names.length - 1; i >= 0; i--) {
  console.log(names[i]);
}
```

Going backward takes an index, so `for...of` cannot do this.

---

## Problem: Average (us)

```js
let scores = [88, 75, 91, 82];
// Add up the scores with forEach and an arrow function.
// Then print the average.
```

<p class="caption">Console</p>

```text
84
```

---

## Solution: Average (us)

```js
let scores = [88, 75, 91, 82];
let total = 0;

scores.forEach((score) => {
  total += score;
});

console.log(total / scores.length);
```

`length` is the number of scores.

---

## Problem: Print the Players (you)

```text
set players to the array from Arrays of Objects

for each player in players
  print "name: points"
```

<p class="caption">Console</p>

```text
Ada: 600
Grace: 1200
Alan: 500
```

---

## Solution: Print the Players (you)

```js
let players = [
  { name: "Ada", points: 600 },
  { name: "Grace", points: 1200 },
  { name: "Alan", points: 500 },
];

players.forEach((player) => {
  console.log(`${player.name}: ${player.points}`);
});
```

Each item is an object, so a dot reads its properties.

---

## Problem: Top Player (us)

```js
let players = [
  { name: "Ada", points: 600 },
  { name: "Grace", points: 1200 },
  { name: "Alan", points: 500 },
];
// Add Linus with 900 points, sort highest first, then print the top name.
```

<p class="caption">Console</p>

```text
Grace
```

---

## Solution: Top Player (us)

```js
let players = [
  { name: "Ada", points: 600 },
  { name: "Grace", points: 1200 },
  { name: "Alan", points: 500 },
];

players.push({ name: "Linus", points: 900 });
players.sort((a, b) => b.points - a.points);
console.log(players[0].name);
```

`b.points - a.points` puts the most points first.

---

# Conclusion

---

## Build It Yourself

The [trading desk](../../demos/11-trading-desk/instruction.html) is a full page built from today's arrays, with step-by-step instructions.

---

## Summary

- Arrays and strings index from 0 to `length - 1`. Any other index gives `undefined`.
- `length` counts an array's items, or a string's characters.
- `push` adds to the end, `pop` takes off the last item, and `shift` takes off the first.
- `unshift` adds to the front, and `splice` removes or inserts items at any index.
- `includes` checks for an item, and `join` glues the items into one string.
- `for...of` gives each item, and `for` with an index can go backward.
- An array of objects keeps whole records in order, like `players[0].points`.
- Numbers and strings copy by value. Objects and arrays share a reference.
- `forEach` calls a function per item. `break` and `continue` fail inside it.
- An arrow function is a shorter function: `(amount) => amount * 0.01`.
- `sort` compares strings unless we give it a function, like `(a, b) => a - b`.

---

## Next Up: Numbers, Math, Dates, and Strings

[Numbers, Math, Dates, and Strings](../12-js-math-dates-strings/lecture.html)

---

# Questions?
