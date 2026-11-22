const form = document.getElementById("signup");
const username = document.getElementById("username");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const hint = document.getElementById("password-hint");

const allowed = "abcdefghijklmnopqrstuvwxyz0123456789";
username.addEventListener("input", () => {
  let valid = true;
  for (const char of username.value.toLowerCase()) {
    if (!allowed.includes(char)) {
      valid = false;
      break;
    }
  }
  if (!valid) {
    username.setCustomValidity("Use only letters and numbers");
  } else {
    username.setCustomValidity("");
  }
});

password1.addEventListener("input", () => {
  if (password1.validity.tooShort) {
    hint.textContent = "Use at least 8 characters";
  } else {
    hint.textContent = "";
  }
});

password2.addEventListener("input", () => {
  if (password2.value !== password1.value) {
    password2.setCustomValidity("Passwords don't match");
  } else {
    password2.setCustomValidity("");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Submitted");
});
