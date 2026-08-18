import { useState, useEffect } from "react";
import { CheckCircle2, Headphones } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import NotificationList from "../../components/notifications/NotificationList";
import NotificationSummary from "../../components/notifications/NotificationSummary";
import NotificationsSkeleton from "../../components/ui/skeletons/NotificationsSkeleton";

import { notificationService } from "../../services/notificationService";
import { useToast } from "../../context/ToastContext";

function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const liveData = await notificationService.getNotifications();
        setNotifications(liveData);
      } catch (error) {
        console.error("Failed to load notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

      addToast({
        title: "Caught up!",
        message: "All notifications have been marked as read.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to mark all as read:", error);

      addToast({
        title: "Action Failed",
        message: "Failed to mark notifications as read. Please try again.",
        type: "error",
      });
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  if (loading) {
    return <NotificationsSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          title="Notifications"
          subtitle="Stay updated with system alerts, results processing, and administrative activities."
        />
        <Button
          variant="outline"
          className="shrink-0 bg-white"
          onClick={handleMarkAllAsRead}
          disabled={!notifications.some((n) => !n.isRead)}
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
              If you are not receiving important system alerts, check your
              notification settings or contact IT support.
            </p>
            <Button
              variant="outline"
              fullWidth
              className="justify-center border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Headphones size={18} className="text-blue-600" />
              <span className="font-medium">Contact IT Support</span>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminNotifications;
