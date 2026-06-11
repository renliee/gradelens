from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from . import config, model
from .schemas import Metadata, PredictionResponse, ReportImage, StudentFeatures


@asynccontextmanager
async def lifespan(_: FastAPI):
    model.get_model()
    model.get_meta()
    model._feature_mapping()
    yield


app = FastAPI(
    title="GradeLens API",
    description="Serves the trained Linear Regression pipeline for the "
    "COMP6577001 Machine Learning final project.",
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

if config.REPORTS_DIR.exists():
    app.mount("/reports", StaticFiles(directory=config.REPORTS_DIR), name="reports")


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/api/metadata", response_model=Metadata)
def metadata() -> dict:
    return model.get_metadata()


@app.get("/api/schema")
def schema() -> dict:
    return model.get_feature_schema()


@app.get("/api/model-comparison")
def model_comparison() -> dict:
    return model.get_model_comparison()


@app.get("/api/reports", response_model=list[ReportImage])
def reports() -> list[dict]:
    return model.list_reports()


@app.post("/api/predict", response_model=PredictionResponse)
def predict(features: StudentFeatures) -> dict:
    return model.run_prediction(features.model_dump())


if config.FRONTEND_DIST.exists():
    assets_dir = config.FRONTEND_DIST / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/")
    def index() -> FileResponse:
        return FileResponse(config.FRONTEND_DIST / "index.html")

    @app.get("/{full_path:path}")
    def spa_fallback(full_path: str) -> FileResponse:
        candidate = config.FRONTEND_DIST / full_path
        if candidate.is_file():
            return FileResponse(candidate)
        return FileResponse(config.FRONTEND_DIST / "index.html")
