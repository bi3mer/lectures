# Dictionaries and Sets Cheatsheet

A **dictionary** stores **key**: **value** pairs and looks up each value by its key. A **set** holds distinct items in no particular order. This sheet collects Chapter 9 of the textbook and class in one place. Every example can be pasted into a file and run. The file examples expect the `data` folder from [data.zip](data.zip) next to your program. The [Data Files](data/index.html) page shows what is in each file.

## Creating a Dictionary

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60, "Thu": 90, "Fri": 40}
empty = {}

print(sales)
print(len(sales))
print(len(empty))
```

```
{'Mon': 50, 'Tue': 75, 'Wed': 60, 'Thu': 90, 'Fri': 40}
5
0
```

Write each pair as `key: value`, with commas between the pairs and braces around them all. `len` gives the number of pairs, and `{}` is an empty dictionary. A dictionary keeps its pairs in the order they were added.

|            | List                | Dictionary                       |
| ---------- | ------------------- | -------------------------------- |
| Create     | `scores = [90, 85]` | `sales = {"Mon": 50, "Tue": 75}` |
| Look up by | index: `scores[0]`  | key: `sales["Mon"]`              |
| Missing    | `IndexError`        | `KeyError`                       |
| Empty      | `[]`                | `{}`                             |
| Add        | `scores.append(77)` | `sales["Wed"] = 60`              |
| `in` looks | at the items        | at the keys only                 |

## Looking Up a Value

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60}

print(sales["Wed"])
print("Wed" in sales)
print("Sat" in sales)
print(60 in sales)
print(sales["Sat"])
```

```
60
True
False
False
KeyError: 'Sat'
```

`d[key]` gives back the value for `key`, and a missing key raises a `KeyError`. `in` and `not in` look at the keys only, so `60 in sales` is `False`. Check with `in` before a lookup that might miss, as textbook program 9-3 does:

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60}

day = input("Day: ")
if day in sales:
    print(sales[day])
else:
    print("No sales recorded.")
```

```
Day: Sat
No sales recorded.
```

### `get`

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60}

print(sales.get("Wed"))
print(sales.get("Sat"))
print(sales.get("Sat", 0))
```

```
60
None
0
```

`d.get(key, default)` gives back the value for `key`, or `default` when the key is missing. It never raises a `KeyError`. With no default, a missing key gives back `None`.

## Adding and Replacing

```python
d = {"a": 1}
d["a"] = 5
d["b"] = 2
print(d)
```

```
{'a': 5, 'b': 2}
```

Assigning to a key that exists replaces its value, and the key keeps its place. Assigning to a new key adds a pair at the end. A dictionary never holds the same key twice.

Textbook program 9-1 starts from `{}` and adds a pair for each line the user types:

```python
contacts = {}

entry = input("> ")
while entry != "":
    email, phone = entry.split()
    contacts[email] = phone
    entry = input("> ")

print(contacts)
```

```
> ada@mail.com 555-1223
> alan@mail.com 555-9887
>
{'ada@mail.com': '555-1223', 'alan@mail.com': '555-9887'}
```

### Keys Typed by the User

`"Coffee "`, `"coffee"`, and `"COFFEE"` are three different keys. Clean typed input before the lookup: `.strip().lower()` for keys like `"coffee"`, or `.strip().upper()` for keys like `"NY"`.

```python
menu = {"coffee": 3.00, "tea": 2.50, "bagel": 2.75}

item = input("Item: ").strip().lower()
if item in menu:
    print(f"${menu[item]:.2f}")
else:
    print("Not on the menu.")
```

```
Item: Coffee
$3.00
```

### Keys Read from a File

Every field that `split` gives back is a string, and the string `"1"` and the number `1` are different keys. Convert the field to match the keys:

```python
days = {1: "Monday", 2: "Tuesday"}
text = "1"

print(text in days)
print(int(text) in days)
```

```
False
True
```

## Lookup Tables

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

```
Day (1-7): 3
Wednesday
```

A **lookup table** is a dictionary that turns one value into another. When every case of a `match` or an `if`/`elif` chain only picks a value, a lookup table replaces it. When the cases run different code, keep the `match`.

## Looping Over a Dictionary

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60}

for day in sales:
    print(day, sales[day])

for amount in sales.values():
    print(amount)

for day, amount in sales.items():
    print(f"{day}: {amount}")
```

```
Mon 50
Tue 75
Wed 60
50
75
60
Mon: 50
Tue: 75
Wed: 60
```

| Loop over         | Each time around, the loop gets                  |
| ----------------- | ------------------------------------------------ |
| `d` or `d.keys()` | a key                                            |
| `d.values()`      | a value                                          |
| `d.items()`       | a `(key, value)` tuple, unpacked as `key, value` |

`sum(sales.values())` adds up the values. `sum(sales)` tries to add up the keys and raises a `TypeError`. Textbook program 9-4 loops over `items()`.

### In Key Order: `sorted`

```python
stock = {"pears": 2, "apples": 5, "kiwis": 1}

print(sorted(stock))
for item in sorted(stock):
    print(item, stock[item])
```

```
['apples', 'kiwis', 'pears']
apples 5
kiwis 1
pears 2
```

`sorted(d)` gives back a new list of the keys in order: alphabetical for strings, smallest first for numbers. The dictionary keeps its own order.

## Largest Value

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

```
Best day: Thu (90)
```

The loop remembers two things as it goes: the best key so far and its value. Starting `best_amount` at 0 works when every value is above 0. `max(sales.values())` gives `90`, but not the day that goes with it.

## Counting

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

A new key starts at 1, and a key seen before goes up by 1. `counts[vote] += 1` alone raises `KeyError: 'red'` on the first `"red"`, because `+=` needs an old value to add to.

`get` with a default of 0 does the same in one line:

```python
votes = ["red", "blue", "red", "green", "red"]

counts = {}
for vote in votes:
    counts[vote] = counts.get(vote, 0) + 1

print(counts)
```

```
{'red': 3, 'blue': 1, 'green': 1}
```

### Totals by Key

The same pattern adds up an amount per key in place of counting by 1. This program totals `price * quantity` for each product in `sales.csv`:

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

```
P-01: $99.10
P-02: $52.80
```

## Removing a Pair: `del`

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60}

del sales["Tue"]
print(sales)

day = "Sat"
if day in sales:
    del sales[day]
else:
    print(f"No {day} to remove.")
```

```
{'Mon': 50, 'Wed': 60}
No Sat to remove.
```

`del d[key]` removes the pair for `key`. A missing key raises a `KeyError`, so textbook program 9-6 checks with `in` first.

## Combining: `update`

```python
prices = {"coffee": 3.00, "tea": 2.50}
new_prices = {"tea": 2.75, "bagel": 2.25}

prices.update(new_prices)
print(prices)
print(new_prices)
```

```
{'coffee': 3.0, 'tea': 2.75, 'bagel': 2.25}
{'tea': 2.75, 'bagel': 2.25}
```

`a.update(b)` copies every pair of `b` into `a`. A key `a` already has takes the new value and keeps its place, and a new key goes at the end. `b` stays the same.

## Changing While Looping

A loop over a dictionary cannot add or remove keys:

```python
stock = {"apples": 9, "pears": 0, "plums": 4, "kiwis": 0}

for item in stock:
    if stock[item] == 0:
        del stock[item]
```

```
RuntimeError: dictionary changed size during iteration
```

Build a new dictionary instead, as with lists:

```python
stock = {"apples": 9, "pears": 0, "plums": 4, "kiwis": 0}

in_stock = {}
for item, count in stock.items():
    if count > 0:
        in_stock[item] = count

print(in_stock)
```

```
{'apples': 9, 'plums': 4}
```

Changing the value of a key that exists is fine inside the loop, since the number of keys stays the same: `stock[item] += 1`.

## Records: Dictionaries of Dictionaries

```python
students = {
    "s01": {"name": "Ana", "major": "CS", "gpa": 3.6},
    "s02": {"name": "Ben", "major": "Math", "gpa": 3.2},
}

print(students["s01"]["gpa"])
students["s02"]["gpa"] = 3.4

for sid, student in students.items():
    print(sid, student["name"], student["gpa"])
```

```
3.6
s01 Ana 3.6
s02 Ben 3.4
```

A **record** is a dictionary whose keys name its fields, like `"name"` and `"gpa"`. `students["s01"]["gpa"]` reads left to right: the record for `s01`, then its `gpa` field. Inside the loop, `student` is one record, so its fields are `student["name"]` and `student["gpa"]`. Textbook program 9-5 loops over records this way.

`students["name"]` raises `KeyError: 'name'`, because the keys of `students` are ids. The name of one student is `students[sid]["name"]`.

### Records from a File

```python
import os

products = {}
path = os.path.join("data", "products.csv")
with open(path, "r") as f:
    f.readline()
    for line in f:
        fields = line.strip().split(",")
        products[fields[0]] = {"division": fields[1], "price": float(fields[2])}

print(products["P-010"])
for product_id, product in products.items():
    if product["division"] == "divb":
        price = product["price"]
        print(f"{product_id}: ${price:.2f}")
```

```
{'division': 'divb', 'price': 10.25}
P-010: $10.25
P-010x: $10.75
Q-011: $11.50
Q-011x: $11.95
```

Each line of `products.csv` becomes one record, keyed by its product id. Converting `price` once, as the record is built, means every later use gets a `float`. Textbook program 9-8 reads its product file the same way.

## Dictionaries of Lists

```python
scores = {"Ana": [90, 85], "Ben": [70, 88]}

scores["Ana"].append(95)
print(scores)

for name, marks in scores.items():
    print(name, sum(marks) / len(marks))
```

```
{'Ana': [90, 85, 95], 'Ben': [70, 88]}
Ana 90.0
Ben 79.0
```

`scores["Ana"]` is a list, so every list tool works on it. `sum(scores)` would add up the keys, which are names, and raise `TypeError: unsupported operand type(s) for +: 'int' and 'str'`.

To group values from a file into lists, use the counting pattern: a new key starts as a list of one item, and a key seen before gets `append`.

```python
import os

quantities = {}
path = os.path.join("data", "sales.csv")
with open(path, "r") as f:
    f.readline()
    for line in f:
        fields = line.strip().split(",")
        product = fields[0]
        quantity = int(fields[3])
        if product in quantities:
            quantities[product].append(quantity)
        else:
            quantities[product] = [quantity]

print(quantities)
```

```
{'P-01': [5, 4, 1], 'P-02': [2, 3]}
```

## Sets

```python
colors = {"red", "green", "blue", "red"}

print(len(colors))
print("red" in colors)
print(sorted(colors))
```

```
3
True
['blue', 'green', 'red']
```

A **set** holds each item once, so the second `"red"` is dropped. Its items have no order, so a set has no indexes: `colors[0]` raises `TypeError: 'set' object is not subscriptable`. `print(colors)` can list the items in a different order on each run, so print `sorted(colors)`, which gives back a list in order.

```python
tags = set()
tags.add("python")
tags.add("data")
tags.add("python")
print(sorted(tags))

tags.remove("data")
print(sorted(tags))
```

```
['data', 'python']
['python']
```

| Write         | Does                                                    |
| ------------- | ------------------------------------------------------- |
| `set()`       | makes an empty set (`{}` makes an empty dictionary)     |
| `set(items)`  | makes a set of the items in a list, dropping duplicates |
| `s.add(x)`    | adds `x`; does nothing if `x` is already there          |
| `s.remove(x)` | removes `x`; raises a `KeyError` if `x` is missing      |
| `x in s`      | `True` if `x` is in `s`                                 |
| `len(s)`      | the number of items                                     |

Textbook program 9-7 builds a set from typed input and checks with `in` before `remove`.

`set` is the quick way to count distinct items:

```python
words = ["the", "cat", "the", "hat"]
unique = set(words)

print(len(words), len(unique))
print(sorted(unique))
```

```
4 3
['cat', 'hat', 'the']
```

## Set Operations

```python
a = {"red", "green", "blue"}
b = {"red", "yellow", "blue"}

print(sorted(a | b))
print(sorted(a & b))
print(sorted(a - b))
print(sorted(b - a))
```

```
['blue', 'green', 'red', 'yellow']
['blue', 'red']
['green']
['yellow']
```

| Operator | Method              | Name         | Keeps the items       |
| -------- | ------------------- | ------------ | --------------------- |
| `a \| b` | `a.union(b)`        | union        | in either set         |
| `a & b`  | `a.intersection(b)` | intersection | in both sets          |
| `a - b`  | `a.difference(b)`   | difference   | in `a` but not in `b` |

Each operator makes a new set and leaves `a` and `b` alone. Order matters only for `-`: `a - b` and `b - a` differ.

```python
first = set(input("Person 1: ").split(","))
second = set(input("Person 2: ").split(","))

print("Shared:", sorted(first & second))
print("All:", sorted(first | second))
print("Only person 1:", sorted(first - second))
```

```
Person 1: chess,hiking,cooking
Person 2: hiking,gaming,chess
Shared: ['chess', 'hiking']
All: ['chess', 'cooking', 'gaming', 'hiking']
Only person 1: ['cooking']
```

## Hashable Types

```python
spots = {(1, 2): "x"}
print(spots[(1, 2)])

spots = {[1, 2]: "x"}
```

```
x
TypeError: cannot use 'list' as a dict key (unhashable type: 'list')
```

Dictionary keys and set items must be **hashable**: values that cannot change after they are made. Python 3.13 and older print the error as `TypeError: unhashable type: 'list'`.

| Type                   | As a key or set item |
| ---------------------- | -------------------- |
| `str`, `int`, `float`  | works                |
| `bool`                 | works                |
| `tuple`, like `(1, 2)` | works                |
| `list`, like `[1, 2]`  | `TypeError`          |
| `dict` and `set`       | `TypeError`          |

Values have no limit: a value can be a list, a dictionary, or a set.

## Common Mistakes

| Code                                          | Problem                                                         | Fix                                         |
| --------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------- |
| `d["Sat"]` for a key `d` does not have        | `KeyError: 'Sat'`                                               | check `"Sat" in d` first, or `d.get("Sat")` |
| `menu[item]` when the user typed `Coffee `    | case and spaces make a different key                            | `input(...).strip().lower()`                |
| `days["1"]` when the keys are numbers         | `"1"` is not `1`                                                | `days[int(text)]`                           |
| `menu["item"]`                                | looks up the word `item`, not the variable                      | `menu[item]`                                |
| `for x in d:` to add up the values            | `x` is each key                                                 | `for x in d.values():`                      |
| `counts[key] += 1` for a new key              | `KeyError`: `+=` needs an old value                             | `if`/`else`, or `counts.get(key, 0) + 1`    |
| `counts = []` to count                        | `TypeError: list indices must be integers or slices, not str`   | `counts = {}`                               |
| `del d[key]` inside `for key in d:`           | `RuntimeError: dictionary changed size during iteration`        | build a new dictionary                      |
| `students["name"]` on a dictionary of records | `KeyError`: the keys are ids                                    | `students[sid]["name"]`                     |
| `sum(scores)` on a dictionary of lists        | adds the keys                                                   | `sum(scores[name])`                         |
| `found = {}` for an empty set                 | `{}` is a dictionary, so `found.add` raises an `AttributeError` | `found = set()`                             |
| `colors[0]` on a set                          | `TypeError: 'set' object is not subscriptable`                  | `sorted(colors)[0]`                         |
| `print(colors)` on a set                      | the order can change from run to run                            | `print(sorted(colors))`                     |
| a list as a key or set item                   | `TypeError`: a list is not hashable                             | use a tuple                                 |

## Glossary

- **dictionary**: A collection of key: value pairs that looks up each value by its key.
- **difference**: `a - b`, the items in set `a` that are not in set `b`.
- **hashable**: A value that cannot change after it is made, such as a string, a number, or a tuple. Only hashable values can be dictionary keys or set items.
- **intersection**: `a & b`, the items in both sets.
- **key**: The part of a pair used for lookups, such as `"Mon"` in `{"Mon": 50}`. Each key appears once.
- **lookup table**: A dictionary that turns one value into another, such as a day number into a day name.
- **record**: A dictionary whose keys name its fields, such as `{"name": "Ana", "gpa": 3.6}`.
- **set**: A collection of distinct items in no particular order, such as `{"red", "blue"}`.
- **union**: `a | b`, the items in either set.
- **value**: The part of a pair that a key looks up, such as `50` in `{"Mon": 50}`.
