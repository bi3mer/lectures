# Plan: Lecture 11, the `os` Module (Appendix K)

## Context

Deck 10 (`cs230/10-exceptions-and-files.md`) cut `os.path.join` and `os.listdir` to stay near 40 slides. Its closing comment lists what moves to this deck: `os.getcwd()` to explain a `FileNotFoundError` from the wrong folder, `os.listdir()`, `os.path.join()`, `os.path.isfile()`, `os.path.exists()`, and textbook programs K-1 and K-2. The source plans (`~/classes/cs230/plans/3-os-module-dictionaries-and-sets.md` and Session 2 of `plans/2-lists-files-and-exceptions.md`) give Appendix K one class.

- **Core:** `import` and modules, `os.getcwd()`, `os.path.join()`, `os.listdir()`, `os.path.isfile()`, `os.path.exists()`, K-1, and K-2 without `sys.argv`.
- **Skip:** K-3, which needs `sys.argv` and `os.walk`. VS Code's Run button passes no command-line arguments.

Students arrive with deck 10: `try`/`except`, `with open`, `for line in f`, `strip`, `split(",")`, `readline` for headers, `"w"`, `"a"`, and `write`. In deck 10 the files sat next to the program. This deck moves them into a `data` folder, and decks 12 and 13 keep that folder.

## Files

| File | Change |
| --- | --- |
| `cs230/11-os-module.md` | New deck, titled `` The `os` Module `` (outline below) |
| `cs230/data/months/` | New folder with `2023-01.csv`, `2023-02.csv`, and `2023-03.csv` (below) |
| `cs230/os-module-cheatsheet.md` | New cheat sheet (below) |
| `cs230/index.html` | A lecture card after Exceptions and Files; a handout card after the Exceptions and Files Cheat Sheet |
| `cs230/10-exceptions-and-files.md` | Slide 41 becomes `` ## Next Up: The `os` Module `` and links `` [The `os` Module](11-os-module.html) `` in place of "The `os` module, then dictionaries." The cheat sheet sentence stays. |

The lecture card reads: `import os`, the current working directory, building paths with `os.path.join`, listing a folder with `os.listdir`, and checking paths with `os.path.isfile` and `os.path.exists`. It also links `11-os-module.pdf`.

## Deck Conventions

- The front matter is `marp: true`, `theme: lecture`, `paginate: true`. The title slide is `` # The `os` Module `` / `Colan Biemer`.
- The deck has at most 40 slides, counted the way Marp numbers them.
- A divider is a bare `##` heading.
- A concept slide shows code, then a cue of one or two sentences (about 25 words). The talk explains each first example line by line.
- Templates use `[NAME]` placeholders.
- A We Do is `## Problem: Name (us)` and `## Solution: Name (us)`. The problem slide holds the statement as `#` comments in a `python` fence, the expected output in a plain fence, and one or two guiding questions.
- A You Do is `## Parsons Problem #N (you)`. The slide holds only "**One line does not belong.**" and the scrambled lines; a function in them is named `mystery`. The solution opens with "The extra line was ...".
- Trace problems are `## Problem: What Is the Output?` and `## Problem: Find the Bug`, with no suffix.
- Link-backs use `[phrase](deck.html#N)` and point only at code or a rule students reuse right then.
- The prose has no em dashes or contractions, and headings use title case.

## Slide Outline (34 Slides)

### Where Python Looks (Slides 2 to 8)

2. **Where Python Looks** (divider)
3. **Problem: Find the Bug**: a folder tree, with VS Code open on `cs230/` and both `program.py` and `names.txt` inside `cs230/week8/`. Beside it is deck 10's `names.txt` loop and its error, `FileNotFoundError: [Errno 2] No such file or directory: 'names.txt'`. The question: "`names.txt` sits next to `program.py`. Why can Python not find it?"
4. **Solution: Find the Bug**: Python opens a bare file name from the **current working directory**. VS Code's Run button starts the program in the folder VS Code has open, not the program's folder. The fix is File > Open Folder on `week8`. The slide links [`FileNotFoundError`](10-exceptions-and-files.html#22).
5. **Modules and `import`**: `import os`. A **module** is a file of extra functions that ships with Python, and `os.` names the module that holds a function. The slide links back to [`import sys`](02-variables-and-statements.html#21), which promised "we'll cover this later".
6. **`os.getcwd()`**: the first example, `print(os.getcwd())`, with a Mac output (`/Users/ada/cs230`) and a Windows output (`C:\Users\ada\cs230`). The cue: Python opens bare file names from this folder.
7. **Problem: Find the Bug**: `import os`, then `print(getcwd())`.
8. **Solution: Find the Bug**: `NameError: name 'getcwd' is not defined`. A module's functions need the module's name in front. Leaving out `import os` instead prints `NameError: name 'os' is not defined. Did you forget to import 'os'?`

### Paths (Slides 9 to 25)

9. **Paths** (divider)
10. **Files for Today**: make a `data` folder next to the program and move deck 10's five files into it. Then make `data/months` and save the three month files there. A plain-fence tree shows the result, and the slide links the three downloads.
11. **Paths with `os.path.join`**: the first example. `path = os.path.join("data", "names.txt")`, `print(path)`, then deck 10's loop with `open(path, "r")`. The output is `data/names.txt` on a Mac and `data\names.txt` on Windows. The cue: a **path** names a file by the folders that lead to it, and `join` puts the right separator between the pieces.
12. **Problem: Find the Bug**: `path = "data" + "names.txt"` before the same loop.
13. **Solution: Find the Bug**: `FileNotFoundError: [Errno 2] No such file or directory: 'datanames.txt'`. `+` adds no separator, and `os.path.join` does.
14. **Every Name in a Folder: `os.listdir`**: `print(os.listdir("data"))`, then `print(sorted(os.listdir("data")))`, which prints `['measures.txt', 'months', 'names.txt', 'prices.csv', 'sales.csv', 'scores.csv']`. `listdir` returns files and folders alike, in no fixed order, and [`sorted`](09-changing-lists.html#25) fixes the order.
15. **Problem: Find the Bug**: `for name in sorted(os.listdir("data")):` calls `open(name, "r")` and prints each file's first line.
16. **Solution: Find the Bug**: `FileNotFoundError: [Errno 2] No such file or directory: 'measures.txt'`. `listdir` gives names without their folder, so `os.path.join("data", name)` builds the path `open` needs. This pairing is the main use of `join`.
17. **Problem: What Is the Output?**: the fixed loop counts each file's lines and prints the name and the count.
18. **Solution: What Is the Output?**: `measures.txt 4`, then `IsADirectoryError: [Errno 21] Is a directory: 'data/months'`. `listdir` lists folders too, and `open` cannot read a folder. Windows raises `PermissionError` instead. The count is 4 because the last line of `measures.txt` is blank.
19. **`os.path.isfile` and `os.path.exists`**: four calls and their results. `isfile` gives `True` on `names.txt` and `False` on `months`. `exists` gives `True` on `months` and `False` on a misspelled name. The cue: `isfile` is `True` only for a file that exists, and `exists` is `True` for a file or a folder.
20. **Only the Files: Program K-1**: the textbook's K-1 with four-space indents and `sorted`. The output lists the five files and skips `months`.
21. **Two Ways to Handle a Missing File**: on the left, `if os.path.isfile(path):` with an `else`. On the right, the `try`/`except FileNotFoundError` from [`FileNotFoundError`](10-exceptions-and-files.html#22). The cue: `isfile` asks before opening, and `try` handles the failure after.
22. **Problem: Pick a File (us)**: ask for a name until it names a file in `data`, then print its line count. The output rejects `nmaes.txt` and `months`, then prints `names.txt has 3 lines.` Guiding questions: "Which path does the check need?" and "Why does `months` fail the check?"
23. **Solution: Pick a File (us)**: `path = os.path.join("data", name)`, a `while not os.path.isfile(path):` loop that asks again, then the counting loop.
24. **Parsons Problem #1 (you)**: `mystery(folder)` returns the names in `folder` that are not files, called on `"data"`. The extra line is `path = folder + name`, beside `path = os.path.join(folder, name)`.
25. **Solution: Parsons Problem #1 (you)**: `folder + name` builds paths such as `datamonths` that name nothing. `isfile` is then `False` for every name, so `mystery` would return them all.

### Many Files at Once (Slides 26 to 32)

26. **Many Files at Once** (divider)
27. **Problem: Total of Every Month (us)**: print each month file's sales total, then the total of all three. The expected output is `2023-01.csv: $90.65`, `2023-02.csv: $72.20`, `2023-03.csv: $112.70`, and `All months: $275.55`. [Total Sales](10-exceptions-and-files.html#29) did one file. Guiding questions: "Which part of Total Sales stays the same?" and "What changes from file to file?"
28. **Solution: Total of Every Month (us)**: `file_total(path)` holds the Total Sales loop and returns the total. The main loop calls `listdir`, `join`, and `file_total`, and adds each result to `grand_total`.
29. **Problem: Find the Bug**: on a Mac, the same program fails. `print(sorted(os.listdir(folder)))` shows `['.DS_Store', '2023-01.csv', '2023-02.csv', '2023-03.csv']`. The question: "What does the loop do with `.DS_Store`?"
30. **Solution: Find the Bug**: Finder adds a hidden `.DS_Store` file to folders it opens. It is not a CSV, so reading it fails. `if name.endswith(".csv"):` skips every other file. `endswith` is the partner of `startswith` from [More Methods](06-strings-and-format-strings.html#90).
31. **Parsons Problem #2 (you)**: textbook K-2 without `sys.argv`. It writes `all_months.csv` with one header line, then the data lines of every `.csv` in `data/months`. The extra line is `with open(name, "r") as f_in:`, beside `with open(os.path.join(folder, name), "r") as f_in:`.
32. **Solution: Parsons Problem #2 (you)**: the extra line drops the folder, which is slide 15's bug. Each file's `readline` skips its own header, so the combined file has only the one written at the top.
33. **Summary**: `import os`; the current working directory; `os.path.join`; `os.listdir`, which gives names only, in any order; `isfile` and `exists`; and filtering names with `endswith`.
34. **Next Up: Dictionaries**: links [Dictionaries](12-dictionaries.html) and the [`os` Module Cheat Sheet](os-module-cheatsheet.html).

If the class runs long, cut slides 7 and 8 first.

## Data Files (`cs230/data/months/`)

The files use the `sales.csv` columns (`product,date,price,quantity`). The `YYYY-MM` names make `sorted` match date order.

- `2023-01.csv`: `P-01,2023-01-04,9.95,3`, `P-02,2023-01-11,10.50,2`, and `P-01,2023-01-19,9.95,4`. The total is $90.65.
- `2023-02.csv`: `P-02,2023-02-02,10.50,5` and `P-01,2023-02-15,9.85,2`. The total is $72.20.
- `2023-03.csv`: `P-01,2023-03-03,9.95,6`, `P-02,2023-03-09,10.60,1`, and `P-02,2023-03-27,10.60,4`. The total is $112.70.

Slide 14's listing shows the students' folder: deck 10's five files plus `months`. Deck 13 later adds `products.csv` to the site's `data/`, but students do not have it yet.

## Cheat Sheet (`cs230/os-module-cheatsheet.md`)

The sheet uses the format of `exceptions-and-files-cheatsheet.md`: an opening paragraph, then these sections.

- `import` and modules
- The current working directory: `os.getcwd()`, VS Code's open folder, the terminal's `cd`, and the Python extension setting that runs files from their own folder (confirm its name, `python.terminal.executeInFileDir`, before writing it)
- Paths: `os.path.join` and the Mac and Windows separators
- Listing a folder: `os.listdir`, `sorted`, hidden files such as `.DS_Store`, and `endswith`
- Checking a path: a table comparing `isfile` and `exists`
- Textbook programs K-1 and K-2 as printed, with `sys.argv` explained in two sentences, beside the class versions
- Common Mistakes: a missing `os.`, `+` in place of `join`, `open(name)` without the folder, opening a folder, and writing the output file into the folder being listed, which the next run then reads
- Glossary: module, path, current working directory, and folder (directory)

## Verification

- Run every slide's code with `python3 -I` (3.14.8 here) in the scratchpad against a copy of `cs230/data/`, including `months/`. Paste outputs and errors exactly as printed. These four messages already match 3.14.8: `IsADirectoryError: [Errno 21] Is a directory: 'data/months'`, `FileNotFoundError: [Errno 2] No such file or directory: 'datanames.txt'`, `NameError: name 'getcwd' is not defined`, and `NameError: name 'os' is not defined. Did you forget to import 'os'?`
- Slide 30 names an error only if a real `.DS_Store` confirms it. Otherwise it says that reading the file fails.
- The Windows forms (`data\names.txt`, `C:\Users\...`, `PermissionError`) cannot run here, so they stick to what the Python documentation shows.
- Count the slides (at most 40) by the `---` lines outside code fences. Confirm each link target's heading: 02#21, 06#90, 09#25, 10#22, and 10#29.
- Run `npx prettier@3.3.3 --print-width 100 --check` on the deck and the cheat sheet. Add `<!-- prettier-ignore -->` wherever Prettier would change taught code or the folder trees.
- Do not render the deck; the user checks rendering.
