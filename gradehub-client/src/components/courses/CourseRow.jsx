import { User } from "lucide-react";
import Badge from "../ui/Badge";
import {
  getSemesterBadge,
  getCourseStatusBadge,
} from "../../utils/courseUtils";

function CourseRow({ course }) {
  const semesterBadge = getSemesterBadge(course.semester);
  const statusVariant = getCourseStatusBadge(course.status);

  const displayStatus =
    course.status === "current"
      ? "Current"
      : course.status === "completed"
        ? "Completed"
        : course.status === "failed"
          ? "Failed"
          : course.status;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-100 px-4 py-4 last:border-b-0">
      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <div className="flex h-10 w-14 sm:w-16 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs sm:text-sm font-bold text-blue-600">
          {course.code}
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="truncate font-semibold text-slate-900 text-sm sm:text-base">
            {course.title}
          </h4>

          <div className="mt-0.5 sm:mt-1 flex items-center gap-1.5 text-xs sm:text-sm text-slate-500">
            <User size={13} className="shrink-0" />
            <span className="truncate">
              {course.lecturer || "Department Faculty"}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
        <div className="text-xs sm:text-sm font-medium text-slate-700">
          {course.units} {course.units === 1 ? "Unit" : "Units"}
        </div>

        <div className="hidden md:block">
          <Badge variant={semesterBadge.variant} size="sm">
            {semesterBadge.label}
          </Badge>
        </div>

        <div>
          <Badge variant={statusVariant} size="sm" className="capitalize">
            {displayStatus}
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default CourseRow;
