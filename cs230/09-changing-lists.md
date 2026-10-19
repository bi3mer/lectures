---
marp: true
theme: lecture
paginate: true
---

# Changing Lists

Colan Biemer

---

## Slicing and Changing a List

---

## Slicing a List

```python
scores = [90, 85, 77, 100, 68]

print(scores[1:3])    # [85, 77]
print(scores[:2])     # [90, 85]
print(scores[2:])     # [77, 100, 68]
print(scores[-2:])    # [100, 68]
```

Slices follow the same rules as [string slices](06-strings-and-format-strings.html#74): start at the first index and stop before the second. Leave out the first index to begin at the front, or the second to run to the end. `scores[-2:]` starts two from the end, so it is the last two items.

---

## A Slice Is a New List

```python
scores = [90, 85, 77, 100, 68]
middle = scores[1:3]

print(middle)   # [85, 77]
print(scores)   # [90, 85, 77, 100, 68]
```

<center>
<img src="./images/slice.svg" width="760">
</center>

`middle` is a new list holding two of the items. `scores` keeps all five.

---

## Changing One Item

```python
scores = [90, 85, 77, 100, 68]
scores[0] = 95
print(scores)   # [95, 85, 77, 100, 68]

word = "hello"
word[0] = "H"   # TypeError
```

```
TypeError: 'str' object does not support item assignment
```

Assigning to an index replaces that item, as in [Two Ways to Change Every Item](08-lists.html#27). A list can change in place. A string is [immutable](06-strings-and-format-strings.html#41), so it cannot.

---

## What's the output?

```python
a = [1,2,3,3,4,5]
for i, item in enumerate(a):
  a[i] = item * i

print(a)
```

---

## What's the output?

```python
a = [1,2,3,3,4,5]
for i, item in enumerate(a):
  a[i] = item * i

print(a)
```

```
[0, 2, 6, 9, 16, 25]
```

---

## Adding with `insert`

<div class="cols">
<div>

```python
names = ["Ada", "Grace"]
names.insert(0, "Alan")
print(names)
# ['Alan', 'Ada', 'Grace']

names.insert(2, "Linus")
print(names)
# ['Alan', 'Ada', 'Linus', 'Grace']
```

</div>
<div>

<img src="./images/insert.svg" width="520">

</div>
</div>

`insert(i, x)` puts `x` at index `i` and moves every item after it one place to the right. `append` can only add at the end.

---

## Removing Items

```python
names = ["Alan", "Margaret", "Ada", "Linus", "Grace", "Turing"]

names.remove("Linus")   # removes the first "Linus"
last = names.pop()      # removes and returns the last item
first = names.pop(0)    # removes and returns item 0
del names[0]            # removes item 0

print(first, last)      # Alan Turing
print(names)            # ['Ada', 'Grace']
```

`del` is a keyword, not a method.

---

## Which Removal?

<br/>

<center>

| To remove...            | Use               | Gives back     |
| ----------------------- | ----------------- | -------------- |
| the first match for `x` | `names.remove(x)` | `None`         |
| the item at index `i`   | `del names[i]`    | [nothing](#42) |
| the item at index `i`   | `names.pop(i)`    | the item       |
| the last item           | `names.pop()`     | the item       |

</center>
<br/>

---

## When `remove` and `pop` Fail

```python
names = ["Ada", "Grace"]
names.remove("Alan") # ValueError
```

```python
names = []
names.pop() # IndexError
```

Check `in` before `remove` and `len` before `pop`: [Look Before You Leap](patterns.html#look-before-you-leap).

---

## Problem: Waitlist (us)

```python
# A full class keeps a waitlist, in the order students joined.
#   1. Grace leaves the waitlist.
#   2. Alan has priority and goes to the front.
#   3. A seat opens, and the first student on the waitlist gets it.
waitlist = ["Ada", "Grace", "Linus", "Barbara"]
```

```
Enrolled: Alan
Waitlist: ['Ada', 'Linus', 'Barbara']
```

---

## Solution: Waitlist (us)

```python
waitlist = ["Ada", "Grace", "Linus", "Barbara"]

if "Grace" in waitlist:
    waitlist.remove("Grace")

waitlist.insert(0, "Alan")

student = waitlist.pop(0)
print(f"Enrolled: {student}")
print(f"Waitlist: {waitlist}")
```

---

## Removing While Looping

```python
nums = [3, 5, 8, 7, 9]

for n in nums:
    if n % 2 == 1:
        nums.remove(n)

print(nums)   # [5, 8, 9]
```

The loop walks by position. Removing `3` slides `5` into index 0, and the loop moves on to index 1, so it never checks `5`. Removing `7` skips `9` the same way. [Visualization](https://pythontutor.com/visualize.html#code=nums%20%3D%20%5B3%2C%205%2C%208%2C%207%2C%209%5D%0A%0Afor%20n%20in%20nums%3A%0A%20%20%20%20if%20n%20%25%202%20%3D%3D%201%3A%0A%20%20%20%20%20%20%20%20nums.remove%28n%29%0A%0Aprint%28nums%29&curInstr=0&mode=display&origin=opt-frontend.js&py=311)

---

## Build a New List Instead

```python
nums = [3, 5, 8, 7, 9]

evens = []
for n in nums:
    if n % 2 == 0:
        evens.append(n)

print(evens)   # [8]
```

The loop never changes `nums`, so it checks every item.

---

## Parsons Problem #1 (you)

**One line does not belong.**

```python
result.append(word)
words = ["red", "blue", "red", "green", "blue"]
return result
for word in words:
words.remove(word)
def mystery(words):
kept = mystery(words)
if word not in result:
result = []
print(kept)
```

---

## Solution: Parsons Problem #1 (you)

```python
def mystery(words):
    result = []
    for word in words:
        if word not in result:
            result.append(word)

    return result

words = ["red", "blue", "red", "green", "blue"]
kept = mystery(words)
print(kept)
```

The extra line was `words.remove(word)`: removing while looping skips items, and it changes the caller's list too (next section). `not in result` keeps each word once.

---

## Copies, Functions, and Sorting

---

## Copy by Value and Copy by Reference

```python
x = 5
y = x
y = y + 1

print(x)   # 5
print(y)   # 6
```

- **Copy by value:** `y = x` acts as if `y` got its own copy, so changing `y` leaves `x` alone. Numbers and strings act this way, as [`double(n)`](07-functions.html#45) did in week 5.
- **Copy by reference:** `y = x` gives `y` the location of the value, so both names reach the same value. Lists act this way.

---

## Two Names, One List

<div class="cols">
<div>

```python
a = [1, 2, 3]
b = a
b.append(4)

print(a)   # [1, 2, 3, 4]
print(b)   # [1, 2, 3, 4]
```

</div>
<div>

<img src="./images/shared-list.svg" width="520">

</div>
</div>

`b = a` copies the reference, not the list. There is one list with two names, so a change made through `b` shows up through `a`. [Visualization](https://pythontutor.com/visualize.html#code=a%20%3D%20%5B1%2C%202%2C%203%5D%0Ab%20%3D%20a%0Ab.append%284%29%0A%0Aprint%28a%29%0Aprint%28b%29&curInstr=0&mode=display&origin=opt-frontend.js&py=311)

---

## Making a Copy

<div class="cols">
<div>

```python
a = [1, 2, 3]
b = a.copy()
b.append(4)

print(a)   # [1, 2, 3]
print(b)   # [1, 2, 3, 4]
```

</div>
<div>

<img src="./images/copied-list.svg" width="520">

</div>
</div>

`copy` builds a new list with the same items: copy by value for a list. `a` and `b` are now separate, so changing one leaves the other alone. A slice like `a[:]` is a new list too. [Visualization](https://pythontutor.com/visualize.html#code=a%20%3D%20%5B1%2C%202%2C%203%5D%0Ab%20%3D%20a.copy%28%29%0Ab.append%284%29%0A%0Aprint%28a%29%0Aprint%28b%29&curInstr=0&mode=display&origin=opt-frontend.js&py=311)

<!--
copy() and a[:] copy only the outer list. For a table, table.copy() still shares
the rows: changing a row through the copy changes it in the original too.
-->

---

## Functions That Change a List

```python
def double_all(nums):
    for i, x in enumerate(nums):
        nums[i] = x * 2

scores = [1, 2, 3]
double_all(scores)
print(scores)   # [2, 4, 6]
```

Passing a list to a function copies the reference, so `nums` and `scores` are one list. `double_all` changes that list and returns `None` implicitly.

---

## Problem: Curve the Scores (us)

```python
# Write a function, curve, that adds points to every score in the
# list without going over 100. curve changes the list itself and
# returns nothing.
scores = [90, 85, 77, 98]
curve(scores, 5)
print(scores)
```

```
[95, 90, 82, 100]
```

- Do we need the items, the indexes, or both?
- Why does `print(scores)` show the change?

---

## Solution: Curve the Scores (us)

```python
def curve(scores, points):
    for i, score in enumerate(scores):
        scores[i] = min(score + points, 100)

scores = [90, 85, 77, 98]
curve(scores, 5)
print(scores)
```

The loop needs both: `score` to work out the new value, and `i` to put it back. Both names reach one list, so the caller sees every change.

---

## `sorted` and `sort`

<div class="cols">
<div>

```python
nums = [3, 1, 2]
ordered = sorted(nums) # return new sorted list

print(ordered)   # [1, 2, 3]
print(nums)      # [3, 1, 2]
```

</div>
<div>

```python
nums = [3, 1, 2]
nums.sort() # return None

print(nums)   # [1, 2, 3]
```

</div>
</div>

Left: `sorted` builds a new list in order and leaves `nums` alone. Right: `sort` changes `nums` itself.

---

## Sorting Strings

```python
words = ["pear", "Apple", "fig"]
print(sorted(words))              # ['Apple', 'fig', 'pear']

print(sorted(["3", "10", "7"]))   # ['10', '3', '7']
print(sorted([3, 10, 7]))         # [3, 7, 10]
```

Strings sort the way [`min` and `max` compared them](08-lists.html#38): one character at a time, with uppercase before lowercase. Numbers stored as strings sort as text, so convert with `int` before you `append`.

---

## Parsons Problem #2 (you)

**One line does not belong.**

`//` is integer division: it divides, then rounds down. `7 // 2` is `3`.

```python
print(prices)
return ordered[middle]
ordered = nums.sort()
middle = len(ordered) // 2
prices = [250, 310, 275, 2400, 290]
def mystery(nums):
return (ordered[middle - 1] + ordered[middle]) / 2
ordered = sorted(nums)
print(mystery(prices))
if len(ordered) % 2 == 1:
```

---

## Solution: Parsons Problem #2 (you)

```python
def mystery(nums):
    ordered = sorted(nums)
    middle = len(ordered) // 2
    if len(ordered) % 2 == 1:
        return ordered[middle]
    return (ordered[middle - 1] + ordered[middle]) / 2

prices = [250, 310, 275, 2400, 290]
print(mystery(prices))
print(prices)
```

`mystery` returns the [median](changing-lists-cheatsheet.html#median). The extra line was `ordered = nums.sort()`: `sort` returns `None`, so `len(ordered)` raises a `TypeError`.

---

## Tables and Tuples

---

## A List of Lists

```python
grades = [[90, 85], [70, 88], [100, 95]]

print(grades[1])      # [70, 88]
print(grades[1][0])   # 70
print(len(grades))    # 3
```

<center>

|           | Column 0 | Column 1 |
| --------- | -------- | -------- |
| **Row 0** | `90`     | `85`     |
| **Row 1** | `70`     | `88`     |
| **Row 2** | `100`    | `95`     |

</center>

Each item of `grades` is a row, and each row is a list. `grades[1]` is a whole row; `grades[1][0]` is item 0 of that row.

---

## Looping Over a Table

```python
grades = [[90, 85], [70, 88], [100, 95]]

for i, row in enumerate(grades):
    total = 0
    for grade in row:
        total += grade
    print(f"Row {i}: {total}")
```

```
Row 0: 175
Row 1: 158
Row 2: 195
```

The outer loop hands over one row at a time, and the inner loop walks through that row's items: the nested loops from week 3. `total = 0` sits inside the outer loop, so each row starts over. `sum(row)` would do the inner loop in one call.

---

## A Row from a Line of Text

```python
line = "Ada,90,85"
fields = line.split(",")
print(fields)   # ['Ada', '90', '85']

row = [fields[0], int(fields[1]), int(fields[2])]
print(row)      # ['Ada', 90, 85]
```

Chapter 7 reads files one line at a time, and each line is a string like this one. `split` from week 4 turns it into a list of strings, so the numbers still need `int`.

---

## Problem: Column Average (us)

```python
# Write a function, column_average, that returns the average of one
# column of the table. Use it to print the average of each test.
table = [["Ada", 90, 85], ["Grace", 70, 88], ["Alan", 100, 95]]
```

```
Test 1: 86.67
Test 2: 89.33
```

- A column is one item from every row. Which loop do we need?
- Which columns hold test scores?

---

## Solution: Column Average (us)

```python
def column_average(table, col):
    total = 0
    for row in table:
        total += row[col]
    return total / len(table)

table = [["Ada", 90, 85], ["Grace", 70, 88], ["Alan", 100, 95]]
for col in range(1, 3):
    print(f"Test {col}: {column_average(table, col):.2f}")
```

A column is one item from every row, so the loop adds `row[col]` from each. Column 0 holds the names, so the tests are `range(1, 3)`.

---

## Parsons Problem #3 (you)

**One line does not belong.**

```python
return best[0], average
table = [["Ada", 90, 85], ["Grace", 70, 88], ["Alan", 100, 95]]
if sum(row) > sum(best):
best = table[0]
print(f"Best: {name} ({average:.2f})")
for row in table:
average = sum(best[1:]) / len(best[1:])
def mystery(table):
best = row
name, average = mystery(table)
if sum(row[1:]) > sum(best[1:]):
```

---

## Solution: Parsons Problem #3 (you)

<style scoped>
pre { font-size: 0.75em; }
</style>

```python
def mystery(table):
    best = table[0]
    for row in table:
        if sum(row[1:]) > sum(best[1:]):
            best = row

    average = sum(best[1:]) / len(best[1:])
    return best[0], average

table = [["Ada", 90, 85], ["Grace", 70, 88], ["Alan", 100, 95]]
name, average = mystery(table)
print(f"Best: {name} ({average:.2f})")
```

The extra line was `if sum(row) > sum(best):`. Item 0 of each row is a name, so `sum(row)` raises a `TypeError`. `best` starts at row 0, as in [How `max` Works](08-lists.html#37).

---

## Tuples

```python
point = (3, 4)

print(point[0])     # 3
print(len(point))   # 2
point[0] = 5        # TypeError
```

```
TypeError: 'tuple' object does not support item assignment
```

Unlike a list, a **tuple** is [immutable](06-strings-and-format-strings.html#41): once it exists, its items never change. Indexing, `len`, slices, and `for` loops work the same as on a list.

---

## Why Tuples?

- **Values that go together:** a student's `(name, grade)`, like `("Ada", 90)`. A list holds any number of similar items.
- **Safe to share:** a function cannot change a tuple, unlike the list in [`double_all`](#22).
- **Dictionary keys:** dictionaries, coming soon, accept only immutable keys, so a tuple can be a key and a list cannot.

More in the [Python FAQ](https://docs.python.org/3/faq/design.html#why-are-there-separate-tuple-and-list-data-types).

---

## You Have Used Tuples Already

```python
def low_high(nums):
    return min(nums), max(nums)

result = low_high([4, 9, 2])
print(result)      # (2, 9)

low, high = result
print(low, high)   # 2 9
```

`return a, b` [hands back one tuple](07-functions.html#80), and `low, high = ...` unpacks it. `enumerate` hands the loop a tuple each time around, like `(0, 90)`, and `i, score` unpacks it the same way.

---

## Summary

<style scoped>
ul { font-size: 0.85em; }
</style>

- A slice like `nums[1:3]` is a new list; the original keeps every item
- `nums[i] = x` replaces one item, which a string or a tuple cannot do
- `insert` adds at a position; `remove` takes out a value; `pop` takes out a position and hands the item back; `del` takes out a position
- Removing from a list while a `for` loop walks through it skips items, so build a new list instead
- After `b = a`, or after passing a list to a function, both names share one list; `copy()` makes a separate one
- `sorted` returns a new list; `sort` changes the list and gives back `None`
- A list of lists holds a table, read with `table[row][col]`
- Unlike a list, a tuple is immutable; `return a, b` and `enumerate` hand back tuples

---

## Next Up: Exceptions and Files

[Exceptions and Files](10-exceptions-and-files.html)

<!--
If time (from plans/1-lists.md): extend(), clear(), reverse(), a slice step (nums[::2]),
and the list methods count() and index().
Skip: list comprehensions and zip(). (enumerate() is taught in class 8.)
-->

---

## Appendix: Why `del names[i]` Gives Back "nothing"

<div class="cols">
<div>

```python
names = ["Ada", "Grace"]
gone = names.remove("Ada")
print(gone)   # None
```

</div>
<div>

```python
names = ["Ada", "Grace"]
gone = del names[0]
```

```
SyntaxError: invalid syntax
```

</div>
</div>

`remove` is a method call, and every call gives back a value: `None` here, as with `sort`. `del` is a statement, like `if`, so it has no value to store.
