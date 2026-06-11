import type { StudentInput } from "./types";

export interface NumericField {
  key: keyof StudentInput;
  label: string;
  unit: string;
  step: number;
}

export interface ChoiceField {
  key: keyof StudentInput;
  label: string;
  options: string[];
}

export interface Section {
  title: string;
  numeric: NumericField[];
  choice: ChoiceField[];
}

export const DEFAULT_INPUT: StudentInput = {
  Hours_Studied: 20,
  Attendance: 80,
  Sleep_Hours: 7,
  Previous_Scores: 75,
  Tutoring_Sessions: 1,
  Physical_Activity: 3,
  Access_to_Resources: "Medium",
  Teacher_Quality: "Medium",
  School_Type: "Public",
  Internet_Access: "Yes",
  Distance_from_Home: "Near",
  Motivation_Level: "Medium",
  Extracurricular_Activities: "Yes",
  Peer_Influence: "Neutral",
  Learning_Disabilities: "No",
  Gender: "Female",
  Parental_Involvement: "Medium",
  Family_Income: "Medium",
  Parental_Education_Level: "College",
};

export const SECTIONS: Section[] = [
  {
    title: "Study habits",
    numeric: [
      { key: "Hours_Studied", label: "Hours studied", unit: "per week", step: 1 },
      { key: "Attendance", label: "Attendance", unit: "percent", step: 1 },
      { key: "Sleep_Hours", label: "Sleep", unit: "hours per night", step: 1 },
      { key: "Previous_Scores", label: "Previous score", unit: "out of 100", step: 1 },
      { key: "Tutoring_Sessions", label: "Tutoring", unit: "sessions per month", step: 1 },
      { key: "Physical_Activity", label: "Physical activity", unit: "hours per week", step: 1 },
    ],
    choice: [],
  },
  {
    title: "Learning environment",
    numeric: [],
    choice: [
      { key: "Access_to_Resources", label: "Access to resources", options: ["Low", "Medium", "High"] },
      { key: "Teacher_Quality", label: "Teacher quality", options: ["Low", "Medium", "High"] },
      { key: "School_Type", label: "School type", options: ["Public", "Private"] },
      { key: "Internet_Access", label: "Internet access", options: ["Yes", "No"] },
      { key: "Distance_from_Home", label: "Distance from home", options: ["Near", "Moderate", "Far"] },
    ],
  },
  {
    title: "Personal factors",
    numeric: [],
    choice: [
      { key: "Motivation_Level", label: "Motivation", options: ["Low", "Medium", "High"] },
      { key: "Extracurricular_Activities", label: "Extracurricular", options: ["Yes", "No"] },
      { key: "Peer_Influence", label: "Peer influence", options: ["Negative", "Neutral", "Positive"] },
      { key: "Learning_Disabilities", label: "Learning disability", options: ["No", "Yes"] },
      { key: "Gender", label: "Gender", options: ["Female", "Male"] },
    ],
  },
  {
    title: "Family background",
    numeric: [],
    choice: [
      { key: "Parental_Involvement", label: "Parental involvement", options: ["Low", "Medium", "High"] },
      { key: "Family_Income", label: "Family income", options: ["Low", "Medium", "High"] },
      { key: "Parental_Education_Level", label: "Parental education", options: ["High School", "College", "Postgraduate"] },
    ],
  },
];
