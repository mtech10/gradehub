import Logo from "../ui/Logo";
import NavItem from "../navigation/NavItem";
import { logoutItem } from "../../constants/navigation";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLayout } from "../../context/LayoutContext";

function Sidebar({ navigation, user, variant = "light" }) {
  const LogoutIcon = logoutItem.icon;
  const isDark = variant === "dark";

  const { logout } = useAuth();
  const navigate = useNavigate();

  const { sidebarOpen } = useLayout();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`
    fixed
    top-0
    left-0
    z-40
    h-screen
    overflow-hidden
    flex
    flex-col
    shrink-0
    transition-all
    duration-300
    ${sidebarOpen ? "w-[300px]" : "w-0"}
    ${isDark ? "bg-slate-800" : "bg-white"}
    ${isDark ? "border-slate-800" : "border-slate-200"}
    border-r
  `}
    >
      <div className={`px-8 py-8 ${isDark ? "border-b border-slate-800" : ""}`}>
        <Logo variant={variant} />
      </div>

      <nav className="flex-1 space-y-2 px-4">
        {navigation.map((item) => (
          <NavItem key={item.title} {...item} variant={variant} />
        ))}
      </nav>

      <div
        className={`border-t p-4 ${
          isDark ? "border-slate-800" : "border-slate-200"
        }`}
      >
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
          onClick={handleLogout}
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
            font-semibold
            transition-colors
            ${isDark ? "hover:bg-slate-700" : "hover:bg-red-50"}
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
