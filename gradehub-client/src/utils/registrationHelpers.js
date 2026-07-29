export function getSemesterBadge(semester) {
  if (semester === 1 || semester === "1") {
    return {
      label: "1st",
      variant: "primary",
    };
  }

  return {
    label: "2nd",
    variant: "success",
  };
}
