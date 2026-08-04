import { students } from "../constants/admin/students";
import { courses } from "../constants/admin/courses";

/**
 * Merge result records with student and course information.
 */
export function enrichResults(results) {
  return results.map((result) => {
    const student = students.find((s) => s.id === result.studentId);

    const course = courses.find((c) => c.code === result.courseCode);

    return {
      ...result,
      studentName: student?.fullName ?? "",
      matricNumber: student?.matricNumber ?? "",
      department: student?.department ?? "",
      level: student?.level ?? "",
      courseTitle: course?.title ?? "",
      unit: course?.unit ?? 0,
    };
  });
}

/**
 * Filter results.
 */
export function filterResults(results, { search, session, semester, level }) {
  return results.filter((result) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      !search ||
      result.studentName.toLowerCase().includes(keyword) ||
      result.matricNumber.toLowerCase().includes(keyword) ||
      result.courseCode.toLowerCase().includes(keyword) ||
      result.courseTitle.toLowerCase().includes(keyword);

    const matchesSession = !session || result.session === session;

    const matchesSemester = !semester || result.semester === semester;

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
    const first = String(a[sortKey]).toLowerCase();
    const second = String(b[sortKey]).toLowerCase();

    if (first < second) return sortDirection === "asc" ? -1 : 1;

    if (first > second) return sortDirection === "asc" ? 1 : -1;

    return 0;
  });
}
