# GradeLens — Student Performance Predictor

Predicts a student's final exam score from everyday factors (study hours,
attendance, sleep, motivation, family background, and more) and shows what
pushed the score up or down.

COMP6577001 Machine Learning, Final Project. Group 8 (LA84), BINUS University.

The model is a Linear Regression trained on 6,607 student records. It explains
about 83% of the differences in scores and is off by about 0.4 points on
average.

## What you need

- **Python 3.10 or newer**
- **Node.js 18 or newer** (used once to build the web page)

Works on Windows, macOS, and Linux.

## Setup (run once)

**macOS / Linux**

```bash
./scripts/setup.sh
```

**Windows**

```bat
scripts\setup.bat
```

This creates the Python environment and builds the web page.

## Run

**macOS / Linux**

```bash
./scripts/start.sh
```

**Windows**

```bat
scripts\start.bat
```

Then open <http://127.0.0.1:8000> in your browser. To stop it, press Ctrl+C.
To use a different port, set `PORT` first (for example `PORT=8200 ./scripts/start.sh`).

## What is inside

```
student-performance-v2/
  backend/        FastAPI server + the trained model and charts
  frontend/       React app (the dashboard you see in the browser)
  notebook/       The machine learning notebook + the dataset
  scripts/        setup and start scripts for each system
```

The three tabs in the app:

- **Dashboard** — enter a student's factors and get a predicted score with a
  breakdown of what mattered.
- **How it works** — the steps behind the model, the accuracy numbers in plain
  words, and the charts from the analysis.
- **About** — what the project is for and who made it.

## Notes

- **Inputs are not capped to the dataset.** If a student really studies 70 hours
  a week, you can enter 70. Each field shows the range seen in the data, and
  flags values outside it, since the model is only sure within that range.
- **Editing the team list:** open `frontend/src/data/team.ts`, change the names,
  IDs, and notes, then run the setup build step again (or `npm run build` inside
  `frontend/`).

## Developing the frontend

To work on the web page with live reload, run the API and the dev server in two
terminals:

```bash
# terminal 1 (from backend/)
.venv/bin/python -m uvicorn app.main:app --port 8000
# terminal 2 (from frontend/)
npm run dev
```

The dev server opens on <http://127.0.0.1:5173> and forwards data requests to
the API.
