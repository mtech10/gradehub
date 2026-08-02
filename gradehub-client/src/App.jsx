import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import StudentsRoutes from "./routes/StudentsRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AuthRoutes />} />
      <Route path="/student/*" element={<StudentsRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
