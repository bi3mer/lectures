# Numbers, Math, Dates, and Strings Cheatsheet

This is everything from the [Numbers, Math, Dates, and Strings](lecture-math-dates-strings-js.html) lecture. It covers numbers, the `Math` object, and dates, with string methods at the end. Every example runs on its own in the browser's console or in Node, and a `// comment` after a `console.log` shows what it prints.

## Decimals Aren't Exact

<!-- prettier-ignore -->
```js
console.log(0.1 + 0.2);         // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
console.log(127.5 * 0.12);      // 15.299999999999999
```

JavaScript stores every number in binary, where the places after the point are halves, quarters, eighths, and so on. Most decimals, like 0.1, [have no exact binary form](lecture-math-dates-strings-js.html#51), just as 1/3 has no exact decimal form (0.333...). JavaScript keeps the closest binary number instead, so math on decimals can land a tiny bit off.

`0.1` still prints as `0.1`, because JavaScript [prints the shortest decimal that leads back to the stored number](lecture-math-dates-strings-js.html#53). `0.1 + 0.2` is stored as a different number than `0.3`, so it prints with more digits. For money, [round to cents](#rounding-to-cents).

## Checking a Number

<!-- prettier-ignore -->
```js
let count = Number("two");
console.log(count);                 // NaN
console.log(count === NaN);         // false
console.log(Number.isNaN(count));   // true

console.log(Number.isInteger(3));   // true
console.log(Number.isInteger(2.5)); // false
console.log(Number.isInteger(NaN)); // false
console.log(Number.isInteger("3")); // false
```

**`NaN`** ("Not a Number") is a special number that stands for a missing numeric answer, like the result of `Number("two")`. It is the only value that isn't equal to itself, so `=== NaN` is always `false`. Check for it with `Number.isNaN`.

`Number.isInteger(x)` is `true` only when `x` is a whole number. It is `false` for decimals, for `NaN`, and for strings, even `"3"`.

## Showing Numbers as Text

<!-- prettier-ignore -->
```js
let total = 1234.5;
let money = { style: "currency", currency: "USD" };

console.log(total.toLocaleString("en-US"));        // 1,234.5
console.log(total.toLocaleString("en-US", money)); // $1,234.50
console.log(total.toLocaleString("de-DE"));        // 1.234,5
console.log(total.toFixed(2));                     // 1234.50
```

`toLocaleString` returns the number as a string, formatted for a **locale**. A locale is a language and region, named by a code like `"en-US"` (English in the United States) or `"de-DE"` (German in Germany). With no arguments, `toLocaleString` follows the browser's language, so the same code shows `1.234,5` in a German browser. The options in `money` add a dollar sign and exactly two decimal places.

[`toFixed(2)`](lecture-js.html#78) also returns a string. It rounds to two decimal places and adds no commas or dollar sign.

The ticket page wraps the money format in a function:

<!-- prettier-ignore -->
```js
function dollars(amount) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

console.log(dollars(1234.5)); // $1,234.50
console.log(dollars(85));     // $85.00
```

## The `Math` Object

**`Math`** is an object built into JavaScript. Its properties are constants, like `Math.PI`, and functions, like `Math.sqrt`.

| Write               | Meaning                                                          | Example                          |
| ------------------- | ---------------------------------------------------------------- | -------------------------------- |
| `Math.PI`           | the number π                                                     | `Math.PI` is `3.141592653589793` |
| `Math.sqrt(x)`      | the square root of `x`                                           | `Math.sqrt(16)` is `4`           |
| `Math.abs(x)`       | `x` without its minus sign                                       | `Math.abs(-7.5)` is `7.5`        |
| `Math.pow(x, y)`    | `x` to the power `y`, the same as [`x ** y`](lecture-js.html#71) | `Math.pow(2, 10)` is `1024`      |
| `Math.round(x)`     | `x` rounded to the nearest whole number                          | `Math.round(4.5)` is `5`         |
| `Math.floor(x)`     | `x` rounded down to a whole number                               | `Math.floor(4.8)` is `4`         |
| `Math.ceil(x)`      | `x` rounded up to a whole number                                 | `Math.ceil(4.2)` is `5`          |
| `Math.min(a, b, …)` | the smallest of its arguments                                    | `Math.min(4, 9, 2)` is `2`       |
| `Math.max(a, b, …)` | the largest of its arguments                                     | `Math.max(4, 9, 2)` is `9`       |
| `Math.random()`     | a random number from 0 up to, but not including, 1               | a new number on every call       |

### Rounding: `round`, `floor`, and `ceil`

| `x`    | `Math.round(x)` | `Math.floor(x)` | `Math.ceil(x)` |
| ------ | --------------- | --------------- | -------------- |
| `4.2`  | `4`             | `4`             | `5`            |
| `4.5`  | `5`             | `4`             | `5`            |
| `4.8`  | `5`             | `4`             | `5`            |
| `-4.2` | `-4`            | `-5`            | `-4`           |
| `-4.5` | `-4`            | `-5`            | `-4`           |

`round` goes to the nearest whole number, and a number exactly halfway, like `4.5`, goes up. `floor` always goes down, and `ceil` always goes up. Up means toward the larger number and down toward the smaller, so `Math.floor(-4.2)` is `-5` and `Math.round(-4.5)` is `-4`.

### Rounding to Cents

<!-- prettier-ignore -->
```js
let fee = 127.5 * 0.12;
console.log(fee);                         // 15.299999999999999
console.log(Math.round(fee * 100) / 100); // 15.3
console.log(fee.toFixed(2));              // 15.30
```

`* 100` turns dollars into cents, `Math.round` keeps whole cents, and `/ 100` turns them back into dollars. The result is still a number, so it can go into more math. `toFixed(2)` rounds too, but it returns a string, and [`+` glues a string](lecture-js.html#74) instead of adding:

<!-- prettier-ignore -->
```js
let fee = 127.5 * 0.12;
console.log(Math.round(fee * 100) / 100 + 1); // 16.3
console.log(fee.toFixed(2) + 1);              // 15.301
```

Round with `Math.round(x * 100) / 100` while calculating. Turn the result into text with `toFixed(2)` or `toLocaleString` only to show it. A number keeps no trailing zeros, so `15.30` prints as `15.3` until it is formatted.

The ticket page rounds each amount before adding them, so the lines on the page add up to the total. With 15% off, three $42.50 tickets cost 108.375, which rounds to 108.38:

<!-- prettier-ignore -->
```js
let price = 42.5;
let percentOff = 15;
let count = 3;

let subtotal = count * price * (1 - percentOff / 100);
console.log(subtotal);       // 108.375

subtotal = Math.round(subtotal * 100) / 100;
let fee = Math.round(subtotal * 0.12 * 100) / 100;
console.log(subtotal);       // 108.38
console.log(fee);            // 13.01
console.log(subtotal + fee); // 121.39
```

`1 - percentOff / 100` is the share of the price left to pay: `0.85` for 15% off.

### Limits with `min` and `max`

<!-- prettier-ignore -->
```js
console.log(Math.min(4, 9, 2)); // 2
console.log(Math.max(4, 9, 2)); // 9
```

Both take any number of arguments. `Math.min(count, 8)` returns 8 whenever `count` is larger, so it sets a highest value. `Math.max(count, 1)` returns 1 whenever `count` is smaller, so it sets a lowest value. The ticket page keeps the number of tickets a whole number from 1 to 8:

<!-- prettier-ignore -->
```js
function limitTickets(count) {
  count = Math.floor(count);
  count = Math.max(count, 1);
  count = Math.min(count, 8);
  return count;
}

console.log(limitTickets(20));         // 8
console.log(limitTickets(2.5));        // 2
console.log(limitTickets(5));          // 5
console.log(limitTickets(Number(""))); // 1
```

An empty box's value is `""`, and `Number("")` is `0`, so it becomes 1.

### Spreading an Array: `...`

<!-- prettier-ignore -->
```js
let prices = [35, 52.5, 89.5];
console.log(Math.max(prices));    // NaN
console.log(Math.max(...prices)); // 89.5
console.log(Math.min(...prices)); // 35
```

`Math.max` takes numbers, not an array, so passing it the array returns `NaN`. Writing `...` before an array **spreads** it, passing each item as its own argument. `Math.max(...prices)` is the same call as `Math.max(35, 52.5, 89.5)`.

### Random Numbers

`Math.random()` takes no arguments. Each call returns a new number from 0 up to, but not including, 1, so it prints something different every time. For a whole number, multiply it, then round down:

```js
let roll = Math.floor(Math.random() * 6) + 1;
```

| Step              | Smallest | Largest  |
| ----------------- | -------- | -------- |
| `Math.random()`   | `0`      | `0.999…` |
| `* 6`             | `0`      | `5.999…` |
| `Math.floor(...)` | `0`      | `5`      |
| `+ 1`             | `1`      | `6`      |

`Math.floor(Math.random() * n) + 1` is a whole number from 1 to `n`. Without the `+ 1`, it is 0 to `n - 1`, a random index into a list of `n` items. The ticket page picks a random row and seat this way, so this prints something new on every run:

```js
let rows = "ABCDEFGH";
let row = rows[Math.floor(Math.random() * rows.length)];
let seat = Math.floor(Math.random() * 20) + 1;
console.log(`Row ${row}, seat ${seat}`);
```

## Dates

A **`Date`** is an object that holds one moment in time. `new` makes a new object of a built-in type, so `new Date()` makes a Date for the moment that line runs.

**Months and weekdays count from 0.** January is month 0 and December is month 11. Sunday is day 0 of the week and Saturday is day 6. The day of the month counts from 1, as on a calendar.

### Making a Date

```js
let now = new Date();
let show = new Date(2026, 11, 4, 20, 0);
```

The numbers are the year, month, day, hour (on a 24-hour clock), and minute, in your computer's time zone. Month 11 is December, so `show` is Friday, December 4, 2026, at 8:00 PM.

A month past 11 rolls over into the next year: `new Date(2026, 12, 4)` is January 4, 2027. Months start at 0 because JavaScript 1.0 [copied Java's date code](lecture-math-dates-strings-js.html#14), months and all.

`console.log(show)` prints the whole date along with your computer's time zone, so its output differs between computers. The methods below read one part at a time.

### Reading the Parts

<!-- prettier-ignore -->
```js
let show = new Date(2026, 11, 4, 20, 0);
console.log(show.getFullYear()); // 2026
console.log(show.getMonth());    // 11
console.log(show.getDate());     // 4
console.log(show.getDay());      // 5
console.log(show.getHours());    // 20
console.log(show.getMinutes());  // 0
```

| Method          | Returns                      | Range                            | Set with        |
| --------------- | ---------------------------- | -------------------------------- | --------------- |
| `getFullYear()` | the year                     | `2026`                           | `setFullYear()` |
| `getMonth()`    | the month                    | `0` (January) to `11` (December) | `setMonth()`    |
| `getDate()`     | the day of the month         | `1` to `31`                      | `setDate()`     |
| `getDay()`      | the day of the week          | `0` (Sunday) to `6` (Saturday)   | none            |
| `getHours()`    | the hour, on a 24-hour clock | `0` to `23`                      | `setHours()`    |
| `getMinutes()`  | the minute                   | `0` to `59`                      | `setMinutes()`  |

Don't mix up `getDate`, the day of the month, with `getDay`, the day of the week. Use `getFullYear`, not `getYear`: `getYear` returns the years since 1900, which is `126` for 2026.

### Changing a Date

<!-- prettier-ignore -->
```js
let due = new Date(2026, 9, 30, 17, 0); // Friday, October 30, 5:00 PM
due.setDate(due.getDate() + 3);

console.log(due.getMonth()); // 10
console.log(due.getDate());  // 2
console.log(due.getDay());   // 1

due.setDay(1);               // TypeError
```

`setDate` changes the Date it is called on. October has 31 days, so day 33 rolls over to November 2 (month 10), a Monday (day 1).

Every `get` method in the table above except `getDay` has a `set` partner. There is no `setDay`, so calling it is a `TypeError`. To move to another day of the week, add days with `setDate`.

### Showing a Date as Text

<!-- prettier-ignore -->
```js
let show = new Date(2026, 11, 4, 20, 0);
let short = { hour: "numeric", minute: "2-digit" };

console.log(show.toLocaleDateString("en-US"));        // 12/4/2026
console.log(show.toLocaleTimeString("en-US"));        // 8:00:00 PM
console.log(show.toLocaleTimeString("en-US", short)); // 8:00 PM
console.log(show.toLocaleDateString("en-GB"));        // 04/12/2026
```

Like `toLocaleString` for numbers, both return strings in a locale's format, and with no arguments they follow the browser's language. `"en-GB"` is British English, which puts the day first.

The options in `short` name the parts to show: the hour with no leading zero (`"numeric"`) and the minute as two digits (`"2-digit"`). Parts left out, like the seconds, don't appear.

### Day and Month Names

<!-- prettier-ignore -->
```js
let show = new Date(2026, 11, 4, 20, 0);
let month = { month: "long" };
let weekday = { weekday: "long" };
let full = { weekday: "long", month: "long", day: "numeric" };

console.log(show.toLocaleDateString("en-US", month));   // December
console.log(show.toLocaleDateString("en-US", weekday)); // Friday
console.log(show.toLocaleDateString("en-US", full));    // Friday, December 4
console.log(show.toLocaleDateString("es-ES", full));    // viernes, 4 de diciembre
```

The options name the parts to show. `"long"` spells out a name, and `"short"` gives an abbreviation, like `Dec` or `Fri`. The browser has the names built in, in many languages, so there is no list of names to type out. The locale goes first and the options second.

The ticket page puts the date and the time together:

<!-- prettier-ignore -->
```js
let show = new Date(2026, 11, 4, 20, 0);
let full = { weekday: "long", month: "long", day: "numeric" };
let short = { hour: "numeric", minute: "2-digit" };

let date = show.toLocaleDateString("en-US", full);
let time = show.toLocaleTimeString("en-US", short);
console.log(`${date} at ${time}`); // Friday, December 4 at 8:00 PM
```

### Milliseconds Since 1970

Inside, a Date is one number: the milliseconds since midnight on January 1, 1970, in **UTC** (Coordinated Universal Time), the reference time that time zones are measured from. `show.getTime()` returns that number for `show`, and `Date.now()` returns it for right now. The first depends on your computer's time zone and the second on the moment you run it, so neither prints the same number everywhere.

| One... | Milliseconds | Written as            |
| ------ | ------------ | --------------------- |
| second | `1000`       | `1000`                |
| minute | `60000`      | `1000 * 60`           |
| hour   | `3600000`    | `1000 * 60 * 60`      |
| day    | `86400000`   | `1000 * 60 * 60 * 24` |

### Subtracting Dates

<!-- prettier-ignore -->
```js
let now = new Date(2026, 9, 20, 9, 30); // Tuesday, October 20, 9:30 AM
let due = new Date(2026, 9, 23, 17, 0); // Friday, October 23, 5:00 PM

console.log(due - now); // 286200000
console.log(due > now); // true
console.log(due < now); // false
```

`-`, `<`, and `>` turn each Date into its milliseconds, so `due - now` is the time between them, in milliseconds. `+` glues strings instead, so `due + now` is one long string of both dates, not a number.

### From Milliseconds to Days, Hours, and Minutes

<!-- prettier-ignore -->
```js
let ms = 286200000; // due - now

let days = Math.floor(ms / (1000 * 60 * 60 * 24));
let hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
let minutes = Math.floor(ms / (1000 * 60)) % 60;

console.log(days);                             // 3
console.log(hours);                            // 7
console.log(minutes);                          // 30
console.log(`${days}d ${hours}h ${minutes}m`); // 3d 7h 30m
```

`ms / (1000 * 60 * 60)` is 79.5 hours. `Math.floor` keeps the 79 whole hours, and [`% 24`](lecture-js.html#72) keeps the remainder after dividing by 24: the 7 hours that don't fill a day. The minutes work the same way, with 60 minutes to an hour.

On the ticket page, the countdown subtracts the current time, `new Date()`, from `show`, so its output changes as time passes:

```js
let show = new Date(2026, 11, 4, 20, 0);

function countdownText() {
  let ms = show - new Date();
  let days = Math.floor(ms / (1000 * 60 * 60 * 24));
  let hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
  let minutes = Math.floor(ms / (1000 * 60)) % 60;

  if (ms > 0) {
    return `Starts in ${days}d ${hours}h ${minutes}m`;
  } else {
    return "The show has started";
  }
}

console.log(countdownText());
```

After the show, `ms` is negative, so the `else` keeps the countdown from going below zero. The page's `showCountdown()` puts this text in the header, and `setInterval(showCountdown, 1000)` calls it again every 1000 ms.

## Common Mistakes

| Code                                             | Problem                                                                        | Fix                                                   |
| ------------------------------------------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------- |
| `count === NaN`                                  | always `false`: `NaN` isn't equal to itself                                    | `Number.isNaN(count)`                                 |
| `fee.toFixed(2) + 1`                             | `"15.301"`: `toFixed` returns a string, and `+` glues                          | `Math.round(fee * 100) / 100 + 1`                     |
| `Math.max(prices)`                               | `NaN`: `Math.max` takes numbers, not an array                                  | `Math.max(...prices)`                                 |
| `Math.floor(Math.random()) * 6 + 1`              | always `1`: `Math.floor(Math.random())` is always `0`                          | `Math.floor(Math.random() * 6) + 1`                   |
| `new Date(2026, 12, 4)` for December 4           | January 4, 2027: months count from 0                                           | `new Date(2026, 11, 4)`                               |
| `show.getDate()` for the day of the week         | `4` for Friday, December 4: `getDate` is the day of the month                  | `show.getDay()`                                       |
| `show.toLocaleDateString({ month: "long" })`     | a date with no names, like `12/4/2026`: the options went where the locale goes | `show.toLocaleDateString("en-US", { month: "long" })` |
| `show.getYear()`                                 | `126`: the years since 1900                                                    | `show.getFullYear()`                                  |
| `show.setDay(1)`                                 | `TypeError`: there is no `setDay`                                              | `setDate`, with a day of the month                    |
| `due + now`                                      | one long string, not the time between them                                     | `due - now`                                           |
| `Math.floor(ms / (1000 * 60 * 60))` as the hours | `79`: it counts the hours in the full days too                                 | add `% 24`                                            |

## String Methods

A string method never changes its string. It returns a new value, so keep the result by assigning it to a variable.

| Method                | Returns                                                         | Example                                        |
| --------------------- | --------------------------------------------------------------- | ---------------------------------------------- |
| `s.toUpperCase()`     | `s` in all uppercase                                            | `"semi10".toUpperCase()` is `"SEMI10"`         |
| `s.toLowerCase()`     | `s` in all lowercase                                            | `"SEMI10".toLowerCase()` is `"semi10"`         |
| `s.trim()`            | `s` without the spaces, tabs, and line breaks at either end     | `"  semi10 ".trim()` is `"semi10"`             |
| `s.includes(x)`       | `true` if `x` appears anywhere in `s`                           | `"ada@school.edu".includes("@")` is `true`     |
| `s.startsWith(x)`     | `true` if `s` begins with `x`                                   | `"SEMI10".startsWith("SEMI")` is `true`        |
| `s.endsWith(x)`       | `true` if `s` ends with `x`                                     | `"ada@school.edu".endsWith(".edu")` is `true`  |
| `s.slice(start, end)` | the characters from `start` up to, but not including, `end`     | `"SEMI10".slice(0, 4)` is `"SEMI"`             |
| `s.split(x)`          | an array of the pieces between each `x`                         | `"20:00".split(":")` is `["20", "00"]`         |
| `s.replaceAll(a, b)`  | `s` with every `a` swapped for `b`                              | `"1,250".replaceAll(",", "")` is `"1250"`      |
| `s.replace(a, b)`     | `s` with only the first `a` swapped for `b`                     | `"1,250,000".replace(",", "")` is `"1250,000"` |
| `s.padStart(n, x)`    | `s` with `x` added to the front until it is `n` characters long | `"5".padStart(2, "0")` is `"05"`               |
| `s.repeat(n)`         | `s` glued to itself `n` times                                   | `"█".repeat(6)` is `"██████"`                  |

### Strings Don't Change

<!-- prettier-ignore -->
```js
let code = "semi10";
code.toUpperCase();
console.log(code); // semi10

code = code.toUpperCase();
console.log(code); // SEMI10
```

The second line builds `"SEMI10"` and throws it away, so `code` is still `"semi10"`. Assigning the result back to `code` keeps it.

### Trimming and Chaining

<!-- prettier-ignore -->
```js
let typed = "  semi10 ";
console.log(`[${typed}]`);                      // [  semi10 ]
console.log(`[${typed.trim()}]`);               // [semi10]
console.log(`[${typed.trim().toUpperCase()}]`); // [SEMI10]
console.log(`[${"  ada  lovelace ".trim()}]`);  // [ada  lovelace]
```

The brackets show where each string starts and ends. `trim` removes the spaces at both ends, but not the ones in the middle. People type stray spaces into boxes, so trim what a box gives you.

Calling a method on the result of another method is **chaining**. It runs left to right: `trim` returns `"semi10"`, and `toUpperCase` runs on that.

### Searching: `includes`, `startsWith`, and `endsWith`

<!-- prettier-ignore -->
```js
let email = "ada@school.edu";
console.log(email.includes("@"));      // true
console.log(email.startsWith("ada"));  // true
console.log(email.endsWith(".edu"));   // true
console.log(email.includes("School")); // false
```

Each one returns a boolean. They look for an exact match, so `"School"` doesn't match `"school"`.

### Cutting: `slice` and `split`

<!-- prettier-ignore -->
```js
let code = "SEMI10";
console.log(code.slice(0, 4)); // SEMI
console.log(code.slice(4));    // 10
console.log(code.slice(-2));   // 10
console.log(code[-1]);         // undefined

let word = "aDA";
word = word[0].toUpperCase() + word.slice(1).toLowerCase();
console.log(word); // Ada
```

`slice(start, end)` copies from `start` up to, but not including, `end`. With no `end`, it copies to the end of the string. A negative index counts back from the end in `slice`, but not in brackets, so `code[-1]` is `undefined`.

<!-- prettier-ignore -->
```js
let parts = "Ada King Lovelace".split(" ");
console.log(parts);                   // ["Ada", "King", "Lovelace"]
console.log(parts[parts.length - 1]); // Lovelace
console.log("20:00".split(":"));      // ["20", "00"]
```

`split` cuts a string at each match of its argument and returns an array of the pieces. The pieces are strings, even `"20"`, so convert them with `Number()` before doing math.

### Replacing: `replaceAll` and `replace`

<!-- prettier-ignore -->
```js
let typed = "1,250";
console.log(Number(typed));                     // NaN
console.log(Number(typed.replaceAll(",", ""))); // 1250
console.log("1,250,000".replace(",", ""));      // 1250,000
```

`replaceAll` swaps every match of its first argument for its second, and `""` deletes them. `replace` swaps only the first match.

### Padding and Repeating: `padStart` and `repeat`

<!-- prettier-ignore -->
```js
let minutes = 5;
console.log(String(minutes).padStart(2, "0"));        // 05
console.log(String(12).padStart(2, "0"));             // 12
console.log(String(42).padStart(4, "0"));             // 0042
console.log(`8:${String(minutes).padStart(2, "0")}`); // 8:05
console.log(minutes.padStart(2, "0"));                // TypeError
```

`padStart(2, "0")` adds `"0"`s to the front until the string is 2 characters long, as a clock shows `8:05`. If the string is already long enough, `padStart` leaves it as it is. A number has no `padStart`, so it needs [`String()`](lecture-js.html#75) first.

<!-- prettier-ignore -->
```js
console.log("█".repeat(6));                  // ██████
console.log("★".repeat(4) + "☆".repeat(1)); // ★★★★☆
```

`repeat` glues a string to itself that many times, so it can draw a bar or a star rating without a loop.

### On the Ticket Page

A promo code like `SEMI10` takes 10% off, and `semi10` with stray spaces works too. The number after `SEMI` is the percent:

<!-- prettier-ignore -->
```js
function promoPercent(typed) {
  let code = typed.trim().toUpperCase();
  let percent = Number(code.slice(4));

  if (code.startsWith("SEMI") && Number.isInteger(percent) && percent > 0) {
    return percent;
  } else {
    return 0;
  }
}

console.log(promoPercent("SEMI10"));    // 10
console.log(promoPercent("  semi15 ")); // 15
console.log(promoPercent("SEMIX"));     // 0
console.log(promoPercent("SEMI"));      // 0
```

`SEMIX` makes `percent` `NaN`, and `SEMI` alone makes it `0`, so both are unknown codes.

The ticket shows the last name in capitals, then the first name:

<!-- prettier-ignore -->
```js
function ticketName(typed) {
  let name = typed.trim();

  if (name === "") {
    return "GUEST";
  } else {
    let parts = name.split(" ");
    let first = parts[0];
    first = first[0].toUpperCase() + first.slice(1).toLowerCase();
    let last = parts[parts.length - 1].toUpperCase();
    return `${last}, ${first}`;
  }
}

console.log(ticketName("ada lovelace"));         // LOVELACE, Ada
console.log(ticketName("  ADA king LOVELACE ")); // LOVELACE, Ada
console.log(ticketName("   "));                  // GUEST
```

Without the empty check, `first[0]` is `undefined`, and calling `toUpperCase()` on it is a `TypeError`. A middle name is skipped, since `last` is the last part.

The confirmation code pads a random number to 4 digits:

<!-- prettier-ignore -->
```js
let number = 42;
console.log("SC-" + String(number).padStart(4, "0")); // SC-0042
```

### Common String Mistakes

| Code                             | Problem                                        | Fix                                 |
| -------------------------------- | ---------------------------------------------- | ----------------------------------- |
| `code.toUpperCase();` on its own | `code` doesn't change                          | `code = code.toUpperCase();`        |
| `minutes.padStart(2, "0")`       | `TypeError`: a number has no `padStart`        | `String(minutes).padStart(2, "0")`  |
| `"1,250,000".replace(",", "")`   | `"1250,000"`: only the first comma goes        | `"1,250,000".replaceAll(",", "")`   |
| `code[-1]`                       | `undefined`: brackets don't count from the end | `code.slice(-1)`                    |
| `"20:00".split(":")[0] + 1`      | `"201"`: the pieces are strings                | `Number("20:00".split(":")[0]) + 1` |
