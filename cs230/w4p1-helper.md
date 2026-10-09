# Week 4, Practice Problem 1

I was grading the solutions for Week 4 Practice Problem 1, and I ran into many solutions that featured one giant `if` statement. While there is nothing inherently wrong with this, giant `if` statements can be difficult to read and, as I'm sure some of you discovered, tedious to write. So, I thought I'd share a way to break the problem down.

To start, let me briefly restate the problem. The user is going to enter a date, the program is going to validate it, and then it'll print the date in a different format if and only if the user input was validated. If not, the program is going to ask them for input again and repeat the process until a valid date is received.

Now, with that, let's start programming.

## The Loop

Given the problem description, you'll notice that I wrote "repeat the process until." This is your clue that we are going to have to loop. The question is, should we use a `for` or a `while`? A `for` loop is great when we are counting between two numbers. A `while` loop is great when we don't know how many times we'll have to loop for. So, which should we use for this problem? We should use a `while` loop because we don't know how many times the user will enter an invalid date.

So, let's start with writing the input loop:

```python
while True:
    date = input("Enter a date (YYYY/MM/DD): ")
    # ... validation code
    # ... print date in new format if valid
    break
```

I've opted for a `while True` loop. Meaning, this loop is going to run forever unless I include a `break`. So, before writing more code, I added a `break` at the end of the loop. If I don't have the `break`, the loop will run forever unless the user terminates the program. However, I want to note that you do not have to use a `while True` loop. You could have a condition variable like:

```python
valid_date_found = False
date = ""
while not valid_date_found:
    date = input("Enter a date (YYYY/MM/DD): ")
    # ... validation code
    valid_date_found = True

# ... print date in new format
```

In this version, we have a variable that will become `True` if and only if the input date is valid. This version, as far as I am concerned, is neither better nor worse than the `while True` version. Both are steps in the direction of solving this problem. Whichever you find more intuitive and easy to understand is the one that is better for you.

## Input Validation

Now, let's continue with input validation. The first thing to note is the required format: `"YYYY/MM/DD"`. The first step, before validating the numbers (year, month, and day), is to validate the string itself. We could count the number of characters in `"YYYY/MM/DD"` and get that there are `10` characters in the format string. Then, in the program, we could make sure that the user input has a length of `10`:

```python
while True:
    date = input("Enter a date (YYYY/MM/DD): ")
    if len(date) != 10:
        continue
    # ...
    break
```

If the length of the user's input is not 10, then it is an invalid date. If so, we go inside that `if`, and the one and only line of code inside is `continue`. This will take the program back to the top of the `while` loop. At that point, the program will ask for user input again. So, the loop will keep looping until the user inputs a string of length 10.

Objectively, this is a good step forward. I, though, don't think that counting the characters in the user's input is a great solution. The reason why is that we can implicitly test this requirement while testing for the length of year, month, and day. To do that, though, we need to access them. We can do that with `.split()`.

`.split()` can split a string based on some input string into a list. So, for example:

```python
>>> example_csv = "1,2,3,4"
>>> example_csv.split(",")
['1', '2', '3', '4']
```

In the example above, we split `example_csv` by a comma, and it returned a list of strings that occurred before, in between, and after every comma in the string.

Now, how can we apply this to the current problem?

Here is the format again: `"YYYY/MM/DD"`. Year is before a `"/"`, month is in between two, and day is after. So, if we call split on a valid date, we'd get:

```python
>>> "2026/09/28".split("/")
['2026', '09', '28']
```

- If we want to access the year, then we can access it at index `0`.
- If we want to access the month, then we can access it at index `1`.
- If we want to access the day, then we can access it at index `2`.

Before we try to access them, though, we need to (1) store the result and (2) make sure that the length is equal to what we expect it to be. Before looking at the code, what should that length be?

```python
while True:
    date = input("Enter a date (YYYY/MM/DD): ")
    split_date = date.split("/")

    if len(split_date) != 3:
        continue
    # ...
    break
```

If `split_date` does not have a length of three, the user gave us a string that was not a valid date. If so, we don't want to keep validating, so we use `continue` to go back to the top of the loop and get more input from the user. Otherwise, we can keep going.

What do we have to do next? We have to validate the year, the month, and the day. Let's start with the year. (And I want to encourage you to try and think this way: one problem at a time. Don't try to solve everything all at once. That is how you get that blank feeling where the problem feels too difficult. Break the problem down into the simple stuff, and then build up using the solutions to the simple stuff.)

### Input Validation: Year

The problem's requirements for `year` are that it has to be four characters long, those characters can only be digits, and it must be between `0` and `9_999`. It sounds like a lot, but let's break it down one at a time. But before doing that, let's make a variable to make our code a bit easier to read:

```python
while True:
    date = input("Enter a date (YYYY/MM/DD): ")
    split_date = date.split("/")

    if len(split_date) != 3:
        continue

    # validate year
    year = split_date[0]
    # ...
    break
```

- How do we test if a year is four characters long? We can check the length: `len(year) == 4`
- How do we test if there are only digits inside it? `year.isdigit()`
- How do we test if it is between `0` and `9_999`? We could convert it to an integer and then do the check, but ask yourself this: How could it be less than `0` and how could it be greater than `9_999`? It can't. It can't be negative because we precluded the possibility of the character `'-'` being in the year string with `.isdigit()`. It can't be greater than `9_999` because there are only four digits, and anything larger would require a fifth digit.

So, we only really have two tests. And with those tests, if either fails, we should go back to getting input from the user. Now try to write that code and then check to see how your version compares to mine:

```python
while True:
    date = input("Enter a date (YYYY/MM/DD): ")
    split_date = date.split("/")

    if len(split_date) != 3:
        continue

    # validate year
    year = split_date[0]
    if len(year) != 4 or not year.isdigit():
        continue

    # ...
    break
```

If your version doesn't look like mine, that is totally fine. Maybe yours is better. Maybe it isn't. I'm guessing you may have written two `if` statements rather than one. That is totally fine. Instead of judging my version as right, compare your version against mine and decide which you prefer.

Regardless, at this point, we've validated the year. That means we still have to validate the month and the day. Let's keep going in order of the list and validate the month.

### Input Validation: Month

For this problem, the month has to be two characters, be only digits, and be between 1 and 12. Before we bother with the third requirement, we can write a slightly modified version of our year code to validate the month:

```python
while True:
    # ...(hiding code for brevity)
    # validate month
    month = split_date[1]
    if len(month) != 2 or not month.isdigit():
        continue
    # ...
```

Now, we only have to handle the third requirement: check if `month` is between two numbers. To do this, though, we can't use `month` directly. Why? Because the type of `month` is currently a `str`. That means we have to convert it to a number. In this case, an `int` is what makes the most sense since the number will be a whole number and not include a decimal. We can do that conversion right inside our check with `int(month)`, which gives us the integer version of `month` without changing the `month` variable itself.

With this, we just need to check if it is between 1 and 12, inclusive, and if not, we should go back to the top of the loop. (Again, try and code this yourself before looking at the code below.)

```python
while True:
    # ...
    # validate month
    month = split_date[1]
    if len(month) != 2 or not month.isdigit():
        continue

    if not (1 <= int(month) <= 12):
        continue
    # ...
```

In this case, the program is saying if `month` is NOT within the desired range, then the user input an invalid month and we have to go back to the top of the loop and ask for input again.

### Input Validation: Day

From here, we only have to handle the day. The logic for this is exactly the same as the month validation with the exception of the range. The problem stays simple and requires that a day has to be between 1 and 28, inclusive. So, I'm not going to go over it again, but I highly encourage you to try and write the code before continuing.

## Output

So, now we have validated the year, the month, and the day. Further, we have all of these validated values in the `split_date` variable and the rubric asks you to use `join`. So, what we can do is use `"-".join(split_date)` to format the date with `"-"` rather than `"/"`.

```python
while True:
    date = input("Enter a date (YYYY/MM/DD): ")
    split_date = date.split("/")

    if len(split_date) != 3:
        continue

    # validate year
    year = split_date[0]
    if len(year) != 4 or not year.isdigit():
        continue

    # validate month
    month = split_date[1]
    if len(month) != 2 or not month.isdigit():
        continue

    if not (1 <= int(month) <= 12):
        continue

    # validate day
    day = split_date[2]
    if len(day) != 2 or not day.isdigit():
        continue

    if not (1 <= int(day) <= 28):
        continue

    formatted_date = "-".join(split_date)
    print(f"Date: {formatted_date}")

    break
```

This is not the most concise version that the code could be, but is that a bad thing? I'll let you decide.

## Functions

Since we started covering functions, we might as well use the logic we wrote and make a function. We can start by copying the loop and replacing `while True:` with a function definition, `def date_is_valid(date):`. Since `date` is now a parameter, we can delete the `input()` line. Since we are no longer in a loop, we can also delete the printing code and the `break` at the end. Then we just have to replace the `continue` statements with something else. After that, we essentially have a function to test whether a string is in the `"YYYY/MM/DD"` format:

```python
def date_is_valid(date):
    split_date = date.split("/")
    if len(split_date) != 3:
        return False

    # validate year
    year = split_date[0]
    if len(year) != 4 or not year.isdigit():
        return False

    # validate month
    month = split_date[1]
    if len(month) != 2 or not month.isdigit():
        return False

    if not (1 <= int(month) <= 12):
        return False

    # validate day
    day = split_date[2]
    if len(day) != 2 or not day.isdigit():
        return False

    if not (1 <= int(day) <= 28):
        return False

    return True
```

Notice that every `continue` from our loop became `return False`. Each of those spots is where we found out that the date was not valid, so there is no reason to keep checking. `return` ends the function right away, and execution goes back to the caller (the line of code that called `date_is_valid`) with the value `False`.

You'll also want to note that the end of the function has `return True`. If we make it past every check without returning `False`, then the date must be valid. Hence, `True`, the string is a valid date.

Then we can use our function to make our loop way easier to read:

```python
date = ""
while not date_is_valid(date):
    date = input("Enter a date (YYYY/MM/DD): ")

print(f"Date: {'-'.join(date.split('/'))}")
```

We start `date` as an empty string. An empty string is not a valid date, so `date_is_valid(date)` returns `False` the first time, and the loop runs at least once to ask the user for input.

## A Bug We Didn't Handle

There is one bug in the code above: we didn't handle superscript digits, like the `²` in an exponent. (You were not asked to in the problem, but it is worth covering for a moment.)

```python
>>> "7".isdigit()
True
>>> "²".isdigit()
True
>>> int("²")
Traceback (most recent call last):
  ...
ValueError: invalid literal for int() with base 10: '²'
```

So, if a user enters `2026/0²/01`, the month `"0²"` has a length of two and passes `.isdigit()`, and then the program crashes when it reaches `int(month)`.

If we did want to handle it, though, the fix is simple. Instead of `.isdigit()`, we can use `.isdecimal()`.

`.isdecimal()` only returns `True` for characters that `int()` can actually convert. So, `"0²".isdecimal()` is `False` and the input would fall into our `continue` like any other invalid date. We could also handle it ourselves. I'll show one example with `year`:

```python
def date_is_valid(date):
    # ...
    non_digit_found = False
    for i in range(len(year)):
        if year[i] not in "0123456789":
            non_digit_found = True
            break

    if non_digit_found:
        continue
    # ...
```

Notice that the `continue` is outside of the `for` loop. If we put it inside the `for` loop, it would only skip to the next character rather than going back to the top of our `while` loop. That is why we need the `non_digit_found` variable and the `break`.

Regarding whether to use `.isdecimal()` or the `for` loop, I think that `.isdecimal()` is much cleaner. Of course, we could turn our `for` loop into a function as well and then call it:

```python
def is_decimal(string):
    for i in range(len(string)):
        if string[i] not in "0123456789":
            return False

    return True

def date_is_valid(date):
    # ...
    if len(year) != 4 or not is_decimal(year):
        continue
    # ...
```

Still, I'd recommend using the Python standard library. Until you've spent a ton of time programming and know exactly what you want, the standard library implementations will generally be higher quality than yours. For example, my simple `is_decimal("")` incorrectly returns `True`, but `"".isdecimal()` correctly returns `False`.

## Conclusion

I hope that this was useful. If there is one takeaway, it is that you should try to break the problems down into the simplest components that you can manage. Don't try to solve the whole problem at once. Start simple and then build up. The advice is trite, but it's right. (I'm sure someone else has said that rhyme, but it felt good to come up with.)
