// src/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";

// Authentication Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Student Pages
// import Dashboard from "./pages/student/Dashboard";

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
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}

      {/* Admin Portal */}
      {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
