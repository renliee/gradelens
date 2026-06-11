export interface StudentInput {
  Hours_Studied: number;
  Attendance: number;
  Sleep_Hours: number;
  Previous_Scores: number;
  Tutoring_Sessions: number;
  Physical_Activity: number;
  Access_to_Resources: string;
  Teacher_Quality: string;
  School_Type: string;
  Internet_Access: string;
  Distance_from_Home: string;
  Motivation_Level: string;
  Extracurricular_Activities: string;
  Peer_Influence: string;
  Learning_Disabilities: string;
  Gender: string;
  Parental_Involvement: string;
  Family_Income: string;
  Parental_Education_Level: string;
}

export interface Factor {
  feature: string;
  label: string;
  impact: number;
}

export interface Suggestion {
  icon: string;
  text: string;
}

export interface Band {
  level: "needs-improvement" | "average" | "strong";
  label: string;
}

export interface Prediction {
  score: number;
  band: Band;
  interpretation: string;
  factors: Factor[];
  suggestions: Suggestion[];
}

export interface Metrics {
  MAE: number;
  RMSE: number;
  R2: number;
  Adjusted_R2: number;
}

export interface Metadata {
  best_model: string;
  target: string;
  target_range: number[];
  training_records: number;
  metrics: Metrics;
}

export interface NumericRange {
  min: number;
  max: number;
  mean: number;
  median: number;
}

export interface FeatureSchema {
  numeric: Record<string, NumericRange>;
  ordinal: Record<string, string[]>;
  nominal: Record<string, string[]>;
}

export interface ReportImage {
  file: string;
  caption: string;
}

export interface ModelRow {
  Model: string;
  [key: string]: string | number;
}

export interface ModelComparison {
  cv_results: ModelRow[];
  test_results: ModelRow[];
}
