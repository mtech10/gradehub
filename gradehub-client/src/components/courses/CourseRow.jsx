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
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:px-6">
      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
          {course.code}
        </div>

        <div className="min-w-0">
          <h4 className="truncate font-semibold text-slate-900">
            {course.title}
          </h4>

          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <User size={14} />
            <span>{course.lecturer || "Department Faculty"}</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex shrink-0 items-center gap-4 sm:gap-8">
        <div className="w-16 text-center text-sm font-medium text-slate-700">
          {course.units} {course.units === 1 ? "Unit" : "Units"}
        </div>

        <div className="hidden md:block">
          <Badge variant={semesterBadge.variant}>{semesterBadge.label}</Badge>
        </div>

        <div className="w-24 text-center">
          <Badge variant={statusVariant} className="capitalize">
            {displayStatus}
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default CourseRow;
