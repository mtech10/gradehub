import { GraduationCap, Users, BookOpen, CheckCircle } from "lucide-react";

import AdminStatCard from "../dashboard/AdminStatCard";

function DepartmentQuickStats({ department }) {
  const stats = [
    {
      title: "Students",
      value: department.students,
      subtitle: "Currently enrolled",
      icon: GraduationCap,
      color: "blue",
    },
    {
      title: "Lecturers",
      value: department.lecturers,
      subtitle: "Academic staff",
      icon: Users,
      color: "green",
    },
    {
      title: "Courses",
      value: department.courses,
      subtitle: "Available courses",
      icon: BookOpen,
      color: "purple",
    },
    {
      title: "Status",
      value: department.status,
      subtitle: "Department status",
      icon: CheckCircle,
      color: department.status === "Active" ? "green" : "amber",
    },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <AdminStatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
}

export default DepartmentQuickStats;
