import { Routes, Route } from "react-router-dom";

import AuthRoutes from "./routes/AuthRoutes";
import StudentsRoutes from "./routes/StudentsRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />

      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
        <Route path="/student/*" element={<StudentsRoutes />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
