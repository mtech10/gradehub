import { useState } from "react";
import { CheckCircle2, Headphones } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import NotificationList from "../../components/notifications/NotificationList";
import NotificationSummary from "../../components/notifications/NotificationSummary";

import {
  notificationsList,
  notificationSettings,
} from "../../constants/notifications/notificationData";

function Notifications() {
  const [notifications, setNotifications] = useState(notificationsList);
  const [settings, setSettings] = useState(notificationSettings);

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const handleToggleSetting = (id) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          title="Notifications"
          subtitle="Stay updated with your academic activities and important announcements."
        />
        <Button
          variant="outline"
          className="shrink-0 bg-white"
          onClick={handleMarkAllAsRead}
        >
          <CheckCircle2 size={18} />
          Mark all as read
        </Button>
      </div>

      <div className="grid gap-8 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <NotificationList
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
          />
        </div>

        <div className="space-y-6 xl:col-span-4">
          <NotificationSummary notifications={notifications} />

          <Card padding="lg">
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              Need Help?
            </h3>
            <p className="mb-6 text-sm leading-6 text-slate-600">
              If you are not receiving important notifications, check your
              notification settings or contact support.
            </p>
            <Button
              variant="outline"
              fullWidth
              className="justify-center border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Headphones size={18} className="text-blue-600" />
              <span className="font-medium">Contact Support</span>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
