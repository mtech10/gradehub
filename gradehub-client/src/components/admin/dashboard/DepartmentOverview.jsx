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
          {departments.map((department) => {
            // FIX: Ensure completion drops to 0 if there are no students/courses
            const studentCount = Number(department.students) || 0;
            const courseCount = Number(department.courses) || 0;
            const safeCompletion =
              studentCount === 0 && courseCount === 0
                ? 0
                : department.completion || 0;

            return (
              <div
                key={department.id}
                className="rounded-xl border border-slate-100 p-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900">
                    {department.name}
                  </h4>
                  <span className="text-sm font-semibold text-blue-600">
                    {safeCompletion}%
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-center sm:gap-3">
                  <div>
                    <p className="text-base font-bold text-slate-900 sm:text-lg">
                      {department.students || 0}
                    </p>
                    <p className="text-[10px] text-slate-500 sm:text-xs">
                      Students
                    </p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-900 sm:text-lg">
                      {department.courses || "-"}
                    </p>
                    <p className="text-[10px] text-slate-500 sm:text-xs">
                      Courses
                    </p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-900 sm:text-lg">
                      {department.lecturers || "-"}
                    </p>
                    <p className="text-[10px] text-slate-500 sm:text-xs">
                      Lecturers
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{
                      width: `${safeCompletion}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default DepartmentOverview;
