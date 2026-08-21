import {
  FileText,
  Calendar,
  User,
  Megaphone,
  Clock,
  CreditCard,
  Star,
  Bell,
  Mail,
  CalendarDays,
  FileSpreadsheet,
  Settings,
} from "lucide-react";

export const notificationTabs = [
  { id: "all", label: "All", count: 3 },
  { id: "unread", label: "Unread", count: 3 },
  { id: "academic", label: "Academic" },
  { id: "results", label: "Results" },
  { id: "system", label: "System" },
  { id: "reminders", label: "Reminders" },
];

export const notificationSettings = [
  {
    id: "results",
    title: "Results & Grades",
    description: "Get notified when results are published",
    icon: FileSpreadsheet,
    enabled: true,
  },
  {
    id: "academic",
    title: "Academic Updates",
    description: "Important academic announcements",
    icon: Megaphone,
    enabled: true,
  },
  {
    id: "reminders",
    title: "Course Reminders",
    description: "Reminders for registrations & deadlines",
    icon: CalendarDays,
    enabled: true,
  },
  {
    id: "fees",
    title: "Fees & Payments",
    description: "Updates on fees and payments",
    icon: CreditCard,
    enabled: true,
  },
  {
    id: "system",
    title: "System Updates",
    description: "System maintenance and updates",
    icon: Settings,
    enabled: false,
  },
];
