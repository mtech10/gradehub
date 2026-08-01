import DashboardLayout from "./DashboardLayout";

import { studentNavigation } from "../constants/navigation";
import { student } from "../constants/studentInformation";

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
      user={{
        name: student.fullName,
        email: "ademola@ui.edu.ng",
        department: student.department,
        level: student.level,
        avatar: "https://i.pravatar.cc/150?img=8",
      }}
      routes={studentRoutes}
      onLogout={handleLogout}
    />
  );
}

export default StudentLayout;
