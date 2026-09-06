# Cadence

Cadence is a personalized coding-interview preparation planner. Instead of
handing you a static list of problems, it builds a day-by-day study routine
from three things you tell it: which question set you want to cover (Blind 75
or NeetCode 150), your deadline, and how many problems you can realistically
do on a learning day.

Every day it tells you exactly what to work on — new questions, or questions
due for review — and each day opens with a short introduction to that day's
topic plus links to reputable resources (NeetCode, Abdul Bari, GeeksforGeeks,
and MIT OpenCourseWare where relevant) before the problem list itself.

## Why it exists

Problem-list trackers are good at telling you *what exists*. They're less
good at telling you *what to do today* — and almost none of them build in
spaced review, or gracefully handle the very normal case of missing a day.
Cadence's planner treats your deadline as fixed and reflows the remaining
work around it instead.

## Core features

- Three-step onboarding: question list → deadline → daily capacity
- Automatic split into a learning phase and a review phase
- A "Today" view that opens with the day's topic, a plain-language
  explanation of it, and a short list of reliable external resources
- Every question links to its canonical LeetCode problem page and a
  NeetCode solution reference
- Missed tasks carry into the next day with a visible banner, without
  moving your deadline
- If you reach your deadline with tasks still open, you can extend the
  plan by a few days rather than losing your progress
- A Plan tab with a day-by-day calendar (done / partial / missed / today
  / future) — click any day to see its full question list
- Progress persists automatically in `localStorage`

## Local setup

The app loads its data with `fetch()`, so open it through a local server
rather than a `file://` URL:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Data sources and limits

- Question titles, topics, and difficulty are drawn from the well-known
  public Blind 75 and NeetCode 150 curricula. LeetCode problem statements
  themselves are never reproduced here — every question links out to the
  canonical LeetCode page instead.
- Where an exact, verified NeetCode video URL isn't yet recorded for a
  question, the "solution" link falls back to a YouTube search scoped to
  NeetCode's channel, clearly labeled as a search rather than a specific
  video. See `js/links.js` and `CONTRIBUTING.md` for how to upgrade a
  question to an exact link.

## Tech stack

Plain HTML, CSS, and vanilla JavaScript (ES modules) — no build step, no
framework, no backend. Data lives in two JSON files. Persistence is
`localStorage`.
