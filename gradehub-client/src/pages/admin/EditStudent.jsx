import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import StudentForm from "../../components/admin/studentForm/StudentForm";

import { students } from "../../constants/admin/students";

function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const student = useMemo(() => {
    return students.find((student) => String(student.id) === id);
  }, [id]);

  if (!student) {
    return (
      <div className="space-y-6">
        <PageHeader title="Edit Student" subtitle="Student not found." />

        <Button variant="secondary" onClick={() => navigate("/admin/students")}>
          <ArrowLeft size={18} />
          Back to Students
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Edit Student" subtitle="Update student information." />

      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={() => navigate(`/admin/students/${student.id}`)}
        >
          <ArrowLeft size={18} />
          Back to Details
        </Button>
      </div>

      <StudentForm mode="edit" initialValues={student} />
    </div>
  );
}

export default EditStudent;
