import { Trash2 } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { getSemesterBadge } from "../../utils/courseUtils";

function RegisteredCourseList({ courses, onRemove }) {
  const totalUnits = courses.reduce((sum, course) => sum + course.units, 0);

  return (
    <Card padding="none" className="overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white p-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Selected Courses
          </h3>
          <p className="text-sm text-slate-500">
            Courses queued for registration
          </p>
        </div>
        <Badge variant="primary" size="lg">
          {totalUnits} Total Units
        </Badge>
      </div>

      {/* Compact List */}
      <div className="flex flex-col">
        {courses.length > 0 ? (
          courses.map((course) => {
            const semesterBadge = getSemesterBadge(course.semester);

            return (
              <div
                key={course.code}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 p-4 transition-colors hover:bg-red-50/50 last:border-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1 min-w-0">
                  <span className="w-20 font-bold text-slate-900 shrink-0">
                    {course.code}
                  </span>
                  <span className="truncate text-sm font-medium text-slate-700">
                    {course.title}
                  </span>
                </div>

                <div className="flex items-center gap-4 sm:gap-4 shrink-0">
                  <span className="w-16 text-right text-sm text-slate-500">
                    {course.units} Units
                  </span>

                  <div className="w-24 hidden md:block">
                    <Badge variant={semesterBadge.variant} size="sm">
                      {semesterBadge.label}
                    </Badge>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(course.code)}
                    className="w-24 text-red-600 hover:bg-red-100 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                    Remove
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center">
            <p className="text-slate-500">
              You haven't selected any courses yet.
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Search and add courses from the list above.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default RegisteredCourseList;
