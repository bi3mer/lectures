---
marp: true
theme: lecture
paginate: true
---

# Functions

Colan Biemer

---

## Required Reading

Read **Chapter 5: Defining Functions** of the textbook.

The syllabus, in the Course Info Module, has details of the textbook and how you may acquire it.

---

## Quiz

- The quiz is next week. It'll be online and you'll be using a lockdown browser. Make sure to have it installed before class. I will not be giving extra time for not having it installed. You can find [instructions online](https://bentley.service-now.com/bsc?id=kb_article_view&sysparm_article=KB0011417).
- The quiz will have multiple choice, short answer, and coding questions.
- This lecture on functions will also serve as a review for the quiz. (Note: defining functions will not be on the quiz.)
- If you have accommodations, please email me.

---

## Assignments this Week

- Two In-Class Activities (Due: October 4th)
- Assignment 2 (Due: October 4th)
- One Anonymous Survey (Due: October 11th)
- One Participation Assignment on Functions (Due: October 11th)

---

## We've Been Using Functions Since Week 1

| Week | Functions                                                      |
| ---- | -------------------------------------------------------------- |
| 1    | `print`, `input`, `int`, `float`, `abs`, `min`, `max`, `round` |
| 3    | `range`                                                        |
| 4    | `len`, `str`, `ord`, `chr`                                     |

Each one takes input inside its parentheses, processes it, and produces output. That is the IPO model from the first class, packed behind a single name. Today, we learn how to write our own.

---

## Method vs Function

```python
name = "ada"

print(len(name))      # 3    function
print(name.upper())   # ADA  method
```

With a `.` before the name, it is a **method**. Without the `.`, it is a **function**.

---

## Defining a Function

```python
def [NAME]():
    # the body: runs every time the function is called
    #
    # Notice the colon (:) and that everything is indented,
    # just like if, while, and for

# program continues as normal
```

`def` is short for **define**.

---

## Anatomy of a Function

```python
def say_hello():          # signature
    print("Hello!")       # body
    print("Goodbye!")     # body

say_hello()               # call
```

- The **signature** is the first line: `def`, the name, parentheses, and a colon.
- The **body** is every indented line under the signature.
- A **call** is the name followed by parentheses. It runs the body.

---

## Problem: What Is the Output?

```python
def say_hello():
    print("Hello!")

print("Start")
```

---

## Solution: What Is the Output?

```python
def say_hello():
    print("Hello!")

print("Start")  # Start
```

`say_hello` is defined, but it is never called. So, only `Start` will be output to the console.

---

## Problem: What Is the Output? (x2)

```python
def say_hello():
    print("Hello!")

print("Start")
say_hello()
say_hello()
print("End")
```

---

## Solution: What Is the Output? (x2)

```python
def say_hello():
    print("Hello!")

print("Start")  # Start
say_hello()     # Hello!
say_hello()     # Hello!
print("End")    # End
```

A call jumps into the body, runs it top to bottom, then jumps back to the line after the call. [Visualization](https://pythontutor.com/visualize.html#code=def%20say_hello%28%29%3A%0A%20%20%20%20print%28%22Hello%21%22%29%0A%0Aprint%28%22Start%22%29%0Asay_hello%28%29%0Asay_hello%28%29%0Aprint%28%22End%22%29&curInstr=0&mode=display&origin=opt-frontend.js&py=311)

---

## Indentation Errors

```python
def say_hello():
print("Hello!")
```

```
IndentationError: expected an indented block after function definition on line 1
```

Every function needs a body, and the body must be indented. This is similar to `if`, `for`, and `while`.

---

## What Is the Output?

```python
say_hello()

def say_hello():
    print("Hello!")
```

---

## Define Before You Call

```python
say_hello()       # NameError: name 'say_hello' is not defined

def say_hello():
    print("Hello!")
```

Python runs the file top to bottom. The `def` line is what creates `say_hello`, so a call above it finds nothing with that name.

---

## New Keyword: `return`

```python
def [NAME]():
    # body
    return [VALUE]   # hands VALUE back to wherever the function was called
```

---

## Hello World with Return

```python
def hello_world():
    return "Hello, World!"

message = hello_world()
print(message)                  # Hello, World!
print(hello_world().upper())    # HELLO, WORLD!
```

The call `hello_world()` is replaced by the value it returns, the same way `len("Hello")` is replaced by `5`. Store it, print it, or call a method on it.

---

## Problem: What Is the Output?

```python
def print_greeting():
    print("Hello, World!")

result = print_greeting()
print(result)
```

---

## Solution: What Is the Output?

```python
def print_greeting():
    print("Hello, World!")

result = print_greeting()   # Hello, World!
print(result)               # None
```

A function without `return` still gives back a value: **`None`**.

---

## What Is `None`?

```python
nothing = None
print(nothing)         # None
print(type(nothing))   # <class 'NoneType'>
```

`None` is a value, like `42` or `"hello"`, and its type is `NoneType`. It means: "there is no value here".

---

## Problem: What Is the Output?

```python
def get_greeting():
    print("Hello, World!")

message = get_greeting()
print(message.upper())
```

---

## Solution: What Is the Output?

```python
def get_greeting():
    print("Hello, World!")

message = get_greeting()   # Hello, World!
print(message.upper())     # AttributeError
```

```
AttributeError: 'NoneType' object has no attribute 'upper'
```

---

## Problem: What Is the Output?

```python
def function_name():
    print("1")
    return "2"
    print("3")

print(function_name())
```

- Will "1" print?
- Will "2" print?
- Will "3" print?

---

## Solution: What Is the Output?

```python
def function_name():
    print("1")
    return "2"  # function stops running and returns "2"
    print("3")

print(function_name())
```

- Will "1" print? Yes.
- Will "2" print? Yes. The call is replaced by `"2"`, and the outer `print` shows it.
- Will "3" print? No. Like `break` in a loop, nothing after `return` runs.

---

## Problem: Print the Sum

Write a function `print_sum` that prints the sum of 1 through 10. Then call it.

```
Sum: 55
```

---

## Solution: Print the Sum

```python
def print_sum():
    total = 0
    for i in range(1, 11):
        total += i

    print(f"Sum: {total}")

print_sum()
```

The body can hold anything we have learned: variables, loops, and `if`s. Count the indentation: the loop's body sits inside the function's body, so it is two levels deep.

---

## What Is the Output?

```python
def print_sum():
    total = 0
    for i in range(1, 11):
        total += i

    print(f"Sum: {total}")

print_sum()
print(total)
```

---

## Local Variables

```python
def print_sum():
    total = 0
    for i in range(1, 11):
        total += i

    print(f"Sum: {total}")

print_sum()     # Sum: 55
print(total)    # NameError: name 'total' is not defined
```

`total` is a **local variable**: the function creates it, and it disappears when the function ends. Code outside the function cannot see it.

---

## Printing Versus Returning the Sum

<div class="cols">
<div>

```python
def print_sum():
    total = 0
    for i in range(1, 11):
        total += i

    print(f"Sum: {total}")

print_sum()
```

</div>
<div>

```python
def get_sum():
    total = 0
    for i in range(1, 11):
        total += i

    return total

print(f"Sum: {get_sum()}")
```

</div>
</div>

Both print `Sum: 55`. Which is more useful? Why?

---

## In-Class Activity 1: Yes or No Function

[https://bi3mer.github.io/autograder/cs230/w5i1.html](https://bi3mer.github.io/autograder/cs230/w5i1.html)

---

## Problem: The Sum of 1 Through 20? 100?

```python
def print_sum():
    total = 0
    for i in range(1, 11):
        total += i

    print(f"Sum: {total}")
```

How would we print the sum of 1 through 20? 1 through 100?

---

## Copy and Paste?

```python
def print_sum_10():
    total = 0
    for i in range(1, 11):
        total += i
    print(f"Sum: {total}")

def print_sum_20():
    total = 0
    for i in range(1, 21):
        total += i
    print(f"Sum: {total}")

def print_sum_100():
    ...
```

Three copies that differ by one number. This is the "1 to 6" problem from week 3 all over again: it would be nice to do this with less code...

---

## Parameters

```python
def [NAME]([PARAMETER 1], [PARAMETER 2], ...):
    # each PARAMETER is a variable that starts with the value
    # placed in the parentheses when the function is called
```

---

## The Sum of 1 Through `n`

```python
def print_sum(n):
    total = 0
    for i in range(1, n + 1):
        total += i

    print(f"Sum: {total}")

print_sum(10)    # Sum: 55
print_sum(20)    # Sum: 210
print_sum(100)   # Sum: 5050
```

[Visualization](https://pythontutor.com/visualize.html#code=def%20print_sum%28n%29%3A%0A%20%20%20%20total%20%3D%200%0A%20%20%20%20for%20i%20in%20range%281%2C%20n%20%2B%201%29%3A%0A%20%20%20%20%20%20%20%20total%20%2B%3D%20i%0A%0A%20%20%20%20print%28f%22Sum%3A%20%7Btotal%7D%22%29%0A%0Aprint_sum%2810%29%20%20%20%20%23%20Sum%3A%2055%0Aprint_sum%2820%29%20%20%20%20%23%20Sum%3A%20210%0Aprint_sum%28100%29%20%20%20%23%20Sum%3A%205050&curInstr=0&mode=display&origin=opt-frontend.js&py=311)

---

## Problem: Sum a Range

Write a function `print_range_sum` that takes two required parameters: a start and an end. Print the sum of every number from the start to the end, including both.

```
Sum of 1 to 10: 55
Sum of 5 to 7: 18
```

---

## Solution: Sum a Range

```python
def print_range_sum(start, end):
    total = 0
    for i in range(start, end + 1):
        total += i

    print(f"Sum of {start} to {end}: {total}")

print_range_sum(1, 10)   # Sum of 1 to 10: 55
print_range_sum(5, 7)    # Sum of 5 to 7: 18
```

---

## Problem: What Is the Output?

```python
def print_range_sum(start, end):
    total = 0
    for i in range(start, end + 1):
        total += i

    print(f"Sum of {start} to {end}: {total}")

print_range_sum(10, 1)
```

---

## Solution: What Is the Output?

```python
def print_range_sum(start, end):
    total = 0
    for i in range(start, end + 1):
        total += i

    print(f"Sum of {start} to {end}: {total}")

print_range_sum(10, 1)   # Sum of 10 to 1: 0
```

We have no way, right now, of passing `-1` for the step in `range`.

---

## Optional Parameters

```python
def [NAME]([REQUIRED], [OPTIONAL]=[DEFAULT]):
    # REQUIRED must be given in every call
    #
    # OPTIONAL can be left out of a call, and then it is set to DEFAULT
```

---

## Problem: Triangle of Stars, Revisited

```python
def print_triangle(height, symbol="*"):
    for row in range(1, height + 1):
        print(symbol * row)

print_triangle(3)
print_triangle(3, "#")
print_triangle(3, symbol="@")
```

What is output?

---

## Solution: Triangle of Stars, Revisited

<div class="cols">
<div>

```python
def print_triangle(height, symbol="*"):
    for row in range(1, height + 1):
        print(symbol * row)

print_triangle(3)
print_triangle(3, "#")
print_triangle(3, symbol="@")
```

</div>
<div>

```
*
**
***
#
##
###
@
@@
@@@
```

</div>
</div>

`height` is a **required parameter** and `symbol` is an **optional parameter**. The last call names the parameter, just like `end=""` in `print`. This is the one-loop triangle from week 4, now with any height and any symbol.

---

## What Is the Output?

```python
def print_triangle(symbol="*", height):
    for row in range(1, height + 1):
        print(symbol * row)

print_triangle(3)
```

---

## Required Parameters Come First

```python
def print_triangle(symbol="*", height):
    for row in range(1, height + 1):
        print(symbol * row)

print_triangle(3)
```

```
SyntaxError: parameter without a default follows parameter with a default
```

Required parameters must come before optional parameters.

---

## Problem: Fix `print_range_sum`

```python
def print_range_sum(start, end):
    total = 0
    for i in range(start, end + 1):
        total += i

    print(f"Sum of {start} to {end}: {total}")

print_range_sum(10, 1)
```

How can we update this code to support stepping by any amount?

---

## Solution: Fix `print_range_sum`

<style scoped>
pre { font-size: 0.75em; }
</style>

```python
def print_range_sum(start, end, step=1):
    total = 0
    for i in range(start, stop, step):
        total += i

    print(f"Sum of {start} to {end}: {total}")

print_range_sum(1, 10)
print_range_sum(10, 1, step=-1)
print_range_sum(10, 1, -1)
```

---

## Terminology: Argument Versus Parameter

- **Parameters** are the names in a function's signature: `def hello(greeting)` has the parameter `greeting`.
- **Arguments** are the values in a call: `hello("What is up?")` passes the argument `"What is up?"`.

---

## Problem: What Is the Output?

```python
def double(n):
    n = n * 2
    return n

n = 5
result = double(n)
print(n, result)
```

---

## Solution: What Is The Output?

```python
def double(n):
    n = n * 2
    return n

n = 5
result = double(n)
print(n, result)    # 5 10
```

The parameter `n` is a local variable that starts with the argument's value. Changing it inside `double` does not touch the `n` outside. [Visualization](https://pythontutor.com/visualize.html#code=def%20double%28n%29%3A%0A%20%20%20%20n%20%3D%20n%20%2A%202%0A%20%20%20%20return%20n%0A%0An%20%3D%205%0Aresult%20%3D%20double%28n%29%0Aprint%28n%2C%20result%29&curInstr=0&mode=display&origin=opt-frontend.js&py=311)

---

## Problem: What is the Output?

```python
def countdown(n):
    print(n)
    if n > 0:
        countdown(n - 1)

countdown(3)
```

---

## Solution What is the Output?

```python
def countdown(n):
    print(n)
    if n > 0:
        countdown(n - 1)

countdown(3)
```

```
3
2
1
```

A function that calls itself is **recursive**. Each call prints one number and hands the rest to `countdown(n - 1)`. The `if` stops at `0`. Without it, `countdown` keeps calling itself until Python gives up with a `RecursionError`. [Visualization](https://pythontutor.com/visualize.html#code=def%20countdown%28n%29%3A%0A%20%20%20%20print%28n%29%0A%20%20%20%20if%20n%20%3E%200%3A%0A%20%20%20%20%20%20%20%20countdown%28n%20-%201%29%0A%0Acountdown%283%29&curInstr=0&mode=display&origin=opt-frontend.js&py=311)

---

## Review

From here on, every problem is new. The quiz will not ask you to define functions, but every solution here will use one.

---

## Problem: Split the Bill

Write a function `split_bill` that takes two required parameters: the total of the bill and the number of people. Add an optional parameter for the tip, which defaults to 20% (`0.20`). Return what each person pays: the total plus the tip, split evenly. Then use it on a total and a number of people from the user.

```
Total: 60
People: 3
Each person pays $24.00
```

---

## Solution: Split the Bill

```python
def split_bill(total, people, tip=0.20):
    with_tip = total * (1 + tip)
    return with_tip / people

total = float(input("Total: "))
people = int(input("People: "))
share = split_bill(total, people)
print(f"Each person pays ${share:.2f}")
```

The `:.2f` rounds what is printed to cents, but `share` itself keeps every digit.

---

## Problem: What Is the Output?

```python
print(split_bill(60, 0))
```

---

## Solution: What Is the Output?

```python
print(split_bill(60, 0))   # ZeroDivisionError: division by zero
```

Zero people at the table crash our program. Hold that thought; we will come back to it at the end.

---

## Problem: How to Handle Divide by Zero?

```python
def split_bill(total, people, tip=0.20):
    with_tip = total * (1 + tip)
    return with_tip / people

total = float(input("Total: "))
people = int(input("People: "))
share = split_bill(total, people)
print(f"Each person pays ${share:.2f}")
```

How can we update `split_bill` to handle this without crashing?

---

## Problem: How to Handle Divide by Zero?

```python
def split_bill(total, people, tip=0.20):
    if people <= 0:
        print(f"Error: {people} is invalid input.")
        return None

    with_tip = total * (1 + tip)
    return with_tip / people

total = float(input("Total: "))
people = int(input("People: "))
share = split_bill(total, people)

if share != None:
    print(f"Each person pays ${share:.2f}")
```

Note: we could add further error checking for `total` and `tip`.

---

## Problem: Valid Username

Sign-up forms reject bad usernames before saving them. Write a function `is_valid_username` that takes a username as a required parameter. Return `True` if it follows all three rules and `False` otherwise:

- It is at least 3 characters long.
- It has only letters and digits.
- It does not start with a digit.

```python
print(is_valid_username("coffee42"))   # True
print(is_valid_username("ab"))         # False
print(is_valid_username("9lives"))     # False
print(is_valid_username("cool_cat"))   # False
```

---

## Solution: Valid Username

```python
def is_valid_username(name):
    if len(name) < 3:
        return False

    if not name.isalnum():
        return False

    if name[0].isdigit():
        return False

    return True
```

Each rule gets its own check. The length check comes first, so `name[0]` never runs on an empty string. Can this be one line?

---

## Solution: Valid Username (One Line)

```python
def is_valid_username(name):
    return len(name) >= 3 and name.isalnum() and not name[0].isdigit()
```

The condition is already `True` or `False`, so return it directly. Each check flips from "reject if" to "accept if": `len(name) < 3` becomes `len(name) >= 3`, and `name[0].isdigit()` becomes `not name[0].isdigit()`. `and` stops at the first `False`, so `name[0]` is still safe.

---

## Problem: Coffee Prices

Write a function `coffee_price` that takes a size as a required parameter and uses `match` to return the price in dollars. A small costs 2, a medium costs 3, and a large costs 4. Accept the full word or its first letter, such as `"small"` or `"s"`.

```python
print(coffee_price("small"))   # 2
print(coffee_price("m"))       # 3
print(coffee_price("large"))   # 4
```

---

## Solution: Coffee Prices

<div class="cols">
<div>

```python
def coffee_price(size):
    match size:
        case "small" | "s":
            return 2
        case "medium" | "m":
            return 3
        case "large" | "l":
            return 4
```

</div>
<div>

```python
def coffee_price(size):
    if size == "small" or size == "s":
        return 2
    elif size == "medium" or size == "m":
        return 3
    elif size == "large" or size == "l":
        return 4
```

</div>
</div>

---

## Problem: What Is the Output?

```python
print(coffee_price("Small"))
```

---

## Solution: What Is the Output?

```python
print(coffee_price("Small"))   # None
```

Comparing strings is case-sensitive, so no `case` matches `"Small"`. The function, `coffee_price`, reaches the end and defaults to returning `None`. How can we make strings like `"Small"`, `"sMaLl"`, etc. valid arguments?

---

## Solution: Fix `coffee_price`

<div class="cols">
<div>

```python
def coffee_price(size):
    match size.lower():
        case "small" | "s":
            return 2
        case "medium" | "m":
            return 3
        case "large" | "l":
            return 4
```

</div>
<div>

```python
def coffee_price(size):
    size = size.lower()
    if size == "small" or size == "s":
        return 2
    elif size == "medium" or size == "m":
        return 3
    elif size == "large" or size == "l":
        return 4
```

</div>
</div>

```python
print(coffee_price("Small"))   # 2
print(coffee_price("LARGE"))   # 4
```

Listing every spelling, like `"Small" | "SMALL"`, would never end. `size.lower()` turns capitals into lowercase before any comparison, so each check needs only the lowercase spelling.

---

## Problem: Password Strength

Write a function `password_strength` that takes a string as a required parameter and returns `"weak"`, `"medium"`, or `"strong"`. A password shorter than 8 characters is weak. Otherwise, a password made of only letters or only digits is medium. Every other password is strong.

```python
print(password_strength("cat"))          # weak
print(password_strength("sunshine"))     # medium
print(password_strength("12345678"))     # medium
print(password_strength("sunshine42"))   # strong
```

---

## Solution: Password Strength

```python
def password_strength(password):
    if len(password) < 8:
        return "weak"
    elif password.isalpha() or password.isdigit():
        return "medium"
    else:
        return "strong"
```

---

## Problem: Longest Streak

Habit apps show your longest streak of days. Write a function `longest_streak` that takes a string of days as a required parameter, where `"Y"` means the habit was done and `"N"` means it was not. Return the longest run of `"Y"`s in a row.

```python
print(longest_streak("YYNYYYN"))   # 3
print(longest_streak("NNN"))       # 0
```

---

## Solution: Longest Streak

```python
def longest_streak(days):
    best = 0
    current = 0
    for i in range(len(days)):
        if days[i] == "Y":
            current += 1
            best = max(best, current)
        else:
            current = 0

    return best
```

`current` counts the run in progress and resets to 0 on an `"N"`. `best` remembers the longest run so far, and `max` keeps whichever is bigger.

TODO: `.split()` solution

---

## Problem: Longest Run of Any Character

Now track any character, not only `"Y"`. Write a function `longest_run` that takes text as a required parameter. Return the length of the longest run of the same character in a row.

```python
print(longest_run("aabbbc"))    # 3
print(longest_run("YYNYYYN"))   # 3
print(longest_run("abc"))       # 1
print(longest_run(""))          # 0
```

---

## Solution: Longest Run of Any Character

```python
def longest_run(text):
    best = 0
    current = 0
    current_char = ""
    for i in range(len(text)):
        if text[i] == current_char:
            current += 1
        else:
            current_char = text[i]
            current = 1

        best = max(best, current)

    return best
```

The only difference is that we have to track `current_char` now.

---

## In-Class Activity 2: Palindrome

[https://bi3mer.github.io/autograder/cs230/w5i2.html](https://bi3mer.github.io/autograder/cs230/w5i2.html)

---

## Problem: Matched Parentheses

Calculators and code editors warn you when parentheses do not match. Write a function `parentheses_match` that takes text as a required parameter. Return `True` if every `(` is closed by a later `)` and every `)` closes an earlier `(`, and `False` otherwise.

```python
print(parentheses_match("(1 + 2) * 3"))   # True
print(parentheses_match("((1 + 2)"))      # False
print(parentheses_match("(1 + 2))"))      # False
```

---

## Attempt: Matched Parentheses

```python
def parentheses_match(text):
    return text.count("(") == text.count(")")

print(parentheses_match("(1 + 2) * 3"))   # True
print(parentheses_match("((1 + 2)"))      # False
print(parentheses_match("(1 + 2))"))      # False
```

It gets every example right. Why is this wrong?

---

## Why Is This Wrong?

```python
print(parentheses_match(")1 + 2("))   # True
```

There is one `(` and one `)`, so the counts match, but the `)` comes before any `(` it could close. Counting ignores order. How can we handle this?

---

## Solution: Matched Parentheses

```python
def parentheses_match(text):
    depth = 0
    for i in range(len(text)):
        if text[i] == "(":
            depth += 1
        elif text[i] == ")":
            depth -= 1
            if depth < 0:
                return False

    return depth == 0

print(parentheses_match(")1 + 2("))   # False
```

`depth` counts how many `(` are still open. A `)` with nothing open drops `depth` below 0, so the function returns `False` right away. At the end, every `(` must be closed, so `depth` has to be 0.

---

## Problem: Mask the Digits

Support chats hide numbers, like order and account numbers, before saving a transcript. Write a function `mask_digits` that takes text as a required parameter and returns a new string where every digit is replaced. Add an optional parameter, `mask`, for the replacement, which defaults to `"#"`.

```python
print(mask_digits("Order 4521 ships May 3"))   # Order #### ships May #
print(mask_digits("PIN: 1234", "*"))           # PIN: ****
print(mask_digits("no digits here"))           # no digits here
```

---

## Solution: Mask the Digits

```python
def mask_digits(text, mask="#"):
    masked = ""
    for i in range(len(text)):
        if text[i].isdigit():
            masked += mask
        else:
            masked += text[i]

    return masked
```

Strings cannot change, so the function builds a new one, one character at a time. Digits become `mask`, and everything else is copied over.

---

## Problem: Find the First Special Character

Write a function `first_special_index` that takes a string as a required parameter. Return the index of the first character that is not a letter or a digit (not alphanumeric), or `-1` if every character is.

```python
print(first_special_index("cool_cat"))   # 4
print(first_special_index("Hi!"))        # 2
print(first_special_index("abc123"))     # -1
```

---

## Solution: Find the First Special Character

```python
def first_special_index(text):
    for i in range(len(text)):
        if not text[i].isalnum():
            return i

    return -1
```

`return i` ends the loop at the first special character, so there is no flag variable and no `break`. If the loop finishes without finding one, the function reaches `return -1`.

---

## Problem: Count Letters and Digits

Password strength meters show how many letters and how many digits you have typed. Write a function `count_kinds` that takes text as a required parameter and counts both. For `"Summer2026!"`, that is 6 letters and 4 digits.

How can one function give back two counts?

---

## Return Two Values

```python
def count_kinds(text):
    letters = 0
    digits = 0

    for i in range(len(text)):
        if text[i].isalpha():
            letters += 1
        elif text[i].isdigit():
            digits += 1

    return letters, digits
```

Put both values after `return`, separated by a comma.

---

## What Did We Get Back?

```python
result = count_kinds("Summer2026!")

print(result)        # (6, 4)
print(result[0])     # 6
print(result[1])     # 4
print(len(result))   # 2
```

`return a, b` gives back one value that holds two: a **tuple**. Like the pieces from `split`, you can index a tuple and take its `len`. We will see more of tuples later.

---

## Unpacking

```python
letters, digits = count_kinds("Summer2026!")
print(letters)   # 6
print(digits)    # 4
```

Put one variable per piece on the left of the `=`, and Python fills them in order. This is called **unpacking**.

---

## Summary

<style scoped>
ul { font-size: 0.85em; }
</style>

- The **signature** (`def NAME(PARAMETERS):`) names the function; the indented **body** runs only when the function is called
- `return` hands a value back to the call and ends the function; a function without one gives back `None`
- Variables made inside a function are **local**: they disappear when the function ends
- **Parameters** are the names in the signature; **arguments** are the values in a call, matched by position or by name
- A parameter with a default (`symbol="*"`) is **optional** and goes after the **required** ones
- A **guard** is a `return` at the top that turns away bad input; a **sentinel** like `-1` means "no answer"
- `return a, b` gives back both values as a **tuple**; unpack them with `a, b = ...`

---

## Next Up: Quiz 1

45 minutes, covering weeks 1 through 4: variables and types, decisions, loops, and strings.
