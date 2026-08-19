import Card from "../ui/Card";
import { Bell, Mail, Calendar, FileText } from "lucide-react";

function NotificationSummary({ notifications = [] }) {
  const total = notifications.length;
  const unread = notifications.filter((n) => !n.isRead).length;

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const thisWeek = notifications.filter((n) => {
    const notifDate = new Date(n.rawDate || n.time);
    return !isNaN(notifDate) && notifDate >= oneWeekAgo;
  }).length;

  const thisMonth = notifications.filter((n) => {
    const notifDate = new Date(n.rawDate || n.time);
    return !isNaN(notifDate) && notifDate >= oneMonthAgo;
  }).length;

  const dynamicSummary = [
    {
      label: "Total Notifications",
      value: total,
      icon: Bell,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Unread",
      value: unread,
      icon: Mail,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "This Week",
      value: thisWeek,
      icon: Calendar,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "This Month",
      value: thisMonth,
      icon: FileText,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  return (
    <Card title="Notification Summary" className="p-4 sm:p-6">
      <div className="space-y-4">
        {dynamicSummary.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.color}`}
                >
                  <Icon size={16} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-600 truncate">
                  {item.label}
                </span>
              </div>
              <span className="font-bold text-slate-900 text-sm sm:text-base shrink-0">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default NotificationSummary;
