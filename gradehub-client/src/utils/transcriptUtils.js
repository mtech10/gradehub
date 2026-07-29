export function getAverageScore(results = []) {
  if (!results.length) return 0;

  const total = results.reduce((sum, course) => sum + course.score, 0);

  return total / results.length;
}

export function getHighestScore(results = []) {
  if (!results.length) return null;

  return results.reduce((highest, current) =>
    current.score > highest.score ? current : highest,
  );
}

export function getLowestScore(results = []) {
  if (!results.length) return null;

  return results.reduce((lowest, current) =>
    current.score < lowest.score ? current : lowest,
  );
}

export function getSemesterSummary(semester) {
  return {
    gpa: semester.gpa,
    units: semester.units,
    totalCourses: semester.results.length,
    averageScore: getAverageScore(semester.results),
    highestScore: getHighestScore(semester.results),
    lowestScore: getLowestScore(semester.results),
  };
}

export function getSessionSummary(session) {
  const totalUnits = session.semesters.reduce(
    (sum, semester) => sum + semester.units,
    0,
  );

  const totalCourses = session.semesters.reduce(
    (sum, semester) => sum + semester.results.length,
    0,
  );

  const averageGpa =
    session.semesters.reduce((sum, semester) => sum + semester.gpa, 0) /
    session.semesters.length;

  return {
    totalUnits,
    totalCourses,
    averageGpa,
  };
}

export function getTranscriptSummary(transcript) {
  let totalSessions = transcript.length;
  let totalCourses = 0;
  let totalUnits = 0;
  let totalGpa = 0;
  let semesterCount = 0;

  transcript.forEach((session) => {
    session.semesters.forEach((semester) => {
      semesterCount++;

      totalUnits += semester.units;
      totalCourses += semester.results.length;
      totalGpa += semester.gpa;
    });
  });

  const cgpa = semesterCount > 0 ? totalGpa / semesterCount : 0;

  let degreeClass = "Pass";

  if (cgpa >= 4.5) degreeClass = "First Class";
  else if (cgpa >= 3.5) degreeClass = "Second Class Upper";
  else if (cgpa >= 2.4) degreeClass = "Second Class Lower";
  else if (cgpa >= 1.5) degreeClass = "Third Class";

  return {
    cgpa: cgpa.toFixed(2),
    totalCourses,
    totalUnits,
    totalSessions,
    degreeClass,
  };
}

export function getCgpaProgress(transcript) {
  return transcript.map((session) => {
    const averageGpa =
      session.semesters.reduce((sum, semester) => sum + semester.gpa, 0) /
      session.semesters.length;

    return {
      session: session.session,
      gpa: Number(averageGpa.toFixed(2)),
    };
  });
}
