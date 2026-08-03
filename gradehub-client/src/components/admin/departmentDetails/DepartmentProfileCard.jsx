import { Building2, UserRound, GraduationCap, BookOpen } from "lucide-react";

import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

function DepartmentProfileCard({ department }) {
  return (
    <Card className="p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-100">
            <Building2 size={42} className="text-blue-600" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">
              {department.name}
            </h2>

            <p className="text-lg text-slate-600">{department.code}</p>

            <div className="flex flex-wrap gap-3">
              <Badge variant="blue">{department.faculty}</Badge>

              <Badge variant={department.status === "Active" ? "green" : "red"}>
                {department.status}
              </Badge>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="grid gap-5 sm:grid-cols-2">
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
      <div className="rounded-lg bg-slate-100 p-2">
        <Icon size={18} className="text-slate-600" />
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <p className="font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

export default DepartmentProfileCard;
