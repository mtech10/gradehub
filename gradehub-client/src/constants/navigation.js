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
    path: "/dashboard",
  },
  {
    title: "My Results",
    icon: FileText,
    path: "/results",
  },
  {
    title: "Transcript",
    icon: ScrollText,
    path: "/transcript",
  },
  {
    title: "GPA Calculator",
    icon: Calculator,
    path: "/gpa-calculator",
  },
  {
    title: "Courses",
    icon: BookOpen,
    path: "/courses",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications",
    badge: 3,
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const logoutItem = {
  title: "Logout",
  icon: LogOut,
};
