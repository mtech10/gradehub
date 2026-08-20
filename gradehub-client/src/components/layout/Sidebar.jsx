import { useState, useEffect } from "react";
import Logo from "../ui/Logo";
import NavItem from "../navigation/NavItem";
import { logoutItem } from "../../constants/navigation";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLayout } from "../../context/LayoutContext";

import ConfirmModal from "../ui/ConfirmModal";
import { useToast } from "../../context/ToastContext";
// ADDED: Import the notification service
import { notificationService } from "../../services/notificationService";

function Sidebar({ navigation, user, variant = "light" }) {
  const LogoutIcon = logoutItem.icon;
  const isDark = variant === "dark";

  const { logout } = useAuth();
  const navigate = useNavigate();
  const { sidebarOpen, toggleSidebar } = useLayout();
  const { addToast } = useToast();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications on mount to calculate the unread count
  useEffect(() => {
    const fetchSidebarNotifications = async () => {
      try {
        const data = await notificationService.getNotifications();
        const unread = data.filter((n) => !n.isRead).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Failed to fetch sidebar notifications:", error);
      }
    };

    // Initial fetch on page load
    fetchSidebarNotifications();

    // ADDED: Listen for updates from anywhere in the app
    window.addEventListener("notificationsUpdated", fetchSidebarNotifications);

    // Cleanup listener when sidebar unmounts
    return () => {
      window.removeEventListener(
        "notificationsUpdated",
        fetchSidebarNotifications,
      );
    };
  }, []);

  const executeLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate("/login", { replace: true });

    addToast({
      title: "Logged Out",
      message: "You have been securely logged out of your account.",
      type: "info",
    });
  };

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
        fixed top-0 left-0 z-50 h-screen flex flex-col overflow-hidden transition-all duration-300 border-r print:hidden
        ${
          sidebarOpen
            ? "translate-x-0 w-[280px] sm:w-80" // Open state (Mobile & Desktop)
            : "-translate-x-full lg:translate-x-0 lg:w-24" // Closed state (Hidden on mobile, collapsed on desktop)
        }
        ${isDark ? "bg-slate-800 border-slate-800" : "bg-white border-slate-200"}
        `}
      >
        <div className={`p-8 ${isDark ? "border-b border-slate-800" : ""}`}>
          <Logo variant={variant} compact={!sidebarOpen} />
        </div>

        <nav className="flex-1 space-y-2 px-4 overflow-y-auto">
          {navigation.map((item) => {
            // ADDED: Inject the badge count dynamically for the Notifications tab
            const badgeCount =
              item.title === "Notifications" && unreadCount > 0
                ? unreadCount
                : item.badge;

            return (
              <NavItem
                key={item.title}
                {...item}
                variant={variant}
                badge={badgeCount}
              />
            );
          })}
        </nav>

        <div
          className={`border-t p-4 ${
            isDark ? "border-slate-800" : "border-slate-200"
          }`}
        >
          <div
            className={`flex items-center ${
              sidebarOpen ? "gap-3" : "justify-center"
            }`}
          >
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
            {sidebarOpen && (
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate font-semibold ${
                    isDark ? "text-white" : "text-slate-900"
                  }`}
                >
                  {user?.name}
                </p>

                <p
                  className={`truncate text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  {user?.department}
                </p>

                <p
                  className={`truncate text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  {user?.level}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowLogoutModal(true)}
            className={`
            mt-6 flex w-full items-center py-3 font-semibold text-red-600 rounded-lg transition-colors shrink-0
            ${sidebarOpen ? "justify-start gap-3 px-4" : "justify-center px-0"}
            ${isDark ? "hover:bg-slate-800" : "hover:bg-red-50"}
            `}
          >
            <LogoutIcon size={20} className="shrink-0" />
            {sidebarOpen && (
              <span className="truncate">{logoutItem.title}</span>
            )}
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={executeLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out? You will need to sign in again to access your account."
        confirmText="Log Out"
        cancelText="Cancel"
        isDestructive={true}
      />
    </>
  );
}

export default Sidebar;
