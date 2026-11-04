# bheja-frAI

An interactive beginner course on AI, built as a single self-contained web page. It explains the ideas behind the open-source course [AI Engineering from Scratch](https://github.com/rohitg00/ai-engineering-from-scratch) (MIT licensed, not affiliated).

**Live page: https://tanmayhc7.github.io/bheja-frAI/**

Each lesson has a short animation or video, a live demo, and a two-question quiz. XP and streaks are saved in the browser.

## What is open so far

- Phase 0, Setup and Tooling: Python environments, Git, why GPUs.
- Phase 1, Math Foundations: vectors and similarity, a neuron as a weighted sum, gradient descent.
- A map of all 20 phases and a "where to start" guide from the source README.

## Files

- `index.html` is the whole page. Open it in a browser. It loads fonts from Google Fonts and has no other dependencies.
- `drafts/full-draft-phases-2-to-14.html` is an earlier larger draft with demos for fitting a line, tokenization, attention, next-token prediction, RAG and the agent loop. Those demos are meant to be moved into `index.html` phase by phase.
- `tests/` has two jsdom smoke tests. Run `npm install` then `npm run smoke` and `npm run smoke-canvas` inside `tests/`.

## Adding a lesson

Inside the script in `index.html`:

1. Write a demo: `DEMOS.myDemo = function(host){ ... }`
2. Register it: `lesson(2, { id, short, title, tag, lead, demo:'myDemo', takeaway, quiz:[{q,o,a,why,hint}], links:[[label,url]] })`

The first argument is the phase number (0 to 19). Lesson ids must stay unique and unchanged, because progress is saved by id. The sidebar, counters, phase map and quiz pick the lesson up on their own.

Numbers inside the demos are made up for teaching and do not come from the source course.
