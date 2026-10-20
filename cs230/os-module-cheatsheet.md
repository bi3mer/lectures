# The `os` Module Cheatsheet

The **`os` module** lets a program find out which folder it runs in, build paths, and list and check the files in a folder. This sheet collects Appendix K of the textbook and class in one place. Every example can be pasted into a file and run. The examples expect the `data` folder from [data.zip](data.zip) next to your program. The [Data Files](data/index.html) page shows what is in each file.

## `import` and Modules

A **module** is a file of extra functions that ships with Python. `import os` loads the `os` module, and each of its functions is called with `os.` in front. Put every `import` at the top of the program.

| Mistake                        | What happens                                                          |
| ------------------------------ | --------------------------------------------------------------------- |
| `getcwd()` after `import os`   | `NameError: name 'getcwd' is not defined`                             |
| `os.getcwd()` with no `import` | `NameError: name 'os' is not defined. Did you forget to import 'os'?` |

## The Current Working Directory

```python
import os

print(os.getcwd())
```

```
/Users/ada/cs230
```

On Windows, the same program prints something like `C:\Users\ada\cs230`. `getcwd` is short for "get current working directory." The **current working directory** is the folder Python opens a bare file name from: `open("names.txt", "r")` looks for `names.txt` there, wherever the program itself is saved. When a file sits next to your program and Python still raises a `FileNotFoundError`, print `os.getcwd()` first.

| How you run the program                                       | Current working directory                                  |
| ------------------------------------------------------------- | ---------------------------------------------------------- |
| VS Code's Run button                                          | the folder open in VS Code (File > Open Folder)            |
| VS Code's Run button, with `python.terminal.executeInFileDir` | the folder the program is saved in                         |
| `python3 program.py` (Mac) or `python program.py` (Windows)   | the folder the terminal is in, which `cd [FOLDER]` changes |

The setting in the second row is off by default. To turn it on, open Settings (`Cmd+,` on a Mac, `Ctrl+,` on Windows), search for "execute in file dir", and check **Python › Terminal: Execute In File Dir**. Class examples assume it is off and that VS Code has the program's folder open.

## Paths

```python
import os

path = os.path.join("data", "names.txt")
print(path)

with open(path, "r") as f:
    for line in f:
        print(line.strip())
```

```
data/names.txt
Ada
Grace
Alan
```

A **path** names a file by the folders that lead to it. `os.path.join` puts the computer's **separator** between the pieces: `/` on a Mac, `\` on Windows.

| Write                                           | Mac                       | Windows                   |
| ----------------------------------------------- | ------------------------- | ------------------------- |
| `os.path.join("data", "names.txt")`             | `data/names.txt`          | `data\names.txt`          |
| `os.path.join("data", "months", "2023-01.csv")` | `data/months/2023-01.csv` | `data\months\2023-01.csv` |
| `"data" + "names.txt"`                          | `datanames.txt`           | `datanames.txt`           |

`+` adds no separator, so `open("data" + "names.txt", "r")` raises `FileNotFoundError: [Errno 2] No such file or directory: 'datanames.txt'`. Typing `"data/names.txt"` works on both, since Windows turns each `/` into `\` ([Paths on a Mac and on Windows](exceptions-and-files-cheatsheet.html#paths-on-a-mac-and-on-windows) has the history). `join` matters most when a piece is in a variable, such as a name from `os.listdir`.

## Listing a Folder

```python
import os

print(os.listdir("data"))
print(sorted(os.listdir("data")))
```

```
['products.csv', 'months', 'prices.csv', 'sales.csv', 'scores.csv', 'measures.txt', 'names.txt']
['measures.txt', 'months', 'names.txt', 'prices.csv', 'products.csv', 'sales.csv', 'scores.csv']
```

`os.listdir(folder)` gives back a list of the names inside `folder`, files and folders alike. The order depends on the computer, so the first line can come out differently on yours. `sorted` puts the names in order. `os.listdir()` with no folder lists the current working directory.

`listdir` gives names, not paths. Join each name to its folder before opening it:

```python
import os

for name in sorted(os.listdir("data")):
    path = os.path.join("data", name)
    if os.path.isfile(path):
        count = 0
        with open(path, "r") as f:
            for line in f:
                count += 1
        print(name, count)
```

```
measures.txt 4
names.txt 3
prices.csv 6
products.csv 9
sales.csv 6
scores.csv 6
```

Without the `isfile` check, `open` reaches the folder `months` and fails: `IsADirectoryError` on a Mac, `PermissionError` on Windows. `measures.txt` counts 4 lines because its last line is blank.

### Hidden Files

A name that starts with `.` is a **hidden file**. Finder and File Explorer do not show it, but `listdir` does. A Mac's Finder adds a hidden `.DS_Store` file to folders it opens, so a program that reads every file in `data/months` can find one there:

```
['.DS_Store', '2023-01.csv', '2023-02.csv', '2023-03.csv']
```

`.DS_Store` is not text, so reading it fails. Keep only the names you want:

| Check                      | Keeps                                  |
| -------------------------- | -------------------------------------- |
| `name.endswith(".csv")`    | names that end in `.csv`               |
| `not name.startswith(".")` | every name that is not hidden          |
| `os.path.isfile(path)`     | files, not folders (hidden files pass) |

### Reading Every File in a Folder

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

folder = os.path.join("data", "months")
grand_total = 0
for name in sorted(os.listdir(folder)):
    if name.endswith(".csv"):
        path = os.path.join(folder, name)
        month_total = file_total(path)
        print(f"{name}: ${month_total:.2f}")
        grand_total += month_total

print(f"All months: ${grand_total:.2f}")
```

```
2023-01.csv: $90.65
2023-02.csv: $72.20
2023-03.csv: $112.70
All months: $275.55
```

`file_total` handles one file, and the loop calls it once per name. Each month file has a header, so `file_total` skips its first line.

## Checking a Path

```python
import os

names = os.path.join("data", "names.txt")
months = os.path.join("data", "months")
typo = os.path.join("data", "nmaes.txt")

print(os.path.isfile(names), os.path.exists(names))     # True True
print(os.path.isfile(months), os.path.exists(months))   # False True
print(os.path.isfile(typo), os.path.exists(typo))       # False False
```

| Path             | Is a   | `os.path.isfile` | `os.path.exists` |
| ---------------- | ------ | ---------------- | ---------------- |
| `data/names.txt` | file   | `True`           | `True`           |
| `data/months`    | folder | `False`          | `True`           |
| `data/nmaes.txt` | (none) | `False`          | `False`          |

To check before `open`, use `isfile`, not `exists`: `exists` is also `True` for a folder, which `open` cannot read. A `try` with `except FileNotFoundError:` is the other way to handle a missing file. [Patterns](patterns.html#filenotfounderror) compares the two. When the name comes from the user, `isfile` also turns away folder names, which `except FileNotFoundError:` does not catch:

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

```
File name: months
No file named months in data.
File name: names.txt
names.txt has 3 lines.
```

## Textbook Programs K-1 and K-2

The textbook indents with three spaces and uses single quotes. Python accepts both, but class code uses four spaces and double quotes.

### K-1: List the Files in a Folder

As printed:

```python
# list all file names in the data subdirectory
import os

dirname = 'data'
for filename in os.listdir(dirname):
   pathname = os.path.join(dirname, filename)
   if os.path.isfile(pathname):
      print(filename)
```

The class version adds `sorted`, so the names print in the same order on every computer:

```python
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

### K-2: Combine the Files in a Folder

As printed:

```python
# combine files in a common subdirectory
import os
import sys

# check that two command line arguments were provided
if len(sys.argv) != 3:
    print("Usage: python p4da-program-K-2.py <input_directory> <output_file>")
    sys.exit(1)

# set variables from the command line arguments
input_dir = sys.argv[1]
output_file = sys.argv[2]

outfile = open(output_file, 'w') # open the output file

# for each file (and directory)
for filename in os.listdir(input_dir):
   # set the filepath using the join function
   filepath = os.path.join(input_dir, filename)
   if os.path.isfile(filepath): # include files (exclude directories)
      infile = open(filepath, 'r')
      outfile.write(f'#file={filename}\n')
      outfile.write(infile.read())
      outfile.write('\n')
      infile.close()

outfile.close()
```

`sys.argv` is the list of words typed after `python` in a terminal, so `python p4da-program-K-2.py data/months all_months.csv` makes `sys.argv[1]` `"data/months"` and `sys.argv[2]` `"all_months.csv"`. VS Code's Run button types no extra words, so K-2 as printed only prints its usage line and stops. `infile.read()` gives back the whole file as one string, newlines included. K-2 writes a `#file=` line before each file, then the file, header and all.

The class version sets the folder and output file in the program, and writes one header for the combined file:

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

`all_months.csv` after the program runs:

```
product,date,price,quantity
P-01,2023-01-04,9.95,3
P-02,2023-01-11,10.50,2
P-01,2023-01-19,9.95,4
P-02,2023-02-02,10.50,5
P-01,2023-02-15,9.85,2
P-01,2023-03-03,9.95,6
P-02,2023-03-09,10.60,1
P-02,2023-03-27,10.60,4
```

The class version writes `all_months.csv` next to the program, outside `data/months`. Inside `data/months`, `listdir` would list it as a `.csv`, and the program would read the file it is writing.

Appendix K's program K-3 walks a whole tree of folders with `os.walk` and needs `sys.argv`, so class skips it.

## Common Mistakes

| Code                                         | Problem                                                     | Fix                                                  |
| -------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| `getcwd()`                                   | `NameError`: the function needs its module's name           | `os.getcwd()`                                        |
| `os.getcwd()` with no `import os`            | `NameError: name 'os' is not defined`                       | put `import os` at the top                           |
| `open("names.txt", "r")` from another folder | `FileNotFoundError`, though the file is next to the program | run it from the program's folder                     |
| `"data" + "names.txt"`                       | the path is `datanames.txt`, with no separator              | `os.path.join("data", "names.txt")`                  |
| `open(name, "r")` on a name from `listdir`   | `FileNotFoundError`: the name has no folder                 | `open(os.path.join(folder, name), "r")`              |
| `open` on every name from `listdir`          | `IsADirectoryError` (Mac) or `PermissionError` on a folder  | check `os.path.isfile(path)` first                   |
| `os.path.exists(path)` before `open`         | `True` for a folder too, so `open` can still fail           | `os.path.isfile(path)`                               |
| reading every file in a folder on a Mac      | `.DS_Store` is not text                                     | skip it, as in [Hidden Files](#hidden-files)         |
| `os.listdir(folder)` without `sorted`        | the order can differ from computer to computer              | `sorted(os.listdir(folder))`, when the order matters |
| writing the output into the folder you list  | the program reads its own output as input                   | write it outside the folder you list                 |

## Glossary

- **current working directory**: The folder Python opens bare file names from. `os.getcwd()` gives it back.
- **folder**: A place on disk that holds files and other folders. The textbook and the `os` module call it a **directory**.
- **hidden file**: A file whose name starts with `.`, such as `.DS_Store`. Finder and File Explorer do not show it, but `os.listdir` does.
- **module**: A file of extra functions that ships with Python, such as `os`. `import` loads one.
- **path**: A string that names a file by the folders that lead to it, such as `data/names.txt`.
- **separator**: The character between the pieces of a path: `/` on a Mac, `\` on Windows.
