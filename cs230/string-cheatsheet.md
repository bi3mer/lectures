# String Cheatsheet

A string is a sequence of characters: letters, digits, spaces, and punctuation. This sheet collects everything from Chapter 8 and class in one place. Every example can be pasted into a file and run.

## String Literals

```python
"Hello, World!"      # double quotes
'Hello, World!'      # single quotes, same thing
""                   # the empty string: no characters
f"Hello, {name}!"    # formatted string literal, or f-string
```

In an f-string, `{name}` is replaced with the value of `name`. Use the other kind of quote when the text contains one: `"It's here"` or `'She said "hi"'`.

### Special Characters

| Write | Meaning                       |
| ----- | ----------------------------- |
| `\n`  | newline (go to the next line) |
| `\t`  | tab                           |
| `\"`  | a double quote inside `"..."` |
| `\'`  | a single quote inside `'...'` |
| `\\`  | one backslash                 |

```python
print("Line one\nLine two")
```

```
Line one
Line two
```

Space, tab, and newline are **whitespace** characters.

## Joining, Repeating, and Converting

```python
first = "Jane"
greeting = "Hello, " + first   # "Hello, Jane"   + joins
greeting += "!"                # "Hello, Jane!"  += adds more
line = "-" * 20                # "--------------------"
```

`+` joins (concatenates) two strings, `+=` glues more onto the end, and `*` repeats. Strings and numbers do not mix:

```python
age = 21
print("Age: " + age)        # TypeError
print("Age: " + str(age))   # Age: 21
print(f"Age: {age}")        # Age: 21   f-strings convert
```

The error message is `can only concatenate str (not "int") to str`.

| Function   | What it does                | Example                 |
| ---------- | --------------------------- | ----------------------- |
| `str(x)`   | number or boolean to string | `str(3.5)` is `"3.5"`   |
| `int(s)`   | string to whole number      | `int("42")` is `42`     |
| `float(s)` | string to decimal number    | `float("3.5")` is `3.5` |
| `len(s)`   | number of characters        | `len("Hello")` is `5`   |

`input` always gives back a string, even when the user types a number. `int("abc")` and `int("3.5")` are both a `ValueError`.

## Indexing

```
   H   e   l   l   o   ,       W   o   r   l   d   !
   0   1   2   3   4   5   6   7   8   9  10  11  12
```

```python
greeting = "Hello, World!"

greeting[0]                  # "H"   counting starts at 0
greeting[7]                  # "W"
greeting[6]                  # " "   the space is a character
greeting[len(greeting) - 1]  # "!"   the last index is len - 1
greeting[-1]                 # "!"   negative: from the end
greeting[13]                 # IndexError
```

Indexing an empty string is always an `IndexError`, so check `len(text) > 0` first when the text comes from `input`.

## Slicing

```python
greeting = "Hello, World!"

greeting[0:5]      # "Hello"          up to, not including, 5
greeting[7:12]     # "World"
greeting[:5]       # "Hello"          start defaults to 0
greeting[7:]       # "World!"         end defaults to len
greeting[7:100]    # "World!"         past the end is fine
greeting[3:3]      # ""               nothing between 3 and 3
greeting[::2]      # "Hlo ol!"        every other character
greeting[::-1]     # "!dlroW ,olleH"  step backwards: reversed
```

The full form is `text[start:end:step]`, and the end is never included, same as `range`. The piece you get back (a **substring**) is a new string; the original is untouched.

```python
phone = "(800) 555-1357"

phone[1:4]     # "800"
phone[6:9]     # "555"
phone[10:]     # "1357"
```

## Looping Over a String

```python
word = "banana"

for i in range(len(word)):   # by index: i is 0, 1, 2, ...
    print(i, word[i])

for ch in word:              # by character: "b", "a", "n", ...
    print(ch)
```

Use the index version when you need the position. Use the character version when you only need the character. (Note: we won't be covering the second loop `for ch in word` until we get to Lists in chapter 6.)

## Searching

| Expression            | Gives back                                | Example                               |
| --------------------- | ----------------------------------------- | ------------------------------------- |
| `piece in s`          | `True` if `piece` appears anywhere in `s` | `"nan" in "banana"` is `True`         |
| `piece not in s`      | `True` if it does not                     | `"z" not in "banana"` is `True`       |
| `s.find(piece)`       | index of the first match, `-1` if none    | `"banana".find("n")` is `2`           |
| `s.rfind(piece)`      | index of the last match, `-1` if none     | `"banana".rfind("n")` is `4`          |
| `s.index(piece)`      | like `find`, but a `ValueError` if none   | `"banana".index("n")` is `2`          |
| `s.rindex(piece)`     | like `rfind`, but a `ValueError` if none  | `"banana".rindex("n")` is `4`         |
| `s.count(piece)`      | how many times `piece` appears            | `"banana".count("a")` is `3`          |
| `s.startswith(piece)` | `True` if `s` begins with `piece`         | `"hello".startswith("he")` is `True`  |
| `s.endswith(piece)`   | `True` if `s` ends with `piece`           | `"file.py".endswith(".py")` is `True` |

Watch out: `"" in s` is always `True`, and `"EM" in "EMO"` is `True`. To check for one letter, check the length too: `len(status) == 1 and status in "EMO"`.

`find` gives back an index, which is exactly what slicing needs:

```python
full_name = "Jane Doe"
space = full_name.find(" ")     # 4

first = full_name[:space]       # "Jane"
last = full_name[space + 1:]    # "Doe"
```

## Methods That Give Back a New String

Strings are **immutable**: no method changes the string it is called on. Each one gives back a new string, so keep it in a variable.

```python
text = "hello"
text.upper()          # "HELLO" is built and thrown away
text = text.upper()   # text is now "HELLO"
```

After the second line, `text` is still `"hello"`. After the third, it is `"HELLO"`.

| Method                      | What it does                                 | Example                                     |
| --------------------------- | -------------------------------------------- | ------------------------------------------- |
| `s.upper()`                 | all uppercase                                | `"Hi there".upper()` is `"HI THERE"`        |
| `s.lower()`                 | all lowercase                                | `"Hi there".lower()` is `"hi there"`        |
| `s.swapcase()`              | uppercase to lowercase and back              | `"Hi there".swapcase()` is `"hI THERE"`     |
| `s.capitalize()`            | first letter uppercase, the rest lowercase   | `"hi THERE".capitalize()` is `"Hi there"`   |
| `s.title()`                 | first letter of every word uppercase         | `"hi there".title()` is `"Hi There"`        |
| `s.strip()`                 | remove whitespace from both ends             | `"  hi  ".strip()` is `"hi"`                |
| `s.lstrip()` / `s.rstrip()` | remove whitespace from the left / right only | `"  hi  ".rstrip()` is `"  hi"`             |
| `s.replace(old, new)`       | swap every `old` for `new`                   | `"a-b-c".replace("-", " ")` is `"a b c"`    |
| `s.replace(old, new, n)`    | swap only the first `n`                      | `"a-b-c".replace("-", " ", 1)` is `"a b-c"` |
| `s.center(w)`               | pad with spaces to width `w`, text in middle | `"hi".center(6)` is `"  hi  "`              |
| `s.ljust(w)` / `s.rjust(w)` | pad to width `w`, text on the left / right   | `"hi".rjust(6)` is `"    hi"`               |
| `s.zfill(w)`                | pad a number string with zeros on the left   | `"42".zfill(5)` is `"00042"`                |
| `s.expandtabs(n)`           | replace each tab with spaces, `n` per tab    | `"a\tb".expandtabs(4)` is `"a   b"`         |

`strip` matters with `input`: users type extra spaces without noticing. It can also remove other characters: `"$1,250".strip("$")` is `"1,250"`. Cleaning input often chains several methods, since each one gives back a string:

```python
price = "  $ 1,250.50 "
clean = price.replace(" ", "")   # "$1,250.50"
clean = clean.replace("$", "")   # "1,250.50"
clean = clean.replace(",", "")   # "1250.50"
amount = float(clean)            # 1250.5
```

The three `replace` lines can be chained into one: `price.replace(" ", "").replace("$", "").replace(",", "")`.

## Checking Strings

Each gives back `True` or `False`. On the empty string, all of them give back `False` except `isascii` and `isprintable`.

| Method             | `True` when...                                           | Example                   |
| ------------------ | -------------------------------------------------------- | ------------------------- |
| `s.isalpha()`      | every character is a letter                              | `"abc".isalpha()`         |
| `s.isdigit()`      | every character is a digit, `0` to `9`                   | `"123".isdigit()`         |
| `s.isalnum()`      | every character is a letter or a digit                   | `"abc123".isalnum()`      |
| `s.isspace()`      | every character is whitespace                            | `"  ".isspace()`          |
| `s.isupper()`      | every letter is uppercase (and there is at least one)    | `"ABC 1".isupper()`       |
| `s.islower()`      | every letter is lowercase (and there is at least one)    | `"abc 1".islower()`       |
| `s.istitle()`      | every word starts with an uppercase letter               | `"Hi There".istitle()`    |
| `s.isdecimal()`    | every character is a decimal digit, in any language      | `"123".isdecimal()`       |
| `s.isnumeric()`    | every character is numeric, including fractions like `½` | `"½".isnumeric()`         |
| `s.isascii()`      | every character is in the ASCII table below              | `"abc".isascii()`         |
| `s.isprintable()`  | every character can be printed (no `\n`, `\t`, ...)      | `"abc".isprintable()`     |
| `s.isidentifier()` | the string could be a variable name                      | `"my_var".isidentifier()` |

`"3.5".isdigit()` and `"-3".isdigit()` are both `False`: the dot and the minus sign are not digits. For plain digits, `isdigit`, `isdecimal`, and `isnumeric` agree; they differ only on unusual characters.

```python
password = input("Enter a password: ")
has_digit = False

for ch in password:
    if ch.isdigit():
        has_digit = True
```

## Splitting

```python
parts = "Jane Doe".split(" ")   # ['Jane', 'Doe']

parts[0]                        # "Jane"
parts[1]                        # "Doe"
len(parts)                      # 2
```

`split` cuts the string at every separator and gives back the pieces. The result is not a string. It is a new kind of value (a list, which gets its own lecture later) that holds several strings; indexing and `len` work on it. The pieces are strings, so they go through `int` or `float` before any math:

```python
date = "2026-09-18"
parts = date.split("-")
year = int(parts[0]) # 2026
```

```python
"a,b,,c".split(",")     # ['a', 'b', '', 'c']
"a   b".split()         # ['a', 'b']
"one\ntwo".splitlines() # ['one', 'two']
"-".join(parts)         # "2026-09-18"
```

Two separators in a row give an empty piece between them. With no separator, `split` cuts on any whitespace and ignores extras. `splitlines` cuts at every newline. `join` is the reverse of `split`: it glues the pieces back together with the string in front of the dot between them. The textbook also lists `partition`, which cuts at the first match and gives back three pieces: `"jdoe@example.com".partition("@")` is `('jdoe', '@', 'example.com')`.

## Comparing Strings

```python
"apple" == "apple"     # True    same characters, same order
"apple" == "Apple"     # False   case matters
"apple" != "pear"      # True
"apple" < "banana"     # True    alphabetical
"apple" < "Banana"     # False   uppercase before lowercase
"10" < "9"             # True    text: "1" is before "9"
```

`<` and `>` compare one character at a time, left to right, and every uppercase letter comes before every lowercase letter. Numbers stored as strings compare as text, so `"10"` comes before `"9"`. To compare without caring about case, lowercase both sides: `a.lower() == b.lower()`.

### Characters Are Numbers Underneath

Every character has a number, its ASCII code, and `<` compares those numbers. `ord` gives the code for a character; `chr` gives the character for a code.

```python
ord("A")            # 65
ord("a")            # 97
chr(66)             # "B"
chr(ord("a") + 1)   # "b"
```

| Code    | Characters                               |
| ------- | ---------------------------------------- |
| 0-31    | special characters, e.g., tab, backspace |
| 32      | space                                    |
| 33-47   | symbols: `! " # $ % & ' ( ) * + , - . /` |
| 48-57   | digits: `0` to `9`                       |
| 58-64   | symbols: `: ; < = > ? @`                 |
| 65-90   | uppercase letters: `A` to `Z`            |
| 91-96   | symbols: `` [ \ ] ^ _ ` ``               |
| 97-122  | lowercase letters: `a` to `z`            |
| 123-126 | symbols: `{` \| `} ~`                    |
| 127     | DEL                                      |

Digits come before uppercase letters, and uppercase letters come before lowercase letters. That is why `"Zebra" < "apple"` is `True`.

## Format Strings

Inside an f-string, `{value:spec}` controls how the value is printed.

| Write              | Prints      | Meaning                               |
| ------------------ | ----------- | ------------------------------------- |
| `f"{3.14159:.2f}"` | `3.14`      | 2 digits after the decimal point      |
| `f"{5:3}"`         | `  5`       | width 3, numbers line up on the right |
| `f"{'hi':6}"`      | `hi    `    | width 6, strings line up on the left  |
| `f"{5:<3}"`        | `5  `       | `<` forces left                       |
| `f"{'hi':>6}"`     | `    hi`    | `>` forces right                      |
| `f"{'hi':^6}"`     | `  hi  `    | `^` centers                           |
| `f"{1234567:,}"`   | `1,234,567` | thousands separators                  |
| `f"{1234.5:,.2f}"` | `1,234.50`  | separators and 2 decimal places       |
| `f"{0.25:.1%}"`    | `25.0%`     | as a percentage                       |
| `f"{7:05}"`        | `00007`     | pad with zeros                        |
| `f"{{}}"`          | `{}`        | a literal brace                       |

Width is handy for lining up columns:

```python
for row in range(1, 6):
    for col in range(1, 6):
        print(f"{row * col:3}", end="")

    print()
```

`end=""` keeps `print` from moving to the next line; `print()` on its own ends the line. The textbook also uses the older `"Hello, {}!".format(name)`, which does the same thing as `f"Hello, {name}!"`.

## Common Mistakes

| Code                       | Problem                                                       | Fix                                    |
| -------------------------- | ------------------------------------------------------------- | -------------------------------------- |
| `"Age: " + 21`             | `TypeError`: a string cannot be joined to a number            | `"Age: " + str(21)` or `f"Age: {21}"`  |
| `text.upper()` on its own  | the new string is thrown away; `text` is unchanged            | `text = text.upper()`                  |
| `text[len(text)]`          | `IndexError`: the last index is `len(text) - 1`               | `text[len(text) - 1]` or `text[-1]`    |
| `text[0] = "H"`            | `TypeError`: strings are immutable                            | `text = "H" + text[1:]`                |
| `status in "EMO"`          | `True` for `""` and `"EM"`, not only single letters           | `len(status) == 1 and status in "EMO"` |
| `if text == "yes" or "y":` | always `True`; `"y"` on its own counts as `True`              | `if text == "yes" or text == "y":`     |
| `"10" < "9"` is `True`     | comparing text, not numbers                                   | `int("10") < int("9")`                 |
| `int("3.5")`               | `ValueError`: not a whole number                              | `float("3.5")`                         |
| `input("Age: ") == 21`     | always `False`; `input` gives back a string, `21` is a number | `int(input("Age: ")) == 21`            |

## Glossary

- **ASCII**: The standard numbering of characters. `ord` and `chr` convert between a character and its number.
- **character**: A single letter, digit, symbol, or whitespace. A string is a sequence of characters.
- **concatenation**: Joining strings end to end with `+`.
- **empty string**: A string with no characters, written `""`.
- **escape sequence**: A backslash followed by a character, such as `\n` or `\"`, that stands for a character you cannot type directly.
- **immutable**: Cannot be changed after it is created. Strings are immutable; string methods give back new strings.
- **index**: The position of a character in a string, counting from 0.
- **newline**: The special character denoted as `\n`, which represents a new line.
- **separator**: The string that `split` cuts on, such as `" "`, `","`, or `"-"`. The textbook calls it a delimiter.
- **slicing**: Generating a substring from a string using brackets and colons, for example `s[0:5]`.
- **str**: The Python type for representing strings as a sequence of characters, which provides methods for working with strings.
- **str()**: The Python function to convert a value of another data type to a string.
- **string literal**: A string constant, defined as a set of characters between apostrophes or quotes.
- **string method**: A method that can work with a string to generate a result; depending on the method, the result is of a particular type such as string, Boolean, integer, or list.
- **string variable**: A variable that refers to a string.
- **substring**: A piece of a string, such as what slicing gives back.
- **whitespace**: A character such as space, tab, or newline.
- **zero-indexing**: Counting positions from 0 rather than 1, so the first character is at index 0 and the last is at `len(s) - 1`.
