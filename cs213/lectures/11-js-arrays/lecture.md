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
/* What the page showed, one column for each value we tried. */
.runs { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 24px; }
.runs p { margin: 0; }
/* The theme draws a .demo as a white panel whose 12px edge is a shadow, so the margins keep
   that edge clear of the caption above and the slide's sides. */
.demo { margin: 20px 12px 28px; }
.demo p { margin: 0; }
.demo ul { margin: 0; }
/* Pieces of the trading desk page, drawn small inside a .demo, in the page's dark colors. */
.demo.book { background-color: #161b22; color: #e6edf3; box-shadow: 0 0 0 12px #161b22; }
.demo.book .ladder { padding: 0; list-style: none; font-family: monospace; font-size: 22px; }
.demo.book .ask, .demo.book .down { color: tomato; }
.demo.book .bid, .demo.book .up { color: limegreen; }
</style>

# Arrays

Colan Biemer

---

## What We Did

<!-- prettier-ignore -->
```js
let bids = { 100.25: 600, "100.00": 1200, 99.75: 500 };
```

Last lecture's order book [kept each price in a key](../10-js-objects-loops/lecture.html#35), and that caused trouble:

- `100.00` needed quotes, or it would have become `"100"` and jumped to the front.
- Keys are strings, so [finding the best bid](../10-js-objects-loops/lecture.html#36) took a loop and `Number()`.
- The levels stayed in the order we typed them, so a new price couldn't go in the middle.

---

## What We Should Have Done

An **array** holds an ordered list of values. Each value sits at a numbered position, counting from 0. (This is where the term _zero-indexed_ comes from.)

Instead of an object, we should have used an **array of objects** where each value is an object, like one price level with its price and shares. We'll [rebuild this book](#32) that way, without any of these three problems.

---

## Arrays

```js
let colors = ["red", "green", "blue"];
let mixed = ["red", 42, true];
let empty = [];
```

- Write an array inside `[ ]`, with commas between the values. Each value is an **item**.
- Items don't have to be numbers. Any value works, including strings, booleans, and objects, and `mixed` holds three types at once.

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
let ticker = "TEST";
console.log(ticker[1]); // E
```

| Index     | 0     | 1     | 2     | 3     |
| --------- | ----- | ----- | ----- | ----- |
| Character | `"T"` | `"E"` | `"S"` | `"T"` |

</div>
</div>

- Each item has an **index**, its position in the list. Indexes start at 0, so the third item is at index 2.
- A string numbers its characters the same way, so `ticker[1]` is the second character, `"E"`.
- Brackets read an item by its index, as [they can be used to access objects](../10-js-objects-loops/lecture.html#6).

---

## `length`

<!-- prettier-ignore -->
```js
let colors = ["red", "green", "blue"];
console.log(colors.length); // 3
console.log([].length);     // 0
console.log("TEST".length); // 4
```

- `length` counts the items. Indexes start at 0, so the last index is always `length - 1`: `colors[colors.length - 1]` is `"blue"`.
- [Strings have `length` too](../09-js-if/lecture.html#23), and it counts the characters.

---

## Reading Items

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
// the price of every TEST trade today, oldest first
let prices = [100.1, 100.3, 100.45, 100.25, 100.25, 100.5];

console.log(prices[0]);                 // 100.1
console.log(prices[2]);                 // 100.45
console.log(prices[prices.length - 1]); // 100.5
console.log(prices[prices.length]);     // undefined
console.log(prices[-1]);                // undefined
```

Only indexes 0 to `length - 1` hold items. Any other index gives `undefined`, the same as a missing key, and `-1` doesn't count back from the end.

---

## Aside: Why `undefined`?

Python and Java stop with an error on an index that is too large. JavaScript's first version (1995) had no way to catch errors, so it gave `undefined` instead.

Checking the index is up to us, or `undefined` [will break the program later on](#47).

---

## Replacing an Item

```js
let tickers = ["TEST", "BLIP"];
tickers[1] = "WIDG";
console.log(tickers); // ["TEST", "WIDG"]
```

Assigning to an index replaces the item there, just as assigning to a key replaces a property's value.

---

## `push`

```js
let tickers = ["TEST", "WIDG"];
tickers.push("BLIP");
console.log(tickers); // ["TEST", "WIDG", "BLIP"]
```

`push` adds an item to the end of the array. As a result, the `length` of the array (`tickers` in this case) grows by 1.

---

## `pop`

<!-- prettier-ignore -->
```js
let tickers = ["TEST", "WIDG", "BLIP"];
let popped = tickers.pop();
console.log(popped);  // BLIP
console.log(tickers); // ["TEST", "WIDG"]
```

`pop` takes the last item off and returns it.

---

## `shift`

<!-- prettier-ignore -->
```js
let tickers = ["TEST", "WIDG", "BLIP"];
let shifted = tickers.shift();
console.log(shifted); // TEST
console.log(tickers); // ["WIDG", "BLIP"]
```

`shift` removes the first item off and returns it. Every other item moves down one index. (The reverse of `pop`.)

---

## `unshift`

```js
let tickers = ["WIDG", "BLIP"];
tickers.unshift("TEST");
console.log(tickers); // ["TEST", "WIDG", "BLIP"]
```

`unshift` adds an item to the front of the array, where `push` adds to the end. Every other item moves up one index.

---

## `splice`

```js
let tickers = ["TEST", "BLIP"];
tickers.splice(1, 0, "WIDG");
console.log(tickers); // ["TEST", "WIDG", "BLIP"]
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

---

## `includes`

<!-- prettier-ignore -->
```js
let tickers = ["TEST", "WIDG", "BLIP"];
console.log(tickers.includes("BLIP")); // true
console.log(tickers.includes("blip")); // false
```

`includes` checks for an exact match, so `"blip"` doesn't match `"BLIP"`.

---

## `join`

<!-- prettier-ignore -->
```js
let tickers = ["TEST", "WIDG", "BLIP"];
console.log(tickers.join(", "));  // TEST, WIDG, BLIP
console.log(tickers.join(" | ")); // TEST | WIDG | BLIP
```

`join` glues the items into one string, with its argument between each pair.

---

## Index or `for...of`

<style scoped>
pre { font-size: 0.75em; }
</style>

<div class="side-by-side">
<div>

<p class="caption">With an index</p>

```js
let prices = [100.1, 100.3, 100.45, 100.25, 100.25, 100.5];
for (let i = 0; i < prices.length; i++) {
  console.log(prices[i]);
}
```

<p class="caption"><code>for...of</code></p>

```js
let prices = [100.1, 100.3, 100.45, 100.25, 100.25, 100.5];
for (let price of prices) {
  console.log(price);
}
```

</div>
<div>

<p class="caption">Console, for both</p>

```text
100.1
100.3
100.45
100.25
100.25
100.5
```

</div>
</div>

- `i` takes [every index from 0 to `length - 1`](../10-js-objects-loops/lecture.html#24), so the loop fits any array.
- `for...of` hands the loop each item itself: `price` of `prices`. Use an index only to go backward, or to compare an item with the one before it.

---

## `for...in` on an Array

<div class="side-by-side">
<div>

```js
let prices = [100.1, 100.3, 100.45, 100.25, 100.25, 100.5];
for (let i in prices) {
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

On an array, [`for...in`](../10-js-objects-loops/lecture.html#30) gives the indexes, and like every key, they're strings. `"0" + 1` glues into `"01"`. Loop over an array with `for...of`, or with `for` and an index.

---

## Arrays of Objects

```js
let bids = [
  { price: 100.25, shares: 600 },
  { price: 100, shares: 1200 },
  { price: 99.75, shares: 500 },
];
console.log(bids[1].price.toFixed(2)); // 100.00
```

Each item is an object for one price level, best bid first, so `bids[1].price` is the second's (`{ price: 100, shares: 1200 }`) price.

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

---

## Copy by Reference

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let a = { shares: 600 };
let b = a;

b.shares -= 100;
console.log(`a.shares = ${a.shares}, b.shares = ${b.shares}`);

a.shares -= 50;
console.log(`a.shares = ${a.shares}, b.shares = ${b.shares}`);
```

<p class="caption">Console</p>

```text
a.shares = 500, b.shares = 500
a.shares = 450, b.shares = 450
```

With an object, `let b = a` doesn't copy the object. `a` holds a **reference** to the object, not the object itself, and `b` gets the same reference. Both names point to one object, so `a.shares` and `b.shares` are the same property.

---

## Two Names, One Object

<style scoped>
pre { font-size: 0.75em; }
</style>

<div class="side-by-side">
<div>

```js
let bids = [
  { price: 100.25, shares: 600 },
  { price: 100, shares: 1200 },
  { price: 99.75, shares: 500 },
];

let best = bids[0];
best.shares -= 100;
console.log(bids[0].shares);
```

<p class="caption">Console</p>

```text
500
```

</div>
<div>

![w:500 Step 1: bids[0] held a reference, an arrow to an object with price 100.25 and shares 600. Step 2: let best = bids[0] copied the reference into best, so best's arrow pointed to the same object. Step 3: best.shares -= 100 changed that object's shares from 600 to 500. Step 4: console.log(bids[0].shares) followed bids[0]'s arrow to the same object and printed 500.](examples/diagrams/copy-by-reference.svg)

</div>
</div>

`best = bids[0]` copied the arrow, not the object. Both arrows lead to the object that `best.shares -= 100` changed.

---

## Value or Reference?

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
let watchList = ["TEST", "BLIP"];
let list = watchlist;
list.push("WIDG");
console.log(watchList); // ["TEST", "BLIP", "WIDG"]
```

<center>

| Copied by value              | Shared by reference               |
| ---------------------------- | --------------------------------- |
| numbers, like `600`          | objects, like `{ shares: 600 }`   |
| strings, like `"TEST"`       | arrays, like `["TEST", "BLIP"]`   |
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
let prices = [100.1, 100.3, 100.45, 100.25, 100.25, 100.5];

prices.forEach(function (price) {
  console.log(price);
});
```

- A [function](../08-js-intro/lecture.html#90) is a value, which means that we pass a function to another function as a parameter. `forEach` calls it once for each item, with that item as the argument.
- There's no name after `function`, so it is an **anonymous function**. It needs no name, since only `forEach` calls it. The `)` after the `}` closes `forEach(`.
- This prints every price, like [`for...of`](#20). `break` and `continue` are syntax errors inside `forEach`'s function, so use `for...of` when a loop might stop early.

---

## A Function in a Variable

```js
let fee = function (amount) {
  return amount * 0.01;
};

console.log(fee(500)); // 5
```

A variable can hold a function value, like `fee`, and we call it by the variable's name: `fee(500)`.

---

## From `function` to `=>`

![w:1000 The same fee function written three ways. First, let fee = function (amount) { return amount * 0.01; }; stored a function in a variable. Second, the arrow function let fee = (amount) => { return amount * 0.01; }; dropped the word function and put => after the parameters. Third, let fee = (amount) => amount * 0.01; dropped the braces, return, and the inner semicolon, since the body was one expression, and returned amount * 0.01 by itself.](examples/diagrams/arrow-function.svg)

An **arrow function** is a shorter way to write a function value. Without `{ }`, it returns its one expression without writing `return`.

---

## `sort`

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let levels = [100.25, 99.75, 100];

levels.sort();
console.log(levels); // [100, 100.25, 99.75]

levels.sort((a, b) => a - b);
console.log(levels); // [99.75, 100, 100.25]
```

- Without a function, `sort` [compares items as strings](../10-js-objects-loops/lecture.html#36).
- Given one, it passes two items, `a` and `b`, and a negative result puts `a` first. `a - b` sorts smallest first, and `b - a` largest first.
- For objects, subtract a property: `(a, b) => b.price - a.price` puts the highest price first. `sort` changes the array itself.

---

## The Order Book as an Array

```js
let bids = [
  { price: 100.25, shares: 600 },
  { price: 100, shares: 1200 },
  { price: 99.75, shares: 500 },
];
```

Each of [the three problems](#2) goes away:

- Prices need no quotes, since they are values, not keys. [`toFixed(2)`](../08-js-intro/lecture.html#78) shows `100` as `100.00`.
- The best bid is always first, at `bids[0]`, so finding it takes no loop and no `Number()`.
- A new bid at 100.10 goes in with `push`, and `sort` moves it between `100.25` and `100.00`.

---

# Building the Trading Desk

---

## Setting Up the Starter

Today's page does more than last lecture's: it tracks today's trades, and its buttons sell shares and add orders to the book. Its starter has two files on GitHub: [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/11-js-arrays/examples/orderbook-arrays-starter/index.html) and [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/11-js-arrays/examples/orderbook-arrays-starter/practice.js). Set them up in WebStorm, in a new folder:

1. Open each file, and click **Copy raw file**, the copy icon above the code.
2. Paste each one into a new file in WebStorm with the same name.

`practice.js` starts with today's `prices`, the order book, and [last lecture's `depthBar`](../10-js-objects-loops/lecture.html#32). The header already shows the last trade with `prices[prices.length - 1]`.

---

## Problem (Us): Watchlist

The watchlist shows a list of tickers, and its **Add** button calls `addTicker()`. Let's fill in the Watchlist section of `practice.js`.

1. Search `practice.js` for `@1`, and put `"TEST"` and `"BLIP"` in the empty `watchlist`.
2. In `showWatchList()`, replace the `?` with the tickers, separated by commas, using [`join`](#19).
3. In `addTicker()`, `push` the ticker in the box if `watchlist` doesn't include it yet, but make sure that it is [uppercase](../10-js-objects-loops/lecture.html#10). Then show the list again.
4. What should happen when the box is empty?

Uncomment the page lines as you use them.

---

## Solution (Us): Watchlist

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let watchlist = ["TEST", "BLIP"]; // @1

function showWatchList() {
  document.getElementById("watchlist").textContent = watchlist.join(", ");
}

function addTicker() {
  let ticker = document.getElementById("new-ticker").value.toUpperCase();
  if (ticker !== "" && !watchlist.includes(ticker)) {
    watchlist.push(ticker);
  }
  showWatchList();
}

showWatchList();
```

`showWatchList()` runs at load and after every click, so it's a [function](../08-js-intro/lecture.html#89). `watchlist` sits outside `addTicker()`, so it keeps its tickers between clicks, as [`ordered` did](../09-js-if/lecture.html#53). Without `ticker !== ""`, an empty box adds an empty ticker.

---

## Problem (Us): Today's Range

<style scoped>
pre { font-size: 0.75em; }
</style>

Today's range is the lowest and highest price so far: `$100.10 to $100.50`. Let's turn the pseudocode into code in the Today's Range section, looping with [`for...of`](#20).

```text
set low to the first price
set high to the first price

for each price in prices
  if price is lower than low
    set low to price
  if price is higher than high
    set high to price

set range to "$low to $high", each with two decimal places
put range on the page
```

For the last line, uncomment the page line, and replace its `?` with `range`.

---

## Solution (Us): Today's Range

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let low = prices[0];
let high = prices[0];

for (let price of prices) {
  if (price < low) {
    low = price;
  }
  if (price > high) {
    high = price;
  }
}

let range = `$${low.toFixed(2)} to $${high.toFixed(2)}`;
document.getElementById("range").textContent = range;
```

Last lecture, [`bestAsk` started at `Infinity`](../10-js-objects-loops/lecture.html#38). `prices` has a first item, so `low` and `high` can start at a real price. These prices are numbers, so they need no `Number()`.

---

## What If There Are No Trades?

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let prices = [];

let low = prices[0];
let high = prices[0];
let range = `$${low.toFixed(2)} to $${high.toFixed(2)}`;
```

<p class="caption">Console</p>

```text
TypeError: Cannot read properties of undefined (reading 'toFixed')
```

Starting at `prices[0]` assumes there is at least one trade. With none, `low` is `undefined`, and [it breaks the program a line later](#8). Checking `prices.length > 0` first would catch that.

---

## Problem (You): Parsons 1

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
} else if (prices[i] < prices[i - 1]) {
let upticks = 0;
parsons1();
upticks++;
}
if (prices[i] > prices[i] - 1) {
document.getElementById("ticks").textContent = `${upticks} up, ${downticks} down`;
for (let i = 1; i < prices.length; i++) {
} else {
function parsons1() {
downticks++;
}
let downticks = 0;
if (prices[i] > prices[i - 1]) {
}
```

- Assemble the program in the Parsons 1 section of `practice.js`. Two of the lines are wrong.
- What does `parsons1` do? What should it be named?

---

## Solution (You): Parsons 1

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function parsons1() {
  let upticks = 0;
  let downticks = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      upticks++;
    } else if (prices[i] < prices[i - 1]) {
      downticks++;
    }
  }

  document.getElementById("ticks").textContent =
    `${upticks} up, ${downticks} down`;
}

parsons1();
```

It counts **upticks** and **downticks**, so `countTicks` would be a better name.

---

## Problem (Us): Market Sell

The **Sell 500 at market** button calls `sellAtMarket()`. Like [last lecture's market sell](../10-js-objects-loops/lecture.html#43), it sells to the best bid first. Now the book changes: a filled level leaves, and a partly filled level keeps its leftover shares. Let's fill in `sellAtMarket()` in the Market Sell section.

1. Count the shares left to sell in `toSell`. `push` each fill, like `500 @ 100.25`, onto an array, `fills`.
2. While there are shares to sell and bids to sell to, sell to `bids[0]`. If it has no more shares than we need, sell them all and `shift` it off. Otherwise, take what we need from its `shares`.
3. At the end, uncomment the page line, and replace its `?` with the fills, separated by commas. Then call `drawBook()` (above the Watchlist section), which clears the bids and draws them again.

---

## Solution (Us): Market Sell

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function sellAtMarket() {
  let toSell = 500;
  let fills = [];

  while (toSell > 0 && bids.length > 0) {
    let best = bids[0];

    if (best.shares <= toSell) {
      fills.push(`${best.shares} @ ${best.price.toFixed(2)}`);
      toSell -= best.shares;
      bids.shift();
    } else {
      fills.push(`${toSell} @ ${best.price.toFixed(2)}`);
      best.shares -= toSell;
      toSell = 0;
    }
  }

  document.getElementById("fills").textContent = fills.join(", ");
  drawBook();
}
```

---

## Solution (Us): Market Sell (Continued)

<div class="runs">
<div>
<p class="caption">First click</p>
<div class="demo book"><p>500 @ 100.25</p><ul class="ladder"><li class="bid">100.25 █ 100</li><li class="bid">100.00 ████████████ 1200</li><li class="bid">99.75 █████ 500</li></ul></div>
</div>
<div>
<p class="caption">Second click</p>
<div class="demo book"><p>100 @ 100.25, 400 @ 100.00</p><ul class="ladder"><li class="bid">100.00 ████████ 800</li><li class="bid">99.75 █████ 500</li></ul></div>
</div>
</div>

`best` and `bids[0]` are [one object](#25), so `best.shares -= toSell` changes the book itself. Adding `", "` after each fill would leave one dangling after the last. `join` puts commas only between fills.

---

## Problem (You): Draw the Asks

<style scoped>
pre { font-size: 0.75em; }
</style>

`drawBook()` (above the Watchlist section) draws only the bids. The asks are stored best first, so the lowest ask is at index 0, but the highest ask goes on top. Turn the pseudocode into code in `drawBook()`'s Draw the Asks section.

```text
clear the asks list

for each index i from the last index down to 0
  set ask to the ask at index i
  build an ask line from ask's price, depth bar, and shares
  add the line to the asks list

set spread to the best ask's price minus the best bid's
put spread on the page
```

For the last line, uncomment the page line, and replace its `?` with `spread`, to two decimal places. [The opening-bell countdown](../10-js-objects-loops/lecture.html#28) also used `i--`, but it stopped at 1.

---

## Solution (You): Draw the Asks

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function drawBook() {
  // the bids, from the starter

  document.getElementById("asks").innerHTML = "";

  for (let i = asks.length - 1; i >= 0; i--) {
    let ask = asks[i];
    let bar = depthBar(ask.shares);
    let line = `<li class="ask">${ask.price.toFixed(2)} ${bar} ${ask.shares}</li>`;
    document.getElementById("asks").innerHTML += line;
  }

  let spread = asks[0].price - bids[0].price;
  document.getElementById("spread").textContent =
    `Spread: $${spread.toFixed(2)}`;
}
```

`for...of` only goes forward, and `i >= 0` keeps index 0, the best ask. So, we reverse from the end to the beginning.

---

## Problem (You): Empty Book

<style scoped>
pre { font-size: 0.75em; }
</style>

Five clicks of **Sell 500 at market** empty the bids, but the spread still says `$0.75`, and the console shows:

```text
TypeError: Cannot read properties of undefined (reading 'price')
```

Turn the pseudocode into code. Its `if` replaces Draw the Asks' two spread lines.

```text
if there are asks and there are bids
  set spread to the best ask's price minus the best bid's
  put spread on the page
else
  put "Spread: none" on the page

turn off the Sell button if there are no bids
```

For the last line, replace the `?` in the `disabled` page line, like [the sold-out button](../09-js-if/lecture.html#12).

---

## Solution (You): Empty Book

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function drawBook() {
  // the bids and asks, from Draw the Asks

  if (asks.length > 0 && bids.length > 0) {
    let spread = asks[0].price - bids[0].price;
    document.getElementById("spread").textContent =
      `Spread: $${spread.toFixed(2)}`;
  } else {
    document.getElementById("spread").textContent = "Spread: none";
  }

  document.getElementById("sell").disabled = bids.length === 0;
}
```

Once `bids` is empty, `bids[0]` is `undefined`, so `bids[0].price` stopped `drawBook()` before it reached the spread. The button line runs on every redraw, so the button turns back on once `bids` holds a bid again.

---

## Problem (Us): Average Price

Today's Trades should show the average price: `$100.31`. Let's find it in the Average Price section.

1. Use [`forEach`](#28) with an [arrow function](#30) to add up `prices` in `priceSum`.
2. Divide by the number of trades, and store it in `average`, with two decimal places.
3. Uncomment the page line, and replace its `?` with `average`.

---

## Solution (Us): Average Price

```js
let priceSum = 0;

prices.forEach((price) => {
  priceSum += price;
});

let average = (priceSum / prices.length).toFixed(2);
document.getElementById("average").textContent = `$${average}`;
```

`priceSum` sits outside the function, so it keeps its total between calls. Inside it, the total would start over at 0 for every price. `prices.length` counts the trades, so we don't need a counter.

---

## Problem (You): Parsons 2

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
let line = `<li class="${trend}">${position.ticker}: ${percent.toFixed(2)}%</li>`;
positions.forEach(position) => {
parsons2();
});
let change = (open, now) => ((now - open) / open) * 100;
document.getElementById("movers").innerHTML += line;
}
let trend = percent >= 0 ? "up" : "down";
function parsons2() {
let change = (open, now) => { ((now - open) / open) * 100; };
positions.forEach((position) => {
let percent = change(position.open, position.price);
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
  let change = (open, now) => ((now - open) / open) * 100;

  positions.forEach((position) => {
    let percent = change(position.open, position.price);
    let trend = percent >= 0 ? "up" : "down";
    let line = `<li class="${trend}">${position.ticker}: ${percent.toFixed(2)}%</li>`;
    document.getElementById("movers").innerHTML += line;
  });
}

parsons2();
```

It shows each stock's move since the open, so `showMovers` would be a better name.

---

## Problem (Us): Place a Bid

The order form has **Price** and **Shares** boxes. **Place ask** already works: `placeAsk()` (above the Watchlist section) adds an ask and keeps `asks` lowest first. **Place bid** calls `placeBid()`. Let's fill it in, in the Place a Bid section.

1. Uncomment the two page lines, and turn each box's value into a number with [`Number()`](../08-js-intro/lecture.html#68), as `placeAsk()` does.
2. `push` a new level onto `bids`. Then [sort](#31) `bids` so the highest price comes first.
3. Call `drawBook()`.

A bid for 300 shares at 100.10 should land between 100.25 and 100.00.

---

## Solution (Us): Place a Bid

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function placeBid() {
  let price = Number(document.getElementById("order-price").value);
  let shares = Number(document.getElementById("order-shares").value);

  bids.push({ price: price, shares: shares });
  bids.sort((a, b) => b.price - a.price);
  drawBook();
}
```

`a.price - b.price`, as in `placeAsk()`, would put the lowest bid first. Without `Number()`, `drawBook()` stops at `bid.price.toFixed(2)`. A real exchange would trade a bid at or above the best ask; ours only adds it to the book.

---

# Conclusion

---

## The Finished Page

Every solution from today, together:

- [TEST Trading Desk](https://bi3mer.github.io/lectures/cs213/lectures/11-js-arrays/examples/orderbook-arrays-final/), running live
- [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/11-js-arrays/examples/orderbook-arrays-final/practice.js) on GitHub, with every section filled in

The HTML is the same as the starter's `index.html`, and `practice.js` starts with the starter's code.

---

## Summary

- Arrays and strings index from 0 to `length - 1`. Any other index gives `undefined`.
- `length` counts an array's items, or a string's characters.
- `push` adds to the end, `pop` takes off the last item, and `shift` takes off the first.
- `unshift` adds to the front, and `splice` removes or inserts items at any index.
- `includes` checks for an item, and `join` glues the items into one string.
- `for...of` gives each item, and `for` with an index can go backward.
- An array of objects keeps whole records in order, like `bids[0].price`.
- Numbers and strings copy by value. Objects and arrays share a reference.
- `forEach` calls a function per item. `break` and `continue` fail inside it.
- An arrow function is a shorter function: `(amount) => amount * 0.01`.
- `sort` compares strings unless we give it a function, like `(a, b) => a - b`.

---

# Questions?
