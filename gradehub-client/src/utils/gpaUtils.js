export const GRADE_POINTS = {
  A: 5.0,
  "B+": 4.5,
  B: 4.0,
  "C+": 3.5,
  C: 3.0,
  D: 2.0,
  E: 1.0,
};

export function calculateGPA(courses) {
  const totalUnits = courses.reduce(
    (sum, course) => sum + Number(course.units || 0),
    0,
  );

  const totalQualityPoints = courses.reduce((sum, course) => {
    const point = GRADE_POINTS[course.grade] ?? 0;
    return sum + Number(course.units || 0) * point;
  }, 0);

  const gpa = totalUnits > 0 ? totalQualityPoints / totalUnits : 0;

  return {
    totalUnits,
    totalQualityPoints: Number(totalQualityPoints.toFixed(2)),
    gpa: Number(gpa.toFixed(2)),
  };
}

export function getGPARemark(gpa) {
  if (gpa >= 4.5) return { label: "Excellent", variant: "success" };
  if (gpa >= 3.5) return { label: "Very Good", variant: "info" };
  if (gpa >= 2.5) return { label: "Good", variant: "warning" };
  if (gpa >= 1.5) return { label: "Fair", variant: "warning" };
  return { label: "Poor", variant: "danger" };
}

export function createEmptyCourse(id) {
  return {
    id,
    code: "",
    title: "",
    units: 3,
    grade: "A",
  };
}
