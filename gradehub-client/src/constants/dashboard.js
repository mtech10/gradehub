import {
  GraduationCap,
  BookOpen,
  ChartColumn,
  Star,
  PieChart,
} from "lucide-react";

export const dashboardStats = [
  {
    title: "CGPA",
    value: "4.58",
    suffix: "/5.00",
    subtitle: "Excellent",
    footer: "Top 5% of your class",
    icon: GraduationCap,
    iconColor: "bg-blue-100 text-blue-600",
  },

  {
    title: "Total Courses",
    value: "32",
    subtitle: "Completed",
    footer: "8 in progress",
    icon: BookOpen,
    iconColor: "bg-green-100 text-green-600",
  },

  {
    title: "Total Units",
    value: "98",
    subtitle: "Units Earned",
    footer: "12.5 Avg Units/Sem",
    icon: ChartColumn,
    iconColor: "bg-purple-100 text-purple-600",
  },

  {
    title: "Class Rank",
    value: "6",
    subtitle: "Top 10%",
    footer: "Out of 128 students",
    icon: Star,
    iconColor: "bg-orange-100 text-orange-600",
  },

  {
    title: "Attendance",
    value: "94%",
    subtitle: "Overall",
    footer: "This Semester",
    icon: PieChart,
    iconColor: "bg-blue-100 text-blue-600",
  },
];
