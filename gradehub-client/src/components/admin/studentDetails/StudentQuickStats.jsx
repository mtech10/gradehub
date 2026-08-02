import { GraduationCap, BookOpen, Award, AlertCircle } from "lucide-react";

import AdminStatCard from "../dashboard/AdminStatCard";

function StudentQuickStats({ student }) {
  const stats = [
    {
      title: "CGPA",
      value: student.cgpa,
      subtitle: "Current cumulative GPA",
      icon: GraduationCap,
      color: "blue",
    },
    {
      title: "Credits Earned",
      value: student.creditsEarned,
      subtitle: "Completed credits",
      icon: BookOpen,
      color: "green",
    },
    {
      title: "Courses Taken",
      value: student.coursesTaken,
      subtitle: "Total registered",
      icon: Award,
      color: "purple",
    },
    {
      title: "Outstanding",
      value: student.outstandingCourses,
      subtitle: "Courses remaining",
      icon: AlertCircle,
      color: "amber",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <AdminStatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

export default StudentQuickStats;
