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
function typePlate(event) {
  event.target.value = event.target.value.toUpperCase();
  showPlate();
}

plate.addEventListener("input", typePlate);
document.getElementById("tagline").addEventListener("input", typePlate);

// --------------------------------- Checklist ---------------------------------
function showChecklist() {
  // ------------------------------- Plate Rules -------------------------------
  const text = plate.value;
  const goodLength = text.length >= 2 && text.length <= 7;
  const goodChars = /^[A-Z0-9]+$/.test(text);

  document.getElementById("rule-length").classList.toggle("met", goodLength);
  document.getElementById("rule-chars").classList.toggle("met", goodChars);

  // ------------------------------ ZIP and Email ------------------------------
  const email = document.getElementById("email").value;
  const goodZip = document.getElementById("zip").validity.valid;
  const goodEmail = /^[^ @]+@[^ @]+\.[^ @]+$/.test(email);

  document.getElementById("rule-zip").classList.toggle("met", goodZip);
  document.getElementById("rule-email").classList.toggle("met", goodEmail);
}

showChecklist();
plate.addEventListener("input", showChecklist);
document.getElementById("zip").addEventListener("input", showChecklist);
document.getElementById("email").addEventListener("input", showChecklist);

// -------------------------------- Blank Name ---------------------------------
document.getElementById("name").addEventListener("input", (event) => {
  if (event.target.value.trim() === "") {
    event.target.setCustomValidity("Enter your name");
  } else {
    event.target.setCustomValidity("");
  }
});

// ------------------------------- Confirm Email -------------------------------
function checkEmails() {
  const email = document.getElementById("email").value;
  const again = document.getElementById("email-again");

  if (again.value !== email) {
    again.setCustomValidity("Emails don't match");
  } else {
    again.setCustomValidity("");
  }
}

document.getElementById("email").addEventListener("input", checkEmails);
document.getElementById("email-again").addEventListener("input", checkEmails);

// ------------------------------ Error Messages -------------------------------
for (const box of document.querySelectorAll("#order-form input")) {
  box.addEventListener("blur", (event) => {
    const error = document.getElementById(`${event.target.id}-error`);
    error.textContent = event.target.validationMessage;
  });
}

// -------------------------------- Place Order --------------------------------
document.getElementById("order-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const zip = document.getElementById("zip").value;
  const text = `Ordered ${plate.value}, shipping to ${zip}`;

  document.getElementById("plate-preview").classList.add("ordered");
  document.getElementById("message").textContent = text;
});

// --------------------------------- Parsons 1 ---------------------------------
function parsons1() {
  if (/^[0-9]+$/.test(plate.value)) {
    plate.setCustomValidity("Add at least one letter");
  } else {
    plate.setCustomValidity("");
  }
}

plate.addEventListener("input", parsons1);
