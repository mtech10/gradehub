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
