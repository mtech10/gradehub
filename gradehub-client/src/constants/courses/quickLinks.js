import { UserPlus, CalendarDays, LayoutGrid, CheckCircle2 } from "lucide-react";

export const quickLinks = [
  {
    title: "Course Registration",
    description: "Register for courses",
    icon: UserPlus,
    path: "/student/course-registration",
    iconColor: "bg-purple-100 text-purple-600",
  },
  {
    title: "Academic Calendar",
    description: "View academic calendar",
    icon: CalendarDays,
    path: "/student/calendar",
    iconColor: "bg-green-100 text-green-600",
  },
  {
    title: "Course Categories",
    description: "Browse by department",
    icon: LayoutGrid,
    path: "/student/categories",
    iconColor: "bg-orange-100 text-orange-600",
  },
  {
    title: "Prerequisite Checker",
    description: "Check course requirements",
    icon: CheckCircle2,
    path: "/student/prerequisites",
    iconColor: "bg-blue-100 text-blue-600",
  },
];
