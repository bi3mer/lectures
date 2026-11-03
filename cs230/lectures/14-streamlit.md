---
marp: true
theme: lecture
paginate: true
---

# Web Apps with Streamlit

Colan Biemer

---

## Your First App

---

## Installing Streamlit

**Streamlit** is a Python library that turns a script into a web page. Install it in the terminal in VS Code (**Terminal > New Terminal**):

```
python3 -m pip install streamlit      # Mac
py -m pip install streamlit           # Windows
```

`pip` downloads a library and installs it. Streamlit brings pandas with it, which we use next lecture.

---

## Writing an App

```python
import streamlit as st

st.title("Coffee Cart")
st.write("Open from 8 to 11.")
```

Save this as `app.py`. Each `st.` call adds one thing to the page, top to bottom.

---

## Running an App

```
python3 -m streamlit run app.py       # Mac
py -m streamlit run app.py            # Windows
```

```
  You can now view your Streamlit app in your browser.

  Local URL: http://localhost:8501
```

Run it from the folder that holds `app.py`, the [current working directory](11-os-module.html#10). The first run asks for an email: press **Enter** to skip it, and the browser opens. **Ctrl+C** in the terminal stops the app.

---

## Running from VS Code

<style scoped>
pre { font-size: 0.75em; }
</style>

Save this as `.vscode/launch.json` in your project folder:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Streamlit",
      "type": "debugpy",
      "request": "launch",
      "module": "streamlit",
      "args": ["run", "${file}"]
    }
  ]
}
```

Then open `app.py` and press **F5** (**Run > Start Debugging**). The run arrow ignores this file and opens no page.

---

## Text on the Page

```python
import streamlit as st

st.title("Coffee Cart")
st.header("Menu")
st.write("Coffee: $3.00")
st.markdown("**Tea** is $2.50.")
st.markdown("*Bagels* are $2.75.")
```

`st.title` and `st.header` write headings. `st.markdown` reads `**bold**` and `*italics*`, as these slides do. Text between two `$` signs shows as a math formula, so each price gets its own line.

---

## `st.write` Shows Any Value

```python
import streamlit as st

menu = {"coffee": 3.00, "tea": 2.50, "bagel": 2.75}
sales = [50, 75, 60]

st.write(sum(sales))
st.write(sales)
st.write(menu)
st.write(f"Best day: {max(sales)}")
```

`st.write` shows numbers, strings, lists, and dictionaries, each in a form that fits it.

---

## Widgets

---

## `st.text_input`

```python
import streamlit as st

name = st.text_input("Your name")
if name != "":
    st.write(f"Hello, {name}!")
```

A **widget** is a control on the page that the user changes, like a text box. `st.text_input` draws a text box and returns what is in it, `""` at first.

---

## The Whole Script Reruns

```python
import streamlit as st

print("The script ran")
name = st.text_input("Your name")
st.write(f"Hello, {name}!")
```

```
The script ran
The script ran
The script ran
```

Each time a widget changes, Streamlit runs the whole script again, top to bottom. `print` goes to the terminal, so it shows every rerun.

---

## `st.number_input`

```python
import streamlit as st

count = st.number_input("How many?", min_value=1, max_value=12, value=1)
price = st.number_input("Price ($)", min_value=0.0, value=3.00, step=0.25)

st.write(f"Total: ${count * price:.2f}")
```

The box accepts only numbers in the range, so no [`try`/`except`](10-exceptions-and-files.html#5) is needed. Whole-number arguments return an `int`, and decimal ones like `0.0` return a `float`; mixing the two raises an error.

---

## `st.slider`

```python
import streamlit as st

percent = st.slider("Tip (%)", 0, 30, 15)
st.write(f"Tip: {percent}%")
```

The three numbers are the smallest value, the largest, and where the slider starts.

---

## `st.selectbox`

```python
import streamlit as st

menu = {"coffee": 3.00, "tea": 2.50, "bagel": 2.75}

item = st.selectbox("Item", menu.keys())
st.write(f"{item}: ${menu[item]:.2f}")
```

`st.selectbox` returns the option the user picked. The options are the menu's keys, so the [lookup](12-dictionaries.html#12) never raises a `KeyError`.

---

## `st.checkbox` and `st.radio`

```python
import streamlit as st

size = st.radio("Size", ["Small", "Large"])
to_go = st.checkbox("To go")

st.write(f"A {size.lower()} coffee")
if to_go:
    st.write("In a paper cup")
```

`st.radio` returns the option picked, like `st.selectbox`. `st.checkbox` returns `True` when checked.

---

## `st.button`

```python
import streamlit as st

name = st.text_input("Your name")
if st.button("Say hello"):
    st.write(f"Hello, {name}!")
```

A click reruns the script, and `st.button` returns `True` on that one rerun only. Typing a new name reruns it with `False`, so the greeting disappears.

---

## Problem: Tip Calculator (us)

```python
# Build a tip calculator. Ask for the bill and a tip from 0 to 30
# percent, then show the tip and the total, to the cent.
```

With a bill of `40.00` and a tip of `20`, the page shows:

```
Tip: $8.00
Total: $48.00
```

- Which widget fits the bill, and which fits the tip?
- What type does each one return?

---

## Solution: Tip Calculator (us)

```python
import streamlit as st

st.title("Tip Calculator")
bill = st.number_input("Bill ($)", min_value=0.0, value=40.0)
percent = st.slider("Tip (%)", 0, 30, 20)

tip = bill * percent / 100
st.write(f"Tip: ${tip:.2f}")
st.write(f"Total: ${bill + tip:.2f}")
```

`min_value=0.0` makes the bill a `float`. Moving the slider reruns the script, which updates the totals.

---

## Parsons Problem #1 (you)

**One line does not belong.**

```python
st.write(f"{degrees + 273.15:.1f} K")
degrees = st.text_input("Degrees C")
import streamlit as st
st.write(f"{degrees * 9 / 5 + 32:.1f} F")
else:
unit = st.radio("Convert to", ["Fahrenheit", "Kelvin"])
degrees = st.number_input("Degrees C", value=20.0)
if unit == "Fahrenheit":
```

---

## Solution: Parsons Problem #1 (you)

```python
import streamlit as st

degrees = st.number_input("Degrees C", value=20.0)
unit = st.radio("Convert to", ["Fahrenheit", "Kelvin"])
if unit == "Fahrenheit":
    st.write(f"{degrees * 9 / 5 + 32:.1f} F")
else:
    st.write(f"{degrees + 273.15:.1f} K")
```

The extra line was `degrees = st.text_input("Degrees C")`. It returns a string, so `degrees * 9 / 5` raises a `TypeError`.

---

## Showing Results

---

## Messages

```python
import streamlit as st

age = st.number_input("Age", min_value=0, max_value=120, value=18)
if age >= 21:
    st.success("Welcome in.")
elif age >= 18:
    st.warning("No drinks from the bar.")
else:
    st.error("You must be 18 or older.")
st.info("Bring a photo ID.")
```

Each one shows a colored box: green, yellow, red, and blue.

---

## `st.metric`

```python
import streamlit as st

sales = [50, 75, 60, 90, 40]

st.metric("Total sales", f"${sum(sales)}")
st.metric("Best day", f"${max(sales)}")
```

`st.metric` shows one number in large type, with a small label above it.

---

## Side by Side: `st.columns`

```python
import streamlit as st

sales = [50, 75, 60, 90, 40]

left, right = st.columns(2)
with left:
    st.metric("Total sales", f"${sum(sales)}")
with right:
    st.metric("Best day", f"${max(sales)}")
```

`st.columns(2)` returns two columns. Anything inside a column's `with` block lands in that column, as [`with open`](10-exceptions-and-files.html#17) scoped a file.

---

## The Sidebar

```python
import streamlit as st

with st.sidebar:
    st.header("Options")
    size = st.radio("Size", ["Small", "Large"])

st.title("Coffee Cart")
st.write(f"Size: {size}")
```

The sidebar is a panel down the left edge of the page. Anything inside `with st.sidebar:` goes there.

---

## Problem: Coffee Order (us)

```python
# Build an order page: pick a drink and how many, side by side.
# Show the total as a metric, and warn when it is over $20.
menu = {"coffee": 3.00, "latte": 4.50, "tea": 2.50}
```

Five lattes show a total of `$22.50` and the warning.

- Which widget fits each choice?
- How do we turn the drink into its price?

---

## Solution: Coffee Order (us)

```python
import streamlit as st

menu = {"coffee": 3.00, "latte": 4.50, "tea": 2.50}

st.title("Coffee Order")
left, right = st.columns(2)
with left:
    drink = st.selectbox("Drink", menu.keys())
with right:
    count = st.number_input("How many?", min_value=1, max_value=10, value=1)

total = menu[drink] * count
st.metric("Total", f"${total:.2f}")
if total > 20:
    st.warning("That is a lot of coffee.")
```

---

## Tables and Charts

---

## `st.dataframe`

```python
import streamlit as st

table = {
    "name": ["Ada", "Grace", "Alan"],
    "score": [90, 85, 77],
}

st.dataframe(table)
```

`st.dataframe` draws a [dictionary of lists](13-records-and-sets.html#8) as a table: each key names a column, and its list fills that column. Clicking a column's name sorts by it.

---

## A Table from a File

<style scoped>
pre { font-size: 0.75em; }
</style>

```python
import os
import streamlit as st

names = []
scores = []
path = os.path.join("data", "scores.csv")
try:
    with open(path, "r") as f:
        f.readline()
        for line in f:
            fields = line.strip().split(",")
            names.append(fields[0])
            scores.append(int(fields[1]))
    st.dataframe({"name": names, "score": scores})
except FileNotFoundError as error:
    st.error(error)
```

`f.readline()` [skips the header](10-exceptions-and-files.html#29), and each line splits into a name and a score. A missing file shows a red box in place of the table.

---

## `st.bar_chart`

```python
import streamlit as st

table = {
    "name": ["Ada", "Grace", "Alan"],
    "score": [90, 85, 77],
}

st.bar_chart(table, x="name", y="score")
```

`x` names the column along the bottom, and `y` names the column that sets each bar's height.

---

## Parsons Problem #2 (you)

**One line does not belong.**

```python
st.bar_chart({"item": items, "price": prices}, x="item", y="price")
items.append(item)
for item, price in menu.items():
prices.append(price)
st.bar_chart(menu, x="item", y="price")
import streamlit as st
items = []
prices = []
menu = {"coffee": 3.00, "tea": 2.50, "bagel": 2.75}
```

---

## Solution: Parsons Problem #2 (you)

```python
import streamlit as st

menu = {"coffee": 3.00, "tea": 2.50, "bagel": 2.75}

items = []
prices = []
for item, price in menu.items():
    items.append(item)
    prices.append(price)

st.bar_chart({"item": items, "price": prices}, x="item", y="price")
```

The extra line was `st.bar_chart(menu, x="item", y="price")`. `menu` has no `"item"` or `"price"` key, so Streamlit cannot find those columns.

---

## Remembering Between Reruns

---

## Problem: Find the Bug

```python
import streamlit as st

count = 0
if st.button("Add one"):
    count += 1

st.write(f"Count: {count}")
```

Click **Add one** three times. What does the page show?

---

## Solution: Find the Bug

```
Count: 1
```

Each click reruns the whole script, and the rerun sets `count = 0` again. A variable lasts one run.

---

## `st.session_state`

```python
import streamlit as st

if "count" not in st.session_state:
    st.session_state["count"] = 0

if st.button("Add one"):
    st.session_state["count"] += 1

st.write(f"Count: {st.session_state['count']}")
```

`st.session_state` works like a dictionary that keeps its keys across reruns. Check with [`in`](12-dictionaries.html#8) so only the first run sets the count to 0.

---

## Parsons Problem #3 (you)

**One line does not belong.**

```python
for name in st.session_state["names"]:
if "names" not in st.session_state:
name = st.text_input("Name")
st.session_state["names"] = st.session_state["names"].append(name)
st.write(name)
st.session_state["names"].append(name)
import streamlit as st
st.session_state["names"] = []
if st.button("Add"):
```

---

## Solution: Parsons Problem #3 (you)

```python
import streamlit as st

if "names" not in st.session_state:
    st.session_state["names"] = []

name = st.text_input("Name")
if st.button("Add"):
    st.session_state["names"].append(name)

for name in st.session_state["names"]:
    st.write(name)
```

The extra line stored what [`append` gives back](08-lists.html#10), `None`, so the next loop raises a `TypeError`.

---

## Summary

<style scoped>
ul { font-size: 0.85em; }
</style>

- **Streamlit** turns a script into a web page; start it with `python3 -m streamlit run app.py`
- `st.title`, `st.header`, `st.write`, and `st.markdown` put text on the page
- A **widget** returns its current value: `st.text_input` a string, `st.number_input` and `st.slider` a number, `st.selectbox` and `st.radio` the option picked, `st.checkbox` a `bool`
- `st.button` is `True` only on the rerun right after a click
- Every widget change reruns the whole script, top to bottom
- `st.success`, `st.warning`, `st.error`, and `st.info` show messages; `st.metric` shows one number
- `st.columns` and `st.sidebar` lay out the page with `with` blocks
- `st.dataframe` and `st.bar_chart` draw a dictionary of lists
- `st.session_state` works like a dictionary that lasts across reruns

---

## Next Up: Tables with pandas

- [Tables with pandas](15-pandas.html)
- [Streamlit's documentation](https://docs.streamlit.io) lists every widget
