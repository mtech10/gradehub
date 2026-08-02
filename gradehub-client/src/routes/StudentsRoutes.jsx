import { Routes, Route } from "react-router-dom";

import StudentLayout from "../layouts/StudentLayout";
import Dashboard from "../pages/student/Dashboard";
import Results from "../pages/student/Results";
import Transcript from "../pages/student/Transcript";
import GPACalculator from "../pages/student/GPACalculator";
import Courses from "../pages/student/Courses";
import CourseRegistration from "../pages/student/CourseRegistration";
import Notifications from "../pages/student/Notifications";
import Profile from "../pages/student/Profile";
import Settings from "../pages/student/Settings";

function StudentsRoutes() {
  return (
    <Routes>
      <Route element={<StudentLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="results" element={<Results />} />
        <Route path="transcript" element={<Transcript />} />
        <Route path="gpa-calculator" element={<GPACalculator />} />
        <Route path="courses" element={<Courses />} />
        <Route path="course-registration" element={<CourseRegistration />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default StudentsRoutes;
