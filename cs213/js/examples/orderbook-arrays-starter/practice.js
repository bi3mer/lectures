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

  // Write your code above this note. Then uncomment the page line below.
  // document.getElementById("spread").textContent = `Spread: $${spread.toFixed(2)}`;

  // ------------------------------- Empty Book --------------------------------
  // Page line for Empty Book. Uncomment it where your code needs it.
  // document.getElementById("sell").disabled = true;
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
// let ticker = document.getElementById("new-ticker").value;
// document.getElementById("watchlist").textContent = watchlist.join(", ");

// ------------------------------- Today's Range -------------------------------

// Write your code above this note. Then uncomment the page line below.
// document.getElementById("range").textContent = range;

// ---------------------------------- Upticks ----------------------------------

// -------------------------------- Market Sell --------------------------------
// Page line for Market Sell. Uncomment it where your code needs it.
// document.getElementById("fills").textContent = fills.join(", ");

// ------------------------------- Average Price -------------------------------

// Write your code above this note. Then uncomment the page line below.
// document.getElementById("average").textContent = `$${average}`;

// ---------------------------------- Movers -----------------------------------

// -------------------------------- Place a Bid --------------------------------
