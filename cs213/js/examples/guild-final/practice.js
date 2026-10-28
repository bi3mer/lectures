const budget = 15; // stat points each hero can spend

const roles = {
  warrior: { icon: "⚔️", title: "Warrior" },
  ranger: { icon: "🏹", title: "Ranger" },
  mage: { icon: "🔮", title: "Mage" },
};

const firstNames = ["Ada", "Grace", "Linus", "Alan", "Hedy", "Margaret"];
const lastNames = ["Nullbane", "Loopfoot", "Stackwell", "Bytesworth", "Bracewhisper"];

// -------------------------------- Party Size ---------------------------------
const party = document.getElementById("party");
let count = 0;

for (const node of party.childNodes) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    count++;
  }
}

document.getElementById("party-size").textContent = `Party (${count} members)`;

// -------------------------------- Guild Card ---------------------------------
function showCard() {
  // ---------------------------- Name on the Card -----------------------------
  const name = document.getElementById("name").value.trim();

  if (name === "") {
    document.getElementById("card-name").textContent = "Nameless";
  } else {
    document.getElementById("card-name").textContent = name;
  }

  // ---------------------------- Class on the Card ----------------------------
  const role = roles[document.getElementById("role").value];
  document.getElementById("card-role").textContent = `${role.icon} ${role.title}`;

  // --------------------------- Finishing the Card ----------------------------
  const color = document.getElementById("color").value;
  const motto = document.getElementById("motto").value.trim();
  const hardcore = document.getElementById("hardcore").checked;

  document.getElementById("card").style.borderColor = color;

  if (motto === "") {
    document.getElementById("card-motto").textContent = "";
  } else {
    document.getElementById("card-motto").textContent = `"${motto}"`;
  }

  document.getElementById("card-hardcore").hidden = !hardcore;
}

showCard();

// ----------------------------------- Stats -----------------------------------
function showStats() {
  const str = Number(document.getElementById("str").value);
  const dex = Number(document.getElementById("dex").value);
  const wis = Number(document.getElementById("wis").value);
  const pointsLeft = budget - (str + dex + wis);

  document.getElementById("str-bar").textContent = "█".repeat(str);
  document.getElementById("dex-bar").textContent = "█".repeat(dex);
  document.getElementById("wis-bar").textContent = "█".repeat(wis);
  document.getElementById("points-left").textContent = `Points left: ${pointsLeft}`;

  // ------------------------------- Over Budget -------------------------------
  if (pointsLeft < 0) {
    document.getElementById("points-left").style.color = "tomato";
    document.getElementById("join").disabled = true;
  } else {
    document.getElementById("points-left").style.color = "";
    document.getElementById("join").disabled = false;
  }
}

showStats();

// ------------------------------ Join the Guild -------------------------------
function joinGuild() {
  const name = document.getElementById("name").value.trim();
  const role = roles[document.getElementById("role").value];

  if (name === "") {
    document.getElementById("message").textContent = "Every hero needs a name.";
  } else {
    document.getElementById("message").textContent = `Welcome, ${name} the ${role.title}!`;
  }
}

// --------------------------------- Parsons 1 ---------------------------------
function parsons1() {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];

  document.getElementById("name").value = `${first} ${last}`;
  showCard();
}
