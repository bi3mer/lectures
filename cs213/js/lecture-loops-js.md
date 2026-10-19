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
/* The theme draws a .demo as a white panel whose 12px edge is a shadow, so the margins keep
   that edge clear of the caption above and the slide's sides. */
.demo { margin: 20px 12px 28px; }
.demo p { margin: 0; }
.demo ul { margin: 0; }
/* Pieces of the order book page, drawn small inside a .demo, in the page's dark colors. */
.demo.book { background-color: #161b22; color: #e6edf3; box-shadow: 0 0 0 12px #161b22; }
.demo.book .banner { color: gold; font-weight: bold; }
.demo.book .ladder { padding: 0; list-style: none; font-family: monospace; font-size: 22px; }
.demo.book .ask { color: tomato; }
.demo.book .bid { color: limegreen; }
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

## Example: One Stock Order

<div class="side-by-side">
<div>

```js
let orderSide = "BUY";
let orderTicker = "TEST";
let orderShares = 1000;
let orderPrice = 100.25;
```

</div>
<div>

```js
let order = {
  side: "BUY",
  ticker: "TEST",
  shares: 1000,
  price: 100.25,
};
```

</div>
</div>

Both describe one stock order: buy 1000 shares of TEST at \$100.25 each. Traders call a stock by its **ticker**, a short name like `TEST`. Nothing ties the four variables on the left together, and 100 orders would need 400 of them. The object on the right keeps them under one name, `order`.

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
let order = { side: "BUY", ticker: "TEST", shares: 1000 };

console.log(order.shares); // 1000
console.log(order.price);  // undefined

order.shares = 500;        // changes shares
order.price = 100.25;      // adds price
```

</div>
<div>

```js
let order = {};
order.side = "BUY";
order.ticker = "TEST";
order.shares = 1000;
order.price = 100.25;
```

</div>
</div>

A dot reads a property. A key the object doesn't have gives `undefined`. Storing a value with `=` changes a property, or adds it when the object doesn't have it yet. The code on the right starts from `{}`, an empty object, and adds one property per line.

---

## Brackets

<!-- prettier-ignore -->
```js
let key = "ticker";

console.log(order["ticker"]); // TEST
console.log(order[key]);      // TEST
console.log(order.key);       // undefined
```

Brackets take a string, so the key can come from a variable. A dot always uses the name written after it, so `order.key` looks for a property named `key`.

---

## What's an Order Book?

An **order book** lists the offers to buy and sell one stock.

<div class="side-by-side">
<div>

- **Asks** (red) are offers to sell: a price, and how many shares.
- **Bids** (green) are offers to buy.
- The **spread** is the gap between the lowest ask and the highest bid.

</div>
<div>

<div class="demo book"><ul class="ladder"><li class="ask">101.00 ███ 300</li><li class="ask">100.75 █████████ 900</li><li class="ask">100.50 ████ 400</li><li>Spread: $0.25</li><li class="bid">100.25 ██████ 600</li><li class="bid">100.00 ████████████ 1200</li><li class="bid">99.75 █████ 500</li></ul></div>

</div>
</div>

---

## Let's Build a Simple Order Book

Today's exercises build a trading page for TEST stock. Its starter has two files on GitHub: [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/orderbook-starter/index.html) and [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/orderbook-starter/practice.js). Set them up in WebStorm, in a new folder:

1. Open each file, and click **Copy raw file**, the copy icon above the code.
2. Paste each one into a new file in WebStorm with the same name.

`index.html` already links to `practice.js` with `<script src="practice.js"></script>`.

---

## Problem (You): Parsons 1

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
} else {
let quote = quotes.ticker;
document.getElementById("quote").textContent = `$${quote.toFixed(2)}`;
function parsons1() {
}
if (quote === undefined) {
let ticker = document.getElementById("ticker").value.toUpperCase();
document.getElementById("quote").textContent = "Unknown ticker";
let quote = quotes["ticker"];
}
let quote = quotes[ticker];
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
  let ticker = document.getElementById("ticker").value.toUpperCase();
  let quote = quotes[ticker];

  if (quote === undefined) {
    document.getElementById("quote").textContent = "Unknown ticker";
  } else {
    document.getElementById("quote").textContent = `$${quote.toFixed(2)}`;
  }
}
```

It shows the price of the ticker typed into the page's lookup box, so `showQuote` would be a better name. Typing `BLIP` or `blip` shows `$54.10`, and `ZZZZ` shows `Unknown ticker`.

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

- As in an [`if`](lecture-conditional-js.html#17), the condition goes in `( )`, and the code to run goes in `{ }`.
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

[`count++`](lecture-js.html#76) moves `count` toward 6, which makes `count <= 5` false.

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

---

## `+=` with Strings

```js
let message = "Market";
message += " open"; // "Market open"
```

`message += " open"` is short for `message = message + " open"` ([Assignment Shortcuts](lecture-js.html#76)), and `+` glues strings together ([Concatenation](lecture-js.html#57)). Here we start from an empty string (`""`) and add one piece at a time:

```js
let bar = "";
bar += "█"; // "█"
bar += "█"; // "██"
```

---

## Problem (Us): Doubling Time

The page asks how long an index fund growing 7% a year takes to double. Let's find out for `fund`, in the Doubling Time section.

1. Copy `fund.balance` into `balance`, so the loop doesn't change `fund`.
2. Count the years in `years`, starting at 0. While `balance` is under twice the fund's balance, add a year of growth.
3. Uncomment the section's page line.

---

## Solution (Us): Doubling Time

```js
let balance = fund.balance;
let years = 0;

while (balance < 2 * fund.balance) {
  balance += balance * fund.rate;
  years++;
}

document.getElementById("doubling").textContent = `${years} years`;
```

After 10 years, `balance` was 1967.15, still under 2000. After 11, it was 2104.85, and the loop stopped.

---

## Problem (You): Parsons 2

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
bought++;
while (cash >= 0) {
}
let power = `${bought} shares, $${cash.toFixed(2)} left`;
let cash = 1000;
parsons2();
}
while (cash >= quotes.TEST) {
document.getElementById("buying-power").textContent = power;
function parsons2() {
let bought = 0;
cash -= quotes.TEST;
while (cash > quotes.TEST) {
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
  let cash = 1000;
  let bought = 0;

  while (cash >= quotes.TEST) {
    cash -= quotes.TEST;
    bought++;
  }

  let power = `${bought} shares, $${cash.toFixed(2)} left`;
  document.getElementById("buying-power").textContent = power;
}

parsons2();
```

It spends \$1,000 on TEST shares until the cash left can't buy another, and shows `9 shares, $97.75 left`, so `showBuyingPower` would be a better name.

---

# `for`

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

---

## One Loop, Two Ways

![w:1120 The same loop written two ways. With while, the setup let count = 1; came before the loop, the condition count <= 5 sat in the parentheses after while, and the update count++ was the last line of the block. With for, the setup, the condition, and the update sat together on one line, separated by semicolons: for (let count = 1; count <= 5; count++). Both blocks printed count.](examples/diagrams/for-loop.svg)

A `for` loop is a `while` loop with the setup, the condition, and the update on one line.

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

## Problem (Us): Fill Bar

An order **fills** as other traders trade with it, often a few shares at a time. `order.filled` says 600 of our 1000 shares have filled. In the Fill Bar section, let's draw █ for each 100 shares filled, and ░ for each 100 still open.

1. Start an empty string, `fill`.
2. Loop over the bar's slots, from 1 to `order.shares / 100`.
3. For each slot, add █ or ░ to `fill`. How do we know which one?
4. Uncomment the section's page line.

---

## Solution (Us): Fill Bar

<style scoped>
pre { font-size: 0.75em; }
</style>

<div class="side-by-side">
<div>

<p class="caption">One loop, with an <code>if</code></p>

```js
for (let i = 1; i <= order.shares / 100; i++) {
  if (i <= order.filled / 100) {
    fill += "█";
  } else {
    fill += "░";
  }
}
```

</div>
<div>

<p class="caption">Two loops</p>

```js
let slots = order.shares / 100;
let filledSlots = order.filled / 100;

for (let i = 0; i < filledSlots; i++) {
  fill += "█";
}

for (let i = filledSlots; i < slots; i++) {
  fill += "░";
}
```

</div>
</div>

Both start with `let fill = "";` and end with the page line. On the left, the `if` runs on every iteration, so each slot gets its own choice. On the right, the first loop draws the filled slots, and the second starts where it stopped. The left `if` also fits on one line: `fill += i <= order.filled / 100 ? "█" : "░";`.

---

## Problem (You): Opening Bell

Before the market opens, the banner at the top should show a countdown: `5... 4... 3... 2... 1... 🔔 Open!` Write it in the Opening Bell section.

1. Use a `for` loop that counts down from 5 to 1, and build the string in `countdown`.
2. Add `🔔 Open!` at the end.
3. Uncomment the section's page line.

---

## Solution (You): Opening Bell

```js
let countdown = "";

for (let i = 5; i > 0; i--) {
  countdown += `${i}... `;
}

countdown += "🔔 Open!";
document.getElementById("banner").textContent = countdown;
```

<div class="demo book"><p class="banner">5... 4... 3... 2... 1... 🔔 Open!</p></div>

With `i++`, `i` would count up from 5, `i > 0` would stay `true`, and the tab would freeze. With `i >= 0`, the countdown would end `1... 0... 🔔 Open!`.

---

# `for...in`

---

## `for...in`

<div class="side-by-side">
<div>

```js
for (let key in order) {
  console.log(`${key}: ${order[key]}`);
}
```

</div>
<div>

<p class="caption">Console</p>

```text
side: BUY
ticker: TEST
shares: 1000
price: 100.25
filled: 600
```

</div>
</div>

- The loop runs once for each property, with `key` set to the property's name, as a string.
- To get the property's value, use brackets: `order[key]`. With `order.key`, every line would end in `undefined`.
- Keys come in the order they were added, except whole numbers like `"7"`, which come first, smallest to largest.

---

## Problem (Us): Order Book, Step 1

The order book on the page will show each price as a line like `101.00 ███ 300`: the price, a bar, and the shares. First, in the Order Book, Step 1 section, write a function that draws one █ for every 100 shares:

```js
console.log(depthBar(300)); // ███
console.log(depthBar(1200)); // ████████████
```

1. Name the function `depthBar`, with one parameter, `shares`.
2. Start an empty string, `bar`. Use a `for` loop to add `shares / 100` blocks to it, as in [`+=` with Strings](#16).
3. [`return`](lecture-js.html#96) `bar`.

---

## Solution (Us): Order Book, Step 1

```js
function depthBar(shares) {
  let bar = "";

  for (let i = 0; i < shares / 100; i++) {
    bar += "█";
  }

  return bar;
}
```

The page doesn't change yet, since a function runs only when something calls it. In the console, `depthBar(300)` gives `"███"`.

---

## Problem (Us): Order Book, Step 2

Each side of the book is an object. A price is the key, and the shares offered at that price are the value, as in `asks`. The keys need quotes, or `101.00` would become the key `"101"`.

1. In the Order Book, Step 2 section, loop over `asks` with `for...in`, with `price` as the loop variable.
2. Build `<li class="ask">[PRICE] ███ [SHARES]</li>`, with `depthBar(?)` for the bar. The starter's CSS makes `.ask` red and `.bid` green.
3. Add it to the page: uncomment the section's page line inside the loop. `innerHTML` is the HTML inside an element, so `+=` adds each `<li>` after the ones already there.

---

## Solution (Us): Order Book, Step 2

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
for (let price in asks) {
  let shares = asks[price];
  let line = `<li class="ask">${price} ${depthBar(shares)} ${shares}</li>`;
  document.getElementById("asks").innerHTML += line;
}
```

<div class="demo book"><ul class="ladder"><li class="ask">101.00 ███ 300</li><li class="ask">100.75 █████████ 900</li><li class="ask">100.50 ████ 400</li></ul></div>

On the first iteration, `price` is `"101.00"`, and `asks[price]` is `300`.

---

## Order Book, Step 3

<style scoped>
pre { font-size: 0.75em; }
</style>

`bids` works the same way. Copy the loop from [Step 2](#34) into the Order Book, Step 3 section, change every `asks` to `bids`, and change `class="ask"` to `class="bid"`, so the bids show in green:

```js
for (let price in bids) {
  let shares = bids[price];
  let line = `<li class="bid">${price} ${depthBar(shares)} ${shares}</li>`;
  document.getElementById("bids").innerHTML += line;
}
```

<div class="demo book"><ul class="ladder"><li class="bid">100.25 ██████ 600</li><li class="bid">100.00 ████████████ 1200</li><li class="bid">99.75 █████ 500</li></ul></div>

---

## Keys Are Strings

Let's find the best bid, the highest price in `bids`:

<div class="side-by-side">
<div>

<p class="caption">Bug</p>

```js
let bestBid = 0;

for (let price in bids) {
  if (price > bestBid) {
    bestBid = price;
  }
}
```

</div>
<div>

<p class="caption">Fixed with <a href="lecture-js.html#68"><code>Number()</code></a></p>

```js
let bestBid = 0;

for (let price in bids) {
  if (Number(price) > bestBid) {
    bestBid = Number(price);
  }
}
```

</div>
</div>

The bug finds `"99.75"`. After the first bid, `bestBid` holds a string, and JavaScript compares two strings one character at a time, like words in a dictionary. `"9"` comes after `"1"`, so `"99.75" > "100.25"`.

---

## Problem (You): Spread

Copy the fixed best-bid loop into the Spread section of `practice.js`. Then find the best ask, the lowest price in `asks`, and show the spread: `Spread: $0.25`.

1. Start `bestAsk` at `Infinity` (`let bestAsk = Infinity;`). (Consider why `Infinity`.)
2. Loop over `asks`, and keep the lowest price.
3. Subtract to get the spread, and store it in `spread`, like `Spread: $0.25`.
4. Uncomment the section's page line.

---

## Solution (You): Spread

```js
let bestAsk = Infinity;

for (let price in asks) {
  if (Number(price) < bestAsk) {
    bestAsk = Number(price);
  }
}

let spread = `Spread: $${(bestAsk - bestBid).toFixed(2)}`;
document.getElementById("spread").textContent = spread;
```

<p class="caption">Middle of the order book</p>
<div class="demo book"><ul class="ladder"><li class="ask">100.50 ████ 400</li><li>Spread: $0.25</li><li class="bid">100.25 ██████ 600</li></ul></div>

---

# `break` and `continue`

---

## Stopping Early: `break`

Which stock in `quotes` is the first one under \$60?

<div class="side-by-side">
<div>

```js
for (let ticker in quotes) {
  if (quotes[ticker] < 60) {
    console.log(ticker);
    break;
  }
}
```

</div>
<div>

<p class="caption">Console</p>

```text
BLIP
```

</div>
</div>

`break` ends the loop right away, even with keys left to visit, so the loop never checks WIDG. Without `break`, it would print WIDG too, since \$12.75 is also under \$60.

---

## Pseudocode

**Pseudocode** is a plan for a program, written in plain English but laid out like code. Here's the loop from Doubling Time both ways:

<div class="side-by-side">
<div>

<p class="caption">Pseudocode</p>

```text
set balance to fund.balance
set years to 0

while balance is under 2 * fund.balance
  add balance * fund.rate to balance
  add 1 to years
```

</div>
<div>

<p class="caption">JavaScript</p>

```js
let balance = fund.balance;
let years = 0;

while (balance < 2 * fund.balance) {
  balance += balance * fund.rate;
  years++;
}
```

</div>
</div>

Pseudocode drops the `let`, `;`, and `{ }`. Indenting shows which lines sit inside the loop. We write the plan first, then turn each line into code.

---

## Market Orders

A **market order** trades right away, at the best prices in the book. A market sell sells to the highest bid first, then the next highest, until every share is sold. Here is a market sell of 1000 shares:

<div class="centered">

| Bid    | Shares Offered | We Sell | Left to Sell |
| ------ | -------------- | ------- | ------------ |
| 100.25 | 600            | 600     | 400          |
| 100.00 | 1200           | 400     | 0            |
| 99.75  | 500            | 0       | 0            |

</div>

In the table above, the 100.00 bid had more shares than we needed, so we sold only 400 there. Nothing was left for 99.75.

---

## Problem (Us): Market Sell

<style scoped>
pre { font-size: 0.75em; }
</style>

Let's sell 1000 shares at market. `bids` lists the best bid first, so a loop over `bids` visits the bids in the order we sell to them. Turn the pseudocode into code in the Market Sell section.

```text
set toSell to 1000
set fills to ""

for each price in bids
  if the bid at price has toSell shares or more
    add "toSell @ price" to fills
    break
  add "shares @ price, " to fills
  take the bid's shares off toSell

put fills on the page
```

For the last line, uncomment the section's page line.

---

## Solution (Us): Market Sell

```js
let toSell = 1000;
let fills = "";

for (let price in bids) {
  if (bids[price] >= toSell) {
    fills += `${toSell} @ ${price}`;
    break;
  }
  fills += `${bids[price]} @ ${price}, `;
  toSell -= bids[price];
}

document.getElementById("market-sell").textContent = fills;
```

Without `break`, the two lines after the `if` also run at 100.00, so the loop sells all 1200 shares there and `toSell` drops to -800.

---

## Skipping Ahead: `continue`

<div class="side-by-side">
<div>

```js
for (let ticker in quotes) {
  if (ticker === order.ticker) {
    continue;
  }
  console.log(ticker);
}
```

</div>
<div>

<p class="caption">Console</p>

```text
BLIP
WIDG
```

</div>
</div>

`continue` ends this iteration right away, and the loop goes on to the next one. Here it skips TEST, the stock we're trading. With `break`, the loop would end at TEST and print nothing.

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

## Problem (You): Trading Days

The market is closed on weekends. This month has 30 days, and day 1 is a Monday, so the [remainder](lecture-js.html#72) `day % 7` is 6 on Saturdays and 0 on Sundays. Turn the pseudocode into code in the Trading Days section.

```text
set tradingDays to 0

for each day from 1 to 30
  if day is Saturday or Sunday
    continue
  add 1 to tradingDays

put tradingDays on the page
```

For the last line, uncomment the section's page line.

---

## Solution (You): Trading Days

```js
let tradingDays = 0;

for (let day = 1; day <= 30; day++) {
  if (day % 7 === 6 || day % 7 === 0) {
    continue;
  }
  tradingDays++;
}

document.getElementById("trading-days").textContent = tradingDays;
```

<div class="demo book"><p>Trading days this month: 22</p></div>

With `break` in place of `continue`, the loop would stop at the first Saturday and count 5 days.

---

## Which Loop?

<div class="centered">

| Loop       | Use It When                                | Example from Today |
| ---------- | ------------------------------------------ | ------------------ |
| `while`    | we don't know how many iterations it needs | Doubling Time      |
| `for`      | we know how many iterations it needs       | Fill Bar           |
| `for...in` | we need every key in an object             | Order Book         |

</div>

`while` and `for` can do each other's jobs. Pick the loop that says what it's for.

---

# Conclusion

---

## The Finished Page

Every solution from today, together:

- [TEST Order Book](https://bi3mer.github.io/lectures/cs213/js/examples/orderbook-final/), running live
- [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/orderbook-final/practice.js) on GitHub, in the order we wrote it

The HTML is the same as the starter's `index.html`, and `practice.js` starts with the starter's code.

---

## Summary

- An object holds values under keys: `order.shares`, or `order[key]`.
- A `while` loop repeats until something in its block makes the condition `false`.
- A `for` loop puts the setup, condition, and update on one line.
- To run a loop `n` times, start at 0 with `<`, or at 1 with `<=`.
- `for...in` gives keys as strings, so compare prices with `Number()`.
- `break` ends a loop early, and `continue` skips to the next iteration.

---

# Questions?

---

## Keys We Didn't Write

Typing `toString` into the lookup box from Parsons 1 stops `parsons1()` with an error:

```text
TypeError: quote.toFixed is not a function
```

Every object comes with keys we didn't write, like `toString` and `constructor`. Their values are functions, so `quote === undefined` is `false`, and the `else` calls `toFixed` on a function. `Object.hasOwn(quotes, ticker)` is `true` only for keys we put in `quotes`, and [`!`](lecture-conditional-js.html#40) flips it:

<!-- prettier-ignore -->
```js
if (quote === undefined) {            // before
if (!Object.hasOwn(quotes, ticker)) { // after
```
