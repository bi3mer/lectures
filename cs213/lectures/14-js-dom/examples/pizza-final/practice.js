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
  for (let box of document.getElementsByName("size")) {
    if (box.checked) {
      const width = sizes[box.value].width;
      document.getElementById("pizza").style.width = `${width}px`;
    }
  }

  showOrder();
}

// ----------------------------------- Sauce -----------------------------------
function showSauce() {
  const sauce = document.querySelector('input[name="sauce"]:checked').value;
  document.getElementById("pizza").style.backgroundColor = sauces[sauce];
}

// ----------------------------------- Crust -----------------------------------
function showCrust() {
  const crust = document.getElementById("crust").value;
  document.getElementById("pizza").classList.remove("thin", "regular", "deep");
  document.getElementById("pizza").classList.add(crust);
}

// ------------------------------- Extra Cheese --------------------------------
function showCheese() {
  if (document.getElementById("extra-cheese").checked) {
    document.getElementById("pizza").classList.add("extra-cheese");
  } else {
    document.getElementById("pizza").classList.remove("extra-cheese");
  }

  showOrder();
}

// ------------------------------- Add a Topping -------------------------------
function addPiece(name) {
  const piece = document.createElement("span");
  piece.classList.add("piece", name);
  piece.textContent = toppings[name].emoji;
  piece.style.left = `${Math.random() * 60 + 20}%`;
  piece.style.top = `${Math.random() * 60 + 20}%`;
  document.getElementById("toppings").append(piece);
}

// ------------------------------ Tick a Topping -------------------------------
function showTopping(name) {
  if (document.getElementById(name).checked) {
    for (let i = 0; i < 6; i++) {
      addPiece(name);
    }
  } else {
    for (let piece of document.querySelectorAll(`.${name}`)) {
      piece.remove();
    }
  }

  showOrder();
}

// ----------------------------------- Order -----------------------------------
function addLine(label, price) {
  const line = document.createElement("li");
  line.textContent = `${label}: ${dollars(price)}`;
  document.getElementById("order").append(line);
}

function showOrder() {
  // ------------------------------- Order List --------------------------------
  document.getElementById("order").replaceChildren();

  const size = document.querySelector('input[name="size"]:checked').value;
  addLine(sizes[size].label, sizes[size].price);

  const boxes = document.querySelectorAll('input[name="topping"]:checked');
  for (let box of boxes) {
    addLine(toppings[box.value].label, toppingPrice);
  }

  // ------------------------------- Order Total -------------------------------
  let total = sizes[size].price + boxes.length * toppingPrice;

  if (document.getElementById("extra-cheese").checked) {
    addLine("Extra cheese", cheesePrice);
    total += cheesePrice;
  }

  document.getElementById("total").textContent = dollars(total);
}

showOrder();

// -------------------------------- Place Order --------------------------------
function placeOrder() {
  const receipt = document.createElement("section");
  const heading = document.createElement("h2");
  const message = document.createElement("p");

  receipt.classList.add("card");
  heading.textContent = "Order Placed";
  message.textContent = "Your pizza will be ready in 20 minutes.";
  receipt.append(heading, message);

  document.getElementById("build").replaceWith(receipt);
}

// --------------------------------- Parsons 1 ---------------------------------
function parsons1() {
  const fieldset = document.getElementById("topping-boxes");
  const boxes = fieldset.getElementsByTagName("input");

  for (let box of boxes) {
    box.checked = false;
  }

  document.getElementById("toppings").replaceChildren();
  showOrder();
}
