---
marp: true
theme: lecture
paginate: true
---

<style>
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

When the browser loads a page, it turns the HTML into objects, called the [**DOM**](../13-js-forms-dom/lecture.html#33). The objects form [a tree](../13-js-forms-dom/lecture.html#34), and changing one changes the page.

```html
<ul id="names">
  <li>Ada</li>
  <li>Grace</li>
</ul>
```

`<ul>` is the parent, and each `<li>` is a child. Today's code finds these objects and changes them.

---

## One Element at a Time

```js
document.getElementById("ada").textContent = "Present";
document.getElementById("grace").textContent = "Present";
document.getElementById("alan").textContent = "Present";
```

- What about a class of 30?
- What if we don't know how many students there will be?

[`getElementById`](../13-js-forms-dom/lecture.html#35) finds one element. Today we find many at once, restyle them with classes, and add, remove, and replace elements.

---

# Finding Many Elements

---

## `getElementsByTagName`

```html
<ul id="names">
  <li>Ada</li>
  <li>Grace</li>
  <li>Alan</li>
</ul>
```

<!-- prettier-ignore -->
```js
const items = document.getElementsByTagName("li");
console.log(items.length);         // 3
console.log(items[0].textContent); // Ada
```

It returns every element with that tag. Write `"li"`, not `"<li>"`.

---

## `getElementsByClassName`

```html
<p class="score highlight">90</p>
<p class="score">85</p>
<p>No score yet</p>
```

<!-- prettier-ignore -->
```js
const scores = document.getElementsByClassName("score");
console.log(scores.length);         // 2
console.log(scores[0].textContent); // 90
```

It returns every element with that class. Write `"score"`, not `".score"`.

---

## `getElementsByName`

```html
<input id="red" name="color" type="radio" value="red" />
<input id="green" name="color" type="radio" value="green" checked />
<input id="blue" name="color" type="radio" value="blue" />
```

<!-- prettier-ignore -->
```js
const buttons = document.getElementsByName("color");
console.log(buttons.length);     // 3
console.log(buttons[1].checked); // true
```

It returns every element with that `name`, like the buttons in [a radio group](../13-js-forms-dom/lecture.html#17).

---

## Collections

```js
const scores = document.getElementsByClassName("score");

for (let score of scores) {
  score.style.color = "tomato";
}
```

A **collection** is a list of elements in page order. Loop over it with [`for...of`](../11-js-arrays/lecture.html#20).

---

## Predict: Setting a Collection's Text

```html
<p class="score">90</p>
<p class="score">85</p>
```

```js
document.getElementsByClassName("score").textContent = "No score";
```

What does the page show? Vote, then convince a neighbor.

<div class="choices">

**A.** Both say No score

**B.** The first says No score

**C.** Nothing changes

**D.** `TypeError`

</div>

---

## Answer: Setting a Collection's Text

**C.** A collection isn't an element, so the page doesn't change. Set each element instead:

```js
for (let score of document.getElementsByClassName("score")) {
  score.textContent = "No score";
}
```

---

## Setting Up

Make these two files in a new WebStorm folder:

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

## Problem (Us): Count the Names

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

## Solution (Us): Count the Names

```js
const items = document.getElementsByTagName("li");
const count = document.getElementById("count");
count.textContent = `${items.length} names`;
```

A collection's `length` is how many elements it holds.

---

## Problem (You): Capitals

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

[`toUpperCase`](../10-js-objects-loops/lecture.html#10) returns a string in capitals.

---

## Solution (You): Capitals

```js
for (let item of document.getElementsByTagName("li")) {
  item.textContent = item.textContent.toUpperCase();
}
```

`textContent` reads the old text and writes the new text.

---

# Selectors

---

## `querySelector`

<!-- prettier-ignore -->
```js
const list = document.querySelector("#names");      // like getElementById("names")
const first = document.querySelector(".highlight"); // the first match
const none = document.querySelector("#people");     // null
```

It takes a CSS selector and returns the first match, or `null` when there is none.

---

## Selectors We Know

<center>

| Selector    | Matches                              |
| ----------- | ------------------------------------ |
| `li`        | every `<li>`                         |
| `.score`    | every element with the class `score` |
| `#names`    | the element whose `id` is `names`    |
| `#names li` | an `<li>` inside `#names`            |

</center>

These are the [selectors from CSS](../03-css-intro/lecture.html#64).

---

## `querySelectorAll`

```js
const highlights = document.querySelectorAll("#names .highlight");

for (let highlight of highlights) {
  highlight.style.fontWeight = "bold";
}
```

It returns a collection of every match.

---

## Problem (Us): First Score

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

## Solution (Us): First Score

```js
const first = document.querySelector(".score");
const result = document.getElementById("result");
result.textContent = `First: ${first.textContent}`;
```

`querySelector` returns one element, so it has a `textContent`.

---

## Problem (You): Only One List

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

## Solution (You): Only One List

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

<!-- prettier-ignore -->
```js
const alan = document.getElementById("alan");      // highlight
alan.classList.add("done");                        // highlight done
alan.classList.remove("highlight");                // done
alan.classList.toggle("highlight");                // done highlight
console.log(alan.classList.contains("highlight")); // true
```

It changes one class and leaves the others alone. The CSS decides what each class looks like.

---

## Problem (Us): Add a Class

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

## Solution (Us): Add a Class

```js
document.getElementById("ada").classList.add("done");
```

`classList.add` keeps `student`.

---

## Problem (You): Toggle Every Name

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

## Solution (You): Toggle Every Name

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

<!-- prettier-ignore -->
```js
const item = document.createElement("li");
item.textContent = "Linus";
item.classList.add("highlight");
console.log(item); // <li class="highlight">Linus</li>
```

It makes a new element, which isn't on the page yet.

---

## `append` and `prepend`

```js
const item = document.createElement("li");
item.textContent = "Linus";
document.getElementById("names").append(item);
```

<p class="caption">Page</p>
<div class="demo"><ul><li>Ada</li><li>Grace</li><li>Alan</li><li>Linus</li></ul></div>

`append` adds to the end of an element, and `prepend` adds to the start.

---

## Problem (Us): Add a Name

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

## Solution (Us): Add a Name

```js
const item = document.createElement("li");
item.textContent = "Alan";
document.getElementById("names").append(item);
```

Nothing shows until `append` puts the new element on the page.

---

## Problem (You): Add Each Name

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

## Solution (You): Add Each Name

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

```js
document.getElementById("alan").remove();

for (let item of document.querySelectorAll(".done")) {
  item.remove();
}
```

It takes an element off the page, with everything inside it.

---

## `replaceWith`

```js
const message = document.createElement("p");
message.textContent = "No names yet";
document.getElementById("names").replaceWith(message);
```

<p class="caption">Page</p>
<div class="demo"><p>No names yet</p></div>

It puts a new element where the old one was.

---

## Problem (Us): Remove the Late

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

## Solution (Us): Remove the Late

```js
for (let student of document.querySelectorAll(".late")) {
  student.remove();
}
```

`querySelectorAll` finds both, and the loop removes each one.

---

## Problem (You): Replace the List

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

## Solution (You): Replace the List

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
- `querySelector` takes a CSS selector and returns the first match, or `null`.
- `querySelectorAll` returns a collection of every match.
- `classList` adds, removes, and toggles one class at a time.
- `createElement` makes an element, and `append` or `prepend` puts it on the page.
- `remove` takes an element off the page, and `replaceWith` swaps it for another.

---

# Questions?
