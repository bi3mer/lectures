let price = 42.5; // one general admission ticket
let percentOff = 0; // a promo code changes this
let show = new Date(2026, 11, 4, 20, 0); // @1

// turns a number into dollars and cents: 1234.5 becomes $1,234.50
function dollars(amount) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

document.getElementById("price").textContent = dollars(price);

// -------------------------------- Order Total --------------------------------
function showTotal() {
  let count = Number(document.getElementById("count").value);

  // ------------------------------ Ticket Limit -------------------------------
  count = Math.floor(count);
  count = Math.max(count, 1);
  count = Math.min(count, 8);
  document.getElementById("count").value = count;

  let subtotal = count * price * (1 - percentOff / 100);
  subtotal = Math.round(subtotal * 100) / 100;
  let fee = Math.round(subtotal * 0.12 * 100) / 100;
  let total = subtotal + fee;

  document.getElementById("subtotal").textContent = dollars(subtotal);
  document.getElementById("fee").textContent = dollars(fee);
  document.getElementById("total").textContent = dollars(total);
}

showTotal();

// --------------------------------- Countdown ---------------------------------
function showCountdown() {
  let ms = show - new Date();
  let days = Math.floor(ms / (1000 * 60 * 60 * 24));
  let hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
  let minutes = Math.floor(ms / (1000 * 60)) % 60;

  if (ms > 0) {
    document.getElementById("countdown").textContent = `Starts in ${days}d ${hours}h ${minutes}m`;
  } else {
    document.getElementById("countdown").textContent = "The show has started";
  }
}

showCountdown();
setInterval(showCountdown, 1000); // calls showCountdown again every 1000 ms

// --------------------------------- Show Date ---------------------------------
let full = { weekday: "long", month: "long", day: "numeric" };
let date = show.toLocaleDateString("en-US", full);
let short = { hour: "numeric", minute: "2-digit" };
let time = show.toLocaleTimeString("en-US", short);

document.getElementById("when").textContent = `${date} at ${time}`;

// -------------------------------- Promo Code ---------------------------------
function applyCode() {
  let code = document.getElementById("code").value.trim().toUpperCase();
  let percent = Number(code.slice(4));

  if (code.startsWith("SEMI") && Number.isInteger(percent) && percent > 0) {
    percentOff = percent;
    document.getElementById("code-message").textContent = `${percent}% off`;
  } else {
    percentOff = 0;
    document.getElementById("code-message").textContent = "Unknown code";
  }

  showTotal();
}

// ------------------------------ Name on Ticket -------------------------------
function showName() {
  let name = document.getElementById("name").value.trim();

  if (name === "") {
    document.getElementById("ticket-name").textContent = "GUEST";
  } else {
    let parts = name.split(" ");
    let first = parts[0];
    first = first[0].toUpperCase() + first.slice(1).toLowerCase();
    let last = parts[parts.length - 1].toUpperCase();
    document.getElementById("ticket-name").textContent = `${last}, ${first}`;
  }
}

// --------------------------------- Parsons 1 ---------------------------------
function parsons1() {
  let rows = "ABCDEFGH";
  let row = rows[Math.floor(Math.random() * rows.length)];
  let seat = Math.floor(Math.random() * 20) + 1;
  let number = Math.floor(Math.random() * 10000);
  let code = "SC-" + String(number).padStart(4, "0");

  document.getElementById("confirmation").textContent = `Row ${row}, seat ${seat}, ${code}`;
}
