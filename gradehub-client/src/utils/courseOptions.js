export function getCourseOptions(courses) {
  return courses.map((course) => ({
    value: course.code,
    label: `${course.code} - ${course.title}`,
  }));
}
