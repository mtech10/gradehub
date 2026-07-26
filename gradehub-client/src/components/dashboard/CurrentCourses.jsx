import Card from "../ui/Card";
import { currentCourses } from "../../constants/currentCourses";
import { SCROLLBAR } from "../../constants/layout";
import { THEME } from "../../constants/theme";
import Badge from "../ui/Badge";
import { getCourseProgress } from "../../utils/courseUtils";

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
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {currentCourses.map((course) => {
              const progress = getCourseProgress(course.progress);

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

                  {/* <td className="px-6 py-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">
                          {course.progress}%
                        </span>

                        <Badge variant={progress.variant} size="sm">
                          {progress.status}
                        </Badge>
                      </div>

                      <div className="h-2.5 w-full rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${progress.color}`}
                          style={{
                            width: `${course.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td> */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-2.5 w-32 rounded-full bg-slate-200">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${progress.color}`}
                          style={{
                            width: `${course.progress}%`,
                          }}
                        />
                      </div>

                      <span className="min-w-[42px] text-sm font-semibold text-slate-700">
                        {course.progress}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <Badge variant={progress.variant}>{progress.status}</Badge>
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
