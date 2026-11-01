// each size's price, and how wide the page draws it, in pixels
const sizes = {
  small: { label: "Small, 10 inch", price: 12, width: 240 },
  medium: { label: "Medium, 12 inch", price: 14, width: 288 },
  large: { label: "Large, 14 inch", price: 16, width: 336 },
};

// each sauce's color on the pizza
const sauces = {
  tomato: "#c8371d",
  white: "#f2e6c9",
  pesto: "#5f8f3a",
  bbq: "#6b2a14",
};

const toppings = {
  mushroom: { label: "Mushrooms", emoji: "🍄" },
  onion: { label: "Onions", emoji: "🧅" },
  jalapeno: { label: "Jalapeños", emoji: "🌶️" },
  pineapple: { label: "Pineapple", emoji: "🍍" },
  bacon: { label: "Bacon", emoji: "🥓" },
  basil: { label: "Basil", emoji: "🌿" },
};

const toppingPrice = 1.5; // each topping
const cheesePrice = 2; // extra cheese

// turns a number into dollars and cents: 1234.5 becomes $1,234.50
function dollars(amount) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// ----------------------------------- Size ------------------------------------
function showSize() {
  // the picked size's width on the pizza, like 288px
  showOrder();
}

// ----------------------------------- Sauce -----------------------------------
function showSauce() {
  // the picked sauce's color as the pizza's background
}

// ----------------------------------- Crust -----------------------------------
function showCrust() {
  // the picked crust's class on the pizza, in place of the last one
}

// ------------------------------- Extra Cheese --------------------------------
function showCheese() {
  // the extra-cheese class on the pizza while Extra cheese is ticked
  showOrder();
}

// ------------------------------- Add a Topping -------------------------------
function addPiece(name) {
  // one piece of a topping, like 🍄, at a random spot on the pizza
}

// ------------------------------ Tick a Topping -------------------------------
function showTopping(name) {
  // 6 pieces when the topping is ticked, and none when it isn't
  showOrder();
}

// ----------------------------------- Order -----------------------------------
function addLine(label, price) {
  // a line like Medium, 12 inch: $14.00 at the end of the order list
}

function showOrder() {
  // ------------------------------- Order List --------------------------------
  // a fresh order list: a line for the size, and one for each ticked topping
  // ------------------------------- Order Total -------------------------------
  // a line for extra cheese when it's ticked, and the total of every line
}

showOrder();

// -------------------------------- Place Order --------------------------------
function placeOrder() {
  // a receipt card in place of the Build form
}

// --------------------------------- Parsons 1 ---------------------------------
