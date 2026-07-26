export function getResultStatus(score) {
  if (score >= 70) {
    return {
      grade: "A",
      remark: "Excellent",
      variant: "success",
      color: "green",
    };
  }

  if (score >= 60) {
    return {
      grade: "B",
      remark: "Very Good",
      variant: "info",
      color: "blue",
    };
  }

  if (score >= 50) {
    return {
      grade: "C",
      remark: "Good",
      variant: "warning",
      color: "yellow",
    };
  }

  if (score >= 45) {
    return {
      grade: "D",
      remark: "Pass",
      variant: "secondary",
      color: "orange",
    };
  }

  if (score >= 40) {
    return {
      grade: "E",
      remark: "Marginal Pass",
      variant: "secondary",
      color: "amber",
    };
  }

  return {
    grade: "F",
    remark: "Fail",
    variant: "danger",
    color: "red",
  };
}
