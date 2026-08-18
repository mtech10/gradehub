import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UploadCloud } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import CourseForm from "../../components/admin/courseForm/CourseForm";
import BulkUploadModal from "../../components/admin/common/BulkUploadModal";

import departmentService from "../../services/admin/departmentService";
import levelService from "../../services/admin/levelService";
import semesterService from "../../services/admin/semesterService";
import courseService from "../../services/admin/courseService";
import { useToast } from "../../context/ToastContext";

import { toSelectOptions } from "../../utils/selectOptions";
import FormSkeleton from "../../components/ui/skeletons/FormSkeleton";

function AddCourse() {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    const loadAcademicOptions = async () => {
      try {
        setLoading(true);

        const [departmentResponse, levelResponse, semesterResponse] =
          await Promise.all([
            departmentService.getDepartments({
              limit: 100,
              status: "active",
            }),

            levelService.getLevels({
              limit: 100,
              status: "active",
            }),

            semesterService.getSemesters({
              limit: 100,
              status: "active",
            }),
          ]);

        setDepartments(
          toSelectOptions(
            departmentResponse.data ?? departmentResponse.departments ?? [],
          ),
        );

        setLevels(
          toSelectOptions(levelResponse.data ?? levelResponse.levels ?? []),
        );

        setSemesters(
          toSelectOptions(
            semesterResponse.data ?? semesterResponse.semesters ?? [],
          ),
        );
      } catch (error) {
        console.error("Failed to load course academic options:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAcademicOptions();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await courseService.createCourse(formData);
      addToast({
        title: "Course Created",
        message: "The course has been successfully added.",
        type: "success",
      });
      navigate("/admin/courses");
    } catch (error) {
      console.error("Failed to create course:", error);
      addToast({
        title: "Creation Failed",
        message: error.response?.data?.message || "Failed to create course.",
        type: "error",
      });
    }
  };

  const handleBulkUpload = async (file, contextData) => {
    try {
      await courseService.uploadCourses(file, contextData);
      addToast({
        title: "Upload Successful",
        message: "Courses were successfully imported.",
        type: "success",
      });
      navigate("/admin/courses");
    } catch (error) {
      addToast({
        title: "Upload Failed",
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to import courses.",
        type: "error",
      });
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Course"
        description="Create a new course and assign its academic information."
      />

      <div className="flex justify-end gap-3">
        <Button onClick={() => setIsUploadModalOpen(true)} disabled={loading}>
          <UploadCloud size={18} className="mr-2" />
          Import Bulk Courses
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate("/admin/courses")}
          disabled={loading}
        >
          <ArrowLeft size={18} />
          Back to Courses
        </Button>
      </div>

      {loading ? (
        <FormSkeleton />
      ) : (
        <CourseForm
          mode="create"
          departments={departments}
          levels={levels}
          semesters={semesters}
          onSubmit={handleSubmit}
        />
      )}

      <BulkUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleBulkUpload}
        title="Import Courses"
        entityName="courses"
        templateUrl="/templates/courses_template.csv"
        requireContext={true}
        departments={departments}
        levels={levels}
      />
    </div>
  );
}

export default AddCourse;
