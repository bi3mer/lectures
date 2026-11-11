---
title: "Lecture 14: The Document Object Model — Notes"
---

These are my notes for teaching `lecture.md`. They follow the deck's order. Each section says what to get across, what to ask, and what students tend to get wrong.

# The big idea

The whole lecture is about **finding elements without giving each one an `id`**, and then **changing what's on the page**: adding, removing, or replacing elements and their classes.

The story goes like this. `getElementById` stops working well once there are many elements. So we try looping over `childNodes`, get burned by whitespace text nodes, and move to searching by tag, class, and name. Selectors (`querySelector` / `querySelectorAll`) come last and replace most of those. The second half covers changing the page: `classList`, `createElement`, `append`/`prepend`, `remove`, `replaceWith`.

Three gotchas to keep coming back to:

1. **Whitespace is a text node.** It shows up in `childNodes` and in `childNodes.length`.
2. **The `getElementsBy...` searches return live collections.** Removing elements while looping over one skips elements.
3. **`querySelector` returns `null` when nothing matches.** It doesn't throw an error.

# Review: the DOM

- When the browser loads a page, it turns the HTML into objects arranged in a tree. Changing an object changes the page.
- This is a callback to lecture 13. Use the names-tree diagram: `<ul>` is the parent, each `<li>` is a child, and the text "Ada" is a text node inside its `<li>`.
- Point out the colors: elements are blue and text nodes are yellow. Text nodes come back soon.

# Part 1: Getting many elements

## The 30-students problem

- A class of 30 means 30 ids and 30 `getElementById` lines. Ask: *how do we avoid that?*
- **Solution 1, string building:** ids `name1`...`name30`, then build each id with a template string in a `for` loop. It works, but the HTML is still full of numbered ids.
- Ask: *how could we do this with only one `getElementById` call?* (Hint: change the HTML.)
- **Solution 2, `childNodes`:** give the `<ul>` the id instead, get it once, and loop over `names.childNodes`.
  - Set up the coming problem: the loop **also visits the line breaks** between the `<li>`s, because those are text nodes. Say "we'll handle this soon" and move on.

## Multiple teams

- Two `<ul>`s with ids `team1` and `team2`, put in an array and looped over. The problem: adding a team means changing the JS. Ask: *how do we fix this by changing the HTML?*
- Wrap both teams in `<div id="teams">`. Ask: *what changes in the JS?*
- The deck's answer: `for (let i = 3; i < teams.childNodes.length; i += 4)`. Ask: **why start at 3, and why `+= 4`?**
  - Show the table. Children go `#text, H1, #text, UL, #text, H1, #text, UL, #text`. The first `UL` is at index 3, and each pattern after it (text, h1, text, ul) is 4 nodes long.
  - `examples/getting-around-it.html` logs the indexes. Open it in the console if there's time.
  - The point: **this is fragile.** Reformat the HTML and the numbers break.

## A safer way: check `nodeName`

- Loop over every child and only act when `child.nodeName === "UL"`.
- Two versions are shown: an `if` wrapping the work, or the guard-clause style (`!== "UL"` then `continue`). Both are fine. Mention that `continue` keeps the main code from being indented.
- Lead in: "we can also search for tags directly with..."

## `getElementsByTagName`

- `document.getElementsByTagName("ul")` returns every `<ul>` on the page.
- Problem to flag: it gets **every** list, including ones we don't want to change. That sets up classes.

**Problem: Count the Names.** Find every `<li>`, then put `"3 names"` in `#count`.

- Guiding questions: which method finds every `<li>`? What tells us how many?
- Answer: `getElementsByTagName("li")`, then `.length`, written into `count.textContent` with a template string.

**Problem: Capitals.** Turn every `<li>`'s text into capitals.

- Answer: loop over `getElementsByTagName("li")` and set `item.textContent = item.textContent.toUpperCase()`.
- Point: `textContent` both reads the old text and writes the new text.

## Different kinds of lists: classes

- Now the page has a sponsors `<ul>` too, and `getElementsByTagName("ul")` catches it.
- Fix: give the team lists `class="team"`.
- **`classList.contains("team")`** checks one element. Use the `lists[0]` (true) vs. `lists[2]` (false) example.

**Problem: Count the Teams.** Put `"2 teams"` on the page.

- Answer: a counter, a loop over every `<ul>`, `++count` when `classList.contains("team")`, then write the result.
- Close with: "this works, but it would be nicer to search by class directly."

## `getElementsByClassName`

- The browser does the class check for us. On the example, `teams.length` is 2 and `teams[0].nodeName` is `UL`.

**Problem: Percent Scores.** Add `%` to every `.score`.

- Answer: loop over `getElementsByClassName("score")` with `score.textContent += "%"`.
- The plain `<p>Ada</p>` has no class, so it's skipped.

## `name` and `getElementsByName`

- An input's `name` attribute is also a property: `team1.name` gives `"vote"`.

**Problem: Reading the Vote.** Log the checked radio's value using `getElementsByTagName`.

- Answer: loop over every `<input>` and check `input.name === "vote" && input.checked`. Log `input.value` and `break`.
- **The trap:** the subscribe checkbox comes first and is **also checked**. Without the `name` check, the loop logs `on`, which is a checkbox's default value. Ask the class what would print without the `name` check before showing this.
- Better: `document.getElementsByName("vote")` returns only the radios. Loop, check `checked`, log, `break`.

**Problem: Pick a Size.** Put the checked size in `#picked`.

- Answer: `getElementsByName("size")`, find the `checked` one, and set `picked.textContent = radio.value`.
- `getElementsByName` finds both radios, and `checked` tells them apart.

## `HTMLCollection` vs. `NodeList`

- Every search so far gives back a list in page order, so `length`, indexes, and `for...of` all work.
- What each search returns:
  - `getElementsByTagName` and `getElementsByClassName` return an `HTMLCollection`, which holds elements only and has **no `forEach`**.
  - `childNodes` and `getElementsByName` return a `NodeList`, which can hold any node, including text, and **has `forEach`**.
- **Just use `for...of` and both work the same.** Students don't need to memorize the table.
- Fun aside (footnote): the DOM Standard calls `HTMLCollection` "a historical artifact we cannot rid the web of."

## Searching inside an element

- `getElementsByTagName` and `getElementsByClassName` also work **on an element**, not just on `document`. Then they only search inside it.
- Example: take the first `.team`, then `team.getElementsByTagName("li")` gives just Ada and Grace.
- This sets up the next part: searching inside things is what CSS selectors already do.

# Part 2: Selectors

## What is a selector?

- This is a callback to lecture 3. A selector is the part of a CSS rule that picks the elements.
- `.team li` means every `<li>` inside an element with class `team`.
- The ones they know: `li` (tag), `.team` (class), `#teams` (id), and `.team li` (inside).
- Punchline: **JavaScript can search with the same selectors.**

## `querySelectorAll`

- Show the two side by side. Bolding every player the old way takes **two nested loops** (teams, then each team's `<li>`s). With `querySelectorAll(".team li")` it's **one loop**.
- It takes a CSS selector and returns a `NodeList` of every match.

**Problem: Only One List.** Add `!` only to the `<li>`s in `#first`.

- Answer: `querySelectorAll("#first li")` with `item.textContent += "!"`. Alan, in `#second`, stays the same.

## `querySelector`

- With no `All`, it returns **only the first match**: one element, not a list.
- `querySelector(".team li")` gives the captain (Ada).
- `querySelector("#teams")` does the same job as `getElementById("teams")`.
- `querySelector("#people")` gives **`null`** when nothing matches. Warn that calling `.textContent` on `null` is an error.

**Problem: First Score.** Write `"First: 90"` into `#result`.

- Guiding questions: what selector finds a score? Which method stops at the first match?
- Answer: `querySelector(".score")`, then get `#result` with either `getElementById` or `querySelector("#result")`. Both find the same paragraph.
- Point: because `querySelector` returns **one element**, you can use `.textContent` on it directly. With `querySelectorAll`, you'd need an index or a loop.

# Part 3: Changing classes

All three methods live on `classList`, next to `contains`. **None of them touch the element's other classes.**

- **`add("winner")`** turns `team` into `team winner`. Adding it a second time does nothing, so the class is never listed twice.
- **`remove("winner")`** turns `team winner` into `team`. Removing a class that isn't there does nothing, with **no error**.
- **`toggle("winner")`** adds the class if it's missing and removes it if it's there. Call it twice and you're back where you started.
- Worth saying out loud: this is how JS and CSS split the work. The CSS says *what a class looks like*, and the JS decides *which elements have it*. Toggle becomes very useful once we have events next lecture.

# Part 4: Making elements

## `createElement`

- Everything so far changed elements that were already in the HTML. `document.createElement("li")` makes a **new** element from a tag name.
- A new element works like one we found: set `textContent`, call `classList.add`, and so on.
- **Key point: it isn't on the page yet.** Making an element and showing it are two separate steps.

## `append` and `prepend`

- `parent.append(child)` puts the child at the **end** of the parent. Example: Linus Torvalds after John Carmack.
- `parent.prepend(child)` puts it at the **start**. Example: Ada Lovelace becomes first.
- The deck shows the resulting page as a demo panel after each one.

**Problem: Add Each Name.** Append Alan and Linus to `#names` from an array.

- Answer: loop over `newNames`. For each name, call `createElement("li")`, set `textContent`, then `append`.
- **A common mistake:** putting `createElement` outside the loop. Each name needs its **own** element. If you create one element and append it twice, it just moves, and you end up with one `<li>` that says Linus.
- If someone asks: `getElementById("names")` could be pulled out of the loop too. That's fine.

# Part 5: Removing and replacing

## `remove`

- `element.remove()` takes the element off the page, along with everything inside it. Example: the `.retired` player.
- This is a different method from `classList.remove`. Call that out, because students mix them up.

**Problem: Remove the Late.** Take every `.late` student off the page.

- Answer: loop over `querySelectorAll(".late")` and call `student.remove()`. Only Grace is left.
- Then ask the closing question on the slide: **would `getElementsByClassName` work too?** Take a guess from the room before moving on.

## Predict: removing by class

- Same loop, but over `getElementsByClassName("late")`. Have the class vote on A–D before revealing.
- **Answer: B (Grace, Alan).**
- Why: `getElementsByClassName` is **live**. Walk through the table:
  1. The collection holds `[Ada, Alan]` and the loop reads index 0, so Ada is removed. The collection shrinks to `[Alan]`.
  2. The loop moves on to index 1, which is past the end, so it stops. Alan is never visited.
- Rule to remember: **every `getElementsBy...` search, and `childNodes`, is live. `querySelectorAll` is a snapshot.** When removing, loop over `querySelectorAll`.

## Remove, hide, or disable

Three ways to take something away from the user. `hidden` and `disabled` are from lecture 13.

| Code              | Still in the DOM? | Visible? | Usable? |
| ----------------- | ----------------- | -------- | ------- |
| `remove()`        | No                | No       | No      |
| `hidden = true`   | Yes               | No       | No      |
| `disabled = true` | Yes               | Yes      | No      |

Talking point: use `hidden` if it'll come back, `disabled` if the user should see it but not use it yet, and `remove` if it's gone for good.

## `replaceWith`

- `old.replaceWith(new)` takes the old element off the page and puts the new one where it was.
- Example: `<h2 id="status">Loading...</h2>` is replaced by a new `<h1>Done!</h1>`.

**Problem: Replace the List.** If `#names` has no `<li>`s, replace it with `<p>No names yet</p>`.

- Answer: check `names.getElementsByTagName("li").length === 0`. If so, `createElement("p")`, set its text, and call `names.replaceWith(message)`.
- **This is the whitespace gotcha one last time.** `names.childNodes.length` is **1, not 0**, because the line break inside the empty `<ul>` is a text node. Counting `<li>`s skips it. Ask the class why `childNodes.length === 0` would fail before showing this, since it ties back to the start of the lecture.

# Summary

**Finding elements**

| Function                 | Returns                                                 |
| ------------------------ | ------------------------------------------------------- |
| `getElementsByTagName`   | every element with a tag (live `HTMLCollection`)        |
| `getElementsByClassName` | every element with a class (live `HTMLCollection`)      |
| `getElementsByName`      | every element with a `name` (live `NodeList`)           |
| `querySelectorAll`       | every match for a selector (snapshot `NodeList`)        |
| `querySelector`          | the first match, or `null`                              |
| `classList.contains`     | whether an element has a class                          |

**Changing the page**

| Function                            | Does                                        |
| ----------------------------------- | ------------------------------------------- |
| `classList.add`, `remove`, `toggle` | adds, removes, or flips one class           |
| `createElement`                     | makes a new element, not on the page yet    |
| `append`, `prepend`                 | puts it at the end or start of a parent     |
| `remove`                            | takes an element off the page               |
| `replaceWith`                       | puts another element in its place           |

**Next lecture: events.** That's where `toggle`, `createElement`, and `remove` start being triggered by clicks instead of running once when the page loads.
