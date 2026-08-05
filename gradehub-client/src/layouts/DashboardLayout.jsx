import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";
import AuthFooter from "../components/auth/AuthFooter";
import { LayoutProvider } from "../context/LayoutContext";
import { useAuth } from "../context/AuthContext";
import { useLayout } from "../context/LayoutContext";

function DashboardLayout({
  navigation,
  routes,
  onLogout,
  sidebarVariant = "light",
}) {
  const { user } = useAuth();
  const { sidebarOpen, toggleSidebar } = useLayout();
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar navigation={navigation} user={user} variant={sidebarVariant} />

      <div
        className={`
    flex
    flex-1
    flex-col
    transition-all
    duration-300
    ${sidebarOpen ? "ml-80" : "ml-30"}
  `}
      >
        <TopNavbar user={user} routes={routes} />

        <main className="flex-1 overflow-y-auto pt-20">
          <div className="mx-auto max-w-[1680px] px-8 py-6">
            <Outlet />
          </div>
        </main>
        <AuthFooter />
      </div>
    </div>
  );
}

export default DashboardLayout;
