// Every step from instruction.md, in order.
// To see another time of day, change new Date().getHours() to a number, like 20.

let hour = new Date().getHours();
let bagsLeft = 3;

// --------------------------------- Open Sign ---------------------------------
if (hour >= 7 && hour < 18) {
  document.getElementById("sign").style.backgroundColor = "green";
} else {
  document.getElementById("sign").textContent = "Closed";
  document.getElementById("sign").style.backgroundColor = "red";
  document.body.style.backgroundColor = "gray";
}

// --------------------------------- Sold Out ----------------------------------
document.getElementById("buy").disabled = bagsLeft === 0;

// -------------------------------- Age Check ---------------------------------
function checkAge() {
  let age = Number(document.getElementById("age").value);

  document.getElementById("latte").disabled = age < 12;
}

// -------------------------------- Member Name --------------------------------
function showName() {
  let name = document.getElementById("name").value;

  if (name === "") {
    document.getElementById("member").textContent = "Guest";
  } else {
    document.getElementById("member").textContent = name;
  }
}

// --------------------------------- Low Stock ---------------------------------
if (bagsLeft === 0) {
  document.getElementById("stock").textContent = "Sold out.";
  document.getElementById("stock").style.color = "red";
  document.getElementById("bag").style.opacity = "0.3";
} else if (bagsLeft < 5) {
  document.getElementById("stock").textContent = `Only ${bagsLeft} left!`;
  document.getElementById("stock").style.color = "orange";
} else {
  document.getElementById("stock").textContent = "In stock.";
}

// ------------------------------- Reward Levels -------------------------------
function showRewards() {
  let points = Number(document.getElementById("points").value);

  if (points >= 500) {
    document.getElementById("badge").textContent = "🥇";
    document.getElementById("rewards").style.borderColor = "gold";
  } else if (points >= 200) {
    document.getElementById("badge").textContent = "🥈";
    document.getElementById("rewards").style.borderColor = "silver";
  } else {
    document.getElementById("badge").textContent = "🥉";
    document.getElementById("rewards").style.borderColor = "tan";
  }

  if (hour < 9 || points >= 500) {
    document.getElementById("pastry").hidden = false;
  } else {
    document.getElementById("pastry").hidden = true;
  }
}

showRewards();

// --------------------------------- Greeting ---------------------------------
function showGreeting() {
  if (hour < 12) {
    document.getElementById("greeting").textContent = "Good morning! ☀️";
  } else if (hour < 18) {
    document.getElementById("greeting").textContent = "Good afternoon! 🌤️";
  } else {
    document.getElementById("greeting").textContent = "Good evening! 🌙";
  }
}

showGreeting();

// -------------------------------- Happy Hour ---------------------------------
if (hour >= 14 && hour < 16) {
  document.getElementById("latte-price").style.textDecoration = "line-through";
  document.getElementById("latte-price").style.color = "red";
  document.getElementById("happy-price").hidden = false;
}

// ------------------------------- Latte Order --------------------------------
let ordered = false;

function toggleOrder() {
  ordered = !ordered;
  document.getElementById("latte").textContent = ordered ? "Cancel" : "Order";
}

// -------------------------------- Buy a Bag ---------------------------------
function buyBag() {
  bagsLeft = bagsLeft - 1;

  let isSoldOut = bagsLeft === 0;
  let message = isSoldOut ? "Sold out." : `Only ${bagsLeft} left!`;

  document.getElementById("stock").textContent = message;
  document.getElementById("stock").style.color = isSoldOut ? "red" : "orange";
  document.getElementById("bag").style.opacity = isSoldOut ? "0.3" : "1";
  document.getElementById("buy").disabled = isSoldOut;
}
