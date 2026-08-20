import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Bell,
  CalendarDays,
  ChevronDown,
  Check,
  User,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { notificationService } from "../../services/notificationService";
import { useAuth } from "../../context/AuthContext";
import { useLayout } from "../../context/LayoutContext";

import ConfirmModal from "../ui/ConfirmModal";
import { useToast } from "../../context/ToastContext";

function TopNavbar({ user, routes }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const { logout } = useAuth();
  const { sidebarOpen, toggleSidebar } = useLayout();
  const { addToast } = useToast();

  const [notifications, setNotifications] = useState([]);

  // Fetch notifications on component mount and listen for updates
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.getNotifications();
        setNotifications(data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    // Initial fetch on page load
    fetchNotifications();

    // ADDED: Listen for updates from anywhere in the app
    window.addEventListener("notificationsUpdated", fetchNotifications);

    // Cleanup listener
    return () => {
      window.removeEventListener("notificationsUpdated", fetchNotifications);
    };
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

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

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadNotifications = notifications.filter((n) => !n.isRead);
  const dropdownNotifications = unreadNotifications.slice(0, 4);

  return (
    <>
      <header
        className={`
      fixed top-0 right-0 z-30 h-20 flex items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8 transition-all duration-300
      left-0 ${sidebarOpen ? "lg:left-80" : "lg:left-24"}
    `}
      >
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="rounded-lg p-2 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Sidebar"
          >
            <Menu size={22} className="text-slate-600" />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notification Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`relative rounded-lg p-2 transition-colors ${
                isDropdownOpen ? "bg-slate-100" : "hover:bg-slate-100"
              }`}
            >
              <Bell size={22} className="text-slate-600" />
              {unreadNotifications.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] sm:text-[11px] font-semibold text-white">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-[-60px] sm:right-0 mt-2 w-[320px] sm:w-96 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50">
                  <h3 className="font-semibold text-slate-900">
                    Notifications
                  </h3>
                  <button
                    onClick={handleMarkAllRead}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Check size={14} /> Mark all read
                  </button>
                </div>
                <div className="max-h-[360px] overflow-y-auto">
                  {dropdownNotifications.length > 0 ? (
                    dropdownNotifications.map((notif) => {
                      const Icon = notif.icon;
                      return (
                        <div
                          key={notif.id}
                          className="flex gap-4 border-b border-slate-50 p-4 hover:bg-slate-50 transition-colors cursor-pointer last:border-0"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <Icon size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {notif.title}
                            </p>
                            <p className="truncate text-xs text-slate-500 mt-0.5">
                              {notif.message}
                            </p>
                            <p className="text-[10px] font-medium text-blue-600 mt-1.5">
                              {notif.time}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-sm text-slate-500">
                      You're all caught up!
                    </div>
                  )}
                </div>
                <div className="border-t border-slate-100 p-2 bg-slate-50">
                  <Link
                    to={routes.notifications}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block w-full rounded-lg py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    View all notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Calendar - Hidden on very small screens to save space */}
          <button className="hidden sm:block rounded-lg p-2 hover:bg-slate-100">
            <CalendarDays size={22} className="text-slate-600" />
          </button>

          {/* User Profile Dropdown Wrapper */}
          <div
            className="relative border-l border-slate-200 pl-2 sm:pl-6 ml-1 sm:ml-0"
            ref={userDropdownRef}
          >
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-80 focus:outline-none"
            >
              <img
                src={user.avatar}
                alt="Profile"
                className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover shadow-sm"
              />
              <div className="text-left hidden lg:block">
                <p className="font-semibold text-slate-900">{user.name}</p>
                <p className="text-sm text-slate-500">{user.level}</p>
              </div>
              <ChevronDown
                size={18}
                className={`text-slate-500 transition-transform duration-200 ${
                  isUserDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* User Dropdown Menu */}
            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 sm:w-64 rounded-2xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden">
                {/* Header Info */}
                <div className="border-b border-slate-100 p-4 bg-slate-50">
                  <p className="font-semibold text-slate-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user.email}
                  </p>
                  <div className="mt-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
                    {user.department}
                  </div>
                </div>

                {/* Menu Links */}
                <div className="p-2 space-y-1">
                  <Link
                    to={routes.profile}
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <User size={16} className="text-slate-400" />
                    My Profile
                  </Link>
                  <Link
                    to={routes.settings}
                    onClick={() => setIsUserDropdownOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <SettingsIcon size={16} className="text-slate-400" />
                    Settings
                  </Link>
                </div>

                {/* Logout Action */}
                <div className="border-t border-slate-100 p-2 bg-slate-50/50">
                  <button
                    onClick={() => {
                      setIsUserDropdownOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

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

export default TopNavbar;
