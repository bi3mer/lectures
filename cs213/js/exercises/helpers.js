// Page helpers.
//
// These functions change the page for us, so our code can focus on the math.
// To use them in our own page, load this file before our script:
//
//   <img id="cup" src="cup.png" alt="A coffee cup" />
//   <script src="https://bi3mer.github.io/lectures/cs213/js/exercises/helpers.js"></script>
//   <script>
//     setWidth("cup", 300);
//   </script>
//
// Later in the course, we'll write what's inside these functions ourselves.

// Everything the helpers need for themselves lives in Helpers, so it can't clash with the
// names in our code. The exercise runner also reads what happened from here.
window.Helpers = window.Helpers || {};
Helpers.lines = [];
Helpers.problems = [];

// Adds a line to the bottom of the page, like console.log does in the console.
function show(value) {
  console.log(value);
  Helpers.lines.push(String(value));

  let line = document.createElement("div");
  line.textContent = String(value);
  Helpers.box("helpers-output", "#f5f5f5", "#222").appendChild(line);
}

// Makes the element with this id `px` pixels wide.
function setWidth(id, px) {
  let element = Helpers.find("setWidth", id);
  if (element) {
    Helpers.checkSize("setWidth", px);
    element.style.width = px + "px";
  }
}

// Makes the element with this id `px` pixels tall.
function setHeight(id, px) {
  let element = Helpers.find("setHeight", id);
  if (element) {
    Helpers.checkSize("setHeight", px);
    element.style.height = px + "px";
  }
}

// Replaces the text inside the element with this id.
function setText(id, text) {
  let element = Helpers.find("setText", id);
  if (element) {
    element.textContent = text;
  }
}

// Shows a problem on the page, so we don't need the console open to see it.
Helpers.problem = function (message) {
  console.warn(message);
  Helpers.problems.push(message);

  let line = document.createElement("div");
  line.textContent = message;
  Helpers.box("helpers-problems", "#fdecea", "#7f1d1d").appendChild(line);
};

// Gives back the box with this id at the bottom of the page, making it the first time.
// Problems go above the output, so they're the first thing we see.
Helpers.box = function (id, background, color) {
  let box = document.getElementById(id);
  if (!box) {
    box = document.createElement("div");
    box.id = id;
    box.style.cssText =
      "margin-top: 16px; padding: 8px 12px; border-radius: 6px; white-space: pre-wrap;" +
      `font: 16px/1.5 ui-monospace, Menlo, Consolas, monospace; background: ${background}; color: ${color};`;
    let parent = document.body || document.documentElement;
    let output = document.getElementById("helpers-output");
    if (id === "helpers-problems" && output) {
      parent.insertBefore(box, output);
    } else {
      parent.appendChild(box);
    }
  }
  return box;
};

Helpers.find = function (helper, id) {
  if (typeof id !== "string") {
    Helpers.problem(`${helper} needs an id in quotes first, like ${helper}("cup", ...).`);
    return null;
  }
  let element = document.getElementById(id);
  if (!element) {
    Helpers.problem(`${helper}("${id}", ...): there's no element with id="${id}" on the page.`);
  }
  return element;
};

Helpers.checkSize = function (helper, px) {
  if (typeof px === "string") {
    Helpers.problem(
      `${helper} got the string "${px}", not a number. ` +
        "prompt gives back a string, and Number() turns a string into a number.",
    );
  } else if (px === undefined) {
    Helpers.problem(
      `${helper} got undefined. Did a variable never get a value, or a function forget to return?`,
    );
  } else if (Number.isNaN(px)) {
    Helpers.problem(`${helper} got NaN ("Not a Number"). Check the math, and any Number() calls.`);
  } else if (px < 0) {
    Helpers.problem(`${helper} got ${px}. A size can't be negative, so the page ignored it.`);
  }
};

// Errors show on the page, too. The exercise runner sets lineOffset, so the line numbers
// match the editor instead of the page the runner builds around our code.
window.addEventListener("error", function (event) {
  let line = event.lineno - (Helpers.lineOffset || 0);
  Helpers.problem(`Line ${line}: ${event.message}`);
});
