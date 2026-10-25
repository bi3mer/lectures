# How a Python Program Exits

TO be filled in. Right now, just look at [Python's documentation](https://docs.python.org/3/library/sys.html#sys.exit).

<!--A Python program usually ends when it runs out of lines. Sometimes it has to stop sooner, such as when a file it needs is missing. [`break`](04-while-loops.html#17) leaves a loop, and [`return`](07-functions.html#13) leaves a function. Leaving the whole program takes `sys.exit`. Python also has `exit()`, `quit()`, and `os._exit()`, and this page explains why a program should use `sys.exit` instead.

## Stopping Early with `sys.exit`

```python
import os
import sys

name = "orders.csv"
path = os.path.join("data", name)
if not os.path.isfile(path):
    print(f"No file named {name} in data.")
    sys.exit(1)

with open(path, "r") as f:
    for line in f:
        print(line.strip())
```

```
No file named orders.csv in data.
```

The program checks for the file with [`os.path.isfile`](11-os-module.html#19). When the file is missing, `sys.exit(1)` ends the program on that line, and the `with` block never runs. Without `sys.exit`, the rest of the program would have to sit inside an `else`. The `1` is the program's [exit status](#the-exit-status).

## `exit` Belongs to the Interactive Shell

`exit()` and `quit()` also stop a program, but they are not part of the language. Python runs a module named `site` as it starts, and `site` adds them for the interactive shell. The shell is where you type Python one line at a time at a `>>>` prompt. The [Python docs](https://docs.python.org/3/library/constants.html#constants-added-by-the-site-module) say they "are useful for the interactive interpreter shell and should not be used in programs." Run a program with `python3 -S program.py`, which skips `site`, and its `exit()` fails:

```
NameError: name 'exit' is not defined
```

Before Python 2.5 (2006), `exit` and `quit` were strings. Typing `quit` at the prompt printed a hint, and typing `quit()` raised a `TypeError`, since a string cannot be called:

```
>>> quit
'Use Ctrl-D (i.e. EOF) to exit.'
```

[Python 2.5](https://docs.python.org/3/whatsnew/2.5.html#interactive-interpreter-changes) made them objects that still print a hint but also exit when called. Its release notes say Georg Brandl made the change so that "newbies who try `quit()` or `exit()` will now exit the interpreter as they expect." Since [Python 3.13](https://docs.python.org/3/whatsnew/3.13.html#a-better-interactive-interpreter), typing `exit` alone quits the shell too.

## `sys.exit` Raises an Exception

`sys.exit` does not stop Python on the spot. It raises an exception named `SystemExit`, and the program ends when nothing catches it. Cleanup still happens on the way out: [`finally`](10-exceptions-and-files.html#19) blocks run, and `with` closes its files.

```python
import sys

try:
    print("Writing the report.")
    sys.exit(1)
finally:
    print("finally still runs.")
print("This line never runs.")
```

```
Writing the report.
finally still runs.
```

Since `SystemExit` is an exception, an `except` can catch it. A bare `except:`, with no exception named, catches every exception, `SystemExit` included:

```python
import sys

try:
    sys.exit(1)
except:
    print("Caught it.")
print("Still running.")
```

```
Caught it.
Still running.
```

With `except Exception:` in place of `except:`, the program prints nothing and ends. Python 2.5 set that up on purpose. It added a class named `BaseException` above `Exception` and moved two exceptions directly under it. One is `SystemExit`. The other is `KeyboardInterrupt`, which Python raises when you press `Ctrl+C` to stop [a loop that never ends](04-while-loops.html#14). The [release notes](https://docs.python.org/3/whatsnew/2.5.html#pep-352-exceptions-as-new-style-classes) give the reason: "KeyboardInterrupt and SystemExit aren't errors, though, and usually represent an explicit action such as the user hitting Control-C or code calling sys.exit()."

## The Exit Status

Every program hands a number back to whatever started it, such as a terminal. That number is the program's **exit status**: 0 means the program succeeded, and any other number means it failed.

| How the program ends                               | Exit status                  |
| -------------------------------------------------- | ---------------------------- |
| It runs out of lines                               | 0                            |
| `sys.exit()`                                       | 0                            |
| `sys.exit(1)`, or any other whole number           | that number                  |
| `sys.exit("No file named orders.csv in data.")`    | 1, after printing the string |
| An exception nothing catches, such as `ValueError` | 1, after the traceback       |

The string form prints the message and exits with 1 in one line. The first program on this page could use `sys.exit(f"No file named {name} in data.")` in place of its `print` and `sys.exit(1)`. The [`sys.exit` docs](https://docs.python.org/3/library/sys.html#sys.exit) call it "a quick way to exit a program when an error occurs."

To see a status, run the program in a terminal, then ask for the status right away. On a Mac, `echo $?` prints it:

```
% python3 orders.py
No file named orders.csv in data.
% echo $?
1
```

In PowerShell on Windows, `$LASTEXITCODE` holds it:

```
PS> python orders.py
No file named orders.csv in data.
PS> $LASTEXITCODE
1
```

Other programs use the status to decide whether to keep going. In a Mac terminal, `python3 orders.py && echo "Done."` prints `Done.` only if `orders.py` exits with 0.

## `os._exit` Skips the Cleanup

`os._exit` is the one way out that does not raise `SystemExit`. It ends the program at once, so no `finally` block runs and no file gets closed. That matters because [until `close` runs, what a program wrote may not be in the file yet](10-exceptions-and-files.html#18). These two programs differ only in how they stop:

```python
import sys

with open("report.txt", "w") as f:
    f.write("Total: 42\n")
    sys.exit(1)
```

```python
import os

with open("report.txt", "w") as f:
    f.write("Total: 42\n")
    os._exit(1)
```

After the first program, `report.txt` holds `Total: 42`. After the second, `report.txt` is empty: `os._exit` ended the program before `with` could close the file. The [`os._exit` docs](https://docs.python.org/3/library/os.html#os._exit) call `sys.exit(n)` "the standard way to exit." They keep `os._exit` for the copy of a program that `os.fork()` makes, which this course does not cover.

## Sources

- [Constants Added by the `site` Module](https://docs.python.org/3/library/constants.html#constants-added-by-the-site-module), Python standard library
- [`sys.exit`](https://docs.python.org/3/library/sys.html#sys.exit), Python standard library
- [`os._exit`](https://docs.python.org/3/library/os.html#os._exit), Python standard library
- [What's New in Python 2.5](https://docs.python.org/3/whatsnew/2.5.html): PEP 352 and the interactive interpreter changes
- [What's New in Python 3.13: A Better Interactive Interpreter](https://docs.python.org/3/whatsnew/3.13.html#a-better-interactive-interpreter)-->
