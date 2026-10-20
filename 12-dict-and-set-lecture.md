# Plan: Lectures 12 and 13, Dictionaries and Sets (Chapter 9)

## Context

The source plan (`~/classes/cs230/plans/3-os-module-dictionaries-and-sets.md`, with `plans/4-dictionaries-continued.md`) spreads Chapter 9 over three classes. The user gives it two lectures, each a deck of at most 40 slides:

- **Deck 12, Dictionaries:** 9.1 to 9.4 and the counting pattern. This is the source plan's Session 1 and most of Session 2.
- **Deck 13, Records and Sets:** 9.5, 9.6, 9.7, and 9.9. This is the rest of Session 2 and all of Session 3.

The source plan's If Time items (`get`, `sorted(d)`, printing a table) go to the cheat sheet. Its Skip list stays skipped: `symmetric_difference()`, dictionary comprehensions, `Counter`, and `defaultdict`.

Students arrive knowing parallel lists and the largest-by-hand loop ([Longest Word](08-lists.html#32)), `in` on lists, the `match` Day of Week example, tuple unpacking, `sorted`, deck 10's file reading, and deck 11's `data` folder with `os.path.join`.

The decks avoid the posted practice problems 9.1 (inventory lookup with `*`), 9.2 (counting four words in `words.txt`), and 9.3 (top seller from typed input). They teach the same patterns with menus, votes, and product sales. Best Day uses the same pattern as 9.3, but on a literal dictionary with no input loop. Sales by Product is the textbook's Chapter 9 hands-on exercise. It overlaps the proposed w8p1 (Sales by Region) if that program gets assigned.

## Files

| File | Change |
| --- | --- |
| `cs230/12-dictionaries.md` | New deck, titled `Dictionaries` |
| `cs230/13-records-and-sets.md` | New deck, titled `Records and Sets` |
| `cs230/data/products.csv` | A copy of the textbook's `ch09/products.txt` |
| `cs230/dictionaries-and-sets-cheatsheet.md` | New cheat sheet: deck 12 writes the dictionary sections, and deck 13 adds the rest |
| `cs230/index.html` | Two lecture cards after The `os` Module, and one handout card |

Deck 11's Next Up already links deck 12. Deck 12's Next Up links deck 13.

Card text for deck 12: creating dictionaries, looking up keys with `in` and `KeyError`, looping with `keys`, `values`, and `items`, and counting with a dictionary. Card text for deck 13: `del` and `update`, dictionaries of dictionaries and of lists, sets and `|`, `&`, `-`, and hashable keys. Each card also links its PDF.

## Deck Conventions

These are the conventions of `11-os-lecture.md`, plus two rules for dictionaries and sets. Both decks open files with `os.path.join("data", ...)`, which keeps deck 11's habit. Every printed set goes through `sorted`, so the output is the same on every run. The one exception is the demo on deck 13's slide 21, which says the order varies.

## Deck 12: Dictionaries (35 Slides)

### Keys and Values (Slides 2 to 18)

2. **Keys and Values** (divider)
3. **Two Lists That Go Together**: `days = ["Mon", "Tue", "Wed", "Thu", "Fri"]` and `sales = [50, 75, 60, 90, 40]`, with a `for i in range(len(days))` loop that finds Wednesday's sales. This is practice problem 6.2's setup. The cue: the lists must stay in step, and every lookup takes a loop.
4. **Creating a Dictionary**: the first example. `sales = {"Mon": 50, ...}`, `print(sales["Wed"])` (60), `print(len(sales))` (5), and the template `{[KEY]: [VALUE], ...}`. The cue: a **dictionary** stores **key**: **value** pairs, and `sales["Wed"]` looks up a value by its key, as `scores[2]` looks one up by its index.
5. **Problem: What Is the Output?**: `d = {"a": 1}`, `d["a"] = 5`, `d["b"] = 2`, `print(d)`, and `print(len(d))`.
6. **Solution: What Is the Output?**: `{'a': 5, 'b': 2}` and `2`. Assigning to a key that exists replaces its value, and a new key adds a pair.
7. **Starting from `{}`**: textbook program 9-1, the contact builder. `contacts = {}`, an input loop that ends on a blank line, `email, phone = entry.split()` ([Unpacking](07-functions.html#81)), and `contacts[email] = phone`.
8. **`KeyError`**: `sales["Sat"]` raises `KeyError: 'Sat'`, the dictionary's version of [Index Out of Range](08-lists.html#7).
9. **Checking with `in`**: the guard from textbook program 9-3, `if day in sales:` with an `else`. `in` and `not in` work as they do on [lists](08-lists.html#41).
10. **Problem: What Is the Output?**: `prices = {"coffee": 3.0, "tea": 2.5}`, then `print("tea" in prices)` and `print(2.5 in prices)`.
11. **Solution: What Is the Output?**: `True`, then `False`. `in` checks only the keys.
12. **Problem: Find the Bug**: a menu lookup prints `Not on the menu.` when the user types `Coffee ` (a capital letter and a trailing space).
13. **Solution: Find the Bug**: `"Coffee "` and `"coffee"` are different keys. `.strip().lower()` before the lookup fixes it.
14. **Lookup Tables**: the [Day of Week](03-booleans-and-if-statements.html#30) `match` on the left. On the right, `days = {1: "Monday", ..., 7: "Sunday"}` with an `in` check. The cue: when every case only picks a value, one dictionary replaces the whole chain, and its keys can be numbers.
15. **Problem: State Names (us)**: turn two-letter abbreviations into state names until a blank line, and print `Unknown state.` for any other input. The sample output includes a lowercase `ny`. Guiding questions: "What are the keys, and what are the values?" and "How should `ny` work?"
16. **Solution: State Names (us)**: a five-state dictionary, `.strip().upper()`, and an `in` check inside a `while` loop.
17. **Parsons Problem #1 (you)**: a menu dictionary and an input loop that adds up an order and prints the total. The extra line is `total += menu["item"]`, beside `total += menu[item]`.
18. **Solution: Parsons Problem #1 (you)**: the quotes make `"item"` a key the menu does not have, so the line raises `KeyError: 'item'`.

### Looping Over a Dictionary (Slides 19 to 25)

19. **Looping Over a Dictionary** (divider)
20. **`for` Over a Dictionary**: `for day in sales:` gives the keys, and `sales[day]` gives each value. `for day in sales.keys():` does the same.
21. **`values()` and `items()`**: in two columns, `for amount in sales.values():` and `for day, amount in sales.items():` (textbook program 9-4). `items()` hands the loop a `(key, value)` tuple that unpacks as [`enumerate`](09-changing-lists.html#39) does.
22. **Problem: Find the Bug**: `total = 0`, then `for amount in sales: total += amount`.
23. **Solution: Find the Bug**: `TypeError: unsupported operand type(s) for +=: 'int' and 'str'`. The loop gives the keys. Loop over `sales.values()`, or write `sum(sales.values())`.
24. **Problem: Best Day (us)**: print the day with the most sales. The expected output is `Best day: Thu (90)`. The guiding questions come from [Longest Word](08-lists.html#31): "What do we need to remember as we go? What should it start as?"
25. **Solution: Best Day (us)**: an `items()` loop that tracks `best_day` and `best_amount`, which is the Longest Word pattern with two variables.

### Counting (Slides 26 to 33)

26. **Counting** (divider)
27. **Counting with a Dictionary**: the first example. `votes = ["red", "blue", "red", "green", "red"]`, the `if`/`else` counting loop, and the output `{'red': 3, 'blue': 1, 'green': 1}`. The cue: a new key starts at 1, and a key seen before goes up by 1.
28. **Problem: Find the Bug**: the loop holds only `counts[vote] += 1`.
29. **Solution: Find the Bug**: `KeyError: 'red'`. `+=` needs an old value, and the first `"red"` has none.
30. **Problem: Sales by Product (us)**: total `price * quantity` for each product in `data/sales.csv`. The expected output is `P-01: $99.10` and `P-02: $52.80`. [Total Sales](10-exceptions-and-files.html#29) kept one total. Guiding questions: "What are the keys?" and "What happens the first time a product shows up?" The source is the textbook's hands-on exercise (`p4da-handson-sales1.py` and `sales2.py`).
31. **Solution: Sales by Product (us)**: the Total Sales loop with a dictionary of totals and the counting pattern's `if`/`else`, then an `items()` loop that prints.
32. **Parsons Problem #2 (you)**: `mystery(words)` counts the words by their lowercased first letter. The extra line is `counts = []`, beside `counts = {}`.
33. **Solution: Parsons Problem #2 (you)**: `[]` makes a list, so `counts[first] = 1` raises `TypeError: list indices must be integers or slices, not str`.
34. **Summary**
35. **Next Up: Records and Sets**: links [Records and Sets](13-records-and-sets.html) and the [Dictionaries and Sets Cheat Sheet](dictionaries-and-sets-cheatsheet.html).

## Deck 13: Records and Sets (32 Slides)

### Changing a Dictionary (Slides 2 to 8)

2. **Changing a Dictionary** (divider)
3. **Removing a Pair with `del`**: `del sales["Fri"]`. `del` on a missing key raises `KeyError`, so textbook program 9-6 guards it with `in`. `del` works as it did on [lists](09-changing-lists.html#9).
4. **Combining with `update`**: `prices.update(new_prices)`. Keys already in `prices` take the new values, and new keys are added.
5. **Problem: What Is the Output?**: `stock = {"apples": 5, "pears": 2}`, `del stock["pears"]`, `stock["plums"] = 4`, `stock.update({"apples": 9, "kiwis": 1})`, and `print(stock)`.
6. **Solution: What Is the Output?**: `{'apples': 9, 'plums': 4, 'kiwis': 1}`. `update` replaced the value of `apples` and kept its place.
7. **Problem: Find the Bug**: a loop over `stock` runs `del stock[item]` for every count of 0.
8. **Solution: Find the Bug**: `RuntimeError: dictionary changed size during iteration`. This is the trap from [Removing While Looping](09-changing-lists.html#14), and the fix from [Build a New List Instead](09-changing-lists.html#15) applies: build `in_stock` from `items()`.

### Records (Slides 9 to 19)

9. **Records** (divider)
10. **Files for Today**: save [products.csv](data/products.csv) in `data`.
11. **A Dictionary of Dictionaries**: the first example. `students = {"s01": {"name": "Ana", "major": "CS", "gpa": 3.6}, "s02": {...}}` and `students["s01"]["gpa"]`. The cue: each value is a **record**, a dictionary whose keys name its fields, and the brackets read left to right.
12. **Looping Over Records**: the loop from textbook program 9-5, `for sid, student in students.items():`, which prints each name and GPA.
13. **Problem: Find the Bug**: `for sid in students: print(sid, students["name"])`.
14. **Solution: Find the Bug**: `KeyError: 'name'`. The keys of `students` are ids. The record is `students[sid]`, so the name is `students[sid]["name"]`.
15. **Problem: Product Records (us)**: read `data/products.csv` (`product-id,division,price`) into records keyed by product id, then print every `divb` product and its price. This is the first half of textbook program 9-8. Guiding questions: "What is the key, and what goes in each record?" and "Which field needs converting?"
16. **Solution: Product Records (us)**: `products[fields[0]] = {"division": fields[1], "price": float(fields[2])}`, then an `items()` loop with an `if`.
17. **A Dictionary of Lists**: `scores = {"Ana": [90, 85], "Ben": [70, 88]}`, `scores["Ana"].append(95)`, and an average with [`sum`](08-lists.html#39). The cue: Chapter 10's pandas builds a table from a dictionary of lists.
18. **Parsons Problem #1 (you)**: `mystery(scores)` returns each name's average from a dictionary of lists. The extra line is `averages[name] = sum(scores) / len(scores)`, beside `sum(marks) / len(marks)`.
19. **Solution: Parsons Problem #1 (you)**: `sum(scores)` adds up the dictionary's keys, which are names, and raises `TypeError: unsupported operand type(s) for +: 'int' and 'str'`.

### Sets (Slides 20 to 30)

20. **Sets** (divider)
21. **Sets**: `colors = {"red", "green", "blue", "red"}`, `print(len(colors))` (3), `"red" in colors`, and `colors[0]`, which raises `TypeError: 'set' object is not subscriptable`. The cue: a **set** holds distinct items in no particular order, so it has no indexes, and a printed set can list its items in any order.
22. **Creating and Changing a Set**: `tags = set()`, two calls to `add` that leave one copy, `remove`, and `remove` on a missing item, which raises `KeyError` (textbook program 9-7). `{}` makes an empty dictionary, and `set()` makes an empty set.
23. **Problem: What Is the Output?**: `words = ["the", "cat", "the", "hat"]`, `unique = set(words)`, `print(len(words), len(unique))`, and `print(sorted(unique))`.
24. **Solution: What Is the Output?**: `4 3` and `['cat', 'hat', 'the']`. `set` drops duplicates, and `sorted` returns a list in order.
25. **Combining Sets: `|`, `&`, `-`**: `a = {"red", "green", "blue"}` and `b = {"red", "yellow", "blue"}` (core coding problem CC-9.7.2), with `sorted(a | b)`, `sorted(a & b)`, `sorted(a - b)`, and their results. The cue: `|` keeps items in either set, `&` keeps items in both, and `-` keeps items in the first set only.
26. **Problem: Shared Hobbies (us)**: read two lines of comma-separated hobbies. Print the hobbies both people share, every hobby, and the hobbies only the first person has, each sorted. Guiding questions: "Which operator answers each line?" and "Why `sorted`?"
27. **Solution: Shared Hobbies (us)**: `set(input(...).split(","))` twice, then the three operators inside `sorted`.
28. **Parsons Problem #2 (you)**: `mystery(path)` returns the sorted product ids in a sales file. The extra line is `found = {}`, beside `found = set()`.
29. **Solution: Parsons Problem #2 (you)**: `{}` makes a dictionary, so `found.add(...)` raises `AttributeError: 'dict' object has no attribute 'add'`.
30. **Which Keys Work?** (9.9): `{[1, 2]: "x"}` raises `TypeError: cannot use 'list' as a dict key (unhashable type: 'list')`, and `{(1, 2): "x"}` works. The cue: dictionary keys and set items must be **hashable**, meaning values that cannot change, such as strings, numbers, and tuples. [Why Tuples?](09-changing-lists.html#38) promised this rule.
31. **Summary**
32. **Next Up**: names the next class on the posted schedule (the Quiz 2 review in `plans/5-review-and-quiz-2.md`) and links the cheat sheet. It gets a deck link once that deck exists, as deck 10's Next Up did on 2026-10-19.

## Data Files

- `cs230/data/products.csv`: a copy of `ch09/products.txt` from `~/classes/cs230/textbook/p4da-CodeAndDataFiles-20251122.zip`, with the header `product-id,division,price` and eight rows. The `.csv` name matches the class's other data files.
- Deck 12 reuses `data/sales.csv`.

## Cheat Sheet (`cs230/dictionaries-and-sets-cheatsheet.md`)

The sheet uses the format of the other cheat sheets.

- **Written with deck 12:** Creating; Looking Up (`[]`, `in`, `KeyError`); Adding and Replacing; Lookup Tables; Looping (`keys`, `values`, `items`); Counting, with `counts.get(key, 0) + 1` as the shorter form; Largest Value; and `sorted(d)`. Common Mistakes covers `KeyError`, case and spaces in keys, string keys from files (`d["1"]` is not `d[1]`), and `for x in d` giving keys. A Glossary closes the sheet.
- **Added with deck 13:** `del`; `update`; Changing While Looping; Records; Dictionaries of Lists; Sets; Set Operations; and Hashable Types. Common Mistakes gains `{}` versus `set()` and that sets have no indexes and no order.

## Learning Outcome Coverage

| Outcome (source plan) | Where |
| --- | --- |
| Key/value pairs, against a list's numbered items | Deck 12, slides 3 and 4 |
| `{key: value}`, and `{}` with `d[key] = value` | Deck 12, slides 4 and 7 |
| `d[key]`, and `KeyError` on a missing key | Deck 12, slides 4 and 8 |
| `in` and `not in` | Deck 12, slides 9 to 13 |
| `keys()`, `values()`, and `items()` | Deck 12, slides 20 to 23 |
| Dictionaries of dictionaries | Deck 13, slides 11 to 16 |
| Changing a value, `del`, and `update()` | Deck 12, slides 5 and 6; deck 13, slides 3 to 8 |
| Sets: `{...}`, `set()`, `add()`, and `remove()` | Deck 13, slides 21 to 24 |
| `\|`, `&`, and `-` | Deck 13, slides 25 to 27 |
| Hashable keys and set items | Deck 13, slide 30 |

## Verification

- Run every code block with `python3 -I` against a copy of `cs230/data/` that includes `products.csv`, and paste outputs exactly. These messages already match 3.14.8: `KeyError: 'red'`, `TypeError: unsupported operand type(s) for +=: 'int' and 'str'`, `RuntimeError: dictionary changed size during iteration`, `AttributeError: 'dict' object has no attribute 'add'`, `TypeError: 'set' object is not subscriptable`, and `TypeError: cannot use 'list' as a dict key (unhashable type: 'list')`. The last one is new wording in 3.14; older versions print only `unhashable type: 'list'`.
- Count each deck's slides (at most 40). Confirm each link target's heading: 03#30, 07#81, 08#7, 08#31, 08#32, 08#39, 08#41, 09#9, 09#14, 09#15, 09#38, 09#39, and 10#29. Deck 08 still has I Do and activity slides; if they come out first, recount its links.
- Run `npx prettier@3.3.3 --print-width 100 --check` on both decks and the cheat sheet, and add `<!-- prettier-ignore -->` wherever Prettier would change taught code.
- Do not render the decks; the user checks rendering.
