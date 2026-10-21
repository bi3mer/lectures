# JavaScript Lecture To-Do

Slide numbers refer to `lecture-js.md` as of 2026-10-04 and will shift as slides move. The slide titles stay accurate.

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

- [ ] **Review the arrays draft.** `lecture-arrays-js.md` is a first draft built on `examples/orderbook-arrays-starter/` (`index.html` and `practice.js`), and it now holds the `forEach` and arrow-function slides that moved out of `lecture-loops-js.md`. `cs213/index.html` doesn't link to it yet.
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
  - Calls made on 2026-10-14, all kept as drafted:
    - Prices are numbers, best first. This is the payoff for arrays of objects, since it removes the quoted keys and `Number()`.
    - Market Sell leaves `prices` alone, so the range, upticks, and average stay consistent with what the page drew at load.
    - Watchlist and Movers stay separate. Linking them would add a redraw that teaches nothing new.
    - Placing an order doesn't match orders that cross or merge prices. The Place a Bid solution says so.
    - The `({ })` object-return example and the bullet about `function` being set up early stay cut, since no exercise uses them.
    - Draw the Asks keeps the placeholder comment for the bids code, so the solution fits on one slide.

## For the Conditionals Lecture

- [ ] **Decide whether to cut the "Problem (Me)" exercises from `lecture-conditional-js.md`.** The loops deck cut its "Me" problems to fit one class. Here, they are Open Sign, Open or Closed, Reward Levels, Opening Hours, and Parsons 3 (formerly Order a Latte), 10 slides in all. Cutting them costs more than it did in loops:
  - The whole sign sequence is "Me", so students would see the first `if`/`else` and the first `&&` only on concept slides.
  - Free Pastry adds to `showRewards()`, so the starter's `practice.js` would have to provide the Reward Levels code.
  - The latte's **Order** button calls `parsons3()`, so the starter would provide it too, or the button would lose its `onclick`.
  - Six links in other decks point into this deck by slide number. Renumber them after any cut.
  - The starter's `practice.js` marks each problem with a `// Slide N:` comment. Renumber those too after any cut.
