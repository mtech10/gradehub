import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import DepartmentForm from "../../components/admin/departmentForm/DepartmentForm";

import departmentService from "../../services/admin/departmentService";

function AddDepartment() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateDepartment = async (payload) => {
    setIsSubmitting(true);
    try {
      
      await departmentService.createDepartment(payload);

      
      navigate("/admin/departments");
    } catch (error) {
      console.error("Failed to create department:", error);

      
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors ||
        "Failed to create department.";
      alert(`Error: ${JSON.stringify(errorMessage)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Add Department"
        subtitle="Create a new academic department."
      />

      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={() => navigate("/admin/departments")}
        >
          <ArrowLeft size={18} />
          Back to Departments
        </Button>
      </div>

      {}
      <DepartmentForm
        mode="add"
        onSubmit={handleCreateDepartment}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default AddDepartment;
