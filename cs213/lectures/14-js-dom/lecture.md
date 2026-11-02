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
/* Two code blocks next to each other, in equal columns. */
.pair { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; align-items: start; }
</style>

# The Document Object Model

Colan Biemer

---

## One Element at a Time

```js
document.getElementById("brightness").value = look.brightness;
document.getElementById("contrast").value = look.contrast;
document.getElementById("saturation").value = look.saturation;
```

[`getElementById`](../13-js-forms-dom/lecture.html#35) finds one element, so Shutterbug's 🎲 took a line per slider. Today we find many elements at once, restyle them with classes, and add, remove, and replace elements.

---

## `getElementsByTagName`

```html
<ul id="menu">
  <li>Margherita</li>
  <li>Hawaiian</li>
  <li>Veggie</li>
</ul>
```

<!-- prettier-ignore -->
```js
const items = document.getElementsByTagName("li");
console.log(items.length);         // 3
console.log(items[0].textContent); // Margherita
```

`getElementsByTagName` returns every element with that tag, in page order. Leave off the angle brackets: `"li"`, not `"<li>"`.

---

## `getElementsByClassName`

```html
<p class="price special">$14.00</p>
<p class="price">$12.00</p>
<p>Ask about our specials</p>
```

<!-- prettier-ignore -->
```js
const prices = document.getElementsByClassName("price");
console.log(prices.length);         // 2
console.log(prices[0].textContent); // $14.00
```

`getElementsByClassName` returns every element that has the class, even among other classes, like `price special`. Leave off the `.`: that's how CSS writes a class.

---

## `getElementsByName`

```html
<input id="small" name="size" type="radio" value="small" />
<input id="medium" name="size" type="radio" value="medium" checked />
<input id="large" name="size" type="radio" value="large" />
```

<!-- prettier-ignore -->
```js
const buttons = document.getElementsByName("size");
console.log(buttons.length);     // 3
console.log(buttons[1].checked); // true
```

`getElementsByName` returns every element whose `name` attribute matches, so it finds all the buttons in [a radio group](../13-js-forms-dom/lecture.html#17).

---

## Collections Aren't Arrays

```js
const prices = document.getElementsByClassName("price");

for (let price of prices) {
  price.style.color = "tomato";
}
```

A **collection** is a list of elements in page order, with `length` and indexes, like [`childNodes`](../13-js-forms-dom/lecture.html#41). It isn't an array, so `push` and `join` don't work, but [`for...of`](../11-js-arrays/lecture.html#20) does. When nothing matches, it's empty, never `null`.

---

## Predict: Setting a Collection's Text

```html
<p class="price">$14.00</p>
<p class="price">$12.00</p>
```

```js
document.getElementsByClassName("price").textContent = "Sold out";
```

What does the page show? Vote, then convince a neighbor.

<div class="choices">

**A.** Both say Sold out

**B.** The first says Sold out

**C.** Nothing changes

**D.** `TypeError`

</div>

---

## Answer: Setting a Collection's Text

**C.** A collection isn't an element, so it has no `textContent` for the page to show. Setting it just gives the collection a new property, with no error. Set each element instead:

```js
for (let price of document.getElementsByClassName("price")) {
  price.textContent = "Sold out";
}
```

---

## `querySelector`

<!-- prettier-ignore -->
```js
const menu = document.querySelector("#menu");      // like getElementById("menu")
const special = document.querySelector(".special"); // the first special
const none = document.querySelector("#pizzas");     // null
```

`querySelector` takes a CSS selector and returns the first element that matches, or `null` when none does. It's a selector, so an id needs the `#` that [`getElementById`](../13-js-forms-dom/lecture.html#35) leaves off.

---

## Selectors We Know

<style scoped>
table { font-size: 0.7em; }
</style>

<center>

| Selector        | Matches                                  |
| --------------- | ---------------------------------------- |
| `li`            | every `<li>`                             |
| `.special`      | every element with the class `special`   |
| `#menu`         | the element whose `id` is `menu`         |
| `li.special`    | an `<li>` that has the class `special`   |
| `#menu li`      | an `<li>` inside `#menu`                 |
| `[name="size"]` | an element whose `name` is `size`        |
| `:checked`      | a checkbox or radio button that's ticked |

</center>

```js
const size = document.querySelector('input[name="size"]:checked').value;
```

[No space means and, a space means inside](../03-css-intro/lecture.html#64). The last two are an [attribute selector](../03-css-intro/lecture.html#121) and a [pseudo-class](../03-css-intro/lecture.html#100), so together they find the picked size.

---

## `querySelectorAll`

```js
const specials = document.querySelectorAll("#menu .special");

for (let special of specials) {
  special.style.fontWeight = "bold";
}
```

`querySelectorAll` returns a collection of every match. The `getElementsBy...` collections are **live**: they update as the page changes. `querySelectorAll`'s is a **snapshot**: it holds the elements that matched when it ran.

---

## Searching Inside an Element

<!-- prettier-ignore -->
```js
const menu = document.getElementById("menu");
const items = menu.getElementsByTagName("li");      // only the menu's
const specials = menu.querySelectorAll(".special"); // only the menu's
```

Elements have `getElementsByTagName`, `getElementsByClassName`, `querySelector`, and `querySelectorAll` too, and they search only inside the element. `getElementById` and `getElementsByName` work only on `document`.

---

## Which One?

<style scoped>
table { font-size: 0.7em; }
</style>

<center>

| Method                   | Finds by | Returns               | Nothing matches |
| ------------------------ | -------- | --------------------- | --------------- |
| `getElementById`         | `id`     | one element           | `null`          |
| `getElementsByTagName`   | tag      | a live collection     | empty           |
| `getElementsByClassName` | class    | a live collection     | empty           |
| `getElementsByName`      | `name`   | a live collection     | empty           |
| `querySelector`          | selector | the first match       | `null`          |
| `querySelectorAll`       | selector | a snapshot collection | empty           |

</center>

A selector can say anything the other four can, so `querySelector` and `querySelectorAll` can do all their jobs.

---

## `style`, Again

<!-- prettier-ignore -->
```js
const menu = document.getElementById("menu");
menu.style.color = "tomato";
console.log(menu.style.color);    // tomato
console.log(menu.style.fontSize); // an empty line, though the CSS sets 20px
```

`style` sets [one CSS property](../13-js-forms-dom/lecture.html#45) as an inline style, which [wins over the page's CSS](../03-css-intro/lecture.html#22). Reading `style` sees only inline styles.

---

## `className`

```html
<li id="veggie" class="special">Veggie</li>
```

<!-- prettier-ignore -->
```js
const veggie = document.getElementById("veggie");
console.log(veggie.className); // special
veggie.className = "sold-out";
console.log(veggie.className); // sold-out
```

`className` is the `class` attribute as one string. Setting it replaces every class, so `special` is gone. It isn't called `class`, since JavaScript uses that word for something else.

---

## `classList`

<!-- prettier-ignore -->
```js
const veggie = document.getElementById("veggie"); // special
veggie.classList.add("sold-out");                 // special sold-out
veggie.classList.remove("special");               // sold-out
veggie.classList.toggle("special");               // sold-out special
veggie.classList.toggle("sold-out", false);       // special
console.log(veggie.classList.contains("special")); // true
```

`classList` changes one class and leaves the others alone. `toggle` adds a missing class and removes one that's there, and its second argument says which: `true` adds, and `false` removes.

---

## Classes or `style`?

```css
.sold-out {
  color: gray;
  text-decoration: line-through;
}
```

```js
veggie.classList.add("sold-out");
menu.style.width = `${width}px`;
```

A look we know ahead of time goes in the CSS as a class, and code switches the class on or off. A value that code works out, like a width from a number, goes in `style`.

---

## `createElement`

<!-- prettier-ignore -->
```js
const item = document.createElement("li");
item.textContent = "Pepperoni";
item.classList.add("special");
console.log(item); // <li class="special">Pepperoni</li>
```

`createElement` makes a new element with that tag. It has no parent yet, so it isn't on the page: we set its properties, then add it.

---

## `append` and `prepend`

```js
const item = document.createElement("li");
item.textContent = "Pepperoni";
document.getElementById("menu").append(item);
```

<p class="caption">Page</p>
<div class="demo"><ul><li>Margherita</li><li>Hawaiian</li><li>Veggie</li><li>Pepperoni</li></ul></div>

`append` adds children at the end of an element, and `prepend` adds them at the start. Each takes one or more elements, or strings, which become text.

---

## Predict: Appending Twice

```js
const item = document.createElement("li");
item.textContent = "Pepperoni";
document.getElementById("menu").append(item);
document.getElementById("specials").append(item);
```

How many Pepperonis does the page show? Vote, then convince a neighbor.

<div class="choices">

**A.** `0`

**B.** `1`, in the menu

**C.** `1`, in the specials

**D.** `2`

</div>

---

## Answer: Appending Twice

**C.** A node has only one parent, so the second `append` moves `item` from the menu to the specials. `item` is a [reference to one element](../11-js-arrays/lecture.html#25), not a copy, so two Pepperonis take two `createElement` calls.

---

## `innerHTML +=` or `createElement`?

```js
const name = document.getElementById("name").value;

// rebuilds every item, and makes tags from what was typed
menu.innerHTML += `<li>${name}</li>`;

// adds one item, and shows what was typed as text
const item = document.createElement("li");
item.textContent = name;
menu.append(item);
```

[`+=`](../13-js-forms-dom/lecture.html#40) turns every item back into HTML and builds new elements from it.

---

## `remove`

```js
document.getElementById("veggie").remove();

for (let item of document.querySelectorAll(".sold-out")) {
  item.remove();
}
```

`remove` takes an element off the page, with everything inside it. A variable that refers to it still holds it, so it can be appended again later.

---

## Predict: Removing in a Loop

```js
// the menu holds four <li class="special"> items
const specials = document.getElementsByClassName("special");

for (let special of specials) {
  special.remove();
}

console.log(specials.length);
```

What does it print? Vote, then convince a neighbor.

<div class="choices">

**A.** `0`

**B.** `2`

**C.** `4`

**D.** `TypeError`

</div>

---

## Answer: Removing in a Loop

<center>

| Index | Removes                        | Left in `specials`    |
| ----- | ------------------------------ | --------------------- |
| `0`   | the 1st                        | the 2nd, 3rd, and 4th |
| `1`   | the 3rd, now at index 1        | the 2nd and 4th       |
| `2`   | nothing, since `length` is `2` | the 2nd and 4th       |

</center>

**B.** The live collection shrinks as each item leaves, so the next index skips one. A `querySelectorAll` snapshot keeps all four, so the same loop removes all four.

---

## `replaceWith`

```js
const message = document.createElement("p");
message.textContent = "Sold out today";
document.getElementById("menu").replaceWith(message);
```

<p class="caption">Page</p>
<div class="demo"><p>Sold out today</p></div>

`replaceWith` puts new elements, or strings, where an element was, and takes the old one off the page, with everything inside it.

---

## `replaceChildren`

<!-- prettier-ignore -->
```js
const menu = document.getElementById("menu");
menu.replaceChildren();     // the menu is empty

const item = document.createElement("li");
item.textContent = "Pepperoni";
menu.replaceChildren(item); // the menu holds only Pepperoni
```

`replaceChildren` takes every child out of an element and puts in the ones it's given. With none, the element is left empty, ready to be drawn again.

---

## The DOM So Far

<style scoped>
table { font-size: 0.7em; }
</style>

<center>

| Job            | [Forms and the DOM](../13-js-forms-dom/lecture.html)                                                                                                                                                   | Today                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| Find one       | [`getElementById`](../13-js-forms-dom/lecture.html#35)                                                                                                                                                 | [`querySelector`](#9)                                |
| Find many      | [`childNodes`](../13-js-forms-dom/lecture.html#41)                                                                                                                                                     | [`getElementsBy...`](#13), [`querySelectorAll`](#11) |
| Read and write | [`textContent`](../13-js-forms-dom/lecture.html#39), [`innerHTML`](../13-js-forms-dom/lecture.html#40), [`value`](../13-js-forms-dom/lecture.html#46), [`checked`](../13-js-forms-dom/lecture.html#49) |                                                      |
| Style          | [`style`](../13-js-forms-dom/lecture.html#45)                                                                                                                                                          | [`className`](#15), [`classList`](#16)               |
| Add            | [`innerHTML +=`](../13-js-forms-dom/lecture.html#40)                                                                                                                                                   | [`createElement`](#18), [`append`, `prepend`](#19)   |
| Remove         |                                                                                                                                                                                                        | [`remove`](#23), [`replaceChildren()`](#27)          |
| Replace        |                                                                                                                                                                                                        | [`replaceWith`](#26), [`replaceChildren`](#27)       |

</center>

Every change to a page starts with a find. Next week, [events](../15-js-events/lecture.html) decide when this code runs.

---

# Building Pie Chart

---

## Setting Up the Starter

Today's page is [Pie Chart](https://bi3mer.github.io/lectures/cs213/lectures/14-js-dom/examples/pizza-final/), a pizza builder. Its starter has two files on GitHub: [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/14-js-dom/examples/pizza-starter/index.html) and [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/14-js-dom/examples/pizza-starter/practice.js). Set them up in WebStorm, in a new folder:

1. Open each file, and click **Copy raw file**, the copy icon above the code.
2. Paste each one into a new file in WebStorm with the same name.

Every control already calls its function, like `onchange="showSize()"`, so today's code all goes in `practice.js`.

---

## Problem (Us): Size

The Size buttons call `showSize()` when one is picked. Let's fill it in, in the Size section.

1. Loop over the [size buttons](#5), found by their `name`.
2. When a button is `checked`, look up its size's `width` in `sizes`.
3. Set the pizza's `style.width` to that many pixels, like `288px`. The pizza's id is `pizza`.
4. Keep the `showOrder();` line at the end. It's empty until Order List.

---

## Solution (Us): Size

```js
function showSize() {
  for (let box of document.getElementsByName("size")) {
    if (box.checked) {
      const width = sizes[box.value].width;
      document.getElementById("pizza").style.width = `${width}px`;
    }
  }

  showOrder();
}
```

Each button's `value` is a key in `sizes`, so [brackets](../10-js-objects-loops/lecture.html#6) look it up. The CSS slides the pizza from one width to the next.

---

## Problem (You): Sauce

The Sauce buttons call `showSauce()`. Fill it in, in the Sauce section, with no loop:

1. Find the picked sauce button with one [`querySelector`](#10), and read its `value`.
2. Set the pizza's `style.backgroundColor` to that sauce's color in `sauces`.

`sauces["pesto"]` is `"#5f8f3a"`, a green. The sauce shows between the cheese and the crust.

---

## Solution (You): Sauce

```js
function showSauce() {
  const sauce = document.querySelector('input[name="sauce"]:checked').value;
  document.getElementById("pizza").style.backgroundColor = sauces[sauce];
}
```

`input[name="sauce"]:checked` is an `<input>` whose `name` is `sauce` and that's ticked. A radio group always has one ticked, so `querySelector` never returns `null` here.

---

## Problem (Us): Crust

The Crust picker calls `showCrust()`. The CSS already draws each crust: `.thin`, `.regular`, and `.deep` each set the crust's width.

1. Read the picked crust from `crust`.
2. Take all three crust classes off the pizza, then add the picked one.
3. Why not set [`className`](#15) to the crust?

---

## Solution (Us): Crust

```js
function showCrust() {
  const crust = document.getElementById("crust").value;
  document.getElementById("pizza").classList.remove("thin", "regular", "deep");
  document.getElementById("pizza").classList.add(crust);
}
```

`remove` takes several classes, and skips any the pizza doesn't have. `className` would replace every class, so a new crust would take off the next problem's `extra-cheese`.

---

## Problem (You): Extra Cheese

The **Extra cheese** box calls `showCheese()`. Turn the pseudocode into code in the Extra Cheese section, before its `showOrder();` line.

```text
if the extra-cheese box is ticked
  add the extra-cheese class to the pizza
else
  take the extra-cheese class off the pizza
```

The CSS grows the cheese on a pizza with the `extra-cheese` class.

---

## Solution (You): Extra Cheese

```js
if (document.getElementById("extra-cheese").checked) {
  document.getElementById("pizza").classList.add("extra-cheese");
} else {
  document.getElementById("pizza").classList.remove("extra-cheese");
}
```

[`toggle`'s second argument](#16) can do the `if...else` in one line:

```js
const cheese = document.getElementById("extra-cheese").checked;
document.getElementById("pizza").classList.toggle("extra-cheese", cheese);
```

---

## Problem (Us): Add a Topping

Let's write `addPiece(name)`, which puts one piece of a topping on the pizza, in the Add a Topping section.

1. [Make](#18) a `<span>`, and give it two classes: `piece` and `name`.
2. Set its text to the topping's `emoji` in `toppings`.
3. Set its `style.left` and `style.top` to a [random](../12-js-math-dates-strings/lecture.html#11) percent from 20 to 80, like `43.7%`.
4. [Append](#19) it to the element whose id is `toppings`, the layer over the cheese.

Test it with `addPiece("mushroom");` under the function, then delete the test.

---

## Solution (Us): Add a Topping

```js
function addPiece(name) {
  const piece = document.createElement("span");
  piece.classList.add("piece", name);
  piece.textContent = toppings[name].emoji;
  piece.style.left = `${Math.random() * 60 + 20}%`;
  piece.style.top = `${Math.random() * 60 + 20}%`;
  document.getElementById("toppings").append(piece);
}
```

The `piece` class centers each piece on its spot, and the `mushroom` class lets us find every mushroom later.

---

## Problem (You): Tick a Topping

Each topping box calls `showTopping` with its name, like `showTopping('mushroom')`. Turn the pseudocode into code in the Tick a Topping section, before its `showOrder();` line.

```text
if the box whose id is name is ticked
  add 6 pieces of name
else
  remove each piece whose class is name
```

A [`for` loop](../10-js-objects-loops/lecture.html#22) can add the 6 pieces. Find the pieces to remove with a [snapshot](#25).

---

## Solution (You): Tick a Topping

```js
if (document.getElementById(name).checked) {
  for (let i = 0; i < 6; i++) {
    addPiece(name);
  }
} else {
  for (let piece of document.querySelectorAll(`.${name}`)) {
    piece.remove();
  }
}
```

`` `.${name}` `` builds the selector, like `.mushroom`. A live `getElementsByClassName` would leave half the mushrooms behind.

---

## Problem (Us): Order List

`showOrder()` draws the order list again each time the pizza changes. Let's fill in `addLine` and the Order List part of `showOrder()`, in the Order section.

1. `addLine(label, price)`: make an `<li>` like `Medium, 12 inch: $14.00`, and append it to the list whose id is `order`. `dollars(14)` gives `$14.00`.
2. In `showOrder()`, [empty](#27) `order`.
3. Add a line for the picked size, then one for each ticked topping, at `toppingPrice` each.
4. Why empty the list first?

---

## Solution (Us): Order List

<style scoped>
pre { font-size: 0.7em; }
</style>

```js
function addLine(label, price) {
  const line = document.createElement("li");
  line.textContent = `${label}: ${dollars(price)}`;
  document.getElementById("order").append(line);
}

function showOrder() {
  document.getElementById("order").replaceChildren();

  const size = document.querySelector('input[name="size"]:checked').value;
  addLine(sizes[size].label, sizes[size].price);

  const boxes = document.querySelectorAll('input[name="topping"]:checked');
  for (let box of boxes) {
    addLine(toppings[box.value].label, toppingPrice);
  }
}
```

Without `replaceChildren()`, each change would add a whole new order under the last one.

---

## Problem (You): Order Total

Turn the pseudocode into code in the Order Total part of `showOrder()`.

```text
set total to the size's price, plus toppingPrice for each ticked topping
if the extra-cheese box is ticked
  add a line for Extra cheese, at cheesePrice
  add cheesePrice to total
put total, in dollars, in the total span
```

`boxes`, from Order List, is a collection, so it has a [`length`](#6). A medium with three toppings and extra cheese comes to $20.50.

---

## Solution (You): Order Total

```js
let total = sizes[size].price + boxes.length * toppingPrice;

if (document.getElementById("extra-cheese").checked) {
  addLine("Extra cheese", cheesePrice);
  total += cheesePrice;
}

document.getElementById("total").textContent = dollars(total);
```

`total` is a `let`, since extra cheese adds to it.

---

## Problem (You): Place Order

**Place order** calls `placeOrder()`. Turn the pseudocode into code in the Place Order section.

```text
make a section with the class card
make an h2 that says Order Placed
make a p that says Your pizza will be ready in 20 minutes.
put the h2 and the p in the section
replace the build form with the section
```

[`append`](#19) takes more than one element. The form's id is `build`.

---

## Solution (You): Place Order

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function placeOrder() {
  const receipt = document.createElement("section");
  const heading = document.createElement("h2");
  const message = document.createElement("p");

  receipt.classList.add("card");
  heading.textContent = "Order Placed";
  message.textContent = "Your pizza will be ready in 20 minutes.";
  receipt.append(heading, message);

  document.getElementById("build").replaceWith(receipt);
}
```

The receipt takes the form's place, and the pizza and its order stay where they are. Reload the page to start a new order.

---

## Problem (You): Parsons 1

<style scoped>
pre { font-size: 0.75em; }
</style>

<!-- prettier-ignore -->
```js
for (let box of boxes) {
const boxes = fieldset.getElementsByTagName("<input>");
showOrder();
}
function parsons1() {
box.checked = false;
document.getElementById("toppings").replaceChildren();
boxes.checked = false;
const fieldset = document.getElementById("topping-boxes");
const boxes = fieldset.getElementsByTagName("input");
}
```

- Assemble the program in the Parsons 1 section of `practice.js`. Two of the lines are wrong.
- What does `parsons1` do? What should it be named?

---

## Solution (You): Parsons 1

<style scoped>
pre { font-size: 0.75em; }
</style>

```js
function parsons1() {
  const fieldset = document.getElementById("topping-boxes");
  const boxes = fieldset.getElementsByTagName("input");

  for (let box of boxes) {
    box.checked = false;
  }

  document.getElementById("toppings").replaceChildren();
  showOrder();
}
```

It unticks every topping box and takes every piece off the pizza, so `clearToppings` would be a better name. Setting `checked` from code doesn't call `onchange`, so it empties `toppings` itself.

---

## Problem (You): Extras

Done early? Pick any of these. Their solutions come after **Questions?**.

- **More on large.** Give each topping one piece for every 48 pixels of the pizza's width: 5 on a small, 6 on a medium, and 7 on a large.
- **Ready time.** The receipt should say when the pizza will be ready, 20 minutes from now, like `Ready at 7:05 PM`.
- **Pepperoni.** Add a Pepperoni topping whose pieces are red circles, drawn by CSS with no emoji.

---

# Conclusion

---

## The Finished Page

Every solution from today, together:

- [Pie Chart](https://bi3mer.github.io/lectures/cs213/lectures/14-js-dom/examples/pizza-final/), running live
- [index.html](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/14-js-dom/examples/pizza-final/index.html) and [practice.js](https://github.com/bi3mer/lectures/blob/main/cs213/lectures/14-js-dom/examples/pizza-final/practice.js) on GitHub, with every section filled in

`index.html` is the same as the starter's. The extras aren't in it.

---

## Summary

- `getElementsByTagName`, `getElementsByClassName`, and `getElementsByName` return live collections, empty when nothing matches.
- A collection isn't an element, so loop over it with `for...of` to change each one.
- `querySelector` takes a CSS selector, `#` and all, and returns the first match or `null`.
- `querySelectorAll` returns a snapshot, so a loop can remove its elements safely.
- `classList` adds and removes one class. `className` replaces them all.
- A look known ahead of time is a CSS class. A value worked out in code goes in `style`.
- `createElement` makes an element, and `append` or `prepend` puts it on the page.
- `remove`, `replaceWith`, and `replaceChildren` take elements off, swap them, or empty an element.

---

# Questions?

---

## Extras: More on Large

In `showTopping`, in place of the loop that adds 6 pieces:

```js
const size = document.querySelector('input[name="size"]:checked').value;
const count = sizes[size].width / 48;

for (let i = 0; i < count; i++) {
  addPiece(name);
}
```

Pieces already on the pizza stay when the size changes.

---

## Extras: Ready Time

In `placeOrder`, in place of the line that sets the message's text:

```js
const ready = new Date();
ready.setMinutes(ready.getMinutes() + 20);

const short = { hour: "numeric", minute: "2-digit" };
message.textContent = `Ready at ${ready.toLocaleTimeString("en-US", short)}`;
```

`setMinutes` rolls past the hour, as [`setDate` rolls past the month](../12-js-math-dates-strings/lecture.html#21), and [`short`](../12-js-math-dates-strings/lecture.html#19) leaves off the seconds.

---

## Extras: Pepperoni

<style scoped>
pre { font-size: 0.7em; }
</style>

In `index.html`, add a box at the end of the Toppings fieldset, and a rule to the `<style>`:

<div class="pair">
<div>

```html
<div>
  <input
    id="pepperoni"
    name="topping"
    type="checkbox"
    value="pepperoni"
    onchange="showTopping('pepperoni')"
  />
  <label for="pepperoni">Pepperoni</label>
</div>
```

</div>
<div>

```css
.pepperoni {
  width: 10%;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: #a3241b;
}
```

</div>
</div>

In `practice.js`, add `pepperoni: { label: "Pepperoni", emoji: "" },` to `toppings`. Each piece is an empty `<span>`, and its `pepperoni` class draws it.
