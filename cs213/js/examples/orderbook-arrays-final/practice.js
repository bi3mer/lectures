// Every solution from the arrays lecture. Draw the Asks and Empty Book are inside drawBook(), and
// the other sections follow the order we wrote them.
// All companies and prices are made up.

let prices = [100.1, 100.3, 100.45, 100.25, 100.25, 100.5];

let bids = [
  { price: 100.25, shares: 600 },
  { price: 100, shares: 1200 },
  { price: 99.75, shares: 500 },
];
let asks = [
  { price: 100.5, shares: 400 },
  { price: 100.75, shares: 900 },
  { price: 101, shares: 300 },
];

let positions = [
  { ticker: "TEST", shares: 10, open: 100, price: 100.5 },
  { ticker: "BLIP", shares: 25, open: 55, price: 54.1 },
  { ticker: "WIDG", shares: 40, open: 12.5, price: 12.75 },
];

document.getElementById("last").textContent =
  `$${prices[prices.length - 1].toFixed(2)} (${prices.length} trades)`;

function depthBar(shares) {
  let bar = "";

  for (let i = 0; i < shares / 100; i++) {
    bar += "█";
  }

  return bar;
}

function drawBook() {
  document.getElementById("bids").innerHTML = "";

  for (let bid of bids) {
    let bar = depthBar(bid.shares);
    let line = `<li class="bid">${bid.price.toFixed(2)} ${bar} ${bid.shares}</li>`;
    document.getElementById("bids").innerHTML += line;
  }

  // ------------------------------ Draw the Asks ------------------------------
  document.getElementById("asks").innerHTML = "";

  for (let i = asks.length - 1; i >= 0; i--) {
    let ask = asks[i];
    let bar = depthBar(ask.shares);
    let line = `<li class="ask">${ask.price.toFixed(2)} ${bar} ${ask.shares}</li>`;
    document.getElementById("asks").innerHTML += line;
  }

  // ------------------------------- Empty Book --------------------------------
  // The if replaces Draw the Asks' two spread lines.
  if (asks.length > 0 && bids.length > 0) {
    let spread = asks[0].price - bids[0].price;
    document.getElementById("spread").textContent = `Spread: $${spread.toFixed(2)}`;
  } else {
    document.getElementById("spread").textContent = "Spread: none";
  }

  document.getElementById("sell").disabled = bids.length === 0;
}

function placeAsk() {
  let price = Number(document.getElementById("order-price").value);
  let shares = Number(document.getElementById("order-shares").value);

  asks.push({ price: price, shares: shares });
  asks.sort((a, b) => a.price - b.price);
  drawBook();
}

drawBook();

// --------------------------------- Watchlist ---------------------------------
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

// -------------------------------- Remove Last --------------------------------
function removeTicker() {
  let removed = watchlist.pop();
  showWatchlist();
  document.getElementById("removed").textContent = `Removed ${removed}`;
}

// ------------------------------- Today's Range -------------------------------
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

// ---------------------------------- Upticks ----------------------------------
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

// -------------------------------- Market Sell --------------------------------
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

// ------------------------------- Average Price -------------------------------
let priceSum = 0;

prices.forEach(function (price) {
  priceSum += price;
});

let average = (priceSum / prices.length).toFixed(2);
document.getElementById("average").textContent = `$${average}`;

// ---------------------------------- Movers -----------------------------------
let change = (open, now) => ((now - open) / open) * 100;

positions.forEach((position) => {
  let percent = change(position.open, position.price);
  let trend = percent >= 0 ? "up" : "down";
  let line = `<li class="${trend}">${position.ticker}: ${percent.toFixed(2)}%</li>`;
  document.getElementById("movers").innerHTML += line;
});

// -------------------------------- Place a Bid --------------------------------
function placeBid() {
  let price = Number(document.getElementById("order-price").value);
  let shares = Number(document.getElementById("order-shares").value);

  bids.push({ price: price, shares: shares });
  bids.sort((a, b) => b.price - a.price);
  drawBook();
}
