import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ allowedRoles = [] }) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // BULLETPROOF SAFEGUARD: Check if user exists and safely ignore case sensitivity
  if (allowedRoles.length > 0) {
    const userRole = user?.role?.toLowerCase().trim() || "";
    const normalizedAllowedRoles = allowedRoles.map((role) =>
      role.toLowerCase().trim(),
    );

    if (!user || !normalizedAllowedRoles.includes(userRole)) {
      console.warn(
        "Unauthorized access attempt.",
        "\nUser Role:",
        userRole,
        "\nAllowed Roles:",
        normalizedAllowedRoles,
      );
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet />;
}

export default ProtectedRoute;
