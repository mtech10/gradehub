import Logo from "../ui/Logo";
import NavItem from "../navigation/NavItem";
import { studentNavigation, logoutItem } from "../../constants/navigation";
import { useNavigate } from "react-router-dom";

function Sidebar({ isOpen }) {
  const LogoutIcon = logoutItem.icon;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <aside
      className={`
        sticky
        top-0
        flex
        h-screen
        w-75
        flex-col
        border-r
        border-slate-200
        bg-white
        transition-all
        duration-300
        z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Logo */}
      <div className="px-8 py-8">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-4 overflow-y-auto">
        {studentNavigation.map((item) => (
          <NavItem key={item.title} {...item} />
        ))}
      </nav>

      {/* Student Card */}
      <div className="border-t border-slate-200 p-6">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/80"
            alt="Student"
            className="h-12 w-12 rounded-full"
          />
          <div>
            <p className="font-semibold text-slate-900">Ademola Oyelusi</p>
            <p className="text-sm text-slate-500">Agricultural Engineering</p>
            <p className="text-sm text-slate-500">400 Level</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="
            mt-6
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-red-600
            hover:bg-red-50
            transition-colors
            font-semibold
          "
        >
          <LogoutIcon size={20} />
          {logoutItem.title}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
