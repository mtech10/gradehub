import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

function StudentProfileCard({ student }) {
  const initials = (student.fullName || "Student")
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {}
        <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl sm:text-3xl font-bold text-blue-700">
          {initials}
        </div>

        {}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 break-words">
                {student.fullName}
              </h2>

              <p className="mt-0.5 sm:mt-1 text-sm sm:text-base text-slate-500">
                {student.matricNumber}
              </p>
            </div>

            <div className="self-start sm:self-auto">
              <Badge
                variant={
                  student.status === "Active"
                    ? "success"
                    : student.status === "Graduated"
                      ? "info"
                      : "warning"
                }
              >
                {student.status}
              </Badge>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border-t border-slate-100 pt-4 sm:pt-6">
            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-slate-500">Department</p>
              <p className="font-medium text-slate-900 text-sm sm:text-base truncate">
                {student.department}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-slate-500">Level</p>
              <p className="font-medium text-slate-900 text-sm sm:text-base truncate">
                {student.level}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-slate-500">Email</p>
              <p className="font-medium text-slate-900 text-sm sm:text-base truncate">
                {student.email}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-xs sm:text-sm text-slate-500">Phone</p>
              <p className="font-medium text-slate-900 text-sm sm:text-base truncate">
                {student.phone || "—"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default StudentProfileCard;
