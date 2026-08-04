import CourseAccordion from "../courses/CourseAccordion";

function RegisteredCourses({ semesters = [], activeTab, searchQuery }) {
  const filteredSemesters = semesters
    .map((semester) => {
      const filteredCourses = semester.courses.filter((course) => {
        const query = searchQuery?.toLowerCase().trim() || "";

        const matchesSearch =
          query === "" ||
          course.title.toLowerCase().includes(query) ||
          course.code.toLowerCase().includes(query);

        const tab = activeTab?.toLowerCase() || "all";
        const status = course.status?.toLowerCase() || "";

        let matchesTab = true;

        if (tab === "completed") {
          matchesTab = status === "completed";
        } else if (tab === "dropped") {
          matchesTab = status === "dropped";
        }

        return matchesSearch && matchesTab;
      });

      return {
        ...semester,
        courses: filteredCourses,
      };
    })
    .filter((semester) => {
      const tab = activeTab?.toLowerCase() || "all";

      if (tab === "current") {
        return semester.status === "Current";
      }

      if (
        tab === "completed" ||
        tab === "dropped" ||
        (searchQuery && searchQuery.trim() !== "")
      ) {
        return semester.courses.length > 0;
      }

      return true;
    });

  return (
    <div className="space-y-4">
      {filteredSemesters.length > 0 ? (
        filteredSemesters.map((semester) => (
          <CourseAccordion key={semester.id} data={semester} />
        ))
      ) : (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <p className="text-slate-500">No courses match your filters.</p>
        </div>
      )}
    </div>
  );
}

export default RegisteredCourses;
