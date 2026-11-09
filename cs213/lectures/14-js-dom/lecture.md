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
/* Shrinks a code block that would crowd its column. */
.small-code pre { font-size: 0.8em; }
/* The theme draws a .demo as a white panel whose 12px edge is a shadow, so the margins keep
   that edge clear of the caption above and the slide's sides. */
.demo { margin: 20px 12px 28px; color-scheme: light; }
.demo ul { margin: 0; }
</style>

# The Document Object Model

Colan Biemer

---

## The DOM

When the browser loads a page, it turns the HTML into objects, and places them in the [**DOM**](../13-js-forms-dom/lecture.html#28). The objects form a tree, and changing one changes the page.

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

## Problem: A Class of 30

With 30 students, we would need 30 ids and 30 lines of code to get each with `document.getElementById`. How can we avoid writing 30 of code to get each name?

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

<div class="side-by-side">
<div class="small-code">

```html
<ul>
  <li id="name1">Ada</li>
  <li id="name2">Grace</li>
  <!-- ... -->
  <li id="name30">Alan</li>
</ul>
```

</div>
<div>

```js
for (let i = 1; i <= 30; ++i) {
  const name = document.getElementById(`name${i}`);
  // ...
}
```

</div>
</div>

How could we accomplish this with only one call of `.getElementById`? Hint: We would need to modify the HTML.

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

`length` is how many elements the search found.

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

---

## Solution: Capitals

```js
for (let item of document.getElementsByTagName("li")) {
  item.textContent = item.textContent.toUpperCase();
}
```

`textContent` reads the old text and writes the new text.

---

## Problem: Different Kinds of Lists

Now the page lists sponsors as well, but we only want to select for teams:

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

The sponsors list would also be affected by the code above, because all three are a `<ul>`.

</div>
</div>

---

## `classList`

Give the team lists a class. An element's [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) holds its classes, and `contains` checks for one of them:

<!-- prettier-ignore -->
```html
<ul class="team">...</ul>
<ul class="team">...</ul>
<ul>...</ul> <!-- the sponsors -->
```

```js
const lists = document.getElementsByTagName("ul");
console.log(lists[0].classList.contains("team")); // true
console.log(lists[2].classList.contains("team")); // false
```

---

## Problem: Count the Teams

<!-- prettier-ignore -->
```html
<ul class="team">...</ul>
<ul class="team">...</ul>
<ul>...</ul> <!-- the sponsors -->
<p id="count"></p>
```

```js
// Put the number of teams in the paragraph.
```

<p class="caption">Page</p>

```text
2 teams
```

---

## Solution: Count the Teams

```js
let count = 0;
for (let list of document.getElementsByTagName("ul")) {
  if (list.classList.contains("team")) {
    ++count;
  }
}
document.getElementById("count").textContent = `${count} teams`;
```

This works, but it would be better if we could get elements by class.

---

## `getElementsByClassName`

The browser can do the check for us and search for the class directly. The sponsors have no `team` class, so they stay out:

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

## Problem: Percent Scores

```html
<p class="score">90</p>
<p class="score">85</p>
<p>Ada</p>
```

```text
for each element with the class score
  add % to the end of its text
```

<p class="caption">Page</p>

```text
90%
85%
Ada
```

---

## Solution: Percent Scores

```js
for (let score of document.getElementsByClassName("score")) {
  score.textContent += "%";
}
```

The last paragraph has no `score` class, so the search skips it.

---

## `name`

An input's `name` attribute is also a property we can read:

```html
<input id="team-1" name="vote" type="radio" value="Team 1" />
```

```js
const team1 = document.getElementById("team-1");
console.log(team1.name); // vote
```

---

## Problem: Reading the Vote

Say that we want to allow visitors to vote for a team, and we want to know which radio input is picked. Hint: we can grab elements by tag name.

<!-- prettier-ignore -->
```html
<input id="subscribe" name="subscribe" type="checkbox" checked />
<label for="subscribe">Email me the results</label>
<input id="team-1" name="vote" type="radio" value="Team 1" />
<label for="team-1">Team 1</label>
<input id="team-2" name="vote" type="radio" value="Team 2" checked />
<label for="team-2">Team 2</label>
```

```js
// Log the value of the checked input named vote.
```

<p class="caption">Console</p>

```text
Team 2
```

---

## Solution: Reading the Vote

```js
for (let input of document.getElementsByTagName("input")) {
  if (input.name === "vote" && input.checked) {
    console.log(input.value); // Team 2
    break;
  }
}
```

The checkbox comes first and is checked too, so without the `name` check we would log `on`.

---

## A Better Way: `getElementsByName`

```js
const inputs = document.getElementsByName("vote");

for (let input of inputs) {
  if (input.checked) {
    console.log(input.value); // Team 2
    break;
  }
}
```

[`document.getElementsByName`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName) returns every element with that `name`.

---

## Problem: Pick a Size

```html
<input id="small" name="size" type="radio" value="Small" />
<label for="small">Small</label>
<input id="large" name="size" type="radio" value="Large" checked />
<label for="large">Large</label>
<p id="picked"></p>
```

Place the selected size in the paragraph with id `picked`.

<p class="caption">Page</p>

```text
Large
```

---

## Solution: Pick a Size

```js
const picked = document.getElementById("picked");

for (const radio of document.getElementsByName("size")) {
  if (radio.checked) {
    picked.textContent = radio.value;
    break;
  }
}
```

`getElementsByName` finds both inputs, and `checked` tells them apart.

---

## `HTMLCollection` and `NodeList`

`length`, indexes, and `for...of` have worked on the result of every search, because each one is a list of elements in page order:

<!-- prettier-ignore -->
```js
const lists = document.getElementsByTagName("ul");      // HTMLCollection
const teams = document.getElementsByClassName("team");  // HTMLCollection
const radios = document.getElementsByName("vote");      // NodeList
```

Loop over an [`HTMLCollection`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) or a [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) with [`for...of`](../11-js-arrays/lecture.html#20).

---

## `HTMLCollection` vs. `NodeList`

|                | `HTMLCollection`                                 | `NodeList`                        |
| -------------- | ------------------------------------------------ | --------------------------------- |
| **Comes from** | `getElementsByTagName`, `getElementsByClassName` | `childNodes`, `getElementsByName` |
| **Holds**      | Elements only                                    | Any node, including text          |
| **`forEach`**  | No                                               | Yes                               |

<div class="footnote">The <a href="https://dom.spec.whatwg.org/#old-style-collections">DOM Standard</a> calls both "old-style collections," and calls <code>HTMLCollection</code> "a historical artifact we cannot rid the web of."</div>

---

# Selectors

---

## What is a selector?

A [**selector**](../03-css-intro/lecture.html#18) is the part of a CSS rule that picks which elements the rule applies to:

```css
.team li {
  font-weight: bold;
}
```

`.team li` picks every `<li>` inside an element with the class `team`.

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

It takes a CSS selector and returns a `NodeList` of every match.

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

## `querySelector`

[`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector), without the `All`, returns only the **first** element that matches. Team 1's first player is the captain:

<!-- prettier-ignore -->
```html
<div id="teams">
  <ul class="team"><li>Ada</li><li>Grace</li></ul>
  <ul class="team"><li>Alan</li><li>Linus</li></ul>
</div>
```

<!-- prettier-ignore -->
```js
const captain = document.querySelector(".team li"); // the first match
const teams = document.querySelector("#teams");     // like getElementById("teams")
const none = document.querySelector("#people");     // null
```

`querySelectorAll` returns a `NodeList` of every match; `querySelector` returns one element, or `null` when nothing matches.

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
```

<div class="side-by-side">
<div>

<!-- prettier-ignore -->
```js
const result =
  document.getElementById("result");
```

</div>
<div>

<!-- prettier-ignore -->
```js
const result =
  document.querySelector("#result");
```

</div>
</div>

```js
result.textContent = `First: ${first.textContent}`;
```

Either line finds the same paragraph. `querySelector` returns one element, so it has a `textContent`.

---

# Changing Classes

---

## `add`

`classList.add`, another method on [`classList`](#17), puts a class on an element:

<!-- prettier-ignore -->
```html
<ul class="team">...</ul>
```

<!-- prettier-ignore -->
```js
const team = document.querySelector(".team"); // team
team.classList.add("winner");                 // team winner
```

The element's other classes stay.

---

## `remove`

`classList.remove` takes a class off an element:

<!-- prettier-ignore -->
```html
<ul class="team winner">...</ul>
```

<!-- prettier-ignore -->
```js
const team = document.querySelector(".team"); // team winner
team.classList.remove("winner");              // team
```

The element's other classes stay. Removing a class that isn't there does nothing.

---

## `toggle`

`classList.toggle` adds a class when it's missing and removes it when it's there:

<!-- prettier-ignore -->
```html
<ul class="team">...</ul>
```

<!-- prettier-ignore -->
```js
const team = document.querySelector(".team"); // team
team.classList.toggle("winner");              // team winner
team.classList.toggle("winner");              // team
```

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

## Remove, Hide, or Disable

`remove` is one of three ways to take something away from the user. The other two are [`hidden` and `disabled`](../13-js-forms-dom/lecture.html#41):

<!-- prettier-ignore -->
```js
document.getElementById("note").remove();
document.getElementById("note").hidden = true;
document.getElementById("next").disabled = true;
```

| Code              | On the page? | Visible? | Usable? |
| ----------------- | ------------ | -------- | ------- |
| `remove()`        | No           | No       | No      |
| `hidden = true`   | Yes          | No       | No      |
| `disabled = true` | Yes          | Yes      | No      |

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

- `getElementsByTagName` and `getElementsByClassName` return an `HTMLCollection`; `getElementsByName` returns a `NodeList`.
- Loop over either one with `for...of` to change each element.
- `querySelectorAll` takes a CSS selector and returns a `NodeList` of every match.
- `querySelector` returns the first match, or `null`.
- `classList` adds, removes, and toggles one class at a time.
- `createElement` makes an element, and `append` or `prepend` puts it on the page.
- `remove` takes an element off the page, and `replaceWith` swaps it for another.

---

## Next Up: Events

[Events](../15-js-events/lecture.html)

---

# Questions?
