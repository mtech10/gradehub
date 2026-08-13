// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// import PageHeader from "../../components/common/PageHeader";
// import Button from "../../components/ui/Button";
// import Card from "../../components/ui/Card";

// import DepartmentProfileCard from "../../components/admin/departmentDetails/DepartmentProfileCard";
// import DepartmentQuickStats from "../../components/admin/departmentDetails/DepartmentQuickStats";
// import DepartmentInformationCard from "../../components/admin/departmentDetails/DepartmentInformationCard";
// import DepartmentLecturersTable from "../../components/admin/departmentDetails/DepartmentLecturersTable";

// import departmentService from "../../services/admin/departmentService";

// function DepartmentDetails() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [department, setDepartment] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDepartmentDetails = async () => {
//       try {
//         const response = await departmentService.getDepartmentById(id);
//         const data = response.data || response;

//         // Map the backend DB columns to the format your UI components expect
//         setDepartment({
//           id: data.id,
//           name: data.name,
//           code: data.code,
//           faculty: data.faculty_name || data.faculty?.name || "N/A",
//           hod: data.hod || "Not Assigned",
//           status: data.isactive || data.isActive ? "Active" : "Inactive",
//           // Fallbacks for fields that might not be in your DB schema yet
//           office: data.description || "N/A",
//           email: "N/A",
//           phone: "N/A",
//           students: 0,
//           courses: 0,
//           lecturers: 0,
//         });
//       } catch (error) {
//         console.error("Failed to fetch department details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchDepartmentDetails();
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex h-64 items-center justify-center text-slate-500">
//         Loading department details...
//       </div>
//     );
//   }

//   if (!department && !loading) {
//     return (
//       <div className="space-y-6">
//         <PageHeader
//           title="Department Details"
//           subtitle="Department not found."
//         />

//         <Button
//           variant="secondary"
//           onClick={() => navigate("/admin/departments")}
//         >
//           <ArrowLeft size={18} />
//           Back to Departments
//         </Button>
//       </div>
//     );
//   }

//   // Passing an empty array until the Lecturer/Staff module is built
//   const lecturers = [];

//   return (
//     <div className="space-y-8">
//       <PageHeader
//         title="Department Details"
//         subtitle="View complete department information."
//       />

//       <div className="flex justify-between">
//         <Button
//           variant="secondary"
//           onClick={() => navigate("/admin/departments")}
//         >
//           <ArrowLeft size={18} />
//           Back to Departments
//         </Button>

//         <Button
//           onClick={() => navigate(`/admin/departments/${department.id}/edit`)}
//         >
//           Edit Department
//         </Button>
//       </div>

//       <DepartmentProfileCard department={department} />

//       <DepartmentQuickStats department={department} />

//       <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
//         <DepartmentInformationCard department={department} />

//         <Card className="p-6">
//           <h3 className="mb-6 text-lg font-semibold">Department Lecturers</h3>

//           <DepartmentLecturersTable lecturers={lecturers} />
//         </Card>
//       </div>
//     </div>
//   );
// }

// export default DepartmentDetails;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import DepartmentProfileCard from "../../components/admin/departmentDetails/DepartmentProfileCard";
import DepartmentQuickStats from "../../components/admin/departmentDetails/DepartmentQuickStats";
import DepartmentInformationCard from "../../components/admin/departmentDetails/DepartmentInformationCard";
import DepartmentLecturersTable from "../../components/admin/departmentDetails/DepartmentLecturersTable";

import departmentService from "../../services/admin/departmentService";
import ProfileCardSkeleton from "../../components/ui/skeletons/ProfileCardSkeleton";
import StatCardSkeleton from "../../components/ui/skeletons/StatCardSskeleton";

function DepartmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      try {
        const response = await departmentService.getDepartmentById(id);
        const data = response.data || response;

        setDepartment({
          id: data.id,
          name: data.name,
          code: data.code,
          faculty: data.faculty_name || data.faculty?.name || "N/A",
          hod: data.hod || "Not Assigned",
          status: data.isactive || data.isActive ? "Active" : "Inactive",
          office: data.description || "N/A",
          email: "N/A",
          phone: "N/A",
          students: 0,
          courses: 0,
          lecturers: 0,
        });
      } catch (error) {
        console.error("Failed to fetch department details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDepartmentDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Department Details"
          subtitle="View complete department information."
        />
        <div className="flex justify-between">
          <Button variant="secondary" disabled>
            <ArrowLeft size={18} />
            Back to Departments
          </Button>
          <Button disabled>Edit Department</Button>
        </div>

        <ProfileCardSkeleton />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={`stat-${i}`} />
          ))}
        </div>

        <div className="h-64 w-full animate-pulse rounded-2xl bg-slate-200"></div>
      </div>
    );
  }

  if (!department && !loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Department Details"
          subtitle="Department not found."
        />

        <Button
          variant="secondary"
          onClick={() => navigate("/admin/departments")}
        >
          <ArrowLeft size={18} />
          Back to Departments
        </Button>
      </div>
    );
  }

  const lecturers = [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Department Details"
        subtitle="View complete department information."
      />

      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={() => navigate("/admin/departments")}
        >
          <ArrowLeft size={18} />
          Back to Departments
        </Button>

        <Button
          onClick={() => navigate(`/admin/departments/${department.id}/edit`)}
        >
          Edit Department
        </Button>
      </div>

      <DepartmentProfileCard department={department} />

      <DepartmentQuickStats department={department} />

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <DepartmentInformationCard department={department} />

        <Card className="p-6">
          <h3 className="mb-6 text-lg font-semibold">Department Lecturers</h3>
          <DepartmentLecturersTable lecturers={lecturers} />
        </Card>
      </div>
    </div>
  );
}

export default DepartmentDetails;
