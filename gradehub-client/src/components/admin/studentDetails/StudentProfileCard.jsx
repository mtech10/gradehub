import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

function StudentProfileCard({ student }) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Avatar */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700">
          {student.fullName
            .split(" ")
            .map((name) => name[0])
            .join("")
            .slice(0, 2)}
        </div>

        {/* Details */}
        <div className="flex-1">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {student.fullName}
              </h2>

              <p className="mt-1 text-slate-500">{student.matricNumber}</p>
            </div>

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

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <p className="text-sm text-slate-500">Department</p>
              <p className="font-medium">{student.department}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Level</p>
              <p className="font-medium">{student.level}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium">{student.email}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <p className="font-medium">{student.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default StudentProfileCard;
