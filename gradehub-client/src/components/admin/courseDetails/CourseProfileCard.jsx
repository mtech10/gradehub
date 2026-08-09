import { BookOpen, GraduationCap, Calendar, Building2 } from "lucide-react";

import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

function CourseProfileCard({ course }) {
  return (
    <Card>
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <BookOpen size={28} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-slate-900">{course.code}</h2>

          <p className="mt-1 text-lg text-slate-700">{course.title}</p>

          <p className="mt-1 text-slate-500">{course.department?.name}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="blue">{course.level?.name}</Badge>

            <Badge variant="green">{course.semester?.name}</Badge>

            <Badge variant="purple">{course.creditUnit} Units</Badge>

            <Badge variant={course.isActive ? "green" : "amber"}>
              {course.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 border-t border-slate-100 pt-6 sm:grid-cols-3">
        <InfoItem
          icon={Building2}
          label="Department"
          value={course.department?.name || "—"}
        />

        <InfoItem
          icon={GraduationCap}
          label="Level"
          value={course.level?.name || "—"}
        />

        <InfoItem
          icon={Calendar}
          label="Semester"
          value={course.semester?.name || "—"}
        />
      </div>

      {course.description && (
        <div className="mt-6 border-t border-slate-100 pt-6">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Description
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            {course.description}
          </p>
        </div>
      )}
    </Card>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={18} className="mt-0.5 text-slate-400" />

      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <p className="font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

export default CourseProfileCard;
