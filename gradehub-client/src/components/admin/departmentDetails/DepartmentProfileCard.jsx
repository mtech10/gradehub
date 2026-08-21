import { Building2, UserRound, GraduationCap, BookOpen } from "lucide-react";

import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

function DepartmentProfileCard({ department }) {
  return (
    <Card className="p-5 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl bg-blue-100">
            <Building2 size={36} className="text-blue-600 sm:w-10 sm:h-10" />
          </div>

          <div className="space-y-1.5 sm:space-y-2 min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 break-words">
              {department.name}
            </h2>

            <p className="text-base sm:text-lg text-slate-600">
              {department.code}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 pt-1">
              <Badge variant="blue">{department.faculty}</Badge>

              <Badge variant={department.status === "Active" ? "green" : "red"}>
                {department.status}
              </Badge>
            </div>
          </div>
        </div>

        {}
        <div className="grid gap-3 sm:gap-5 grid-cols-1 sm:grid-cols-2 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
          <InfoItem
            icon={UserRound}
            label="Head of Department"
            value={department.hod}
          />

          <InfoItem
            icon={GraduationCap}
            label="Students"
            value={department.students}
          />

          <InfoItem
            icon={BookOpen}
            label="Courses"
            value={department.courses}
          />

          <InfoItem icon={Building2} label="Office" value={department.office} />
        </div>
      </div>
    </Card>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-slate-100 p-2 shrink-0">
        <Icon size={18} className="text-slate-600" />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <p className="font-semibold text-slate-900 truncate text-sm sm:text-base">
          {value}
        </p>
      </div>
    </div>
  );
}

export default DepartmentProfileCard;
