---
marp: true
theme: lecture
paginate: true
---

# Tables with pandas

Colan Biemer

---

## `import pandas as pd`

```python
import pandas as pd

print(pd.__version__)   # 3.1.1
```

**pandas** is a library for tables of data. Install it once from the terminal with `python3 -m pip install pandas` (Mac) or `py -m pip install pandas` (Windows). `as pd` names the module `pd`.

---

## Series

---

## What Is a Series?

```python
import pandas as pd

sales = pd.Series([50, 75, 60])
print(sales)
```

```
0    50
1    75
2    60
dtype: int64
```

A **Series** is one column of values, each with a label. The labels are its **index**, and they count from 0 unless we name them. `dtype` is the type of the values.

---

## Naming the Index

```python
import pandas as pd

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
sales = pd.Series([50, 75, 60, 90, 40], index=days)

print(sales["Wed"])   # 60
print(sales)
```

```
Mon    50
Tue    75
Wed    60
Thu    90
Fri    40
dtype: int64
```

With named labels, a Series reads like a [dictionary](12-dictionaries.html#4): `sales["Wed"]` looks up a value by its label.

---

## Math on Every Value

```python
import pandas as pd

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
sales = pd.Series([50, 75, 60, 90, 40], index=days)

print(sales * 2)
```

```
Mon    100
Tue    150
Wed    120
Thu    180
Fri     80
dtype: int64
```

`sales * 2` doubles every value with no loop and gives back a new Series. `+`, `-`, and `/` work the same way, and `.round(2)` rounds every value to two places.

---

## Any Function on Every Value: `apply`

<div class="cols">
<div>

```python
import pandas as pd

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
sales = pd.Series([50, 75, 60, 90, 40], index=days)

def dollars(s):
    return f"${s:.2f}"

print(sales.apply(dollars))
print(sales.apply(lambda s: f"${s:.2f}"))
```

</div>
<div>

```
Mon    $50.00
Tue    $75.00
Wed    $60.00
Thu    $90.00
Fri    $40.00
dtype: str
```

</div>
</div>

`apply` calls a [function](07-functions.html) on every value and gives back a new Series. Both lines print the same thing. A **`lambda`** is a function with no name: it takes `s` and gives back the expression after the colon.

---

## Summing Up a Series

```python
import pandas as pd

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
sales = pd.Series([50, 75, 60, 90, 40], index=days)

print(sales.sum())      # 315
print(sales.mean())     # 63.0
print(sales.max())      # 90
print(sales.idxmax())   # Thu
```

`idxmax` gives the label of the largest value, which took [a loop and two variables](12-dictionaries.html#22) with a dictionary. `min` and `idxmin` find the smallest.

---

## Comparing Every Value

```python
import pandas as pd

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
sales = pd.Series([50, 75, 60, 90, 40], index=days)

print(sales > 55)
print(sales[sales > 55])
```

<div class="cols">
<div>

```
Mon    False
Tue     True
Wed     True
Thu     True
Fri    False
dtype: bool
```

</div>
<div>

```
Tue    75
Wed    60
Thu    90
dtype: int64
```

</div>
</div>

`sales > 55` compares every value. A Series of `True` and `False` inside the brackets keeps the values marked `True`.

---

## Problem: What Is the Output?

```python
import pandas as pd

items = ["coffee", "tea", "bagel"]
prices = pd.Series([3.00, 2.50, 2.75], index=items)
sale = prices - 0.50

print(sale["tea"])
print(sale.max())
print(len(prices[prices > 2.60]))
```

---

## Solution: What Is the Output?

```
2.0
2.5
2
```

`sale` is a new Series, every price minus `0.50`, and `prices` stays the same. Two of the original prices are over `2.60`.

---

## Problem: Slow Days

```python
import pandas as pd

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
sales = pd.Series([50, 75, 60, 90, 40], index=days)

# Print the days with sales under 55, then the day
# with the lowest sales.
```

```
Mon    50
Fri    40
dtype: int64
Lowest: Fri
```

---

## Solution: Slow Days

```python
import pandas as pd

days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
sales = pd.Series([50, 75, 60, 90, 40], index=days)

print(sales[sales < 55])
print(f"Lowest: {sales.idxmin()}")
```

`sales < 55` marks each day `True` or `False`, and the brackets keep the `True` days. `idxmin` gives the label, not the value.

---

## DataFrames

---

## What Is a DataFrame?

```python
import pandas as pd

df = pd.DataFrame({
    "name": ["Ada", "Grace", "Alan"],
    "major": ["CS", "Math", "CS"],
    "score": [90, 85, 77],
})
print(df)
```

```
    name major  score
0    Ada    CS     90
1  Grace  Math     85
2   Alan    CS     77
```

A **DataFrame** is a table: named columns that are each a Series, sharing one index that labels the rows. Each key in the [dictionary of lists](13-records-and-sets.html#8) becomes a column.

---

## Picking Columns

```python
import pandas as pd

df = pd.DataFrame({
    "name": ["Ada", "Grace", "Alan"],
    "major": ["CS", "Math", "CS"],
    "score": [90, 85, 77],
})
print(df["score"])
print(df[["name", "score"]])
```

<div class="cols">
<div>

```
0    90
1    85
2    77
Name: score, dtype: int64
```

</div>
<div>

```
    name  score
0    Ada     90
1  Grace     85
2   Alan     77
```

</div>
</div>

One name gives a Series, so `df["score"].mean()` works. A list of names gives a smaller DataFrame.

---

## A Column That Is Not There

```python
import pandas as pd

df = pd.DataFrame({
    "name": ["Ada", "Grace", "Alan"],
    "major": ["CS", "Math", "CS"],
    "score": [90, 85, 77],
})
try:
    print(df["Score"])
except KeyError as error:
    print(f"No column {error}")
```

```
No column 'Score'
```

Column names are keys, so a missing one raises a [`KeyError`](12-dictionaries.html#7). Capital letters count: `"Score"` is not `"score"`.

---

## Reading CSV Files

---

## Reading a CSV File

```python
import os
import pandas as pd

df = pd.read_csv(os.path.join("data", "sales.csv"))
print(df)
```

```
  product        date  price  quantity
0    P-01  2023-01-01   9.95         5
1    P-02  2023-01-02  10.50         2
2    P-01  2023-01-03   9.85         4
3    P-02  2023-01-04  10.60         3
4    P-01  2023-01-05   9.95         1
```

`read_csv` takes the column names from the first line and makes a row from each line after it, with no [`readline`, `split`, or `float`](10-exceptions-and-files.html#31). The 0 to 4 on the left are labels that pandas adds.

---

## The Size of a Table

```python
import os
import pandas as pd

df = pd.read_csv(os.path.join("data", "sales.csv"))

print(len(df))            # 5
print(df.shape)           # (5, 4)
print(list(df.columns))   # ['product', 'date', 'price', 'quantity']
```

`len` counts the rows, and `shape` is a [tuple](09-changing-lists.html#37) of the rows and the columns. `columns` holds the column names.

---

## `head` and `tail`

```python
import os
import pandas as pd

df = pd.read_csv(os.path.join("data", "sales.csv"))

print(df.head(2))
print(df.tail(2))
```

```
  product        date  price  quantity
0    P-01  2023-01-01   9.95         5
1    P-02  2023-01-02  10.50         2
  product        date  price  quantity
3    P-02  2023-01-04  10.60         3
4    P-01  2023-01-05   9.95         1
```

`head(2)` gives the first two rows and `tail(2)` the last two. With no number, each gives five rows, a quick look at a file too long to print.

---

## Column Types

```python
import os
import pandas as pd

df = pd.read_csv(os.path.join("data", "sales.csv"))
print(df.dtypes)
```

```
product         str
date            str
price       float64
quantity      int64
dtype: object
```

`read_csv` picks each column's type from its values. `float64` and `int64` are pandas's `float` and `int`; pandas before 3.0 prints `object` for strings.

---

## `describe`

```python
import os
import pandas as pd

df = pd.read_csv(os.path.join("data", "sales.csv"))
print(df.describe())
```

```
          price  quantity
count   5.00000  5.000000
mean   10.17000  3.000000
std     0.35107  1.581139
min     9.85000  1.000000
25%     9.95000  2.000000
50%     9.95000  3.000000
75%    10.50000  4.000000
max    10.60000  5.000000
```

`describe` summarizes each number column. `50%` is the median, the middle value.

---

## Missing Values: `NaN`

```python
import os
import pandas as pd

df = pd.read_csv(os.path.join("data", "prices.csv"))
print(df)
print(df["price"].mean())   # 3.075
```

```
     item  price
0  coffee    3.0
1   bagel    2.5
2     tea    NaN
3  muffin    2.8
4   juice    4.0
```

`read_csv` turns `n/a`, `NA`, and empty fields into **`NaN`**, "not a number," which marks a missing value. `mean` skips it and averages the other four.

---

## Problem: What Is the Output?

```python
import os
import pandas as pd

df = pd.read_csv(os.path.join("data", "measures.txt"))
print(df)
print(len(df))
```

`measures.txt` holds `10.1`, `9.9`, and `9.8`, one per line.

---

## Solution: What Is the Output?

```
   10.1
0   9.9
1   9.8
2
```

`read_csv` takes the first line as the column names, so `10.1` names the column and two rows are left. The `.txt` ending does not matter.

---

## A File with No Header Line

```python
import os
import pandas as pd

path = os.path.join("data", "measures.txt")
df = pd.read_csv(path, header=None, names=["measure"])
print(df)
print(df["measure"].sum())   # 29.8
```

```
   measure
0     10.1
1      9.9
2      9.8
```

`header=None` says the first line is data, not column names. `names` names the columns; without it, they are numbered from 0.

---

## Problem: What Is the Output?

<div class="cols">
<div>

```
item;count;price
coffee;12;3.00
bagel;30;2.50
muffin;8;2.80
```

</div>
<div>

```python
import pandas as pd

df = pd.read_csv("inventory.txt")
print(df.shape)
print(list(df.columns))
```

</div>
</div>

`inventory.txt` is on the left.

---

## Solution: What Is the Output?

```
(3, 1)
['item;count;price']
```

`read_csv` splits each line on commas, and this file has none. Each line becomes one value, so the table has three rows and a single column named `item;count;price`.

---

## Other Separators: `sep`

```python
import pandas as pd

df = pd.read_csv("inventory.txt", sep=";")
print(df)
```

```
     item  count  price
0  coffee     12    3.0
1   bagel     30    2.5
2  muffin      8    2.8
```

`sep` names the character between the values, as [`split`](06-strings-and-format-strings.html#86) took one. `sep="\t"` reads a file split by tabs.

---

## Skipping Comments: `comment`

<div class="cols">
<div>

```
# Temperatures from the roof sensor
# One reading every hour
hour,temp
9,61.2
10,63.0
# sensor reset here
11,64.5
12,66.1  # warmest
```

</div>
<div>

```python
import pandas as pd

df = pd.read_csv("readings.csv",
                 comment="#")
print(df)
```

```
   hour  temp
0     9  61.2
1    10  63.0
2    11  64.5
3    12  66.1
```

</div>
</div>

`comment="#"` skips everything from `#` to the end of the line, as Python does with its own comments. Without it, the first line becomes a one-column header, and `read_csv` raises a `ParserError` at `hour,temp`, which has two fields.

---

## Problem: Score Report

```python
# Read data/scores.csv and print how many students there are,
# the average score, and the highest and lowest scores.
```

<div class="cols">
<div>

```
name,score
Ada,90
Grace,85
Alan,77
Linus,100
Barbara,68
```

</div>
<div>

```
Students: 5
Average: 84.0
Highest: 100
Lowest: 68
```

</div>
</div>

---

## Solution: Score Report

```python
import os
import pandas as pd

df = pd.read_csv(os.path.join("data", "scores.csv"))

print(f"Students: {len(df)}")
print(f"Average: {df['score'].mean()}")
print(f"Highest: {df['score'].max()}")
print(f"Lowest: {df['score'].min()}")
```

`df["score"]` is a Series, so `mean`, `max`, and `min` work on it. Inside the f-string, the column name takes single quotes.

---

## The Index

---

## The Index of a Table

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))

print(df.index)
print(list(df.index))
print(df.columns)
```

```
RangeIndex(start=0, stop=5, step=1)
[0, 1, 2, 3, 4]
Index(['product', 'date', 'price', 'quantity'], dtype='str')
```

A table's index holds its row labels, as `columns` holds its column names. With no index in the file, `read_csv` makes a `RangeIndex`: 0 up to `stop`, not counting `stop`.

---

## Rows by Label: `loc`

<div class="cols">
<div>

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))

print(df.loc[2])
print(df.loc[2, "price"])
```

</div>
<div>

```
product           P-01
date        2023-01-03
price             9.85
quantity             4
Name: 2, dtype: object
9.85
```

</div>
</div>

- `loc` finds a row by its label and gives it back as a Series, named by that label
- With a `RangeIndex`, the labels are the integers 0 to 4
- `loc[row, column]` reads one value
- Plain brackets pick columns, so `df[2]` raises a `KeyError`

---

## Choosing the Index: `index_col`

```python
path = os.path.join("data", "sales.csv")
df = pd.read_csv(path, index_col="date")
print(df)
```

```
           product  price  quantity
date
2023-01-01    P-01   9.95         5
2023-01-02    P-02  10.50         2
2023-01-03    P-01   9.85         4
2023-01-04    P-02  10.60         3
2023-01-05    P-01   9.95         1
```

`index_col="date"` makes the dates the row labels, and `date` is no longer a column. The second line, `date`, names the index.

---

## Dates as Labels

<div class="cols">
<div>

```python
path = os.path.join("data", "sales.csv")
df = pd.read_csv(path, index_col="date")

print(df.loc["2023-01-03"])
print(df.loc["2023-01-03", "quantity"])
```

</div>
<div>

```
product     P-01
price       9.85
quantity       4
Name: 2023-01-03, dtype: object
4
```

</div>
</div>

With `date` as the index, the labels are the dates, read as strings, so `loc` takes a string like `"2023-01-03"`. The row is named by its label.

---

## Labels Can Repeat

```python
path = os.path.join("data", "sales.csv")
df = pd.read_csv(path, index_col="product")
print(df.loc["P-02"])
```

```
               date  price  quantity
product
P-02     2023-01-02   10.5         2
P-02     2023-01-04   10.6         3
```

Unlike dictionary keys, index labels can repeat. `loc` gives back every row with the label, as a table.

---

## Rows by Position: `iloc`

```python
path = os.path.join("data", "sales.csv")
df = pd.read_csv(path, index_col="date")

print(df.iloc[0, 0])    # P-01
print(df.iloc[-1, 2])   # 1
print(df.iloc[1:3])
```

```
           product  price  quantity
date
2023-01-02    P-02  10.50         2
2023-01-03    P-01   9.85         4
```

`iloc` counts positions from 0, whatever the labels, and [slices](09-changing-lists.html#3) like a list. `date` is the index, so `product` is column 0.

---

## Sorting by Label: `sort_index`

```python
path = os.path.join("data", "scores.csv")
df = pd.read_csv(path, index_col="name")

df = df.sort_index()
print(df)
```

```
         score
name
Ada         90
Alan        77
Barbara     68
Grace       85
Linus      100
```

`sort_index` sorts the rows by label, so the names are now in alphabetical order.

---

## Problem: What Is the Output?

<div class="cols">
<div>

```
name,score
Ada,90
Grace,85
Alan,77
Linus,100
Barbara,68
```

</div>
<div>

```python
path = os.path.join("data", "scores.csv")
df = pd.read_csv(path, index_col="name")

print(df.loc["Alan", "score"])
print(df.iloc[1, 0])
print(df.sort_index().iloc[-1, 0])
```

</div>
</div>

`scores.csv` is on the left.

---

## Solution: What Is the Output?

```
77
85
100
```

`name` is the index, so `score` is column 0. `iloc` counts in file order, so row 1 is Grace. Sorted by name, Linus comes last.

---

## Problem: One Product's Sales

```python
# Read data/sales.csv with the products as the index. Print
# every P-01 sale, then the total quantity of P-01.
```

```
               date  price  quantity
product
P-01     2023-01-01   9.95         5
P-01     2023-01-03   9.85         4
P-01     2023-01-05   9.95         1
Total quantity: 10
```

---

## Solution: One Product's Sales

```python
path = os.path.join("data", "sales.csv")
df = pd.read_csv(path, index_col="product")

p01 = df.loc["P-01"]
print(p01)
print(f"Total quantity: {p01.quantity.sum()}")
```

`p01.quantity` works like `p01["quantity"]`, but we can't use `df.product`, because [`product`](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.product.html) is already a DataFrame method.

---

## Filtering Rows

---

## Filtering a Table

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))
print(df[df["quantity"] > 2])
```

```
  product        date  price  quantity
0    P-01  2023-01-01   9.95         5
2    P-01  2023-01-03   9.85         4
3    P-02  2023-01-04  10.60         3
```

`df["quantity"] > 2` is a Series of `True` and `False`, one for each row. The table keeps the rows marked `True`, as [a Series did](#9). `df[df["product"] == "P-01"]` finds the P-01 sales without `index_col`.

---

## Both Conditions: `&`

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))
print(df[(df["product"] == "P-01") & (df["quantity"] > 2)])
```

```
  product        date  price  quantity
0    P-01  2023-01-01   9.95         5
2    P-01  2023-01-03   9.85         4
```

`&` keeps a row when both conditions are `True`, like `and`. Each condition needs its own parentheses.

---

## Either Condition: `|`

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))
print(df[(df["quantity"] < 2) | (df["price"] > 10.5)])
```

```
  product        date  price  quantity
3    P-02  2023-01-04  10.60         3
4    P-01  2023-01-05   9.95         1
```

`|` keeps a row when either condition is `True`, like `or`. Row 4 sold fewer than 2, and row 3 cost more than 10.5.

---

## Flipping a Condition: `~`

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))
print(df[~(df["product"] == "P-01")])
```

```
  product        date  price  quantity
1    P-02  2023-01-02   10.5         2
3    P-02  2023-01-04   10.6         3
```

`~` flips every `True` to `False` and back, like `not`, so this keeps the rows that are not P-01. Here `df["product"] != "P-01"` does the same.

---

## Problem: Find the Bug

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))

print(df[df["quantity"] > 2 and df["product"] == "P-01"])
```

---

## Solution: Find the Bug

```
ValueError: The truth value of a Series is ambiguous. Use a.empty,
a.item(), a.any() or a.all().
```

`and` needs one `True` or `False`, and a Series holds five. Write `(df["quantity"] > 2) & (df["product"] == "P-01")`.

---

## Matching a List: `isin`

```python
df = pd.read_csv(os.path.join("data", "products.csv"))

wanted = ["P-001", "P-010", "Q-011"]
print(df[df["product-id"].isin(wanted)])
```

```
  product-id division  price
0      P-001     diva   5.50
4      P-010     divb  10.25
6      Q-011     divb  11.50
```

`isin` marks a row `True` when its value is [`in`](08-lists.html#41) the list, without a chain of `|`.

---

## Strings in a Column

```python
df = pd.read_csv(os.path.join("data", "prices.csv"))
print(df[df["item"].find("a") != -1])
```

```
AttributeError: 'Series' object has no attribute 'find'
```

We want the items with an `a` in them. `find` is a method of a string, but `df["item"]` is a Series, and a Series has no `find`.

---

## String Columns: `.str`

```python
df = pd.read_csv(os.path.join("data", "prices.csv"))
print(df[df["item"].str.find("a") != -1])
```

```
    item  price
1  bagel    2.5
2    tea    NaN
```

`.str` runs a [string method](06-strings-and-format-strings.html#90) on every value in the column, so `.str.find("a")` gives each item's position of `a`, or `-1`. `.str[:5]` [slices](06-strings-and-format-strings.html#77) every value, and `startswith`, `endswith`, `lower`, and `strip` work too.

---

## Problem: What Is the Output?

<div class="cols">
<div>

```
product-id,division,price
P-001,diva,5.50
P-001x,diva,5.95
P-002,diva,6.50
P-002x,diva,6.95
P-010,divb,10.25
P-010x,divb,10.75
Q-011,divb,11.50
Q-011x,divb,11.95
```

</div>
<div>

```python
path = os.path.join("data", "products.csv")
df = pd.read_csv(path)

divb = df[df["division"] == "divb"]
print(len(divb))
print(divb["price"].min())
print(divb.iloc[0, 0])
```

</div>
</div>

---

## Solution: What Is the Output?

```
4
10.25
P-010
```

`divb` keeps its old labels, 4 to 7, but `iloc[0, 0]` counts by position: the first row and the first column.

---

## Changing a Table

---

## Adding a Column

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))
df["revenue"] = df["price"] * df["quantity"]
print(df)
```

```
  product        date  price  quantity  revenue
0    P-01  2023-01-01   9.95         5    49.75
1    P-02  2023-01-02  10.50         2    21.00
2    P-01  2023-01-03   9.85         4    39.40
3    P-02  2023-01-04  10.60         3    31.80
4    P-01  2023-01-05   9.95         1     9.95
```

Assigning to a new column name adds the column, as assigning to a new key [adds a pair](12-dictionaries.html#5). The math runs row by row.

---

## Changing a Column

```python
df = pd.read_csv(os.path.join("data", "prices.csv"))
df["price"] = (df["price"] * 1.10).round(2)
print(df)
```

```
     item  price
0  coffee   3.30
1   bagel   2.75
2     tea    NaN
3  muffin   3.08
4   juice   4.40
```

Assigning to a column that exists replaces it. `NaN` times `1.10` is still `NaN`, so the missing price stays missing.

---

## Dropping Rows with `NaN`

```python
df = pd.read_csv(os.path.join("data", "prices.csv"))
print(df.dropna())
```

```
     item  price
0  coffee    3.0
1   bagel    2.5
3  muffin    2.8
4   juice    4.0
```

`dropna` gives back a new table without the rows that have a `NaN`. Row `2` is gone, and the other rows keep their labels.

---

## Sorting: `sort_values`

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))
df["revenue"] = df["price"] * df["quantity"]

df = df.sort_values("revenue", ascending=False)
print(df.head(3))
```

```
  product        date  price  quantity  revenue
0    P-01  2023-01-01   9.95         5    49.75
2    P-01  2023-01-03   9.85         4    39.40
3    P-02  2023-01-04  10.60         3    31.80
```

`sort_values` gives back a new table sorted by one column, smallest first, and leaves `df` as it was. To get largest first, use `ascending=False`.

---

## Dropping Columns

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))
df = df.drop(columns=["date", "price"])
print(df)
```

```
  product  quantity
0    P-01         5
1    P-02         2
2    P-01         4
3    P-02         3
4    P-01         1
```

`drop` gives back a new table without the listed columns.

---

## Writing a CSV File

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))
df.to_csv(os.path.join("data", "new_sales.csv"))
```

```
,product,date,price,quantity
0,P-01,2023-01-01,9.95,5
1,P-02,2023-01-02,10.5,2
2,P-01,2023-01-03,9.85,4
3,P-02,2023-01-04,10.6,3
4,P-01,2023-01-05,9.95,1
```

`to_csv` writes the table to a file. It also writes the index, the row labels 0 to 4, as a first column with no name, so the header starts with a comma.

---

## Leaving Out the Index: `index=False`

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))
# modifications...
df.to_csv(os.path.join("data", "new_sales.csv"), index=False)
```

`index=False` leaves the index out, so the file has only the table's columns. Read, change, then write: the changes we make in pandas are saved.

---

## Problem: Raise the Prices

```python
# Copy prices.csv (left) to new_prices.csv (right) with every
# price raised 10%, to the cent. Leave out rows with no price.
```

<div class="cols">
<div>

```
item,price
coffee,3.00
bagel,2.50
tea,n/a
muffin,2.80
juice,4.00
```

</div>
<div>

```
item,price
coffee,3.3
bagel,2.75
muffin,3.08
juice,4.4
```

</div>
</div>

[We wrote this](10-exceptions-and-files.html#38) with two files open and a `try`.

---

## Solution: Raise the Prices

```python
df = pd.read_csv(os.path.join("data", "prices.csv"))
df = df.dropna()
df["price"] = (df["price"] * 1.10).round(2)
df.to_csv("new_prices.csv", index=False)
```

`dropna` removes the `tea` row, and the math runs on every price at once. `to_csv` drops trailing zeros, so `3.30` is written as `3.3`.

---

## Counting and Pivot Tables

---

## Counting Values: `value_counts`

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))
print(df["product"].value_counts())
```

```
product
P-01    3
P-02    2
Name: count, dtype: int64
```

`value_counts` counts how often each value appears.

---

## What Is a Pivot Table?

<div class="cols">
<div>

```
product  quantity
P-01            5
P-02            2
P-01            4
P-02            3
P-01            1
```

</div>
<div>

```
product  quantity
P-01           10
P-02            5
```

</div>
</div>

- A **pivot table** summarizes a table with one row for each group
- Pick a column to group by (`product`), a column to combine (`quantity`), and how to combine it (add them up)

---

## Pivot Tables: `pivot_table`

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))
print(df.pivot_table(index="product", values="quantity", aggfunc="sum"))
```

```
         quantity
product          
P-01           10
P-02            5
```

- `index`: the column to group by
- `values`: the column to combine
- `aggfunc`: how to combine it. Without it, `pivot_table` takes the `mean`, so P-01 would be `3.333333`

---

## Pivot Table Columns

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))
print(df.pivot_table(index="date", columns="product",
                     values="quantity", aggfunc="sum", fill_value=0))
```

```
product     P-01  P-02
date                  
2023-01-01     5     0
2023-01-02     0     2
2023-01-03     4     0
2023-01-04     0     3
2023-01-05     1     0
```

- `columns`: a second column to group by, with one column of the result for each value
- `fill_value`: what to put in an empty cell. No P-02 sold on January 1st, so without it that cell would be `NaN`

---

## Your Own `aggfunc`: `lambda`

```python
df = pd.read_csv(os.path.join("data", "sales.csv"))
print(df.pivot_table(index="product", values="quantity",
                     aggfunc=lambda q: q.max() - q.min()))
```

```
         quantity
product          
P-01            4
P-02            1
```

`aggfunc` takes any function, so a [`lambda`](#7) works too. `pivot_table` calls it once per product, with that product's quantities as a Series, so `q.max() - q.min()` is the spread.

---

## Problem: Upgrade Prices

Read `data/products.csv` and print the average price in each division, with the upgrades (ids ending in `x`) in one column and the rest in another.

```
upgrade    False  True 
division               
diva       6.000   6.45
divb      10.875  11.35
```

---

## Solution: Upgrade Prices

```python
df = pd.read_csv(os.path.join("data", "products.csv"))
df["upgrade"] = df["product-id"].str.endswith("x")
print(df.pivot_table(index="division", columns="upgrade", values="price"))
```

The table has no `upgrade` column, so add one first: `.str.endswith` marks each row `True` or `False`. `aggfunc` is left out, so each cell is the `mean`.

---

## Next Up: Visualization

- Charts from DataFrames
- The [10 minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html) guide is a great resource
