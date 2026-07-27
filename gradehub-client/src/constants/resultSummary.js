import {
  Target,
  Trophy,
  TrendingDown,
  Award,
  BookOpenCheck,
} from "lucide-react";

export const resultSummary = [
  {
    title: "Credit Units Earned",
    value: "118",
    subtitle: "Out of 135 Units",
    footer: "87% Programme Completion",
    icon: Target,
    color: "green",
  },

  {
    title: "Highest Score",
    value: "95%",
    subtitle: "AGE 409",
    footer: "Engineering Seminar",
    icon: Trophy,
    color: "blue",
  },

  {
    title: "Lowest Score",
    value: "58%",
    subtitle: "Needs Improvement",
    footer: "AGE 416 • Project Research",
    icon: TrendingDown,
    color: "orange",
  },

  {
    title: "Academic Standing",
    value: "First Class",
    subtitle: "Excellent Performance",
    footer: "Based on current CGPA",
    icon: Award,
    color: "purple",
  },

  {
    title: "Semesters Completed",
    value: "8",
    subtitle: "Undergraduate Programme",
    footer: "100% Academic Progress",
    icon: BookOpenCheck,
    color: "blue",
  },
];
