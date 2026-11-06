const plate = document.getElementById("plate");

// puts the Plate and Tagline boxes on the plate. An empty Plate box shows CS213 in gray.
function showPlate() {
  const text = plate.value;
  const plateText = document.getElementById("plate-text");

  if (text === "") {
    plateText.textContent = "CS213";
    plateText.classList.add("empty");
  } else {
    plateText.textContent = text;
    plateText.classList.remove("empty");
  }

  document.getElementById("plate-tagline").textContent = document.getElementById("tagline").value;
}

showPlate();

// -------------------------------- Live Plate ---------------------------------
// typing in Plate or Tagline puts it on the plate, in capitals

// --------------------------------- Checklist ---------------------------------
function showChecklist() {
  // ------------------------------- Plate Rules -------------------------------
  // the length row and the letters-and-numbers row, from the Plate box
  // ------------------------------ ZIP and Email ------------------------------
  // the ZIP row and the email row
}

showChecklist();

// -------------------------------- Blank Name ---------------------------------
// a name of only spaces fails, with its own message

// ------------------------------- Confirm Email -------------------------------
// Email again fails unless it matches Email

// ------------------------------ Error Messages -------------------------------
// leaving a box shows its message under it, or clears it

// -------------------------------- Place Order --------------------------------
// Order stamps the plate, without reloading the page

// ------------------------------- Digits Only --------------------------------
