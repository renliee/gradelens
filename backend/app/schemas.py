from typing import Literal

from pydantic import BaseModel, Field

LowMedHigh = Literal["Low", "Medium", "High"]
YesNo = Literal["Yes", "No"]


class StudentFeatures(BaseModel):
    Hours_Studied: int = Field(..., ge=0, le=168, description="Study hours per week")
    Attendance: int = Field(..., ge=0, le=100, description="Class attendance (%)")
    Sleep_Hours: int = Field(..., ge=0, le=24, description="Sleep hours per night")
    Previous_Scores: int = Field(..., ge=0, le=100, description="Previous exam score")
    Tutoring_Sessions: int = Field(..., ge=0, le=200, description="Tutoring sessions per month")
    Physical_Activity: int = Field(..., ge=0, le=168, description="Active hours per week")

    Access_to_Resources: LowMedHigh
    Teacher_Quality: LowMedHigh
    School_Type: Literal["Public", "Private"]
    Internet_Access: YesNo
    Distance_from_Home: Literal["Near", "Moderate", "Far"]

    Motivation_Level: LowMedHigh
    Extracurricular_Activities: YesNo
    Peer_Influence: Literal["Negative", "Neutral", "Positive"]
    Learning_Disabilities: YesNo
    Gender: Literal["Male", "Female"]

    Parental_Involvement: LowMedHigh
    Family_Income: LowMedHigh
    Parental_Education_Level: Literal["High School", "College", "Postgraduate"]

    model_config = {
        "json_schema_extra": {
            "example": {
                "Hours_Studied": 20,
                "Attendance": 85,
                "Sleep_Hours": 7,
                "Previous_Scores": 75,
                "Tutoring_Sessions": 1,
                "Physical_Activity": 3,
                "Access_to_Resources": "Medium",
                "Teacher_Quality": "Medium",
                "School_Type": "Public",
                "Internet_Access": "Yes",
                "Distance_from_Home": "Near",
                "Motivation_Level": "Medium",
                "Extracurricular_Activities": "Yes",
                "Peer_Influence": "Neutral",
                "Learning_Disabilities": "No",
                "Gender": "Female",
                "Parental_Involvement": "Medium",
                "Family_Income": "Medium",
                "Parental_Education_Level": "College",
            }
        }
    }


class Factor(BaseModel):
    feature: str
    label: str
    impact: float


class Suggestion(BaseModel):
    icon: str
    text: str


class Band(BaseModel):
    level: Literal["needs-improvement", "average", "strong"]
    label: str


class PredictionResponse(BaseModel):
    score: float
    band: Band
    interpretation: str
    factors: list[Factor]
    suggestions: list[Suggestion]


class Metrics(BaseModel):
    MAE: float
    RMSE: float
    R2: float
    Adjusted_R2: float


class Metadata(BaseModel):
    best_model: str
    target: str
    target_range: list[float]
    training_records: int
    metrics: Metrics


class ReportImage(BaseModel):
    file: str
    caption: str
