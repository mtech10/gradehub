import Card from "../ui/Card";
import { currentCourses } from "../../constants/currentCourses";
import { SCROLLBAR } from "../../constants/layout";
import { THEME } from "../../constants/theme";

function CurrentCourses() {
  return (
    <Card
      title="Current Semester Courses"
      subtitle="Active registered courses"
      padding="none"
      bodyClassName="max-h-[420px] overflow-y-auto"
      headerAction={
        <button
          type="button"
          className={`${THEME.linkButton.base} ${THEME.linkButton.primary}`}
        >
          View all courses
        </button>
      }
    >
      <div className={`h-[420px] overflow-y-auto p-6 space-y-5 ${SCROLLBAR}`}>
        {" "}
        {/* Table */}
        <table className="w-full">
          <thead className="sticky top-0 bg-white z-10 border-b border-slate-200">
            <tr className="text-left text-sm text-slate-500">
              <th className="px-6 py-4">Course Code</th>

              <th className="px-6 py-4">Course Title</th>

              <th className="px-6 py-4 text-center">Units</th>

              <th className="px-6 py-4">Lecturer</th>

              <th className="px-6 py-4">Progress</th>
            </tr>
          </thead>

          <tbody>
            {currentCourses.map((course) => {
              return (
                <tr
                  key={course.code}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-5 font-semibold">{course.code}</td>

                  <td className="px-6 py-5">{course.title}</td>

                  <td className="px-6 py-5 text-center">{course.units}</td>

                  <td className="px-6 py-5">{course.lecturer}</td>

                  {/* Progress */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-36 rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full ${course.color}`}
                          style={{
                            width: `${course.progress}%`,
                          }}
                        />
                      </div>

                      <span className="min-w-[45px] text-sm font-semibold text-slate-600">
                        {course.progress}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default CurrentCourses;
