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
  return Math.round(amount * 100) / 100;
}

// -------------------------------- Order Total --------------------------------
function showTotal() {
  let count = Number(document.getElementById("count").value);

  // ------------------------------ Ticket Limit -------------------------------
  count = Math.floor(count);
  count = Math.max(count, 1);
  count = Math.min(count, 8);
  document.getElementById("count").value = count;

  // ------------------------------- Order Total -------------------------------
  const subtotal = toCents(count * price * (1 - percentOff / 100));
  const fee = toCents(subtotal * 0.12);
  const total = toCents(subtotal + fee);

  document.getElementById("subtotal").textContent = dollars(subtotal);
  document.getElementById("fee").textContent = dollars(fee);
  document.getElementById("total").textContent = dollars(total);
}

showTotal();

// --------------------------------- Countdown ---------------------------------
function showCountdown() {
  const ms = showTime - new Date();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  if (ms > 0) {
    document.getElementById("countdown").textContent = `Starts in ${days} days`;
  } else {
    document.getElementById("countdown").textContent = "The show has started";
  }
}

showCountdown();
setInterval(showCountdown, 1000); // calls showCountdown again every 1000 ms

// --------------------------------- Show Date ---------------------------------
const full = { weekday: "long", month: "long", day: "numeric" };
const date = showTime.toLocaleDateString("en-US", full);
const short = { hour: "numeric", minute: "2-digit" };
const time = showTime.toLocaleTimeString("en-US", short);

document.getElementById("when").textContent = `${date} at ${time}`;

// -------------------------------- Promo Code ---------------------------------
function applyCode() {
  const code = document.getElementById("code").value.trim();
  const percent = Number(code.slice(3));

  if (code.startsWith("213") && percent >= 1 && percent <= 50) {
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
  const name = document.getElementById("name").value.trim();

  if (name === "") {
    document.getElementById("ticket-name").textContent = "GUEST";
  } else {
    const parts = name.split(" ");
    if (parts.length === 1) {
      document.getElementById("ticket-name").textContent = name.toUpperCase();
    } else {
      const first = parts.slice(0, -1).join(" ");
      const last = parts[parts.length - 1].toUpperCase();
      document.getElementById("ticket-name").textContent = `${last}, ${first}`;
    }
  }
}

// --------------------------------- Parsons 1 ---------------------------------
function parsons1() {
  const rows = "ABCDEFGH";
  const row = rows[Math.floor(Math.random() * rows.length)];
  const seat = Math.floor(Math.random() * 20) + 1;
  const number = Math.floor(Math.random() * 10000);
  const code = "SC-" + String(number).padStart(4, "0");

  document.getElementById("confirmation").textContent = `Row ${row}, seat ${seat}, ${code}`;
}
