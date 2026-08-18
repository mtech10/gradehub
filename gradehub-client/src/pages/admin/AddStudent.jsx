import { useEffect, useState } from "react";
import { ArrowLeft, UploadCloud } from "lucide-react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import StudentForm from "../../components/admin/studentForm/StudentForm";
import BulkUploadModal from "../../components/admin/common/BulkUploadModal";

import { studentService } from "../../services/admin/studentService";
import { useToast } from "../../context/ToastContext";
import { toSelectOptions } from "../../utils/selectOptions";

function AddStudent() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const fetchModalOptions = async () => {
      try {
        const [deptRes, levelRes] = await Promise.all([
          studentService.getDepartments(),
          studentService.getLevels(),
        ]);

        // Extract the correct array depending on how your backend structures the response
        const deptList = deptRes.data ?? deptRes.departments ?? deptRes ?? [];
        const levelList = levelRes.data ?? levelRes.levels ?? levelRes ?? [];

        setDepartments(toSelectOptions(deptList));
        setLevels(toSelectOptions(levelList));
      } catch (error) {
        console.error("Failed to fetch options for modal:", error);
      }
    };

    fetchModalOptions();
  }, []);
  const handleBulkUpload = async (file, contextData) => {
    try {
      await studentService.uploadStudents(file, contextData);
      addToast({
        title: "Upload Successful",
        message: "Students were successfully imported.",
        type: "success",
      });
      navigate("/admin/students");
    } catch (error) {
      addToast({
        title: "Upload Failed",
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to import students.",
        type: "error",
      });
      throw error;
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Add Student"
        subtitle="Create a new student profile or import in bulk."
      />

      <div className="flex justify-end gap-3">
        <Button onClick={() => setIsUploadModalOpen(true)}>
          <UploadCloud size={18} className="mr-2" />
          Import Bulk Students
        </Button>
        <Button variant="secondary" onClick={() => navigate("/admin/students")}>
          <ArrowLeft size={18} />
          Back to Students
        </Button>
      </div>

      <StudentForm mode="create" />

      <BulkUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleBulkUpload}
        title="Import Students"
        entityName="students"
        templateUrl="/templates/students_template.csv"
        requireContext={true}
        departments={departments}
        levels={levels}
      />
    </div>
  );
}

export default AddStudent;
