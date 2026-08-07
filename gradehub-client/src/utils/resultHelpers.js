import {
  GraduationCap,
  BookOpen,
  Target,
  Award,
  TrendingUp,
  Trophy,
  TrendingDown,
  BookOpenCheck,
} from "lucide-react";

/**
 * Merge result records with student and course information from the database payload.
 * (Now relies purely on the backend's populated relations instead of static constants)
 */
export function enrichResults(results) {
  return results.map((result) => ({
    ...result,
    // Flatten nested objects from the database for easy table rendering
    studentName: result.student
      ? `${result.student.firstName} ${result.student.lastName}`
      : "",
    matricNumber: result.student?.matricNumber ?? "",
    department: result.student?.department?.name ?? "",
    level: result.student?.level?.name ?? "",
    courseCode: result.course?.code ?? "",
    courseTitle: result.course?.title ?? "",
    unit: result.course?.creditUnit ?? 0,
    sessionName: result.session?.name ?? "",
    semesterName: result.semester?.name ?? "",
  }));
}

/**
 * Filter results.
 */
export function filterResults(results, { search, session, semester, level }) {
  return results.filter((result) => {
    const keyword = search?.toLowerCase() || "";

    const matchesSearch =
      !search ||
      (result.studentName || "").toLowerCase().includes(keyword) ||
      (result.matricNumber || "").toLowerCase().includes(keyword) ||
      (result.courseCode || "").toLowerCase().includes(keyword) ||
      (result.courseTitle || "").toLowerCase().includes(keyword);

    // Ensure we are matching against the flattened keys from enrichResults
    const matchesSession = !session || result.sessionName === session;
    const matchesSemester = !semester || result.semesterName === semester;
    const matchesLevel = !level || result.level === level;

    return matchesSearch && matchesSession && matchesSemester && matchesLevel;
  });
}

/**
 * Sort results.
 */
export function sortResults(results, sortKey, sortDirection) {
  if (!sortKey) return results;

  return [...results].sort((a, b) => {
    // Safely handle null/undefined values during sort
    const first = String(a[sortKey] || "").toLowerCase();
    const second = String(b[sortKey] || "").toLowerCase();

    if (first < second) return sortDirection === "asc" ? -1 : 1;
    if (first > second) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
}

/**
 * Map nested transcript data to the UI format required by the Student Results page.
 */
export const mapTranscriptToResultsUI = (transcriptData) => {
  const { summary, sessions } = transcriptData;

  let allCourses = [];
  let highestScore = 0;
  let lowestScore = 100;
  let highestCourse = "N/A";
  let lowestCourse = "N/A";
  let bestSemesterGpa = 0;
  let bestSemesterName = "N/A";
  let totalSemesters = 0;

  // Flatten the nested courses and calculate dynamic stats
  sessions?.forEach((session) => {
    session.semesters?.forEach((semester) => {
      totalSemesters++;

      // Track Best Semester
      if (semester.gpa > bestSemesterGpa) {
        bestSemesterGpa = semester.gpa;
        bestSemesterName = `${session.name} ${semester.name}`;
      }

      semester.courses?.forEach((course) => {
        // Push flat course object for the ResultsTable
        allCourses.push({
          id: course.id,
          code: course.code,
          course: course.title,
          unit: course.creditUnit || 0,
          score: course.totalScore || 0,
          grade: course.grade,
          gradePoint: course.gradePoint,
          session: session.name,
          semester: semester.name,
        });

        // Track Highest Score
        if (course.totalScore > highestScore) {
          highestScore = course.totalScore;
          highestCourse = course.code;
        }

        // Track Lowest Score
        if (course.totalScore < lowestScore) {
          lowestScore = course.totalScore;
          lowestCourse = course.code;
        }
      });
    });
  });

  // Edge case fallback
  if (lowestScore === 100 && allCourses.length === 0) lowestScore = 0;

  // Determine Academic Standing based on standard CGPA scales
  let academicStanding = "Good Standing";
  if (summary.cgpa >= 4.5) academicStanding = "First Class";
  else if (summary.cgpa >= 3.5) academicStanding = "Second Class Upper";
  else if (summary.cgpa >= 2.4) academicStanding = "Second Class Lower";

  return {
    resultsList: allCourses,
    topStats: [
      {
        title: "CGPA",
        value: summary.cgpa?.toFixed(2) || "0.00",
        suffix: "/5.00",
        subtitle: "Overall",
        footer: "Cumulative performance",
        icon: GraduationCap,
        color: "primary",
      },
      {
        title: "Total Courses",
        value: (summary.passedCourses || 0) + (summary.failedCourses || 0),
        subtitle: "Attempted",
        footer: "Across all semesters",
        icon: BookOpen,
        color: "success",
      },
      {
        title: "Total Units",
        value: summary.earnedCredits || 0,
        subtitle: "Earned",
        footer: "Successfully completed",
        icon: Target,
        color: "warning",
      },
      {
        title: "Best Semester",
        value: bestSemesterGpa.toFixed(2),
        subtitle: bestSemesterName,
        footer: "Highest GPA achieved",
        icon: Award,
        color: "purple",
      },
      {
        title: "Average Grade",
        value: summary.cgpa >= 4.5 ? "A" : summary.cgpa >= 3.5 ? "B" : "C",
        subtitle: "Estimated",
        footer: "Based on CGPA",
        icon: TrendingUp,
        color: "success",
      },
    ],
    bottomSummary: [
      {
        title: "Credit Units Earned",
        value: summary.earnedCredits || 0,
        subtitle: `Out of ${summary.attemptedCredits || 0} Units`,
        footer: "Programme Completion",
        icon: Target,
        color: "green",
      },
      {
        title: "Highest Score",
        value: `${highestScore}%`,
        subtitle: highestCourse,
        footer: "Top Performance",
        icon: Trophy,
        color: "blue",
      },
      {
        title: "Lowest Score",
        value: `${lowestScore}%`,
        subtitle: lowestCourse,
        footer: "Needs Improvement",
        icon: TrendingDown,
        color: "orange",
      },
      {
        title: "Academic Standing",
        value: academicStanding,
        subtitle: "Current Performance",
        footer: "Based on CGPA",
        icon: Award,
        color: "purple",
      },
      {
        title: "Semesters Completed",
        value: totalSemesters,
        subtitle: "Undergraduate Programme",
        footer: "Academic Progress",
        icon: BookOpenCheck,
        color: "blue",
      },
    ],
  };
};
