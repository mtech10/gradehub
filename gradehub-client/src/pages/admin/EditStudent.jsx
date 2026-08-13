import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import StudentForm from "../../components/admin/studentForm/StudentForm";

import { studentService } from "../../services/admin/studentService";
import FormSkeleton from "../../components/ui/skeletons/FormSkeleton";

function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const response = await studentService.getStudentById(id);
        const rawData = response.data || response;

        const normalizedStudent = {
          ...rawData,
          id: rawData.id,
          firstName: rawData.firstName || rawData.firstname || "",
          lastName: rawData.lastName || rawData.lastname || "",
          middleName: rawData.middleName || rawData.middlename || "",
          matricNumber: rawData.matricNumber || rawData.matricnumber || "",
          dateOfBirth: rawData.dateOfBirth || rawData.dateofbirth || "",
          admissionYear: rawData.admissionYear || rawData.admission_year || "",
          department:
            rawData.departmentId ||
            rawData.departmentid ||
            rawData.department_id ||
            "",
          level: rawData.levelId || rawData.levelid || rawData.level_id || "",
          session:
            rawData.sessionId || rawData.sessionid || rawData.session_id || "",
        };

        setStudent(normalizedStudent);
      } catch (error) {
        console.error("Failed to fetch student for editing:", error);
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudent();
    }
  }, [id]);

  if (!student && !loading) {
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
          onClick={() => navigate(`/admin/students/${id}`)}
          disabled={loading}
        >
          <ArrowLeft size={18} />
          Back to Details
        </Button>
      </div>

      {loading ? (
        <FormSkeleton />
      ) : (
        <StudentForm mode="edit" initialValues={student} />
      )}
    </div>
  );
}

export default EditStudent;
