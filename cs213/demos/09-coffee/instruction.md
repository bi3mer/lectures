# Build Colan's Coffee

You will build a coffee shop page that changes with the time of day and the stock on hand, using `if`, `else`, and logical operators. `hour` holds the current hour, from 0 to 23. To test another time, change `new Date().getHours()` on line 1 to a number, like 20.

See the [finished page](final/) to know where you are headed, and the [lecture](../../lectures/09-js-if/lecture.html) if a step uses something you want to review.

## Setup

1. Open the [starter files on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/09-coffee/starter): `index.html` and `practice.js`.
2. Make a new folder in WebStorm. For each file, click **Copy raw file**, the copy icon above the code, and paste it into a new file with the same name.
3. Open `index.html` in the browser, and reload the page after each step.

`practice.js` has a banner comment for each section below. Commented-out page lines in a section are there for you to use: uncomment them where your code needs them.

## Step 1: Open Sign

The shop opens at hour 7 and closes at hour 18. During those hours, make the sign green. Otherwise, the sign says `Closed` on red, and the page turns gray.

```js
if (hour >= 7 && hour < 18) {
  document.getElementById("sign").style.backgroundColor = "green";
} else {
  document.getElementById("sign").textContent = "Closed";
  document.getElementById("sign").style.backgroundColor = "red";
  document.body.style.backgroundColor = "gray";
}
```

Set `hour` to 20 and reload: the sign should turn red.

## Step 2: Sold Out

Turn off the **Buy** button when no bags are left. `disabled` takes a boolean, so the comparison's answer goes straight in.

```js
document.getElementById("buy").disabled = bagsLeft === 0;
```

Set `bagsLeft` to 0 and reload: the button should turn gray.

## Step 3: Age Check

The age box calls `checkAge()` as you type. Turn off the latte's **Order** button for anyone under 12.

```js
function checkAge() {
  let age = Number(document.getElementById("age").value);

  document.getElementById("latte").disabled = age < 12;
}
```

Type 10 in the box: **Order** should turn off.

## Step 4: Member Name

The name box calls `showName()` as you type. Show the name on the rewards card, or `Guest` if the box is empty.

```js
function showName() {
  let name = document.getElementById("name").value;

  if (name === "") {
    document.getElementById("member").textContent = "Guest";
  } else {
    document.getElementById("member").textContent = name;
  }
}
```

## Step 5: Low Stock

Show one of three stock messages. Check for 0 first, because 0 is also under 5.

```js
if (bagsLeft === 0) {
  document.getElementById("stock").textContent = "Sold out.";
  document.getElementById("stock").style.color = "red";
  document.getElementById("bag").style.opacity = "0.3";
} else if (bagsLeft < 5) {
  document.getElementById("stock").textContent = `Only ${bagsLeft} left!`;
  document.getElementById("stock").style.color = "orange";
} else {
  document.getElementById("stock").textContent = "In stock.";
}
```

Try `bagsLeft` at 0, 3, and 8.

## Step 6: Reward Levels

The points box calls `showRewards()`. Set the badge and the card's border from the points. Early birds (before hour 9) and members with 500 points or more also get a free pastry.

```js
function showRewards() {
  let points = Number(document.getElementById("points").value);

  if (points >= 500) {
    document.getElementById("badge").textContent = "🥇";
    document.getElementById("rewards").style.borderColor = "gold";
  } else if (points >= 200) {
    document.getElementById("badge").textContent = "🥈";
    document.getElementById("rewards").style.borderColor = "silver";
  } else {
    document.getElementById("badge").textContent = "🥉";
    document.getElementById("rewards").style.borderColor = "tan";
  }

  if (hour < 9 || points >= 500) {
    document.getElementById("pastry").hidden = false;
  } else {
    document.getElementById("pastry").hidden = true;
  }
}

showRewards();
```

Type 500 in the points box: the badge should turn gold, and the pastry note should appear.

## Step 7: Greeting

Greet the customer by the time of day.

```js
function showGreeting() {
  if (hour < 12) {
    document.getElementById("greeting").textContent = "Good morning! ☀️";
  } else if (hour < 18) {
    document.getElementById("greeting").textContent = "Good afternoon! 🌤️";
  } else {
    document.getElementById("greeting").textContent = "Good evening! 🌙";
  }
}

showGreeting();
```

## Step 8: Happy Hour

From hour 14 until hour 16, cross out `$4.50` in red and show `$2.25`.

```js
if (hour >= 14 && hour < 16) {
  document.getElementById("latte-price").style.textDecoration = "line-through";
  document.getElementById("latte-price").style.color = "red";
  document.getElementById("happy-price").hidden = false;
}
```

Set `hour` to 15 and reload to check it.

## Step 9: Latte Order

The latte's button flips between `Order` and `Cancel`. `!` flips the boolean, and the ternary picks the text.

```js
let ordered = false;

function toggleOrder() {
  ordered = !ordered;
  document.getElementById("latte").textContent = ordered ? "Cancel" : "Order";
}
```

## Step 10: Buy a Bag

Each click of **Buy** takes one bag off and updates the page.

```js
function buyBag() {
  bagsLeft = bagsLeft - 1;

  let isSoldOut = bagsLeft === 0;
  let message = isSoldOut ? "Sold out." : `Only ${bagsLeft} left!`;

  document.getElementById("stock").textContent = message;
  document.getElementById("stock").style.color = isSoldOut ? "red" : "orange";
  document.getElementById("bag").style.opacity = isSoldOut ? "0.3" : "1";
  document.getElementById("buy").disabled = isSoldOut;
}
```

Click **Buy** three times: the page should say `Sold out.`

## Compare

Your page should now match the [finished page](final/). If something differs, compare your files with the [final code on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/09-coffee/final).
