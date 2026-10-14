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
/* Pieces of the order book page, drawn small inside a .demo, in the page's dark colors. */
.demo.book { background-color: #161b22; color: #e6edf3; box-shadow: 0 0 0 12px #161b22; }
.demo.book .banner { color: gold; font-weight: bold; }
.demo.book .bar, .demo.book .ladder { font-family: monospace; }
.demo.book .ladder { padding: 0; list-style: none; font-size: 22px; }
.demo.book .ask, .demo.book .down { color: tomato; }
.demo.book .bid, .demo.book .up { color: limegreen; }
</style>

# Objects and Loops

Colan Biemer

---

# Objects

---

## One Order, Four Variables

```js
let orderSide = "BUY";
let orderTicker = "TEST";
let orderShares = 1000;
let orderPrice = 100.25;
```

These four variables describe one stock order: buy 1000 shares of TEST at \$100.25 each. Traders call a stock by its **ticker**, a short name like `TEST`. Nothing in the code ties the variables together, and a list of 100 orders would need 400 variables.

An **object** keeps related values together under one name.

---

## Objects

```js
let order = {
  side: "BUY",
  ticker: "TEST",
  shares: 1000,
  price: 100.25,
};
```

- An object's `{ }` holds **properties**. Each property is a **key**, a `:`, and a value.
- Commas separate the properties. The comma after the last one is optional.
- A short object fits on one line: `let quotes = { TEST: 100.25, BLIP: 54.1 };`

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

All companies and prices today are made up.

---

## Let's Build an Order Book

Today's exercises build a trading page for TEST stock. Open [orderbook-starter.html](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/orderbook-starter.html) on GitHub and set it up in WebStorm, in a new folder:

1. Click **Copy raw file**, the copy icon above the code.
2. Paste it into a new HTML file in WebStorm.
3. In the same folder, make an empty file named `practice.js`. The page already links to it with `<script src="practice.js"></script>`.

As in the `if` lecture, each problem gives you the DOM lines it needs.

---

## Problem (Me): Order Ticket

The `ticket` paragraph shows the order we're about to send: buy 1000 shares of TEST at \$100.25 each. On a ticket, `@` reads as "at."

1. Store the order in an object, `order`, with the properties `side`, `ticker`, `shares`, and `price`.
2. Show the order with this line:

```js
document.getElementById("ticket").textContent = "BUY 1000 TEST @ $100.25";
```

Build the string from `order` with a [template literal](lecture-js.html#58), and show the price with [two decimal places](lecture-js.html#78).

---

## Solution (Me): Order Ticket

```js
let order = {
  side: "BUY",
  ticker: "TEST",
  shares: 1000,
  price: 100.25,
};

let ticketPrice = order.price.toFixed(2);
let ticket = `${order.side} ${order.shares} ${order.ticker} @ $${ticketPrice}`;
document.getElementById("ticket").textContent = ticket;
```

<div class="demo book"><p>BUY 1000 TEST @ $100.25</p></div>

---

## Problem (You): Quote Lookup

The watchlist has a lookup box, and it calls `showQuote()` every time its text changes, as in [Member Name](lecture-conditional-js.html#22):

```html
<input id="ticker" oninput="showQuote()" />
```

Write `showQuote()`. It shows the price of the ticker in the box, like `$54.10`, or `Unknown ticker`. Start with this object:

```js
let quotes = { TEST: 100.25, BLIP: 54.1, WIDG: 12.75 };
```

---

## Problem (You): Quote Lookup (Continued)

<!-- prettier-ignore -->
```js
} else {
let quote = quotes.ticker;
document.getElementById("quote").textContent = `$${quote.toFixed(2)}`;
function showQuote() {
}
if (quote === undefined) {
let ticker = document.getElementById("ticker").value;
document.getElementById("quote").textContent = "Unknown ticker";
let quote = quotes["ticker"];
}
let quote = quotes[ticker];
```

Assemble the function from the lines above. Two of the lines are wrong.

---

## Solution (You): Quote Lookup

```js
function showQuote() {
  let ticker = document.getElementById("ticker").value;
  let quote = quotes[ticker];

  if (quote === undefined) {
    document.getElementById("quote").textContent = "Unknown ticker";
  } else {
    document.getElementById("quote").textContent = `$${quote.toFixed(2)}`;
  }
}
```

Typing `BLIP` shows `$54.10`, and `ZZZZ` shows `Unknown ticker`. Keys must match exactly, so `blip` is unknown too. `quotes.ticker` and `quotes["ticker"]` both look for a key named `ticker`.

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

`message += " open"` is short for `message = message + " open"` ([Assignment Shortcuts](lecture-js.html#76)), and `+` glues strings ([Concatenation](lecture-js.html#57)). Here we start from an [empty string](lecture-conditional-js.html#23), `""`, and add one piece at a time:

```js
let bar = "";
bar += "█"; // "█"
bar += "█"; // "██"
```

---

## Problem (Me): Size Bar

Trading screens draw an order's size as a bar. Let's draw one █ for every 100 shares in our order.

1. Use a `while` loop to build a string with `order.shares / 100` blocks in it.
2. Put the string on the page with this line:

```js
document.getElementById("size").textContent = "██████████";
```

---

## Solution (Me): Size Bar

```js
let size = "";
let count = 0;

while (count < order.shares / 100) {
  size += "█";
  count++;
}

document.getElementById("size").textContent = size;
```

<div class="runs">
<div>
<p class="caption">300 shares</p>
<div class="demo book"><p class="bar">███</p></div>
</div>
<div>
<p class="caption">1000 shares</p>
<div class="demo book"><p class="bar">██████████</p></div>
</div>
<div>
<p class="caption">1500 shares</p>
<div class="demo book"><p class="bar">███████████████</p></div>
</div>
</div>

The page line runs once, after the loop has built every block.

---

## Problem (Us): Doubling Time

An index fund grows 7% a year. Let's show how many years it takes \$1,000 to double:

```js
let fund = { balance: 1000, rate: 0.07 };
```

1. Copy `fund.balance` into `balance`, so the loop doesn't change `fund`.
2. Count the years in `years`, starting at 0. While `balance` is under twice the fund's balance, add a year of growth.
3. Use this line to change the page:

```js
document.getElementById("doubling").textContent = `${years} years`;
```

---

## Solution (Us): Doubling Time

```js
let fund = { balance: 1000, rate: 0.07 };
let balance = fund.balance;
let years = 0;

while (balance < 2 * fund.balance) {
  balance += balance * fund.rate;
  years++;
}

document.getElementById("doubling").textContent = `${years} years`;
```

After 10 years, `balance` was 1967.15, still under 2000. After 11, it was 2104.85, and the loop stopped. We didn't know the count ahead of time, so `while` fit.

---

## Problem (You): Buying Power

<style scoped>
pre { font-size: 0.75em; }
</style>

We have \$1,000, and a TEST share costs \$100.25 ([`quotes.TEST`](#11)). Buy shares until we can't afford another. The page should say `9 shares, $97.75 left`.

<!-- prettier-ignore -->
```js
bought++;
while (cash >= 0) {
let power = `${bought} shares, $${cash.toFixed(2)} left`;
let cash = 1000;
}
while (cash >= quotes.TEST) {
document.getElementById("buying-power").textContent = power;
let bought = 0;
cash -= quotes.TEST;
while (cash > quotes.TEST) {
```

Assemble the program from the lines above. Two of the lines are wrong.

---

## Solution (You): Buying Power

```js
let cash = 1000;
let bought = 0;

while (cash >= quotes.TEST) {
  cash -= quotes.TEST;
  bought++;
}

let power = `${bought} shares, $${cash.toFixed(2)} left`;
document.getElementById("buying-power").textContent = power;
```

`cash >= 0` keeps buying while any cash is left, so it buys a 10th share: `10 shares, $-2.50 left`. `>` gives 9 shares here too, but with exactly \$100.25 left, it would skip a share we can afford.

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

## Problem (Me): Size Bar, Again

Let's replace the `while` loop in Size Bar with a `for` loop. The page should look the same.

```js
let count = 0;

while (count < order.shares / 100) {
  size += "█";
  count++;
}
```

---

## Solution (Me): Size Bar, Again

```js
let size = "";

for (let i = 0; i < order.shares / 100; i++) {
  size += "█";
}

document.getElementById("size").textContent = size;
```

---

## Problem (Us): Fill Bar

An order **fills** as other traders trade with it, often a few shares at a time. Say 600 of our 1000 shares have filled. Let's draw █ for each 100 shares filled, and ░ for each 100 still open.

1. Add a `filled` property to `order`, set to 600.
2. Loop over the bar's slots, from 1 to `order.shares / 100`.
3. For each slot, add █ or ░. How do we know which one?

Use this line to change the page:

```js
document.getElementById("fill").textContent = "██████░░░░";
```

---

## Solution (Us): Fill Bar

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
order.filled = 600;
let fill = "";

for (let i = 1; i <= order.shares / 100; i++) {
  if (i <= order.filled / 100) {
    fill += "█";
  } else {
    fill += "░";
  }
}

document.getElementById("fill").textContent = fill;
```

The `if` runs on every iteration, so each slot gets its own choice. `fill += i <= order.filled / 100 ? "█" : "░";` does the same in one line.

---

## Problem (You): Opening Bell

Before the market opens, the banner at the top should count down: `5... 4... 3... 2... 1... 🔔 Open!`

1. Use a `for` loop that counts down from 5 to 1, and build the string.
2. Add `🔔 Open!` at the end.

Use this line to change the page:

```js
document.getElementById("banner").textContent = "🔔 Open!";
```

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

```js
for (let key in object) {
  // runs once for each property, with key set to the property's name
}
```

- `key` holds each property's name, as a string.
- To get the property's value, use brackets: `object[key]`.
- Keys come in the order they were added, except whole numbers like `"7"`, which come first, smallest to largest.

---

## Example: Every Property of the Order

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

`filled` comes last, since Fill Bar added it after the others. With `order.key` in place of `order[key]`, every line would end in `undefined`.

---

## Problem (Me): Watchlist

The watchlist should show the price of every ticker in `quotes`, which already exists from Quote Lookup.

1. Loop over `quotes` with `for...in`.
2. Add a list item for each ticker, with the price to two decimal places, using this line:

```js
document.getElementById("watchlist").innerHTML += "<li>TEST: $100.25</li>";
```

`innerHTML` is the HTML inside an element, so `+=` adds the new `<li>` after the ones already there.

---

## Solution (Me): Watchlist

```js
for (let ticker in quotes) {
  let line = `<li>${ticker}: $${quotes[ticker].toFixed(2)}</li>`;
  document.getElementById("watchlist").innerHTML += line;
}
```

<div class="demo book"><ul><li>TEST: $100.25</li><li>BLIP: $54.10</li><li>WIDG: $12.75</li></ul></div>

Any name works for the loop variable, and `ticker` says what each key is. A new ticker in `quotes` adds a line, with no change to the loop.

---

## Problem (Us): Order Book, Step 1

The `asks` and `bids` elements on the page will show lines like `101.00 ███ 300`: a price, a bar, and the shares. First, turn the loop from [Size Bar, Again](#31) into a function that draws a bar for any number of shares:

```js
console.log(depthBar(300)); // ███
console.log(depthBar(1200)); // ████████████
```

1. Name the function `depthBar`, with one parameter, `shares`.
2. Copy that loop into the function, with `shares` in place of `order.shares`.
3. [`return`](lecture-js.html#96) the bar.

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

Each side of the book is an object. A price is the key, and the shares offered at that price are the value:

<!-- prettier-ignore -->
```js
let asks = { "101.00": 300, "100.75": 900, "100.50": 400 };
```

The keys need quotes, or `101.00` would become the key `"101"`.

1. Loop over `asks` with `for...in`, with `price` as the loop variable.
2. Build `<li class="ask">[PRICE] ███ [SHARES]</li>`, with `depthBar(?)` for the bar.
3. Add it to the `asks` element with `innerHTML +=`, as in [Watchlist](#40).

---

## Solution (Us): Order Book, Step 2

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

## Problem (Us): Order Book, Step 3

The bids side works the same way:

<!-- prettier-ignore -->
```js
let bids = { "100.25": 600, "100.00": 1200, "99.75": 500 };
```

Without quotes, `100.00` would become the key `"100"`. That's a whole number, so it would [come first](#37), above `"100.25"`.

1. Copy the loop from [Step 2](#44).
2. Change every `asks` to `bids`, including the element's id.
3. Change the `ask` class to `bid`, so the bids show in green.

---

## Solution (Us): Order Book, Step 3

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
let bids = { "100.25": 600, "100.00": 1200, "99.75": 500 };

for (let price in bids) {
  let shares = bids[price];
  let line = `<li class="bid">${price} ${depthBar(shares)} ${shares}</li>`;
  document.getElementById("bids").innerHTML += line;
}
```

<div class="demo book"><ul class="ladder"><li class="ask">101.00 ███ 300</li><li class="ask">100.75 █████████ 900</li><li class="ask">100.50 ████ 400</li><li class="bid">100.25 ██████ 600</li><li class="bid">100.00 ████████████ 1200</li><li class="bid">99.75 █████ 500</li></ul></div>

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

Copy the fixed best-bid loop into `practice.js`. Then find the best ask, the lowest price in `asks`, and show the spread: `Spread: $0.25`.

1. Start `bestAsk` at `Infinity`, a value bigger than every other number, so the first ask replaces it.
2. Loop over `asks`, and keep the lowest price.
3. Subtract to get the spread, with two decimal places.

Use this line to change the page:

```js
document.getElementById("spread").textContent = "Spread: $0.25";
```

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

Which year is the first one where the index fund passes \$5,000?

```js
let fundBalance = 1000;

for (let year = 1; year <= 50; year++) {
  fundBalance *= 1.07;
  if (fundBalance > 5000) {
    console.log(`Year ${year}: $${fundBalance.toFixed(2)}`);
    break;
  }
}
```

`break` ends the loop right away, even when the condition is still `true`. The loop allows 50 years, but this prints `Year 24: $5072.37` and stops.

---

## Problem (Us): Market Sell

A **market order** trades right away, at the best prices in the book. Let's sell 1000 shares at market. `bids` lists the best bid first, so we sell at 100.25 first, then at 100.00, until all 1000 are sold.

1. Count the shares still to sell in `toSell`, starting at 1000, and build the fills in `fills`.
2. Loop over `bids`. When a bid has enough shares for the rest, sell the rest there and `break`.
3. Otherwise, sell all of that bid's shares and move on.

Use this line to change the page:

```js
document.getElementById("market-sell").textContent = "600 @ 100.25, 400 @ 100.00";
```

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

Without `break`, the loop goes on to 99.75 and sells the last 400 shares a second time: `600 @ 100.25, 400 @ 100.00400 @ 99.75`.

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

The market is closed on weekends. This month has 30 days, and day 1 is a Monday, so the [remainder](lecture-js.html#72) `day % 7` is 6 on Saturdays and 0 on Sundays.

1. Loop over the days of the month, from 1 to 30.
2. Use `continue` to skip weekends. A weekend day is a Saturday [or](lecture-conditional-js.html#40) a Sunday.
3. Count the other days in `tradingDays`.

Use this line to change the page:

```js
document.getElementById("trading-days").textContent = tradingDays;
```

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

# `forEach`

---

## Keys and Values as Lists

<!-- prettier-ignore -->
```js
Object.keys(quotes);   // ["TEST", "BLIP", "WIDG"]
Object.values(quotes); // [100.25, 54.1, 12.75]
```

`Object.keys` gives back a list of an object's keys, and `Object.values` gives back a list of its values. A list in `[ ]` is an **array**. Arrays get their own lecture later; today we only loop over them.

---

## Functions Are Values

```js
let fee = function (amount) {
  return amount * 0.01;
};

console.log(fee(500)); // 5
```

A [function](lecture-js.html#90) is a value, like a number or a string, so a variable can hold one. We call it with the variable's name: `fee(500)`.

`forEach`, next, takes a function value like this one and calls it once for each item.

---

## `forEach`

```js
Object.keys(quotes).forEach(function (ticker) {
  console.log(ticker);
});
```

- Every array has `forEach`, which we call with a dot, like `toFixed`. It calls the function we give it once for each item in the array, with that item as the argument.
- The function has no name, since only `forEach` calls it.
- The `)` after the `}` closes `forEach(`, and the `;` ends the statement.

---

## Example: `for...in` vs. `forEach`

<div class="side-by-side">
<div>

<p class="caption"><code>for...in</code></p>

```js
for (let ticker in quotes) {
  console.log(ticker);
}
```

<p class="caption"><code>forEach</code></p>

```js
Object.keys(quotes).forEach(function (ticker) {
  console.log(ticker);
});
```

</div>
<div>

<p class="caption">Console, for both</p>

```text
TEST
BLIP
WIDG
```

</div>
</div>

Both loops print the same lines. With `Object.values`, `forEach` hands the function each value instead of each key. `break` and `continue` work only in a loop, so inside `forEach`'s function, either one is a syntax error.

---

## Problem (Us): Average Price

The `average` span should show the average price of today's trades in TEST. The keys are the times of the trades:

```js
let trades = { "9:30": 100.1, "9:31": 100.3, "9:32": 100.45 };
```

1. Get a list of the prices with `Object.values`.
2. Use `forEach` to add up the prices and count the trades.
3. Use this line to change the page:

```js
document.getElementById("average").textContent = "$100.28";
```

---

## Solution (Us): Average Price

```js
let trades = { "9:30": 100.1, "9:31": 100.3, "9:32": 100.45 };
let priceSum = 0;
let tradeCount = 0;

Object.values(trades).forEach(function (price) {
  priceSum += price;
  tradeCount++;
});

let average = (priceSum / tradeCount).toFixed(2);
document.getElementById("average").textContent = `$${average}`;
```

`priceSum` and `tradeCount` sit outside the function, so they keep their totals between calls. Inside it, they'd start over at 0 for every trade.

---

# Arrow Functions

---

## From `function` to `=>`

![w:1000 The same fee function written three ways. First, let fee = function (amount) { return amount * 0.01; }; stored a function in a variable. Second, the arrow function let fee = (amount) => { return amount * 0.01; }; dropped the word function and put => after the parameters. Third, let fee = (amount) => amount * 0.01; dropped the braces, return, and the inner semicolon, since the body was one expression, and gave back amount * 0.01 by itself.](examples/diagrams/arrow-function.svg)

An **arrow function** is a shorter way to write a function value. Without `{ }`, it gives back its one expression, with no `return`.

---

## Braces Mean No Automatic Return

<!-- prettier-ignore -->
```js
let fee = (amount) => { amount * 0.01; };
console.log(fee(500)); // undefined

let makeOrder = (ticker) => ({ ticker: ticker, shares: 100 });
console.log(makeOrder("BLIP").shares); // 100
```

With `{ }`, the body is a block, and a block gives back only what [`return`](lecture-js.html#96) gives back. To give back an object from a one-line arrow function, wrap the object in `( )`, so JavaScript doesn't read its `{ }` as a block.

---

## `function` or `=>`?

<!-- prettier-ignore -->
```js
console.log(double(4)); // 8
console.log(half(4));   // ReferenceError

function double(n) { return n * 2; }
let half = (n) => n / 2;
```

- JavaScript sets up every `function` before the file runs, so `double(4)` works above its line. An arrow function stored with `let` exists only after its line runs, so `half(4)` fails.
- Use an arrow function for a one-line formula, like `fee`, or for a function we hand to `forEach`, however many lines it has.
- Use `function` for the rest, like `depthBar`, or `showQuote()` from `oninput`.

---

## Example: `forEach` with an Arrow Function

```js
Object.keys(quotes).forEach((ticker) => console.log(ticker));

Object.values(trades).forEach((price) => {
  priceSum += price;
  tradeCount++;
});
```

The first loop's body is one expression, so it needs no `{ }`. The second is Average Price's loop, and its body has two statements, so it keeps its `{ }`.

---

## Problem (You): Positions

Our portfolio holds three stocks:

```js
let positions = { TEST: 10, BLIP: 25, WIDG: 40 };
```

1. List each position with its value at today's price in `quotes`, like `<li>TEST: 10 shares, $1002.50</li>`.
2. Loop with `Object.keys` and `forEach`, and give `forEach` an arrow function.
3. Add each list item to the `positions` element with `innerHTML +=`, as in [Watchlist](#40).

---

## Solution (You): Positions

```js
let positions = { TEST: 10, BLIP: 25, WIDG: 40 };

Object.keys(positions).forEach((ticker) => {
  let held = positions[ticker];
  let value = (held * quotes[ticker]).toFixed(2);
  let line = `<li>${ticker}: ${held} shares, $${value}</li>`;
  document.getElementById("positions").innerHTML += line;
});
```

<div class="demo book"><ul><li>TEST: 10 shares, $1002.50</li><li>BLIP: 25 shares, $1352.50</li><li>WIDG: 40 shares, $510.00</li></ul></div>

---

## Problem (You): Movers

<style scoped>
pre { font-size: 0.75em; }
</style>

Show each stock's move since the open, as a percent. `opens` holds the opening prices. A [ternary](lecture-conditional-js.html#52) can pick the starter's `up` (green) or `down` (red) class.

<!-- prettier-ignore -->
```js
let line = `<li class="${trend}">${ticker}: ${percent.toFixed(2)}%</li>`;
Object.keys(quotes).forEach(ticker) => {
});
let change = (open, now) => ((now - open) / open) * 100;
document.getElementById("movers").innerHTML += line;
let opens = { TEST: 100, BLIP: 55, WIDG: 12.5 };
let trend = percent >= 0 ? "up" : "down";
let change = (open, now) => { ((now - open) / open) * 100; };
Object.keys(quotes).forEach((ticker) => {
let percent = change(opens[ticker], quotes[ticker]);
```

Assemble the program from the lines above. Two of the lines are wrong.

---

## Solution (You): Movers

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
let opens = { TEST: 100, BLIP: 55, WIDG: 12.5 };
let change = (open, now) => ((now - open) / open) * 100;

Object.keys(quotes).forEach((ticker) => {
  let percent = change(opens[ticker], quotes[ticker]);
  let trend = percent >= 0 ? "up" : "down";
  let line = `<li class="${trend}">${ticker}: ${percent.toFixed(2)}%</li>`;
  document.getElementById("movers").innerHTML += line;
});
```

<div class="demo book"><ul><li class="up">TEST: 0.25%</li><li class="down">BLIP: -1.64%</li><li class="up">WIDG: 2.00%</li></ul></div>

A braced `change` gives back `undefined`. `forEach(ticker) => {` closes `forEach(` too soon, a syntax error that stops all of `practice.js`.

---

## Which Loop?

| Loop       | Use It When                                | Example from Today |
| ---------- | ------------------------------------------ | ------------------ |
| `while`    | we don't know how many iterations it needs | Doubling Time      |
| `for`      | we know how many iterations it needs       | Fill Bar           |
| `for...in` | we need every key in an object             | Order Book         |
| `forEach`  | we have an array and a function to run     | Positions          |

`while` and `for` can do each other's jobs. Pick the loop that says what it's for.

---

# Conclusion

---

## The Finished Page

Every solution from today, together:

- [TEST Order Book](https://bi3mer.github.io/lectures/cs213/js/examples/orderbook-final/), running live
- [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/orderbook-final/practice.js) on GitHub, in the order we wrote it

The HTML is the same as `orderbook-starter.html`.

---

## Summary

- An object holds values under keys: `order.shares`, or `order[key]`.
- A `while` loop repeats until something in its block makes the condition `false`.
- A `for` loop puts the setup, condition, and update on one line.
- To run a loop `n` times, start at 0 with `<`, or at 1 with `<=`.
- `for...in` gives keys as strings, so compare prices with `Number()`.
- `break` ends a loop early, and `continue` skips to the next iteration.
- `Object.keys` gives an array, and `forEach` runs a function per item.
- Without `{ }`, an arrow function gives back its one expression.

---

# Questions?

---

## Keys We Didn't Write

Typing `toString` into Quote Lookup's box stops `showQuote()` with an error:

```text
TypeError: quote.toFixed is not a function
```

Every object comes with keys we didn't write, like `toString` and `constructor`. Their values are functions, so `quote === undefined` is `false`, and the `else` calls `toFixed` on a function. `Object.hasOwn(quotes, ticker)` is `true` only for keys we put in `quotes`, and [`!`](lecture-conditional-js.html#41) flips it:

<!-- prettier-ignore -->
```js
if (quote === undefined) {            // before
if (!Object.hasOwn(quotes, ticker)) { // after
```
