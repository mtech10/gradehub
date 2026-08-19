import { useNavigate } from "react-router-dom";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

function DepartmentOverview({ departments }) {
  const navigate = useNavigate();
  return (
    <div className="pt-0 lg:pt-5">
      <Card padding="md" className="p-4 sm:p-6">
        {/* Responsive Header */}
        <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Department Overview
            </h3>
            <p className="text-sm text-slate-500">Registration progress</p>
          </div>
          <Button
            size="sm"
            onClick={() => navigate("/admin/departments")}
            className="w-full sm:w-auto"
          >
            View All
          </Button>
        </div>

        <div className="space-y-5">
          {departments.map((department) => (
            <div
              key={department.id}
              className="rounded-xl border border-slate-100 p-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-900">
                  {department.name}
                </h4>
                <span className="text-sm font-semibold text-blue-600">
                  {department.completion}%
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3 text-center">
                <div>
                  <p className="text-base sm:text-lg font-bold text-slate-900">
                    {department.students}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-500">
                    Students
                  </p>
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold text-slate-900">
                    {department.courses}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-500">
                    Courses
                  </p>
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold text-slate-900">
                    {department.lecturers}
                  </p>
                  <p className="text-[10px] sm:text-xs text-slate-500">
                    Lecturers
                  </p>
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{
                    width: `${department.completion}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default DepartmentOverview;
