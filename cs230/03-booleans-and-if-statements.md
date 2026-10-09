---
marp: true
theme: lecture
paginate: true
---

# Booleans and Decision Making

Colan Biemer

---

## Booleans

Does anyone know what a boolean is?

---

## Booleans

A boolean can be one of two values:

- `True`
- `False`

---

## Setting a variable to True and False

```python
# How can we do this? 
```

---

## Setting a variable to True and False

```python
a = True
b = False
```

---

## We Can Generate Booleans by Comparing

```python
a = 100 > -100 # True
b = 100 < -100 # False
```

---

## Comparison Table

| Operator | Meaning                  | Example  |
|----------|--------------------------|----------|
| `==`     | equal to                 | `a == b` |
| `!=`     | not equal to             | `a != b` |
| `>`      | greater than             | `a > b`  |
| `<`      | less than                | `a < b`  |
| `>=`     | greater than or equal to | `a >= b` |
| `<=`     | less than or equal to    | `a <= b` |

`=` is not `==`.

---

## Simple Program: Voter age

```python
# Get the user's age and output whether or not they can vote
```

---

## Simple Program: Voter age

```python
VOTER_AGE = 18

user_age = int(input("How old are you?"))
can_vote = user_age >= VOTER_AGE
print(f"You can vote: {can_vote}")
```

---

## Question

Using what we've learned could we make a program to change output? e.g.:

- If under 18, output "You are too young to vote :/"
- Else, output "You can vote!"

---

## Nope

What we need is a way to branch (i.e. if true do this else do that)

---

## If Statements

```python
if [STATEMENT THAT RESOLVES TO A BOOLEAN]:
    # if statement resolves to true, code in here is executed
    # 
    # Notice the colon (:) and that everything is indented
    # 
    # Indentation is either a set number of spaces or tabs

# program continues as normal
```

---

## A Note on Cheating

You should only use what we've learned in class. (Review of [w1p2](https://bi3mer.github.io/autograder/cs230/w1p2.html))

---

## If/Else Statements

```python
if [STATEMENT THAT RESOLVES TO A BOOLEAN]:
    # if statement resolves to true, code in here is executed
else:
    # if statement resolves to false, code in here is executed

# program continues as normal
```

---

## Voter Age Example 2

Let's write a program that takes as input the user's age and outputs a string telling them if they are too young to vote:

- If under 18, output "You are too young to vote :/"
- Else, output "You can vote"


---

## Voter Age Example 2

```python
user_age = int(input("Age: "))

if user_age < 18:
    print("You are too young to vote :/")
else:
    print("You can vote")
```

---

## Else If

```python
if [STATEMENT THAT RESOLVES TO A BOOLEAN]:
    # runs if this is true
elif [ANOTHER STATEMENT THAT RESOLVES TO A BOOLEAN]:
    # runs if the first was false and this is true
    # 
    # There can be multiple elif
    # 
    # There does not need to be an else
else:
    # runs if all above were false

# program continues as normal
```

---

## Voter Age Example 3

Let's add to our program, by saying "Welcome, first-time voter!" if the user inputs 18.

---

## Voter Age Example 3

```python
user_age = int(input("Age: "))

if user_age < 18:
    print("You are too young to vote :/")
elif user_age == 18:
    print("Welcome, first-time voter!")
else:
    print("You can vote")
```

---

## Voter Age Example 3 (Nested Alternative)

```python
user_age = int(input("Age: "))

if user_age < 18:
    print("You are too young to vote :/")
else: 
    if user_age == 18:
        print("Welcome, first-time voter!")
    else:
        print("You can vote")
```

You put ifs in ifs.

---

## Combining Booleans

| Operator | Meaning                         | Example         |
|----------|----------------------------------|-----------------|
| `and`    | true only if both sides true     | `a and b`       |
| `or`     | true if either side true         | `a or b`        |
| `not`    | flips true/false                 | `not a`         |

---

## `and` Truth Table

| a       | b       | a `and` b |
|---------|---------|-----------|
| `True`  | `True`  | `True`    |
| `True`  | `False` | `False`   |
| `False` | `True`  | `False`   |
| `False` | `False` | `False`   |

---

## `or` Truth Table

| a       | b       | a `or` b |
|---------|---------|----------|
| `True`  | `True`  | `True`   |
| `True`  | `False` | `True`   |
| `False` | `True`  | `True`   |
| `False` | `False` | `False`  |


--- 

## Quick Check

```python
a = True
b = False

print(not a)   # output?
print(a and b) # output?
print(a or b)  # output?
```

--- 

## Quick Check

```python
a = True
b = False

print(not a)   # False
print(a and b) # False
print(a or b)  # True
```

---

## Voter Age Example 4

Let's add a rule: to vote you must be 18+ **and** have an ID. How can we update the program?

```python
user_age = int(input("Age: "))

if user_age < 18:
    print("You are too young to vote :/")
elif user_age == 18:
    print("Welcome, first-time voter!")
else:
    print("You can vote")
```

---

## Voter Age Example 4

```python
user_age = int(input("Age: "))
has_id = input("Do you have an ID? (yes/no): ") == "yes"

if user_age < 18 or not has_id:
    print("You are not eligible to vote")
elif user_age == 18:
    print("Welcome, first-time voter!")
else:
    print("You can vote")
```

---

## Match Statements

```python
match [VARIABLE]:
    case [VALUE 1]:
        # runs if VARIABLE == VALUE 1
    case [VALUE 2]:
        # runs if VARIABLE == VALUE 2
    case _:
        # default case, runs if nothing above matched

# program continues as normal
```

This can be easier to read than a long `if`/`elif`/`elif`/... chain. In some languages, it will also be more efficient, but not in Python.

---

## Day of Week Example

Let's write a program that takes a number 1-7 and prints the matching day name, using `match`.

---

## Day of Week Example

```python
day = int(input("Day (1-7): "))

match day:
    case 1:
        print("Monday")
    case 2:
        print("Tuesday")
    case 3:
        print("Wednesday")
    case 4:
        print("Thursday")
    case 5:
        print("Friday")
    case 6:
        print("Saturday")
    case 7:
        print("Sunday")
    case _:
        print("Not a valid day")
```

---

## Weekday or Weekend Example

Let's use a `match` to say whether the day (1-7) is a weekday or a weekend. 

```python
match day:
    case 1:
        print("Weekday")
    case 2:
        print("Weekday")
    # same for 3, 4, 5, then 6 and 7 for weekend... gross
```

---

## The `|` (Or) Pattern

```python
match [VARIABLE]:
    case [VALUE 1] | [VALUE 2]:
        # runs if VARIABLE == VALUE 1 OR VARIABLE == VALUE 2
    case _:
        # default case
```

Lets us avoid writing duplicate code for similar values.

---

## Weekday or Weekend Example

Let's use a `match` to say whether the day (1-7) is a weekday or a weekend.

---

## Weekday or Weekend Example

```python
day = int(input("Day (1-7): "))

match day:
    case 1 | 2 | 3 | 4 | 5:
        print("Weekday")
    case 6 | 7:
        print("Weekend")
    case _:
        print("Not a valid day")
```

---

## Exercise: Same Thing, Without `match`

Rewrite the example using a simple `if`/`elif`/`else` to make it less verbose?

---

## Exercise: Same Thing, Without `match`

```python
day = int(input("Day (1-7): "))

if 1 <= day <= 5:
    print("Weekday")
elif day == 6 or day == 7:
    print("Weekend")
else:
    print("Not a valid day")
```

---

## Summary

- Booleans: `True` / `False`, built with `==`, `!=`, `>`, `<`, `>=`, `<=`
- `if` / `elif` / `else` branch code based on a boolean
- Nested `if`s are another way to express `elif`
- `and`, `or`, `not` combine booleans into one condition
- `match`/`case` is a readable alternative to a long `elif` chain when checking one variable against many values
- `|` in a `case` matches multiple values with one body

---

## Next Up: Repetition

How to make code run **over and over**. For example:

```
Enter y for yes or n for no: asdf
Enter y for yes or n for no: asdf
Enter y for yes or n for no: asdf
...
```
