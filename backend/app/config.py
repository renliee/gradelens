from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent
PROJECT_DIR = BACKEND_DIR.parent

ARTIFACTS_DIR = BACKEND_DIR / "artifacts"
DATA_DIR = BACKEND_DIR / "data"
REPORTS_DIR = BACKEND_DIR / "reports"

MODEL_PATH = ARTIFACTS_DIR / "best_model.joblib"
META_PATH = ARTIFACTS_DIR / "model_metadata.json"
CV_PATH = ARTIFACTS_DIR / "cv_results.csv"
TEST_PATH = DATA_DIR / "test_results.csv"
DATASET_PATH = DATA_DIR / "StudentPerformanceFactors.csv"

FRONTEND_DIST = PROJECT_DIR / "frontend" / "dist"

TRAINING_RECORDS = 6607

CORS_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
]
