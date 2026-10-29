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
document.getElementById("party-size").textContent = `Party (${party.childNodes.length} members)`;

// -------------------------------- Guild Card ---------------------------------
function showCard() {
  // ---------------------------- Name on the Card -----------------------------
  // the name, without spaces at either end, or Nameless when it's empty

  // ---------------------------- Class on the Card ----------------------------
  // the class's icon and title, like 🔮 Mage

  // --------------------------- Finishing the Card ----------------------------
  // the banner color, the motto in quotes, and the hardcore line
}

showCard();

// ----------------------------------- Stats -----------------------------------
function showStats() {
  // a bar of █ for each stat, and how many of budget's points are left

  // ------------------------------- Over Budget -------------------------------
  // red points left, and no joining, when the stats cost more than budget
}

showStats();

// ------------------------------ Join the Guild -------------------------------
function joinGuild() {
  // a welcome like Welcome, Ada Nullbane the Mage!, or a reminder to pick a name
}

// --------------------------------- Parsons 1 ---------------------------------
