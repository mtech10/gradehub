import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import CourseForm from "../../components/admin/courseForm/CourseForm";

import departmentService from "../../services/admin/departmentService";
import levelService from "../../services/admin/levelService";
import semesterService from "../../services/admin/semesterService";
import courseService from "../../services/admin/courseService";

import { toSelectOptions } from "../../utils/selectOptions";

function AddCourse() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [loading, setLoading] = useState(true);

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

      navigate("/admin/courses");
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Course"
        description="Create a new course and assign its academic information."
      />

      <div className="flex justify-end">
        <Button variant="secondary" onClick={() => navigate("/admin/courses")}>
          <ArrowLeft size={18} />
          Back to Courses
        </Button>
      </div>

      <CourseForm
        mode="create"
        departments={departments}
        levels={levels}
        semesters={semesters}
        loadingOptions={loading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AddCourse;
