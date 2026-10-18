# Exceptions and Files Cheatsheet

An **exception** is an error that stops a program unless the program catches it. A **text file** holds lines of text that stay on disk after a program ends. This sheet collects exceptions and files from Chapter 7 and class in one place. Every example can be pasted into a file and run. The file examples expect the class data files ([names.txt](data/names.txt), [measures.txt](data/measures.txt), [scores.csv](data/scores.csv), [sales.csv](data/sales.csv), and [prices.csv](data/prices.csv)) in a folder named `data`, next to your program.

## Exceptions

| Exception           | Raised by                                    | Example                                      |
| ------------------- | -------------------------------------------- | -------------------------------------------- |
| `ValueError`        | the right type, but a value that cannot work | `int("abc")`, `max([])`                      |
| `TypeError`         | a value of the wrong type                    | `"Age: " + 21`, `"90" > 50`                  |
| `IndexError`        | an index past the end of a list or string    | `scores[5]` on a list of five, `[].pop()`    |
| `ZeroDivisionError` | dividing by zero                             | `60 / 0`                                     |
| `NameError`         | a name Python does not know                  | a typo, like `flaot("3.5")`                  |
| `AttributeError`    | a method the value does not have             | `names.append("Ada")` when `names` is `None` |
| `FileNotFoundError` | opening a missing file to read it            | `open("nmaes.txt", "r")`                     |

## `try` and `except`

```python
text = input("Enter a number: ")
try:
    value = float(text)
    print(value * 2)
except ValueError:
    print(f"{text} is not a number.")
print("Done")
```

| Input | Output                              |
| ----- | ----------------------------------- |
| `3.5` | `7.0`, then `Done`                  |
| `abc` | `abc is not a number.`, then `Done` |

Python runs the `try` block one line at a time. When a line raises an exception, the rest of the `try` block is skipped, and Python runs the `except` block whose name matches. When nothing goes wrong, Python skips the `except` block. Either way, the program goes on after it.

### Name the Exception

```python
text = input("Enter a number: ")
try:
    value = flaot(text)
    print(value * 2)
except:
    print("Not a number.")
```

This prints `Not a number.` for every input, even `3.5`. A bare `except:` catches every exception, including the `NameError` from the typo `flaot`, so the bug hides behind the wrong message. The textbook writes `except:` this way. Write `except ValueError:` instead, and Python still reports the exceptions you did not expect.

### Several `except` Blocks

```python
try:
    total = float(input("Total: "))
    people = int(input("People: "))
    print(f"Each person pays ${total / people:.2f}")
except ValueError:
    print("Enter numbers only.")
except ZeroDivisionError:
    print("There has to be at least one person.")
```

Python runs the first `except` whose name matches. An `if people <= 0:` check also keeps zero people from crashing the program; a `try` helps when one block can fail in more than one way.

## Converting Text to Numbers

| Write               | Gives        |
| ------------------- | ------------ |
| `int("12")`         | `12`         |
| `int("-12")`        | `-12`        |
| `int(" 12\n")`      | `12`         |
| `float("10.1\n")`   | `10.1`       |
| `int("3.5")`        | `ValueError` |
| `int(float("3.5"))` | `3`          |
| `float("1,250")`    | `ValueError` |
| `int("")`           | `ValueError` |
| `str(3.5)`          | `"3.5"`      |

`int` and `float` ignore spaces and newlines around the number, so a line read from a file converts with or without `strip`. `int` rejects a decimal point, so `int(float(text))` is how to get `3` from `"3.5"`. `str` turns a number into text and needs no `try`.

## Checking Input

### Convert or Give Back `None`

```python
def safe_int(text):
    try:
        return int(text)
    except ValueError:
        return None

print(safe_int("-3"))    # -3
print(safe_int("4.5"))   # None
```

### Ask Until It Works

```python
valid = False
while not valid:
    user_input = input("Enter an integer: ")
    try:
        number = int(user_input)
        valid = True
    except ValueError:
        print("Not an integer.")

print(number)
```

When `int(user_input)` fails, `valid = True` never runs, so the loop asks again. The week 4 version checked with `isdigit`, which needed extra code to allow a `-` sign. Here `int` does the checking itself, and changing `int` to `float` makes the loop accept `3.5` too.

### As a Function

```python
def get_float(prompt):
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Enter a number.")

price = get_float("Price: ")
print(price)
```

`return` ends the function, and the loop with it, the first time `float` succeeds. `get_float` never returns `None`, so the caller needs no check.

### Inside an Input Loop

```python
total = 0
entry = input("Price: ")
while entry != "":
    try:
        total += float(entry)
    except ValueError:
        print(f"Skipping {entry}")
    entry = input("Price: ")

print(f"Total: ${total:.2f}")
```

The second `input` sits after the `try` and the `except`, so it runs either way. Inside the `try`, a bad entry would skip it, and the loop would never end.

## Files and Folders

### Paths: `os.path.join`

```python
import os

path = os.path.join("data", "scores.csv")
print(path)   # data/scores.csv on a Mac, data\scores.csv on Windows
```

`import os` loads the `os` module, a set of tools for files and folders that comes with Python. `os.path.join` glues folder and file names together with the separator your computer uses. VS Code runs your program from the folder it has open, so open the folder that holds your program, or `open` will look for `data` in the wrong place.

### Every File in a Folder: `os.listdir`

```python
import os

for name in sorted(os.listdir("data")):
    if not name.startswith("."):
        count = 0
        with open(os.path.join("data", name), "r") as f:
            for line in f:
                count += 1
        print(f"{name}: {count} lines")
```

```
measures.txt: 4 lines
names.txt: 3 lines
prices.csv: 6 lines
sales.csv: 6 lines
scores.csv: 6 lines
```

`os.listdir` gives back a list of the names in a folder, in no fixed order, so `sorted` puts them in alphabetical order. The names come without the folder: `open(name, "r")` would look next to the program and raise a `FileNotFoundError`, so `os.path.join` puts `data` back in front. The `startswith` check skips hidden files such as `.DS_Store`, which Finder makes on a Mac. The blank line at the end of `measures.txt` counts as a line.

## Reading a File

```python
import os

path = os.path.join("data", "names.txt")
with open(path, "r") as f:
    for line in f:
        print(line.strip())
```

```
Ada
Grace
Alan
```

`"r"` opens the file for reading. `with` keeps the file open for the indented block and closes it when the block ends, so everything that uses `f` goes inside the block. `for line in f:` hands over one line at a time, as a string that still ends in `\n`. Without `strip`, `print` adds a second newline, and a blank line follows each name.

| Write               | Gives back                                                   |
| ------------------- | ------------------------------------------------------------ |
| `for line in f:`    | every line not read yet, one at a time                       |
| `f.readline()`      | the next line, `\n` included, or `""` at the end of the file |
| `line.strip()`      | the line without spaces and newlines at either end           |
| `line.rstrip("\n")` | the line without the newline at its end                      |

### Without `with`: `open` and `close`

```python
import os

path = os.path.join("data", "names.txt")
f = open(path, "r")
for line in f:
    print(line.rstrip("\n"))
f.close()
```

This is the textbook's form (program 7-3). `open` hands back the file, and `close` ends the connection. A program that writes a file and forgets `close` can find the file empty when it reads it back, because the text has not been saved yet. `with` closes the file when the block ends, so there is nothing to forget.

### Reading with `readline` and `while`

```python
import os

f = open(os.path.join("data", "names.txt"), "r")
line = f.readline()
while line != "":
    print(line.rstrip("\n"))
    line = f.readline()
f.close()
```

This is the textbook's program 7-2. `readline` gives back `""` only at the end of the file. A blank line in the middle of a file is `"\n"`, so the loop keeps going past it.

### Skipping Blank Lines

```python
import os

total = 0
count = 0
with open(os.path.join("data", "measures.txt"), "r") as f:
    for line in f:
        line = line.strip()
        if line != "":
            count += 1
            total += float(line)

print(f"Average: {total / count:.2f}")   # Average: 9.93
```

`measures.txt` ends with a blank line. `strip` turns that line into `""`, and the `if` skips it. Without the `if`, `float("")` would raise a `ValueError`.

## Lines with Fields

```python
import os

with open(os.path.join("data", "scores.csv"), "r") as f:
    f.readline()
    for line in f:
        fields = line.strip().split(",")
        name = fields[0]
        score = int(fields[1])
        print(name, score)
```

Each line of `scores.csv` holds two **fields**, separated by a comma: `"Ada,90\n"` becomes `['Ada', '90']`. Strip, split, then convert the number fields, since every field is a string. The first line, `name,score`, is a **header** that names the columns. `int("score")` would raise a `ValueError`, so `f.readline()` reads the header before the loop starts, and nothing stores it.

## Writing a File

```python
import os

name = "Ada"
score = 90
with open(os.path.join("data", "report.txt"), "w") as out:
    print(f"Report for {name}", file=out)
    print("name,score", file=out)
    print(name, score, sep=",", file=out)
```

```
Report for Ada
name,score
Ada,90
```

`file=out` sends `print`'s line to the file instead of the screen, `\n` included. `sep=","` puts a comma between the values, which builds a CSV line. The block above is what `data/report.txt` holds after the program runs.

| Mode  | Opens the file to... | If the file exists          | If it is missing    |
| ----- | -------------------- | --------------------------- | ------------------- |
| `"r"` | read it              | reads from the start        | `FileNotFoundError` |
| `"w"` | write it             | **erases it** first         | creates it          |
| `"a"` | add to its end       | keeps what is already there | creates it          |

Never open your input file with `"w"`: it is erased before your program can read it.

### Read Everything, Then Write

```python
import os

values = []
with open(os.path.join("data", "measures.txt"), "r") as f:
    for line in f:
        if line.strip() != "":
            values.append(float(line))
average = sum(values) / len(values)

count = 0
with open(os.path.join("data", "high.txt"), "w") as out:
    for value in values:
        if value > average:
            print(value, file=out)
            count += 1

print(f"Average: {average:.2f}")          # Average: 9.93
print(f"Wrote {count} of {len(values)} values")   # Wrote 1 of 3 values
```

The average needs every value, so the first block reads the whole file into a list before anything is written. The second block writes only `10.1`, the one value above the average, to `high.txt`.

### Two Files at Once

```python
import os

with open(os.path.join("data", "prices.csv"), "r") as fin:
    with open(os.path.join("data", "new_prices.csv"), "w") as fout:
        print(fin.readline().strip(), file=fout)
        for line in fin:
            fields = line.strip().split(",")
            try:
                price = float(fields[1]) * 1.10
                print(fields[0], f"{price:.2f}", sep=",", file=fout)
            except ValueError:
                print(f"Skipping {fields[0]}")
```

Both files stay open at once, so the `with` blocks nest. The first `print` copies the header to the new file. `float("n/a")` raises a `ValueError` for the `tea` row, so that row is left out.

### Adding to a File

```python
import os

path = os.path.join("data", "guests.txt")
with open(path, "a") as out:
    name = input("Name: ")
    while name != "":
        print(name, file=out)
        name = input("Name: ")
```

Run this twice, and `guests.txt` holds the names from both runs. With `"w"`, each run would start the file over.

## Common Mistakes

| Code                                           | Problem                                               | Fix                                              |
| ---------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| `except:`                                      | catches every exception, typos included               | name it: `except ValueError:`                    |
| `input` inside the `try` of an input loop      | a bad entry skips it, and the loop never ends         | read the next entry after the `try` and `except` |
| `int("3.5")`                                   | `ValueError`: `int` rejects a decimal point           | `float("3.5")`, or `int(float("3.5"))` for `3`   |
| `for line in f:` after the `with` block ends   | `ValueError: I/O operation on closed file.`           | indent everything that uses `f` under `with`     |
| `open(name, "r")` with a name from `listdir`   | `FileNotFoundError`: the name has no folder in front  | `open(os.path.join("data", name), "r")`          |
| `print(line)`                                  | double spaced: the line's `\n` plus `print`'s own     | `print(line.strip())`                            |
| `float(line)` on a blank line                  | `ValueError: could not convert string to float: '\n'` | skip lines where `line.strip() == ""`            |
| `fields[1]` on a blank line                    | `IndexError`: `"".split(",")` is `['']`               | skip lines where `line.strip() == ""`            |
| no `f.readline()` before the loop              | `ValueError` from `int("score")` on the header        | call `f.readline()` once before the loop         |
| `fields[1] > best_score`                       | `TypeError`: every field is a string                  | `int(fields[1]) > best_score`                    |
| `"Ada, Boston".split(",")`                     | the second field is `" Boston"`, with a space         | `strip()` each field                             |
| `open(path, "w")` on your input file           | erases the file before it is read                     | write to a different file                        |
| `print(..., file=out)` after `open(path, "r")` | `io.UnsupportedOperation: not writable`               | open with `"w"` or `"a"`                         |
| `f = open(...)` with no `f.close()`            | a written file can end up empty                       | use `with`, or call `f.close()`                  |

## Glossary

- **catch**: To handle an exception with `except`, so the program keeps going.
- **CSV**: Comma-separated values. A text file where commas separate the fields on each line, such as `scores.csv`.
- **exception**: An error Python raises while a program runs. It stops the program unless an `except` catches it.
- **field**: One value on a line of a file, such as `Ada` or `90` in `Ada,90`.
- **folder**: A place on disk that holds files. `os.listdir` lists what is in one.
- **header**: A first line that names the columns, such as `name,score`.
- **mode**: The second argument to `open`: `"r"` to read, `"w"` to write, or `"a"` to append.
- **module**: A set of tools loaded with `import`, such as `os`.
- **newline**: The character `\n` at the end of every line in a file.
- **path**: Where a file is, such as `data/scores.csv`. `os.path.join` builds one.
- **raise**: What Python does when a line fails: it creates an exception, which stops the program unless something catches it.
- **text file**: A file of lines of text, which VS Code can open and show.
