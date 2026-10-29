# JavaScript Lecture To-Do

Slide numbers refer to `lecture.md` as of 2026-10-04 and will shift as slides move. The slide titles stay accurate.

## Missing Topics

- [ ] **Functions (basic, anonymous, arrow).** The whole section is still in `temp.md`, under "# Functions". The "Use a Function" slide (slide 5) tells students that functions come later and that this week's exercises must use one, so the deck has to cover them.
- [ ] **Linking a script.** "Moving the Code to `script.js`" is still in `temp.md`. It is the only slide that links to `examples/script-starter/`.
- [ ] **An ending.** The deck stops at "Solution (You): Movie Marathon" (slide 85). These slides are still in `temp.md`:
  - "Summary: Statements and Data Types", "Summary: Output and Operators", and "Summary: Functions and Input". They mention topics that have moved, so they need updating.
  - "Before You Start the Exercise", which repeats the function rule.
  - The "# Questions?" appendix.

## Ideas the Slides Use but Never Explain

- [ ] **`NaN`.** It appears in the tables on "`Number`, `parseInt`, `parseFloat`" and "Cancel and Typos" (slides 69 and 70). The sentence that says `NaN` stands for "Not a Number" is on the "Numbers" slide in `temp.md`.
- [ ] **Quotes inside quotes.** From "Asking the User with `prompt()`" (slide 56) on, the code uses `prompt("What's your name?")`. That works only because the outside quotes are `"`. The "Quotes Inside Quotes" slide that explains this is in `temp.md`.

## Optional Pieces Still in `temp.md`

- [ ] `alert()`
- [ ] The "Exercise: Coffee Order" and "Exercise: Tip Calculator" exercises. These could become practice after the functions section.
- [ ] "`+` With Strings", the only slide that shows `+=` on strings.
- [ ] "`console.log()` With Several Values", which prints values separated by commas.
- [ ] The detailed data type slides: "Numbers", "Strings", "Booleans", "`null` vs. `undefined`", "Arrays and Objects", "`typeof`", and "Dynamic Typing".

## For the Arrays Lecture

- [ ] **Review the arrays draft.** `11-js-arrays/lecture.md` is a first draft built on `11-js-arrays/examples/orderbook-arrays-starter/` (`index.html` and `practice.js`), and it now holds the `forEach` and arrow-function slides that moved out of `10-js-objects-loops/lecture.md`. `cs213/index.html` has linked to it, with its starter and finished page, since 2026-10-21.
  - On 2026-10-17, the "Problem (Me)" exercises were cut, as in the loops deck:
    - Last Trade and Draw the Bids moved into the starter's `practice.js`, which now holds `prices`, the last-trade line, `depthBar`, and a `drawBook()` that draws the bids. Draw the Asks and Empty Book are sections inside `drawBook()`.
    - Draw the Tape was cut along with the tape on the page. Draw the Asks now carries its lesson about looping backward to index 0.
    - Market Sell (Us) moved ahead of Draw the Asks, so the Arrays of Objects section runs Us, You, You.
  - Also on 2026-10-17, the deck was cut to 50 slides plus an appendix:
    - Positions (You) was cut, since it repeated Average Price. The page lost its positions list and total. `positions` stays in the starter for Movers, whose slide now introduces it.
    - Place an Ask (You) was cut, since it repeated Place a Bid with the sort flipped. The starter provides `placeAsk()`, and Place a Bid's solution carries its lessons: the sort direction, and `Number()`.
    - "`for...in` on an Array" moved to an appendix after "Questions?".
    - "Example: `forEach` with an Arrow Function" was folded into "Braces and When to Use `=>`".
  - On 2026-10-19, the deck was cut to 40 slides, counting the appendix:
    - Remove Last (You) was cut, along with its button, `removeTicker()`, and its section in the starter. "Array Methods" still teaches `pop`.
    - "Arrays" and "Example: Today's Trades" became one "Arrays" slide.
    - "Changing an Array" and "`includes` and `join`" became "Array Methods", with bullets in place of the methods table.
    - "Looping with an Index", "`for...of`", and "Which Loop?" became "Index or `for...of`".
    - "Two Names, One Object" was folded into "Arrays of Objects".
    - "Functions Are Values", "`forEach`", and "Example: `for...of` vs. `forEach`" became one "`forEach`" slide. "From `function` to `=>`" now says a variable can hold a function.
    - The `forEach` and Arrow Functions sections became one.
    - "`sort` Compares Strings" and "Sorting Objects" became "`sort`".
  - On 2026-10-20, the deck was split into two halves: every concept slide first (slides 2 to 17), then the "Building the Trading Desk" divider (slide 18), then the exercises. The deck is 42 slides.
    - "`for...in` on an Array" moved out of the appendix to just after "Index or `for...of`", so the deck now ends at "Questions?".
    - The concept half has no section dividers, so the only break is between the concepts and the exercises. Teaching every concept first matters more than the 40-slide target.
    - "Prices Stuck in Keys" became two slides. "What We Did" shows last lecture's `bids`, written as in the loops starter, and its three problems. "What We Should Have Done" is a teaser with no code that links ahead to "The Order Book as an Array", the last concept slide. That slide shows `bids` as an array of objects, with one fix for each problem.
    - Arrays, indexes, and `length` now take four slides. "Arrays" is generic: `colors`, and a `mixed` array of three types. "Indexes" holds the index table. "`length`" notes that strings have `length` too. "Reading Items" reads in-range indexes, `prices[prices.length]`, and `prices[-1]`. `prices` and its "oldest first" note sit at the top of "Reading Items", the first slide that reads it.
    - "From `function` to `=>`" ran past the slide edge, so its code for storing `fee` in a variable moved to a new "A Function in a Variable" slide just before it.
    - "Braces and When to Use `=>`" builds a `tape` string, since summing `priceSum` gave away Average Price. It no longer names exercise functions, or `sort`, which comes after it.
    - "Let's Build a Trading Desk" became "Setting Up the Starter", since it follows the "Building the Trading Desk" divider.
    - The Empty Book solution no longer names Place a Bid, which students write later.
    - The Summary gained bullets for `length` and out-of-range indexes, and for arrow functions. Its first two bullets were then tightened so it fits.
    - The exercises kept their order, so the starter's sections still line up with the slides. Watchlist, Today's Range, Average Price, and Place a Bid link back to the concept slide they use.
  - On 2026-10-21, after an audit:
    - "What We Should Have Done" became "What We Should Have Done: Array of Objects". It defines an array as one value that holds an ordered list of values, each at a numbered position counting from 0, and names an array of objects. "Arrays" no longer repeats the definition; it shows how to write one.
    - Upticks and Movers became Parsons 1 and Parsons 2, in the loops deck's format: the code sits in `parsons1()` or `parsons2()` with a call line, the problem slide gives no description or output, and it asks "What does `parsonsN` do? What should it be named?" The starter's section banners were renamed to match.
    - Average Price uses an arrow function, following the rule on "Braces and When to Use `=>`". That slide now calls keeping `{ }` for a change "our rule", since `(price) => (tape += ...)` also runs.
    - Watchlist's ticker page line uses `toUpperCase()`, so typing `blip` no longer adds a second `BLIP`.
    - `positions` lost its unused `shares` field, left over from the cut Positions exercise.
    - "Array Methods" now says that assigning to an index replaces an item, and slide 11's bullet no longer gives away slide 17's fix for quoted prices.
    - Slides 25, 30, 36, and 41 ran past the bottom edge after the Parsons functions and the width-80 rewrap. Both Parsons solutions now say only what the code does and a better name, as in the loops deck, with no notes on the wrong lines. Draw the Asks keeps one sentence about going backward to index 0. Four Summary bullets were tightened to one line each.
    - The aside on "Reading Items" about `undefined` became its own slide, "Aside: Why `undefined`?" (slide 8), so the deck is 43 slides. Every slide from "Array Methods" on moved down one, and the deck's links to them were renumbered. Slide numbers in the bullets above are from before this move.
    - "Array Methods" became six slides (9 to 14): "Replacing an Item" (assigning to an index), then one each for `push`, `pop`, `shift`, `includes`, and `join`. Each starts with its own `tickers`. The deck is 48 slides; links past slide 8 moved down five, and Watchlist's `join` link points at the `join` slide.
    - "Index or `for...of`" and "`for...in` on an Array" (slides 15 and 16) now declare `prices` in a full-width block above their columns, since `prices` was last declared on slide 7. Slide 15 shrinks its code to 0.75em, and its first bullet became one line, so it fits.
    - "Arrays of Objects" was split again: its `best = bids[0]` bullet became slide 18, "Two Names, One Object", which declares its own `bids`. Market Sell's "one object" link points there. The deck is 49 slides.
    - Slide 18 became four slides on references (18 to 21), since no deck had taught them: "Copy by Reference" (a number and an object side by side, and a definition of **reference**), "Two Names, One Object" (new diagram `11-js-arrays/examples/diagrams/copy-by-reference.svg`, drawn like `copy-by-value.svg`), "Value or Reference?" (which types are copied and which are shared, with a shared-array example), and "Changing or Replacing" (changing a property vs. assigning a new object). Market Sell's "one object" link points at the diagram slide. The Summary's sharing bullet now names value and reference. The deck is 52 slides.
    - "Copy by Reference" was rebuilt as one matched pair: `let b = a;` on a number (copied, 600) and on an object (shared, 500). A new "Copy by Value" review slide (18) comes before it and links to `addFreeBag` in the intro deck. The reference slides are now 19 to 22, Market Sell's "one object" link points at slide 20, and the deck is 53 slides.
    - Slides 18 and 19 then became a matched pair, each with labeled logs (`a = ...`) and the console below the code. "Copy by Value" shows the number case (`a = 600`, `b = 500`). "Copy by Reference" shows only the object case, changing it through each name and printing both names after each change (500 and 500, then 450 and 450), and defines **reference**. Slide 20 now declares `bids` above its code.
    - "Changing or Replacing" (slide 22) was rebuilt on slide 19's `a`/`b` pattern, with an array of prices: `b.push(99.75)` shows up through both names, then `b = [101]` leaves `a` unchanged. Its logs print each array with `join(", ")` inside brackets. The console sits below the code. Slide 21 logs `list` instead of `watchlist`.
    - "Braces and When to Use `=>`" was cut, so the deck is 52 slides. Average Price's "arrow function" link now points at "From `function` to `=>`" (slide 25). The braced-arrow wrong line in Parsons 2 now leans only on slide 25's "Without `{ }`, it returns its one expression".
    - The starter now declares `let watchlist = []; // @1` with the other data at the top of `practice.js`. Watchlist's step 1 tells students to search for `@1` and put `"TEST"` and `"BLIP"` in it. The final file fills in the same line, and its Watchlist section no longer declares `watchlist`.
    - The user rewrote the starter's Watchlist section as shells: `showWatchList()` (capital L) with a hint and a `?` to replace, `addTicker()` with a ticker page line that has no `toUpperCase()`, and the `showWatchList();` call already in place. The slides and the final use `showWatchList`. The problem now has four steps, and step 3 asks students to make the ticker uppercase themselves.
    - Every other non-Parsons section of the starter now follows the Watchlist pattern: a "Page line(s) for X" note, a short hint comment, and page lines with a `?` where the computed value goes. `sellAtMarket()` and `placeBid()` are empty shells, and Place a Bid's page lines read the boxes without `Number()`. Empty Book gets a `Spread: none` page line and `disabled = ?`. The problem slides tell students to replace each `?`. The Parsons sections stay empty.
    - Today's Range (Us) became a pseudocode problem, in the loops deck's Market Sell format: "Turn the pseudocode into code…", a `text` block, then "For the last line, uncomment the page line…". The solution slide is unchanged.
    - New slide 34, "What If There Are No Trades?", follows the Today's Range solution. It runs the range code on an empty `prices` and shows the `TypeError` from `low.toFixed(2)`, notes the solution assumes at least one trade, links the `undefined` aside (slide 8), and suggests checking `prices.length > 0`. The solution's "An array has a first item" became "`prices` has a first item". Links past slide 33 moved down one; the deck is 53 slides.
    - Draw the Asks (You) and Empty Book (You) became pseudocode problems. Draw the Asks' pseudocode clears the list, loops from the last index down to 0, and finds the spread; its closing line keeps the opening-bell link. Empty Book keeps its bug report and `TypeError`, then gives an `if`/`else` for the spread and a line for the Sell button.
  - Calls made on 2026-10-14, all kept as drafted:
    - Prices are numbers, best first. This is the payoff for arrays of objects, since it removes the quoted keys and `Number()`.
    - Market Sell leaves `prices` alone, so the range, upticks, and average stay consistent with what the page drew at load.
    - Watchlist and Movers stay separate. Linking them would add a redraw that teaches nothing new.
    - Placing an order doesn't match orders that cross or merge prices. The Place a Bid solution says so.
    - The `({ })` object-return example and the bullet about `function` being set up early stay cut, since no exercise uses them.
    - Draw the Asks keeps the placeholder comment for the bids code, so the solution fits on one slide.

## For the Conditionals Lecture

- [ ] **Decide whether to cut the "Problem (Me)" exercises from `09-js-if/lecture.md`.** The loops deck cut its "Me" problems to fit one class. Here, they are Open Sign, Open or Closed, Reward Levels, Opening Hours, and Parsons 3 (formerly Order a Latte), 10 slides in all. Cutting them costs more than it did in loops:
  - The whole sign sequence is "Me", so students would see the first `if`/`else` and the first `&&` only on concept slides.
  - Free Pastry adds to `showRewards()`, so the starter's `practice.js` would have to provide the Reward Levels code.
  - The latte's **Order** button calls `parsons3()`, so the starter would provide it too, or the button would lose its `onclick`.
  - Five links in other decks point into this deck by slide number: two in `10-js-objects-loops/lecture.md` and three in `11-js-arrays/lecture.md`. Renumber them after any cut. The arrays deck's Watchlist solution points to Parsons 3 for a variable that keeps its value between clicks, so cutting Parsons 3 also means finding that example a new home.
  - The starter's `practice.js` marks each problem with a `// Slide N:` comment. Renumber those too after any cut.
