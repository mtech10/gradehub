import Card from "../ui/Card";
import Badge from "../ui/Badge";
import DataTable from "../ui/DataTable";

import { currentCourses } from "../../constants/currentCourses";
import { currentCoursesColumns } from "../../constants/tables/currentCoursesColumns";

import { SCROLLBAR } from "../../constants/layout";
import { THEME } from "../../constants/theme";

import { getProgressStatus } from "../../utils/progressUtils";

function CurrentCourses() {
  const renderCell = (course, column) => {
    switch (column.key) {
      case "code":
        return (
          <span className="font-semibold text-slate-900">{course.code}</span>
        );

      case "progress": {
        const status = getProgressStatus(course.progress);

        return (
          <div className="flex items-center gap-3">
            <div className="h-3 w-36 rounded-full bg-slate-200">
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
      <div className={`h-[420px] overflow-y-auto p-4 ${SCROLLBAR}`}>
        <DataTable
          columns={currentCoursesColumns}
          data={currentCourses}
          renderCell={renderCell}
        />
      </div>
    </Card>
  );
}

export default CurrentCourses;
