import Card from "../ui/Card";
import Badge from "../ui/Badge";
import DataTable from "../ui/DataTable";

import { currentCoursesColumns } from "../../constants/tables/currentCoursesColumns";
import { THEME } from "../../constants/theme";
import { getProgressStatus } from "../../utils/progressUtils";

function CurrentCourses({ courses = [] }) {
  const renderCell = (course, column) => {
    switch (column.key) {
      case "code":
        return (
          <span className="font-semibold text-slate-900">{course.code}</span>
        );

      case "progress": {
        const status = getProgressStatus(course.progress);

        return (
          <div className="flex items-center gap-2 sm:gap-3 min-w-[140px]">
            <div className="h-2.5 sm:h-3 flex-1 rounded-full bg-slate-200 overflow-hidden">
              <div
                className={`h-full rounded-full ${status.color}`}
                style={{
                  width: `${course.progress}%`,
                }}
              />
            </div>

            <Badge variant={status.variant}>{course.progress}%</Badge>
          </div>
        );
      }

      default:
        return course[column.key];
    }
  };

  return (
    <Card
      title="Current Semester Courses"
      subtitle="Active registered courses"
      padding="none"
      headerAction={
        <button
          type="button"
          className={`${THEME.linkButton.base} ${THEME.linkButton.primary} text-xs sm:text-sm`}
        >
          View all courses
        </button>
      }
    >
      <div className="p-3 sm:p-5">
        <DataTable
          columns={currentCoursesColumns}
          data={courses}
          renderCell={renderCell}
          pagination={false}
        />
      </div>
    </Card>
  );
}

export default CurrentCourses;
