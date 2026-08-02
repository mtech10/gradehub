import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import StudentForm from "../../components/admin/studentForm/StudentForm";

function AddStudent() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Add Student"
        subtitle="Create a new student profile."
      />

      <div className="flex justify-end">
        <Button variant="secondary" onClick={() => navigate("/admin/students")}>
          <ArrowLeft size={18} />
          Back to Students
        </Button>
      </div>

      <StudentForm />
    </div>
  );
}

export default AddStudent;
