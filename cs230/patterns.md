# Patterns

A pattern is a few lines of code that solve a problem that comes up often.

## Look Before You Leap

**Look Before You Leap** means checking for problems with an `if` before running a line of code that can raise an exception. The [Python glossary](https://docs.python.org/3/glossary.html#term-LBYL) calls it LBYL. Each section below names an exception and the checks that prevent it.

### `IndexError`

Check an index against `len` before using it, and check that a list has items before `pop`.

```python
scores = [90, 85, 77]
i = 5
if i >= 0 and i < len(scores):
    print(scores[i])
else:
    print(f"No score at index {i}.")

names = []
if len(names) > 0:
    print(names.pop())
else:
    print("No names left.")
```

```
No score at index 5.
No names left.
```

Without the checks, each one crashes on its own:

```
IndexError: list index out of range
IndexError: pop from empty list
```

Strings raise the same error, as in [Last Character: Empty Input](06-strings-and-format-strings.html#38).

### `ValueError`

`int` needs digits, `max` and `min` need at least one item, and `remove` needs the item to be in the list.

```python
text = "12a"
if text.isdecimal():
    print(int(text) * 2)
else:
    print(f"{text} is not a whole number.")

scores = []
if len(scores) > 0:
    print(max(scores))
else:
    print("No scores yet.")

names = ["Ada", "Grace"]
if "Alan" in names:
    names.remove("Alan")
else:
    print("Alan is not on the list.")
```

```
12a is not a whole number.
No scores yet.
Alan is not on the list.
```

Without the checks, each one crashes on its own:

```
ValueError: invalid literal for int() with base 10: '12a'
ValueError: max() iterable argument is empty
ValueError: list.remove(x): x not in list
```

`isdecimal` is the check that matches `int`. `"²".isdigit()` is `True`, but `int("²")` crashes ([A Bug We Didn't Handle](w4p1-helper.html#a-bug-we-didnt-handle)). `isdecimal` also rejects `"-5"`, which `int` accepts. [Enter a Valid Integer](06-strings-and-format-strings.html#81) slices off the minus sign before the check.

### `ZeroDivisionError`

Check the number you divide by. An average divides by `len(scores)`, so it needs the list to have items.

```python
total = 60
people = 0
if people > 0:
    print(f"Each pays ${total / people:.2f}")
else:
    print("Nobody to split the bill.")

scores = []
if len(scores) > 0:
    print(f"Average: {sum(scores) / len(scores):.2f}")
else:
    print("No scores yet.")
```

```
Nobody to split the bill.
No scores yet.
```

Without the checks, both divisions crash:

```
ZeroDivisionError: division by zero
```

`sum([])` is `0` and safe on its own. The average crashes because it divides by `len(scores)`, which is `0`.

### `TypeError`

A function that returns `None` to mean "no answer" needs a check before the caller uses the answer.

```python
def average(scores):
    if len(scores) == 0:
        return None
    return sum(scores) / len(scores)

result = average([])
if result == None:
    print("No scores.")
else:
    print(f"Average: {result:.2f}")
```

```
No scores.
```

Without the check, formatting `None` crashes:

```
TypeError: unsupported format string passed to NoneType.__format__
```

The function checks too: its `len` check prevents the `ZeroDivisionError` above. [Solution: Average of Scores](08-lists.html#30) uses both checks.

### `FileNotFoundError`

`os.path.isfile` checks that a file exists before `open` reads it. Appendix K of the textbook covers the `os` module.

```python
import os

filename = "scores.csv"
if os.path.isfile(filename):
    with open(filename, "r") as f:
        print(f.readline().strip())
else:
    print(f"Could not find {filename}")
```

When `scores.csv` is not next to the program:

```
Could not find scores.csv
```

Without the check, `open` crashes:

```
FileNotFoundError: [Errno 2] No such file or directory: 'scores.csv'
```

For files, [Easier to Ask for Forgiveness than Permission](#easier-to-ask-for-forgiveness-than-permission) is the safer choice. Another program can delete the file between the check and the `open`.

## Easier to Ask for Forgiveness than Permission

**Easier to Ask for Forgiveness than Permission** means running a line of code that can raise an exception inside [`try`](10-exceptions-and-files.html#4) and handling the exception in `except`. The [Python glossary](https://docs.python.org/3/glossary.html#term-EAFP) calls it EAFP. Each section below names an exception and the `except` that catches it.

### `IndexError`

An index past the end of a list and a `pop` from an empty list both raise an `IndexError`.

```python
scores = [90, 85, 77]
i = 5
try:
    print(scores[i])
except IndexError:
    print(f"No score at index {i}.")

names = []
try:
    print(names.pop())
except IndexError:
    print("No names left.")
```

```
No score at index 5.
No names left.
```

A negative index counts from the end of the list, so `i = -1` prints `77` with no exception.

### `ValueError`

`int` raises a `ValueError` for text that is not a whole number, `max` and `min` for an empty list, and `remove` for an item not in the list.

```python
text = "12a"
try:
    print(int(text) * 2)
except ValueError:
    print(f"{text} is not a whole number.")

scores = []
try:
    print(max(scores))
except ValueError:
    print("No scores yet.")

names = ["Ada", "Grace"]
try:
    names.remove("Alan")
except ValueError:
    print("Alan is not on the list.")
```

```
12a is not a whole number.
No scores yet.
Alan is not on the list.
```

`int` does the checking itself, so negative numbers like `"-5"` work.

### `ZeroDivisionError`

Dividing by `0` raises a `ZeroDivisionError`. An average divides by `len(scores)`, which is `0` for an empty list.

```python
total = 60
people = 0
try:
    print(f"Each pays ${total / people:.2f}")
except ZeroDivisionError:
    print("Nobody to split the bill.")

scores = []
try:
    print(f"Average: {sum(scores) / len(scores):.2f}")
except ZeroDivisionError:
    print("No scores yet.")
```

```
Nobody to split the bill.
No scores yet.
```

A function does not have to catch the exception itself. Python passes it to the line that called the function, and the `try` around that line catches it:

```python
def average(scores):
    return sum(scores) / len(scores)

try:
    print(f"Average: {average([]):.2f}")
except ZeroDivisionError:
    print("No scores.")
```

```
No scores.
```

### `FileNotFoundError`

`open` raises a `FileNotFoundError` when no file has that name.

```python
filename = "scores.csv"
try:
    with open(filename, "r") as f:
        print(f.readline().strip())
except FileNotFoundError:
    print(f"Could not find {filename}")
```

When `scores.csv` is not next to the program:

```
Could not find scores.csv
```

[`FileNotFoundError`](10-exceptions-and-files.html#22) in the exceptions lecture reads every line of the file the same way.
