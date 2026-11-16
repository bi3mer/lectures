---
marp: true
theme: lecture
paginate: true
---

# Tables with pandas

Colan Biemer

---

## Sales by Product, Again

<div class="cols">
<div>

```python
import os

totals = {}
path = os.path.join("data", "sales.csv")
with open(path, "r") as f:
    f.readline()
    for line in f:
        fields = line.strip().split(",")
        product = fields[0]
        units = int(fields[3])
        if product not in totals:
            totals[product] = 0
        totals[product] += units

print(totals)
```

</div>
<div>

```python
import os
import pandas as pd

path = os.path.join("data", "sales.csv")
sales = pd.read_csv(path)
print(sales.groupby("product")["quantity"].sum())
```

</div>
</div>

Both add up the units of [each product](12-dictionaries.html#28). By the end of today, the right side will make sense.

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

## Problem: Slow Days (you)

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

## Solution: Slow Days (you)

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

scores = pd.DataFrame({
    "name": ["Ada", "Grace", "Alan"],
    "score": [90, 85, 77],
})
print(scores)
```

```
    name  score
0    Ada     90
1  Grace     85
2   Alan     77
```

A **DataFrame** is a table: rows with an index, and named columns that are each a Series. Each key in the [dictionary of lists](13-records-and-sets.html#8) becomes a column.

---

## Reading a CSV File

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))
print(sales)
```

```
  product        date  price  quantity
0    P-01  2023-01-01   9.95         5
1    P-02  2023-01-02  10.50         2
2    P-01  2023-01-03   9.85         4
3    P-02  2023-01-04  10.60         3
4    P-01  2023-01-05   9.95         1
```

`read_csv` takes the column names from the first line and makes a row from each line after it, with no [`readline`, `split`, or `float`](10-exceptions-and-files.html#31).

---

## The Size of a Table

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))

print(len(sales))            # 5
print(sales.shape)           # (5, 4)
print(list(sales.columns))   # ['product', 'date', 'price', 'quantity']
```

`len` counts the rows, and `shape` is a [tuple](09-changing-lists.html#37) of the rows and the columns. `columns` holds the column names.

---

## `head` and `tail`

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))

print(sales.head(2))
print(sales.tail(2))
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

sales = pd.read_csv(os.path.join("data", "sales.csv"))
print(sales.dtypes)
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

sales = pd.read_csv(os.path.join("data", "sales.csv"))
print(sales.describe())
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

prices = pd.read_csv(os.path.join("data", "prices.csv"))
print(prices)
print(prices["price"].mean())   # 3.075
```

```
     item  price
0  coffee    3.0
1   bagel    2.5
2     tea    NaN
3  muffin    2.8
4   juice    4.0
```

`read_csv` turns `n/a` into **`NaN`**, "not a number," which marks a missing value. `mean` skips it and averages the other four.

---

## A Missing File

```python
import os
import pandas as pd

path = os.path.join("data", "sale.csv")
try:
    sales = pd.read_csv(path)
    print(sales)
except FileNotFoundError as error:
    print(error)
```

```
[Errno 2] No such file or directory: 'data/sale.csv'
```

`read_csv` raises the same [`FileNotFoundError`](10-exceptions-and-files.html#24) as `open`.

---

## Problem: Score Report (us)

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

- Which column holds the numbers?
- Which methods from the Series slides apply?

---

## Solution: Score Report (us)

```python
import os
import pandas as pd

scores = pd.read_csv(os.path.join("data", "scores.csv"))

print(f"Students: {len(scores)}")
print(f"Average: {scores['score'].mean()}")
print(f"Highest: {scores['score'].max()}")
print(f"Lowest: {scores['score'].min()}")
```

`scores["score"]` is a Series, so `mean`, `max`, and `min` work on it. Inside the f-string, the column name takes single quotes.

---

## Selecting Rows and Columns

---

## Picking Columns

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))

print(sales["price"])
print(sales[["product", "quantity"]])
```

<div class="cols">
<div>

```
0     9.95
1    10.50
2     9.85
3    10.60
4     9.95
Name: price, dtype: float64
```

</div>
<div>

```
  product  quantity
0    P-01         5
1    P-02         2
2    P-01         4
3    P-02         3
4    P-01         1
```

</div>
</div>

One name gives a Series. A list of names gives a smaller DataFrame: the inner brackets make the list, and the outer brackets pick the columns.

---

## A Column That Is Not There

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))

try:
    print(sales["Price"])
except KeyError as error:
    print(f"No column {error}")
```

```
No column 'Price'
```

Column names are keys, so a missing one raises a [`KeyError`](12-dictionaries.html#7). Capital letters count: `"Price"` is not `"price"`.

---

## Rows by Position: `iloc`

<style scoped>
.cols pre { font-size: 0.8em; }
</style>

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))

print(sales.iloc[0])
print(sales.iloc[1:3])
```

<div class="cols">
<div>

```
product           P-01
date        2023-01-01
price             9.95
quantity             5
Name: 0, dtype: object
```

</div>
<div>

```
  product        date  price  quantity
1    P-02  2023-01-02  10.50         2
2    P-01  2023-01-03   9.85         4
```

</div>
</div>

`iloc` counts rows by position, from 0, and [slices](09-changing-lists.html#3) like a list. One row comes back as a Series.

---

## Rows by Label: `loc`

```python
import os
import pandas as pd

scores = pd.read_csv(os.path.join("data", "scores.csv"))
print(scores.loc[3, "name"])   # Linus

by_name = scores.set_index("name")
print(by_name.loc["Grace", "score"])   # 85
```

`loc[row, column]` reads one value by its labels, as `iloc[row, column]` does by positions. `set_index("name")` makes the names the labels, so a row can be found by name.

---

## Filtering Rows

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))

big = sales["quantity"] > 2
print(sales[big])
```

```
  product        date  price  quantity
0    P-01  2023-01-01   9.95         5
2    P-01  2023-01-03   9.85         4
3    P-02  2023-01-04  10.60         3
```

`big` is a Series of `True` and `False`, one for each row. The table keeps the rows marked `True`, as [a Series did](#9).

---

## Two Conditions: `&` and `|`

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))

print(sales[(sales["product"] == "P-01") & (sales["quantity"] > 2)])
print(sales[(sales["quantity"] < 2) | (sales["price"] > 10.5)])
```

```
  product        date  price  quantity
0    P-01  2023-01-01   9.95         5
2    P-01  2023-01-03   9.85         4
  product        date  price  quantity
3    P-02  2023-01-04  10.60         3
4    P-01  2023-01-05   9.95         1
```

`&` means both and `|` means either, like `and` and `or`. Each condition needs its own parentheses.

---

## Problem: Find the Bug

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))

print(sales[sales["quantity"] > 2 and sales["product"] == "P-01"])
```

---

## Solution: Find the Bug

```
ValueError: The truth value of a Series is ambiguous. Use a.empty,
a.item(), a.any() or a.all().
```

`and` needs one `True` or `False`, and a Series holds five. Write `(sales["quantity"] > 2) & (sales["product"] == "P-01")`.

---

## Matching a List: `isin`

```python
import os
import pandas as pd

products = pd.read_csv(os.path.join("data", "products.csv"))

wanted = ["P-001", "P-010", "Q-011"]
print(products[products["product-id"].isin(wanted)])
```

```
  product-id division  price
0      P-001     diva   5.50
4      P-010     divb  10.25
6      Q-011     divb  11.50
```

`isin` marks a row `True` when its value is [`in`](08-lists.html#41) the list, without a chain of `|`.

---

## String Columns: `.str`

```python
import os
import pandas as pd

products = pd.read_csv(os.path.join("data", "products.csv"))

upgrades = products["product-id"].str.endswith("x")
print(products[upgrades])
```

```
  product-id division  price
1     P-001x     diva   5.95
3     P-002x     diva   6.95
5     P-010x     divb  10.75
7     Q-011x     divb  11.95
```

`.str` runs a [string method](06-strings-and-format-strings.html#90) on every value in the column, and `.str[:5]` [slices](06-strings-and-format-strings.html#77) every value. `startswith`, `lower`, and `strip` work too.

---

## Problem: What Is the Output?

```python
import os
import pandas as pd

products = pd.read_csv(os.path.join("data", "products.csv"))

divb = products[products["division"] == "divb"]
print(len(divb))
print(divb["price"].min())
print(divb.iloc[0, 0])
```

---

## Solution: What Is the Output?

```
4
10.25
P-010
```

`divb` keeps its old index, 4 to 7, but `iloc[0, 0]` counts by position: the first row and the first column.

---

## Problem: Top Student (us)

```python
# Read data/scores.csv. Print the student with the highest score,
# then the names of everyone at or above the average.
```

```
Top: Linus (100)
At or above average: ['Ada', 'Grace', 'Linus']
```

- Which method gives the label of the highest score?
- How do we keep only some rows, then only the names?

---

## Solution: Top Student (us)

```python
import os
import pandas as pd

scores = pd.read_csv(os.path.join("data", "scores.csv"))

best = scores["score"].idxmax()
print(f"Top: {scores.loc[best, 'name']} ({scores.loc[best, 'score']})")

above = scores[scores["score"] >= scores["score"].mean()]
print(f"At or above average: {list(above['name'])}")
```

`idxmax` gives the row's label, `3`, and `loc` reads that row's name and score. `list` turns the `name` column into a list.

---

## Problem: Pricey Products (you)

```python
# Read data/products.csv and print the product-id and price
# of every product that costs more than 10.
```

```
  product-id  price
4      P-010  10.25
5     P-010x  10.75
6      Q-011  11.50
7     Q-011x  11.95
```

- How do we keep only some rows?
- How do we keep only two columns?

---

## Solution: Pricey Products (you)

```python
import os
import pandas as pd

products = pd.read_csv(os.path.join("data", "products.csv"))

expensive = products[products["price"] > 10]
print(expensive[["product-id", "price"]])
```

Filter the rows first, then pick the columns with a list of names. The rows keep their old labels, 4 to 7.

---

## Changing a Table

---

## Adding a Column

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))
sales["revenue"] = sales["price"] * sales["quantity"]
print(sales)
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
import os
import pandas as pd

prices = pd.read_csv(os.path.join("data", "prices.csv"))
prices["price"] = (prices["price"] * 1.10).round(2)
print(prices)
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
import os
import pandas as pd

prices = pd.read_csv(os.path.join("data", "prices.csv"))
print(prices.dropna())
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
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))
sales["revenue"] = sales["price"] * sales["quantity"]

print(sales.sort_values("revenue", ascending=False).head(3))
```

```
  product        date  price  quantity  revenue
0    P-01  2023-01-01   9.95         5    49.75
2    P-01  2023-01-03   9.85         4    39.40
3    P-02  2023-01-04  10.60         3    31.80
```

`sort_values` sorts the rows by one column, smallest first. `ascending=False` flips it, and `head(3)` keeps the top three.

---

## Methods Give Back a New Table

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))

sales.sort_values("quantity")
print(list(sales["quantity"]))   # [5, 2, 4, 3, 1]

sales = sales.sort_values("quantity")
print(list(sales["quantity"]))   # [1, 2, 3, 4, 5]
```

Assigning to a column changes the table. Methods such as `sort_values`, `dropna`, and `head` leave it alone, as [`sorted`](09-changing-lists.html#25) left a list alone, so assign the result to keep it.

---

## Dropping and Renaming Columns

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))

sales = sales.drop(columns=["date"])
sales = sales.rename(columns={"quantity": "units"})
print(sales)
```

```
  product  price  units
0    P-01   9.95      5
1    P-02  10.50      2
2    P-01   9.85      4
3    P-02  10.60      3
4    P-01   9.95      1
```

`drop` removes the listed columns, and `rename` maps each old name to a new one.

---

## Writing a CSV File

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))
sales = sales.drop(columns=["date"])
sales.to_csv("no_dates.csv", index=False)
```

```
product,price,quantity
P-01,9.95,5
P-02,10.5,2
P-01,9.85,4
P-02,10.6,3
P-01,9.95,1
```

`to_csv` writes the table. Without `index=False`, each row starts with its label: `0,P-01,9.95,5`.

---

## Problem: Raise the Prices (us)

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

[We wrote this](10-exceptions-and-files.html#38) with two files open and a `try`. Which three pandas steps replace it?

---

## Solution: Raise the Prices (us)

```python
import os
import pandas as pd

prices = pd.read_csv(os.path.join("data", "prices.csv"))
prices = prices.dropna()
prices["price"] = (prices["price"] * 1.10).round(2)
prices.to_csv("new_prices.csv", index=False)
```

`dropna` removes the `tea` row, and the math runs on every price at once. `to_csv` drops trailing zeros, so `3.30` is written as `3.3`.

---

## Problem: Curve the Scores (you)

```python
# Copy scores.csv (left) to curved.csv (right) with a new
# curved column, 5 points over each score, highest first.
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
name,score,curved
Linus,100,105
Ada,90,95
Grace,85,90
Alan,77,82
Barbara,68,73
```

</div>
</div>

---

## Solution: Curve the Scores (you)

```python
import os
import pandas as pd

scores = pd.read_csv(os.path.join("data", "scores.csv"))
scores["curved"] = scores["score"] + 5
scores = scores.sort_values("curved", ascending=False)
scores.to_csv("curved.csv", index=False)
```

`sort_values` gives back a new table, so assign it before writing. `index=False` keeps the row labels out of the file.

---

## Grouping

---

## Counting: `value_counts`

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))
print(sales["product"].value_counts())
```

```
product
P-01    3
P-02    2
Name: count, dtype: int64
```

`value_counts` counts how many times each value appears, which took [a dictionary and a loop](12-dictionaries.html#24). The most common comes first.

---

## `groupby`

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))
print(sales.groupby("product")["quantity"].sum())
```

```
product
P-01    10
P-02     5
Name: quantity, dtype: int64
```

`groupby("product")` makes one group of rows per product. `["quantity"]` picks the column to add up, and `sum` adds each group's values into a Series indexed by product.

---

## How `groupby` Works

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
P-01: 5, 4, 1  ->  10
P-02: 2, 3     ->   5
```

</div>
</div>

Split the rows by product, sum each group's quantities, then combine the sums into one Series. The [slide that opened today](#2) does the same with a dictionary.

---

## Other Summaries

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))

print(sales.groupby("product")["price"].mean())
print(sales.groupby("product")["quantity"].agg(["sum", "mean", "max"]))
```

<div class="cols">
<div>

```
product
P-01     9.916667
P-02    10.550000
Name: price, dtype: float64
```

</div>
<div>

```
         sum      mean  max
product
P-01      10  3.333333    5
P-02       5  2.500000    3
```

</div>
</div>

`sum`, `mean`, `min`, `max`, and `count` all work after `groupby`. `agg` takes a list of them and gives back one column for each.

---

## Grouping Several Columns

```python
import os
import pandas as pd

sales = pd.read_csv(os.path.join("data", "sales.csv"))
sales["revenue"] = sales["price"] * sales["quantity"]

totals = sales.groupby("product")[["quantity", "revenue"]].sum()
print(totals)
print(totals.loc["P-01", "revenue"])   # 99.1
```

```
         quantity  revenue
product
P-01           10     99.1
P-02            5     52.8
```

[A list of columns](#26) gives back a DataFrame indexed by product, with the same numbers as the [`totals` dictionary](12-dictionaries.html#30).

---

## Problem: Price by Division (us)

```python
# Read data/products.csv. For each division, print how many
# products it has and its lowest and highest prices.
```

```
          count    min    max
division
diva          4   5.50   6.95
divb          4  10.25  11.95
```

- Which column do we group by?
- Which column do we summarize, and with what?

---

## Solution: Price by Division (us)

```python
import os
import pandas as pd

products = pd.read_csv(os.path.join("data", "products.csv"))
by_division = products.groupby("division")["price"]
print(by_division.agg(["count", "min", "max"]))
```

`count` counts each group's rows. One `agg` gives all three summaries.

---

## Problem: Priciest by Division (you)

```python
# Read data/products.csv. Print the highest price in each
# division, then the division with the priciest product.
```

```
division
diva     6.95
divb    11.95
Name: price, dtype: float64
Priciest: divb
```

- Which column do we group by, and which do we summarize?
- The result is a Series. Which method gives its label?

---

## Solution: Priciest by Division (you)

```python
import os
import pandas as pd

products = pd.read_csv(os.path.join("data", "products.csv"))

highest = products.groupby("division")["price"].max()
print(highest)
print(f"Priciest: {highest.idxmax()}")
```

`groupby` gives back a Series indexed by division, so `idxmax` gives the division, as it gave the day [on a Series](#8).

---

## Many Files: `pd.concat`

```python
import os
import pandas as pd

folder = os.path.join("data", "months")
frames = []
for name in sorted(os.listdir(folder)):
    if name.endswith(".csv"):
        frames.append(pd.read_csv(os.path.join(folder, name)))

sales = pd.concat(frames, ignore_index=True)
print(len(sales))   # 8
```

`pd.concat` stacks a list of tables into one. `ignore_index=True` numbers the rows 0 to 7, in place of 0 to 2, 0 to 1, and 0 to 2.

---

## Problem: Total of Every Month (us)

```python
# Stack the files in data/months, then print each month's
# revenue and the total of all of them.
```

```
month
2023-01     90.65
2023-02     72.20
2023-03    112.70
Name: revenue, dtype: float64
All months: $275.55
```

[We did this with loops](11-os-module.html#32). Each date starts with its month, like `2023-01`.

- How do we get the month out of every date?
- What do we group by?

---

## Solution: Total of Every Month (us)

<style scoped>
pre { font-size: 0.75em; }
</style>

```python
import os
import pandas as pd

folder = os.path.join("data", "months")
frames = []
for name in sorted(os.listdir(folder)):
    if name.endswith(".csv"):
        frames.append(pd.read_csv(os.path.join(folder, name)))
sales = pd.concat(frames, ignore_index=True)

sales["revenue"] = sales["price"] * sales["quantity"]
sales["month"] = sales["date"].str[:7]
print(sales.groupby("month")["revenue"].sum())
print(f"All months: ${sales['revenue'].sum():.2f}")
```

`.str[:7]` [slices every date](#35) to its first seven characters, the month.

---

## Summary

<style scoped>
ul { font-size: 0.8em; }
</style>

- A **Series** is one column of values with an index; math and comparisons run on every value
- A **DataFrame** is a table of named columns, each a Series; `pd.read_csv` reads one from a file
- `head`, `tail`, `shape`, `dtypes`, and `describe` give a first look; `NaN` marks a missing value
- `sales["price"]` picks a column, `sales[["product", "price"]]` several, `iloc` rows by position, and `loc` by label
- `sales[condition]` keeps the rows where the condition is `True`; join conditions with `&` and `|`, each in parentheses
- `sales["revenue"] = ...` adds or replaces a column; `.str` runs string methods on a column
- `sort_values`, `dropna`, `drop`, and `rename` give back a new table, so assign the result
- `value_counts` counts, and `groupby(...)[...].sum()` adds up each group
- `pd.concat` stacks tables; `to_csv(..., index=False)` writes one

---

## Next Up: Visualization

- Charts from DataFrames
- The [10 minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html) guide covers more of the library
