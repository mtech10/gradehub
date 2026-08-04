import DashboardLayout from "./DashboardLayout";

import { studentNavigation } from "../constants/navigation";

function StudentLayout() {
  const studentRoutes = {
    dashboard: "/student",
    results: "/student/results",
    transcript: "/student/transcript",
    courses: "/student/courses",
    notifications: "/student/notifications",
    profile: "/student/profile",
    settings: "/student/settings",
  };

  const handleLogout = () => {};

  return (
    <DashboardLayout
      navigation={studentNavigation}
      routes={studentRoutes}
      onLogout={handleLogout}
    />
  );
}

export default StudentLayout;
