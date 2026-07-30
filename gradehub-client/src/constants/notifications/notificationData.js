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

export const notificationsList = [
  {
    id: 1,
    title: "2023/2024 2nd Semester Results Published",
    message:
      "Your semester results are now available. Click to view your results.",
    time: "2 hours ago",
    isRead: false,
    category: "Results",
    icon: FileText,
    color: "purple",
    action: { label: "View Results", path: "/student/results" },
  },
  {
    id: 2,
    title: "Course Registration Reminder",
    message:
      "Course registration for the 2024/2025 1st Semester closes in 5 days.",
    time: "1 day ago",
    isRead: false,
    category: "Academic",
    icon: Calendar,
    color: "success",
    action: { label: "Register Courses", path: "/student/course-registration" },
  },
  {
    id: 3,
    title: "Project Defence (AGE416) Scheduled",
    message:
      "Your project defence has been scheduled for May 25, 2024 at 10:00 AM.",
    time: "2 days ago",
    isRead: false,
    category: "Academic",
    icon: User,
    color: "warning",
    action: { label: "View Calendar", path: "/student/calendar" }, // Assuming a calendar route exists
  },
  {
    id: 4,
    title: "New Academic Calendar Released",
    message: "The academic calendar for 2024/2025 session is now available.",
    time: "3 days ago",
    isRead: true,
    category: "System",
    icon: Megaphone,
    color: "primary",
    // No action needed for general system broadcasts
  },
  {
    id: 5,
    title: "Examination Timetable Published",
    message: "Check your examination timetable for the 2nd Semester.",
    time: "5 days ago",
    isRead: true,
    category: "Academic",
    icon: Clock,
    color: "danger",
    action: { label: "View Timetable", path: "/student/courses" },
  },
  {
    id: 6,
    title: "Fees Payment Confirmation",
    message: "Your school fees payment of ₦73,500 was successful.",
    time: "May 10, 2024",
    isRead: true,
    category: "System",
    icon: CreditCard,
    color: "info",
  },
  {
    id: 7,
    title: "Congratulations!",
    message: "You made the Dean's List for the 2023/2024 1st Semester.",
    time: "May 5, 2024",
    isRead: true,
    category: "Academic",
    icon: Star,
    color: "warning",
    action: { label: "View Transcript", path: "/student/transcript" },
  },
];

export const notificationSettings = [
  // ... (keep your existing settings data here)
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

export const notificationSummary = [
  // ... (keep your existing summary data here)
  {
    label: "Total Notifications",
    value: "23",
    icon: Bell,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Unread",
    value: "3",
    icon: Mail,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    label: "This Week",
    value: "7",
    icon: Calendar,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "This Month",
    value: "15",
    icon: FileText,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];
