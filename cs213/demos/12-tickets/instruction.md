# Build a Ticket Page

You will build a page that sells tickets to a concert by The Semicolons, using `Math`, dates, and string methods.

See the [finished page](final/) to know where you are headed, and the [lecture](../../lectures/12-js-math-dates-strings/lecture.html) if a step uses something you want to review.

## Setup

1. Open the [starter files on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/12-tickets/starter): `index.html` and `practice.js`.
2. Make a new folder in WebStorm. For each file, click **Copy raw file**, the copy icon above the code, and paste it into a new file with the same name.
3. Open `index.html` in the browser, and reload the page after each step.

`practice.js` has a banner comment for each section below. Commented-out page lines in a section are there for you to use: uncomment them where your code needs them.

## Step 1: To Cents

Fill in `toCents(amount)`, so it rounds to the nearest cent.

```js
function toCents(amount) {
  return Math.round(amount * 100) / 100;
}
```

`toCents(15.299999999999999)` should return `15.3`.

## Step 2: Ticket Limit and Order Total

`showTotal()` has two sections. Turn `count` into a number on its first line:

```js
let count = Number(document.getElementById("count").value);
```

Then keep the count a whole number from 1 to 8:

```js
count = Math.floor(count);
count = Math.max(count, 1);
count = Math.min(count, 8);
document.getElementById("count").value = count;
```

Then take `percentOff` percent off and add a 12% fee:

```js
function showTotal() {
  let count = Number(document.getElementById("count").value);
```

Two tickets should cost $85.00, plus a $10.20 fee.

## Step 3: Countdown

Show the whole days from now until `showTime`.

```js
function showCountdown() {
  const ms = showTime - new Date();
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  if (ms > 0) {
    document.getElementById("countdown").textContent = `Starts in ${days} days`;
  } else {
    document.getElementById("countdown").textContent = "The show has started";
  }
}

showCountdown();
setInterval(showCountdown, 1000); // calls showCountdown again every 1000 ms
```

## Step 4: Show Date

Write when the show is, like `Friday, December 4 at 8:00 PM`.

```js
const full = { weekday: "long", month: "long", day: "numeric" };
const date = showTime.toLocaleDateString("en-US", full);
const short = { hour: "numeric", minute: "2-digit" };
const time = showTime.toLocaleTimeString("en-US", short);

document.getElementById("when").textContent = `${date} at ${time}`;
```

## Step 5: Promo Code

A code like `21310` takes 10% off. The number after `213` is the percent, from 1 to 50.

```js
function applyCode() {
  const code = document.getElementById("code").value.trim();
  const percent = Number(code.slice(3));

  if (code.startsWith("213") && percent >= 1 && percent <= 50) {
    percentOff = percent;
    document.getElementById("code-message").textContent = `${percent}% off`;
  } else {
    percentOff = 0;
    document.getElementById("code-message").textContent = "Unknown code";
  }

  showTotal();
}
```

Try `21310`, then `  21310  `, then `21399`.

## Step 6: Name on Ticket

A name like `ada lovelace` goes on the ticket as `LOVELACE, ada`.

```js
function showName() {
  const name = document.getElementById("name").value.trim();

  if (name === "") {
    document.getElementById("ticket-name").textContent = "GUEST";
  } else {
    const parts = name.split(" ");
    if (parts.length === 1) {
      document.getElementById("ticket-name").textContent = name.toUpperCase();
    } else {
      const first = parts.slice(0, -1).join(" ");
      const last = parts[parts.length - 1].toUpperCase();
      document.getElementById("ticket-name").textContent = `${last}, ${first}`;
    }
  }
}
```

## Step 7: Confirmation

**Buy** picks a random seat and a confirmation code. `padStart` needs a string, so `String()` comes first.

```js
function buyTicket() {
  const rows = "ABCDEFGH";
  const row = rows[Math.floor(Math.random() * rows.length)];
  const seat = Math.floor(Math.random() * 20) + 1;
  const number = Math.floor(Math.random() * 10000);
  const code = "SC-" + String(number).padStart(4, "0");

  document.getElementById("confirmation").textContent = `Row ${row}, seat ${seat}, ${code}`;
}
```

## Compare

Your page should now match the [finished page](final/). If something differs, compare your files with the [final code on GitHub](https://github.com/bi3mer/lectures/tree/main/cs213/demos/12-tickets/final).
