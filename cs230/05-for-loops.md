---
marp: true
theme: lecture
paginate: true
---

# Repetition: For

Colan Biemer

---

## For Loops

```python
for [VARIABLE] in range([START], [END]):
    # runs once per number, with VARIABLE set to that number
    #
    # VARIABLE starts at START and stops before END
    #
    # Notice the colon (:) and that everything is indented

# program continues as normal
```

---

## Counting Example

```python
# Print the numbers 1 through 5, this time with a for loop
```

---

## Counting Example

```python
for count in range(1, 6):
    print(count)
```

No counter to set up, and no counter to increment.

---

## Other Ways to Call `range`

```python
range(5)         # 0, 1, 2, 3, 4    start defaults to 0
range(2, 5)      # 2, 3, 4
range(0, 10, 2)  # 0, 2, 4, 6, 8    step by 2 instead of 1
range(5, 0, -1)  # 5, 4, 3, 2, 1    a negative step counts down
```

The end value is never included.

---

## Countdown

```python
# Print 10 down to 1, then "Liftoff!"
```

---

## Countdown

```python
for count in range(10, 0, -1):
    print(count)

print("Liftoff!")
```

---

## Exercise: Even Numbers

```python
# Print the even numbers from 2 to 20, then print their sum
```

```
2
4
...
20
Sum: 110
```

---

## Exercise: Even Numbers

<div class="cols">
<div>

```python
total = 0

for num in range(2, 21, 2):
    print(num)
    total += num

print(f"Sum: {total}")
```

</div>
<div>

```python
total = 0

for num in range(1, 21):
    if num % 2 == 0:
        print(num)
        total += num

print(f"Sum: {total}")
```

</div>
</div>

Both solve the problem. Which is better? Why?

---

## Input Inside the Loop

```python
# Ask the user how many numbers they have.
# Read that many numbers and print the average.
```

---

## Input Inside the Loop

```python
n = int(input("How many numbers? "))
total = 0

for _ in range(n):
    num = int(input("Enter a number: "))
    total += num

print(f"Average: {total / n}")
```

- `_` for an unused variable is considered "idiomatic" python
- What happens if the user enters `0`?
- Does this program fit the IPO model from the textbook?

---

## Savings Example

```python
# You deposit $1000 in an account that earns 5% per year.
# Print the balance at the end of each of the next 10 years.
```

```
Year 1: $1050.00
Year 2: $1102.50
...
Year 10: $1628.89
```

---

## Savings Example

```python
balance = 1000

for year in range(1, 11):
    balance *= 1.05
    print(f"Year {year}: ${balance:.2f}")
```

---

## `while` or `for`?

Anything you can do with one, you can do with the other.

---

## `while` or `for`?

| Task                                 | Loop    |
| ------------------------------------ | ------- |
| Print 1 to 100                       | `for`   |
| Sum numbers until the user enters -1 | `while` |
| Read exactly 5 numbers from the user | `for`   |
| Ask again until the input is valid   | `while` |
| Balance after 10 years of interest   | `for`   |
| Years until the balance doubles      | `while` |

A `for` loop is a `while` loop with the counting done for you.

---

## `break` and `continue` Still Work

```python
for i in range(10):
    if i == 3:
        continue
    if i == 6:
        break
    print(i)
```

What is output?

[Visualization](https://pythontutor.com/visualize.html#code=for%20i%20in%20range%2810%29%3A%0A%20%20%20%20if%20i%20%3D%3D%203%3A%0A%20%20%20%20%20%20%20%20continue%0A%20%20%20%20if%20i%20%3D%3D%206%3A%0A%20%20%20%20%20%20%20%20break%0A%20%20%20%20print%28i%29&curInstr=0&mode=display&origin=opt-frontend.js&py=311)

---

## Is It Prime?

```python
# Ask the user for a number bigger than 1.
# Print whether or not it is prime.
```

Hint: divide by every number from 2 up to but not including `n`.

---

## Is It Prime?

```python
n = int(input("Enter a number bigger than 1: "))
is_prime = True

for divisor in range(2, n):
    if n % divisor == 0:
        is_prime = False
        break

if is_prime:
    print(f"{n} is prime")
else:
    print(f"{n} is not prime")
```

Why `break`? One divisor is enough; no need to keep checking.

---

## In-Class Activity: FizzBuzz

```python
# Code?
```

---

## Nested `for` Loops

```python
for row in range(1, 3):
    for col in range(1, 3):
        print(row, col)
```

What is the output? [Visualization](https://pythontutor.com/visualize.html#code=for%20row%20in%20range%281,%203%29%3A%0A%20%20%20%20for%20col%20in%20range%281,%203%29%3A%0A%20%20%20%20%20%20%20%20print%28row,%20col%29&curInstr=0&mode=display&origin=opt-frontend.js&py=311)

---

## Nested `for` Loops

```
1 1
1 2
2 1
2 2
```

---

## Triangle of Stars

```python
# Print a triangle of stars, 5 rows tall, with for loops:
#
# *
# **
# ***
# ****
# *****
```

---

## Triangle of Stars

```python
for row in range(1, 6):
    for col in range(1, row + 1):
        print("*", end="")

    print()
```

---

## Upside-Down Triangle

```python
# Print the triangle upside down, 5 rows tall:
#
# *****
# ****
# ***
# **
# *
```

---

## Upside-Down Triangle

```python
for row in range(5, 0, -1):
    for _ in range(row):
        print("*", end="")

    print()
```

Only the outer `range` changed. Compare with the countdown from earlier.

---

## Upside-Down Triangle (Flipped)

```python
# Now let's get user input >= 5, and flip the triangle so the stars line up on the right:
#
# *****
#  ****
#   ***
#    **
#     *
```

---

## Upside-Down Triangle (Flipped)

```python
n = 0
while n < 5:
    n = int(input("Enter a number, 5 or bigger: "))

for row in range(n, 0, -1):
    for _ in range(n - row):
        print(" ", end="")

    for _ in range(row):
        print("*", end="")

    print()
```

---

## Hollow Rectangle

```python
# Ask the user for a width and a height. (No input validation.)
# Print a hollow rectangle that size, using # for the border.
```

```
Width: 5
Height: 4
#####
#   #
#   #
#####
```

---

## Hollow Rectangle

```python
width = int(input("Width: "))
height = int(input("Height: "))

for _ in range(width):          # top of rectangle
    print("#", end="")
print()

for _ in range(height - 2):     # middle of rectangle
    print("#", end="")
    for _ in range(width - 2):
        print(" ", end="")
    print("#")

for _ in range(width):          # bottom of rectangle
    print("#", end="")
print()
```

---

## Hollow Rectangle (Another Way)

```python
width = int(input("Width: "))
height = int(input("Height: "))

for row in range(1, height + 1):
    for col in range(1, width + 1):
        if row == 1 or row == height or col == 1 or col == width:
            print("#", end="")
        else:
            print(" ", end="")

    print()
```

Which do you prefer? Why?

---

## Summary

- `for` runs its body once per number that `range` produces
- `range(start, end, step)` stops before `end`; `start` defaults to 0 and `step` to 1
- The loop variable does not have to be used: `for _ in range(n)` means "do this `n` times"
- Reach for `for` when the number of passes is known up front, `while` when it is not
- `break` and `continue` behave the same way in both loops
- Nested loops: the inner loop runs to completion on every pass of the outer loop

---

## Next Up: Strings and Format Strings

Strings and Format Strings

---

## Appendix: Infinite Loop with `for`

```python
import itertools

for _ in itertools.repeat(None):
    print("Looping forever...")
```

We haven't learned `itertools` so far, but we can do an infinite `for` loop without it.

---

## Appendix: Infinite Loop with `for` (Continued)

```python
def forever():
    while True:
        yield

for _ in forever():
    print("Looping forever...")
```

We also haven't covered how to make a `function` or a `generator`... `forever` is a function and `yield` is a keyword that generates some value. In this case, `forever` yields `None` every time the loop asks for the next value. What is `None`? It is meant to represent nothing.
