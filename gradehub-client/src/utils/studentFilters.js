// utils/studentHelpers.js

/**
 * Returns a student by ID.
 */
export function getStudentById(students, id) {
  return students.find((student) => student.id === id) || null;
}

/**
 * Filters students.
 */
export function filterStudents(
  students,
  { search = "", department = "", level = "", status = "" } = {},
) {
  const query = search.trim().toLowerCase();

  return students.filter((student) => {
    const matchesSearch =
      query === "" ||
      student.fullName.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.matricNumber.toLowerCase().includes(query);

    const matchesDepartment = !department || student.department === department;

    const matchesLevel = !level || student.level === level;

    const matchesStatus = !status || student.status === status;

    return matchesSearch && matchesDepartment && matchesLevel && matchesStatus;
  });
}

/**
 * Sorts students.
 */
export function sortStudents(students, sortKey, sortDirection = "asc") {
  if (!sortKey) return [...students];

  return [...students].sort((a, b) => {
    const first = String(a[sortKey] ?? "").toLowerCase();
    const second = String(b[sortKey] ?? "").toLowerCase();

    if (first < second) return sortDirection === "asc" ? -1 : 1;
    if (first > second) return sortDirection === "asc" ? 1 : -1;

    return 0;
  });
}

/**
 * Returns paginated students.
 */
export function paginateStudents(students, currentPage, pageSize) {
  const start = (currentPage - 1) * pageSize;

  return students.slice(start, start + pageSize);
}

/**
 * Returns statistics for the dashboard.
 */
export function getStudentStatistics(students) {
  return {
    total: students.length,

    active: students.filter((student) => student.status === "Active").length,

    graduated: students.filter((student) => student.status === "Graduated")
      .length,

    deferred: students.filter((student) => student.status === "Deferred")
      .length,
  };
}

/**
 * Returns unique departments.
 */
export function getDepartments(students) {
  return [...new Set(students.map((student) => student.department))].sort();
}

/**
 * Returns unique levels.
 */
export function getLevels(students) {
  return [...new Set(students.map((student) => student.level))].sort();
}

/**
 * Returns unique statuses.
 */
export function getStatuses(students) {
  return [...new Set(students.map((student) => student.status))].sort();
}
