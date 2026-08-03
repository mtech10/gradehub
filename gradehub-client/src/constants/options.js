export const DEPARTMENTS = [
  {
    value: "agricultural-engineering",
    label: "Agricultural Engineering",
  },
  {
    value: "computer-science",
    label: "Computer Science",
  },
  {
    value: "electrical-engineering",
    label: "Electrical Engineering",
  },
  {
    value: "civil-engineering",
    label: "Civil Engineering",
  },
  {
    value: "mechanical-engineering",
    label: "Mechanical Engineering",
  },
];

export const LEVELS = [
  { value: "100", label: "100 Level" },
  { value: "200", label: "200 Level" },
  { value: "300", label: "300 Level" },
  { value: "400", label: "400 Level" },
  { value: "500", label: "500 Level" },
  { value: "600", label: "600 Level" },
];

export const GENDERS = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

export const STUDENT_STATUS = [
  { value: "", label: "Select Status" },
  { value: "Active", label: "Active" },
  { value: "Graduated", label: "Graduated" },
  { value: "Deferred", label: "Deferred" },
  { value: "Suspended", label: "Suspended" },
];

export const SESSIONS = [
  { value: "", label: "Select Session" },
  { value: "2024/2025", label: "2024/2025" },
  { value: "2023/2024", label: "2023/2024" },
  { value: "2022/2023", label: "2022/2023" },
];

export const SEMESTERS = [
  { value: "First", label: "First Semester" },
  { value: "Second", label: "Second Semester" },
];

export const ADMISSION_YEARS = Array.from({ length: 10 }, (_, index) => {
  const year = 2025 - index;

  return {
    value: String(year),
    label: String(year),
  };
});

export const PROGRAMMES = [
  {
    value: "",
    label: "Select Programme",
  },
  {
    value: "B.Sc",
    label: "B.Sc",
  },
  {
    value: "B.Eng",
    label: "B.Eng",
  },
  {
    value: "B.Tech",
    label: "B.Tech",
  },
];

export const STATES = [
  { value: "", label: "Select State" },
  { value: "Oyo", label: "Oyo" },
  { value: "Lagos", label: "Lagos" },
  { value: "Ogun", label: "Ogun" },
  { value: "Osun", label: "Osun" },
  { value: "Ondo", label: "Ondo" },
  { value: "Ekiti", label: "Ekiti" },
];

export const COURSE_STATUS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];
