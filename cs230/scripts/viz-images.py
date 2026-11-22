"""Draw the chart images for lectures/16-visualization.md.

Each snippet is the code on its slide, run as is, except that plt.show()
saves the chart to images/viz-<name>.png instead of opening a window.
A snippet that opens more than one window saves one image for each, as
viz-<name>-1.png, viz-<name>-2.png, and so on.
Every snippet starts with the lines the slides leave out: the two imports,
flights_url, and weather_url. The snippets read those URLs, as the slides
do, but the script reads the copies in data/visualization instead, so it
works offline and before a new file is pushed.

Needs pandas and matplotlib. Run it from anywhere:
    python3 viz-images.py               draw every image
    python3 viz-images.py hist bar      draw only viz-hist.png and viz-bar.png

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
flights_url = "https://raw.githubusercontent.com/bi3mer/lectures/main/cs230/data/visualization/flights.csv"
weather_url = "https://raw.githubusercontent.com/bi3mer/lectures/main/cs230/data/visualization/weather.csv"
'''

RAW = "https://raw.githubusercontent.com/bi3mer/lectures/main/cs230/data/visualization/"
DATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data", "visualization")

# Read each file once, however many snippets read it, from the local copy
# of any file the slides read from the course repository.
cache = {}
_read_csv = pd.read_csv


def cached_read_csv(path, *args, **kwargs):
    if path not in cache:
        source = path
        if isinstance(path, str) and path.startswith(RAW):
            source = os.path.join(DATA, path[len(RAW):])
        cache[path] = _read_csv(source, *args, **kwargs)
    return cache[path].copy()


pd.read_csv = cached_read_csv

snips = {}

# ----- Overview
#
# The overview slide shows these charts in two rows of three, with no code
# or labels, so they can use kinds and options the deck never teaches. The
# slide sets each image's height, so the rows line up.

snips["overview-line"] = '''df = pd.read_csv(flights_url)
some = df[df["year"].isin([1949, 1954, 1960])]
by_month = some.pivot_table(index="month", columns="year",
                            values="passengers")
by_month = by_month.loc[df["month"].unique()]

by_month.plot(marker="o", figsize=(5, 3.5), xlabel="",
              ylabel="Passengers (thousands)")
plt.show()'''

snips["overview-bar"] = '''df = pd.read_csv(weather_url)
df["year"] = df["date"].str[:4]
days = df.pivot_table(index="year", columns="weather",
                      values="date", aggfunc="count", fill_value=0)

days.plot(kind="bar", stacked=True, rot=0, figsize=(5, 3.5),
          xlabel="", ylabel="Days")
plt.show()'''

snips["overview-pie"] = '''df = pd.read_csv(weather_url)
counts = df["weather"].value_counts()

counts.plot(kind="pie", autopct="%.0f%%", figsize=(5, 3.5),
            ylabel="")
plt.show()'''

snips["overview-scatter"] = '''df = pd.read_csv(weather_url)
df["month"] = df["date"].str[5:7].astype(int)

df.plot(kind="scatter", x="temp_min", y="temp_max", c="month",
        colormap="twilight", figsize=(5, 3.5),
        xlabel="Low (°C)", ylabel="High (°C)")
plt.show()'''

snips["overview-area"] = '''df = pd.read_csv(flights_url)
seasons = {"December": "Winter", "January": "Winter",
           "February": "Winter", "March": "Spring",
           "April": "Spring", "May": "Spring", "June": "Summer",
           "July": "Summer", "August": "Summer",
           "September": "Fall", "October": "Fall",
           "November": "Fall"}
df["season"] = df["month"].map(seasons)
by_season = df.pivot_table(index="year", columns="season",
                                values="passengers", aggfunc="sum")
by_season = by_season[["Winter", "Spring", "Summer", "Fall"]]

by_season.plot(kind="area", figsize=(5, 3.5), xlabel="",
               ylabel="Passengers (thousands)")
plt.show()'''

snips["overview-hexbin"] = '''df = pd.read_csv(weather_url)

df.plot(kind="hexbin", x="temp_max", y="wind", gridsize=15,
        cmap="Blues", figsize=(5, 3.5),
        xlabel="High (°C)", ylabel="Wind")
plt.show()'''

# ----- A First Chart

# The slide also shows the two imports, which HEAD adds here.
snips["series-line"] = '''days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
sales = pd.Series([50, 75, 60, 90, 40], index=days)

sales.plot()
plt.show()'''

snips["df-line-noxy"] = '''df = pd.read_csv(flights_url)
january = df[df["month"] == "January"]

january.plot()
plt.show()'''

snips["df-line"] = '''df = pd.read_csv(flights_url)
january = df[df["month"] == "January"]

january.plot(x="year", y="passengers")
plt.show()'''

# One chart for each plot call: the first window, then the second.
snips["two-charts"] = '''df = pd.read_csv(flights_url)
january = df[df["month"] == "January"]
february = df[df["month"] == "February"]

january.plot(x="year", y="passengers")
february.plot(x="year", y="passengers")
plt.show()'''

snips["two-lines"] = '''df = pd.read_csv(flights_url)
january = df[df["month"] == "January"]
february = df[df["month"] == "February"]

ax = january.plot(x="year", y="passengers")
february.plot(x="year", y="passengers", ax=ax)
plt.show()'''

snips["df-two-months"] = '''df = pd.read_csv(flights_url)
january = df[df["month"] == "January"]
february = df[df["month"] == "February"]

ax = january.plot(x="year", y="passengers",
                  label="January")
february.plot(x="year", y="passengers",
              label="February", ax=ax)
plt.show()'''

# ----- Kinds of Charts

snips["bar"] = '''df = pd.read_csv(weather_url)
counts = df["weather"].value_counts()

counts.plot(kind="bar")
plt.show()'''

snips["pie"] = '''df = pd.read_csv(weather_url)
counts = df["weather"].value_counts()

counts.plot(kind="pie")
plt.show()'''

snips["high-counts"] = '''df = pd.read_csv(weather_url)
counts = df["temp_max"].value_counts()

counts.plot(kind="bar")
plt.show()'''

snips["hist"] = '''df = pd.read_csv(weather_url)
highs = df["temp_max"]

highs.plot(kind="hist", bins=10)
plt.show()'''

# The histogram slide shows bins=10 in its code, with these two charts
# beside that one to compare.
snips["hist-5"] = '''df = pd.read_csv(weather_url)
highs = df["temp_max"]

highs.plot(kind="hist", bins=5)
plt.show()'''

snips["hist-20"] = '''df = pd.read_csv(weather_url)
highs = df["temp_max"]

highs.plot(kind="hist", bins=20)
plt.show()'''

snips["scatter"] = '''df = pd.read_csv(weather_url)
df.plot(kind="scatter", x="temp_min",
        y="temp_max")
plt.show()'''

# ----- Preparing the Data

snips["yearly"] = '''df = pd.read_csv(flights_url)
yearly = df.pivot_table(
    index="year", values="passengers",
    aggfunc="sum")

yearly.plot()
plt.show()'''

snips["yearly-title"] = '''df = pd.read_csv(flights_url)
yearly = df.pivot_table(
    index="year", values="passengers",
    aggfunc="sum")

yearly.plot(title="Passengers per Year")
plt.show()'''

snips["pivot-grouped"] = '''df = pd.read_csv(weather_url)
temps = df.pivot_table(
    index="weather",
    values=["temp_min", "temp_max"])

temps.plot(kind="bar")
plt.show()'''

snips["pivot-labels"] = '''df = pd.read_csv(weather_url)
temps = df.pivot_table(
    index="weather",
    values=["temp_min", "temp_max"])

temps.plot(kind="bar", xlabel="Weather",
           ylabel="Celsius")
plt.show()'''

# ----- Refining a Chart

snips["weather-rot"] = '''df = pd.read_csv(weather_url)
temps = df.pivot_table(
    index="weather",
    values=["temp_min", "temp_max"])

temps.plot(kind="bar", xlabel="Weather",
           ylabel="Celsius", rot=0)
plt.show()'''

snips["weather-color"] = '''df = pd.read_csv(weather_url)
temps = df.pivot_table(
    index="weather",
    values=["temp_min", "temp_max"])

temps.plot(kind="bar", xlabel="Weather",
           ylabel="Celsius", rot=0,
           color=["tomato", "steelblue"])
plt.show()'''

snips["weather-style"] = '''df = pd.read_csv(weather_url)
temps = df.pivot_table(
    index="weather",
    values=["temp_min", "temp_max"])

temps.plot(kind="bar", xlabel="Weather",
           ylabel="Celsius", rot=0,
           color=["tomato", "steelblue"],
           figsize=(8, 4))
plt.show()'''

snips["legend-names"] = '''df = pd.read_csv(weather_url)
temps = df.pivot_table(
    index="weather",
    values=["temp_min", "temp_max"])

ax = temps.plot(kind="bar", xlabel="Weather",
                ylabel="Celsius", rot=0,
                color=["tomato", "steelblue"],
                figsize=(8, 4),
                title="Seattle Temperatures")
ax.legend(["Max temperature",
           "Min temperature"])
plt.show()'''

snips["subplots"] = '''df = pd.read_csv(weather_url)
fig, (left, right) = plt.subplots(1, 2, figsize=(10, 4))
df["temp_max"].plot(kind="hist", bins=10, ax=left, title="Highs")
df["temp_min"].plot(kind="hist", bins=10, ax=right, title="Lows")
plt.show()'''

snips["subplots-stacked"] = '''df = pd.read_csv(weather_url)
fig, (top, bottom) = plt.subplots(
    2, 1, figsize=(6, 8))
df["temp_max"].plot(kind="hist", bins=10,
                    ax=top, title="Highs")
df["temp_min"].plot(kind="hist", bins=10,
                    ax=bottom, title="Lows")
plt.show()'''

snips["subplots-grid"] = '''df = pd.read_csv(weather_url)
fig, axes = plt.subplots(
    2, 2, figsize=(11, 8))
df["temp_max"].plot(
    kind="hist", ax=axes[0][0], title="Highs")
df["temp_min"].plot(
    kind="hist", ax=axes[0][1], title="Lows")
df["wind"].plot(
    kind="hist", ax=axes[1][0], title="Wind")
df["precipitation"].plot(
    kind="hist", ax=axes[1][1], title="Rain")
plt.show()'''

snips["refine-solution"] = '''df = pd.read_csv(weather_url)
wind = df.pivot_table(index="weather",
                      values="wind")

wind.plot(kind="bar", rot=0, legend=False,
          color="seagreen",
          title="Snow Days Are the Windiest",
          xlabel="", ylabel="Average wind")
plt.show()'''

# Problem: Windy Weather shows the default chart, with none of the
# options the problem asks for.
snips["refine-norot"] = '''df = pd.read_csv(weather_url)
wind = df.pivot_table(index="weather",
                      values="wind")

wind.plot(kind="bar")
plt.show()'''


def main():
    names = sys.argv[1:] or list(snips)
    unknown = [name for name in names if name not in snips]
    if unknown:
        sys.exit(f"no snippet named {', '.join(unknown)}; choose from {', '.join(snips)}")

    failed = False
    for name in names:
        written = []

        def save(name=name, written=written):
            numbers = plt.get_fignums()
            for i, number in enumerate(numbers, start=1):
                suffix = f"-{i}" if len(numbers) > 1 else ""
                path = os.path.join(OUT, f"viz-{name}{suffix}.png")
                plt.figure(number).savefig(path, dpi=110, bbox_inches="tight")
                written.append(path)

        plt.show = save
        output = io.StringIO()
        try:
            with contextlib.redirect_stdout(output):
                exec(HEAD + snips[name], {})
            for path in written:
                print(f"wrote {os.path.relpath(path)}")
        except Exception as error:
            failed = True
            print(f"FAILED {name}: {type(error).__name__}: {error}")
        plt.close("all")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
