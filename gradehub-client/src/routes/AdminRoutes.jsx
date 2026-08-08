import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Students from "../pages/admin/Students";
import StudentDetails from "../pages/admin/StudentDetails";
import AddStudent from "../pages/admin/AddStudent";
import EditStudent from "../pages/admin/EditStudent";
import AllCourses from "../pages/admin/AllCourses";
import AllResults from "../pages/admin/AllResults";
import UploadResults from "../pages/admin/UploadResults";
import CourseDetails from "../pages/admin/CourseDetails";
import AddCourse from "../pages/admin/AddCourse";
import EditCourse from "../pages/admin/EditCourse";
import AdminProfile from "../pages/admin/AdminProfile";
import Departments from "../pages/admin/Departments";
import DepartmentDetails from "../pages/admin/DepartmentDetails";
import AddDepartment from "../pages/admin/AddDepartment";
import EditDepartment from "../pages/admin/EditDepartment";
import Settings from "../pages/admin/Settings";
function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="students/new" element={<AddStudent />} />
        <Route path="students/:id" element={<StudentDetails />} />
        <Route path="students/:id/edit" element={<EditStudent />} />
        <Route path="courses" element={<AllCourses />} />
        <Route path="results" element={<AllResults />} />
        <Route path="results/upload" element={<UploadResults />} />
        <Route path="students/:id/edit" element={<EditStudent />} />
        <Route path="courses/:id" element={<CourseDetails />} />
        <Route path="courses/new" element={<AddCourse />} />
        <Route path="courses/:id/edit" element={<EditCourse />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/add" element={<AddDepartment />} />
        <Route path="/departments/:id" element={<DepartmentDetails />} />
        <Route path="/departments/:id/edit" element={<EditDepartment />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
