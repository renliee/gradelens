import type {
  FeatureSchema,
  Metadata,
  ModelComparison,
  Prediction,
  ReportImage,
  StudentInput,
} from "./types";

const BASE = "";

async function getJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`${path} returned ${res.status}`);
  return res.json() as Promise<T>;
}

export const getMetadata = () => getJSON<Metadata>("/api/metadata");
export const getSchema = () => getJSON<FeatureSchema>("/api/schema");
export const getReports = () => getJSON<ReportImage[]>("/api/reports");
export const getModelComparison = () =>
  getJSON<ModelComparison>("/api/model-comparison");

export async function predict(input: StudentInput): Promise<Prediction> {
  const res = await fetch(`${BASE}/api/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    let detail = `Prediction failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.detail) detail = JSON.stringify(body.detail);
    } catch {
    }
    throw new Error(detail);
  }
  return res.json() as Promise<Prediction>;
}

export const reportURL = (file: string) => `${BASE}/reports/${file}`;
