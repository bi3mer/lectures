---
marp: true
theme: lecture
paginate: true
---

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

[Files for Today](10-exceptions-and-files.html#16) wrote this path one way on a Mac and another on Windows. Today, Python picks the separator.

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
week8/          ← open in VS Code
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

To reach `names.txt` inside `data`, Python needs a path, and the `os` module builds paths. A **module** is a file of extra functions that ships with Python. [Float Type](02-variables-and-statements.html#21) imported `sys` the same way.

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

## Where Python Looks

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
/Users/ada/cs230/week8
```

```
C:\Users\ada\cs230\week8
```

</div>
</div>

Right: the output on a Mac, then on Windows. `getcwd` is short for "get current working directory": the folder where a path like `data/names.txt` starts.

---

## Problem: Find the Bug

<div class="cols">
<div>

```
cs230/          ← open in VS Code
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

Fix: File > Open Folder, then pick `week8`. The error is the same [`FileNotFoundError`](10-exceptions-and-files.html#22) as last week.

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

## Problem: Find the Bug

```python
import os

for name in sorted(os.listdir("data")):
    count = 0
    with open(name, "r") as f:
        for line in f:
            count += 1
    print(name, count)
```

---

## Solution: Find the Bug

```
FileNotFoundError: [Errno 2] No such file or directory: 'measures.txt'
```

```python
for name in sorted(os.listdir("data")):
    path = os.path.join("data", name)
    count = 0
    with open(path, "r") as f:
```

`listdir` gives names without their folder, so `join` builds the path `open` needs. This pairing is the main use of `join`.

---

## Problem: What Is the Output?

```python
import os

for name in sorted(os.listdir("data")):
    path = os.path.join("data", name)
    count = 0
    with open(path, "r") as f:
        for line in f:
            count += 1
    print(name, count)
```

---

## Solution: What Is the Output?

```
measures.txt 4
IsADirectoryError: [Errno 21] Is a directory: 'data/months'
```

`listdir` lists folders too, and `open` cannot read a folder. Windows raises a `PermissionError` instead. The count is 4 because the last line of `measures.txt` is blank.

---

## `os.path.isfile` and `os.path.exists`

```python
import os

names = os.path.join("data", "names.txt")
months = os.path.join("data", "months")
typo = os.path.join("data", "nmaes.txt")

print(os.path.isfile(names))    # True
print(os.path.isfile(months))   # False
print(os.path.exists(months))   # True
print(os.path.exists(typo))     # False
```

`isfile` is `True` only for a file that exists. `exists` is `True` for a file or a folder.

---

## Only the Files: Program K-1

<style scoped>
pre { font-size: 0.75em; }
</style>

```python
# list all file names in the data subdirectory
import os

dirname = "data"
for filename in sorted(os.listdir(dirname)):
    pathname = os.path.join(dirname, filename)
    if os.path.isfile(pathname):
        print(filename)
```

```
measures.txt
names.txt
prices.csv
products.csv
sales.csv
scores.csv
```

This is textbook program K-1, with `sorted` added. `isfile` is `False` for `months`, so the loop skips it.

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

[Total Sales](10-exceptions-and-files.html#29) did one file.

- Which part of Total Sales stays the same?
- What changes from file to file?

---

## Solution: Total of Every Month (us)

<style scoped>
pre { font-size: 0.7em; }
</style>

<div class="cols">
<div>

```python
import os

def file_total(path):
    total = 0
    with open(path, "r") as f:
        f.readline()
        for line in f:
            fields = line.strip().split(",")
            price = float(fields[2])
            quantity = int(fields[3])
            total += price * quantity
    return total
```

</div>
<div>

```python
folder = os.path.join("data", "months")
grand_total = 0
for name in sorted(os.listdir(folder)):
    path = os.path.join(folder, name)
    month_total = file_total(path)
    print(f"{name}: ${month_total:.2f}")
    grand_total += month_total

print(f"All months: ${grand_total:.2f}")
```

</div>
</div>

`file_total` is the Total Sales loop, with the path as a parameter. The main loop builds each path, calls `file_total`, and adds up the totals.

---

## Problem: Find the Bug

On a Mac, the same program can crash. Printing the folder's names shows why:

```python
print(sorted(os.listdir(folder)))
```

```
['.DS_Store', '2023-01.csv', '2023-02.csv', '2023-03.csv']
```

What does the loop do with `.DS_Store`?

---

## Solution: Find the Bug

```python
for name in sorted(os.listdir(folder)):
    if name.endswith(".csv"):
        path = os.path.join(folder, name)
        month_total = file_total(path)
        print(f"{name}: ${month_total:.2f}")
        grand_total += month_total
```

Finder adds a hidden `.DS_Store` file to folders it opens. It is not a CSV, so reading it fails. `endswith` skips it, the partner of `startswith` from [More Methods](06-strings-and-format-strings.html#90).

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

The extra line was `with open(name, "r") as f_in:`, which drops the folder, as in [this bug](11-os-module.html#18). Each `readline` skips one file's header, so `all_months.csv` has one header, at the top. Textbook program K-2 copies every header.

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
- `os.path.isfile` is `True` for a file; `os.path.exists` is `True` for a file or a folder
- `name.endswith(".csv")` skips other files, such as `.DS_Store`

---

## Next Up: Dictionaries

[Dictionaries](12-dictionaries.html)

The [`os` Module Cheat Sheet](os-module-cheatsheet.html) has today's tools in one place, with textbook programs K-1 and K-2 as printed.

<!--
If the class runs long, skip slides 13 and 14 (the missing os. bug).
-->
