---
marp: true
theme: lecture
paginate: true
---

<style>
/* Center every table on its slide. */
section table { margin-left: auto; margin-right: auto; }
</style>

# The `os` Module

Colan Biemer

---

## Files in Folders

---

## Opening a File

<style scoped>
pre { font-size: 0.7em; }
</style>

<div class="cols">
<div>

```
week7/
├── data/
│   └── names.txt
└── program.py
```

</div>
<div>

```python
# program.py
with open("data/names.txt", "r") as f:
    for line in f:
        print(line.strip())
```

```
Ada
Grace
Alan
```

</div>
</div>

[Last time](10-exceptions-and-files.html#16), we wrote a file path one way on a Mac and another on Windows. This is a really bad approach because it means our programs will only work one one operating system (OS), and not another.

---

## Files for Today

<style scoped>
pre { font-size: 0.75em; }
</style>

<div class="cols">
<div>

Download [data.zip](data.zip) and unzip it next to your program. It makes the `data` folder on the right.

Each file is also on the [Data Files](data/index.html) page.

</div>
<div>

```
week8/
├── program.py
└── data/
    ├── measures.txt
    ├── months/
    │   ├── 2023-01.csv
    │   ├── 2023-02.csv
    │   └── 2023-03.csv
    ├── names.txt
    ├── prices.csv
    ├── products.csv
    ├── sales.csv
    └── scores.csv
```

</div>
</div>

---

## Modules and `import`

```python
import [MODULE]

[MODULE].[FUNCTION]()
```

To reach `names.txt` inside `data`, Python needs a path, and the `os` module builds paths. A **module** is a file of extra functions that ships with Python.

---

## Paths with `os.path.join`

<div class="cols">
<div>

```python
import os

path = os.path.join("data", "names.txt")
print(path)

with open(path, "r") as f:
    for line in f:
        print(line.strip())
```

</div>
<div>

```
data/names.txt
Ada
Grace
Alan
```

</div>
</div>

A **path** names a file by the folders that lead to it. `join` puts the computer's separator between the pieces: `/` on a Mac, `\` on Windows (`data\names.txt`).

---

## Problem: Find the Bug

```python
import os

path = "data" + "names.txt"
with open(path, "r") as f:
    for line in f:
        print(line.strip())
```

---

## Solution: Find the Bug

```
FileNotFoundError: [Errno 2] No such file or directory: 'datanames.txt'
```

`+` glues the strings together with no separator. `os.path.join("data", "names.txt")` adds one.

---

## Current Working Directory (CWD)

---

## `os.getcwd()`

<div class="cols">
<div>

```python
import os

print(os.getcwd())
```

</div>
<div>

```
/Users/example-student/cs230/week8
```

```
C:\Users\example-student\cs230\week8
```

</div>
</div>

Right: the output on a Mac, then on Windows. `getcwd` is short for "get current working directory": the folder where a path like `data/names.txt` starts.

---

## Problem: Find the Bug

<div class="cols">
<div>

```
cs230/
├── week7/
└── week8/
    ├── data/
    │   └── names.txt
    └── program.py
```

</div>
<div>

```python
# program.py
import os

path = os.path.join("data", "names.txt")
with open(path, "r") as f:
    for line in f:
        print(line.strip())
```

</div>
</div>

```
FileNotFoundError: [Errno 2] No such file or directory: 'data/names.txt'
```

`data` sits next to `program.py`. Why can Python not find it?

---

## Solution: Find the Bug

```
cs230/          ← Python looks here
└── week8/
    ├── data/
    │   └── names.txt
    └── program.py
```

Python starts the path from the **current working directory**. VS Code's Run button sets it to the open folder, `cs230`, not the program's folder.

There are two fixes:

1. File > Open Folder, then pick `week8`.
2. Update the code: `path = os.path.join("week8", "data", "names.txt")`

Which do you prefer?

---

## Problem: Find the Bug

```python
import os

print(getcwd())
```

---

## Solution: Find the Bug

```
NameError: name 'getcwd' is not defined
```

A module's functions need the module's name in front: `os.getcwd()`. Leaving out `import os` gives a different error:

```
NameError: name 'os' is not defined. Did you forget to import 'os'?
```

---

## Listing a Folder

---

## Every Name in a Folder: `os.listdir`

<style scoped>
pre:last-of-type { font-size: 0.6em; }
</style>

```python
import os

print(os.listdir("data"))
print(sorted(os.listdir("data")))
```

```
['products.csv', 'months', 'prices.csv', 'sales.csv', 'scores.csv', 'measures.txt', 'names.txt']
['measures.txt', 'months', 'names.txt', 'prices.csv', 'products.csv', 'sales.csv', 'scores.csv']
```

`listdir` gives back the names of the files and folders inside, in no fixed order. [`sorted`](09-changing-lists.html#25) puts them in order.

---

## Problem: Find the Bug & Fix It

```python
import os

for name in sorted(os.listdir("data")):
    count = 0
    with open(name, "r") as f:
        for line in f:
            count += 1
    print(name, count)
```

```
FileNotFoundError: [Errno 2] No such file or directory: 'measures.txt'
```

---

## Problem 2: Find the Bug

```python
for name in sorted(os.listdir("data")):
    path = os.path.join("data", name)
    count = 0

    with open(path, "r") as f:
        for line in f:
            count += 1

    print(name, count)
```

```
IsADirectoryError: [Errno 21] Is a directory: 'data/months'
```

Adding `join` fixed the first bug. On Windows, this one raises `PermissionError`.

---

## Folder or File: `isdir`, `isfile`, `exists`

| Function               | `True` when `path` is |
| ---------------------- | --------------------- |
| `os.path.isdir(path)`  | a folder              |
| `os.path.isfile(path)` | a file                |
| `os.path.exists(path)` | a folder or a file    |

All three are `False` for a path that does not exist.

---

## Checking Three Paths

```python
import os

names = os.path.join("data", "names.txt")
months = os.path.join("data", "months")
typo = os.path.join("data", "nmaes.txt")

print(os.path.isdir(months))    # True
print(os.path.isdir(names))     # False
print(os.path.isfile(names))    # True
print(os.path.isfile(months))   # False
print(os.path.exists(months))   # True
print(os.path.exists(typo))     # False
```

---

## Problem 2: Find the Bug & Fix It

```python
for name in sorted(os.listdir("data")):
    path = os.path.join("data", name)
    count = 0

    with open(path, "r") as f:
        for line in f:
            count += 1

    print(name, count)
```

```
measures.txt 4
IsADirectoryError: [Errno 21] Is a directory: 'data/months'
```

---

## Solution 2: Find the Bug & Fix It

<div class="cols">
<div>

```python
for name in sorted(os.listdir("data")):
    path = os.path.join("data", name)
    count = 0

    if os.path.isdir(path):
        continue

    with open(path, "r") as f:
        for line in f:
            count += 1

    print(name, count)
```

</div>
<div>

```python
for name in sorted(os.listdir("data")):
    path = os.path.join("data", name)
    count = 0

    if not os.path.isfile(path):
        continue

    with open(path, "r") as f:
        for line in f:
            count += 1

    print(name, count)
```

</div>
</div>

Both solutions skip folders. The left explicitly skips folders. The right skips everything that is not a file. Either is fine for our use case, but things get more complicated when you consider [symlinks](https://en.wikipedia.org/wiki/Symbolic_link) and other special file types. Generally, prefer `isfile` for this kind of task.

---

## Problem: What Is the Output?

```python
import os

files = 0
folders = 0
for name in os.listdir("data"):
    path = os.path.join("data", name)
    if os.path.isfile(path):
        files += 1
    elif os.path.isdir(path):
        folders += 1

print(files, folders)
```

---

## Solution: What Is the Output?

```
6 1
```

Six files and one folder, `months`. A special file type would land in neither count.

---

## Two Ways to Handle a Missing File

<div class="cols">
<div>

```python
import os

path = os.path.join("data", "nmaes.txt")
if os.path.isfile(path):
    with open(path, "r") as f:
        print(f.readline().strip())
else:
    print(f"Could not find {path}")
```

</div>
<div>

```python
import os

path = os.path.join("data", "nmaes.txt")
try:
    with open(path, "r") as f:
        print(f.readline().strip())
except FileNotFoundError:
    print(f"Could not find {path}")
```

</div>
</div>

Both print `Could not find data/nmaes.txt`. Left: [Look Before You Leap](patterns.html#filenotfounderror). Right: [Easier to Ask for Forgiveness](patterns.html#filenotfounderror-1), the safer choice for files.

---

## Problem: Pick a File (us)

```python
# Ask for a file name until it names a file in the data folder.
# Then print how many lines the file has.
```

```
File name: nmaes.txt
No file named nmaes.txt in data.
File name: months
No file named months in data.
File name: names.txt
names.txt has 3 lines.
```

- Which path does the check need?
- Why does `months` fail the check?

---

## Solution: Pick a File (us)

<style scoped>
pre { font-size: 0.75em; }
</style>

```python
import os

name = input("File name: ")
path = os.path.join("data", name)
while not os.path.isfile(path):
    print(f"No file named {name} in data.")
    name = input("File name: ")
    path = os.path.join("data", name)

count = 0
with open(path, "r") as f:
    for line in f:
        count += 1
print(f"{name} has {count} lines.")
```

`isfile` also turns away the folder `months`. With `except FileNotFoundError`, `months` would get through to an `IsADirectoryError`.

---

## Parsons Problem #1 (you)

**One line does not belong.**

```python
found.append(name)
path = folder + name
return found
import os
for name in sorted(os.listdir(folder)):
print(mystery("data"))
if not os.path.isfile(path):
found = []
def mystery(folder):
path = os.path.join(folder, name)
```

---

## Solution: Parsons Problem #1 (you)

```python
import os

def mystery(folder):
    found = []
    for name in sorted(os.listdir(folder)):
        path = os.path.join(folder, name)
        if not os.path.isfile(path):
            found.append(name)
    return found

print(mystery("data"))
```

The extra line was `path = folder + name`. Paths like `datamonths` name nothing, so `mystery` would return every name. With `join`, it returns the names that are not files: `['months']`.

---

## Many Files at Once

---

## Problem: Total of Every Month (us)

```python
# Each file in data/months is laid out like sales.csv. Print each
# file's total, then the total of all of them.
```

```
2023-01.csv: $90.65
2023-02.csv: $72.20
2023-03.csv: $112.70
All months: $275.55
```

[Total Sales](10-exceptions-and-files.html#31) did one file.

- Which part of Total Sales stays the same?
- What changes from file to file?

---

## Solution: Total of Every Month (us)

<style scoped>
pre { font-size: 0.65em; }
</style>

```python
import os

folder = os.path.join("data", "months")
grand_total = 0
for name in sorted(os.listdir(folder)):
    path = os.path.join(folder, name)
    if not os.path.isfile(path):
        continue

    month_total = 0
    with open(path, "r") as f:
        f.readline()
        for line in f:
            fields = line.strip().split(",")
            price = float(fields[2])
            quantity = int(fields[3])
            month_total += price * quantity
    print(f"{name}: ${month_total:.2f}")
    grand_total += month_total

print(f"All months: ${grand_total:.2f}")
```

---

## Parsons Problem #2 (you)

**One line does not belong.**

```python
f_out.write(line)
with open(name, "r") as f_in:
if name.endswith(".csv"):
folder = os.path.join("data", "months")
f_in.readline()
import os
with open("all_months.csv", "w") as f_out:
for line in f_in:
f_out.write("product,date,price,quantity\n")
with open(os.path.join(folder, name), "r") as f_in:
for name in sorted(os.listdir(folder)):
```

---

## Solution: Parsons Problem #2 (you)

<style scoped>
pre { font-size: 0.75em; }
</style>

```python
import os

folder = os.path.join("data", "months")
with open("all_months.csv", "w") as f_out:
    f_out.write("product,date,price,quantity\n")
    for name in sorted(os.listdir(folder)):
        if name.endswith(".csv"):
            with open(os.path.join(folder, name), "r") as f_in:
                f_in.readline()
                for line in f_in:
                    f_out.write(line)
```

The extra line was `with open(name, "r") as f_in:`, which drops the folder, as in [this bug](11-os-module.html#17). Each `readline` skips one file's header, so `all_months.csv` has one header, at the top.

---

## Summary

<style scoped>
ul { font-size: 0.85em; }
</style>

- Keep data files in their own folder, such as `data`, next to the program
- `import os` loads the `os` module; its functions take `os.` in front, like `os.getcwd()`
- `os.path.join("data", name)` builds a path with the computer's separator; `+` adds none
- A path starts from the **current working directory**, which in VS Code is the open folder
- `os.listdir(folder)` gives the names inside `folder`, files and folders alike, in any order
- `listdir` gives names only, so `join` each one to its folder before `open`
- `os.path.isdir` is `True` for a folder, `os.path.isfile` for a file, and `os.path.exists` for either
- `name.endswith(".csv")` skips other files, such as `.DS_Store`

---

## Next Up: Dictionaries

- [Dictionaries](12-dictionaries.html)
- [`os` Module Cheat Sheet](os-module-cheatsheet.html)
