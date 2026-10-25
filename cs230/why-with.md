# Why Python Has `with`

To be filled in before 11/1/2026

<!--
Outline for an essay, to be written later. The notes under each heading are the ideas the
section should cover, not finished prose. Deck 10's "What `with` Does Underneath" slide
links here.

Opening paragraph: a program that opens something has to close it, even when something goes wrong partway through. `with` is Python's answer to that problem, and the answer turned out to fit much more than files.

## Opening Something Means Closing It

- Opening a file borrows something from the operating system; `close` gives it back and makes sure what the program wrote reaches the file ([Without `with`](10-exceptions-and-files.html#18)).
- The bug: an exception, a `return`, or a `break` between `open` and `close` skips the `close`.
- Example to write: a loop that writes a report and hits a `ValueError` halfway through, leaving the file open and partly written.
- Files are one case of a general shape, setup then cleanup:
  - a lock: take it, then release it
  - a database transaction: start it, then commit it or undo it
  - a temporary folder: create it, then delete it
  - the current folder: change it, then change it back

## `finally`: Cleanup That Always Runs

- What Python had before `with`: `try` and `finally` ([`finally`](10-exceptions-and-files.html#19)).
- `finally` runs whether the `try` block finishes, raises, or returns.
- Example: `open`, then `try` around the loop, then `close` in `finally`.
- What goes wrong with writing it by hand:
  - four extra lines around every file
  - `open` has to go above `try`; inside it, a failed `open` leaves `f` undefined, and `f.close()` in `finally` raises a `NameError`
  - two files at once means two nested `try` blocks
  - nothing stops a program from leaving the `finally` out

## Where `with` Came From

- PEP 310, "Reliable Acquisition/Release Pairs": the first proposal for a `with` statement.
- PEP 340, "Anonymous Block Statements" (Guido van Rossum): a bigger idea, withdrawn. Its block acted like a loop, so `break` and `continue` inside it did surprising things, and it could hide where the program went next.
- PEP 343, "The 'with' Statement" (Guido van Rossum and Alyssa Coghlan, created 13 May 2005). Its abstract gives the purpose: "to make it possible to factor out standard uses of try/finally statements."
- Python 2.5 (19 September 2006) shipped it behind `from __future__ import with_statement`. Python 2.6 turned it on for every program.
- What supported it on day one: files, `threading` locks, `decimal.localcontext()`, and the new `contextlib` module.

## What `with` Does Underneath

- The value after `with` is a **context manager**: an object with an `__enter__` method and an `__exit__` method.
- `__enter__` runs before the block. What it gives back is the value `as` names; a file's `__enter__` gives back the file itself.
- `__exit__` runs when the block ends, the way `finally` does, and it is told which exception (if any) ended the block. A file's `__exit__` calls `close`.
- Show PEP 343's translation of `with EXPR as VAR: BLOCK`, simplified, next to the slide's `try`/`finally` version ([What `with` Does Underneath](10-exceptions-and-files.html#20)).
- `__exit__` can stop an exception by giving back `True`; that is how `contextlib.suppress` works.

## `with` Beyond Files

- `threading.Lock()`: takes the lock, releases it after the block.
- `tempfile.TemporaryDirectory()`: creates a folder, deletes it after the block.
- `contextlib.suppress(FileNotFoundError)`: a `with` version of `try`/`except`/`pass` ([Easier to Ask for Forgiveness](patterns.html#easier-to-ask-for-forgiveness-than-permission)).
- `contextlib.chdir("data")` (Python 3.11): changes the current folder and changes it back; ties to `os.getcwd` in the [`os` module](11-os-module.html).
- `contextlib.redirect_stdout(f)`: sends `print` into a file for the block.
- A `sqlite3` connection: commits the transaction if the block succeeds and undoes it if the block raises, but does **not** close the connection. A good example of reading what a context manager's cleanup actually is.
- One `with` can open two files: `with open(a) as f_in, open(b) as f_out:`, next to the nested version in [Raise the Prices](10-exceptions-and-files.html#38).

## Writing Your Own

- A class with `__enter__` and `__exit__`.
- `contextlib.contextmanager`: setup above `yield`, cleanup below it, inside `try`/`finally`.
- Example idea: a timer that prints how long its block took.

## The Same Idea in Other Languages

- C#: the `using` statement.
- Java 7 (2011): try-with-resources.
- C++: no keyword; the cleanup runs when the object goes out of scope (RAII).
- Go: `defer` schedules a call for when the function returns.
- TypeScript 5.2 (2023): `using` declarations. JavaScript's old `with` statement is unrelated (it puts an object's properties in scope) and strict mode forbids it.

## Sources

- [PEP 343: The "with" Statement](https://peps.python.org/pep-0343/)
- [What's New in Python 2.5: PEP 343](https://docs.python.org/3/whatsnew/2.5.html#pep-343-the-with-statement)
- [The `with` statement](https://docs.python.org/3/reference/compound_stmts.html#the-with-statement), Python language reference
- [With Statement Context Managers](https://docs.python.org/3/reference/datamodel.html#context-managers), Python data model
- [`contextlib`](https://docs.python.org/3/library/contextlib.html), Python standard library

-->
