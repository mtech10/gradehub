import {
  LayoutDashboard,
  FileText,
  ScrollText,
  Calculator,
  BookOpen,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export const studentNavigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/student",
  },
  {
    title: "My Results",
    icon: FileText,
    path: "/student/results",
  },
  {
    title: "Transcript",
    icon: ScrollText,
    path: "/student/transcript",
  },
  {
    title: "GPA Calculator",
    icon: Calculator,
    path: "/student/gpa-calculator",
  },
  {
    title: "Courses",
    icon: BookOpen,
    path: "/student/courses",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/student/notifications",
    badge: 3,
  },
  {
    title: "Profile",
    icon: User,
    path: "/student/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/student/settings",
  },
];

export const logoutItem = {
  title: "Logout",
  icon: LogOut,
};
