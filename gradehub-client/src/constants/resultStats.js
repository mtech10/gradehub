import {
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
  Target,
} from "lucide-react";

export const resultStats = [
  {
    title: "CGPA",
    value: "4.58",
    suffix: "/5.00",
    subtitle: "Excellent",
    footer: "Overall cumulative performance",
    icon: GraduationCap,
    color: "primary",
  },

  {
    title: "Total Courses",
    value: "42",
    subtitle: "Completed",
    footer: "Across all semesters",
    icon: BookOpen,
    color: "success",
  },

  {
    title: "Total Units",
    value: "118",
    subtitle: "Earned",
    footer: "Successfully completed",
    icon: Target,
    color: "warning",
  },

  {
    title: "Best Semester",
    value: "4.91",
    subtitle: "2023/2024 First Semester",
    footer: "Highest GPA achieved",
    icon: Award,
    color: "purple",
  },

  {
    title: "Average Grade",
    value: "A",
    subtitle: "Excellent",
    footer: "Across all completed courses",
    icon: TrendingUp,
    color: "success",
  },
];
