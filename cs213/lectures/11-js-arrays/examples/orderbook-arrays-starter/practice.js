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
  { ticker: "TEST", open: 100, price: 100.5 },
  { ticker: "BLIP", open: 55, price: 54.1 },
  { ticker: "WIDG", open: 12.5, price: 12.75 },
];

let watchlist = []; // @1

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
  // Page line for Draw the Asks. Uncomment it where your code needs it.

  // clear the asks, then draw them from the last index down to 0
  // the spread is the best ask's price minus the best bid's
  // document.getElementById("spread").textContent = `Spread: $${?}`;

  // ------------------------------- Empty Book --------------------------------
  // Page lines for Empty Book. Uncomment them where your code needs them.

  // show Spread: none when either side is empty
  // turn off the Sell button when there are no bids
  // document.getElementById("spread").textContent = "Spread: none";
  // document.getElementById("sell").disabled = ?;
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
// Page lines for Watchlist. Uncomment them where your code needs them.

function showWatchList() {
  // make each value from watchlist comma separated
  // document.getElementById("watchlist").textContent = ?;
}

function addTicker() {
  // let ticker = document.getElementById("new-ticker").value;
}

showWatchList();

// ------------------------------- Today's Range -------------------------------
// Page line for Today's Range. Uncomment it where your code needs it.

// find the lowest and highest price in prices
// document.getElementById("range").textContent = ?;

// --------------------------------- Parsons 1 ---------------------------------

// -------------------------------- Market Sell --------------------------------
// Page line for Market Sell. Uncomment it where your code needs it.

function sellAtMarket() {
  // sell 500 shares, best bid first, and keep each fill in fills
  let toSell = 500;
  let fills = [];

  // document.getElementById("fills").textContent = ?;
  drawBook();
}

// ------------------------------- Average Price -------------------------------
// Page line for Average Price. Uncomment it where your code needs it.

// add up prices with forEach, then divide by the number of trades
// document.getElementById("average").textContent = `$${?}`;

// --------------------------------- Parsons 2 ---------------------------------

// -------------------------------- Place a Bid --------------------------------
// Page lines for Place a Bid. Uncomment them where your code needs them.

function placeBid() {
  // add the bid, keep the highest price first, then redraw the book
  // let price = document.getElementById("order-price").value;
  // let shares = document.getElementById("order-shares").value;
}
