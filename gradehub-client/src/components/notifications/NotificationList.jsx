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
    <div className="flex flex-col-reverse sm:flex-row gap-2 w-full sm:w-auto">
      <Button
        variant="ghost"
        onClick={() => setSelectedNotification(null)}
        className="w-full sm:w-auto justify-center"
      >
        Close
      </Button>

      {selectedNotification.action && (
        <Button
          onClick={() => handleActionClick(selectedNotification.action.path)}
          className="w-full sm:w-auto justify-center"
        >
          {selectedNotification.action.label}
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Card padding="none" className="overflow-hidden">
        {/* Tabs (Horizontal scroll on mobile) */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto border-b border-slate-200 px-4 sm:px-6 pt-4 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-1.5 sm:gap-2 whitespace-nowrap border-b-2 pb-3 sm:pb-4 text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] sm:text-xs font-bold ${
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
                  className={`flex cursor-pointer items-start gap-3 sm:gap-4 border-b border-slate-100 p-4 sm:p-5 transition-colors last:border-0 hover:bg-slate-50 ${
                    !notification.isRead ? "bg-white" : "bg-slate-50/50"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl ${bgColors[notification.color]}`}
                  >
                    <Icon size={20} className="sm:w-6 sm:h-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                      <h4
                        className={`truncate text-sm sm:text-base ${!notification.isRead ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}
                      >
                        {notification.title}
                      </h4>
                      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                        <span className="text-xs sm:text-sm font-medium text-slate-500">
                          {notification.time}
                        </span>
                        {!notification.isRead && (
                          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-blue-600 shrink-0" />
                        )}
                      </div>
                    </div>

                    <p className="mb-2.5 text-xs sm:text-sm text-slate-600 line-clamp-1">
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
            <div className="p-8 sm:p-12 text-center text-xs sm:text-sm text-slate-500">
              No notifications found in this category.
            </div>
          )}
        </div>

        {/* Load More Footer */}
        {filteredNotifications.length > visibleCount && (
          <div className="flex justify-center border-t border-slate-100 bg-slate-50/50 p-4">
            <button
              onClick={handleLoadMore}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs sm:text-sm font-semibold text-blue-600 shadow-sm transition-colors hover:shadow hover:text-blue-700"
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
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
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
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              {selectedNotification?.time}
            </span>
          </div>
        }
        footer={modalFooter}
        maxWidth="max-w-lg"
      >
        {selectedNotification && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div
                className={`flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-${selectedNotification.color}-100 text-${selectedNotification.color}-600`}
              >
                <selectedNotification.icon size={22} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 break-words">
                {selectedNotification.title}
              </h3>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              {selectedNotification.message}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default NotificationList;
