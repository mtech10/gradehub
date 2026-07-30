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

export function getRegistrationSummary({
  courses,
  selectedCodes,
  droppedCodes,
  rules,
}) {
  const activeCourses = courses.filter((course) => {
    if (course.status === "Registered") {
      return !droppedCodes.includes(course.code);
    }

    return selectedCodes.includes(course.code);
  });

  const totalUnits = activeCourses.reduce(
    (sum, course) => sum + course.units,
    0,
  );

  const firstSemesterUnits = activeCourses
    .filter((course) => Number(course.semester) === 1)
    .reduce((sum, course) => sum + course.units, 0);

  const secondSemesterUnits = activeCourses
    .filter((course) => Number(course.semester) === 2)
    .reduce((sum, course) => sum + course.units, 0);

  const progressPercentage = (totalUnits / rules.maxUnits) * 100;

  const hasChanges = selectedCodes.length > 0 || droppedCodes.length > 0;

  const hasRegisteredCourses = activeCourses.length > 0;

  const isValid = totalUnits >= rules.minUnits && totalUnits <= rules.maxUnits;

  return {
    activeCourses,
    totalUnits,
    firstSemesterUnits,
    secondSemesterUnits,
    progressPercentage,
    hasChanges,
    hasRegisteredCourses,
    isValid,
    registeredCount: activeCourses.length,
    selectedCount: selectedCodes.length,
    rules,
  };
}

export function isCourseChecked(course, selectedCodes, droppedCodes) {
  if (course.status === "Registered") {
    return !droppedCodes.includes(course.code);
  }

  return selectedCodes.includes(course.code);
}
