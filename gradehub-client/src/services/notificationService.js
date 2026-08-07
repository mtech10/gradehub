import api from "./api";
import {
  Bell,
  BookOpen,
  GraduationCap,
  AlertCircle,
  Info,
  Calendar,
} from "lucide-react";

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

  // Format date to a readable string (e.g., "Aug 7, 2026")
  const formattedTime = notif.createdAt
    ? new Date(notif.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Just now";

  return {
    id: notif.id,
    title: notif.title,
    message: notif.message,
    time: formattedTime,
    category: notif.category || "General",
    isRead: notif.isRead || notif.read,
    color,
    icon,
    action: notif.actionUrl ? { label: "View", path: notif.actionUrl } : null,
  };
};

export const notificationService = {
  getNotifications: async () => {
    const response = await api.get("/notifications");
    const payload = response.data || response;
    const notifications = payload.data || [];
    return notifications.map(mapNotificationUI);
  },

  markAsRead: async (id) => {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.patch("/notifications/read-all");
    return response.data;
  },
};
