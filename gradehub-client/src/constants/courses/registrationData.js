export const initialRegistrationData = [
  {
    code: "AGE401",
    title: "Farm Power & Machinery",
    units: 3,
    semester: 1,
    lecturer: "Dr. A. O. Adejumo",
    registered: true,
  },
  {
    code: "AGE403",
    title: "Agricultural Electrification",
    units: 2,
    semester: 1,
    lecturer: "Prof. K. Jimoh",
    registered: false,
  },
  {
    code: "AGE405",
    title: "Irrigation Engineering",
    units: 3,
    semester: 2,
    lecturer: "Dr. M. B. Idowu",
    registered: false,
  },
  {
    code: "AGE407",
    title: "Agricultural Structures",
    units: 3,
    semester: 2,
    lecturer: "Dr. K. T. Oladimeji",
    registered: false,
  },
  {
    code: "GST401",
    title: "Industrial Training",
    units: 2,
    semester: 1,
    lecturer: "Dr. S. A. Onasanya",
    registered: true,
  },
];

export const registrationRules = {
  minUnits: 15,
  maxUnits: 24,
  deadline: "September 15, 2026",
  status: "Open", // Can be "Open", "Closed", or "Late"
};
