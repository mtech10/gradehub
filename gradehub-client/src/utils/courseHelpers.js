export function filterCourses(courses, filters) {
  const { search, department, level, status } = filters;

  return courses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.title.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment = !department || course.department === department;

    const matchesLevel = !level || course.level === level;

    const matchesStatus = !status || course.status === status;

    return matchesSearch && matchesDepartment && matchesLevel && matchesStatus;
  });
}

export function sortCourses(courses, sortKey, sortDirection) {
  const sorted = [...courses];

  if (!sortKey) return sorted;

  sorted.sort((a, b) => {
    const first = String(a[sortKey]).toLowerCase();
    const second = String(b[sortKey]).toLowerCase();

    if (first < second) {
      return sortDirection === "asc" ? -1 : 1;
    }

    if (first > second) {
      return sortDirection === "asc" ? 1 : -1;
    }

    return 0;
  });

  return sorted;
}
