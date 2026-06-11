from __future__ import annotations

import json
from functools import lru_cache

import joblib
import pandas as pd

from . import config

FEATURE_ORDER = [
    "Hours_Studied", "Attendance", "Parental_Involvement", "Access_to_Resources",
    "Extracurricular_Activities", "Sleep_Hours", "Previous_Scores", "Motivation_Level",
    "Internet_Access", "Tutoring_Sessions", "Family_Income", "Teacher_Quality",
    "School_Type", "Peer_Influence", "Physical_Activity", "Learning_Disabilities",
    "Parental_Education_Level", "Distance_from_Home", "Gender",
]

PRETTY = {
    "Hours_Studied": "Hours studied", "Attendance": "Attendance",
    "Parental_Involvement": "Parental involvement", "Access_to_Resources": "Access to resources",
    "Extracurricular_Activities": "Extracurricular activities", "Sleep_Hours": "Sleep hours",
    "Previous_Scores": "Previous scores", "Motivation_Level": "Motivation level",
    "Internet_Access": "Internet access", "Tutoring_Sessions": "Tutoring sessions",
    "Family_Income": "Family income", "Teacher_Quality": "Teacher quality",
    "School_Type": "School type", "Peer_Influence": "Peer influence",
    "Physical_Activity": "Physical activity", "Learning_Disabilities": "Learning disabilities",
    "Parental_Education_Level": "Parental education", "Distance_from_Home": "Distance from home",
    "Gender": "Gender",
}


@lru_cache(maxsize=1)
def get_model():
    return joblib.load(config.MODEL_PATH)


@lru_cache(maxsize=1)
def get_meta() -> dict:
    with open(config.META_PATH) as f:
        return json.load(f)


def predict_score(inputs: dict) -> float:
    model = get_model()
    df = pd.DataFrame([inputs])[FEATURE_ORDER]
    raw = float(model.predict(df)[0])
    return max(0.0, raw)


def _baseline_inputs() -> dict:
    schema = get_meta()["feature_schema"]
    base: dict = {}
    for f in FEATURE_ORDER:
        if f in schema["numeric"]:
            base[f] = schema["numeric"][f]["median"]
        elif f in schema["ordinal"]:
            opts = schema["ordinal"][f]
            base[f] = opts[len(opts) // 2]
        else:
            base[f] = schema["nominal"][f][0]
    return base


@lru_cache(maxsize=1)
def _feature_mapping() -> list[str]:
    model = get_model()
    names = list(model.named_steps["preprocessor"].get_feature_names_out())
    nominal = get_meta()["feature_schema"]["nominal"]
    mapping = []
    for col in names:
        body = col.split("__", 1)[1]
        if col.startswith("nom__"):
            body = next((f for f in nominal if body.startswith(f + "_")), body)
        mapping.append(body)
    return mapping


def explain(inputs: dict) -> list[dict]:
    model = get_model()
    pre = model.named_steps["preprocessor"]
    coef = model.named_steps["model"].coef_
    mapping = _feature_mapping()

    base = _baseline_inputs()
    x_user = pre.transform(pd.DataFrame([inputs])[FEATURE_ORDER])[0]
    x_base = pre.transform(pd.DataFrame([base])[FEATURE_ORDER])[0]
    deltas = coef * (x_user - x_base)

    contrib: dict[str, float] = {}
    for feat, d in zip(mapping, deltas):
        contrib[feat] = contrib.get(feat, 0.0) + float(d)

    factors = [
        {"feature": f, "label": PRETTY.get(f, f), "impact": round(v, 2)}
        for f, v in contrib.items()
    ]
    factors.sort(key=lambda x: abs(x["impact"]), reverse=True)
    return factors


def band(score: float) -> dict:
    if score < 65:
        return {"level": "needs-improvement", "label": "Needs Improvement"}
    if score < 75:
        return {"level": "average", "label": "Average Performance"}
    return {"level": "strong", "label": "Strong Performance"}


def interpretation(score: float) -> str:
    if score >= 75:
        return (
            "This student is on track for strong performance. Keeping up the current "
            "study habits and engagement should sustain the result."
        )
    if score >= 65:
        return (
            "Performance is around average. Small improvements in study hours, "
            "attendance, or support can push the score higher."
        )
    return (
        "The predicted score is on the lower side. Targeted changes to study habits "
        "and learning support could meaningfully improve the outcome."
    )


def suggestions(inputs: dict) -> list[dict]:
    tips: list[dict] = []
    if inputs["Hours_Studied"] < 20:
        tips.append({"icon": "book", "text": "Add a few more study hours per week. It is one of the strongest drivers of the score."})
    if inputs["Attendance"] < 90:
        tips.append({"icon": "calendar", "text": "Aim for 90% or higher class attendance. It tracks closely with better outcomes."})
    if inputs["Sleep_Hours"] < 6 or inputs["Sleep_Hours"] > 9:
        tips.append({"icon": "moon", "text": "Target 7 to 8 hours of sleep per night. Consistent rest steadies recall."})
    if inputs["Motivation_Level"] == "Low":
        tips.append({"icon": "spark", "text": "Set small weekly goals to build motivation. It is a meaningful lever in the model."})
    if inputs["Tutoring_Sessions"] < 2:
        tips.append({"icon": "cap", "text": "Even one extra tutoring session per month is a high-value move."})
    if inputs["Access_to_Resources"] == "Low":
        tips.append({"icon": "book", "text": "Seek out more study resources. Library access and online materials help."})
    if inputs["Peer_Influence"] == "Negative":
        tips.append({"icon": "users", "text": "A more supportive study circle tracks with a better outcome."})

    if not tips:
        tips.append({"icon": "trophy", "text": "These habits already look strong. Stay consistent through exam season."})
    return tips[:4]


def run_prediction(features: dict) -> dict:
    score = predict_score(features)
    return {
        "score": round(score, 1),
        "band": band(score),
        "interpretation": interpretation(score),
        "factors": explain(features),
        "suggestions": suggestions(features),
    }


def get_metadata() -> dict:
    meta = get_meta()
    m = meta["test_metrics"]
    return {
        "best_model": meta["best_model"],
        "target": meta["target"],
        "target_range": meta["target_range"],
        "training_records": config.TRAINING_RECORDS,
        "metrics": {
            "MAE": round(m["MAE"], 4),
            "RMSE": round(m["RMSE"], 4),
            "R2": round(m["R2"], 4),
            "Adjusted_R2": round(m["Adjusted R2"], 4),
        },
    }


def get_feature_schema() -> dict:
    return get_meta()["feature_schema"]


def get_model_comparison() -> dict:
    out: dict = {"cv_results": [], "test_results": []}
    if config.CV_PATH.exists():
        out["cv_results"] = pd.read_csv(config.CV_PATH).round(4).to_dict(orient="records")
    if config.TEST_PATH.exists():
        out["test_results"] = pd.read_csv(config.TEST_PATH).round(4).to_dict(orient="records")
    return out


REPORT_CAPTIONS = [
    ("01_target_distribution.png", "How exam scores are spread across the 6,607 students."),
    ("02_correlation_heatmap.png", "How strongly the number-based factors move together."),
    ("03_ordinal_features.png", "Average exam score for low, medium, and high categories."),
    ("04_top_predictors.png", "The factors most strongly linked to the exam score."),
    ("05_cv_comparison.png", "Accuracy of every model we tried during selection."),
    ("06_actual_vs_predicted.png", "Predicted scores plotted against the real scores."),
    ("07_residual_analysis.png", "The leftover error after prediction, checked for bias."),
    ("08_feature_importance.png", "How much each factor shifts the final score."),
]


def list_reports() -> list[dict]:
    return [
        {"file": fname, "caption": caption}
        for fname, caption in REPORT_CAPTIONS
        if (config.REPORTS_DIR / fname).exists()
    ]
