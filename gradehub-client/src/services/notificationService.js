import api from "./api";
import {
  Bell,
  BookOpen,
  GraduationCap,
  AlertCircle,
  Info,
  Calendar,
} from "lucide-react";

// --- NEW: Helper function to calculate relative time ---
const formatRelativeTime = (dateString) => {
  if (!dateString) return "Just now";

  // Parse the date normally
  const date = new Date(dateString);
  const now = new Date();

  // Safety check in case of invalid dates
  if (isNaN(date.getTime())) return "Just now";

  // FIX: Dynamically correct the backend timezone lag.
  // This calculates the exact difference between UTC and your local time (e.g., WAT is -60)
  // and adds that missing hour back to the timestamp so it matches reality!
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

  // Calculate the difference in time
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  // Format the specific time (e.g., "11:30 pm")
  const timeString = date
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    .toLowerCase();

  // Less than a minute ago (catches negative differences as well)
  if (diffInSeconds < 60) {
    return "Just now";
  }

  // Less than an hour ago (e.g., "15m ago")
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  // Less than 24 hours ago AND on the same calendar day (e.g., "2h ago")
  if (diffInHours < 24 && now.getDate() === date.getDate()) {
    return `${diffInHours}h ago`;
  }

  // Check if it was exactly yesterday
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return `Yesterday, ${timeString}`;
  }

  // Older than yesterday (e.g., "Aug 15, 11:30 pm")
  const options = { month: "short", day: "numeric" };
  if (date.getFullYear() !== now.getFullYear()) {
    options.year = "numeric";
  }

  return `${date.toLocaleDateString("en-US", options)}, ${timeString}`;
};

// Maps raw backend data into the exact format your UI components expect
const mapNotificationUI = (notif) => {
  let icon = Bell;
  let color = "primary";

  // Assign UI colors and icons based on the backend category string
  switch (notif.category?.toLowerCase()) {
    case "academic":
      icon = BookOpen;
      color = "purple";
      break;
    case "results":
      icon = GraduationCap;
      color = "success";
      break;
    case "system":
      icon = Info;
      color = "info";
      break;
    case "reminders":
      icon = Calendar;
      color = "warning";
      break;
    case "alert":
      icon = AlertCircle;
      color = "danger";
      break;
    default:
      break;
  }

  // FIX: Pass the date to our new relative time formatter
  const formattedTime = formatRelativeTime(notif.createdAt || notif.createdat);

  return {
    id: notif.id,
    title: notif.title,
    message: notif.message,
    time: formattedTime,
    category: notif.category || "General",
    isRead: notif.isRead ?? notif.isread ?? notif.read ?? false,
    color,
    icon,
    action: notif.actionUrl ? { label: "View", path: notif.actionUrl } : null,
  };
};

export const notificationService = {
  getNotifications: async () => {
    try {
      const response = await api.get("/notifications");

      // BULLETPROOF EXTRACTION: Check every possible way Axios/Backend might nest this data
      let notificationsArray = [];

      if (Array.isArray(response)) {
        notificationsArray = response;
      } else if (Array.isArray(response?.data)) {
        notificationsArray = response.data;
      } else if (Array.isArray(response?.data?.notifications)) {
        notificationsArray = response.data.notifications;
      } else if (Array.isArray(response?.data?.data?.notifications)) {
        notificationsArray = response.data.data.notifications;
      } else if (Array.isArray(response?.notifications)) {
        notificationsArray = response.notifications;
      }

      return notificationsArray.map(mapNotificationUI);
    } catch (error) {
      console.error("Error in notificationService:", error);
      return [];
    }
  },

  markAsRead: async (id) => {
    const response = await api.patch(`/notifications/${id}/read`);
    window.dispatchEvent(new Event("notificationsUpdated"));
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.patch("/notifications/read-all");
    window.dispatchEvent(new Event("notificationsUpdated"));
    return response.data;
  },
};
