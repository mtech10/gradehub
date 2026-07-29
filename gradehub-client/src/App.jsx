// src/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";

// Authentication Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Student Pages
import Dashboard from "./pages/student/Dashboard";
import Results from "./pages/student/Results";
import StudentLayout from "./layouts/StudentLayout";
import Transcript from "./pages/student/Transcript";
import GPACalculator from "./pages/student/GPACalculator";
import Courses from "./pages/student/Courses";
import CourseRegistration from "./pages/student/CourseRegistration";

// Admin Pages
// import AdminDashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Student Portal */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="results" element={<Results />} />
        <Route path="transcript" element={<Transcript />} />
        <Route path="gpa-calculator" element={<GPACalculator />} />
        <Route path="courses" element={<Courses />} />
        <Route path="course-registration" element={<CourseRegistration />} />
      </Route>
      {/* Admin Portal */}
      {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
