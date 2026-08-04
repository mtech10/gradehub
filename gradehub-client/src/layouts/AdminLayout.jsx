import DashboardLayout from "./DashboardLayout";

import { adminNavigation } from "../constants/navigation";

function AdminLayout() {
  const adminRoutes = {
    dashboard: "/admin",
    students: "/admin/students",
    departments: "/admin/departments",
    courses: "/admin/courses",
    results: "/admin/results",
    notifications: "/admin/notifications",
    profile: "/admin/profile",
    settings: "/admin/settings",
  };

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <DashboardLayout
      navigation={adminNavigation}
      routes={adminRoutes}
      onLogout={handleLogout}
      sidebarVariant="dark"
    />
  );
}

export default AdminLayout;
