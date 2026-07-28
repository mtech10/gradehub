export function getProgressStatus(progress) {
  if (progress >= 75) {
    return {
      variant: "success",
      color: "bg-emerald-500",
      label: "On Track",
    };
  }

  if (progress >= 50) {
    return {
      variant: "info",
      color: "bg-blue-500",
      label: "In Progress",
    };
  }

  if (progress >= 25) {
    return {
      variant: "warning",
      color: "bg-amber-500",
      label: "Needs Attention",
    };
  }

  return {
    variant: "danger",
    color: "bg-red-500",
    label: "Just Started",
  };
}
