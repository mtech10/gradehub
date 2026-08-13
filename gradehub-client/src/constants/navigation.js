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
  Users,
  GraduationCap,
  Building2,
  BarChart3,
  Upload,
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

export const adminNavigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    title: "Students",
    icon: Users,
    path: "/admin/students",
  },
  {
    title: "Departments",
    icon: Building2,
    path: "/admin/departments",
  },
  {
    title: "Courses",
    icon: BookOpen,
    path: "/admin/courses",
  },
  {
    title: "Results",
    icon: FileText,
    path: "/admin/results",
  },

  {
    title: "Profile",
    icon: User,
    path: "/admin/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];
