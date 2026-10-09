// The exercises, in the order the lecture uses them. The runner opens one from the URL,
// like index.html#shrink.
//
// Each exercise has:
//   id            the part of the URL after #
//   topic, title  shown above the instructions
//   instructions  HTML
//   stage         HTML for the page on the right, which the student's code changes
//   starter       the code the editor starts with
//   checks        what the runner grades, in order
//
// Each check has a label and a test(run). The test returns true when the check passes, or a
// sentence that tells the student what went wrong. A check can also have:
//   inputs   what prompt() answers, in order (the runner answers instead of the student)
//   probes   expressions to work out after the student's code, read with run.probe()
//
// run has: code, lines (what show() printed), prompts (what prompt() asked), problems,
// width(id), height(id), text(id), and probe(expression), which gives { value } or { error }.

// How a value looks in a message: strings in quotes, everything else as is.
function describe(value) {
  return typeof value === "string" ? `"${value}"` : String(value);
}

// A message for a size that came out wrong, with a hint for the mistakes we expect.
function sizeNote(name, side, actual, expected) {
  if (actual === null) {
    return `The ${name} has no ${side}. Did you call ${side === "width" ? "setWidth" : "setHeight"}?`;
  }
  return `The ${name} is ${actual}px ${side === "width" ? "wide" : "tall"}, not ${expected}px.`;
}

// true when the element is this wide and this tall, or a message about the first side that isn't.
function sizesNote(run, id, name, width, height) {
  if (run.width(id) !== width) {
    return sizeNote(name, "width", run.width(id), width);
  }
  if (run.height(id) !== height) {
    return sizeNote(name, "height", run.height(id), height);
  }
  return true;
}

const EXERCISES = [
  {
    id: "shrink",
    topic: "Variables",
    title: "Shrinking the Cup",
    instructions: `
      <p>The cup on the right is 300px wide. Let's make it 100px narrower.</p>
      <ol>
        <li>Make a variable <code>width</code> that holds <code>300</code>.</li>
        <li>Store <code>width</code> minus 100 in <code>newWidth</code>.</li>
        <li>Call <code>setWidth("cup", newWidth)</code>, then <code>show(newWidth)</code>.</li>
      </ol>`,
    stage: `<img id="cup" src="cup.png" alt="A coffee cup" width="300" />`,
    starter: "// your code goes here\n",
    checks: [
      {
        label: "Makes a variable named width",
        test: (run) => /\b(let|const)\s+width\b/.test(run.code) || "Start with let width = 300;",
      },
      {
        label: "Works out newWidth from width",
        test: (run) =>
          /\bnewWidth\s*=\s*width\s*-\s*100\b/.test(run.code) ||
          "newWidth should be width - 100, so it still works if width changes.",
      },
      {
        label: "The cup is 200px wide",
        test: (run) => run.width("cup") === 200 || sizeNote("cup", "width", run.width("cup"), 200),
      },
      {
        label: "Shows 200 on the page",
        test: (run) =>
          run.lines.includes("200") ||
          (run.lines.length ? `The page shows ${run.lines.join(", ")}.` : "Nothing was shown."),
      },
    ],
  },

  {
    id: "wider",
    topic: "Operators",
    title: "A Wider Cup",
    instructions: `
      <p>The cup starts 200px wide. Let's ask the user how many pixels wider to make it.</p>
      <ol>
        <li>Ask <code>prompt("How many pixels wider?")</code>, and store the answer in <code>extra</code>.</li>
        <li>Store 200 plus <code>extra</code> in <code>newWidth</code>.</li>
        <li>Call <code>setWidth("cup", newWidth)</code>.</li>
      </ol>
      <p>Run it, and type 50. Is the cup 250px wide?</p>`,
    stage: `<img id="cup" src="cup.png" alt="A coffee cup" width="200" />`,
    starter: "// your code goes here\n",
    checks: [
      {
        label: "Asks the user once",
        inputs: ["50"],
        test: (run) =>
          run.prompts.length === 1 || `prompt() was called ${run.prompts.length} times.`,
      },
      {
        label: "Typing 50 makes the cup 250px wide",
        inputs: ["50"],
        test: (run) => {
          let width = run.width("cup");
          if (width === 20050) {
            return (
              'The cup is 20050px wide. prompt gave back the string "50", so + glued ' +
              '200 and "50" together into "20050". What turns a string into a number?'
            );
          }
          return width === 250 || sizeNote("cup", "width", width, 250);
        },
      },
      {
        label: "Typing 120 makes the cup 320px wide",
        inputs: ["120"],
        test: (run) => run.width("cup") === 320 || sizeNote("cup", "width", run.width("cup"), 320),
      },
    ],
  },

  {
    id: "proportions",
    topic: "Functions",
    title: "Keep the Proportions",
    instructions: `
      <p>The bag of coffee is 200px wide and 300px tall. If we change only one of those, it
      squashes. Let's keep its shape.</p>
      <ol>
        <li>Write <code>function heightFor(width)</code>. It returns the height that keeps the
        bag's shape: width × 300 / 200.</li>
        <li>Ask the user for a new width, and turn it into a number.</li>
        <li>Set the bag's width and height with <code>setWidth("bag", ...)</code> and
        <code>setHeight("bag", ...)</code>.</li>
      </ol>`,
    stage: `<img id="bag" src="bag.svg" alt="A bag of coffee" width="200" height="300" />`,
    starter: "// your code goes here\n",
    checks: [
      {
        label: "Writes heightFor with function",
        test: (run) =>
          /\bfunction\s+heightFor\s*\(/.test(run.code) ||
          "Use the function heightFor(width) { ... } format, not an arrow function.",
      },
      {
        label: "heightFor(100) returns 150",
        probes: ["heightFor(100)"],
        test: (run) => {
          let result = run.probe("heightFor(100)");
          if (result.error) {
            return `heightFor(100) failed: ${result.error}`;
          }
          if (result.value === undefined) {
            return "heightFor(100) gave back undefined. Did it return the height, or only show it?";
          }
          return result.value === 150 || `heightFor(100) gave back ${describe(result.value)}.`;
        },
      },
      {
        label: "Typing 100 makes the bag 100px wide and 150px tall",
        inputs: ["100"],
        test: (run) => sizesNote(run, "bag", "bag", 100, 150),
      },
      {
        label: "Typing 400 makes the bag 400px wide and 600px tall",
        inputs: ["400"],
        test: (run) => sizesNote(run, "bag", "bag", 400, 600),
      },
    ],
  },
];
