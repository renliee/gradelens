# GradeLens: Student Performance Predictor

Predicts a student's final exam score from everyday factors (study hours,
attendance, sleep, motivation, family background, and more) and shows what
pushed the score up or down.

Machine Learning, Final Project. Group 8 (LA84), BINUS University.

The model is a Linear Regression trained on 6,607 student records. It explains
about 83% of the score variance and is off by roughly 0.4 points on average.

## Live demo

**https://gradelens-jb7z.onrender.com/**

**Deployment Note** : The first request may take up to 1 minute because the server goes to sleep when it hasn’t been used for a while.

## Running locally

### What you need

- Python 3.10 or newer
- Node.js 18 or newer 

### Setup (run once)

**Windows**
```bat
scripts\setup.bat
```

**macOS / Linux**
```bash
./scripts/setup.sh
```

Creates the Python environment and builds the frontend.

### Start

**Windows**
```bat
scripts\start.bat
```

**macOS / Linux**
```bash
./scripts/start.sh
```

Open <http://127.0.0.1:8000>. Press Ctrl+C to stop.

## Project structure

```
student-performance-v2forfriends/
  backend/     FastAPI server, trained model, and chart images
  frontend/    React dashboard (source + built files)
  notebook/    Training notebook and dataset
  scripts/     Setup and start scripts
```

## The three tabs

- **Dashboard** : enter a student's details and get a predicted score with a
  breakdown of which factors helped or hurt.
- **How it works** : model steps, accuracy numbers in plain language, and the
  analysis charts.
- **About** : project background and what the model is built on.

## Notes

- Input values are not capped to the dataset range. If a value falls outside
  the training range, the field flags it. Predictions outside that range are
  less reliable.

## Frontend dev mode

To work on the frontend with live reload, run both in separate terminals:

```bash
# terminal 1 — from backend/
.venv/bin/python -m uvicorn app.main:app --port 8000

# terminal 2 — from frontend/
npm run dev
```

Dev server runs on <http://127.0.0.1:5173>.