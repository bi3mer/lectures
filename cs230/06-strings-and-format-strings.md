---
marp: true
theme: lecture
paginate: true
---

# Strings and Format Strings

Colan Biemer

---

## Our First String From Week 1

```python
print("Hello, World!")
```

---

## String Literals

```python
print("Hello, World!")
```

`"Hello, World!"` is a **string literal**: text spelled out directly in the code, between quotes.

---

## Which Are String Literals?

```python
name = input("What is your name? ")
print(f"Hello, {name}")
print("")
print(name)
```

---

## Which Are String Literals?

```python
name = input("What is your name? ") # "What is your name? " is
print(f"Hello, {name}")             # yes, the whole thing
print("")                           # yes, and it is also called an empty string
print(name)                         # no, name is a variable
```

`f"..."` is short for **formatted string literal**. That is where the `f` comes from.

---

## Greeting

```python
# Ask the user for their first name and their last name.
# Print a greeting with their full name.
```

```
First name: Jane
Last name: Doe
Hello, Jane Doe!
```

---

## Greeting

```python
first = input("First name: ")
last = input("Last name: ")

greeting = f"Hello, {first} {last}!"
print(greeting)
```

---

## Concatenation

```python
name = "Jane"
greeting = "Hello, " + name

print(greeting) # Hello, Jane
print(name)     # Jane
```

`+` glues two strings together. This is called **concatenation**. The result is a new string, stored in `greeting`. `name` isn't modified.

---

## Building an Email Address

`jdoe@example.com` has three parts: the **local part** (`jdoe`), the **domain name** (`example`), and the **top-level domain** or TLD (`com`, `edu`, `org`, ...). `@` and `.` sit between them.

```python
# Ask the user for the three parts, then print the full address using +.
#
# Local part: jdoe
# Domain name: example
# Top-level domain: com
# jdoe@example.com
```

---

## Building an Email Address

```python
local_part = input("Local part: ")
domain = input("Domain name: ")
tld = input("Top-level domain: ")

email = local_part + domain + tld
print(email)
```

What's the bug? What is output?

---

## Building an Email Address

```python
local_part = input("Local part: ")
domain = input("Domain name: ")
tld = input("Top-level domain: ")

email = local_part + "@" + domain + "." + tld
print(email)
```

Without the `"@"` and `"."`, the output is `jdoeexamplecom`. `+` glues strings together exactly as they are; nothing goes between them unless you put it there.

---

## Building an Email Address (Continued)

```python
local_part = input("Local part: ")
domain = input("Domain name: ")
tld = input("Top-level domain: ")

email = local_part
email += "@"
email += domain
email += "."
email += tld
print(email)
```

We can also build a string piece by piece with `+=`.

---

## Building an Email Address (Continued x2)

```python
local_part = input("Local part: ")
domain = input("Domain name: ")
tld = input("Top-level domain: ")

email = f"{local_part}@{domain}.{tld}"
print(email)
```

And with an f-string.

---

## Building an Email Address (Side-by-Side Comparison)

<style scoped>
pre { font-size: 0.75em; }
</style>

<div class="cols">
<div>

```python
email = local_part + "@" + domain + "." + tld
print(email)
```

```python
email = f"{local_part}@{domain}.{tld}"
print(email)
```

</div>
<div>

```python
email = local_part
email += "@"
email += domain
email += "."
email += tld
print(email)
```

</div>
</div>

Which is the best? Which is the worst?

---

## Repetition with `*`

`*` glues a string to itself that many times:

```python
print("*" * 5)        # *****
print("ab" * 3)       # ababab
print("-" * 20)       # --------------------
```

---

## Triangle of Stars

<div class="cols">
<div>

```python
# Print a triangle of stars, 5 rows tall,
# but this time with ONE loop:
#
# *
# **
# ***
# ****
# *****
```

</div>
<div>

```python
for row in range(1, 6):
    for col in range(1, row + 1):
        print("*", end="")

    print()
```

</div>
</div>

---

## Triangle of Stars

```python
for row in range(1, 6):
    print("*" * row)
```

---

## Mixing Strings and Numbers

```python
age = 21
print("Age: " + age)
```

What is output?

---

## Strings and Numbers Do Not Mix

```python
age = 21
print("Age: " + age) # TypeError: can only concatenate str (not "int") to str
```

---

## Numbers to Strings

```python
age = 21
price = 3.5

print("Age: " + str(age))        # Age: 21
print("Price: " + str(price))    # Price: 3.5

print(f"Age: {age}")             # Age: 21
print(f"Price: {price}")         # Price: 3.5
```

`str` turns a number into a string so `+` can glue it on. An f-string does the same conversion for you inside the `{}`.

---

## Booleans to Strings

```python
age = 21
can_vote = age >= 18
is_senior = age >= 65

print("Can vote: " + str(can_vote))           # Can vote: True
print("Senior discount: " + str(is_senior))   # Senior discount: False

print(f"Can vote: {can_vote}")                # Can vote: True
print(f"Senior discount: {is_senior}")        # Senior discount: False
```

`str` works on booleans too, and `"Can vote: " + can_vote` without it is the same `TypeError` as with numbers. Anything can go inside an f-string's `{}`.

---

## Reminder: Why "String"?

Where does the term "string" come from?

---

## Reminder: Why "String"? (Answer)

Every letter (`'a'`, ...), number (`'0'`, ...), etc. is a **character**. String them together and you get words, sentences, paragraphs. That is how text data ended up being called a _string_.

---

## Every Character Has a Position

```
   "Hello, World!"

   H   e   l   l   o   ,       W   o   r   l   d   !
   0   1   2   3   4   5   6   7   8   9  10  11  12
```

Counting starts at 0.

---

## Zero-Indexing

```
   H   e   l   l   o
   0   1   2   3   4
```

The index is not "which character" but "how many steps from the start". The first character is 0 steps in, the second is 1 step in.

This is called **zero-indexing**. Almost every programming language does it (C, Java, JavaScript, ...), and you have already seen it: `range(5)` gives 0, 1, 2, 3, 4.

---

## Indexing in Python

```python
greeting = "Hello, World!"

print(greeting[0]) # H
print(greeting[4]) # o
print(greeting[7]) # W
```

```python
text[INDEX]    # the one character at position INDEX, counting from 0
```

The number in the square brackets is the **index**.

---

## Indexing

```python
greeting = "Hello, World!"

print(greeting[1])
print(greeting[4])
```

What is output?

---

## Indexing

```python
greeting = "Hello, World!"
#            1  4

print(greeting[1]) # e
print(greeting[4]) # o
```

---

## Initials

```python
# Ask the user for their first name and their last name. Print their initials.
```

```
First name: Jane
Last name: Doe
J.D.
```

---

## Initials

```python
first = input("First name: ")
last = input("Last name: ")

print(first[0] + "." + last[0] + ".") # Option 1: concatenation
print(f"{first[0]}.{last[0]}.")       # Option 2: f-string
```

---

## Problem: What Is The Output?

```python
greeting = "Hello"

print(greeting[4])
print(greeting[5])
```

---

## Solution: What Is The Output?

```python
greeting = "Hello"

print(greeting[4]) # o
print(greeting[5]) # IndexError: string index out of range
```

5 characters means indexes 0 through 4. There is nothing at `5` in the string, so we get an error and the program breaks.

---

## Finding a String's Length: `len`

```python
greeting = "Hello"

print(len(greeting)) # 5
```

`len` gives the number of characters in the input string.

---

## Problem: Print at Index 4 if In Bounds and Print at Index 5 if In Bounds

```python
greeting = "Hello"

print(greeting[4])
print(greeting[5])
```

---

## Solution: Print at Index 4 if In Bounds and Print at Index 5 if In Bounds

```python
greeting = "Hello"

if len(greeting) > 4:
    print(greeting[4])
if len(greeting) > 5:
    print(greeting[5])
```

---

## Last Character

```python
# Ask the user for some text. Print its last character.
```

```
Enter some text: Hello
o
```

Hint: Python is a zero-indexed language.

---

## Last Character

```python
text = input("Enter some text: ")

print(text[len(text) - 1])
```

- The last index is always `len(text) - 1`.
- What happens if the user just presses Enter?

---

## Last Character: Empty Input

```python
text = input("Enter some text: ")   # user just presses Enter: text is ""

print(text[len(text) - 1])          # IndexError: string index out of range
```

`input` gives back the empty string when the user types nothing. `len("")` is 0, so `len(text) - 1` is -1 and there is no character there.

---

## In-Class Activity

[https://bi3mer.github.io/autograder/cs230/w4i1.html](https://bi3mer.github.io/autograder/cs230/w4i1.html)

---

## What Is The Output?

```python
a = "Hello"
a[0] = "f"
print(a)
```

---

## Immutability

```python
a = "Hello"
a[0] = "f"    # TypeError: 'str' object does not support item assignment
print(a)
```

Strings are **immutable**: once a string exists, it never changes. You can read any character with an index, but you cannot swap one out.

---

## Immutability: `+=`

```python
a = "one"
a += "two"
print(a)
```

Is this valid or invalid?

---

## Immutability: `+=` (valid)

```python
a = "one"
a += "two"
print(a)
```

`a += "two"` did not change the string `"one"`. It built a new string, `"onetwo"`, and pointed `a` at it. Nothing points to `"one"` anymore, but it was never changed.

[Visualization](https://pythontutor.com/visualize.html#code=a%20%3D%20%22one%22%0Aa%20%2B%3D%20%22two%22%0Aprint%28a%29&curInstr=0&mode=display&origin=opt-frontend.js&py=311&heapPrimitives=nevernest)

---

## Reminder: Methods

```python
a = "one"

print(a.upper())        # ONE
print(a.capitalize())   # One
print(a)                # one
```

From week 1: a **method** is a function that belongs to an object, called with a `.` after it. `upper` and `capitalize` belong to strings. `print` and `len` belong to nothing, so they are plain functions.

Notice the last line. `a` is still `"one"`.

---

## Problem: Uppercase Everything

```python
# Ask the user for any text. Print it in all uppercase.
# Requirement: no method calls inside print.
#
# Enter some text: hello world
# HELLO WORLD
```

---

## Solution: Uppercase Everything (Continued)

```python
text = input("Enter some text: ")
text.upper()
print(text)
```

```
Enter some text: hello world
hello world
```

Why doesn't this work? Strings are immutable, so `upper` cannot change `text`. It makes a new string, and since there is no variable assigned to the output of `.upper()`, the output is thrown away.

---

## Solution: Uppercase Everything

```python
text = input("Enter some text: ")
text = text.upper()
print(text)
```

```
Enter some text: hello world
HELLO WORLD
```

---

## Problem: Is the Letter in the Word?

```python
word = "banana"
letter = "n"

# Print True if letter appears somewhere in word, False if it does not
```

---

## Solution: Is the Letter in the Word?

```python
word = "banana"
letter = "n"
found = False

for i in range(len(word)):
    if word[i] == letter:
        found = True

print(found)
```

Check every index, and remember if any of them matched. Can we improve this code?

---

## Solution: Is the Letter in the Word? (Improvement)

```python
word = "banana"
letter = "n"
found = False

for i in range(len(word)):
    if word[i] == letter:
        found = True
        break # stop the search if we find the character early

print(found)
```

---

## Problem: Is the Piece in the Word?

```python
word = "banana"
piece = "nan"

# Print True if piece appears somewhere in word, False if it does not
```

---

## Solution: Is the Piece in the Word?

```python
word = "banana"; piece = "nan"; found = False # bad but for space
for i in range(len(word) - len(piece) + 1):
    substring = ""
    for j in range(len(piece)):
        substring += word[i + j]

    if substring == piece:
        found = True
        break

print(found)
```

The inner loop glues `len(piece)` characters together starting at index `i`; the outer loop tries every starting index. Why does the outer `range` stop at `len(word) - len(piece) + 1`? [Visualization](https://pythontutor.com/visualize.html#code=word%20%3D%20%22banana%22%0Apiece%20%3D%20%22nan%22%0Afound%20%3D%20False%0A%0Afor%20i%20in%20range%28len%28word%29%20-%20len%28piece%29%20%2B%201%29%3A%0A%20%20%20%20substring%20%3D%20%22%22%0A%20%20%20%20for%20j%20in%20range%28len%28piece%29%29%3A%0A%20%20%20%20%20%20%20%20substring%20%2B%3D%20word%5Bi%20%2B%20j%5D%0A%0A%20%20%20%20if%20substring%20%3D%3D%20piece%3A%0A%20%20%20%20%20%20%20%20found%20%3D%20True%0A%20%20%20%20%20%20%20%20break%0A%0Aprint%28found%29&curInstr=0&mode=display&origin=opt-frontend.js&py=311)

---

## `in`

```python
word = "banana"

print("n" in word)   # True
print("z" in word)   # False
print("nan" in word) # True, any length works
```

`in` asks "does this appear somewhere in that?" and gives back a boolean. Much easier to use than our version.

---

## Input Validation, Revisited

```python
status = input("Employee (E), Member (M), or Other (O)? ").upper()
match_found = status == "E" or status == "M" or status == "O"
```

We can make this code more succinct with:

```python
match_found = status in "EMO"
```

But there is a bug in this code. Can you spot it?

---

## Input Validation, Revisited

```python
match_found = status in "EMO"
```

`in` checks for a piece, not a single character. `"EM"` is in `"EMO"`. So is `""`, which is what you get when the user just presses Enter.

```python
match_found = len(status) == 1 and status in "EMO"
```

---

## Count the Vowels

```python
# Ask the user for a word. Print how many vowels it has.
```

```
Enter a word: programming
Vowels: 3
```

---

## Count the Vowels

```python
word = input("Enter a word: ")
count = 0

for i in range(len(word)):
    ch = word[i]
    if ch == "a" or ch == "e" or ch == "i" or ch == "o" or ch == "u":
        count += 1

print(f"Vowels: {count}")
```

Can we make this more succinct with `in`?

---

## Count the Vowels with `in`

```python
word = input("Enter a word: ")
count = 0

for i in range(len(word)):
    if word[i] in "aeiou":
        count += 1

print(f"Vowels: {count}")
```

What would the output be if the user enters `PROGRAMMING`?

---

## Count the Vowels (Fixed)

```python
word = input("Enter a word: ").lower()
count = 0

for i in range(len(word)):
    if word[i] in "aeiou": # could also call .lower() here
        count += 1

print(f"Vowels: {count}")
```

`PROGRAMMING` gave 0 because `"A"` is not in `"aeiou"`. We could avoid `.lower` with `"aeiouAEIOU"`.

---

## Problem: Count the Non-Vowels

```python
# Ask the user for a word. Print how many characters are not a vowel.
# (Hint: you can use `not`)
```

```
Enter a word: programming
Not vowels: 8
```

---

## Solution: Count the Non-Vowels

```python
word = input("Enter a word: ").lower()
count = 0

for i in range(len(word)):
    if word[i] not in "aeiou":
        count += 1

print(f"Not vowels: {count}")
```

`not in` is the opposite of `in`. Spaces, digits, and punctuation are not vowels either, so `hello world` gives 8, not 7.

---

## Problem: Count the Letters

```python
# Ask the user for some text. Print how many letters it has.
```

```
Enter some text: hello world 42
Letters: 10
```

---

## Attempt: Count the Letters

```python
text = input("Enter some text: ").lower()
letters = 0

for i in range(len(text)):
    if text[i] in "abcdefghijklnopqrstuvwxyz":
        letters += 1

print(f"Letters: {letters}")
```

Why is this impractical?

---

## Why Is This Impractical?

All 26 letters have to be typed out with none missing, and if one is missing, Python isn't going to tell you. The string literal on the previous slide (`"abcdefghijklnopqrstuvwxyz"`) is missing one character: `'m'`. To prevent annoying bugs like this, we need to know what a character is underneath.

---

## Characters Are Numbers Underneath

Every character is actually a number, specifically characters are represented by **ASCII**<sup>1</sup> codes. We can access these numbers in Python with `ord` and we can turn a number into a character with `chr`.

```python
print(ord("a"))            # 97
print(ord("b"))            # 98
print(ord("z"))            # 122
print(ord("A"))            # 65

print(chr(66))             # B
print(chr(ord("a") + 1))   # b
```

<div class="footnote">1. ASCII stands for American Standard Code for Information Interchange.</div>

---

## ASCII

| Code            | Characters                    |
| --------------- | ----------------------------- |
| 48-57           | digits `0` to `9`             |
| 65-90           | uppercase letters `A` to `Z`  |
| 97-122          | lowercase letters `a` to `z`  |
| everything else | space, punctuation, `\n`, ... |

The letters sit in two unbroken blocks. `"m"` is a lowercase letter because `ord("m")` is between `ord("a")` and `ord("z")`. This is also why every uppercase letter comes before every lowercase letter: `ord("Z")` is 90 and `ord("a")` is 97.

---

## Solution: Count the Letters

```python
text = input("Enter some text: ")
letters = 0

for i in range(len(text)):
    code = ord(text[i])
    if ord("a") <= code <= ord("z") or ord("A") <= code <= ord("Z"):
        letters += 1

print(f"Letters: {letters}")
```

Now we don't have to type out every character, and we get to drop the `.lower()` method call. There is also a better way to do this in Python...

---

## `isalpha`

"Is this a letter?" comes up so often that strings have a method for it:

```python
print("m".isalpha())     # True
print("M".isalpha())     # True
print("4".isalpha())     # False
print(" ".isalpha())     # False
print("abc".isalpha())   # True    every character is a letter
print("ab1".isalpha())   # False   the 1 is not
```

It gives back a boolean, so it goes straight into an `if`.

---

## Problem: Count the Letters (with `isalpha`)

```python
text = input("Enter some text: ")
letters = 0

for i in range(len(text)):
    code = ord(text[i])
    if ord("a") <= code <= ord("z") or ord("A") <= code <= ord("Z"):
        letters += 1

print(f"Letters: {letters}")
```

How can we update our code to use `isalpha`?

---

## Solution: Count the Letters (with `isalpha`)

```python
text = input("Enter some text: ")
letters = 0

for i in range(len(text)):
    if text[i].isalpha():
        letters += 1

print(f"Letters: {letters}")
```

`isalpha` replaces both range checks. It also handles letters from other alphabets: `"é".isalpha()` is `True`, but `ord("é")` is 233, outside both blocks.

---

## Other Methods: `isdigit` and `isalnum`

| Method        | `True` when...                         | Example              |
| ------------- | -------------------------------------- | -------------------- |
| `s.isalpha()` | every character is a letter            | `"abc".isalpha()`    |
| `s.isdigit()` | every character is a digit, `0` to `9` | `"123".isdigit()`    |
| `s.isalnum()` | every character is a letter or a digit | `"abc123".isalnum()` |

---

## Problem: Enter a Non-Negative Integer

```python
# Keep asking until the user enters a non-negative integer (0, 1, 2, ...)
# and then print out the number
```

```
Enter a non-negative integer: abc
Enter a non-negative integer: -5
Enter a non-negative integer: 3.5
Enter a non-negative integer: 12
12
```

---

## Solution: Enter a Non-Negative Integer

```python
number = -1
while number == -1:
    user_input = input("Enter a non-negative integer: ")
    if user_input.isdigit():
        number = int(user_input)

print(number)
```

`isdigit` rejects `abc`, `-5`, and `3.5`, so `int` is only called on text it can handle. `-1` works as the "nothing yet" value because `isdigit` can never let a negative through.

---

## Slicing

```python
greeting = "Hello, World!"

print(greeting[0:5])    # Hello
print(greeting[7:12])   # World
```

```python
text[START:END]    # the characters from START up to, but not including, END
```

Like `range`, the end is exclusive. `greeting[0:5]` is indexes 0, 1, 2, 3, 4.

---

## Slicing

```
   H   e   l   l   o   ,       W   o   r   l   d   !
   0   1   2   3   4   5   6   7   8   9  10  11  12
```

```python
print(greeting[7:12])
print(greeting[5:7])
print(greeting[0:13])
print(greeting[3:3])
```

What is output?

---

## Slicing

```
   H   e   l   l   o   ,       W   o   r   l   d   !
   0   1   2   3   4   5   6   7   8   9  10  11  12
```

```python
print(greeting[7:12])   # World
print(greeting[5:7])    # ", "   a comma and a space
print(greeting[0:13])   # Hello, World!
print(greeting[3:3])    # ""     empty, nothing between 3 and 3 (exclusive)
```

---

## Slicing Shortcuts

```python
greeting = "Hello, World!"

print(greeting[:5])      # Hello           start defaults to 0
print(greeting[7:])      # World!          end defaults to len(greeting)
print(greeting[:])       # Hello, World!
print(greeting[7:100])   # World!          too big an end is fine, no error
```

- Leave out the start to mean "from the beginning".
- Leave out the end to mean "to the end".

---

## Problem: Last Two, First Two

```python
# Ask the user for some text. Print its last two characters
# followed by its first two characters.
#
# Enter some text: hello
# lohe
```

---

## Solution: Last Two, First Two

```python
text = input("Enter some text: ")

last_two = text[len(text) - 2:]
first_two = text[:2]

print(last_two + first_two)
```

---

## Problem: Enter a Valid Integer

```python
number = -1
while number == -1:
    user_input = input("Enter a non-negative integer: ")
    if user_input.isdigit():
        number = int(user_input)

print(number)
```

Update this to handle any integer.

---

## Solution: Enter a Valid Integer

```python
valid = False
while not valid:
    user_input = input("Enter an integer: ")
    digits = user_input

    if len(user_input) > 0 and user_input[0] == "-":
        digits = user_input[1:]

    if digits.isdigit():
        valid = True
        number = int(user_input)

print(number)
```

`isdigit` cannot handle a minus sign, but `int` can: `int("-1123")` is `-1123`. So we slice off `-` for the `isdigit` check.

---

## In-Class Activity: Where Does the Sub-String Start?

[https://bi3mer.github.io/autograder/cs230/w4i2.html](https://bi3mer.github.io/autograder/cs230/w4i2.html)

---

## `find`

```python
greeting = "Hello, World!"

print(greeting.find("o"))       # 4    the first one
print(greeting.find("World"))   # 7    works on pieces too
print(greeting.find("z"))       # -1   not found, the same -1 we picked
```

The in-class activity is a rudimentary version of `find`. It gives back an index that is the start of the substring, if it finds one. Else, it returns `-1`.

---

## First and Last Name

```python
# Ask the user for their full name, like "Jane Doe".
# Print the first name and the last name on separate lines.
```

```
Enter your full name: Jane Doe
First: Jane
Last: Doe
```

Hint: where is the space?

---

## First and Last Name

```python
full_name = input("Enter your full name: ")
space = full_name.find(" ")

first = full_name[:space]
last = full_name[space + 1:]

print(f"First: {first}")
print(f"Last: {last}")
```

Why `space + 1`? What happens with `Jane Marie Doe`?

---

## `split`

```python
full_name = "Jane Doe"
parts = full_name.split(" ")

print(parts[0])   # Jane
print(parts[1])   # Doe
```

`split` cuts the string at every space and gives back the pieces. Indexing works on the pieces the same way it works on characters.

---

## What Does `split` Give Back?

```python
parts = "Jane Doe".split(" ")

print(parts)        # ['Jane', 'Doe']
print(len(parts))   # 2
```

It is not a string. It is a new kind of value that holds several strings, one per piece. This is a List in Python. We aren't going to cover it for a few weeks, though. For now, all we need to know is that we can utilize indexing and `len`.

---

## Problem: Split a Date

```python
# Ask the user for a date like 2026-09-18.
# Print the day, month, and year on separate lines.
```

```
Enter a date (YYYY-MM-DD): 2026-09-18
Day: 18
Month: 09
Year: 2026
```

---

## Solution: Split a Date

```python
date = input("Enter a date (YYYY-MM-DD): ")
parts = date.split("-")

print(f"Day: {parts[2]}")
print(f"Month: {parts[1]}")
print(f"Year: {parts[0]}")
```

`split` cuts on any string you give it, not just a space. The pieces are still strings: `parts[1]` is `"09"`, so any math on them needs `int` first. Data files are full of lines like `Jane,Doe,42`, and `split(",")` is how you take them apart.

---

## More Methods

None of these change the original. Each gives back something new.

| Method                | Example                     | Result    |
| --------------------- | --------------------------- | --------- |
| `upper()` / `lower()` | `"Hi".lower()`              | `"hi"`    |
| `strip()`             | `"  hi  ".strip()`          | `"hi"`    |
| `replace(old, new)`   | `"a-b-c".replace("-", " ")` | `"a b c"` |
| `count(piece)`        | `"banana".count("a")`       | `3`       |
| `find(piece)`         | `"banana".find("n")`        | `2`       |
| `startswith(piece)`   | `"hello".startswith("he")`  | `True`    |
| `split(piece)`        | `"a,b".split(",")`          | pieces    |

---

## `join`

```python
parts = "2026-09-18".split("-")   # ['2026', '09', '18']

print("/".join(parts))    # 2026/09/18
print(" ".join(parts))    # 2026 09 18
print("".join(parts))     # 20260918
```

`join` is the reverse of `split`: it glues the pieces back into one string. The string in front of the dot is the glue that goes between each pair of pieces, so `"".join` glues them with nothing.

---

## Problem: Clean Up Spacing

```python
# Ask the user for a sentence. Print it with exactly one space
# between words, no matter how many spaces the user typed.
```

```
Enter a sentence:   the   quick  brown fox
the quick brown fox
```

Hint: `split()` with nothing inside cuts on any run of whitespace and drops the extras.

---

## Solution: Clean Up Spacing

```python
sentence = input("Enter a sentence: ")
words = sentence.split()

print(" ".join(words))
```

`split(" ")` would give an empty piece for every extra space; `split()` gives only the words. Then `" ".join` puts exactly one space back between them. Why would `replace("  ", " ")` not be enough?

---

## Summary

- A **string literal** is text spelled out in the code, between quotes; `f"..."` is a formatted string literal
- `+` joins strings, `*` repeats them, and `str` converts a number so it can be joined
- Every character has an **index**, starting at 0; the last one is `len(text) - 1`, and `for i in range(len(text))` visits every one
- `text[i]` reads one character; `text[start:end]` reads a piece, and `end` is left out just like `range`
- `in` checks whether a piece appears, `find` says where, `split` cuts the string into pieces you can index, and `join` glues them back
- Strings are **immutable**: methods like `upper` give back a new string, so keep it with `name = name.upper()`

---

## Next Up: Functions

```python
def hello_world():
    return "Hello, World!"

print(hello_world())
```

```
Hello, World!
```

[Functions](07-functions.html)
