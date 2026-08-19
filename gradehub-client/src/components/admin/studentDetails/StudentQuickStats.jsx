import { GraduationCap, BookOpen, Award, AlertCircle } from "lucide-react";

import AdminStatCard from "../dashboard/AdminStatCard";

function StudentQuickStats({ student }) {
  const stats = [
    {
      title: "CGPA",
      value: student.cgpa || "0.00",
      subtitle: "Current cumulative GPA",
      icon: GraduationCap,
      color: "blue",
    },
    {
      title: "Credits Earned",
      value: student.creditsEarned || 0,
      subtitle: "Completed credits",
      icon: BookOpen,
      color: "green",
    },
    {
      title: "Courses Taken",
      value: student.coursesTaken || 0,
      subtitle: "Total registered",
      icon: Award,
      color: "purple",
    },
    {
      title: "Outstanding",
      value: student.outstandingCourses || 0,
      subtitle: "Courses remaining",
      icon: AlertCircle,
      color: "amber",
    },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <AdminStatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

export default StudentQuickStats;
