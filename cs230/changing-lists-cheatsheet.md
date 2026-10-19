# Changing Lists Cheatsheet

A list can change after it is made: you can replace its items, add new ones, and take them out. This sheet collects the list tools from the Changing Lists lecture and Chapter 6 in one place. Every example can be pasted into a file and run.

## Slicing

```python
scores = [90, 85, 77, 100, 68]

scores[1:3]    # [85, 77]                up to, not including, 3
scores[:2]     # [90, 85]                start defaults to 0
scores[2:]     # [77, 100, 68]           end defaults to len
scores[-2:]    # [100, 68]               the last two items
scores[::2]    # [90, 77, 68]            every other item
scores[::-1]   # [68, 100, 77, 85, 90]   reversed
```

The full form is `nums[start:end:step]`, the same as a [string slice](string-cheatsheet.html#slicing). A slice is a new list, so the original keeps every item.

## Changing One Item

```python
scores = [90, 85, 77, 100, 68]
scores[0] = 95
print(scores)   # [95, 85, 77, 100, 68]
```

Assigning to an index replaces that item. Strings and tuples are **immutable**, so `word[0] = "H"` is a `TypeError` for them. To change every item, loop over the indexes with `enumerate`:

```python
nums = [1, 2, 3]
for i, x in enumerate(nums):
    nums[i] = x * 2

print(nums)   # [2, 4, 6]
```

Assigning to `x` alone leaves the list as it was. Only `nums[i] = ...` changes it.

## Adding and Removing Items

| Write               | What it does                                           | Gives back |
| ------------------- | ------------------------------------------------------ | ---------- |
| `nums.append(x)`    | adds `x` at the end                                    | `None`     |
| `nums.insert(i, x)` | puts `x` at index `i` and moves later items right      | `None`     |
| `nums.extend(more)` | adds every item of the list `more` at the end          | `None`     |
| `nums.remove(x)`    | removes the first `x`                                  | `None`     |
| `nums.pop()`        | removes the last item                                  | the item   |
| `nums.pop(i)`       | removes the item at index `i`                          | the item   |
| `del nums[i]`       | removes the item at index `i`; a keyword, not a method | nothing    |
| `nums.clear()`      | removes every item                                     | `None`     |

```python
names = ["Ada", "Grace"]
names.insert(0, "Alan")     # ['Alan', 'Ada', 'Grace']
names.append("Linus")       # ['Alan', 'Ada', 'Grace', 'Linus']
names.extend(["Barbara"])   # ['Alan', 'Ada', 'Grace', 'Linus', 'Barbara']
names.remove("Grace")       # ['Alan', 'Ada', 'Linus', 'Barbara']
last = names.pop()          # last is 'Barbara'; ['Alan', 'Ada', 'Linus']
first = names.pop(0)        # first is 'Alan'; ['Ada', 'Linus']
del names[0]                # ['Linus']
names.clear()               # []
```

`pop` is the only one that hands the item back. The methods that change a list give back `None`, so never store what they return: `names = names.append("Ada")` sets `names` to `None` and throws the list away.

### Moving an Item

```python
playlist = ["Blue Sky", "Rainy Day", "Night Drive", "Sunrise", "Last Call"]

if len(playlist) > 0:
    song = playlist.pop()
    playlist.insert(0, song)

print(f"Up next: {playlist[:3]}")   # Up next: ['Last Call', 'Blue Sky', 'Rainy Day']
print(f"Later: {playlist[3:]}")     # Later: ['Night Drive', 'Sunrise']
```

`pop` hands back the song it removed, so it can go straight into `insert`. The `len` check skips the move for an empty playlist, where `pop` would crash. `playlist[:3]` and `playlist[3:]` split the list at index 3 with no overlap.

### When Removing Fails

```python
names = ["Ada", "Grace"]

if "Alan" in names:
    names.remove("Alan")

if len(names) > 0:
    names.pop()
```

`remove` raises `ValueError: list.remove(x): x not in list` when the item is missing, so check with `in` first. `pop` raises `IndexError: pop from empty list`, so check `len` first.

## Searching and Counting

| Write           | Gives back                                       | Example                                      |
| --------------- | ------------------------------------------------ | -------------------------------------------- |
| `x in nums`     | `True` if `x` is one of the items                | `"red" in ["red", "blue"]` is `True`         |
| `x not in nums` | `True` if it is not                              | `"pink" not in ["red", "blue"]` is `True`    |
| `nums.count(x)` | how many times `x` appears                       | `["red", "blue", "red"].count("red")` is `2` |
| `nums.index(x)` | the index of the first `x`; `ValueError` if none | `["red", "blue"].index("blue")` is `1`       |
| `len(nums)`     | the number of items                              | `len(["red", "blue"])` is `2`                |

## Removing While Looping

```python
nums = [3, 5, 8, 7, 9]

for n in nums:
    if n % 2 == 1:
        nums.remove(n)

print(nums)   # [5, 8, 9]
```

A `for` loop walks through a list by position. Removing `3` slides `5` into index 0, and the loop moves on to index 1, so it never checks `5`. Removing `7` skips `9` the same way. Build a new list instead:

```python
nums = [3, 5, 8, 7, 9]

evens = []
for n in nums:
    if n % 2 == 0:
        evens.append(n)

print(evens)   # [8]
```

## Copies and References

```python
a = [1, 2, 3]
b = a           # one list with two names
b.append(4)
print(a)        # [1, 2, 3, 4]

c = a.copy()    # a separate list; a[:] works too
c.append(5)
print(a)        # [1, 2, 3, 4]
print(c)        # [1, 2, 3, 4, 5]
```

`b = a` copies the **reference**, the location of the list, so both names reach the same list. Python does this for every type. Numbers and strings only look copied, because they cannot change in place: `+=` on a string builds a new string and points the name at it.

### Passing a List to a Function

```python
def double_all(nums):
    for i, x in enumerate(nums):
        nums[i] = x * 2

scores = [1, 2, 3]
double_all(scores)
print(scores)   # [2, 4, 6]
```

The parameter `nums` and the argument `scores` are one list, so changes inside the function show up outside it. To leave the caller's list alone, build a new list and `return` it, or work on `sorted(nums)` or `nums.copy()`.

### Copying a Table

```python
table = [[90, 85], [70, 88]]
backup = table.copy()
backup[0][0] = 0
print(table)   # [[0, 85], [70, 88]]

backup = []
for row in table:
    backup.append(row.copy())
```

`copy()` and `[:]` copy only the outer list. The rows inside are still shared, so changing a row through the copy changes the original too. The loop at the end copies each row as well.

## Sorting

| Write            | What it does                                    | Gives back   |
| ---------------- | ----------------------------------------------- | ------------ |
| `sorted(nums)`   | builds a new list in order; `nums` is unchanged | the new list |
| `nums.sort()`    | puts `nums` itself in order                     | `None`       |
| `nums.reverse()` | reverses the order of `nums` itself             | `None`       |

```python
nums = [3, 1, 2]
ordered = sorted(nums)   # [1, 2, 3]; nums is still [3, 1, 2]
nums.sort()              # nums is now [1, 2, 3]
nums.reverse()           # nums is now [3, 2, 1]

nums = nums.sort()       # wrong: nums is now None
```

Strings sort one character at a time, with every uppercase letter before every lowercase letter: `sorted(["pear", "Apple", "fig"])` is `['Apple', 'fig', 'pear']`. Numbers stored as strings sort as text: `sorted(["3", "10", "7"])` is `['10', '3', '7']`. Convert them with `int` first.

### Median

```python
def median(scores):
    ordered = sorted(scores)
    middle = len(ordered) // 2
    if len(ordered) % 2 == 1:
        return ordered[middle]
    return (ordered[middle - 1] + ordered[middle]) / 2

scores = [90, 72, 85, 100, 68]
print(median(scores))             # 85
print(median([90, 72, 85, 100]))  # 87.5
print(scores)                     # [90, 72, 85, 100, 68]
```

`sorted` gives `median` a list of its own, so the caller's list keeps its order. With five scores, `middle` is `5 // 2`, or 2: the third item. With four, the two middle items sit at indexes 1 and 2.

## Tables: Lists of Lists

```python
grades = [[90, 85], [70, 88], [100, 95]]

grades[1]        # [70, 88]   row 1
grades[1][0]     # 70         row 1, column 0
len(grades)      # 3          the number of rows
len(grades[0])   # 2          the number of columns
```

|           | Column 0 | Column 1 |
| --------- | -------- | -------- |
| **Row 0** | `90`     | `85`     |
| **Row 1** | `70`     | `88`     |
| **Row 2** | `100`    | `95`     |

### Row by Row

```python
table = [
    ["Ada", 90, 85, 92],
    ["Grace", 70, 88, 81],
    ["Alan", 100, 95, 98],
]

for row in table:
    print(f"{row[0]}: {sum(row[1:])}")
```

```
Ada: 267
Grace: 239
Alan: 293
```

`row[0]` is the name, and the slice `row[1:]` holds only the scores. `sum(row)` would try to add `"Ada"` to a number and raise a `TypeError`.

### Column by Column

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

```
Test 1: 86.67
Test 2: 89.33
```

A column is one item from every row, so the loop goes over the rows and picks item `col` from each. `len(table)` is the number of rows.

### A Row from a Line of Text

```python
line = "Ada,90,85"
fields = line.split(",")                            # ['Ada', '90', '85']
row = [fields[0], int(fields[1]), int(fields[2])]   # ['Ada', 90, 85]
```

`split` gives back strings, so the numbers still need `int`. Reading a file gives one line like this at a time.

## Tuples

```python
point = (3, 4)
print(point[0])    # 3
print(len(point))  # 2

def low_high(nums):
    return min(nums), max(nums)

result = low_high([4, 9, 2])
print(result)      # (2, 9)
low, high = result
print(low, high)   # 2 9

for i, score in enumerate([90, 85]):
    print(i, score)
```

Unlike a list, a **tuple** is **immutable**: once it exists, its items never change, so `point[0] = 5` is a `TypeError`. Indexing, `len`, slices, and `for` loops work the same as on a list. `return a, b` hands back one tuple, and `low, high = ...` **unpacks** it into two names. `enumerate` hands the loop a tuple each time around, `(0, 90)` and then `(1, 85)`, and `i, score` unpacks it.

## Common Mistakes

| Code                                     | Problem                                           | Fix                                        |
| ---------------------------------------- | ------------------------------------------------- | ------------------------------------------ |
| `nums = nums.sort()`                     | `nums` becomes `None`                             | `nums.sort()` on its own line, or `sorted` |
| `names = names.append("Ada")`            | `names` becomes `None`                            | `names.append("Ada")` on its own line      |
| `names.remove("Alan")`                   | `ValueError` when `"Alan"` is not in the list     | `if "Alan" in names:` first                |
| `names.pop()`                            | `IndexError` when the list is empty               | `if len(names) > 0:` first                 |
| `nums.remove(n)` inside `for n in nums:` | skips the item after each one removed             | build a new list of the items to keep      |
| `b = a`, then `b.append(4)`              | `a` changes too; they are one list                | `b = a.copy()`                             |
| `table.copy()`                           | the rows are still shared with `table`            | copy each row with `row.copy()`            |
| `sorted(["3", "10", "7"])`               | `['10', '3', '7']`: sorted as text                | convert with `int` before you `append`     |
| `sum(row)` on `["Ada", 90, 85]`          | `TypeError`: a string cannot be added to a number | `sum(row[1:])`                             |
| `point[0] = 5` on a tuple                | `TypeError`: tuples are immutable                 | use a list when the items need to change   |

## Glossary

- **copy by reference**: Copying the location of a value, so both names reach the same value. Python copies every value this way, so after `b = a`, `b` and `a` are one list.
- **copy by value**: Giving the new name a copy of its own. `a.copy()` and `a[:]` do this for a list.
- **immutable**: Cannot be changed after it is created. Strings and tuples are immutable; lists are not.
- **in place**: Changing a list itself, as `sort`, `append`, and `nums[i] = x` do, instead of building a new list.
- **list of lists**: A list whose items are lists. Each inner list is a row, read with `table[row][col]`.
- **mutable**: Can be changed after it is created. Lists are mutable.
- **reference**: The location of a value. A name holds a reference, and `b = a` copies it.
- **slice**: A piece of a list, such as `nums[1:3]`. A slice is a new list.
- **tuple**: A list-like value, written with parentheses, that cannot change. `return a, b` hands back a tuple.
- **unpacking**: Giving each piece of a tuple its own name, as in `low, high = low_high(nums)`.
