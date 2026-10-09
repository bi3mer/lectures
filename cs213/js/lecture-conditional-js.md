---
marp: true
theme: lecture
paginate: true
---

<style>
/* Code on the left, what the console shows on the right. */
.side-by-side { display: grid; grid-template-columns: 560px minmax(0, 1fr); gap: 24px; align-items: start; }
.side-by-side p { margin: 0; }
.caption { font-size: 20px; color: var(--secondary); }
</style>

## Comparison Operators

| Operator | Meaning               | Example   | Gives   |
| -------- | --------------------- | --------- | ------- |
| `===`    | equal                 | `5 === 5` | `true`  |
| `!==`    | not equal             | `5 !== 5` | `false` |
| `<`      | less than             | `3 < 5`   | `true`  |
| `>`      | greater than          | `3 > 5`   | `false` |
| `<=`     | less than or equal    | `5 <= 5`  | `true`  |
| `>=`     | greater than or equal | `4 >= 5`  | `false` |

A comparison always gives a boolean.

---

## Problem: `=` vs. `===`

```js
let a = 5;
a === 5;
```

Both lines have `a`, some equals signs, and `5`. What's the difference?

---

## Solution: `=` vs. `===`

`=` **puts** a value in a variable. `===` **asks** whether two values are equal, and gives back `true` or `false`.

```text
> let a = 5
< undefined
> a === 5
< true
```

---

## Problem: `==` vs. `===`

```js
console.log(5 == "5");
console.log(5 === "5");
```

One side is a number, and the other is a string. Are they equal?

---

## Solution: `==` vs. `===`

```text
true
false
```

`==` turns both sides into the same type first, so `"5"` becomes `5`. With `===`, a number and a string are never equal. We'll use `===` and `!==`, so there are no surprises.

---

## Logical Operators

- `a && b`: **and**, `true` when both are `true`
- `a || b`: **or**, `true` when at least one is `true`
- `!a`: **not**, `true` becomes `false` and `false` becomes `true`

---

## Problem: Renting a Car

To rent a car, you need to be at least 25 **and** have a license.

```js
let age = 22;
let hasLicense = true;
```

What expression tells us whether this person can rent a car?

---

## Solution: Renting a Car

```js
let canRent = age >= 25 && hasLicense;
console.log(canRent);
```

```text
false
```

`age >= 25` was `false`, so `&&` gave `false`, license or not.

---

## Problem: Free Shipping

Our coffee shop ships for free if the order is \$50 or more, **or** the customer is a member.

```js
let total = 42;
let isMember = true;
```

What expression tells us whether this order ships for free?

---

## Solution: Free Shipping

```js
let freeShipping = total >= 50 || isMember;
console.log(freeShipping);
```

```text
true
```

The order was under 50, but `||` only needs one side to be `true`.

---

## Exercise: Predict, Then Check

Write down what each line gives, then type them into the console to check.

<!-- prettier-ignore -->
```js
7 >= 7
3 === "3"
!(4 > 2)
true && false
false || !false
```

---

## Exercise: Predict, Then Check (Continued)

<!-- prettier-ignore -->
```js
7 >= 7          // true
3 === "3"       // false
!(4 > 2)        // false
true && false   // false
false || !false // true
```

---

## TODO: Ternary Operator

The ternary operator takes three values. It is a short form of an if/else:

```js
let answer = age >= 21 ? "yes" : "no";
```

---

## TODO: Summary

- Compare with `===` and `!==`, and combine with `&&`, `||`, and `!`

---

# Questions?

---

## Why `===` Instead of `==`?

`==` coerces types before comparing. `===` checks type + value, no coercion.

<!-- prettier-ignore -->
```js
0 == "0";  // true  - "0" coerced to number
0 === "0"; // false - different types, no coercion
```

- `==` rules for coercion are long, surprising, easy to get wrong
- `===` predictable: same type required, matches what you'd expect
- Default to `===`; use `==` only when you deliberately want coercion
