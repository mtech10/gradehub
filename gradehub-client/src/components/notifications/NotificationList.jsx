import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

function NotificationList({ notifications, onMarkAsRead }) {
  const [activeTab, setActiveTab] = useState("all");
  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const navigate = useNavigate();

  const totalCount = notifications.length;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const tabs = [
    { id: "all", label: "All", count: totalCount },
    { id: "unread", label: "Unread", count: unreadCount },
    { id: "academic", label: "Academic" },
    { id: "results", label: "Results" },
    { id: "system", label: "System" },
    { id: "reminders", label: "Reminders" },
  ];

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.isRead;
    return notification.category.toLowerCase() === activeTab;
  });

  const visibleNotifications = filteredNotifications.slice(0, visibleCount);

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    setSelectedNotification(notification);
  };

  const handleActionClick = (path) => {
    setSelectedNotification(null);
    navigate(path);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setVisibleCount(5);
  };

  const modalFooter = selectedNotification && (
    <>
      <Button variant="ghost" onClick={() => setSelectedNotification(null)}>
        Close
      </Button>

      {selectedNotification.action && (
        <Button
          onClick={() => handleActionClick(selectedNotification.action.path)}
        >
          {selectedNotification.action.label}
        </Button>
      )}
    </>
  );

  return (
    <>
      <Card padding="none" className="overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center gap-4 overflow-x-auto border-b border-slate-200 px-6 pt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 pb-4 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                    activeTab === tab.id ||
                    (tab.id === "unread" && unreadCount > 0)
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex flex-col">
          {visibleNotifications.length > 0 ? (
            visibleNotifications.map((notification) => {
              const Icon = notification.icon;
              const bgColors = {
                purple: "bg-purple-100 text-purple-600",
                success: "bg-green-100 text-green-600",
                warning: "bg-orange-100 text-orange-600",
                primary: "bg-blue-100 text-blue-600",
                danger: "bg-red-100 text-red-600",
                info: "bg-sky-100 text-sky-600",
              };

              return (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`flex cursor-pointer items-start gap-4 border-b border-slate-100 p-4 transition-colors last:border-0 hover:bg-slate-50 ${
                    !notification.isRead ? "bg-white" : "bg-slate-50/50"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${bgColors[notification.color]}`}
                  >
                    <Icon size={24} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-col justify-between gap-1 sm:flex-row sm:items-center sm:gap-4">
                      <h4
                        className={`truncate text-base ${!notification.isRead ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}
                      >
                        {notification.title}
                      </h4>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="text-sm font-medium text-slate-500">
                          {notification.time}
                        </span>
                        {!notification.isRead && (
                          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                        )}
                      </div>
                    </div>

                    <p className="mb-3 text-sm text-slate-600 line-clamp-1">
                      {notification.message}
                    </p>

                    <Badge
                      variant={
                        notification.color === "primary"
                          ? "info"
                          : notification.color
                      }
                      size="sm"
                      className="bg-opacity-50"
                    >
                      {notification.category}
                    </Badge>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center text-slate-500">
              No notifications found in this category.
            </div>
          )}
        </div>

        {/* Load More Footer */}
        {filteredNotifications.length > visibleCount && (
          <div className="flex justify-center border-t border-slate-100 bg-slate-50/50 p-4">
            <button
              onClick={handleLoadMore}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm transition-colors hover:shadow hover:text-blue-700"
            >
              Load more
              <ChevronDown size={16} />
            </button>
          </div>
        )}
      </Card>

      {/* Notification Modal */}
      <Modal
        isOpen={!!selectedNotification}
        onClose={() => setSelectedNotification(null)}
        title={
          <div className="flex items-center gap-3">
            <Badge
              variant={
                selectedNotification?.color === "primary"
                  ? "info"
                  : selectedNotification?.color || "info"
              }
              size="sm"
            >
              {selectedNotification?.category}
            </Badge>
            <span className="text-sm font-medium text-slate-500">
              {selectedNotification?.time}
            </span>
          </div>
        }
        footer={modalFooter}
        maxWidth="max-w-lg"
      >
        {selectedNotification && (
          <div>
            <div className="mb-4 flex items-center gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-${selectedNotification.color}-100 text-${selectedNotification.color}-600`}
              >
                <selectedNotification.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {selectedNotification.title}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-slate-600">
              {selectedNotification.message}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default NotificationList;
