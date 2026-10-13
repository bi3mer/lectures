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
let orderTicker = "ACME";
let orderShares = 1000;
let orderPrice = 100.25;
```

These four variables describe one stock order, but nothing in the code ties them together. A list of 100 orders would need 400 variables.

An **object** keeps related values together under one name.

---

## Objects

```js
let order = {
  side: "BUY",
  ticker: "ACME",
  shares: 1000,
  price: 100.25,
};
```

- An object's `{ }` holds **properties**. Each property is a **key**, a `:`, and a value.
- Commas separate the properties. The comma after the last one is optional.
- A short object fits on one line: `let quotes = { ACME: 100.25, BLIP: 54.1 };`

---

## Reading and Changing Properties

<!-- prettier-ignore -->
```js
let order = { side: "BUY", ticker: "ACME", shares: 1000 };

console.log(order.shares); // 1000
console.log(order.price);  // undefined

order.shares = 500;        // changes shares
order.price = 100.25;      // adds price
```

A dot reads a property. A key the object doesn't have gives `undefined`. Storing a value with `=` changes a property, or adds it when the object doesn't have it yet.

---

## Brackets

<!-- prettier-ignore -->
```js
let key = "shares";

console.log(order["shares"]); // 1000
console.log(order[key]);      // 1000
console.log(order.key);       // undefined
```

Brackets take a string, so the key can come from a variable. A dot always uses the name written after it, so `order.key` looks for a property named `key`.

Later today, loops hand us each key in a variable, so they need brackets.

---

## We've Been Using Objects

```js
document.getElementById("ticket").style.color = "limegreen";
console.log("Hello!");
```

- `document` and `console` are objects that the browser gives every page.
- `style` is an object too, with a property for each CSS property.
- A property can hold a function, like `log` and `getElementById`. A function in an object is called a **method**.

---

## What's an Order Book?

An **order book** lists the offers to buy and sell one stock. Traders call a stock by its **ticker**, a short name like `ACME`.

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

Today's exercises build a trading page for ACME stock. Open [orderbook-starter.html](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/orderbook-starter.html) on GitHub and set it up in WebStorm, in a new folder:

1. Click **Copy raw file**, the copy icon above the code.
2. Paste it into a new HTML file in WebStorm.
3. In the same folder, make an empty file named `practice.js`. The page already links to it with `<script src="practice.js"></script>`.

As in the `if` lecture, each problem gives you the DOM lines it needs.

---

## Problem (Me): Order Ticket

The ticket card shows the order we're about to send: buy 1000 shares of ACME at \$100.25 each. On a ticket, `@` reads as "at."

1. Store the order in an object, `order`, with the properties `side`, `ticker`, `shares`, and `price`.
2. Show the order with this line:

```js
document.getElementById("ticket").textContent = "BUY 1000 ACME @ $100.25";
```

---

## Solution (Me): Order Ticket

```js
let order = {
  side: "BUY",
  ticker: "ACME",
  shares: 1000,
  price: 100.25,
};

let ticketPrice = order.price.toFixed(2);
let ticket = `${order.side} ${order.shares} ${order.ticker} @ $${ticketPrice}`;
document.getElementById("ticket").textContent = ticket;
```

<div class="demo book"><p>BUY 1000 ACME @ $100.25</p></div>

---

## Problem (You): Quote Lookup

The watchlist's lookup box calls `showQuote()` every time its text changes. Show the ticker's price, like `$54.10`, or `Unknown ticker`. Start with this object:

```js
let quotes = { ACME: 100.25, BLIP: 54.1, WIDG: 12.75 };
```

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

<div class="runs">
<div>
<p class="caption">Typed BLIP</p>
<div class="demo book"><p>$54.10</p></div>
</div>
<div>
<p class="caption">Typed ZZZZ</p>
<div class="demo book"><p>Unknown ticker</p></div>
</div>
<div>
<p class="caption">Typed blip</p>
<div class="demo book"><p>Unknown ticker</p></div>
</div>
</div>

`quotes.ticker` and `quotes["ticker"]` both look for a key named `ticker`. Keys must match exactly, so `blip` is unknown.

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

```js
while (condition) {
  // runs again and again, as long as condition is true
}
```

- It looks like an `if`: the condition goes in `( )`, and the code to run goes in `{ }`.
- An `if` checks its condition once. A `while` checks it again each time the block finishes. Once it's `false`, JavaScript moves on to the code after the `}`.
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

`count++` moves `count` toward 6, the first value that makes `count <= 5` false. `Done` prints after the loop ends.

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

## `+=` With Strings

```js
let message = "Market";
message += " open"; // "Market open"
```

`+=` adds a string to the end of another. Start from an empty string, `""`, to build one up a piece at a time:

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

The page line comes after the loop, so it runs once, with every block in `size`.

---

## Problem (Us): Doubling Time

An index fund grows 7% a year. Let's show how many years it takes \$1,000 to double:

```js
let fund = { balance: 1000, rate: 0.07 };
```

1. Copy `fund.balance` into a variable `balance`, so the loop doesn't change the fund.
2. Count the years in `years`, starting at 0. While `balance` is under twice the fund's balance, add a year of growth.
3. Use this line to change the page:

```js
document.getElementById("doubling").textContent = "11 years";
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

`balance` went 1000, 1070, 1144.90, and so on up to 1967.15, then 2104.85: 11 years. We didn't know the count before the loop started, so the loop ran until its condition turned `false`. `balance` is a copy, so `fund.balance` is still 1000.

---

## Problem (You): Buying Power

We have \$1,000, and ACME costs \$100.25 a share (`quotes.ACME`). Buy shares until we can't afford another, then show how many we bought and the cash left over.

1. Store the cash in `cash`, and count the shares in `bought`, starting at 0.
2. Each iteration buys one share. When should the loop stop?

Use this line to change the page:

```js
document.getElementById("buying-power").textContent = "9 shares, $97.75 left";
```

---

## Solution (You): Buying Power

```js
let cash = 1000;
let bought = 0;

while (cash >= quotes.ACME) {
  cash -= quotes.ACME;
  bought++;
}

let power = `${bought} shares, $${cash.toFixed(2)} left`;
document.getElementById("buying-power").textContent = power;
```

With `>`, exactly \$100.25 left over couldn't buy a share, so the condition uses `>=`.

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

A `for` loop is a `while` loop with the setup, the condition, and the update on one line. When a loop counts, `for` keeps the update where we can see it, so it's harder to forget.

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

The third loop runs once too many. That's an **off-by-one** error, a common loop bug. To run a loop `n` times, start at 0 with `<`, or at 1 with `<=`. The update can be any shortcut from the intro lecture.

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

`count` is gone. A `let` in the `for` belongs to the loop, so `i` doesn't exist after the `}`, and the next loop can declare its own `let i`.

---

## Problem (Us): Fill Bar

An order **fills** as other traders trade with it, often a few shares at a time. So far, 600 of our 1000 shares have filled. Let's draw █ for each 100 shares filled, and ░ for each 100 still open.

1. Add a `filled` property to `order`, set to 600.
2. Loop over the bar's slots, from 1 to `order.shares / 100`.
3. For each slot, add █ or ░. How do we know which one?

Use this line to change the page:

```js
document.getElementById("fill").textContent = "██████░░░░";
```

---

## Solution (Us): Fill Bar

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
- For keys that are words, the properties come in the order they were added.

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
ticker: ACME
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
2. Add a list item for each ticker with this line:

```js
document.getElementById("watchlist").innerHTML += "<li>ACME: $100.25</li>";
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

<div class="demo book"><ul><li>ACME: $100.25</li><li>BLIP: $54.10</li><li>WIDG: $12.75</li></ul></div>

The loop variable can have any name, and `ticker` says what each key is. Adding a ticker to `quotes` adds a line to the watchlist, with no change to the loop.

---

## Problem (Us): Order Book

Each side of the book is an object. A price is the key, and the shares offered at that price are the value:

```js
let asks = { "101.00": 300, "100.75": 900, "100.50": 400 };
let bids = { "100.25": 600, "100.00": 1200, "99.75": 500 };
```

1. Every price needs Size Bar's loop, so put it in a function, `depthBar(shares)`, that returns the bar.
2. For each ask, add a list item like `<li class="ask">101.00 ███ 300</li>` to the page's `asks` list with `innerHTML +=`.
3. Do the same for the bids, with the `bid` class.

The keys need quotes. Without them, `101.00` would become the key `"101"`.

---

## Solution (Us): Order Book

```js
function depthBar(shares) {
  let bar = "";

  for (let i = 0; i < shares / 100; i++) {
    bar += "█";
  }

  return bar;
}

for (let price in asks) {
  let shares = asks[price];
  let line = `<li class="ask">${price} ${depthBar(shares)} ${shares}</li>`;
  document.getElementById("asks").innerHTML += line;
}
```

`depthBar` is Size Bar's loop, with `shares` in place of `order.shares`.

---

## Solution (Us): Order Book (Continued)

The bids loop is the asks loop with `bids` and the `bid` class:

```js
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

<p class="caption">Fixed</p>

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

Copy the fixed best-bid loop from Keys Are Strings into `practice.js`. Then find the best ask, the lowest price in `asks`, and show the spread between them: `Spread: $0.25`.

1. Start `bestAsk` at `Infinity`, a value bigger than every number, so the first ask replaces it.
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

<div class="demo book"><ul class="ladder"><li class="ask">100.50 ████ 400</li><li>Spread: $0.25</li><li class="bid">100.25 ██████ 600</li></ul></div>

---

# `forEach`

---

## Keys and Values as Lists

<!-- prettier-ignore -->
```js
Object.keys(quotes);   // ["ACME", "BLIP", "WIDG"]
Object.values(quotes); // [100.25, 54.1, 12.75]
```

`Object.keys` gives back a list of an object's keys, and `Object.values` gives back a list of its values. A list in `[ ]` is an **array**. Arrays get their own lecture next time; today we only loop over them.

---

## `forEach`

```js
Object.keys(quotes).forEach(function (ticker) {
  console.log(ticker);
});
```

- `forEach` is a method that every array has. It calls the function we give it once for each item in the array, with that item as the argument.
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
ACME
BLIP
WIDG
```

</div>
</div>

Both loops print the same lines. With `Object.values`, `forEach` hands the function each value instead of each key.

---

## Problem (Us): Average Price

The book card should show the average price of today's trades in ACME. The keys are the times of the trades:

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

`priceSum` and `tradeCount` sit outside the function, so they keep their totals between calls. A `let` inside the function would start over at 0 for every trade.

---

# Arrow Functions

---

## Functions Are Values

```js
let fee = function (amount) {
  return amount * 0.01;
};

console.log(fee(500)); // 5
```

A function is a value, like a number or a string, so a variable can hold one. We call it with the variable's name: `fee(500)`.

That's what `forEach` gets: a function value, which it calls once for each item.

---

## From `function` to `=>`

![w:1120 The same fee function written three ways. First, let fee = function (amount) { return amount * 0.01; }; stored a function in a variable. Second, the arrow function let fee = (amount) => { return amount * 0.01; }; dropped the word function and put => after the parameters. Third, let fee = (amount) => amount * 0.01; dropped the braces, return, and the inner semicolon, since the body was one expression, and gave back amount * 0.01 by itself.](examples/diagrams/arrow-function.svg)

An **arrow function** is a shorter way to write a function value. Without `{ }`, it gives back its one expression, with no `return`.

---

## Arrow Function Shapes

```js
let marketStatus = () => "Open";
let fee = (amount) => amount * 0.01;
let profit = (buyPrice, sellPrice) => sellPrice - buyPrice;
let cost = (shares, price) => {
  let subtotal = shares * price;
  return subtotal + fee(subtotal);
};
```

- With no parameters, write empty `()`.
- With one parameter, the `()` are optional: `amount => amount * 0.01` works too.
- With more than one statement, the body needs `{ }` and `return`.

---

## Braces Mean No Automatic Return

<!-- prettier-ignore -->
```js
let fee = (amount) => { amount * 0.01; };
console.log(fee(500)); // undefined

let makeOrder = (ticker) => ({ ticker: ticker, shares: 100 });
console.log(makeOrder("BLIP").shares); // 100
```

With `{ }`, the body is a block, and a block gives back only what `return` gives back. To give back an object from a one-line arrow function, wrap the object in `( )`, so JavaScript doesn't read its `{ }` as a block.

---

## `function` or `=>`?

<!-- prettier-ignore -->
```js
console.log(double(4)); // 8
console.log(half(4));   // ReferenceError: half isn't ready yet

function double(n) { return n * 2; }
let half = (n) => n / 2;
```

- Use `function` for a named function that the page calls, like `showQuote()` from `oninput`. JavaScript sets up every `function` before the file runs, so it works from anywhere in the file.
- Use an arrow function for a short function that we hand to another function, like `forEach`. An arrow function stored with `let` exists only after its line runs.

---

## Example: `forEach` With an Arrow Function

```js
Object.keys(quotes).forEach((ticker) => console.log(ticker));

Object.values(trades).forEach((price) => {
  priceSum += price;
  tradeCount++;
});
```

The first loop's body is one statement, so it fits on one line. The second is Average Price's loop, and its body has two statements, so it keeps its `{ }`.

---

## Problem (Me): Positions

Our portfolio holds three stocks:

```js
let positions = { ACME: 10, BLIP: 25, WIDG: 40 };
```

1. List each position with its value at today's price, like `<li>ACME: 10 shares, $1002.50</li>`.
2. Loop with `Object.keys` and `forEach`, and give `forEach` an arrow function.
3. Add each list item to the page's `positions` list with `innerHTML +=`, as in Watchlist.

---

## Solution (Me): Positions

```js
let positions = { ACME: 10, BLIP: 25, WIDG: 40 };

Object.keys(positions).forEach((ticker) => {
  let held = positions[ticker];
  let value = (held * quotes[ticker]).toFixed(2);
  let line = `<li>${ticker}: ${held} shares, $${value}</li>`;
  document.getElementById("positions").innerHTML += line;
});
```

<div class="demo book"><ul><li>ACME: 10 shares, $1002.50</li><li>BLIP: 25 shares, $1352.50</li><li>WIDG: 40 shares, $510.00</li></ul></div>

---

## Problem (You): Movers

Show how far each stock has moved since the market opened, as a percent with two decimal places. The starter's CSS colors the `up` class green and the `down` class red. Store the math in an arrow function, `change`.

```js
let opens = { ACME: 100, BLIP: 55, WIDG: 12.5 };
```

<!-- prettier-ignore -->
```js
let line = `<li class="${side}">${ticker}: ${percent.toFixed(2)}%</li>`;
Object.keys(quotes).forEach(ticker) => {
});
let change = (open, now) => ((now - open) / open) * 100;
document.getElementById("movers").innerHTML += line;
let side = percent >= 0 ? "up" : "down";
let change = (open, now) => { ((now - open) / open) * 100; };
Object.keys(quotes).forEach((ticker) => {
let percent = change(opens[ticker], quotes[ticker]);
```

Assemble the program from the lines above. Two of the lines are wrong.

---

## Solution (You): Movers

```js
let change = (open, now) => ((now - open) / open) * 100;

Object.keys(quotes).forEach((ticker) => {
  let percent = change(opens[ticker], quotes[ticker]);
  let side = percent >= 0 ? "up" : "down";
  let line = `<li class="${side}">${ticker}: ${percent.toFixed(2)}%</li>`;
  document.getElementById("movers").innerHTML += line;
});
```

<div class="runs">
<div class="demo book"><p class="up">ACME: 0.25%</p></div>
<div class="demo book"><p class="down">BLIP: -1.64%</p></div>
<div class="demo book"><p class="up">WIDG: 2.00%</p></div>
</div>

With `{ }`, `change` gives back `undefined`, and `percent.toFixed(2)` stops with an error. `forEach(ticker) => {` closes `forEach(` before the arrow function starts, a syntax error that stops all of `practice.js`.

---

## Which Loop?

| Loop       | Use It When                                | Example From Today |
| ---------- | ------------------------------------------ | ------------------ |
| `while`    | we don't know how many iterations it needs | Doubling Time      |
| `for`      | we know how many iterations it needs       | Fill Bar           |
| `for...in` | we need every key in an object             | Order Book         |
| `forEach`  | we have an array and a function to run     | Positions          |

Any of these loops can do the others' jobs. Pick the one that says what the loop is for.

---

# Conclusion

---

## The Finished Page

Every solution from today, together:

- [ACME Order Book](https://bi3mer.github.io/lectures/cs213/js/examples/orderbook-final/), running live
- [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/js/examples/orderbook-final/practice.js) on GitHub, in the order we wrote it

The HTML is the same as `orderbook-starter.html`.

---

## Summary

- An object keeps values under keys. Read one with `order.shares`, or with `order[key]` when the key is in a variable.
- A `while` loop repeats its block while its condition is `true`, so something in the block has to make it `false`.
- A `for` loop puts the setup, the condition, and the update on one line. To run it `n` times, start at 0 with `<`, or at 1 with `<=`.
- `for...in` gives each key of an object as a string, so use `Number()` before comparing number keys.
- `Object.keys` and `Object.values` give arrays, and `forEach` runs a function for each item.
- An arrow function, like `(amount) => amount * 0.01`, gives back its one expression. With `{ }`, it needs `return`.

---

# Questions?

---

## Stopping Early: `break`

Which year is the first one where the index fund passes \$5,000?

```js
let balance = 1000;

for (let year = 1; year <= 50; year++) {
  balance *= 1.07;

  if (balance > 5000) {
    console.log(`Year ${year}: $${balance.toFixed(2)}`);
    break;
  }
}
```

`break` ends the loop right away, even when the condition is still `true`. It prints `Year 24: $5072.37` once. Without `break`, it would also print years 25 through 50.
