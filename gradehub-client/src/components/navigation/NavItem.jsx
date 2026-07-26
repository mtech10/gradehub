import { NavLink } from "react-router-dom";

function NavItem({ title, icon: Icon, path, badge }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `
        flex items-center justify-between
        rounded-xl
        px-4
        py-3
        transition-all
        ${
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : "text-slate-700 hover:bg-slate-100"
        }
      `
      }
    >
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span className="font-medium">{title}</span>
      </div>

      {badge && (
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-blue-600">
          {badge}
        </span>
      )}
    </NavLink>
  );
}

export default NavItem;
