export function getCourseProgress(progress) {
  if (progress === 100) {
    return {
      status: "Completed",
      variant: "success",
      color: "bg-green-700",
    };
  }

  if (progress >= 75) {
    return {
      status: "On Track",
      variant: "success",
      color: "bg-green-500",
    };
  }

  if (progress >= 50) {
    return {
      status: "In Progress",
      variant: "info",
      color: "bg-blue-500",
    };
  }

  if (progress >= 30) {
    return {
      status: "Needs Attention",
      variant: "warning",
      color: "bg-yellow-500",
    };
  }

  return {
    status: "Just Started",
    variant: "danger",
    color: "bg-red-500",
  };
}

export function getSemesterBadge(semester) {
  const value = String(
    semester?.name ?? semester?.semesterName ?? semester ?? "",
  ).toLowerCase();

  if (value === "1" || value.includes("first") || value.includes("1st")) {
    return {
      label: "1st",
      variant: "primary",
    };
  }

  if (value === "2" || value.includes("second") || value.includes("2nd")) {
    return {
      label: "2nd",
      variant: "success",
    };
  }

  return {
    label: "-",
    variant: "secondary",
  };
}

export function getCourseStatusBadge(status) {
  const normalizedStatus = status?.toLowerCase();

  switch (normalizedStatus) {
    case "completed":
      return "success";

    case "current":
    case "in progress":
    case "registered":
      return "info";

    case "failed":
    case "dropped":
      return "danger";

    default:
      return "secondary";
  }
}
