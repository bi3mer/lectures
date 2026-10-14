// Every solution from the loops lecture, in the order we wrote them.
// All companies and prices are made up.

// Order Ticket
let order = {
  side: "BUY",
  ticker: "TEST",
  shares: 1000,
  price: 100.25,
};

let ticketPrice = order.price.toFixed(2);
let ticket = `${order.side} ${order.shares} ${order.ticker} @ $${ticketPrice}`;
document.getElementById("ticket").textContent = ticket;

// Quote Lookup
let quotes = { TEST: 100.25, BLIP: 54.1, WIDG: 12.75 };

function showQuote() {
  let ticker = document.getElementById("ticker").value;
  let quote = quotes[ticker];

  if (quote === undefined) {
    document.getElementById("quote").textContent = "Unknown ticker";
  } else {
    document.getElementById("quote").textContent = `$${quote.toFixed(2)}`;
  }
}

// Size Bar, then Size Bar, Again
let size = "";

for (let i = 0; i < order.shares / 100; i++) {
  size += "█";
}

document.getElementById("size").textContent = size;

// Doubling Time
let fund = { balance: 1000, rate: 0.07 };
let balance = fund.balance;
let years = 0;

while (balance < 2 * fund.balance) {
  balance += balance * fund.rate;
  years++;
}

document.getElementById("doubling").textContent = `${years} years`;

// Buying Power
let cash = 1000;
let bought = 0;

while (cash >= quotes.TEST) {
  cash -= quotes.TEST;
  bought++;
}

let power = `${bought} shares, $${cash.toFixed(2)} left`;
document.getElementById("buying-power").textContent = power;

// Fill Bar
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

// Opening Bell
let countdown = "";

for (let i = 5; i > 0; i--) {
  countdown += `${i}... `;
}

countdown += "🔔 Open!";
document.getElementById("banner").textContent = countdown;

// Watchlist
for (let ticker in quotes) {
  let line = `<li>${ticker}: $${quotes[ticker].toFixed(2)}</li>`;
  document.getElementById("watchlist").innerHTML += line;
}

// Order Book, Step 1
function depthBar(shares) {
  let bar = "";

  for (let i = 0; i < shares / 100; i++) {
    bar += "█";
  }

  return bar;
}

// Order Book, Step 2
// prettier-ignore
let asks = { "101.00": 300, "100.75": 900, "100.50": 400 };

for (let price in asks) {
  let shares = asks[price];
  let line = `<li class="ask">${price} ${depthBar(shares)} ${shares}</li>`;
  document.getElementById("asks").innerHTML += line;
}

// Order Book, Step 3
// prettier-ignore
let bids = { "100.25": 600, "100.00": 1200, "99.75": 500 };

for (let price in bids) {
  let shares = bids[price];
  let line = `<li class="bid">${price} ${depthBar(shares)} ${shares}</li>`;
  document.getElementById("bids").innerHTML += line;
}

// Keys Are Strings: the best bid
let bestBid = 0;

for (let price in bids) {
  if (Number(price) > bestBid) {
    bestBid = Number(price);
  }
}

// Spread
let bestAsk = Infinity;

for (let price in asks) {
  if (Number(price) < bestAsk) {
    bestAsk = Number(price);
  }
}

let spread = `Spread: $${(bestAsk - bestBid).toFixed(2)}`;
document.getElementById("spread").textContent = spread;

// Market Sell
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

// Trading Days
let tradingDays = 0;

for (let day = 1; day <= 30; day++) {
  if (day % 7 === 6 || day % 7 === 0) {
    continue;
  }
  tradingDays++;
}

document.getElementById("trading-days").textContent = tradingDays;
