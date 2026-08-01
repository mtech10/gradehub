import Logo from "../ui/Logo";
import NavItem from "../navigation/NavItem";
import { logoutItem } from "../../constants/navigation";

function Sidebar({
  navigation,
  user,
  onLogout,
  isOpen = true,
  variant = "light",
}) {
  const LogoutIcon = logoutItem.icon;
  const isDark = variant === "dark";

  return (
    <aside
      className={`
        sticky
        top-0
        flex
        h-screen
        w-75
        overflow-hidden
        flex-col
        border-r
       ${isDark ? "bg-slate-800 border-slate-800" : "bg-white  border-slate-200"}
        transition-all
        duration-300
        z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Logo */}
      <div className={`px-8 py-8 ${isDark ? "border-b border-slate-800" : ""}`}>
        <Logo variant={variant} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4">
        {navigation.map((item) => (
          <NavItem key={item.title} {...item} variant={variant} />
        ))}
      </nav>

      {/* Student Card */}
      <div
        className={`border-t p-6 ${
          isDark ? "border-slate-800" : "border-slate-200"
        }`}
      >
        {" "}
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="h-12 w-12 rounded-full"
          />

          <div>
            <p
              className={`font-semibold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {user?.name}
            </p>

            <p className={isDark ? "text-slate-400" : "text-slate-500"}>
              {user?.department}
            </p>

            <p className={isDark ? "text-slate-400" : "text-slate-500"}>
              {user?.level}
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className={`
            mt-6
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-red-600
            ${isDark ? "hover:bg-slate-800" : "hover:bg-red-50"}
            transition-colors
            font-semibold
          `}
        >
          <LogoutIcon size={20} />
          {logoutItem.title}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
