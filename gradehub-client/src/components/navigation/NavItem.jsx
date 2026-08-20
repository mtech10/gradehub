// import { NavLink } from "react-router-dom";
// import { useLayout } from "../../context/LayoutContext";

// function NavItem({ title, icon: Icon, path, badge, variant = "light" }) {
//   const { sidebarOpen } = useLayout();
//   return (
//     <NavLink
//       to={path}
//       end
//       className={({ isActive }) => `
//         flex
//         items-center
//         justify-between
//         rounded-xl
//         px-4
//         py-3
//         transition-all
//         duration-200
// ${sidebarOpen ? "justify-start gap-3 px-4" : "justify-center px-0"}
//         ${
//           isActive
//             ? "bg-blue-600 text-white shadow-md"
//             : variant === "dark"
//               ? "text-white hover:bg-slate-800 hover:text-white"
//               : "text-white hover:bg-slate-100"
//         }
//       `}
//     >
//       {({ isActive }) => (
//         <>
//           <div className="flex items-center justify-center gap-3">
//             <Icon
//               size={20}
//               className={`
//                 ${isActive ? "text-white" : variant === "dark" ? "text-white" : "text-slate-800"}
//                 transition-colors duration-200
//               `}
//             />
//             {sidebarOpen && (
//               <span
//                 className={`  whitespace-nowrap
//     transition-all
//     duration-200
//     overflow-hidden
//                 ${isActive ? "text-white" : variant === "dark" ? "text-white" : "text-slate-800"}
//                 font-medium
//               `}
//               >
//                 {title}
//               </span>
//             )}
//           </div>

//           {badge && (
//             <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold bg-blue-100 text-blue-700">
//               {badge}
//             </span>
//           )}
//         </>
//       )}
//     </NavLink>
//   );
// }

// export default NavItem;

import { NavLink } from "react-router-dom";
import { useLayout } from "../../context/LayoutContext";

function NavItem({ title, icon: Icon, path, badge, variant = "light" }) {
  const { sidebarOpen } = useLayout();

  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) => `
        relative
        flex
        items-center
        rounded-xl
        py-3
        transition-all
        duration-200
        ${sidebarOpen ? "justify-between px-4" : "justify-center px-0"}
        ${
          isActive
            ? "bg-blue-600 text-white shadow-md"
            : variant === "dark"
              ? "text-white hover:bg-slate-800 hover:text-white"
              : "text-slate-800 hover:bg-slate-100" // FIX: inactive light text color
        }
      `}
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center justify-center gap-3">
            <Icon
              size={20}
              className={`
                ${isActive ? "text-white" : variant === "dark" ? "text-white" : "text-slate-800"}
                transition-colors duration-200
              `}
            />
            {sidebarOpen && (
              <span
                className={`
                  whitespace-nowrap
                  transition-all
                  duration-200
                  overflow-hidden
                  font-medium
                  ${isActive ? "text-white" : variant === "dark" ? "text-white" : "text-slate-800"}
                `}
              >
                {title}
              </span>
            )}
          </div>

          {/* BADGE LOGIC */}
          {badge > 0 &&
            (sidebarOpen ? (
              // Open Sidebar: Show full number badge
              <span
                className={`
                  flex h-6 min-w-[24px] px-1.5 items-center justify-center rounded-full text-[11px] font-bold 
                  ${
                    isActive
                      ? "bg-white text-blue-600" // Inverted for active state
                      : "bg-blue-100 text-blue-700" // Standard for inactive state
                  }
                `}
              >
                {badge > 99 ? "99+" : badge}
              </span>
            ) : (
              // Closed Sidebar: Show tiny absolute dot indicator
              <span
                className={`
                  absolute top-2 right-2 flex h-2 w-2 rounded-full 
                  ${isActive ? "bg-white" : "bg-blue-600"}
                `}
              />
            ))}
        </>
      )}
    </NavLink>
  );
}

export default NavItem;
