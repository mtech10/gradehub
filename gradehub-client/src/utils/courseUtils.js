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
  switch (semester) {
    case 1:
      return {
        label: "1st Semester",
        variant: "primary",
      };
    case 2:
      return {
        label: "2nd Semester",
        variant: "success",
      };
    default:
      return {
        label: "-",
        variant: "secondary",
      };
  }
}

export function getCourseStatusBadge(status) {
  const normalizedStatus = status?.toLowerCase();

  if (normalizedStatus === "completed") {
    return "success";
  }
  if (normalizedStatus === "in progress" || normalizedStatus === "registered") {
    return "info";
  }
  if (normalizedStatus === "dropped") {
    return "danger";
  }

  return "secondary";
}
