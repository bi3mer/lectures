"""Draw the chart images for lectures/16-visualization.md.

Each snippet is the code on its slide, run as is, except that plt.show()
saves the chart to images/viz-<name>.png instead of opening a window.
Every snippet starts with the lines the slides leave out: the two imports
and url.

Needs pandas and matplotlib, and the internet to read tips.csv and
flights.csv. Run it from anywhere:
    python3 viz-images.py               draw every image
    python3 viz-images.py axes bar      draw only viz-axes.png and viz-bar.png

When a slide's code changes, change its snippet here to match and rerun.
"""
import contextlib
import io
import os
import sys

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "images")

HEAD = '''import pandas as pd
import matplotlib.pyplot as plt
url = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/"
'''

# Read each file from the web once, however many snippets read it.
cache = {}
_read_csv = pd.read_csv


def cached_read_csv(path, *args, **kwargs):
    if path not in cache:
        cache[path] = _read_csv(path, *args, **kwargs)
    return cache[path].copy()


pd.read_csv = cached_read_csv

snips = {}

# ----- A First Chart

# The slide also shows the two imports, which HEAD adds here.
snips["series-line"] = '''days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
sales = pd.Series([50, 75, 60, 90, 40], index=days)

sales.plot()
plt.show()'''

snips["df-line"] = '''flights = pd.read_csv(url + "flights.csv")
january = flights[flights["month"] == "January"]

january.plot(x="year", y="passengers")
plt.show()'''

snips["df-line-noxy"] = '''flights = pd.read_csv(url + "flights.csv")
january = flights[flights["month"] == "January"]

january.plot()
plt.show()'''

# ----- Kinds of Charts

snips["bar"] = '''tips = pd.read_csv(url + "tips.csv")
counts = tips["day"].value_counts()

counts.plot(kind="bar")
plt.show()'''

snips["barh"] = '''tips = pd.read_csv(url + "tips.csv")
counts = tips["day"].value_counts()

counts.plot(kind="barh")
plt.show()'''

snips["pie"] = '''tips = pd.read_csv(url + "tips.csv")
counts = tips["time"].value_counts()

counts.plot(kind="pie")
plt.show()'''

snips["bill-counts"] = '''tips = pd.read_csv(url + "tips.csv")
counts = tips["total_bill"].value_counts()

counts.plot(kind="bar")
plt.show()'''

snips["hist"] = '''tips = pd.read_csv(url + "tips.csv")
bills = tips["total_bill"]

bills.plot(kind="hist", bins=10)
plt.show()'''

snips["box"] = '''tips = pd.read_csv(url + "tips.csv")
tips.plot(kind="box", column="total_bill",
          by="day")
plt.show()'''

snips["scatter"] = '''tips = pd.read_csv(url + "tips.csv")
tips.plot(kind="scatter", x="total_bill",
          y="tip")
plt.show()'''

# ----- Preparing the Data

snips["flights-zigzag"] = '''flights = pd.read_csv(url + "flights.csv")

flights.plot(x="year", y="passengers")
plt.show()'''

snips["yearly"] = '''flights = pd.read_csv(url + "flights.csv")
yearly = flights.pivot_table(
    index="year", values="passengers",
    aggfunc="sum")
print(yearly.head(3))

yearly.plot()
plt.show()'''

snips["month-bug"] = '''flights = pd.read_csv(url + "flights.csv")
ends = flights[flights["year"].isin([1949, 1960])]
by_month = ends.pivot_table(
    index="month", columns="year",
    values="passengers")

by_month.plot()
plt.show()'''

snips["month-fix"] = '''flights = pd.read_csv(url + "flights.csv")
ends = flights[flights["year"].isin([1949, 1960])]
by_month = ends.pivot_table(
    index="month", columns="year",
    values="passengers")
months = flights["month"].unique()
by_month = by_month.loc[months]

by_month.plot()
plt.show()'''

snips["day-order"] = '''tips = pd.read_csv(url + "tips.csv")
counts = tips["day"].value_counts()
week = ["Thur", "Fri", "Sat", "Sun"]
counts = counts.loc[week]
print(counts)

counts.plot(kind="bar")
plt.show()'''

snips["pivot-grouped"] = '''tips = pd.read_csv(url + "tips.csv")
totals = tips.pivot_table(
    index="day", columns="time",
    values="total_bill", aggfunc="sum",
    fill_value=0)
week = ["Thur", "Fri", "Sat", "Sun"]
totals = totals.loc[week]

totals.plot(kind="bar")
plt.show()'''

# Problem: Tips by Party Size shows the chart its solution draws.
snips["size-problem"] = '''tips = pd.read_csv(url + "tips.csv")
by_size = tips.pivot_table(index="size", values="tip")

by_size.plot(kind="bar")
plt.show()'''

# ----- Refining a Chart

snips["size-labels"] = '''tips = pd.read_csv(url + "tips.csv")
by_size = tips.pivot_table(index="size",
                           values="tip")

by_size.plot(kind="bar",
             title="Bigger Parties Tip More",
             xlabel="Party size",
             ylabel="Average tip ($)")
plt.show()'''

snips["size-style"] = '''tips = pd.read_csv(url + "tips.csv")
by_size = tips.pivot_table(index="size",
                           values="tip")

by_size.plot(kind="bar", legend=False,
             rot=0, color="seagreen",
             figsize=(8, 4),
             title="Bigger Parties Tip More",
             xlabel="Party size",
             ylabel="Average tip ($)")
plt.show()'''

# The Grid and Markers slide; the file kept its old name.
snips["legend"] = '''flights = pd.read_csv(url + "flights.csv")
yearly = flights.pivot_table(
    index="year", values="passengers",
    aggfunc="sum")

yearly.plot(legend=False, grid=True,
            marker="o",
            title="Passengers per Year",
            xlabel="Year",
            ylabel="Passengers (thousands)")
plt.show()'''

snips["axes"] = '''tips = pd.read_csv(url + "tips.csv")
bills = tips["total_bill"]

ax = bills.plot(kind="hist", bins=10)
ax.set_title("The Average Bill Is About $20")
ax.set_xlabel("Total bill ($)")
ax.axvline(bills.mean(), color="red")
plt.show()'''

snips["axes-bug"] = '''tips = pd.read_csv(url + "tips.csv")
bills = tips["total_bill"]

ax = bills.plot(kind="hist", bins=10)
ax.set_title("Most Bills Are $10 to $25")
ax.set_xlabel("Total bill ($)")
ax.axvline(bills.mean(), color="red")
plt.show()'''

# The solution slide shows only the changed set_title line. The snippet is
# a raw string so the slide's \$ reaches the code unchanged.
snips["axes-fix"] = r'''tips = pd.read_csv(url + "tips.csv")
bills = tips["total_bill"]

ax = bills.plot(kind="hist", bins=10)
ax.set_title(r"Most Bills Are \$10 to \$25")
ax.set_xlabel("Total bill ($)")
ax.axvline(bills.mean(), color="red")
plt.show()'''

snips["subplots"] = '''tips = pd.read_csv(url + "tips.csv")
fig, (left, right) = plt.subplots(1, 2, figsize=(10, 4))
tips["total_bill"].plot(kind="hist", bins=10, ax=left, title="Bills")
tips["tip"].plot(kind="hist", bins=10, ax=right, title="Tips")
fig.tight_layout()
plt.show()'''

# Problem: Smokers' Tips shows the chart its solution draws.
snips["refine-problem"] = '''tips = pd.read_csv(url + "tips.csv")
smokers = tips.pivot_table(index="day", columns="smoker", values="tip")
smokers = smokers.loc[["Thur", "Fri", "Sat", "Sun"]]

smokers.plot(kind="bar", rot=0, title="Average Tip by Day",
             xlabel="", ylabel="Tip ($)")
plt.show()'''


def main():
    names = sys.argv[1:] or list(snips)
    unknown = [name for name in names if name not in snips]
    if unknown:
        sys.exit(f"no snippet named {', '.join(unknown)}; choose from {', '.join(snips)}")

    failed = False
    for name in names:
        path = os.path.join(OUT, f"viz-{name}.png")

        def save(path=path):
            plt.savefig(path, dpi=110, bbox_inches="tight")

        plt.show = save
        output = io.StringIO()
        try:
            with contextlib.redirect_stdout(output):
                exec(HEAD + snips[name], {})
            print(f"wrote {os.path.relpath(path)}")
        except Exception as error:
            failed = True
            print(f"FAILED {name}: {type(error).__name__}: {error}")
        plt.close("all")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
