// The exercise runner: the student's code on the left, their page and its checks on the
// right. The exercises live in exercises.js, and the URL picks one, like index.html#shrink.
//
// Run builds a fresh page in an <iframe> from the exercise's stage, harness.js, helpers.js,
// and the student's code, so nothing from the last run carries over. The visible run opens
// real prompt() boxes. Then the checks run the same code again in hidden frames, where
// harness.js answers the prompts, and grade what each page reports back.

const STORAGE_PREFIX = "web-dev-exercise-";
const HIDDEN_RUN_TIMEOUT = 3000;

let current = null;
let editor = null;
let activeRun = null;
let runCount = 0;

function byId(id) {
  return document.getElementById(id);
}

// CodeMirror comes from a CDN. If it didn't load, the plain <textarea> still works.
function makeEditor(textarea) {
  if (window.CodeMirror) {
    let cm = CodeMirror.fromTextArea(textarea, {
      mode: "javascript",
      theme: "webdev",
      lineNumbers: true,
      indentUnit: 2,
      tabSize: 2,
      extraKeys: {
        "Ctrl-Enter": run,
        "Cmd-Enter": run,
        Tab: (cm) =>
          cm.somethingSelected() ? cm.indentSelection("add") : cm.replaceSelection("  ", "end"),
        "Shift-Tab": (cm) => cm.indentSelection("subtract"),
      },
    });
    // CodeMirror measures its gutter when it's made. The editor starts hidden, so show()
    // has it measure again once it's on screen.
    return {
      get: () => cm.getValue(),
      set: (text) => cm.setValue(text),
      onChange: (handler) => cm.on("change", handler),
      show: () => cm.refresh(),
    };
  }

  textarea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      run();
    } else if (event.key === "Tab") {
      event.preventDefault();
      textarea.setRangeText("  ", textarea.selectionStart, textarea.selectionEnd, "end");
    }
  });
  return {
    get: () => textarea.value,
    set: (text) => {
      textarea.value = text;
    },
    onChange: (handler) => textarea.addEventListener("input", handler),
    show: () => {},
  };
}

// The browser keeps each exercise's code, so a reload doesn't lose work. Storage can be
// off (a private window, blocked site data), so the page works without it.
function loadCode(exercise) {
  try {
    return localStorage.getItem(STORAGE_PREFIX + exercise.id) ?? exercise.starter;
  } catch {
    return exercise.starter;
  }
}

function saveCode() {
  try {
    localStorage.setItem(STORAGE_PREFIX + current.id, editor.get());
  } catch {
    // Nothing to do: the code is still in the editor.
  }
}

// JSON that's safe inside a <script>: no "<", so no "</script>".
function scriptJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

// The page the frame shows. The student's code starts on the line after `before`, so
// lineOffset lets error messages use the editor's line numbers.
function frameDocument(stage, code, config) {
  let base = new URL(".", location.href).href;
  let head = [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '<meta charset="utf-8" />',
    `<base href="${base}" />`,
    "<style>body { font-family: system-ui, sans-serif; margin: 16px; color: #222; }</style>",
    "</head>",
    "<body>",
    stage,
  ].join("\n");
  let scripts = (lineOffset) =>
    [
      `<script>window.Helpers = ${scriptJson({ ...config, lineOffset })};</script>`,
      '<script src="harness.js"></script>',
      '<script src="helpers.js"></script>',
      "<script>",
    ].join("\n");

  let lineOffset = (head + "\n" + scripts(0)).split("\n").length;
  let safeCode = code.replace(/<\/script/gi, "<\\/script");
  return [
    head,
    scripts(lineOffset),
    safeCode,
    "</script>",
    "<script>Helpers.report();</script>",
    "</body>",
    "</html>",
  ].join("\n");
}

// Runs the code in a frame and resolves with what harness.js reports.
// inputs: null opens real prompt() boxes, and a list answers them instead.
function runInFrame(frame, exercise, code, inputs, probes) {
  runCount += 1;
  let runId = runCount;
  return new Promise((resolve) => {
    function listen(event) {
      if (event.data && event.data.runId === runId) {
        window.removeEventListener("message", listen);
        resolve(event.data);
      }
    }
    window.addEventListener("message", listen);
    frame.srcdoc = frameDocument(exercise.stage, code, { runId, inputs, probes });
  });
}

function runHidden(exercise, code, inputs, probes) {
  let frame = document.createElement("iframe");
  byId("hidden-frames").appendChild(frame);
  let timeout = new Promise((resolve) =>
    setTimeout(() => resolve({ timedOut: true }), HIDDEN_RUN_TIMEOUT),
  );
  return Promise.race([runInFrame(frame, exercise, code, inputs, probes), timeout]).then((report) => {
    frame.remove();
    return report;
  });
}

// What a check's test() gets to look at.
function makeRun(report, code) {
  function size(id, side) {
    let element = report.elements[id];
    let value = element ? parseFloat(element[side]) : NaN;
    return Number.isNaN(value) ? null : value;
  }
  return {
    code,
    lines: report.lines,
    prompts: report.prompts,
    problems: report.problems,
    width: (id) => size(id, "width"),
    height: (id) => size(id, "height"),
    text: (id) => (report.elements[id] ? report.elements[id].text : null),
    probe: (expression) => report.probes[expression] || { error: "not worked out" },
  };
}

function grade(check, run) {
  let outcome;
  try {
    outcome = check.test(run);
  } catch (error) {
    outcome = `The check itself failed: ${error.message}`;
  }
  return {
    label: check.label,
    pass: outcome === true,
    note: typeof outcome === "string" ? outcome : "",
  };
}

// Checks with the same inputs share one hidden run.
function groupChecks(checks) {
  let groups = new Map();
  checks.forEach((check) => {
    let inputs = check.inputs || [];
    let key = JSON.stringify(inputs);
    if (!groups.has(key)) {
      groups.set(key, { inputs, probes: [], checks: [] });
    }
    let group = groups.get(key);
    group.checks.push(check);
    (check.probes || []).forEach((probe) => {
      if (!group.probes.includes(probe)) {
        group.probes.push(probe);
      }
    });
  });
  return [...groups.values()];
}

async function run() {
  if (activeRun || !current) {
    return;
  }
  // Switching exercises clears activeRun, so a run that's still going stops at its next await.
  let thisRun = {};
  activeRun = thisRun;
  let exercise = current;
  let code = editor.get();
  saveCode();
  byId("run").disabled = true;
  byId("summary").textContent = "Running…";
  byId("checks").replaceChildren();

  await runInFrame(byId("stage"), exercise, code, null, []);
  if (activeRun !== thisRun) {
    return;
  }

  let results = [];
  let errors = [];
  for (let group of groupChecks(exercise.checks)) {
    let report = await runHidden(exercise, code, group.inputs, group.probes);
    if (activeRun !== thisRun) {
      return;
    }

    let note = "The code didn't finish running.";
    if (report.timedOut) {
      if (!errors.includes(note)) {
        errors.push(note);
      }
      group.checks.forEach((check) =>
        results.push({ check, result: { label: check.label, pass: false, note } }),
      );
      continue;
    }

    report.errors.forEach((error) => {
      let message = `Line ${error.line}: ${error.message}`;
      if (!errors.includes(message)) {
        errors.push(message);
      }
    });
    let checkRun = makeRun(report, code);
    group.checks.forEach((check) => results.push({ check, result: grade(check, checkRun) }));
  }

  // Back in the exercise's order, with "runs without errors" first.
  results.sort((a, b) => exercise.checks.indexOf(a.check) - exercise.checks.indexOf(b.check));
  showResults([
    { label: "Runs without errors", pass: errors.length === 0, note: errors.join("\n") },
    ...results.map((entry) => entry.result),
  ]);
  byId("run").disabled = false;
  activeRun = null;
}

function showResults(results) {
  let list = byId("checks");
  list.replaceChildren();
  results.forEach((result) => {
    let item = document.createElement("li");
    item.className = result.pass ? "pass" : "fail";

    let icon = document.createElement("span");
    icon.className = "icon";
    icon.textContent = result.pass ? "✓" : "✗";
    icon.setAttribute("aria-label", result.pass ? "Passed" : "Failed");

    let label = document.createElement("span");
    label.textContent = result.label;
    item.append(icon, label);

    if (!result.pass && result.note) {
      let note = document.createElement("p");
      note.className = "note";
      note.textContent = result.note;
      item.appendChild(note);
    }
    list.appendChild(item);
  });

  let passed = results.filter((result) => result.pass).length;
  byId("summary").textContent =
    passed === results.length
      ? `All ${results.length} checks passed.`
      : `${passed} of ${results.length} checks passed.`;
}

// The stage on its own, before the student runs anything.
function showStage() {
  byId("stage").srcdoc = [
    "<!doctype html>",
    `<html lang="en"><head><meta charset="utf-8" /><base href="${new URL(".", location.href).href}" />`,
    "<style>body { font-family: system-ui, sans-serif; margin: 16px; }</style></head>",
    `<body>${current.stage}</body></html>`,
  ].join("\n");
}

function showHome() {
  current = null;
  activeRun = null;
  document.title = "JavaScript Exercises";
  byId("workspace").hidden = true;
  byId("home").hidden = false;

  let list = byId("exercise-list");
  list.replaceChildren();
  EXERCISES.forEach((exercise) => {
    let item = document.createElement("li");
    let link = document.createElement("a");
    link.href = `#${exercise.id}`;
    link.textContent = exercise.title;
    let topic = document.createElement("span");
    topic.className = "topic";
    topic.textContent = ` ${exercise.topic}`;
    item.append(link, topic);
    list.appendChild(item);
  });
}

function showExercise(exercise) {
  current = exercise;
  activeRun = null;
  byId("run").disabled = false;
  document.title = `${exercise.title} · JavaScript Exercises`;
  byId("home").hidden = true;
  byId("workspace").hidden = false;

  byId("topic").textContent = exercise.topic;
  byId("title").textContent = exercise.title;
  byId("instructions").innerHTML = exercise.instructions;
  editor.set(loadCode(exercise));
  editor.show();
  byId("summary").textContent = "Press Run to check the code.";
  byId("checks").replaceChildren();
  showStage();

  let index = EXERCISES.indexOf(exercise);
  let previous = EXERCISES[index - 1];
  let next = EXERCISES[index + 1];
  byId("previous").hidden = !previous;
  byId("next").hidden = !next;
  if (previous) {
    byId("previous").href = `#${previous.id}`;
  }
  if (next) {
    byId("next").href = `#${next.id}`;
  }
  window.scrollTo(0, 0);
}

function route() {
  let id = location.hash.slice(1);
  let exercise = EXERCISES.find((candidate) => candidate.id === id);
  if (exercise) {
    showExercise(exercise);
  } else {
    showHome();
  }
}

editor = makeEditor(byId("code"));
editor.onChange(() => {
  if (current) {
    saveCode();
  }
});
byId("run").addEventListener("click", run);
byId("reset").addEventListener("click", () => {
  if (confirm("Start over? This replaces your code with the starter code.")) {
    editor.set(current.starter);
  }
});
byId("shortcut").textContent = /Mac|iPhone|iPad/.test(navigator.platform)
  ? "Cmd + Enter also runs"
  : "Ctrl + Enter also runs";
window.addEventListener("hashchange", route);
route();
