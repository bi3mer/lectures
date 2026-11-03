---
marp: true
theme: lecture
paginate: true
---

# Repetition: While

Colan Biemer

---

## 1 to 5

```python
# Print the numbers 1 through 5
```

```
1
2
3
4
5
```

---

## 1 to 5

```python
print(1)
print(2)
print(3)
print(4)
print(5)
```

---

## 1 to 6

```python
# Code?
```

---

## 1 to 6

```python
print(1)
print(2)
print(3)
print(4)
print(5)
print(6)
```

---

## 1 to 6

```python
print(1)
print(2)
print(3)
print(4)
print(5)
print(6)
```

It would be nice if we could do this in fewer lines of code...

---

## While Loops

```python
while [STATEMENT THAT RESOLVES TO A BOOLEAN]:
    # while the statement is true, the code in here runs again
    #
    # Something in here has to eventually make the statement false (kind of)

# program continues as normal
```

---

## 1 to 5

```python
# Print the numbers 1 through 5
```

```
1
2
3
4
5
Done
```

---

## Counting Example

```python
count = 1

while count <= 5:
    print(count)
    count = count + 1 # count += 1

print("Done")
```

[Visualization](https://pythontutor.com/visualize.html#code=count%20%3D%201%0A%0Awhile%20count%20%3C%3D%205%3A%0A%20%20%20%20print%28count%29%0A%20%20%20%20count%20%3D%20count%20%2B%201%20%23%20count%20%2B%3D%201%0A%0Aprint%28%22Done%22%29&curInstr=0&mode=display&origin=opt-frontend.js&py=311)

---

## Product of Products Example

```python
# How can we calculate 1*2*3*4*5 with a loop?
```

---

## Product of Products Example

```python
n = 5
count = 1
product = 1

while count <= n:
    product *= count
    count += 1

print(f"Product: {product}")
```

---

## Product of Products Example (Continued)

```python
n = 5
count = 1
product = 1

while count > 0:
    product *= count
    count += 1

print(f"Product: {product}")
```

What's the bug? What is output?

---

## Product of Products Example (Continued x2)

```python
n = 5
count = 1
product = 1

while count > 0: # this is always true, the loop never ends
    product *= count
    count += 1

print(f"Product: {product}")
```

---

## Infinite Loop

```python
while True:
    # whatever is in here, will run again and again and again and...
    # Your program gets stuck.
#
# What is here will never run :/
```

---

## While True...

Are there any examples of programs where we may want an infinite loop?

---

## While True...

- Servers
- Browsers
- Client Software like Calculators, Excel, etc.
- Games
- ... We want infinite loops for a lot of stuff, but we need a way to break out

---

## `break`

```python
while True:
    break
```

You can use `break` to end a loop without the condition being checked. (This won't work with an `if` statement.)

---

## `break`

```python
while True:
    break
    print("1")

print("2")
```

- Will "1" print?
- Will "2" print?

---

## `break`

```python
while True:
    break
    print("1")

print("2")
```

- Will "1" print? No.
- Will "2" print? Yes.

---

## Print 1 to n With `while True`

```python
# 1. Ensure the user enters a positive number
# 2. Print 1 to n with while True loop
```

---

## Print 1 to n With `while True`

```python
count = -1

while count < 0:
    count = int(input("Enter a positive number: "))

i = 1 # i is short for index
while True:
    if i > count:
        break

    print(i)
    i += 1
```

---

## `continue`

```python
count = 1
while count <= 3:
    count += 1
    if count == 2:
        continue

    print(count)
```

You can use `continue` to skip the rest of the loop body and jump back to the condition check. (`2` is not printed.)

---

## `continue`

```python
count = 0
while count < 1_000:
    count += 1
    continue
    print("1")

print("2")
```

- Will "1" print?
- Will "2" print?
- How many times did the loop run?

---

## `continue`

```python
count = 0
while count < 1_000:
    count += 1
    continue
    print("1")

print("2")
```

- Will "1" print? No.
- Will "2" print? Yes.
- How many times did the loop run? 1,000.

---

## Interlude: Modulo `%`

```python
15 % 4   # 3  (remainder of 15 / 4)
10 % 2   # 0  (10 is even)
7 % 2    # 1  (7 is odd)
```

`%` gives the remainder after division. Common check: `n % 2 == 0` means `n` is even.

---

## Print 1 to n, Skipping Multiples of 3

```python
# 1. Ensure the user enters a positive number
# 2. Print 1 to n, but skip multiples of 3
```

---

## Print 1 to n, Skipping Multiples of 3

```python
n = -1
while n < 0:
    n = int(input("Enter a positive number: "))

count = 0
while count < n:
    count += 1
    if count % 3 == 0:
        continue

    print(count)
```

---

## In-Class Activity: Input Validation

Let's write a program that asks if someone is an Employee (`E`), Member (`M`), or Other (`O`). It won't move on until it gets one of those three answers.

```python
# Code?
```

---

## Summing Numbers Example

Let's sum numbers the user enters, one at a time, stopping when they enter `-1`.

```python
# Code?
```

---

## Summing Numbers Example

```python
total = 0
num = int(input("Enter a number (-1 to stop): "))

while num != -1:
    total += num
    num = int(input("Enter a number (-1 to stop): "))

print(f"Total: {total}")
```

---

## Nested While Loops

```python
while True:
    while True:
        break
    break
```

We can nest as many `while` loops as we would like to.

---

## Triangle of Stars

```python
# Print a triangle of stars, 5 rows tall:
# *
# **
# ***
# ****
# *****
```

---

## Triangle of Stars

```python
row = 1
while row <= 5:
    col = 1
    while col <= row:
        print("*", end="")
        col += 1

    print()
    row += 1
```

---

## Summary

- `while` repeats its body as long as a condition is `True`
- Something inside the loop must eventually make the condition `False` — or you get an infinite loop
- `break` exits the loop immediately; `continue` skips the rest of the current pass and jumps back to the condition check
- Common patterns: counting, accumulating a running total, and validating input by looping until it's acceptable

---

## Next Up: Repetition With `for`

```python
for i in range(5):
    print(i)
```

```
0
1
2
3
4
```

[Repetition: For](05-for-loops.html)
