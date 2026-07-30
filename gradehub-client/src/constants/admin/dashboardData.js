import { Users, BookOpen, Building2, FileSpreadsheet } from "lucide-react";

export const dashboardStats = [
  {
    id: 1,
    title: "Students",
    value: "2,356",
    subtitle: "Registered Students",
    trend: "+15 this week",
    icon: Users,
    color: "blue",
  },
  {
    id: 2,
    title: "Courses",
    value: "128",
    subtitle: "Available Courses",
    icon: BookOpen,
    color: "green",
  },
  {
    id: 3,
    title: "Departments",
    value: "12",
    subtitle: "Academic Departments",
    icon: Building2,
    color: "purple",
  },
  {
    id: 4,
    title: "Pending Results",
    value: "45",
    subtitle: "Awaiting Approval",
    icon: FileSpreadsheet,
    color: "amber",
  },
];
