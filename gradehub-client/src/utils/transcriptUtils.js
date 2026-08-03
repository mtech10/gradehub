export function getAverageScore(courses = []) {
  if (!Array.isArray(courses) || courses.length === 0) return 0;

  const total = courses.reduce((sum, course) => sum + (course.score || 0), 0);

  return Number((total / courses.length).toFixed(1));
}

export function getHighestScore(courses = []) {
  if (!Array.isArray(courses) || courses.length === 0) return null;

  return courses.reduce((highest, current) =>
    current.score > highest.score ? current : highest,
  );
}

export function getLowestScore(courses = []) {
  if (!Array.isArray(courses) || courses.length === 0) return null;

  return courses.reduce((lowest, current) =>
    current.score < lowest.score ? current : lowest,
  );
}

export function getSemesterSummary(semester = {}) {
  const courses = semester.courses || [];

  return {
    gpa: semester.gpa || 0,
    units: semester.totalUnits || 0,
    totalCourses: courses.length,
    averageScore: getAverageScore(courses),
    highestScore: getHighestScore(courses),
    lowestScore: getLowestScore(courses),
  };
}

export function getSessionSummary(session = {}) {
  const semesters = session.semesters || [];

  const totalUnits = semesters.reduce(
    (sum, semester) => sum + (semester.totalUnits || 0),
    0,
  );

  const totalCourses = semesters.reduce(
    (sum, semester) => sum + (semester.courses || []).length,
    0,
  );

  const averageGpa =
    semesters.length > 0
      ? semesters.reduce((sum, semester) => sum + (semester.gpa || 0), 0) /
        semesters.length
      : 0;

  return {
    totalUnits,
    totalCourses,
    averageGpa: Number(averageGpa.toFixed(2)),
  };
}

export function getTranscriptSummary(sessions = []) {
  let totalCourses = 0;
  let totalUnits = 0;
  let totalGpa = 0;
  let semesterCount = 0;

  sessions.forEach((session) => {
    (session.semesters || []).forEach((semester) => {
      semesterCount++;

      totalUnits += semester.totalUnits || 0;
      totalCourses += (semester.courses || []).length;
      totalGpa += semester.gpa || 0;
    });
  });

  const cgpa =
    semesterCount > 0 ? Number((totalGpa / semesterCount).toFixed(2)) : 0;

  let degreeClass = "Pass";

  if (cgpa >= 4.5) degreeClass = "First Class";
  else if (cgpa >= 3.5) degreeClass = "Second Class Upper";
  else if (cgpa >= 2.4) degreeClass = "Second Class Lower";
  else if (cgpa >= 1.5) degreeClass = "Third Class";

  return {
    cgpa,
    totalCourses,
    totalUnits,
    totalSessions: sessions.length,
    degreeClass,
  };
}

export function getCgpaProgress(sessions = []) {
  return sessions.map((session) => {
    const semesters = session.semesters || [];

    const average =
      semesters.length > 0
        ? semesters.reduce((sum, semester) => sum + (semester.gpa || 0), 0) /
          semesters.length
        : 0;

    return {
      session: session.session,
      gpa: Number(average.toFixed(2)),
    };
  });
}
