# Visualization Data

[Visualization](../../lectures/16-visualization.html) reads these two files from this folder in the course's GitHub repository, so its slides keep working if the originals change or move. Both are copied unchanged.

## `flights.csv`

Monthly totals of international airline passengers, in thousands, from 1949 to 1960: 144 rows of `year`, `month`, and `passengers`.

The file comes from the [seaborn-data](https://github.com/mwaskom/seaborn-data) repository by Michael Waskom, which holds the sample data for the [seaborn](https://seaborn.pydata.org/) charting library. That repository has no license file, so this credit follows the original source. The data is R's [`AirPassengers`](https://stat.ethz.ch/R-manual/R-devel/library/datasets/html/AirPassengers.html) series, from Box, G. E. P., Jenkins, G. M., and Reinsel, G. C. (1994), *Time Series Analysis: Forecasting and Control*, third edition, Prentice Hall.

## `weather.csv`

Daily weather in Seattle from 2012 to 2015: 1,461 rows of `date`, `precipitation` (millimeters), `temp_max` and `temp_min` (degrees Celsius), `wind`, and `weather`, one of `drizzle`, `fog`, `rain`, `snow`, or `sun`.

The file is `seattle-weather.csv` from the [vega-datasets](https://github.com/vega/vega-datasets) repository, renamed. That repository built it from the NOAA National Climatic Data Center's daily records and made up the `weather` column from several of NOAA's fields. As a U.S. government work, the data is in the [public domain](https://www.usa.gov/government-works).
