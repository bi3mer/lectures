# Build an Order Book

You will build a trading page for a made-up stock, TEST, using objects and loops. An **order book** lists the prices traders offer: **bids** to buy and **asks** to sell. All companies and prices are made up.

See the [finished page](final/) to know where you are headed, and the [lecture](../../lectures/10-js-objects-loops/lecture.html) if a step uses something you want to review.

## Setup

1. Open the [starter files on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/10-order-book/starter): `index.html` and `practice.js`.
2. Make a new folder in WebStorm. For each file, click **Copy raw file**, the copy icon above the code, and paste it into a new file with the same name.
3. Open `index.html` in the browser, and reload the page after each step.

`practice.js` has a banner comment for each section below. Commented-out page lines in a section are there for you to use: uncomment them where your code needs them.

## Step 1: Quote

The ticker box calls `showQuote()` as you type. Look the ticker up in `quotes`. Brackets are needed here, because the key is in a variable.

```js
function showQuote() {
  let ticker = document.getElementById("ticker").value.toUpperCase();
  let quote = quotes[ticker];

  if (quote === undefined) {
    document.getElementById("quote").textContent = "Unknown ticker";
  } else {
    document.getElementById("quote").textContent = `$${quote.toFixed(2)}`;
  }
}
```

Type `test`, then `nope`.

## Step 2: Doubling Time

Find how many years `fund` takes to double at 7% a year. Copy `fund.balance` first, so the loop leaves `fund` alone.

```js
let balance = fund.balance;
let years = 0;

while (balance < 2 * fund.balance) {
  balance += balance * fund.rate;
  years++;
}

document.getElementById("doubling").textContent = `${years} years`;
```

## Step 3: Buying Power

Count how many shares $1000 can buy.

```js
function showBuyingPower() {
  let cash = 1000;
  let bought = 0;

  while (cash >= quotes.TEST) {
    cash -= quotes.TEST;
    bought++;
  }

  let power = `${bought} shares, $${cash.toFixed(2)} left`;
  document.getElementById("buying-power").textContent = power;
}

showBuyingPower();
```

## Step 4: Fill Bar

An order **fills** as other traders trade with it. Draw █ for each 100 shares filled, and ░ for each 100 still open.

```js
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

## Step 5: Opening Bell

Count down from 5 in the banner at the top of the page.

```js
let countdown = "";

for (let i = 5; i > 0; i--) {
  countdown += `${i}... `;
}

countdown += "🔔 Open!";
document.getElementById("banner").textContent = countdown;
```

## Step 6: Depth Bar

Write a function that draws one █ for every 100 shares. Nothing changes on the page yet; the next steps call it.

```js
function depthBar(shares) {
  let bar = "";

  for (let i = 0; i < shares / 100; i++) {
    bar += "█";
  }

  return bar;
}
```

## Step 7: Draw the Asks

Each side of the book is an object: a price is the key, and the shares are the value. Loop over `asks` and add one line per price. The CSS shows `.ask` in red.

```js
for (let price in asks) {
  let shares = asks[price];
  let line = `<li class="ask">${price} ${depthBar(shares)} ${shares}</li>`;
  document.getElementById("asks").innerHTML += line;
}
```

## Step 8: Draw the Bids

`bids` works the same way, in green.

```js
for (let price in bids) {
  let shares = bids[price];
  let line = `<li class="bid">${price} ${depthBar(shares)} ${shares}</li>`;
  document.getElementById("bids").innerHTML += line;
}
```

## Step 9: Spread

The **spread** is the lowest ask minus the highest bid. `Infinity` is a safe start for `bestAsk`, because every price is lower.

```js
let bestBid = 0;

for (let price in bids) {
  if (Number(price) > bestBid) {
    bestBid = Number(price);
  }
}

let bestAsk = Infinity;

for (let price in asks) {
  if (Number(price) < bestAsk) {
    bestAsk = Number(price);
  }
}

let spread = `Spread: $${(bestAsk - bestBid).toFixed(2)}`;
document.getElementById("spread").textContent = spread;
```

## Step 10: Market Sell

A **market order** trades right away at the best prices. Sell 1000 shares to the best bids in order, and `break` once they are all sold.

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

The page should show `600 @ 100.25, 400 @ 100.00`.

## Step 11: Trading Days

Count the weekdays in a 30-day month that starts on a Monday. `day % 7` is 6 on Saturdays and 0 on Sundays, and `continue` skips them.

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

## Compare

Your page should now match the [finished page](final/). If something differs, compare your files with the [final code on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/10-order-book/final).
