---
marp: true
theme: lecture
paginate: true
---

# Dictionaries

Colan Biemer

---

## Keys and Values

---

## Two Lists That Go Together

```python
days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
sales = [50, 75, 60, 90, 40]

for i in range(len(days)):
    if days[i] == "Wed":
        print(sales[i])   # 60
```

The two lists must stay in step, and every lookup takes a loop.

---

## Creating a Dictionary

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60, "Thu": 90, "Fri": 40}

print(sales["Wed"])   # 60
print(len(sales))     # 5
```

```python
{[KEY]: [VALUE], [KEY]: [VALUE], ...}
```

A **dictionary** stores **key**: **value** pairs. `sales["Wed"]` looks up a value by its key, as `scores[2]` looks one up by its index.

---

## Problem: What Is the Output?

```python
d = {"a": 1}
d["a"] = 5
d["b"] = 2
print(d)
print(len(d))
```

---

## Solution: What Is the Output?

```
{'a': 5, 'b': 2}
2
```

Assigning to a key that exists replaces its value. A new key adds a pair.

---

## Starting from `{}`

<div class="cols">
<div>

```python
contacts = {}

entry = input("> ")
while entry != "":
    email, phone = entry.split()
    contacts[email] = phone
    entry = input("> ")

print(contacts)
```

</div>
<div>

```
> ada@mail.com 555-1223
> alan@mail.com 555-9887
>
{'ada@mail.com': '555-1223', 'alan@mail.com': '555-9887'}
```

</div>
</div>

`{}` is an empty dictionary, and each `contacts[email] = phone` adds a pair. `email, phone = ...` is [Unpacking](07-functions.html#81). This is textbook program 9-1.

---

## `KeyError`

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60, "Thu": 90, "Fri": 40}

print(sales["Sat"])
```

```
KeyError: 'Sat'
```

A missing key raises a `KeyError`, the dictionary's version of [Index Out of Range](08-lists.html#7).

---

## Checking with `in`

<div class="cols">
<div>

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60}

day = input("Day: ")
if day in sales:
    print(sales[day])
else:
    print("No sales recorded.")
```

</div>
<div>

```
Day: Tue
75
```

```
Day: Sat
No sales recorded.
```

</div>
</div>

`in` and `not in` work as they do on [lists](08-lists.html#41). Textbook program 9-3 guards its lookup the same way.

---

## Problem: What Is the Output?

```python
prices = {"coffee": 3.0, "tea": 2.5}

print("tea" in prices)
print(2.5 in prices)
```

---

## Solution: What Is the Output?

```
True
False
```

`in` checks only the keys.

---

## Problem: Find the Bug

```python
menu = {"coffee": 3.00, "tea": 2.50, "bagel": 2.75}

item = input("Item: ")
if item in menu:
    print(f"${menu[item]:.2f}")
else:
    print("Not on the menu.")
```

```
Item: Coffee
Not on the menu.
```

The user typed `Coffee`, then a space.

---

## Solution: Find the Bug

```python
item = input("Item: ").strip().lower()
```

```
Item: Coffee
$3.00
```

`"Coffee "` and `"coffee"` are different keys. Clean the input with `.strip().lower()` before the lookup.

---

## Lookup Tables

<style scoped>
pre { font-size: 0.7em; }
</style>

<div class="cols">
<div>

```python
day = int(input("Day (1-7): "))

match day:
    case 1:
        print("Monday")
    case 2:
        print("Tuesday")
    case 3:
        print("Wednesday")
    case 4:
        print("Thursday")
    case 5:
        print("Friday")
    case 6:
        print("Saturday")
    case 7:
        print("Sunday")
    case _:
        print("Not a valid day")
```

</div>
<div>

```python
days = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
}

day = int(input("Day (1-7): "))
if day in days:
    print(days[day])
else:
    print("Not a valid day")
```

</div>
</div>

Left: [Day of Week](03-booleans-and-if-statements.html#28). When every case only picks a value, one dictionary replaces the `match`. Keys can be numbers.

---

## Problem: State Names (us)

```python
# Ask for two-letter state abbreviations until a blank line, and print
# each state's name. Print "Unknown state." for any other input.
```

```
State: PA
Pennsylvania
State: ny
New York
State: XX
Unknown state.
State:
```

- What are the keys, and what are the values?
- How should `ny` work?

---

## Solution: State Names (us)

<style scoped>
pre { font-size: 0.75em; }
</style>

```python
states = {
    "DE": "Delaware",
    "MD": "Maryland",
    "NJ": "New Jersey",
    "NY": "New York",
    "PA": "Pennsylvania",
}

abbr = input("State: ").strip().upper()
while abbr != "":
    if abbr in states:
        print(states[abbr])
    else:
        print("Unknown state.")
    abbr = input("State: ").strip().upper()
```

`upper` turns `ny` into the key `NY`. A blank line strips to `""`, which ends the loop.

---

## Parsons Problem #1 (you)

**One line does not belong.**

```python
total += menu["item"]
print(f"Total: ${total:.2f}")
item = input("Item: ")
if item in menu:
menu = {"coffee": 3.00, "tea": 2.50, "bagel": 2.75}
while item != "":
total += menu[item]
total = 0
item = input("Item: ")
```

---

## Solution: Parsons Problem #1 (you)

```python
menu = {"coffee": 3.00, "tea": 2.50, "bagel": 2.75}

total = 0
item = input("Item: ")
while item != "":
    if item in menu:
        total += menu[item]
    item = input("Item: ")

print(f"Total: ${total:.2f}")
```

The extra line was `total += menu["item"]`. The quotes make `"item"` a key the menu does not have, so it raises `KeyError: 'item'`.

---

## Looping Over a Dictionary

---

## `for` Over a Dictionary

<div class="cols">
<div>

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60, "Thu": 90, "Fri": 40}

for day in sales:
    print(day, sales[day])
```

</div>
<div>

```
Mon 50
Tue 75
Wed 60
Thu 90
Fri 40
```

</div>
</div>

A `for` loop over a dictionary gives its keys, in the order they were added. `for day in sales.keys():` does the same.

---

## `values()` and `items()`

<div class="cols">
<div>

```python
total = 0
for amount in sales.values():
    total += amount

print(total)   # 315
```

</div>
<div>

```python
for day, amount in sales.items():
    print(f"{day}: {amount}")
```

```
Mon: 50
Tue: 75
Wed: 60
Thu: 90
Fri: 40
```

</div>
</div>

`items()` hands the loop a `(key, value)` tuple, which unpacks as [`enumerate`](09-changing-lists.html#39)'s did. Textbook program 9-4 loops this way.

---

## Problem: Find the Bug

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60, "Thu": 90, "Fri": 40}

total = 0
for amount in sales:
    total += amount

print(total)
```

---

## Solution: Find the Bug

```
TypeError: unsupported operand type(s) for +=: 'int' and 'str'
```

The loop gives the keys, so `amount` is `"Mon"`. Loop over `sales.values()`, or write `sum(sales.values())`.

---

## Problem: Best Day (us)

```python
# Print the day with the most sales, and its amount.
sales = {"Mon": 50, "Tue": 75, "Wed": 60, "Thu": 90, "Fri": 40}
```

```
Best day: Thu (90)
```

[Longest Word](08-lists.html#31) kept the longest word as it went.

- What do we need to remember as we go?
- What should it start as?

---

## Solution: Best Day (us)

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60, "Thu": 90, "Fri": 40}

best_day = ""
best_amount = 0
for day, amount in sales.items():
    if amount > best_amount:
        best_day = day
        best_amount = amount

print(f"Best day: {best_day} ({best_amount})")
```

This is the [Longest Word](08-lists.html#32) pattern with two variables: one for the key, and one for its value.

---

## Counting

---

## Counting with a Dictionary

<div class="cols">
<div>

```python
votes = ["red", "blue", "red", "green", "red"]

counts = {}
for vote in votes:
    if vote in counts:
        counts[vote] += 1
    else:
        counts[vote] = 1

print(counts)
```

</div>
<div>

```
{'red': 3, 'blue': 1, 'green': 1}
```

</div>
</div>

A new key starts at 1. A key seen before goes up by 1.

---

## Problem: Find the Bug

```python
votes = ["red", "blue", "red", "green", "red"]

counts = {}
for vote in votes:
    counts[vote] += 1

print(counts)
```

---

## Solution: Find the Bug

```
KeyError: 'red'
```

`+=` needs an old value to add to, and the first `"red"` has none. The `if`/`else` gives each new key its first 1.

---

## Problem: Sales by Product (us)

```python
# Read data/sales.csv and print each product's total of
# price * quantity, to the cent.
```

<div class="cols">
<div>

```
product,date,price,quantity
P-01,2023-01-01,9.95,5
P-02,2023-01-02,10.50,2
P-01,2023-01-03,9.85,4
P-02,2023-01-04,10.60,3
P-01,2023-01-05,9.95,1
```

</div>
<div>

```
P-01: $99.10
P-02: $52.80
```

</div>
</div>

[Total Sales](10-exceptions-and-files.html#31) kept one total.

- What are the keys?
- What happens the first time a product shows up?

---

## Solution: Sales by Product (us)

<style scoped>
pre { font-size: 0.7em; }
</style>

```python
import os

totals = {}
path = os.path.join("data", "sales.csv")
with open(path, "r") as f:
    f.readline()
    for line in f:
        fields = line.strip().split(",")
        product = fields[0]
        amount = float(fields[2]) * int(fields[3])
        if product in totals:
            totals[product] += amount
        else:
            totals[product] = amount

for product, total in totals.items():
    print(f"{product}: ${total:.2f}")
```

This is the Total Sales loop with one total per product. The `if`/`else` is the counting pattern, adding `amount` in place of 1.

---

## Parsons Problem #2 (you)

**One line does not belong.**

```python
counts[first] = 1
for word in words:
counts = []
else:
return counts
first = word[0].lower()
def mystery(words):
counts[first] += 1
print(mystery(["Apple", "avocado", "banana", "Cherry", "blueberry"]))
counts = {}
if first in counts:
```

---

## Solution: Parsons Problem #2 (you)

```python
def mystery(words):
    counts = {}
    for word in words:
        first = word[0].lower()
        if first in counts:
            counts[first] += 1
        else:
            counts[first] = 1
    return counts

print(mystery(["Apple", "avocado", "banana", "Cherry", "blueberry"]))
```

The extra line was `counts = []`. A list takes only number indexes, so `counts[first] = 1` raises `TypeError: list indices must be integers or slices, not str`.

---

## Summary

<style scoped>
ul { font-size: 0.85em; }
</style>

- A **dictionary** stores **key**: **value** pairs, like `{"Mon": 50, "Tue": 75}`
- `d[key]` looks up a value; a missing key raises a `KeyError`
- `d[key] = value` adds a pair, or replaces the value of a key that exists
- `key in d` checks the keys only; check before a lookup that might miss
- Clean typed keys with `strip` and `lower` (or `upper`), since `"Coffee "` is not `"coffee"`
- When every case only picks a value, a dictionary can replace a `match`
- `for key in d:` gives the keys, `d.values()` the values, and `d.items()` the `(key, value)` pairs
- To count, start a new key at 1 and add 1 to a key seen before

---

## Next Up: Records and Sets

[Records and Sets](13-records-and-sets.html)

The [Dictionaries and Sets Cheat Sheet](dictionaries-and-sets-cheatsheet.html) has today's tools in one place, with `get` and sorting by key.

<!--
If time: the cheat sheet's shorter counting line, counts[vote] = counts.get(vote, 0) + 1, and
sorted(totals) to print Sales by Product in key order.
-->
