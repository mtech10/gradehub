import DashboardLayout from "./DashboardLayout";

import { adminNavigation } from "../constants/navigation";

function AdminLayout() {
  const adminUser = {
    name: "System Administrator",
    email: "admin@gradehub.edu.ng",
    department: "Academic Affairs",
    level: "Administrator",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

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
      user={adminUser}
      routes={adminRoutes}
      onLogout={handleLogout}
      sidebarVariant="dark"
    />
  );
}

export default AdminLayout;
