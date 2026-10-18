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

# Array Basics

---

## Prices Stuck in Keys

<!-- prettier-ignore -->
```js
let bids = { "100.25": 600, "100.00": 1200, "99.75": 500 };
```

Last lecture's order book kept each price in a key ([Order Book, Step 3](lecture-loops-js.html#35)), and that caused trouble:

- The keys needed quotes, or `100.00` would have become `"100"` and jumped to the front.
- Keys are strings, so finding the best bid took a loop and `Number()` ([Keys Are Strings](lecture-loops-js.html#36)).
- The levels stayed in the order we typed them, so a new price couldn't go in the middle.

An **array** keeps values in order, and numbers stay numbers.

---

## Arrays

```js
let array = [first, second, third];
```

- An **array** holds a list of values, in order, inside `[ ]`.
- Commas separate the values. Each value is an **item**.
- Each item has an **index**, its position in the list. Indexes start at 0.

---

## Example: Today's Trades

```js
let prices = [100.1, 100.3, 100.45, 100.25, 100.25, 100.5];
```

<div class="centered">

| Index | 0       | 1       | 2        | 3        | 4        | 5       |
| ----- | ------- | ------- | -------- | -------- | -------- | ------- |
| Item  | `100.1` | `100.3` | `100.45` | `100.25` | `100.25` | `100.5` |

</div>

`prices` holds the price of every TEST trade today, oldest first. The first trade is at index 0, so the sixth is at index 5.

---

## Reading Items

<!-- prettier-ignore -->
```js
console.log(prices[0]);                 // 100.1
console.log(prices.length);             // 6
console.log(prices[prices.length - 1]); // 100.5
console.log(prices[6]);                 // undefined
```

Brackets read an item by its index, as they read a property by its key in [Brackets](lecture-loops-js.html#6). `length` counts the items, so the last index is always `length - 1`. Past the end, we get `undefined`, the same as for a missing key.

---

## Changing an Array

<!-- prettier-ignore -->
```js
let sizes = [300, 900, 400];

sizes[1] = 1000;             // [300, 1000, 400]
sizes.push(500);             // [300, 1000, 400, 500]
let popped = sizes.pop();    // 500, and sizes is [300, 1000, 400]
let shifted = sizes.shift(); // 300, and sizes is [1000, 400]
```

<div class="centered">

| Method       | Does                     | Gives Back     |
| ------------ | ------------------------ | -------------- |
| `push(item)` | adds `item` to the end   | the new length |
| `pop()`      | takes off the last item  | that item      |
| `shift()`    | takes off the first item | that item      |

</div>

---

## `includes` and `join`

<!-- prettier-ignore -->
```js
let tickers = ["TEST", "BLIP"];

console.log(tickers.includes("BLIP")); // true
console.log(tickers.includes("blip")); // false
console.log(tickers.join(", "));       // TEST, BLIP
```

`includes` asks whether an item is in the array. Strings have to match exactly, which is why [Parsons 1](lecture-loops-js.html#10) turned the ticker to uppercase before looking it up. `join` glues the items into one string, with its argument between each pair.

---

## Let's Build a Trading Desk

Today's page does more than last lecture's: it tracks today's trades, and its buttons sell shares and add orders to the book. Its starter has two files on GitHub: [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/orderbook-arrays-starter/index.html) and [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/orderbook-arrays-starter/practice.js). Set them up in WebStorm, in a new folder:

1. Open each file, and click **Copy raw file**, the copy icon above the code.
2. Paste each one into a new file in WebStorm with the same name.

`practice.js` starts with today's `prices`, the order book, and `depthBar` from [Order Book, Step 1](lecture-loops-js.html#32). The header already shows the last trade with `prices[prices.length - 1]`.

---

## Problem (Us): Watchlist

The watchlist shows a list of tickers, and its **Add** button calls `addTicker()`. Let's write it in the Watchlist section of `practice.js`.

1. Store `["TEST", "BLIP"]` in `watchlist`. Write `showWatchlist()`, which shows the list with `join`, and call it once.
2. Write `addTicker()`. If `watchlist` doesn't include the ticker in the box yet, `push` it. Then show the list again.
3. What should happen when the box is empty?

Uncomment the section's page lines where the code needs them.

---

## Solution (Us): Watchlist

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let watchlist = ["TEST", "BLIP"];

function showWatchlist() {
  document.getElementById("watchlist").textContent = watchlist.join(", ");
}

function addTicker() {
  let ticker = document.getElementById("new-ticker").value;
  if (ticker !== "" && !watchlist.includes(ticker)) {
    watchlist.push(ticker);
  }
  showWatchlist();
}

showWatchlist();
```

`showWatchlist()` runs at load and after every click, so it's a [function](lecture-js.html#89). `watchlist` sits outside `addTicker()`, so it keeps its tickers between clicks, as `ordered` did in [Parsons 3](lecture-conditional-js.html#53). Without `ticker !== ""`, an empty box adds an empty ticker.

---

## Problem (You): Remove Last

The **Remove last** button calls `removeTicker()`. It takes the last ticker off the watchlist, shows the list again, and says which ticker it took off: `Removed BLIP`.

<!-- prettier-ignore -->
```js
document.getElementById("removed").textContent = `Removed ${removed}`;
let removed = watchlist.pop;
}
showWatchlist();
let removed = watchlist[watchlist.length];
function removeTicker() {
let removed = watchlist.pop();
```

Assemble `removeTicker()` in the Remove Last section. Two of the lines are wrong.

---

## Solution (You): Remove Last

```js
function removeTicker() {
  let removed = watchlist.pop();
  showWatchlist();
  document.getElementById("removed").textContent = `Removed ${removed}`;
}
```

`watchlist.pop` without `()` doesn't call `pop`. Nothing comes off, and the page says `Removed function pop() { [native code] }`. `watchlist[watchlist.length]` reads one past the last index, so it gives `undefined` and takes nothing off. Once the list is empty, `pop()` gives back `undefined` too.

---

# Looping Over Arrays

---

## Looping with an Index

<div class="side-by-side">
<div>

```js
for (let i = 0; i < prices.length; i++) {
  console.log(`${i}: ${prices[i]}`);
}
```

</div>
<div>

<p class="caption">Console</p>

```text
0: 100.1
1: 100.3
2: 100.45
3: 100.25
4: 100.25
5: 100.5
```

</div>
</div>

`i` takes every index from 0 to `length - 1`: start at 0 with `<`, as in [How Many Times?](lecture-loops-js.html#24) The condition uses `length`, so the loop fits an array of any size.

---

## `for...of`

<div class="side-by-side">
<div>

```js
for (let price of prices) {
  console.log(price);
}
```

</div>
<div>

<p class="caption">Console</p>

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

`for...of` hands the loop each item itself, so there's no index to look up. Name the array after many things and the loop variable after one: `price` of `prices`.

---

## Which Loop?

<div class="centered">

| We Need...                      | Use                                       |
| ------------------------------- | ----------------------------------------- |
| each item, first to last        | `for (let price of prices)`               |
| the index, or a different order | `for (let i = 0; i < prices.length; i++)` |
| each key of an object           | `for (let key in object)`                 |

</div>

With an index, a loop can go backward, or compare an item with the one before it.

---

## Problem (Us): Today's Range

Today's range is the lowest and highest price so far: `$100.10 to $100.50`. Let's find it in the Today's Range section.

1. Start `low` and `high` at the first trade in `prices` (`practice.js`, line 1).
2. Loop over `prices` with `for...of`, and keep the lowest and highest.
3. Store the range in `range`, like `$100.10 to $100.50`.
4. Uncomment the section's page line.

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

[Spread](lecture-loops-js.html#38) started `bestAsk` at `Infinity`. An array has a first item, so `low` and `high` can start at a real price. These prices are numbers, so they need no `Number()`.

---

## Problem (You): Upticks

<style scoped>
pre { font-size: 0.75em; }
</style>

A trade above the one before it is an **uptick**, and a trade below it is a **downtick**. A trade at the same price is neither. The first trade has nothing before it, so start at index 1. Show `3 up, 1 down`.

<!-- prettier-ignore -->
```js
} else if (prices[i] < prices[i - 1]) {
let upticks = 0;
upticks++;
}
if (prices[i] > prices[i] - 1) {
document.getElementById("ticks").textContent = `${upticks} up, ${downticks} down`;
for (let i = 1; i < prices.length; i++) {
} else {
downticks++;
let downticks = 0;
if (prices[i] > prices[i - 1]) {
}
```

Assemble the program in the Upticks section. Two of the lines are wrong.

---

## Solution (You): Upticks

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let upticks = 0;
let downticks = 0;

for (let i = 1; i < prices.length; i++) {
  if (prices[i] > prices[i - 1]) {
    upticks++;
  } else if (prices[i] < prices[i - 1]) {
    downticks++;
  }
}

document.getElementById("ticks").textContent = `${upticks} up, ${downticks} down`;
```

`} else {` would count the second 100.25 as a downtick: `3 up, 2 down`. `prices[i] - 1` subtracts 1 from the price instead of moving back one index, so every trade looks like an uptick: `5 up, 0 down`.

---

# Arrays of Objects

---

## Arrays of Objects

<!-- prettier-ignore -->
```js
let bids = [
  { price: 100.25, shares: 600 },
  { price: 100, shares: 1200 },
  { price: 99.75, shares: 500 },
];

console.log(bids[0].price);            // 100.25
console.log(bids[1].price.toFixed(2)); // 100.00
```

Each item is an object for one price level, and `bids[0].price` reads the first level's price. The best bid comes first, so the array holds the book's order. Prices are plain numbers: no quotes, and [`toFixed(2)`](lecture-js.html#78) puts back the zeros in `100.00`.

---

## Two Names, One Object

```js
let best = bids[0];
best.shares -= 100;

console.log(bids[0].shares); // 500
```

`best = bids[0]` doesn't copy the level. Both names reach the same object, so changing `best.shares` changes the book. Numbers and strings copy by value, as in [Copy by Value](lecture-js.html#99), but an object or an array is shared by all of its names.

---

## Problem (Us): Market Sell

The **Sell 500 at market** button calls `sellAtMarket()`. As in [Market Sell](lecture-loops-js.html#43), it sells to the best bid first. Now the book changes: a filled level leaves, and a partly filled level keeps its leftover shares. Let's write it in the Market Sell section.

1. Count the shares left to sell in `toSell`. `push` each fill, like `500 @ 100.25`, onto an array, `fills`.
2. While there are shares to sell and bids to sell to, sell to `bids[0]` (`practice.js`, line 3). If it has no more shares than we need, sell them all and `shift` it off. Otherwise, take what we need from its `shares`.
3. At the end of `sellAtMarket()`, uncomment the section's page line. Then call `drawBook()` (`practice.js`, line 33), which clears the bids and draws them again.

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

`best` and `bids[0]` are [one object](#24), so `best.shares -= toSell` changes the book itself. A fill that empties a level can be the last fill, so a `", "` typed after each fill could be left dangling at the end. `join` puts commas only between fills.

---

## Problem (You): Draw the Asks

`drawBook()` (`practice.js`, line 33) draws only the bids. Add the asks (`practice.js`, line 8) in its Draw the Asks section. They're stored best first, like the bids, so the lowest ask is at index 0.

1. Clear the asks list, as `drawBook()` clears the bids. Then loop over `asks` backward, from the last index down to 0, so the highest ask is on top. [Opening Bell](lecture-loops-js.html#28) counted down with `i--`, but it stopped at 1.
2. Store the spread in `spread`: the best ask's price minus the best bid's. Both are at index 0, so no loop is needed.
3. Uncomment the section's page line.

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
  document.getElementById("spread").textContent = `Spread: $${spread.toFixed(2)}`;
}
```

`for...of` only goes forward, so this loop needs the index. With `i > 0`, it would leave out index 0, the best ask. Without the line that clears the list, each redraw would add the asks again, below the old ones.

---

## Problem (You): Empty Book

Click **Sell 500 at market** five times. The fifth click sells the last 300 shares, and the bids list empties, but the spread still says `$0.75`. The console shows:

```text
TypeError: Cannot read properties of undefined (reading 'price')
```

1. Find the line in `drawBook()` that fails when `bids` is empty.
2. When either side is empty, show `Spread: none`.
3. At the end of `drawBook()`, turn off the **Sell** button when there are no bids, as in [Sold Out](lecture-conditional-js.html#12). Use the page line in its Empty Book section.

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
    document.getElementById("spread").textContent = `Spread: $${spread.toFixed(2)}`;
  } else {
    document.getElementById("spread").textContent = "Spread: none";
  }

  document.getElementById("sell").disabled = bids.length === 0;
}
```

Once `bids` is empty, `bids[0]` is `undefined`, so `bids[0].price` stopped `drawBook()` before it reached the spread. The button line runs on every redraw, so a new bid from Place a Bid turns the button back on.

---

# `forEach`

---

## Functions Are Values

```js
let fee = function (amount) {
  return amount * 0.01;
};

console.log(fee(500)); // 5
```

A [function](lecture-js.html#90) is a value, like a number or a string, so a variable can hold one. We call it with the variable's name: `fee(500)`.

`forEach`, next, takes a function value like this one and calls it once for each item in an array.

---

## `forEach`

```js
prices.forEach(function (price) {
  console.log(price);
});
```

- Every array has `forEach`, which we call with a dot, like `push`. It calls the function we give it once for each item in the array, with that item as the argument.
- The function has no name, since only `forEach` calls it.
- The `)` after the `}` closes `forEach(`, and the `;` ends the statement.

---

## Example: `for...of` vs. `forEach`

<div class="side-by-side">
<div>

<p class="caption"><code>for...of</code></p>

```js
for (let price of prices) {
  console.log(price);
}
```

<p class="caption"><code>forEach</code></p>

```js
prices.forEach(function (price) {
  console.log(price);
});
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

Both loops print every price. `break` and `continue` work only in a loop, so inside `forEach`'s function, either one is a syntax error. When a loop might stop early, use `for...of`.

---

## Problem (Us): Average Price

Today's Trades should show the average price: `$100.31`. Let's find it in the Average Price section.

1. Use `forEach` to add up `prices` in `priceSum`.
2. Divide by the number of trades, and store it in `average`, with two decimal places.
3. Uncomment the section's page line.

---

## Solution (Us): Average Price

```js
let priceSum = 0;

prices.forEach(function (price) {
  priceSum += price;
});

let average = (priceSum / prices.length).toFixed(2);
document.getElementById("average").textContent = `$${average}`;
```

`priceSum` sits outside the function, so it keeps its total between calls. Inside it, the total would start over at 0 for every price. `prices.length` counts the trades, so we don't need a counter.

---

# Arrow Functions

---

## From `function` to `=>`

![w:1000 The same fee function written three ways. First, let fee = function (amount) { return amount * 0.01; }; stored a function in a variable. Second, the arrow function let fee = (amount) => { return amount * 0.01; }; dropped the word function and put => after the parameters. Third, let fee = (amount) => amount * 0.01; dropped the braces, return, and the inner semicolon, since the body was one expression, and gave back amount * 0.01 by itself.](examples/diagrams/arrow-function.svg)

An **arrow function** is a shorter way to write a function value. Without `{ }`, it gives back its one expression, with no `return`.

---

## Braces and When to Use `=>`

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
let fee = (amount) => { amount * 0.01; };
console.log(fee(500)); // undefined

prices.forEach((price) => console.log(price));
prices.forEach((price) => {
  priceSum += price;
});
```

- With `{ }`, the body is a block, and a block gives back only what [`return`](lecture-js.html#96) gives back. That breaks `fee`.
- `forEach` doesn't use what its function gives back, so either form works there. Average Price's loop keeps its `{ }` because it changes `priceSum`.
- Use an arrow function for a one-line formula, like `fee`, or for a function we hand to `forEach` or `sort`. Use `function` for the rest, like `drawBook()`, or `addTicker()` from `onclick`.

---

## Problem (You): Movers

<style scoped>
pre { font-size: 0.75em; }
</style>

`positions` (`practice.js`, line 14) lists the stocks we hold, each with its opening price, `open`, and today's `price`. Under **Since the Open**, show each one's move since the open, as a percent. A [ternary](lecture-conditional-js.html#51) can pick the starter's `up` (green) or `down` (red) class.

<!-- prettier-ignore -->
```js
let line = `<li class="${trend}">${position.ticker}: ${percent.toFixed(2)}%</li>`;
positions.forEach(position) => {
});
let change = (open, now) => ((now - open) / open) * 100;
document.getElementById("movers").innerHTML += line;
let trend = percent >= 0 ? "up" : "down";
let change = (open, now) => { ((now - open) / open) * 100; };
positions.forEach((position) => {
let percent = change(position.open, position.price);
```

Assemble the program in the Movers section. Two of the lines are wrong.

---

## Solution (You): Movers

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let change = (open, now) => ((now - open) / open) * 100;

positions.forEach((position) => {
  let percent = change(position.open, position.price);
  let trend = percent >= 0 ? "up" : "down";
  let line = `<li class="${trend}">${position.ticker}: ${percent.toFixed(2)}%</li>`;
  document.getElementById("movers").innerHTML += line;
});
```

<div class="demo book"><ul><li class="up">TEST: 0.50%</li><li class="down">BLIP: -1.64%</li><li class="up">WIDG: 2.00%</li></ul></div>

A braced `change` gives back `undefined`, so `percent.toFixed(2)` stops with a TypeError. `forEach(position) => {` closes `forEach(` too soon, a syntax error that stops all of `practice.js`.

---

## `sort` Compares Strings

```js
let levels = [100.25, 99.75, 100];

levels.sort();
console.log(levels); // [100, 100.25, 99.75]

levels.sort((a, b) => a - b);
console.log(levels); // [99.75, 100, 100.25]
```

Without a function, `sort` compares items as strings, as in [Keys Are Strings](lecture-loops-js.html#36). Given a function, `sort` calls it with two items, `a` and `b`. A negative result puts `a` first, and a positive one puts `b` first. Either way, `sort` changes the array itself.

---

## Sorting Objects

<div class="centered">

| Function                      | Sorts               |
| ----------------------------- | ------------------- |
| `(a, b) => a - b`             | smallest first      |
| `(a, b) => b - a`             | largest first       |
| `(a, b) => b.price - a.price` | highest price first |

</div>

For an array of objects, subtract the property to sort by. `a - b` is negative when `a` is smaller, so the smaller item goes first.

---

## Problem (Us): Place a Bid

The order form has **Price** and **Shares** boxes. **Place ask** already works: `placeAsk()` (`practice.js`, line 52) adds an ask and keeps `asks` lowest first. **Place bid** calls `placeBid()`. Let's write it in the Place a Bid section.

1. Read both boxes, and turn each into a number with [`Number()`](lecture-js.html#68), as `placeAsk()` does.
2. `push` a new level onto `bids`. Then sort `bids` so the highest price comes first.
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

<div class="demo book"><ul class="ladder"><li class="bid">100.25 ██████ 600</li><li class="bid">100.10 ███ 300</li><li class="bid">100.00 ████████████ 1200</li><li class="bid">99.75 █████ 500</li></ul></div>

`a.price - b.price`, as in `placeAsk()`, would put the lowest bid first. Without `Number()`, `drawBook()` stops at `bid.price.toFixed(2)`. A real exchange would trade a bid at or above the best ask; ours only adds it to the book.

---

# Conclusion

---

## The Finished Page

Every solution from today, together:

- [TEST Trading Desk](https://bi3mer.github.io/lectures/cs213/js/examples/orderbook-arrays-final/), running live
- [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/orderbook-arrays-final/practice.js) on GitHub, with every section filled in

The HTML is the same as the starter's `index.html`, and `practice.js` starts with the starter's code.

---

## Summary

- An array keeps items in order. `prices[0]` is the first, and `prices[prices.length - 1]` is the last.
- `push` adds to the end, `pop` takes off the last item, and `shift` takes off the first.
- `includes` checks for an item, and `join` glues the items into one string.
- `for...of` gives each item. Use `for` with an index to go backward or compare neighbors.
- An array of objects keeps whole records in order, like `bids[0].price`.
- Two names for one object or array share it and see each other's changes.
- `forEach` calls a function once per item, and `break` and `continue` don't work inside it.
- `sort` compares strings unless we give it a function, like `(a, b) => a - b`.

---

# Questions?

---

## `for...in` on an Array

<div class="side-by-side">
<div>

```js
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

On an array, [`for...in`](lecture-loops-js.html#30) gives the indexes, and like every key, they're strings. `"0" + 1` glues into `"01"`. Loop over an array with `for...of`, or with `for` and an index.
