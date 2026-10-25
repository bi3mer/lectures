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

`del` works as it did on [lists](09-changing-lists.html#9). A missing key raises a `KeyError`, so check with `in` first.

---

## Removing While Looping

```python
stock = {"apples": 9, "pears": 0, "plums": 4, "kiwis": 0}

for item in stock:
    if stock[item] == 0:
        del stock[item]
```

```
RuntimeError: dictionary changed size during iteration
```

Removing a key while looping over a dictionary raises an error. [Lists skip items](09-changing-lists.html#14) instead, with no error.

---

## Two Ways to Fix It

<style scoped>
pre { font-size: 0.65em; }
</style>

```python
stock = {"apples": 9, "pears": 0, "plums": 4, "kiwis": 0}
```

<div class="cols">
<div>

```python
in_stock = {}
for item, count in stock.items():
    if count > 0:
        in_stock[item] = count

print(in_stock)   # {'apples': 9, 'plums': 4}
```

</div>
<div>

```python
to_delete = []
for item, count in stock.items():
    if count == 0:
        to_delete.append(item)

for item in to_delete:
    del stock[item]

print(stock)   # {'apples': 9, 'plums': 4}
```

</div>
</div>

Build a new dictionary, as [with lists](09-changing-lists.html#15), or collect the keys and delete them after the loop. Neither changes `stock` while looping over it.

---

## Records

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

Each value is a **record**: a dictionary whose keys name its fields, like each product in [`totals`](12-dictionaries.html#31). Read left to right: student `s01`, then its `gpa`.

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

## What Is a Set?

```python
votes = ["red", "blue", "red", "green", "red"]

colors = set(votes)
print(colors)        # {'red', 'blue', 'green'}, in any order
print(len(colors))   # 3
```

A **set** is a collection of distinct items in no particular order. `set(votes)` builds one from a list, keeping one copy of each unique item.

---

## Creating a Set

```python
colors = {"red", "green", "blue", "red"}

print(len(colors))       # 3
print("red" in colors)   # True
print(colors)            # {'blue', 'red', 'green'}, in any order
print(colors[0])         # TypeError: 'set' object is not subscriptable
```

Braces around items also make a set, and the second `"red"` is dropped. A set has no order, so it has no indexes.

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

`add` keeps one copy of each item. An empty set is `set()`, since `{}` makes an empty dictionary.

---

## Sets Are Passed by Reference

```python
def add_tag(tags):
    tags.add("new")

labels = {"sale"}
add_tag(labels)
print(sorted(labels))   # ['new', 'sale']
```

Like [lists](09-changing-lists.html#22) and [dictionaries](12-dictionaries.html#29), sets are passed by reference: the function changes the caller's set.

---

## Combining Sets: `|`, `&`, `-`

<style scoped>
table { font-size: 0.85em; }
</style>

```python
a = {"red", "green", "blue"}
b = {"red", "yellow", "blue"}
```

| Operator | Method              | Keeps the items       | Result                               |
| -------- | ------------------- | --------------------- | ------------------------------------ |
| `a \| b` | `a.union(b)`        | in either set         | `{'red', 'green', 'blue', 'yellow'}` |
| `a & b`  | `a.intersection(b)` | in both sets          | `{'red', 'blue'}`                    |
| `a - b`  | `a.difference(b)`   | in `a` but not in `b` | `{'green'}`                          |

Each one makes a new set and leaves `a` and `b` alone.

---

## Problem: Shared Hobbies (us)

```python
# Print the hobbies two people share, every hobby, and the hobbies
# only the first person has.
hobbies_1 = "chess,hiking,cooking"
hobbies_2 = "hiking,gaming,chess"
```

```
Shared: ['chess', 'hiking']
All: ['chess', 'cooking', 'gaming', 'hiking']
Only person 1: ['cooking']
```

- How do we turn each string into a set?
- Which operator answers each line?

---

## Solution: Shared Hobbies (us)

```python
hobbies_1 = "chess,hiking,cooking"
hobbies_2 = "hiking,gaming,chess"

first = set(hobbies_1.split(","))
second = set(hobbies_2.split(","))

print("Shared:", sorted(first & second))
print("All:", sorted(first | second))
print("Only person 1:", sorted(first - second))
```

`split` gives a list, and `set` turns it into a set. `sorted` prints each answer in the same order on every run.

---

## Which Keys Work?

<div class="cols">
<div>

**Tuple as a key**

```python
board = {}
board[(0, 1)] = "X"
print(board[(0, 1)])   # X
```

</div>
<div>

**List as a key**

```python
board = {}
board[[0, 1]] = "X"   # TypeError
```

</div>
</div>

```
TypeError: cannot use 'list' as a dict key (unhashable type: 'list')
```

Dictionary keys and set items must be **hashable**: values that cannot change, such as strings, numbers, and [tuples](09-changing-lists.html#38). A list can change, so it cannot be a key.

---

## Summary

<style scoped>
ul { font-size: 0.85em; }
</style>

- `del d[key]` removes a pair; a missing key raises a `KeyError`, so check with `in` first
- Do not add or remove keys while looping over a dictionary; build a new one, or delete the keys after the loop
- A **record** is a dictionary whose keys name fields; `students["s01"]["gpa"]` reads one field
- A value can be a list, as in `scores["Ana"].append(95)`
- A **set** holds distinct items with no order and no indexes; `set(votes)` builds one, `set()` is empty, and `{}` is a dictionary
- `a | b` is in either set, `a & b` is in both, and `a - b` is in `a` only
- Keys and set items must be **hashable**: strings, numbers, and tuples work, and lists do not

---

## Next Up: TBA

- TBA
- The [Dictionaries and Sets Cheat Sheet](dictionaries-and-sets-cheatsheet.html) has both lectures' tools in one place, with more examples.
- [Practice Problem: Course Planner](https://bi3mer.github.io/autograder/cs230/set-0.html)
