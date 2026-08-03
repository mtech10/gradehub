import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import DepartmentForm from "../../components/admin/departmentForm/DepartmentForm";

function AddDepartment() {
  const navigate = useNavigate();

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
          Back to Department
        </Button>
      </div>

      <DepartmentForm mode="add" />
    </div>
  );
}

export default AddDepartment;
