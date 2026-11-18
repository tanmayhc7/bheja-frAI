# bheja frAI

A hands-on introduction to AI engineering. Work through short browser-based lessons with animations, interactive demos, and quick quizzes, from vectors and model evaluation to LLMs, agents, and production systems.

**[Open the course](https://tanmayhc7.github.io/bheja-frAI/)** · [Check prerequisites](https://tanmayhc7.github.io/bheja-frAI/#prereqs) · [Browse the glossary](https://tanmayhc7.github.io/bheja-frAI/#glossary)

## What you’ll learn

The course spans 20 phases. Start with Setup and Tooling, or pick a phase that matches what you want to learn.

| Area | Example topics |
| --- | --- |
| Foundations | Python environments, vectors, gradient descent, precision and recall |
| Models and modalities | Transformers, tokenization, diffusion, vision, and audio |
| LLM applications | Retrieval-augmented generation (RAG), structured outputs, tool calling, and evaluation |
| Agents and workflows | Model Context Protocol (MCP), agent loops, approval gates, and handoffs |
| Production and safety | Serving costs, observability, rollout, guardrails, and failure modes |
| ML system design | Baselines, deployment, drift monitoring, feature stores, and [interview practice](https://tanmayhc7.github.io/bheja-frAI/#practice) |

The home page gives you a starting point and lets you resume where you left off. XP, streaks, and lesson completion are saved in your browser. Use the [progress file controls](https://tanmayhc7.github.io/bheja-frAI/#about) to export or import a JSON backup.

## Run locally

Start a local server with Python 3 from the repository root.

```sh
python3 -m http.server --bind 127.0.0.1 8000
```

Open [localhost:8000](http://127.0.0.1:8000/). The site uses plain HTML, CSS, and JavaScript and requires no build step.

## Develop and test

| Path | Purpose |
| --- | --- |
| [`index.html`](index.html) | Site, lesson definitions, quizzes, and interactive demos |
| [`media/`](media/) | Video assets used by lessons |
| [`drafts/`](drafts/) | Earlier lesson and demo drafts |
| [`tests/`](tests/) | Browser simulation and canvas smoke tests |

To add a lesson, define a demo in `DEMOS` and register it with `lesson(phaseNumber, definition)` in `index.html`. Keep existing lesson IDs stable because browser progress is saved by ID.

Run the smoke tests from the repository root with Node.js and npm.

```sh
cd tests
npm ci
npm run smoke
npm run smoke-canvas
```

## Credits

bheja frAI is an independent companion to [AI Engineering from Scratch](https://github.com/rohitg00/ai-engineering-from-scratch), the MIT-licensed course by rohitg00. Demo numbers are illustrative.
