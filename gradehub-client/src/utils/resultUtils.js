export function getResultStatus(score) {
  if (score >= 70) {
    return {
      grade: "A",
      gradePoint: 5.0,
      remark: "Excellent",
      variant: "success",
    };
  }

  if (score >= 60) {
    return {
      grade: "B",
      gradePoint: 4.0,
      remark: "Very Good",
      variant: "info",
    };
  }

  if (score >= 50) {
    return {
      grade: "C",
      gradePoint: 3.0,
      remark: "Good",
      variant: "warning",
    };
  }

  if (score >= 45) {
    return {
      grade: "D",
      gradePoint: 2.0,
      remark: "Pass",
      variant: "warning",
    };
  }

  if (score >= 40) {
    return {
      grade: "E",
      gradePoint: 1.0,
      remark: "Pass",
      variant: "danger",
    };
  }

  return {
    grade: "F",
    gradePoint: 0.0,
    remark: "Fail",
    variant: "danger",
  };
}
