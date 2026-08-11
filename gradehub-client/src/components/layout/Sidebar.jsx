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
    flex
    flex-col
    overflow-hidden
    transition-all
    duration-300
    border-r
    print:hidden
    ${sidebarOpen ? "w-80" : "w-30"}
    ${isDark ? "bg-slate-800 border-slate-800" : "bg-white border-slate-200"}
  `}
    >
      <div className={`p-8 ${isDark ? "border-b border-slate-800" : ""}`}>
        <Logo variant={variant} compact={!sidebarOpen} />
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
        <div
          className={`flex items-center ${
            sidebarOpen ? "gap-3" : "justify-center"
          }`}
        >
          <img
            src={user?.avatar}
            alt={user?.name}
            className="h-12 w-12 rounded-full"
          />
          {sidebarOpen && (
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
          )}
        </div>

        <button
          onClick={handleLogout}
          className={`
mt-6
flex
items-center
py-3
font-semibold
text-red-600
transition-colors
${sidebarOpen ? "justify-start gap-3 px-4" : "justify-center px-0"}
${isDark ? " hover:bg-slate-800" : " hover:bg-red-50"}
`}
        >
          <LogoutIcon size={20} />

          {sidebarOpen && logoutItem.title}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
