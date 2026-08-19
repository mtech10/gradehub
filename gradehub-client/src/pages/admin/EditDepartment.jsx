import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import DepartmentForm from "../../components/admin/departmentForm/DepartmentForm";

import departmentService from "../../services/admin/departmentService";
import FormSkeleton from "../../components/ui/skeletons/FormSkeleton";

function EditDepartment() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [department, setDepartment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await departmentService.getDepartmentById(id);
        const data = response.data || response;

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
      await departmentService.updateDepartment(id, payload);
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

  if (!department && !isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Edit Department" subtitle="Department not found." />
        <Button
          variant="secondary"
          onClick={() => navigate("/admin/departments")}
          className="w-full sm:w-auto justify-center"
        >
          <ArrowLeft size={18} className="mr-1.5" />
          Back to Departments
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Edit Department"
        subtitle="Update the academic department details."
      />

      <div className="flex flex-col sm:flex-row sm:justify-end">
        <Button
          variant="secondary"
          onClick={() => navigate(`/admin/departments/${id}`)}
          disabled={isLoading}
          className="w-full sm:w-auto justify-center"
        >
          <ArrowLeft size={18} className="mr-1.5" />
          Back to Details
        </Button>
      </div>

      {isLoading ? (
        <FormSkeleton />
      ) : (
        <DepartmentForm
          mode="edit"
          initialValues={department}
          onSubmit={handleUpdateDepartment}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}

export default EditDepartment;
