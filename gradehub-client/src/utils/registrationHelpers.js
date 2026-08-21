export function getSemesterBadge(semester) {
  if (
    semester === 1 ||
    semester === "1" ||
    String(semester?.name || semester)
      .toLowerCase()
      .includes("first") ||
    String(semester?.name || semester)
      .toLowerCase()
      .includes("1st")
  ) {
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
  
  const getSemesterNumber = (semester) => {
    if (!semester) return null;

    if (semester === 1 || semester === "1") {
      return 1;
    }

    if (semester === 2 || semester === "2") {
      return 2;
    }

    const semesterName = String(semester.name || semester).toLowerCase();

    if (semesterName.includes("first") || semesterName.includes("1st")) {
      return 1;
    }

    if (semesterName.includes("second") || semesterName.includes("2nd")) {
      return 2;
    }

    return null;
  };

  
  const activeCourses = courses.filter((course) => {
    if (course.status === "Registered") {
      return !droppedCodes.includes(course.code);
    }

    return selectedCodes.includes(course.code);
  });

  
  const totalUnits = activeCourses.reduce(
    (sum, course) => sum + Number(course.units || 0),
    0,
  );

  
  const firstSemesterUnits = activeCourses
    .filter((course) => getSemesterNumber(course.semester) === 1)
    .reduce((sum, course) => sum + Number(course.units || 0), 0);

  
  const secondSemesterUnits = activeCourses
    .filter((course) => getSemesterNumber(course.semester) === 2)
    .reduce((sum, course) => sum + Number(course.units || 0), 0);

  const maxUnits = Number(rules?.maxUnits || 24);

  const progressPercentage = maxUnits > 0 ? (totalUnits / maxUnits) * 100 : 0;

  const hasChanges = selectedCodes.length > 0 || droppedCodes.length > 0;

  const hasRegisteredCourses = activeCourses.some(
    (course) => course.status === "Registered",
  );

  const isValid =
    totalUnits >= Number(rules?.minUnits || 12) && totalUnits <= maxUnits;

  return {
    activeCourses,
    totalUnits,
    firstSemesterUnits,
    secondSemesterUnits,
    progressPercentage,
    hasChanges,
    hasRegisteredCourses,
    isValid,
    registeredCount: activeCourses.filter(
      (course) => course.status === "Registered",
    ).length,
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
