let order = {
  side: "BUY",
  ticker: "TEST",
  shares: 1000,
  price: 100.25,
  filled: 600,
};

let quotes = { TEST: 100.25, BLIP: 54.1, WIDG: 12.75 };
let fund = { balance: 1000, rate: 0.07 };

let asks = { "101.00": 300, 100.75: 900, "100.50": 400 };
let bids = { 100.25: 600, "100.00": 1200, 99.75: 500 };

document.getElementById("ticket").textContent =
  `${order.side} ${order.shares} ${order.ticker} @ $${order.price.toFixed(2)}`;

// --------------------------------- Parsons 1 ---------------------------------

// ------------------------------- Doubling Time -------------------------------

// Write your code above this note. Then uncomment the page line below.
// document.getElementById("doubling").textContent = `${years} years`;

// --------------------------------- Parsons 2 ---------------------------------

// --------------------------------- Fill Bar ----------------------------------

// Write your code above this note. Then uncomment the page line below.
// document.getElementById("fill").textContent = fill;

// ------------------------------- Opening Bell --------------------------------

// Write your code above this note. Then uncomment the page line below.
// document.getElementById("banner").textContent = countdown;

// ---------------------------- Order Book, Step 1 -----------------------------

// ---------------------------- Order Book, Step 2 -----------------------------
// Your loop needs this line to add each <li> to the page. Uncomment it inside the loop.
// document.getElementById("asks").innerHTML += line;

// ---------------------------- Order Book, Step 3 -----------------------------

// ---------------------------------- Spread -----------------------------------

// Write your code above this note. Then uncomment the page line below.
// document.getElementById("spread").textContent = spread;

// -------------------------------- Market Sell --------------------------------

// Write your code above this note. Then uncomment the page line below.
// document.getElementById("market-sell").textContent = fills;

// ------------------------------- Trading Days --------------------------------

// Write your code above this note. Then uncomment the page line below.
// document.getElementById("trading-days").textContent = tradingDays;
