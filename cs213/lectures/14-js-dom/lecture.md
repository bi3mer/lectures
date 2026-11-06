---
marp: true
theme: lecture
paginate: true
---

<style>
/* Code on the left, a diagram on the right. */
.side-by-side { display: grid; grid-template-columns: 560px minmax(0, 1fr); gap: 24px; align-items: start; }
.side-by-side p { margin: 0; }
.caption { font-size: 20px; color: var(--secondary); }
/* The theme draws a .demo as a white panel whose 12px edge is a shadow, so the margins keep
   that edge clear of the caption above and the slide's sides. */
.demo { margin: 20px 12px 28px; color-scheme: light; }
.demo ul { margin: 0; }
/* Answer choices for the Predict slides, all on one line. */
.choices { display: flex; gap: 48px; }
</style>

# The Document Object Model

Colan Biemer

---

## The DOM

When the browser loads a page, it turns the HTML into objects, called the [**DOM**](../13-js-forms-dom/lecture.html#28). The objects form a tree, and changing one changes the page.

<div class="side-by-side">
<div>

```html
<ul id="names">
  <li id="name1">Ada</li>
  <li id="name2">Grace</li>
  <!-- ... -->
</ul>
```

`<ul>` is the parent, and each `<li>` is a child.

</div>

![w:420 The ul element was the root of this tree. Its two children were li elements. The first li's one child was the text node "Ada", and the second li's one child was the text node "Grace". Elements were blue and text nodes yellow.](examples/diagrams/names-tree.svg)

</div>

---

## One Element at a Time

```js
document.getElementById("name1").textContent = "Present";
document.getElementById("name2").textContent = "Present";
document.getElementById("name3").textContent = "Present";
```

- What about a class of 30?
- What if we don't know how many students there will be?

[`getElementById`](../13-js-forms-dom/lecture.html#30) finds one element. We need another way...

---

## Problem: A Class of 30

With 30 students, we need 30 ids and 30 lines of code to get each with `document.getElementById`. How can we avoid writing 30 of code to get each name?

```html
<ul>
  <li id="name1">Ada</li>
  <li id="name2">Grace</li>
  <!-- ... -->
  <li id="name30">Alan</li>
</ul>
```

---

## Solution 1: String Building

```js
for (let i = 1; i <= 30; ++i) {
  const name = document.getElementById(`name${i}`);
  // ...
}
```

---

## Solution 2: `childNodes`

We can also change the `ul` to have an `id`:

<!-- prettier-ignore -->
```html
<ul id="names">...</ul>
```

Then we can select it:

```js
const names = document.getElementById("names");
```

And use [`childNodes`](../13-js-forms-dom/lecture.html#36):

```js
for (const name of names.childNodes) { ... }
```

---

## Performing the Same Operation for Multiple Elements

<div class="side-by-side">
<div>

<!-- prettier-ignore -->
```html
<h1>Team 1</h1>
<ul id="team1">
  <li>John Carmack</li>...
</ul>

<h1>Team 2</h1>
<ul id="team2">
  <li>Claude Shannon</li>...
</ul>
```

</div>
<div>

```js
const teams = [
  document.getElementById("team1"),
  document.getElementById("team2"),
];

for (const t of teams) {
  // make whatever changes we wanted to
}
```

<div class="caption">
  (We could also do an index version with strings.)
</div>
</div>
</div>

If we add a third team, we need another `document.getElementById("team3")`, so the code has to change whenever the website changes. How can we handle this by changing the HTML?

---

## Problem: Getting Around It

<div class="side-by-side">
<div>

<!-- prettier-ignore -->
```html
<div id="teams">
  <h1>Team 1</h1>
  <ul>
    <li>John Carmack</li>...
  </ul>
  
  <h1>Team 2</h1>
  <ul>
    <li>Claude Shannon</li>...
  </ul>
</div>
```

</div>
<div>

```js
const teams = [
  document.getElementById("team1"),
  document.getElementById("team2"),
];

for (const t of teams) {
  // make whatever changes we wanted to
}
```

</div>
</div>

What do we change about the JS to loop through the children correctly?

---

## Solution: Getting Around It

<div class="side-by-side">
<div>

<!-- prettier-ignore -->
```html
<div id="teams">
  <h1>Team 1</h1>
  <ul>
    <li>John Carmack</li>...
  </ul>
  
  <h1>Team 2</h1>
  <ul>
    <li>Claude Shannon</li>...
  </ul>
</div>
```

</div>
<div>

```js
const teams = document.getElementById("teams");

for (let i = 3; i < teams.childNodes.length; i += 4) {
  // make whatever changes we wanted to
}
```

- Why start at 3, and why `i += 4`?

</div>
</div>

---

## Answer: Why Start at 3, and Why `i += 4`?

| Index      | 0       | 1    | 2       | 3        | 4       | 5    | 6       | 7        | 8       |
| ---------- | ------- | ---- | ------- | -------- | ------- | ---- | ------- | -------- | ------- |
| `nodeName` | `#text` | `H1` | `#text` | **`UL`** | `#text` | `H1` | `#text` | **`UL`** | `#text` |

The [spaces and line breaks between tags](../13-js-forms-dom/lecture.html#36) are text nodes, so `childNodes` holds more than the tags we wrote. The first `<ul>` is at index 3, and each list after it is 4 nodes later.

---

## A Safer Way: Check for `UL`

```js
const teams = document.getElementById("teams");
```

<div class="side-by-side">
<div>

```js
for (let child of teams.childNodes) {
  if (child.nodeName === "UL") {
    // make whatever changes we wanted to
  }
}
```

</div>
<div>

```js
for (let child of teams.childNodes) {
  if (child.nodeName !== "UL") {
    continue;
  }

  // make whatever changes we wanted to
}
```

</div>
</div>

We can also search for tags directly with...

---

## `getElementsByTagName`

```js
const lists = document.getElementsByTagName("ul");

for (let list of lists) {
  // make whatever changes we wanted to
}
```

[`document.getElementsByTagName`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName) returns every element with that tag. This is great for the problem we've been working on, but not if there are other lists which we don't want to modify.

---

## Problem: Different Kinds of Lists

Now the page lists our sponsors too, but we only want to select for teams:

<div class="side-by-side">
<div>

```html
<h1>Team 1</h1>
<ul>
  ...
</ul>
<h1>Team 2</h1>
<ul>
  ...
</ul>
<h1>Sponsors</h1>
<ul>
  ...
</ul>
```

</div>
<div>

<!-- prettier-ignore -->
```js
const lists =
  document.getElementsByTagName("ul");

for (let list of lists) { ... }
```

The sponsors list would also be affected by the code above, because all three are a `<ul>`. How can we change the HTML so the JS can tell them apart?

</div>
</div>

---

## `getElementsByClassName`

Give the team lists a class, then search for that class. The sponsors have no class, so they stay out:

<!-- prettier-ignore -->
```html
<ul class="team">...</ul>
<ul class="team">...</ul>
<ul>...</ul> <!-- the sponsors -->
```

<!-- prettier-ignore -->
```js
const teams = document.getElementsByClassName("team");
console.log(teams.length);      // 2
console.log(teams[0].nodeName); // UL
```

[`document.getElementsByClassName`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) returns every element with that class.

---

## Problem: Reading the Vote

The page now lets visitors vote for a team, and we want to know which button is picked.

```html
<input name="vote" type="radio" value="Team 1" />
<input name="vote" type="radio" value="Team 2" checked />
```

We could add a class to each button, but do we need to? What do these buttons already share?

---

## `getElementsByName`

The buttons in [a radio group](../13-js-forms-dom/lecture.html#16) already share a `name`, so the HTML can stay as it is:

```js
const buttons = document.getElementsByName("vote");

for (let button of buttons) {
  if (button.checked) {
    console.log(button.value); // Team 2
  }
}
```

[`document.getElementsByName`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName) returns every element with that `name`.

---

## Collections

`length`, indexes, and `for...of` have worked on the result of every search, because all three return the same kind of thing:

```js
const lists = document.getElementsByTagName("ul");
const teams = document.getElementsByClassName("team");
const buttons = document.getElementsByName("vote");
```

Each one is a **collection**, a list of elements in page order. Loop over it with [`for...of`](../11-js-arrays/lecture.html#20).

---

## Predict: Setting a Collection's Text

A loop for every change is a lot of typing. Can we skip it and set the whole collection at once?

```html
<ul class="team">...</ul>
<ul class="team">...</ul>
```

```js
document.getElementsByClassName("team").textContent = "No team";
```

What does the page show? Vote, then convince a neighbor.

<div class="choices">

**A.** Both say No team

**B.** The first says No team

**C.** Nothing changes

**D.** `TypeError`

</div>

---

## Answer: Setting a Collection's Text

**C.** A collection isn't an element, so the page doesn't change. Set each element instead:

```js
for (let team of document.getElementsByClassName("team")) {
  team.textContent = "No team";
}
```

---

## Setting Up

Time to try these. Make two files in a new WebStorm folder:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Practice</title>
  </head>
  <body>
    <!-- each problem's HTML goes here -->
    <script src="practice.js"></script>
  </body>
</html>
```

`practice.js` starts empty. Before each problem, clear it and paste in the new HTML.

---

## Problem: Count the Names

```html
<ul>
  <li>Ada</li>
  <li>Grace</li>
  <li>Alan</li>
</ul>
<p id="count"></p>
```

```js
// Put the number of names in the paragraph.
```

<p class="caption">Page</p>

```text
3 names
```

- Which method finds every `<li>`?
- What tells us how many it found?

---

## Solution: Count the Names

```js
const items = document.getElementsByTagName("li");
const count = document.getElementById("count");
count.textContent = `${items.length} names`;
```

A collection's `length` is how many elements it holds.

---

## Problem: Capitals

```html
<ul>
  <li>Ada</li>
  <li>Grace</li>
  <li>Alan</li>
</ul>
```

```text
for each li on the page
  set its text to its text in capitals
```

<p class="caption">Page</p>

```text
ADA
GRACE
ALAN
```

[`toUpperCase`](../10-js-objects-loops/lecture.html#11) returns a string in capitals.

---

## Solution: Capitals

```js
for (let item of document.getElementsByTagName("li")) {
  item.textContent = item.textContent.toUpperCase();
}
```

`textContent` reads the old text and writes the new text.

---

# Selectors

---

## A Loop Inside a Loop

Now we want every player in bold, but not the sponsors. Each method searches by one thing, so reaching every `<li>` in the team lists takes two loops:

```js
for (let team of document.getElementsByClassName("team")) {
  for (let child of team.childNodes) {
    if (child.nodeName === "LI") {
      // make whatever changes we wanted to
    }
  }
}
```

CSS already has a short way to say this: `.team li`.

---

## Selectors We Know

<center>

| Selector   | Matches                             |
| ---------- | ----------------------------------- |
| `li`       | every `<li>`                        |
| `.team`    | every element with the class `team` |
| `#teams`   | the element whose `id` is `teams`   |
| `.team li` | an `<li>` inside `.team`            |

</center>

These are the [selectors from CSS](../03-css-intro/lecture.html#64), and JavaScript can search with them too.

---

## `querySelectorAll`

One selector can replace both loops:

```js
const players = document.querySelectorAll(".team li");

for (let player of players) {
  player.style.fontWeight = "bold";
}
```

It takes a CSS selector and returns a collection of every match.

---

## `querySelector`

Team 1's first player is the captain, and we want that one element, not a collection:

<!-- prettier-ignore -->
```js
const captain = document.querySelector(".team li"); // the first match
const teams = document.querySelector("#teams");     // like getElementById("teams")
const none = document.querySelector("#people");     // null
```

It returns the first match, or `null` when there is none.

---

## Problem: First Score

```html
<p class="score">90</p>
<p class="score">85</p>
<p id="result"></p>
```

```js
// Put the first score in the paragraph whose id is result.
```

<p class="caption">Page</p>

```text
First: 90
```

- What selector finds a score?
- Which method stops at the first match?

---

## Solution: First Score

```js
const first = document.querySelector(".score");
const result = document.getElementById("result");
result.textContent = `First: ${first.textContent}`;
```

`querySelector` returns one element, so it has a `textContent`.

---

## Problem: Only One List

```html
<ul id="first">
  <li>Ada</li>
  <li>Grace</li>
</ul>
<ul id="second">
  <li>Alan</li>
</ul>
```

```text
for each li inside first
  add ! to the end of its text
```

<p class="caption">Page</p>

```text
Ada!
Grace!
Alan
```

---

## Solution: Only One List

```js
for (let item of document.querySelectorAll("#first li")) {
  item.textContent += "!";
}
```

`#first li` means an `<li>` inside `#first`, so Alan stays the same.

---

# Changing Classes

---

## `classList`

Team 1 wins, so its list should turn gold, bold, and larger. That's three `style` lines, but one class can hold them all, so the CSS decides the look and the JS only changes the class:

<!-- prettier-ignore -->
```js
const team = document.querySelector(".team");   // team
team.classList.add("winner");                   // team winner
team.classList.remove("winner");                // team
team.classList.toggle("winner");                // team winner
console.log(team.classList.contains("winner")); // true
```

It changes one class and leaves the others alone.

---

## Problem: Add a Class

```html
<style>
  .done {
    text-decoration: line-through;
  }
</style>
<p id="ada" class="student">Ada</p>
```

```js
// Give ada the class done, and keep the class student.
```

<p class="caption">Page</p>

```text
Ada, crossed out
```

- Which `classList` method adds a class?

---

## Solution: Add a Class

```js
document.getElementById("ada").classList.add("done");
```

`classList.add` keeps `student`.

---

## Problem: Toggle Every Name

```html
<style>
  .done {
    text-decoration: line-through;
  }
</style>
<p class="done">Ada</p>
<p>Grace</p>
```

```text
for each p on the page
  toggle its done class
```

<p class="caption">Page</p>

```text
Ada
Grace, crossed out
```

---

## Solution: Toggle Every Name

```js
for (let name of document.querySelectorAll("p")) {
  name.classList.toggle("done");
}
```

`toggle` adds `done` where it's missing, and removes it where it's there.

---

# Adding Elements

---

## `createElement`

Everything so far changes elements already in the HTML. A new player has no `<li>` to find, and [we don't know how many will join](#3), so the JS has to make one:

<!-- prettier-ignore -->
```js
const player = document.createElement("li");
player.textContent = "Linus Torvalds";
player.classList.add("captain");
console.log(player); // <li class="captain">Linus Torvalds</li>
```

It makes a new element, which isn't on the page yet.

---

## `append` and `prepend`

To show the new element, we put it inside one that's already on the page:

```js
const player = document.createElement("li");
player.textContent = "Linus Torvalds";
document.querySelector(".team").append(player);
```

<p class="caption">Page</p>
<div class="demo"><ul><li>John Carmack</li><li>Linus Torvalds</li></ul></div>

`append` adds to the end of an element, and `prepend` adds to the start.

---

## Problem: Add a Name

```html
<ul id="names">
  <li>Ada</li>
  <li>Grace</li>
</ul>
```

```js
// Add Alan to the end of the list.
```

<p class="caption">Page</p>

```text
Ada
Grace
Alan
```

- Which tag do we make?
- What finds the parent?

---

## Solution: Add a Name

```js
const item = document.createElement("li");
item.textContent = "Alan";
document.getElementById("names").append(item);
```

Nothing shows until `append` puts the new element on the page.

---

## Problem: Add Each Name

```html
<ul id="names">
  <li>Ada</li>
  <li>Grace</li>
</ul>
```

```text
set more to ["Alan", "Linus"]
for each name in more
  make an li with that name
  append it to the list
```

<p class="caption">Page</p>

```text
Ada
Grace
Alan
Linus
```

---

## Solution: Add Each Name

```js
const more = ["Alan", "Linus"];

for (let name of more) {
  const item = document.createElement("li");
  item.textContent = name;
  document.getElementById("names").append(item);
}
```

`createElement` sits inside the loop, since each name needs its own element.

---

# Removing and Replacing

---

## `remove`

When a player retires, their `<li>` should come off the page:

```js
document.querySelector(".team li").remove();

for (let player of document.querySelectorAll(".retired")) {
  player.remove();
}
```

It takes an element off the page, with everything inside it.

---

## `replaceWith`

If every player leaves, `remove` would leave an empty list on the page. A message can take the list's place instead:

```js
const message = document.createElement("p");
message.textContent = "No players yet";
document.querySelector(".team").replaceWith(message);
```

<p class="caption">Page</p>
<div class="demo"><p>No players yet</p></div>

It puts a new element where the old one was.

---

## Problem: Remove the Late

```html
<ul>
  <li class="late">Ada</li>
  <li>Grace</li>
  <li class="late">Alan</li>
</ul>
```

```js
// Take every late student off the page.
```

<p class="caption">Page</p>

```text
Grace
```

- What selector finds the late students?
- Which method takes an element off the page?

---

## Solution: Remove the Late

```js
for (let student of document.querySelectorAll(".late")) {
  student.remove();
}
```

`querySelectorAll` finds both, and the loop removes each one.

---

## Problem: Replace the List

```html
<ul id="names">
  <li>Ada</li>
  <li>Grace</li>
</ul>
```

```text
make a p that says No names yet
replace the list with the p
```

<p class="caption">Page</p>

```text
No names yet
```

---

## Solution: Replace the List

```js
const message = document.createElement("p");
message.textContent = "No names yet";
document.getElementById("names").replaceWith(message);
```

`replaceWith` takes the whole list off the page, with its items.

---

# Conclusion

---

## Summary

- `getElementsByTagName`, `getElementsByClassName`, and `getElementsByName` return a collection.
- Loop over a collection with `for...of` to change each element.
- `querySelectorAll` takes a CSS selector and returns a collection of every match.
- `querySelector` returns the first match, or `null`.
- `classList` adds, removes, and toggles one class at a time.
- `createElement` makes an element, and `append` or `prepend` puts it on the page.
- `remove` takes an element off the page, and `replaceWith` swaps it for another.

---

## Next Up: Events

[Events](../15-js-events/lecture.html)

---

# Questions?
