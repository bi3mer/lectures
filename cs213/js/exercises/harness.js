// Runs inside the exercise runner's frame, before helpers.js and the student's code.
// runner.js sets window.Helpers to { runId, inputs, probes, lineOffset } first.
//
// When `inputs` is a list, prompt() answers from it instead of opening a box, the way an
// autograder types answers in. After the student's code, report() sends the page's state
// back to the runner, which grades it.
(function () {
  let config = window.Helpers;
  let prompts = [];
  let errors = [];

  if (config.inputs) {
    let answers = config.inputs.slice();
    window.prompt = function (message) {
      prompts.push(String(message));
      return answers.length ? answers.shift() : null;
    };
  } else {
    let realPrompt = window.prompt;
    window.prompt = function (message, value) {
      prompts.push(String(message));
      return realPrompt.call(window, message, value);
    };
  }

  window.addEventListener("error", function (event) {
    errors.push({ line: event.lineno - config.lineOffset, message: event.message });
  });

  // A size set by setWidth wins, then the width="..." attribute from the stage.
  function size(element, side) {
    if (element.style[side]) {
      return element.style[side];
    }
    return element.hasAttribute(side) ? element.getAttribute(side) + "px" : "";
  }

  // postMessage can't send functions, so anything that isn't a plain value goes as text.
  function plain(value) {
    if (typeof value === "function" || (typeof value === "object" && value !== null)) {
      return String(value);
    }
    return value;
  }

  config.report = function () {
    let elements = {};
    document.querySelectorAll("[id]").forEach(function (element) {
      if (!element.id.startsWith("helpers-")) {
        elements[element.id] = {
          width: size(element, "width"),
          height: size(element, "height"),
          text: element.textContent.trim(),
        };
      }
    });

    // Copy before the probes run, since a probe can call show() too.
    let lines = (config.lines || []).slice();
    let problems = (config.problems || []).slice();

    let probes = {};
    (config.probes || []).forEach(function (expression) {
      try {
        // Indirect eval runs in the page's global scope, where the student's functions and
        // top-level variables live.
        let value = (0, eval)(expression);
        probes[expression] = { value: plain(value), type: typeof value };
      } catch (error) {
        probes[expression] = { error: error.message };
      }
    });

    parent.postMessage(
      { runId: config.runId, lines, problems, errors, prompts, elements, probes },
      "*",
    );
  };
})();
