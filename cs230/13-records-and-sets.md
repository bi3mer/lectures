---
marp: true
theme: lecture
paginate: true
---

# Records and Sets

Colan Biemer

---

## Changing a Dictionary

---

## Removing a Pair with `del`

```python
sales = {"Mon": 50, "Tue": 75, "Wed": 60, "Thu": 90, "Fri": 40}

del sales["Fri"]
print(sales)   # {'Mon': 50, 'Tue': 75, 'Wed': 60, 'Thu': 90}

day = input("Remove which day? ")
if day in sales:
    del sales[day]
else:
    print("No such day.")
```

`del` works as it did on [lists](09-changing-lists.html#9). A missing key raises a `KeyError`, so textbook program 9-6 checks with `in` first.

---

## Combining with `update`

```python
prices = {"coffee": 3.00, "tea": 2.50}
new_prices = {"tea": 2.75, "bagel": 2.25}

prices.update(new_prices)
print(prices)
```

```
{'coffee': 3.0, 'tea': 2.75, 'bagel': 2.25}
```

Keys already in `prices` take the new values, and new keys are added. `new_prices` stays the same.

---

## Problem: What Is the Output?

```python
stock = {"apples": 5, "pears": 2}
del stock["pears"]
stock["plums"] = 4
stock.update({"apples": 9, "kiwis": 1})
print(stock)
```

---

## Solution: What Is the Output?

```
{'apples': 9, 'plums': 4, 'kiwis': 1}
```

`update` replaced the value of `apples` and kept its place at the front.

---

## Problem: Find the Bug

```python
stock = {"apples": 9, "pears": 0, "plums": 4, "kiwis": 0}

for item in stock:
    if stock[item] == 0:
        del stock[item]

print(stock)
```

---

## Solution: Find the Bug

```
RuntimeError: dictionary changed size during iteration
```

```python
in_stock = {}
for item, count in stock.items():
    if count > 0:
        in_stock[item] = count
```

This is the trap from [Removing While Looping](09-changing-lists.html#14). The fix from [Build a New List Instead](09-changing-lists.html#15) works here too.

---

## Records

---

## Files for Today

<div class="cols">
<div>

Today uses `products.csv`, which came in [data.zip](data.zip). If your `data` folder does not have it, download [products.csv](data/products.csv) into it.

Each file is also on the [Data Files](data/index.html) page.

</div>
<div>

```
week9/          ← open in VS Code
├── program.py
└── data/
    ├── measures.txt
    ├── months/
    ├── names.txt
    ├── prices.csv
    ├── products.csv   ← today
    ├── sales.csv
    └── scores.csv
```

</div>
</div>

---

## A Dictionary of Dictionaries

```python
students = {
    "s01": {"name": "Ana", "major": "CS", "gpa": 3.6},
    "s02": {"name": "Ben", "major": "Math", "gpa": 3.2},
}

print(students["s01"])          # {'name': 'Ana', 'major': 'CS', 'gpa': 3.6}
print(students["s01"]["gpa"])   # 3.6
```

Each value is a **record**: a dictionary whose keys name its fields. Read the brackets left to right: student `s01`, then the field `gpa`.

---

## Looping Over Records

```python
students = {
    "s01": {"name": "Ana", "major": "CS", "gpa": 3.6},
    "s02": {"name": "Ben", "major": "Math", "gpa": 3.2},
}

for sid, student in students.items():
    print(sid, student["name"], student["gpa"])
```

```
s01 Ana 3.6
s02 Ben 3.2
```

`items()` gives each id with its record. Textbook program 9-5 loops this way.

---

## Problem: Find the Bug

```python
students = {
    "s01": {"name": "Ana", "major": "CS", "gpa": 3.6},
    "s02": {"name": "Ben", "major": "Math", "gpa": 3.2},
}

for sid in students:
    print(sid, students["name"])
```

---

## Solution: Find the Bug

```
KeyError: 'name'
```

```python
for sid in students:
    print(sid, students[sid]["name"])
```

The keys of `students` are ids. The record is `students[sid]`, so the name is `students[sid]["name"]`.

---

## Problem: Product Records (us)

```python
# Read data/products.csv into a dictionary of records keyed by
# product id. Then print each divb product and its price.
```

<div class="cols">
<div>

```
product-id,division,price
P-001,diva,5.50
P-001x,diva,5.95
P-002,diva,6.50
P-002x,diva,6.95
P-010,divb,10.25
P-010x,divb,10.75
Q-011,divb,11.50
Q-011x,divb,11.95
```

</div>
<div>

```
P-010: $10.25
P-010x: $10.75
Q-011: $11.50
Q-011x: $11.95
```

- What is the key, and what goes in each record?
- Which field needs converting?

</div>
</div>

---

## Solution: Product Records (us)

<style scoped>
pre { font-size: 0.7em; }
</style>

```python
import os

products = {}
path = os.path.join("data", "products.csv")
with open(path, "r") as f:
    f.readline()
    for line in f:
        fields = line.strip().split(",")
        products[fields[0]] = {"division": fields[1], "price": float(fields[2])}

for product_id, product in products.items():
    if product["division"] == "divb":
        price = product["price"]
        print(f"{product_id}: ${price:.2f}")
```

Each record is built once, with `price` already a `float`. Textbook program 9-8 starts the same way.

---

## A Dictionary of Lists

```python
scores = {"Ana": [90, 85], "Ben": [70, 88]}

scores["Ana"].append(95)
print(scores["Ana"])                             # [90, 85, 95]
print(sum(scores["Ana"]) / len(scores["Ana"]))   # 90.0
```

`scores["Ana"]` is a list, so `append` and [`sum`](08-lists.html#39) work on it. Later in the course, pandas builds a table from a dictionary of lists.

---

## Parsons Problem #1 (you)

**One line does not belong.**

```python
averages[name] = sum(marks) / len(marks)
return averages
scores = {"Ana": [90, 85, 95], "Ben": [70, 88]}
for name, marks in scores.items():
averages[name] = sum(scores) / len(scores)
def mystery(scores):
print(mystery(scores))
averages = {}
```

---

## Solution: Parsons Problem #1 (you)

```python
def mystery(scores):
    averages = {}
    for name, marks in scores.items():
        averages[name] = sum(marks) / len(marks)
    return averages

scores = {"Ana": [90, 85, 95], "Ben": [70, 88]}
print(mystery(scores))
```

The extra line was `averages[name] = sum(scores) / len(scores)`. `sum(scores)` adds up the keys, which are names, and raises `TypeError: unsupported operand type(s) for +: 'int' and 'str'`.

---

## Sets

---

## Creating a Set

```python
colors = {"red", "green", "blue", "red"}

print(len(colors))       # 3
print("red" in colors)   # True
print(colors)            # {'blue', 'red', 'green'}, in any order
print(colors[0])         # TypeError: 'set' object is not subscriptable
```

A **set** holds distinct items in no particular order, so it has no indexes. A printed set can list its items in any order.

---

## Changing a Set

```python
tags = set()
tags.add("python")
tags.add("data")
tags.add("python")
print(sorted(tags))   # ['data', 'python']

tags.remove("data")
print(sorted(tags))   # ['python']
tags.remove("java")   # KeyError: 'java'
```

`add` keeps one copy of each item. An empty set is `set()`, since `{}` makes an empty dictionary. Textbook program 9-7 builds a set this way.

---

## Problem: What Is the Output?

```python
words = ["the", "cat", "the", "hat"]
unique = set(words)

print(len(words), len(unique))
print(sorted(unique))
```

---

## Solution: What Is the Output?

```
4 3
['cat', 'hat', 'the']
```

`set` drops the duplicates, and `sorted` gives back a list in order.

---

## Combining Sets: `|`, `&`, `-`

```python
a = {"red", "green", "blue"}
b = {"red", "yellow", "blue"}

print(sorted(a | b))   # ['blue', 'green', 'red', 'yellow']
print(sorted(a & b))   # ['blue', 'red']
print(sorted(a - b))   # ['green']
```

`|` keeps items in either set, `&` keeps items in both, and `-` keeps items in the first set only.

---

## Problem: Shared Hobbies (us)

```python
# Read two lines of comma-separated hobbies, one per person. Print the
# hobbies they share, every hobby, and the hobbies only the first has.
```

```
Person 1: chess,hiking,cooking
Person 2: hiking,gaming,chess
Shared: ['chess', 'hiking']
All: ['chess', 'cooking', 'gaming', 'hiking']
Only person 1: ['cooking']
```

- Which operator answers each line?
- Why `sorted`?

---

## Solution: Shared Hobbies (us)

```python
first = set(input("Person 1: ").split(","))
second = set(input("Person 2: ").split(","))

print("Shared:", sorted(first & second))
print("All:", sorted(first | second))
print("Only person 1:", sorted(first - second))
```

`split` gives a list, and `set` turns it into a set. `sorted` prints each answer in the same order on every run.

---

## Parsons Problem #2 (you)

**One line does not belong.**

```python
found.add(fields[0])
with open(path, "r") as f:
found = {}
print(mystery(os.path.join("data", "sales.csv")))
for line in f:
return sorted(found)
import os
f.readline()
def mystery(path):
fields = line.strip().split(",")
found = set()
```

---

## Solution: Parsons Problem #2 (you)

```python
import os

def mystery(path):
    found = set()
    with open(path, "r") as f:
        f.readline()
        for line in f:
            fields = line.strip().split(",")
            found.add(fields[0])
    return sorted(found)

print(mystery(os.path.join("data", "sales.csv")))
```

The extra line was `found = {}`. `{}` makes a dictionary, so `found.add` raises `AttributeError: 'dict' object has no attribute 'add'`.

---

## Which Keys Work?

```python
spots = {(1, 2): "x"}
print(spots[(1, 2)])   # x

spots = {[1, 2]: "x"}
```

```
TypeError: cannot use 'list' as a dict key (unhashable type: 'list')
```

Dictionary keys and set items must be **hashable**: values that cannot change, such as strings, numbers, and tuples. [Why Tuples?](09-changing-lists.html#38) promised this rule.

---

## Summary

<style scoped>
ul { font-size: 0.85em; }
</style>

- `del d[key]` removes a pair; a missing key raises a `KeyError`, so check with `in` first
- `d.update(other)` copies in the pairs of `other`, replacing the values of keys `d` already has
- Do not add or remove keys while looping over a dictionary; build a new one instead
- A **record** is a dictionary whose keys name fields; `students["s01"]["gpa"]` reads one field
- A value can be a list, as in `scores["Ana"].append(95)`
- A **set** holds distinct items with no order and no indexes; `set()` is empty, and `{}` is a dictionary
- `a | b` is in either set, `a & b` is in both, and `a - b` is in `a` only
- Keys and set items must be **hashable**: strings, numbers, and tuples work, and lists do not

---

## Next Up: Quiz 2 Review

Next class reviews Chapters 5 to 9 and Appendix K for Quiz 2.

The [Dictionaries and Sets Cheat Sheet](dictionaries-and-sets-cheatsheet.html) has both lectures' tools in one place, with more examples.
