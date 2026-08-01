import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";
import AuthFooter from "../components/auth/AuthFooter";

function DashboardLayout({
  navigation,
  user,
  routes,
  logoutItem,
  onLogout,
  sidebarVariant = "light",
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        navigation={navigation}
        user={user}
        onLogout={onLogout}
        variant={sidebarVariant}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavbar user={user} routes={routes} onLogout={onLogout} />

        <main className="flex-1 overflow-y-auto">
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
