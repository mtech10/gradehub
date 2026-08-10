// import { useMemo } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// import PageHeader from "../../components/common/PageHeader";
// import Button from "../../components/ui/Button";
// import DepartmentForm from "../../components/admin/departmentForm/DepartmentForm";

// import { departments } from "../../constants/admin/departments";

// function EditDepartment() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const department = useMemo(() => {
//     return departments.find((department) => String(department.id) === id);
//   }, [id]);

//   if (!department) {
//     return (
//       <div className="space-y-6">
//         <PageHeader title="Edit Department" subtitle="Department not found." />

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

//   return (
//     <div className="space-y-8">
//       <PageHeader
//         title="Edit Department"
//         subtitle="Update department information."
//       />

//       <div className="flex justify-end">
//         <Button
//           variant="secondary"
//           onClick={() => navigate(`/admin/departments/${department.id}`)}
//         >
//           <ArrowLeft size={18} />
//           Back to Details
//         </Button>
//       </div>

//       <DepartmentForm mode="edit" initialValues={department} />
//     </div>
//   );
// }

// export default EditDepartment;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import DepartmentForm from "../../components/admin/departmentForm/DepartmentForm";

import departmentService from "../../services/admin/departmentService";

function EditDepartment() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [department, setDepartment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the existing department data on mount
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await departmentService.getDepartmentById(id);
        const data = response.data || response;

        // Map the backend data to match the form's initialValues structure
        setDepartment({
          name: data.name,
          code: data.code,
          facultyId: data.faculty_id || data.facultyId || "",
          hod: data.hod || "",
          office: data.description || "",
          status: data.isactive || data.isActive ? "Active" : "Inactive",
        });
      } catch (error) {
        console.error("Failed to fetch department:", error);
        alert("Failed to load department details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDepartment();
    }
  }, [id]);

  const handleUpdateDepartment = async (payload) => {
    setIsSubmitting(true);
    try {
      // Fire the update payload to the backend API
      await departmentService.updateDepartment(id, payload);

      // Redirect back to the department details view upon success
      navigate(`/admin/departments/${id}`);
    } catch (error) {
      console.error("Failed to update department:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors ||
        "Failed to update department.";
      alert(`Error: ${JSON.stringify(errorMessage)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-500">
        Loading department data...
      </div>
    );
  }

  if (!department && !isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Edit Department" subtitle="Department not found." />
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

  return (
    <div className="space-y-8">
      <PageHeader
        title="Edit Department"
        subtitle="Update the academic department details."
      />

      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={() => navigate(`/admin/departments/${id}`)}
        >
          <ArrowLeft size={18} />
          Back to Details
        </Button>
      </div>

      <DepartmentForm
        mode="edit"
        initialValues={department}
        onSubmit={handleUpdateDepartment}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default EditDepartment;
