# Page-Based JavaScript Exercises: Options

Feedback: console-only exercises feel out of place in an HTML course. The goal is for students' code to visibly change the page, like an image's width or a line of text, while students write only the math. Setup should happen once, so students aren't pasting new boilerplate on every exercise.

## Option 1: Hosted Helper Script Students Call

The starter page loads one script from the course site, `<script src="https://bi3mer.github.io/lectures/cs213/js/exercises/helpers.js">`, the same way the Bootstrap lecture loaded Bootstrap from a CDN. That script defines a few functions, such as `show(value)`, `setWidth(id, px)`, `setHeight(id, px)`, and `setText(id, text)`. Students call them the way they call `console.log` today, so `setWidth("cup", width * 2)` resizes the cup image with no DOM code in sight. Students download the starter (an image with `id="cup"`, an output box, and an empty `<script>`) once at "Let's Write a Program". After that, every exercise is "replace the code in your `<script>`". The helpers also print problems on the page, such as a misspelled id, a `NaN` from a missing `Number()`, or a redeclared `let`, so students don't need the console open to see why nothing happened. This works from the first exercise, since students call functions without writing them (as they already do with `console.log` and `prompt`). Later, the DOM lecture can open `helpers.js` and show that each helper is one line of `document.getElementById`. The cost is that the page needs the internet.

## Option 2: Same Helpers, Pasted Into the Starter

This option uses the same functions as option 1, but they sit in a "don't edit" `<script>` at the top of the starter file instead of a hosted file. It works offline, and there is nothing to publish. However, every student file carries about 40 lines of code students haven't learned yet, right above their own code. That's the clutter we're trying to avoid. And if a helper has a bug mid-semester, every student has to copy the starter again.

## Option 3: One `setStyle` Helper Tied to CSS

Instead of one helper per property, students get one: `setStyle("cup", "width", width + "px")`. They use the CSS property names and units they already know from the CSS lectures, so the JavaScript looks like it's writing CSS, which it is. The `+ "px"` puts the string-and-number section on screen: `let extra = prompt("How many pixels wider?")` followed by `200 + extra + "px"` makes the cup 20050px wide, which is hard to miss. The downside is more typing per call and more ways to get it wrong. A missing unit silently does nothing, so the helper would have to warn about it. This could also be a second step after option 1, partway between the helpers and the real DOM.

## Option 4: The Page Calls the Students' Functions

The starter already has all the wiring, such as a slider for the cup's width, and it calls a function students write, like `cupHeight(width)`, to size the image. Students write only the function body (pure math), and the page reacts live as the slider moves. This feels the most like a real web page. However, it works only once functions are taught, so the first half of the lecture (variables, strings, and operators) would still need option 1 or the console. A misspelled function name also fails without telling the student why, unless the page checks for it, and the wiring stays hidden magic.

## Option 5: Students Set Variables, and the Page Reads Them

A second hosted script loads after the student's `<script>`, looks for set variable names (`cupWidth`, `cupHeight`, `message`), and applies them to the page. Students write only lines like `let cupWidth = 400 * 0.5;`, which is as close to "just the math" as we can get, and it works before functions. But it depends on exact names. It also relies on a top-level `let` being visible to a later script, which is true but surprising, and it teaches a pattern students won't see in real code.

## Option 6: One Workbook Page With Every Exercise

One page has a section for each exercise, with its own image or output box and its own `<script type="module">`. Modules keep each exercise's variables separate, so `let result` in exercise 1 doesn't collide with `let result` in exercise 4. Students download the page once and fill in the blanks from top to bottom. Nothing gets deleted, so the finished page doubles as their notes. However, every `prompt` on the page would fire on load. Those exercises would need a "Run" button per section (wired up by the helpers) or fixed values instead of `prompt`, and modules are one more thing to wave away. This pairs with option 1's helpers.

## Option 7: An Exercise Runner Like the Autograder

One page on the course site puts the student's JavaScript in an editor on the left. On the right, it shows the stage (the cup image and output box), with a list of checks below it like the ones `graders/grade.js` prints. Each slide links straight to its exercise (for example, `js/exercises/#receipt`), which opens with the instructions and starter code already filled in. Students never download, paste, or delete anything, and the browser saves their code for each exercise. Run loads the code into a fresh `<iframe>` every time, so a `let result` from the last run can't collide. The iframe also gets option 1's helpers (`show`, `setWidth`, `setText`) and shows any error on the page with its line number. The checks then read the stage, for example "the cup is 250px wide" or "printed `You get 4 bags for $43.50.`". For `prompt` exercises, the runner can answer the prompts itself with two different inputs, which catches hard-coded answers the way a grader would. It can also check the source for things like `function` or `const`. The costs: it's a small app to build (one HTML page plus a file of exercises, each with checks written in the same `check(label, fn)` shape as the grader), and checks that are too picky (`43.5` vs. `43.50`) will frustrate students. Students also still need one step over to WebStorm for the assignments. The "Linking Scripts" section can handle that with option 1's hosted `helpers.js`, since it's the same file the runner uses.

## Recommendation

Use option 7 for the in-class exercises, built on option 1's `helpers.js`, so the same functions work in WebStorm when students move there at "Linking Scripts". Keep the exercises on the deck's coffee-shop storyline (bags, receipt, cups). If the runner can't be ready before the next lecture, ship option 1 first, since the runner can wrap the same helpers later. Add option 3's `setStyle` near the end as a step toward the DOM lecture.
