import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Bell,
  CalendarDays,
  Search,
  ChevronDown,
  Check,
  X,
  User,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { notificationsList } from "../../constants/notifications/notificationData";
import { useAuth } from "../../context/AuthContext";
import { useLayout } from "../../context/LayoutContext";

function TopNavbar({ user, routes }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
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

  // Keyboard shortcut: Press ⌘K to focus search
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const unreadNotifications = notificationsList.filter((n) => !n.isRead);
  const dropdownNotifications = unreadNotifications.slice(0, 4);
  const { sidebarOpen, toggleSidebar } = useLayout();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${routes.courses}?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header
      className={`
    fixed
    top-0
    right-0
    z-30
    h-20
    flex
    items-center
    justify-between
    border-b
    border-slate-200
    bg-white
    px-8
    transition-all
    duration-300
    ${sidebarOpen ? "left-80" : "left-30"}
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
      <div className="flex items-center gap-4">
        {/* Notification Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`relative rounded-lg p-2 transition-colors ${isDropdownOpen ? "bg-slate-100" : "hover:bg-slate-100"}`}
          >
            <Bell size={22} className="text-slate-600" />
            {unreadNotifications.length > 0 && (
              <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[11px] font-semibold text-white">
                {unreadNotifications.length}
              </span>
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50">
                <h3 className="font-semibold text-slate-900">Notifications</h3>
                <button className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
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

        {/* Calendar */}
        <button className="rounded-lg p-2 hover:bg-slate-100">
          <CalendarDays size={22} className="text-slate-600" />
        </button>

        {/* User Profile Dropdown Wrapper */}
        <div
          className="relative border-l border-slate-200 pl-6"
          ref={userDropdownRef}
        >
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center gap-3 transition-opacity hover:opacity-80 focus:outline-none"
          >
            <img
              src={user.avatar}
              alt="Profile"
              className="h-11 w-11 rounded-full object-cover shadow-sm"
            />
            <div className="text-left hidden sm:block">
              <p className="font-semibold text-slate-900">{user.name}</p>
              <p className="text-sm text-slate-500">{user.level}</p>
            </div>
            <ChevronDown
              size={18}
              className={`text-slate-500 transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* User Dropdown Menu */}
          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden">
              {/* Header Info */}
              <div className="border-b border-slate-100 p-4 bg-slate-50">
                <p className="font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
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
                  onClick={handleLogout}
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
  );
}

export default TopNavbar;
