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

- [ ] **Review the arrays draft.** `lecture-arrays-js.md` is a first draft built on `orderbook-arrays-starter.html`, and it now holds the `forEach` and arrow-function slides that moved out of `lecture-loops-js.md`. `cs213/index.html` doesn't link to it yet.
  - Calls made on 2026-10-14, all kept as drafted:
    - Prices are numbers, best first. This is the payoff for arrays of objects, since it removes the quoted keys and `Number()`.
    - Market Sell leaves the tape alone, so the range, upticks, and average stay consistent with what the page drew at load.
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
