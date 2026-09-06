# Cadence

Cadence is a personalized coding interview preparation planner. Instead of giving you a static list of problems, it creates a day by day study plan based on three things you choose: the question set you want to complete (Blind 75 or NeetCode 150), your deadline, and how many problems you can realistically solve each day.

Each day shows you exactly what to work on. This can include new questions or questions that are due for review. Each day also starts with a short introduction to the topic and links to useful resources such as NeetCode, Abdul Bari, GeeksforGeeks, and MIT OpenCourseWare.

## Why it exists

Most problem trackers tell you what problems are available, but they do not tell you what to work on today. They also usually do not include a review system or handle missed days well.

Cadence creates a study plan around your deadline and automatically adjusts the remaining work when you miss a day.

## Core features

* Three step onboarding: question list, deadline, and daily capacity
* Automatically divides the plan into a learning phase and a review phase
* A **Today** view with the day's topic, a simple explanation, useful resources, and the problem list
* Every question links to its official LeetCode page and a NeetCode solution
* Missed tasks move to the next day without changing your deadline
* A banner shows when you have missed tasks
* If you reach your deadline with unfinished tasks, you can extend the plan by a few days
* A **Plan** tab with a day by day calendar showing done, partial, missed, today, and future days
* Click any day to see its full question list
* Progress is automatically saved using `localStorage`

## Local setup

The app loads its data using `fetch()`, so you need to run it through a local server instead of opening the files directly.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Data sources and limits

* Question titles, topics, and difficulty come from the public Blind 75 and NeetCode 150 question sets.
* LeetCode problem statements are not reproduced in the app. Each question links to the official LeetCode page.
* If an exact NeetCode video link is not available for a question, the solution link uses a YouTube search limited to the NeetCode channel.
* These search links are clearly labeled as searches instead of specific videos.
* See `js/links.js` and `CONTRIBUTING.md` for information about adding exact video links.

## Tech stack

* HTML
* CSS
* Vanilla JavaScript
* JSON


There is no build step, framework, or backend.

Question data is stored in two JSON files, and user progress is saved in `localStorage`.
