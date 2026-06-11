
export interface Member {
  name: string;
  studentId: string;
  role: string;
  did: string;
}

export const COURSE = {
  code: "COMP6577001",
  name: "Machine Learning",
  group: "Group 8",
  class: "LA84",
  project: "Student Performance Predictor",
  institution: "BINUS University",
};

export const TEAM: Member[] = [
  {
    name: "Chris Toper Jasson Hartanto",
    studentId: "2902557990",
    role: "Machine learning",
    did: "Trained and compared the models in the notebook.",
  },
  {
    name: "Frey Reinhardt Thio",
    studentId: "2902575255",
    role: "Backend and app",
    did: "Connected the trained model to the prediction API and built the app.",
  },
  {
    name: "Renata Lie",
    studentId: "2902555663",
    role: "Frontend",
    did: "Designed the dashboard and the score result screen.",
  },
  {
    name: "Yonathan Amadeo Hardy",
    studentId: "2902591706",
    role: "Data and charts",
    did: "Cleaned the data and made the analysis charts.",
  },
  {
    name: "Jason Kenneth Lay",
    studentId: "2902575330",
    role: "Evaluation and report",
    did: "Checked the model accuracy and wrote up the results.",
  },
];
