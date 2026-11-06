# Build a Trading Desk

You will extend the [order book](../10-order-book/instruction.html) with arrays: today's trades, a watchlist, and buttons that change the book. All companies and prices are made up.

See the [finished page](final/) to know where you are headed, and the [lecture](../../lectures/11-js-arrays/lecture.html) if a step uses something you want to review.

## Setup

1. Open the [starter files on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/11-trading-desk/starter): `index.html` and `practice.js`.
2. Make a new folder in WebStorm. For each file, click **Copy raw file**, the copy icon above the code, and paste it into a new file with the same name.
3. Open `index.html` in the browser, and reload the page after each step.

`practice.js` has a banner comment for each section below. Commented-out page lines in a section are there for you to use: uncomment them where your code needs them.

## Step 1: Watchlist

Search `practice.js` for `@1`, and put `"TEST"` and `"BLIP"` in `watchlist`:

```js
let watchlist = ["TEST", "BLIP"];
```

Then show the list, and add a new uppercase ticker when **Add** is clicked. An empty box or a repeat adds nothing.

```js
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

## Step 2: Today's Range

Find the lowest and highest price so far.

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

The page should show `$100.10 to $100.50`.

## Step 3: Ticks

Count how many trades went up and down from the trade before. The loop starts at 1, because the first trade has nothing before it.

```js
function showTicks() {
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
}

showTicks();
```

## Step 4: Market Sell

Sell 500 shares to the best bid first. A filled level leaves with `shift`, and a partly filled level keeps its leftover shares.

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

## Step 5: Draw the Asks

In `drawBook()`, draw the asks from the last index down to 0, so the highest ask goes on top.

```js
document.getElementById("asks").innerHTML = "";

for (let i = asks.length - 1; i >= 0; i--) {
  let ask = asks[i];
  let bar = depthBar(ask.shares);
  let line = `<li class="ask">${ask.price.toFixed(2)} ${bar} ${ask.shares}</li>`;
  document.getElementById("asks").innerHTML += line;
}
```

## Step 6: Empty Book

Five clicks of **Sell 500 at market** empty the bids, and `bids[0]` becomes `undefined`. In `drawBook()`, check both sides first, and turn off the button when there are no bids.

```js
// The if replaces Draw the Asks' two spread lines.
if (asks.length > 0 && bids.length > 0) {
  let spread = asks[0].price - bids[0].price;
  document.getElementById("spread").textContent = `Spread: $${spread.toFixed(2)}`;
} else {
  document.getElementById("spread").textContent = "Spread: none";
}

document.getElementById("sell").disabled = bids.length === 0;
```

Click **Sell 500 at market** five times: the spread should say `Spread: none`.

## Step 7: Average Price

Add up `prices` with `forEach` and an arrow function, then divide by the number of trades.

```js
let priceSum = 0;

prices.forEach((price) => {
  priceSum += price;
});

let average = (priceSum / prices.length).toFixed(2);
document.getElementById("average").textContent = `$${average}`;
```

The page should show `$100.31`.

## Step 8: Movers

Show each position's percent change, in a class that colors it.

```js
function showMovers() {
  let change = (open, now) => ((now - open) / open) * 100;

  positions.forEach((position) => {
    let percent = change(position.open, position.price);
    let trend = percent >= 0 ? "up" : "down";
    let line = `<li class="${trend}">${position.ticker}: ${percent.toFixed(2)}%</li>`;
    document.getElementById("movers").innerHTML += line;
  });
}

showMovers();
```

## Step 9: Place a Bid

**Place bid** adds a level to `bids`, then sorts so the highest price comes first.

```js
function placeBid() {
  let price = Number(document.getElementById("order-price").value);
  let shares = Number(document.getElementById("order-shares").value);

  bids.push({ price: price, shares: shares });
  bids.sort((a, b) => b.price - a.price);
  drawBook();
}
```

A bid for 300 shares at 100.10 should land between 100.25 and 100.00.

## Compare

Your page should now match the [finished page](final/). If something differs, compare your files with the [final code on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/11-trading-desk/final).
