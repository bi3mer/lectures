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

## Sample: Revenue Per Day

```python
days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
sales = [50, 75, 60, 90, 40]

for i in range(len(days)):
    print(f"{days[i]}: {sales[i]}")
```

This works, but `days[i]` and `sales[i]` match only by position. Delete `"Wed"` from `days` alone, and the loop prints `Thu: 60` and `Fri: 90` with no error.

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

## Adding and Replacing

```python
sales = {"Mon": 50, "Tue": 75}

sales["Wed"] = 60   # new key: adds a pair
sales["Mon"] = 55   # existing key: replaces its value

print(sales)   # {'Mon': 55, 'Tue': 75, 'Wed': 60}
```

Assigning to a new key adds a pair. Assigning to a key that exists replaces its value, and the key keeps its place.

---

## Starting from `{}`

```python
player = {}

player["name"] = "Ada"
player["pos"] = [3, 4]
player["health"] = 12

print(player)
```

```
{'name': 'Ada', 'pos': [3, 4], 'health': 12}
```

`{}` is an empty dictionary, and each assignment adds a pair. A value can be any type, even a list like `[3, 4]`.

---

## `KeyError`

```python
player = {"name": "ada", "pos": [3, 4], "health": 12}

print(player["mana"])
```

```
KeyError: 'mana'
```

---

## Checking with `in`

```python
player = {"name": "ada", "pos": [3, 4], "health": 12}

if "mana" in player:
    print(player["mana"])
else:
    print("No mana.")
```

```
No mana.
```

`in` and `not in` work as they do on [lists](08-lists.html#41). Check with `in` before a key lookup that might miss.

---

## `in` Checks Only the Keys

```python
player = {"name": "ada", "pos": [3, 4], "health": 12}

print("health" in player)   # True
print(12 in player)         # False
```

`12` is a value in `player`, but `in` checks only the keys, so `12 in player` is `False`.

---

## Catching a `KeyError`

<style scoped>
pre { font-size: 0.65em; }
</style>

<div class="cols">
<div>

```python
player = {"name": "ada", "pos": [3, 4], "health": 12}

try:
    print(player["mana"])
except KeyError as error:
    print(f"Missing key: {error}")
```

</div>
<div>

```python
import traceback

player = {"name": "ada", "pos": [3, 4], "health": 12}

try:
    print(player["mana"])
except KeyError:
    traceback.print_exc()
```

</div>
</div>

<div class="cols">
<div>

```
Missing key: 'mana'
```

</div>
<div>

```
Traceback (most recent call last):
  File "/Users/you/game.py", line 6, in <module>
    print(player["mana"])
          ~~~~~~^^^^^^^^
KeyError: 'mana'
```

</div>
</div>

`as error` stores the exception, as [`as f`](10-exceptions-and-files.html#17) stored the file. `traceback.print_exc()` prints the full crash report, and the program keeps running.

---

## Problem: Day Names (you)

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

[This `match`](03-booleans-and-if-statements.html#28) prints the name of a day. Rewrite it with a dictionary.

</div>
</div>

---

## Solution: Day Names (you)

<style scoped>
pre { font-size: 0.7em; }
</style>

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

A **lookup table** is a dictionary that turns one value into another, here a day number into its name.

---

## Parsons Problem #1 (you)

**One line does not belong.**

```python
total += menu["item"]
print(f"Total: ${total:.2f}")
item = input("Item: ").strip().lower()
if item in menu:
menu = {"coffee": 3.00, "tea": 2.50, "bagel": 2.75}
while item != "":
total += menu[item]
total = 0
item = input("Item: ").strip().lower()
```

---

## Solution: Parsons Problem #1 (you)

```python
menu = {"coffee": 3.00, "tea": 2.50, "bagel": 2.75}

total = 0
item = input("Item: ").strip().lower()
while item != "":
    if item in menu:
        total += menu[item]
    item = input("Item: ").strip().lower()

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

## `values()`

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60, "Thu": 90, "Fri": 40}

total = 0
for amount in sales.values():
    total += amount

print(total)   # 315
```

`values()` gives the loop each value, without its key.

---

## `items()`

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60, "Thu": 90, "Fri": 40}

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

`items()` hands the loop a `(key, value)` tuple, which unpacks the values (similar to [`enumerate`](09-changing-lists.html#39)).

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

This is the same pattern that we used for [Longest Word](08-lists.html#32) but with two variables.

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

## Problem: Find & Solve the Bug (you)

```python
votes = ["red", "blue", "red", "green", "red"]

counts = {}
for vote in votes:
    counts[vote] += 1

print(counts)
```

Fix it so you get this output:

```
{'red': 3, 'blue': 1, 'green': 1}
```

---

## Solution: Find & Solve the Bug (you)

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

```
{'red': 3, 'blue': 1, 'green': 1}
```

`counts[vote] += 1` raised `KeyError: 'red'`, since the first `"red"` has no old value to add to. The `else` gives each new key its first 1.

---

## Parsons Problem #2 (you)

<style scoped>
pre { font-size: 0.75em; }
</style>

**One line does not belong.**

```python
sums[product]["revenue"] += revenue
totals = mystery(totals)
for line in f:
def mystery(sums):
units = int(fields[3])
import os
sums[product] = {"units": 0, "revenue": 0}
mystery(totals)
with open(path, "r") as f:
product = fields[0]
if product not in sums:
totals = {}
revenue = float(fields[2]) * units
f.readline()
sums[product]["units"] += units
path = os.path.join("data", "sales.csv")
fields = line.strip().split(",")
```

---

## Solution: Parsons Problem #2 (you)

<style scoped>
pre { font-size: 0.7em; }
</style>

```python
import os

def mystery(sums):
    path = os.path.join("data", "sales.csv")
    with open(path, "r") as f:
        f.readline()
        for line in f:
            fields = line.strip().split(",")
            product = fields[0]
            units = int(fields[3])
            revenue = float(fields[2]) * units
            if product not in sums:
                sums[product] = {"units": 0, "revenue": 0}
            sums[product]["units"] += units
            sums[product]["revenue"] += revenue

totals = {}
mystery(totals)
```

The extra line, `totals = mystery(totals)`, would set `totals` to `None`.

---

## Dictionaries Are Passed by Reference

```python
def heal(character):
    character["health"] += 5

player = {"name": "ada", "pos": [3, 4], "health": 12}
heal(player)
print(player["health"])   # 17
```

Like [lists](09-changing-lists.html#22), dictionaries are passed by reference: the function gets the same dictionary, not a copy.

---

## Problem: Sales by Product (us)

`totals` now holds a dictionary for each product:

```python
{
    "P-01": {"units": 10, "revenue": 99.10000000000001},
    "P-02": {"units": 5, "revenue": 52.8},
}
```

Print each product like this:

```
P-01: 10 units, $99.10
P-02: 5 units, $52.80
```

- Which loop gives us each product with its dictionary?
- How do we read `"units"` out of that dictionary?

---

## Solution: Sales by Product (us)

```python
for product, stats in totals.items():
    units = stats["units"]
    revenue = stats["revenue"]
    print(f"{product}: {units} units, ${revenue:.2f}")
```

```
P-01: 10 units, $99.10
P-02: 5 units, $52.80
```

`stats` is one product's dictionary, so `stats["units"]` reads its units. In one step, `totals["P-01"]["units"]` is `10`.

---

## Summary

<style scoped>
ul { font-size: 0.85em; }
</style>

- A **dictionary** stores **key**: **value** pairs, like `{"Mon": 50, "Tue": 75}`
- `d[key]` looks up a value; a missing key raises a `KeyError`, which `except KeyError as error:` catches
- `d[key] = value` adds a pair, or replaces the value of a key that exists
- `key in d` checks the keys only; check before a lookup that might miss
- Clean typed keys with `strip` and `lower` (or `upper`), since `"Coffee "` is not `"coffee"`
- When every case only picks a value, a dictionary can replace a `match`
- `for key in d:` gives the keys, `d.values()` the values, and `d.items()` the `(key, value)` pairs
- To count, start a new key at 1 and add 1 to a key seen before

---

## Next Up: Records and Sets

- [Records and Sets](13-records-and-sets.html)
- [Dictionaries and Sets Cheat Sheet](dictionaries-and-sets-cheatsheet.html)
- [Practice Problem: Coffee Cart](https://bi3mer.github.io/autograder/cs230/dictionary-0.html)
