import Card from "../ui/Card";
import { Bell, Mail, Calendar, FileText } from "lucide-react";

function NotificationSummary({ notifications }) {
  const total = notifications.length;
  const unread = notifications.filter((n) => !n.isRead).length;

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

  return (
    <Card title="Notification Summary">
      <div className="space-y-4">
        {dynamicSummary.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.bg} ${item.color}`}
                >
                  <Icon size={16} />
                </div>
                <span className="text-sm font-medium text-slate-600">
                  {item.label}
                </span>
              </div>
              <span className="font-bold text-slate-900">{item.value}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default NotificationSummary;
