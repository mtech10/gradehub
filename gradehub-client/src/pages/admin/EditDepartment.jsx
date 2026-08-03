import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import DepartmentForm from "../../components/admin/departmentForm/DepartmentForm";

import { departments } from "../../constants/admin/departments";

function EditDepartment() {
  const navigate = useNavigate();
  const { id } = useParams();

  const department = useMemo(() => {
    return departments.find((department) => String(department.id) === id);
  }, [id]);

  if (!department) {
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
        subtitle="Update department information."
      />

      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={() => navigate(`/admin/departments/${department.id}`)}
        >
          <ArrowLeft size={18} />
          Back to Details
        </Button>
      </div>

      <DepartmentForm mode="edit" initialValues={department} />
    </div>
  );
}

export default EditDepartment;
