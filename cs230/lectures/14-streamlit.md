---
marp: true
theme: lecture
paginate: true
---

# Web Apps with Streamlit

Colan Biemer

---

## What Is Streamlit?

**Streamlit** is a Python library that turns a script into a web page. We write only Python, and Streamlit draws the page and keeps it up to date.

---

## What We Can Build

- [Tip Calculator](https://230-app-example-tip-app-4mzdzanoh7kt3yvvjsmbtp.streamlit.app/), with its [code on GitHub](https://github.com/bi3mer/230-streamlit-example-tip-app)
- [Earthquakes This Week](https://bi3mer-230-streamlit-earthquake-example-app-vlrwj8.streamlit.app/), with its [code on GitHub](https://github.com/bi3mer/230-streamlit-earthquake-example)

We will build both pages today.

---

## The Basics

---

## Installing Streamlit

Install Streamlit in the terminal in VS Code (**Terminal > New Terminal**):

```
python3 -m pip install streamlit      # Mac
py -m pip install streamlit           # Windows
```

`pip` downloads a library and installs it. Streamlit brings pandas with it, which we use next lecture.

---

## Writing an App

```python
import streamlit as st

st.title("My First App")
st.write("Hello from Python.")
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

## `st.title`, `st.header`, and `st.write`

```python
import streamlit as st

scores = [90, 85, 77]

st.title("My First App")
st.header("Scores")
st.write("The scores and their total:")
st.write(scores)
st.write(sum(scores))
```

`st.title` and `st.header` write headings. `st.write` shows strings, numbers, lists, and dictionaries, each in a form that fits it.

---

## Tip Calculator

---

## The Bill: `st.number_input`

```python
import streamlit as st

st.title("Tip Calculator")

bill = st.number_input("Bill ($)", min_value=0.0, value=40.00, step=0.25)
st.write(f"Bill: ${bill:.2f}")
```

A [**widget**](https://docs.streamlit.io/develop/api-reference/widgets) is a control on the page that the user changes. `st.number_input` draws a number box and returns what is in it, and the box accepts only numbers in the range.

---

## The Tax: `st.selectbox`

```python
rates = {"Pennsylvania": 6.0, "New Jersey": 6.625, "Delaware": 0.0}

state = st.selectbox("State", rates.keys())
tax = bill * rates[state] / 100
st.write(f"Tax: ${tax:.2f}")
```

`st.selectbox` returns the option the user picked. The options are the dictionary's keys, so the [lookup](12-dictionaries.html#12) never raises a `KeyError`.

---

## The Tip: `st.slider`

```python
percent = st.slider("Tip (%)", 0, 30, 20)
tip = bill * percent / 100
total = bill + tax + tip

st.write(f"Tip: ${tip:.2f}")
st.write(f"Total: ${total:.2f}")
```

The three numbers are the smallest value, the largest, and where the slider starts.

---

## The Whole Script Reruns

```python
print("The script ran")
```

```
The script ran
The script ran
The script ran
```

Each time a widget changes, Streamlit runs the whole script again, top to bottom. `print` goes to the terminal, so it shows every rerun.

---

## Raw Strings: `r""`

```python
print("C:\new\table")
print(r"C:\new\table")
```

```
C:
ew	able
C:\new\table
```

Python reads `\n` as a new line and `\t` as a tab. An `r` before the quotes makes a **raw string**, which keeps each `\` as typed.

---

## The Math: `st.latex`

<style scoped>
pre { font-size: 0.7em; }
</style>

```python
st.latex(rf"\text{{tip}} = {bill:.2f} \times \dfrac{{{percent}}}{{100}} = {tip:.2f}")
st.latex(rf"\text{{total}} = {bill:.2f} + {tax:.2f} + {tip:.2f} = {total:.2f}")
```

`st.latex` draws math written in **LaTeX**<sup>1</sup>, and the numbers update with every rerun. LaTeX commands start with `\`, so `rf` makes a [raw string](14-streamlit.html#15) that is also an f-string, and `{{` writes one `{`.

<div class="footnote">1. Overleaf's <a href="https://www.overleaf.com/learn/latex/Mathematical_expressions">Mathematical expressions</a> guide shows how to write math in LaTeX.</div>

---

## Tip on the Tax: `st.radio`

```python
choice = st.radio("Tip on", ["Bill", "Bill plus tax"])
amount = bill
if choice == "Bill plus tax":
    amount = bill + tax
tip = amount * percent / 100
```

`st.radio` returns the option picked, like `st.selectbox`. These lines replace the old `tip` line, and `amount` replaces `bill` in the formula.

---

## Side by Side: `st.metric` and `st.columns`

```python
left, middle, right = st.columns(3)
with left:
    st.metric("Tax", f"${tax:.2f}")
with middle:
    st.metric("Tip", f"${tip:.2f}")
with right:
    st.metric("Total", f"${total:.2f}")
```

`st.metric` shows one value in large type. Anything inside a column's `with` block lands in that column, as [`with open`](10-exceptions-and-files.html#17) scoped a file.

---

## Split the Bill: `st.checkbox`

```python
if st.checkbox("Split the bill"):
    people = st.number_input("People", min_value=2, max_value=12, value=2)
    st.write(f"Each person pays ${total / people:.2f}")
```

`st.checkbox` returns `True` when checked, so the box for people appears only then. Whole-number arguments make `st.number_input` return an `int`.

---

## Pay: `st.button`

```python
if st.button("Pay"):
    st.balloons()
```

A click reruns the script, and `st.button` returns `True` on that one rerun only.

---

## The Full Tip Calculator: Inputs

<style scoped>
pre { font-size: 0.75em; }
</style>

```python
import streamlit as st

rates = {"Pennsylvania": 6.0, "New Jersey": 6.625, "Delaware": 0.0}

st.title("Tip Calculator")

bill = st.number_input("Bill ($)", min_value=0.0, value=40.00, step=0.25)
state = st.selectbox("State", rates.keys())
tax = bill * rates[state] / 100

percent = st.slider("Tip (%)", 0, 30, 20)
choice = st.radio("Tip on", ["Bill", "Bill plus tax"])
amount = bill
if choice == "Bill plus tax":
    amount = bill + tax
tip = amount * percent / 100
total = bill + tax + tip
```

---

## The Full Tip Calculator: Results

<style scoped>
pre { font-size: 0.7em; }
</style>

```python
st.latex(rf"\text{{tip}} = {amount:.2f} \times \dfrac{{{percent}}}{{100}} = {tip:.2f}")
st.latex(rf"\text{{total}} = {bill:.2f} + {tax:.2f} + {tip:.2f} = {total:.2f}")

left, middle, right = st.columns(3)
with left:
    st.metric("Tax", f"${tax:.2f}")
with middle:
    st.metric("Tip", f"${tip:.2f}")
with right:
    st.metric("Total", f"${total:.2f}")

if st.checkbox("Split the bill"):
    people = st.number_input("People", min_value=2, max_value=12, value=2)
    st.write(f"Each person pays ${total / people:.2f}")

if st.button("Pay"):
    st.balloons()
```

---

## The Finished Tip Calculator

[Tip Calculator](https://230-app-example-tip-app-4mzdzanoh7kt3yvvjsmbtp.streamlit.app/) is the finished page, and [`app.py`](https://github.com/bi3mer/230-streamlit-example-tip-app/blob/main/app.py) is its full code.

---

## Earthquakes

---

## A Preview of pandas

**pandas** is a library for working with tables of data. We use it here for convenience: it reads and filters this file in a few lines.

Treat those lines as a preview. [The next lecture](15-pandas.html) explains how they work.

---

## Reading Live Data

<style scoped>
pre { font-size: 0.75em; }
</style>

```python
import pandas as pd
import streamlit as st

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.csv"
quakes = pd.read_csv(url)
quakes = quakes[quakes["type"] == "earthquake"]
```

The US Geological Survey publishes this CSV file, and `pd.read_csv` reads it straight from the URL. The file also lists events like quarry blasts, so the last line keeps only earthquakes.

---

## The Title

<style scoped>
pre { font-size: 0.7em; }
</style>

```python
st.title("Earthquakes This Week")
first = quakes["time"].min()[:10]
last = quakes["time"].max()[:10]
st.write(f"Every earthquake the US Geological Survey recorded from {first} to {last}.")
```

Each time is a string like `2026-11-04T12:53:43.253Z`, so `[:10]` keeps the date.

---

## Filters: `st.sidebar` and `st.text_input`

```python
with st.sidebar:
    st.header("Filters")
    smallest = st.slider("Smallest magnitude", 0.0, 7.0, 2.5, step=0.1)
    place = st.text_input("Place")

shown = quakes[quakes["mag"] >= smallest]
shown = shown[shown["place"].str.contains(place, case=False, regex=False)]
```

Anything inside `with st.sidebar:` goes in the panel down the left edge. `st.text_input` draws a text box and returns what is in it, `""` at first.

---

## No Matches: `st.warning`

```python
if len(shown) == 0:
    st.warning("No earthquakes match.")
else:
    left, right = st.columns(2)
    with left:
        st.metric("Earthquakes", len(shown))
    with right:
        st.metric("Strongest", shown["mag"].max())
```

`st.warning` shows a yellow box. Everything from here on goes inside the `else`.

---

## The Map: `st.map`

```python
quakes["size"] = 30 * 10 ** (0.75 * quakes["mag"])
```

```python
st.map(shown, size="size", zoom=0)
```

`st.map` finds the `latitude` and `longitude` columns and draws a dot for each row. `size` names the column that sets each dot's radius, so a dot's area grows with the energy of its earthquake.

---

## The Chart: `st.bar_chart`

```python
st.header("Magnitude")
magnitudes = range(0, round(quakes["mag"].max()) + 1)
counts = shown["mag"].round().astype(int).value_counts()
st.bar_chart(
    counts.reindex(magnitudes, fill_value=0),
    x_label="Magnitude",
    y_label="Earthquakes",
)
```

`counts` holds how many earthquakes fall at each whole magnitude, and `reindex` adds a zero for any magnitude with none.

---

## The Table: `st.dataframe`

```python
st.header("The Data")
st.dataframe(shown[["time", "place", "mag", "depth"]])
```

`st.dataframe` draws a table. Clicking a column's name sorts by it.

---

## The Full Earthquake App

[Earthquakes This Week](https://bi3mer-230-streamlit-earthquake-example-app-vlrwj8.streamlit.app/) is the finished page, and [`app.py`](https://github.com/bi3mer/230-streamlit-earthquake-example/blob/main/app.py) is its full code.

---

## Summary

<style scoped>
ul { font-size: 0.85em; }
</style>

- **Streamlit** turns a script into a web page; start it with `python3 -m streamlit run app.py`
- `st.title`, `st.header`, and `st.write` put text on the page, and `st.latex` draws math
- A **widget** returns its current value: `st.number_input` and `st.slider` a number, `st.text_input` a string, `st.selectbox` and `st.radio` the option picked, `st.checkbox` a `bool`
- `st.button` is `True` only on the rerun right after a click
- Every widget change reruns the whole script, top to bottom
- `st.metric` shows one value, and `st.warning` shows a yellow box
- `st.columns` and `st.sidebar` lay out the page with `with` blocks
- `st.map`, `st.bar_chart`, and `st.dataframe` draw data

---

## Next Up: Tables with pandas

- [Tables with pandas](15-pandas.html)
- [Streamlit's documentation](https://docs.streamlit.io) lists every widget
