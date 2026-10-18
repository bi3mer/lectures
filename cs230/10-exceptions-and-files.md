---
marp: true
theme: lecture
paginate: true
---

# Exceptions and Files

Colan Biemer

---

## Exceptions

Catching the errors that used to end our programs.

---

## Errors We Have Seen

| Exception           | What caused it                        | Where                                                                   |
| ------------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| `NameError`         | calling `say_hello()` above its `def` | [Define Before You Call](07-functions.html#12)                          |
| `AttributeError`    | calling `append` on `None`            | [`append` Gives Back `None`](08-lists.html#10)                          |
| `IndexError`        | `scores[5]` on a list of five         | [Index Out of Range](08-lists.html#7)                                   |
| `TypeError`         | `"Age: " + 21`                        | [Strings and Numbers Do Not Mix](06-strings-and-format-strings.html#19) |
| `ValueError`        | `max([])` on an empty list            | [When `max` and `sum` Fail](08-lists.html#40)                           |
| `ZeroDivisionError` | `split_bill(60, 0)`                   | [Split the Bill](07-functions.html#52)                                  |

Each of these is an **exception**: Python stops the program and names what went wrong. Today, we catch them, so the program can handle the problem and keep going.

---

## Problem: What Is the Output?

```python
text = input("Enter a number: ")
value = float(text)
print(value * 2)
print("Done")
```

The user enters `abc`.

---

## Solution: What Is the Output?

```python
text = input("Enter a number: ")   # abc
value = float(text)                # ValueError
print(value * 2)
print("Done")
```

```
ValueError: could not convert string to float: 'abc'
```

The program stops at `float(text)`, so neither `print` runs. `int` and `float` have crashed on text like this since [week 1](02-variables-and-statements.html#27).

---

## New Keywords: `try` and `except`

```python
try:
    # code that might raise an exception
except [EXCEPTION]:
    # runs only if the code in try raised EXCEPTION

# program continues as normal
```

Notice the colons and the indentation, just like `if` and `else`.

---

## Catching a `ValueError`

<div class="cols">
<div>

```python
text = input("Enter a number: ")
try:
    value = float(text)
    print(value * 2)
except ValueError:
    print(f"{text} is not a number.")
print("Done")
```

</div>
<div>

```
Enter a number: 3.5
7.0
Done
```

```
Enter a number: abc
abc is not a number.
Done
```

</div>
</div>

With `3.5`, every line in `try` runs, and Python skips the `except` block. With `abc`, `float(text)` raises a `ValueError`. Python stops the `try` block on that line, jumps to `except ValueError:`, and runs its body. Either way, the program reaches `print("Done")`.

---

## Problem: What Is the Output?

```python
try:
    print("A")
    n = int("seven")
    print("B")
except ValueError:
    print("C")
print("D")
```

---

## Solution: What Is the Output?

```python
try:
    print("A")         # A
    n = int("seven")   # ValueError
    print("B")
except ValueError:
    print("C")         # C
print("D")             # D
```

`A` prints before anything fails. `int("seven")` raises, so `B` never prints: like `return`, the line that fails ends the `try` block. With `int("7")`, the output would be `A`, `B`, `D`.

---

## Problem: Find the Bug

```python
text = input("Enter a number: ")
try:
    value = flaot(text)
    print(value * 2)
except:
    print("Not a number.")
```

```
Enter a number: 3.5
Not a number.
```

`3.5` is a number. Why does every input print `Not a number.`?

---

## Solution: Find the Bug

```python
text = input("Enter a number: ")
try:
    value = flaot(text)   # misspelled
    print(value * 2)
except ValueError:
    print("Not a number.")
```

```
NameError: name 'flaot' is not defined. Did you mean: 'float'?
```

`except:` with no name catches every exception, including the `NameError` from the typo, so the bug hides behind the wrong message. The textbook writes `except:` this way. Name the exception you expect, and Python still reports the ones you did not expect.

---

## We Do: Keep the Numbers

```python
# Write a function, safe_int, that returns the text as an int, or
# None if it is not one. Use it to keep only the whole numbers.
entries = ["12", "-3", "abc", "7", "4.5"]
```

```
[12, -3, 7]
```

- Where does each `return` go?
- Why not check with `isdigit` instead?

---

## Solution: Keep the Numbers

<style scoped>
pre { font-size: 0.75em; }
</style>

```python
def safe_int(text):
    try:
        return int(text)
    except ValueError:
        return None

entries = ["12", "-3", "abc", "7", "4.5"]
numbers = []
for entry in entries:
    n = safe_int(entry)
    if n != None:
        numbers.append(n)
print(numbers)
```

`return int(text)` sits in the `try`, so it hands back a number only when `int` succeeds. Every other entry jumps to the `except` block, which returns `None`, and the loop keeps an entry only when `n != None`. `isdigit` would reject the `-` in `-3`, which is why the [week 4 solution](06-strings-and-format-strings.html#81) sliced it off; `int` decides by itself. `"4.5"` fails because `int` rejects a decimal point.

---

## You Do: `get_float`

Write `get_float`, a function that asks with the prompt it is given until the user enters a number, then returns that number. Use it to read a price and a quantity. **One line does not belong.**

<div class="cols">
<div>

```python
quantity = get_float("Quantity: ")
except ValueError:
return None
def get_float(prompt):
print(f"Total: ${price * quantity:.2f}")
try:
print("Enter a number.")
price = get_float("Price: ")
while True:
return float(input(prompt))
```

</div>
<div>

```
Price: four
Enter a number.
Price: 4.50
Quantity: 3
Total: $13.50
```

</div>
</div>

---

## Solution: `get_float`

```python
def get_float(prompt):
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Enter a number.")

price = get_float("Price: ")
quantity = get_float("Quantity: ")
print(f"Total: ${price * quantity:.2f}")
```

The extra line was `return None`. `safe_int` could give back `None` for bad text, but `get_float` has to ask again. `return None` would end the function on the first bad entry, and `price * quantity` would raise a `TypeError`. `return` ends the function, and the loop with it, the first time `float` succeeds. A bad entry prints the message, and `while True` asks again.

---

## Reading Files

Data that is still there after the program ends.

---

## Why Files?

<div class="cols">
<div>

```
name,score
Ada,90
Grace,85
Alan,77
Linus,100
Barbara,68
```

</div>
<div>

Every program so far starts with nothing and forgets everything when it ends. `input` needs someone to type every value. A **text file** stores lines of text on disk, so a program can read data that was saved earlier. Left: `scores.csv`, where commas separate the values.

</div>
</div>

Download today's files into a folder named `data`, next to your program: [names.txt](data/names.txt), [measures.txt](data/measures.txt), [scores.csv](data/scores.csv), [sales.csv](data/sales.csv), and [prices.csv](data/prices.csv).

---

## Files in a Folder: `os.path.join`

```python
import os

path = os.path.join("data", "scores.csv")
print(path)   # data/scores.csv on a Mac, data\scores.csv on Windows
```

`import os` loads the **`os` module**, a set of tools for files and folders that comes with Python, the way [`import sys`](02-variables-and-statements.html#21) did in week 1. `os.path.join` glues folder and file names together with the separator your computer uses: `/` on a Mac and `\` on Windows. We will see more of `os` next week.

---

## Opening a File with `with`

```python
with open([PATH], "r") as [NAME]:
    # NAME is the open file; "r" means read

# the file is closed here
```

`open` finds the file at `PATH` and connects it to the program. `with` keeps it open for the indented block, then closes it, even if the block raises an exception.

---

## Problem: What Is the Output?

<div class="cols">
<div>

```python
import os

path = os.path.join("data", "names.txt")
with open(path, "r") as f:
    for line in f:
        print(line)
```

</div>
<div>

```
Ada
Grace
Alan
```

</div>
</div>

Right: `names.txt`, as it looks in VS Code.

---

## Solution: What Is the Output?

```
Ada

Grace

Alan
```

`for line in f:` hands the loop one line at a time, as a string. Each line keeps the `\n` that ends it in the file, so the first `line` is `"Ada\n"`, and `len(line)` is 4. `print` adds its own `\n`, so a blank line follows each name.

---

## Removing the `\n`

```python
with open(path, "r") as f:
    for line in f:
        print(line.strip())
```

```
Ada
Grace
Alan
```

`strip` from [More Methods](06-strings-and-format-strings.html#90) removes spaces and newlines from both ends. The textbook writes `line.rstrip("\n")`, which removes only the newline at the end. Either works here; these slides use `strip`.

---

## The Textbook's Form: `open` and `close`

<div class="cols">
<div>

```python
f = open(path, "r")
for line in f:
    print(line.strip())
f.close()
```

</div>
<div>

```python
with open(path, "r") as f:
    for line in f:
        print(line.strip())
```

</div>
</div>

Left: the textbook's version (program 7-3). `open` hands back the file, and `close` ends the connection. `with` closes the file when the block ends, so there is nothing to forget. A forgotten `close` can lose what a program writes, which we will see when we write files.

---

## `FileNotFoundError`

```python
import os

path = os.path.join("data", "nmaes.txt")
try:
    with open(path, "r") as f:
        for line in f:
            print(line.strip())
except FileNotFoundError:
    print(f"Could not find {path}")
```

```
Could not find data/nmaes.txt
```

`open` raises a `FileNotFoundError` when nothing is at the path. The usual causes are a misspelled name, like `nmaes.txt`, a file saved outside `data`, or VS Code open on a different folder. VS Code runs your program from the folder it has open, so open the folder that holds your program.

---

## Problem: What Is the Output?

```python
import os

total = 0
with open(os.path.join("data", "measures.txt"), "r") as f:
    for line in f:
        total += float(line)

print(f"Total: {total:.1f}")
```

`measures.txt` holds `10.1`, `9.9`, and `9.8`, one per line, then a blank last line.

---

## Solution: What Is the Output?

```
ValueError: could not convert string to float: '\n'
```

```python
    for line in f:
        if line.strip() != "":
            total += float(line)
```

`float("10.1\n")` works, since `float` ignores spaces and newlines around the number ([Converting Text to Numbers](exceptions-and-files-cheatsheet.html#converting-text-to-numbers)). The last line is only `"\n"`, with no number to convert. Skip blank lines before converting, and the program prints `Total: 29.8`.

---

## Lines with Fields

```python
line = "Ada,90\n"
fields = line.strip().split(",")
print(fields)            # ['Ada', '90']

name = fields[0]
score = int(fields[1])
print(name, score + 5)   # Ada 95
```

Each line of `scores.csv` holds two **fields**, separated by a comma. Strip, split, then convert: the same steps as [A Row from a Line of Text](09-changing-lists.html#31). The name stays a string; the score needs `int`.

---

## Problem: What Is the Output?

```python
import os

with open(os.path.join("data", "scores.csv"), "r") as f:
    for line in f:
        fields = line.strip().split(",")
        print(fields[0], int(fields[1]))
```

The first two lines of `scores.csv` are `name,score` and `Ada,90`.

---

## Solution: What Is the Output?

```
ValueError: invalid literal for int() with base 10: 'score'
```

```python
with open(os.path.join("data", "scores.csv"), "r") as f:
    f.readline()
    for line in f:
        fields = line.strip().split(",")
        print(fields[0], int(fields[1]))
```

The first line, `name,score`, is a **header**: it names the columns, and `int("score")` fails. `f.readline()` reads one line and moves past it, so the `for` loop starts at line 2. Nothing stores what `readline` gave back, so the header is thrown away. Once every line has been read, `readline` gives back `""`, an empty string.

---

## We Do: Total Sales

```python
# data/sales.csv holds one sale per line. Print the total of
# price * quantity over every sale, to the cent.
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
Total: $151.90
```

</div>
</div>

- Which line is different from the rest?
- Which fields need converting, and to what?

---

## Solution: Total Sales

```python
import os

total = 0
with open(os.path.join("data", "sales.csv"), "r") as f:
    f.readline()
    for line in f:
        fields = line.strip().split(",")
        price = float(fields[2])
        quantity = int(fields[3])
        total += price * quantity

print(f"Total: ${total:.2f}")
```

The header is the line that differs, so `readline` skips it. Price is field 2 and quantity is field 3. The product and the date are never used, so they stay strings. Quantity counts whole items, so it gets `int`.

---

## You Do: Top Student

<style scoped>
pre { font-size: 0.75em; }
</style>

Print the student with the highest score in `data/scores.csv`. **One line does not belong.**

<div class="cols">
<div>

```python
best_score = score
print(f"Top student: {best_name} ({best_score})")
f.readline()
import os
if fields[1] > best_score:
score = int(fields[1])
best_name = ""
for line in f:
path = os.path.join("data", "scores.csv")
if score > best_score:
with open(path, "r") as f:
best_name = fields[0]
fields = line.strip().split(",")
best_score = -1
```

</div>
<div>

```
Top student: Linus (100)
```

</div>
</div>

---

## Solution: Top Student

<style scoped>
pre { font-size: 0.75em; }
</style>

```python
import os

best_name = ""
best_score = -1
path = os.path.join("data", "scores.csv")
with open(path, "r") as f:
    f.readline()
    for line in f:
        fields = line.strip().split(",")
        score = int(fields[1])
        if score > best_score:
            best_score = score
            best_name = fields[0]

print(f"Top student: {best_name} ({best_score})")
```

The extra line was `if fields[1] > best_score:`. `fields[1]` is a string like `"90"`, and comparing a string with a number raises a `TypeError`. `best_score` starts at `-1`, below any real score, so the first student always replaces it.

---

## Writing Files

Saving results for the next program.

---

## Opening a File for Writing

<div class="cols">
<div>

```python
import os

name = "Ada"
score = 90
path = os.path.join("data", "report.txt")
with open(path, "w") as out:
    print(f"Report for {name}", file=out)
    print("name,score", file=out)
    print(name, score, sep=",", file=out)
```

</div>
<div>

```
Report for Ada
name,score
Ada,90
```

This is `data/report.txt` after the program runs.

</div>
</div>

`"w"` opens the file for writing. It creates the file if it is missing and **erases it** if it exists, so never open your input file with `"w"`. `file=out` sends `print`'s line to the file instead of the screen, `\n` included. `sep=","` puts a comma between the values, which builds a CSV line. To add to the end of a file instead, open it with `"a"` (append).

---

## Why `close` Matters

<div class="cols">
<div>

```python
out = open(path, "w")
print("Ada,90", file=out)

f = open(path, "r")
print(len(f.readline()))   # 0
f.close()
```

</div>
<div>

```python
out = open(path, "w")
print("Ada,90", file=out)
out.close()

f = open(path, "r")
print(len(f.readline()))   # 7
f.close()
```

</div>
</div>

`print(..., file=out)` can hold a line in memory instead of saving it to the file right away, and `close` saves whatever is waiting. Without `out.close()` (left), the file still looks empty when the program reads it back, so `readline` gives back `""`. With it (right), `readline` gives back `"Ada,90\n"`, all 7 characters. A `with` block calls `close` for you when it ends.

---

## We Do: Raise the Prices

```python
# Copy data/prices.csv (left) to data/new_prices.csv (right) with
# every price raised 10%, to the cent. Skip rows whose price is not
# a number, and print how many.
```

<div class="cols">
<div>

```
item,price
coffee,3.00
bagel,2.50
tea,n/a
muffin,2.80
juice,4.00
```

</div>
<div>

```
item,price
coffee,3.30
bagel,2.75
muffin,3.08
juice,4.40
```

</div>
</div>

- How do we copy the header?
- What does `float("n/a")` do?

---

## Solution: Raise the Prices

<style scoped>
pre { font-size: 0.7em; }
</style>

```python
import os

in_path = os.path.join("data", "prices.csv")
out_path = os.path.join("data", "new_prices.csv")
skipped = 0
with open(in_path, "r") as fin:
    with open(out_path, "w") as fout:
        header = fin.readline()
        print(header.strip(), file=fout)
        for line in fin:
            fields = line.strip().split(",")
            try:
                price = float(fields[1]) * 1.10
                print(fields[0], f"{price:.2f}", sep=",", file=fout)
            except ValueError:
                skipped += 1

print(f"Rows skipped: {skipped}")
```

Both files stay open at once, so the `with` blocks nest. `readline` reads the header, and `print` writes it straight to the new file. `float("n/a")` raises a `ValueError`, so the `print` after it never runs, the `tea` row is left out, and the program prints `Rows skipped: 1`.

---

## You Do: Passing Scores

<style scoped>
pre { font-size: 0.7em; }
</style>

Copy the header and every score of 70 or more from `data/scores.csv` to `data/passed.csv`, and print how many passed. **One line does not belong.**

<div class="cols">
<div>

```python
count += 1
with open(out_path, "r") as fout:
for line in fin:
import os
print(f"Passed: {count}")
header = fin.readline()
if int(fields[1]) >= 70:
out_path = os.path.join("data", "passed.csv")
with open(in_path, "r") as fin:
print(fields[0], fields[1], sep=",", file=fout)
count = 0
fields = line.strip().split(",")
in_path = os.path.join("data", "scores.csv")
with open(out_path, "w") as fout:
print(header.strip(), file=fout)
```

</div>
<div>

```
name,score
Ada,90
Grace,85
Alan,77
Linus,100
```

This is `data/passed.csv` after the program runs.

```
Passed: 4
```

</div>
</div>

---

## Solution: Passing Scores

<style scoped>
pre { font-size: 0.75em; }
</style>

```python
import os

in_path = os.path.join("data", "scores.csv")
out_path = os.path.join("data", "passed.csv")
count = 0
with open(in_path, "r") as fin:
    with open(out_path, "w") as fout:
        header = fin.readline()
        print(header.strip(), file=fout)
        for line in fin:
            fields = line.strip().split(",")
            if int(fields[1]) >= 70:
                print(fields[0], fields[1], sep=",", file=fout)
                count += 1

print(f"Passed: {count}")
```

The extra line was `with open(out_path, "r") as fout:`. `"r"` opens a file only for reading: it raises a `FileNotFoundError` if `passed.csv` does not exist yet, and `print(..., file=fout)` fails with `io.UnsupportedOperation: not writable` if it does. Barbara's `68` fails the `if`, so 4 of the 5 students are written.

---

## Summary

<style scoped>
ul { font-size: 0.85em; }
</style>

- An **exception** stops the program; `try` and `except` catch one, so the program can keep going
- Name the exception you expect, like `except ValueError:`; a bare `except:` also hides bugs such as typos
- `int` and `float` raise a `ValueError` on text that is not a number
- `os.path.join("data", name)` builds a path that works on a Mac and on Windows
- `with open(path, "r") as f:` closes the file when the block ends; without `with`, call `f.close()`
- `for line in f:` reads one line at a time, as a string that keeps its `\n`, so `strip` it
- `f.readline()` reads one line (`""` at the end of the file), which is how to skip a header
- `split(",")` breaks a line into fields; convert number fields with `int` or `float`
- `open(path, "w")` creates or erases a file; `print(..., file=out)` writes a line to it

---

## Next Up: Folders and Dictionaries

The rest of the `os` module, then dictionaries: Appendix K and Chapter 9.

The [Exceptions and Files Cheat Sheet](exceptions-and-files-cheatsheet.html) has today's tools in one place, with more examples, the textbook's `readline` loop, and `os.listdir`.

<!--
If time: the textbook's while loop over readline() (program 7-2), which stops when readline()
returns "", and a demo of "a" (append): run the cheat sheet's guests.txt program twice.
Next week: os.listdir() (moved out of this deck; see the cheat sheet), os.getcwd() to explain
FileNotFoundError from the wrong folder, os.path.isfile(), os.path.exists(), and programs K-1
and K-2.
-->
