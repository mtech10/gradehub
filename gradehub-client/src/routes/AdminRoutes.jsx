import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Students from "../pages/admin/Students";
import StudentDetails from "../pages/admin/StudentDetails";
import AddStudent from "../pages/admin/AddStudent";
import EditStudent from "../pages/admin/EditStudent";
import AllCourses from "../pages/admin/AllCourses";
import AllResults from "../pages/admin/AllResults";
import CourseDetails from "../pages/admin/CourseDetails";
import AddCourse from "../pages/admin/AddCourse";
import EditCourse from "../pages/admin/EditCourse";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="students/new" element={<AddStudent />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="/admin/students/:id/edit" element={<EditStudent />} />
        <Route path="courses" element={<AllCourses />} />
        <Route path="results" element={<AllResults />} />
        <Route path="students/:id/edit" element={<EditStudent />} />
        <Route path="courses/:id" element={<CourseDetails />} />
        <Route path="courses/new" element={<AddCourse />} />
        <Route path="courses/:id/edit" element={<EditCourse />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
