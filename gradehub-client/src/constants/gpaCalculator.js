export const GRADE_OPTIONS = [
  { value: "A", label: "A (5.00)" },
  { value: "B+", label: "B+ (4.50)" },
  { value: "B", label: "B (4.00)" },
  { value: "C+", label: "C+ (3.50)" },
  { value: "C", label: "C (3.00)" },
  { value: "D", label: "D (2.00)" },
  { value: "E", label: "E (1.00)" },
];

export const UNIT_OPTIONS = [1, 2, 3, 4, 5, 6].map((unit) => ({
  value: String(unit),
  label: String(unit),
}));

export const initialCourses = [
  {
    id: 1,
    code: "AGE405",
    title: "Farm Power & Machinery",
    units: 3,
    grade: "A",
  },
  {
    id: 2,
    code: "AGE412",
    title: "Soil & Water Conservation",
    units: 3,
    grade: "B+",
  },
  {
    id: 3,
    code: "AGE416",
    title: "Project (Research)",
    units: 6,
    grade: "A",
  },
  {
    id: 4,
    code: "AGE418",
    title: "Agricultural Policy Analysis",
    units: 3,
    grade: "B+",
  },
  {
    id: 5,
    code: "GST401",
    title: "Industrial Training",
    units: 2,
    grade: "B",
  },
];

export const gpaTips = [
  "Enter all courses you are taking this semester.",
  "Ensure the units and grades are correct.",
  'Click "Calculate GPA" to see your results.',
  "Use CGPA Estimator to project your final CGPA.",
];

export const gradingScale = [
  { grade: "A", point: "5.00", range: "70 – 100", variant: "success" },
  { grade: "B+", point: "4.50", range: "60 – 69", variant: "success" },
  { grade: "B", point: "4.00", range: "50 – 59", variant: "info" },
  { grade: "C+", point: "3.50", range: "45 – 49", variant: "warning" },
  { grade: "C", point: "3.00", range: "40 – 44", variant: "warning" },
  { grade: "D", point: "2.00", range: "35 – 39", variant: "danger" },
  { grade: "E", point: "1.00", range: "0 – 34", variant: "danger" },
];
