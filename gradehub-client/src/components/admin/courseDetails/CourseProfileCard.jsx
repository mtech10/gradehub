import {
  BookOpen,
  GraduationCap,
  Calendar,
  Building2,
  User,
} from "lucide-react";

import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

function CourseProfileCard({ course }) {
  return (
    <Card className="p-3">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-100">
            <BookOpen size={42} className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-slate-900">{course.code}</h2>

            <p className="mt-1 text-lg text-slate-700">{course.title}</p>

            <p className="mt-1 text-slate-500">{course.department}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="blue">{course.level} Level</Badge>

              <Badge variant="green">{course.semester} Semester</Badge>

              <Badge variant="purple">{course.unit} Units</Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <InfoItem
            icon={Building2}
            label="Department"
            value={course.department}
          />

          <InfoItem icon={User} label="Lecturer" value={course.lecturer} />

          <InfoItem
            icon={Calendar}
            label="Semester"
            value={`${course.semester} Semester`}
          />

          <InfoItem icon={GraduationCap} label="Status" value={course.status} />
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

export default CourseProfileCard;
