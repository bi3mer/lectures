---
title: "Lecture 16 Notes: Ada Lovelace and Grace Hopper"
---

Background on Ada Lovelace and Grace Hopper to review before lecture 16. Each person gets a timeline, the stories worth telling, and the claims to word carefully in front of a class. The last section points to places in the deck where each story fits. Sources are at the end.

# Ada Lovelace (1815–1852)

## Timeline

| Year | Event                                                                                                                                                              |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1815 | Born Augusta Ada Byron on 10 December in London, the only child of the poet Lord Byron and Anne Isabella Milbanke.                                                 |
| 1816 | Her parents separate a month after she is born. Byron leaves England in April, and she never sees him again.                                                       |
| 1824 | Byron dies in Greece when she is eight. Her mother raises her on mathematics and science, partly to steer her away from her father's temperament.                  |
| 1833 | Meets Charles Babbage at a party on 5 June, at 17. About two weeks later she sees the working section of his Difference Engine in his London home.                 |
| 1834 | Mary Somerville, a mathematician and science writer, becomes her mentor and friend.                                                                                |
| 1835 | Marries William King on 8 July. They have three children (1836, 1837, 1839).                                                                                       |
| 1838 | King is made Earl of Lovelace, so she becomes Countess of Lovelace.                                                                                                |
| 1841 | Augustus De Morgan starts teaching her advanced mathematics by letter.                                                                                             |
| 1842 | Luigi Menabrea, an Italian engineer (later Prime Minister of Italy), publishes a French article on Babbage's Analytical Engine, based on Babbage's talks in Turin. |
| 1843 | Her English translation of the article appears in Taylor's _Scientific Memoirs_ with seven notes of her own, labeled A to G. She signs the notes "A.A.L."          |
| 1852 | Dies of cancer on 27 November, at 36, the same age her father was when he died. She is buried next to him in Hucknall, Nottinghamshire.                            |

"Ada Lovelace" is a later shorthand. In her lifetime she was Augusta Ada Byron, then Augusta Ada King, Countess of Lovelace.

## The Analytical Engine

Babbage's Difference Engine computed tables of numbers with one fixed method. In 1834 he began designing the Analytical Engine, a general-purpose machine. It had a **store** that held numbers (memory) and a **mill** that did the arithmetic (a processor). Instructions and data came in on punched cards, an idea taken from the Jacquard loom, which wove patterns into cloth from chains of punched cards. The design could also repeat a group of steps and choose what to do next based on a result, which is what lets it run loops.

Babbage never built it; only small trial pieces exist. In 1991 the Science Museum in London built his Difference Engine No. 2 from his drawings, and it worked, which suggests his designs were sound.

## What Her Notes Say

Her notes run about three times the length of Menabrea's article. Three ideas from them are worth telling.

**Note G** is a table of steps for computing Bernoulli numbers on the engine. (Bernoulli numbers are a sequence of fractions that appear in formulas for sums of powers, such as 1² + 2² + ... + n².) Each row names an operation, the variables it reads (V1, V2, and so on), and the variable that stores the result. A group of rows repeats, so the program contains a loop. It is usually called the first published computer program.

**Beyond numbers.** She saw that the engine could act on anything whose relationships could be written as symbols, and gave music as the example: the engine "might compose elaborate and scientific pieces of music of any degree of complexity or extent." This idea is what separates a general-purpose computer from a calculator. She also wrote that "the Analytical Engine weaves algebraical patterns just as the Jacquard loom weaves flowers and leaves."

**Machines and originality.** She wrote that "the Analytical Engine has no pretensions whatever to originate anything. It can do whatever we know how to order it to perform." In 1950 Alan Turing answered this in "Computing Machinery and Intelligence" under the heading "Lady Lovelace's Objection."

## Claims to Word Carefully

- **"First programmer."** Babbage had written programs for the engine in his own unpublished notes before 1843. His 1864 memoir says he worked out the algebra for the Bernoulli problem himself "to save Lady Lovelace the trouble," and that she found a serious mistake in his version. Historians still argue over how much of Note G is hers. A safe line: Note G is the first program published for a general-purpose computer, and the ideas about symbols and music are hers.
- **The Note G bug.** Operation 4 of the table divides V5 by V4, where the algorithm needs V4 divided by V5. It may be a printer's error. Nobody caught it at the time because no machine existed to run the program.
- **Her legacy, briefly.** The US Department of Defense named its Ada programming language after her; its 1980 standard is numbered MIL-STD-1815, after her birth year. Ada Lovelace Day, on the second Tuesday of October, celebrates women in science and technology.

# Grace Hopper (1906–1992)

## Timeline

| Year | Event                                                                                                                                                                 |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1906 | Born Grace Brewster Murray on 9 December in New York City.                                                                                                            |
| 1928 | BA in mathematics and physics from Vassar College.                                                                                                                    |
| 1930 | MA from Yale. Marries Vincent Hopper, an English instructor at New York University (they divorce in 1945).                                                            |
| 1931 | Starts teaching mathematics at Vassar.                                                                                                                                |
| 1934 | PhD in mathematics from Yale, advised by Øystein Ore.                                                                                                                 |
| 1943 | Joins the US Naval Reserve. The Navy first turned her down: she was over the age limit, too light for her height, and her teaching counted as essential work.         |
| 1944 | Commissioned a lieutenant (junior grade) and sent to Howard Aiken's Mark I computer at Harvard. She is the third person to program it and writes its 561-page manual. |
| 1947 | The Mark II team tapes a moth into the logbook (see below).                                                                                                           |
| 1949 | Joins the Eckert–Mauchly Computer Corporation, which was building the UNIVAC I.                                                                                       |
| 1952 | Has her A-0 system running, usually called the first compiler.                                                                                                        |
| 1955 | Her team starts FLOW-MATIC, a business language whose commands are English words.                                                                                     |
| 1959 | A committee of industry and government programmers (CODASYL) designs COBOL, using FLOW-MATIC as its main model. Hopper is a technical adviser.                        |
| 1966 | Retires from the Naval Reserve as a commander, and calls it "the saddest day of my life."                                                                             |
| 1967 | Recalled to active duty to standardize the Navy's programming languages. She stays for 19 more years.                                                                 |
| 1983 | Promoted to commodore, a rank renamed rear admiral (lower half) in 1985.                                                                                              |
| 1986 | Retires in August at 79, the oldest serving officer in the US armed forces. She then consults for Digital Equipment Corporation.                                      |
| 1991 | Receives the National Medal of Technology.                                                                                                                            |
| 1992 | Dies on 1 January in Arlington, Virginia, and is buried at Arlington National Cemetery.                                                                               |

After her death the Navy named the destroyer USS Hopper after her (commissioned 1997), and in 2016 she was awarded the Presidential Medal of Freedom.

## The Moth

On 9 September 1947 the operators of the Harvard Mark II traced a failure to a moth caught in Relay #70, Panel F. They taped it into the logbook with the note "First actual case of bug being found." The page is now in the Smithsonian's National Museum of American History.

The joke works because "bug" already meant a defect: Thomas Edison used the word for flaws in his inventions in the 1870s. Hopper did not find the moth, and the Smithsonian says the logbook was probably not hers. She told the story often, which is why her name stuck to it.

## Compilers and English Words

A **compiler** is a program that translates code people write into instructions the machine can run. Browsers do this with our JavaScript every time a page loads.

A-0 (1952) let a programmer write a list of numbered subroutines; A-0 found each one in a library on tape and joined them into one program. By today's definitions it worked more like a linker, but the idea that a computer could write its own program was new. Her colleagues believed computers could only do arithmetic. In her words: "I had a running compiler and nobody would touch it."

FLOW-MATIC came from her argument that people processing business data should write programs in English words instead of mathematical symbols. COBOL kept that idea, and COBOL still runs a large share of banking and government software. In April 2020, New Jersey's governor asked for volunteer COBOL programmers to keep the state's unemployment system up with a flood of claims.

## The Nanosecond

Hopper handed out pieces of wire about 30 cm (11.8 inches) long, the distance light travels in one nanosecond (299,792,458 m/s × 10⁻⁹ s ≈ 0.30 m). She started using them in the late 1960s when officers asked why satellite messages took so long, and she showed them on _Late Night with David Letterman_ in 1986. The Smithsonian holds a bundle of them. She told _60 Minutes_ in 1983: "We're only at the beginning... We've got the Model-T."

## Claims to Word Carefully

- **The moth.** She did not find it, and she did not coin "bug."
- **"Inventor of COBOL."** COBOL came from a committee. FLOW-MATIC was its main model and she advised the committee, so "COBOL grew out of her FLOW-MATIC" is accurate.
- **"First compiler."** A-0 is usually given that title, with the linker caveat above.
- **Popular quotes.** "It's easier to ask forgiveness than it is to get permission" and "The most dangerous phrase in the language is 'We've always done it this way'" are widely attributed to her, but I could not confirm a primary source for either. [UNVERIFIED]

# Where They Fit in Lecture 16

- **[Validation](lecture.html#2).** Babbage's memoir (1864) has the line: "On two occasions I have been asked, 'Pray, Mr. Babbage, if you put into the machine wrong figures, will the right answers come out?'" A machine cannot fix bad input, which is why forms check it before it gets that far. The slide's bad email is already `ada@school`.
- **The Predict slides.** Note G's swapped V4 and V5 went unnoticed because nobody could run the program. The Predict slides make the same point about patterns: test them on input that should fail as well as input that should pass.
- **[Checking an Email](lecture.html#31).** Hopper wanted programs to read like English, and `/^[^ @]+@[^ @]+\.[^ @]+$/` reads like the opposite. The table under the regex, which spells out each piece in words, is the kind of explanation she argued for.

# Sources

- MacTutor History of Mathematics: [Ada Lovelace](https://mathshistory.st-andrews.ac.uk/Biographies/Lovelace/) and [Grace Hopper](https://mathshistory.st-andrews.ac.uk/Biographies/Hopper/) (dates, education, Babbage's account of the notes, Navy ranks, honors).
- Yale Office of the President, [Biography of Grace Murray Hopper](https://president.yale.edu/biography-grace-murray-hopper) (Mark I manual, A-0, retirement at 79, quotes).
- Smithsonian National Museum of American History, [Log Book With Computer Bug](https://www.si.edu/object/log-book-computer-bug:nmah_334663) and [Nanoseconds Associated with Grace Hopper](https://www.si.edu/object/nanoseconds-associated-grace-hopper:nmah_692464).
- JSTOR Daily, [The Bug in the Computer Bug Story](https://daily.jstor.org/the-bug-in-the-computer-bug-story) (Edison's earlier use of "bug").
- Wikipedia, [Note G](https://en.wikipedia.org/wiki/Note_G) (the operation 4 error).
- Charles Babbage, _Passages from the Life of a Philosopher_ (1864) (the "wrong figures" quote and his account of the Bernoulli algebra).
- Alan Turing, "Computing Machinery and Intelligence," _Mind_ (1950) ("Lady Lovelace's Objection").
