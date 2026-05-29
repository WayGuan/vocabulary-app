# Vocabulary App

A personal English vocabulary reference and flashcard app built with Astro, hosted on GitHub Pages.

**Live site:** https://wayguan.github.io/vocabulary-app/

## What it does

- **Review page (`/`)** — Anki-style flashcard session showing only words due today. Click a card to flip it, then rate it Again / Hard / Easy. Uses the SM-2 spaced repetition algorithm to schedule the next review.
- **All Words page (`/all`)** — Table of every word with next review date and streak count. Includes a live search filter.
- **Word page (`/words/<slug>`)** — Full entry with definition, example, origin, related words, and current review status.

Progress is saved in the browser's `localStorage` — no account or server needed.

## Adding a word

Create a Markdown file in `src/content/words/`. The filename becomes the URL slug.

```markdown
---
word: ephemeral
type: adjective
phonetic: /ɪˈfem.ər.əl/
definition: Lasting for a very short time; transitory.
example: "The ephemeral beauty of cherry blossoms makes them all the more precious."
tags: [time, nature]
---

**Origin:** Greek *ephemeros* (lasting a day)

**Related:** transient, fleeting, momentary
```

Only `word` and `definition` are required. Everything else is optional.

## Daily workflow

```bash
# 1. Start the dev server (hot-reloads on save)
npm run dev
# → open http://localhost:4321

# 2. Add a new word file in src/content/words/

# 3. Push to deploy
git add .
git commit -m "add: <word>"
git push
# → GitHub Actions rebuilds the site in ~1 minute
```

You never need to run `npm run build` manually — GitHub Actions handles it on every push.

## Project structure

```
src/
  content/
    config.ts          # content collection schema
    words/             # one .md file per word
  layouts/
    Layout.astro       # shared nav + base styles
  pages/
    index.astro        # review queue (flashcard session)
    all.astro          # all words table
    words/[slug].astro # individual word entry
  scripts/
    sm2.js             # SM-2 spaced repetition algorithm
.github/
  workflows/
    deploy.yml         # auto-deploy to GitHub Pages on push
```

## Tech stack

- **[Astro](https://astro.build)** — static site generator with built-in Markdown/frontmatter support
- **GitHub Pages** — free static hosting
- **GitHub Actions** — auto-deploys on every push to `main`/`master`
- **localStorage** — stores review progress in the browser (no backend)

## Local setup (first time)

```bash
git clone https://github.com/WayGuan/vocabulary-app.git
cd vocabulary-app
npm install
npm run dev
```
