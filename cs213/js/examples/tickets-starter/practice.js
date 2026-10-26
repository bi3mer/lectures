const price = 42.5; // one general admission ticket
let percentOff = 0; // a percent from 0 to 50, set by a promo code
const showTime = new Date(2026, 11, 4, 20, 0);

// turns a number into dollars and cents: 1234.5 becomes $1,234.50
function dollars(amount) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

document.getElementById("price").textContent = dollars(price);

// --------------------------------- To Cents ----------------------------------
function toCents(amount) {
  // amount rounded to the nearest cent: 15.299999999999999 becomes 15.3
}

// -------------------------------- Order Total --------------------------------
function showTotal() {
  let count = document.getElementById("count").value;

  // ------------------------------ Ticket Limit -------------------------------
  // Page line for Ticket Limit. Uncomment it where your code needs it.

  // round count down, then keep it from 1 to 8
  // document.getElementById("count").value = ?;

  // ------------------------------- Order Total -------------------------------
  // Page lines for Order Total. Uncomment them where your code needs them.

  // the tickets minus percentOff, then a 12% fee, each rounded with toCents
  // document.getElementById("subtotal").textContent = ?;
  // document.getElementById("fee").textContent = ?;
  // document.getElementById("total").textContent = ?;
}

showTotal();

// --------------------------------- Countdown ---------------------------------
// Page line for Countdown. Uncomment it where your code needs it.

function showCountdown() {
  // the whole days from now until showTime
  // document.getElementById("countdown").textContent = `Starts in ${?} days`;
}

showCountdown();
setInterval(showCountdown, 1000); // calls showCountdown again every 1000 ms

// --------------------------------- Show Date ---------------------------------
// Page line for Show Date. Uncomment it where your code needs it.

// the show's weekday, month, day, and time, like Friday, December 4 at 8:00 PM
// document.getElementById("when").textContent = ?;

// -------------------------------- Promo Code ---------------------------------
// Page lines for Promo Code. Uncomment them where your code needs them.

function applyCode() {
  // a code like 21310 takes 10 percent off, up to 50; anything else is unknown
  // const code = document.getElementById("code").value;
  // document.getElementById("code-message").textContent = `${?}% off`;
  // document.getElementById("code-message").textContent = "Unknown code";

  showTotal();
}

// ------------------------------ Name on Ticket -------------------------------
// Page lines for Name on Ticket. Uncomment them where your code needs them.

function showName() {
  // a name like ada lovelace goes on the ticket as LOVELACE, ada
  // const name = document.getElementById("name").value;
  // document.getElementById("ticket-name").textContent = "GUEST";
  // document.getElementById("ticket-name").textContent = ?;
}

// --------------------------------- Parsons 1 ---------------------------------
