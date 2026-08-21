import api from "./api";
import {
  Bell,
  BookOpen,
  GraduationCap,
  AlertCircle,
  Info,
  Calendar,
} from "lucide-react";


const formatRelativeTime = (dateString) => {
  if (!dateString) return "Just now";

  
  const date = new Date(dateString);
  const now = new Date();

  
  if (isNaN(date.getTime())) return "Just now";

  
  
  
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

  
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);

  
  const timeString = date
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    .toLowerCase();

  
  if (diffInSeconds < 60) {
    return "Just now";
  }

  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  
  if (diffInHours < 24 && now.getDate() === date.getDate()) {
    return `${diffInHours}h ago`;
  }

  
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return `Yesterday, ${timeString}`;
  }

  
  const options = { month: "short", day: "numeric" };
  if (date.getFullYear() !== now.getFullYear()) {
    options.year = "numeric";
  }

  return `${date.toLocaleDateString("en-US", options)}, ${timeString}`;
};


const mapNotificationUI = (notif) => {
  let icon = Bell;
  let color = "primary";

  
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
