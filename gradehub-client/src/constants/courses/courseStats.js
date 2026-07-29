import { BookOpen, ClipboardList, CheckCircle2, Clock3 } from "lucide-react";

export const courseStats = [
  {
    title: "Total Courses",
    value: 32,
    subtitle: "Registered",
    icon: BookOpen,
    color: "primary",
  },

  {
    title: "Current Session",
    value: 5,
    subtitle: "Courses",
    icon: ClipboardList,
    color: "success",
  },

  {
    title: "Completed",
    value: 27,
    subtitle: "Courses",
    icon: CheckCircle2,
    color: "purple",
  },

  {
    title: "In Progress",
    value: 5,
    subtitle: "Courses",
    icon: Clock3,
    color: "warning",
  },
];
