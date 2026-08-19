import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import courseService from "../../services/admin/courseService";
import CourseForm from "../../components/admin/courseForm/CourseForm";
import FormSkeleton from "../../components/ui/skeletons/FormSkeleton";

function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await courseService.getCourseById(id);
        const data = response.data || response;

        setCourse({
          id: data.id,
          code: data.code || "",
          title: data.title || "",
          description: data.description || "",
          departmentId:
            data.departmentId || data.department_id || data.departmentid || "",
          levelId: data.levelId || data.level_id || data.levelid || "",
          semesterId:
            data.semesterId || data.semester_id || data.semesterid || "",
          sessionId: data.sessionId || data.session_id || data.sessionid || "",
          creditUnit: data.creditUnit || data.creditunit || "",
        });
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (!course && !loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Edit Course" subtitle="Course not found." />

        <Button
          variant="secondary"
          onClick={() => navigate("/admin/courses")}
          className="w-full sm:w-auto justify-center"
        >
          <ArrowLeft size={18} className="mr-1.5" />
          Back to Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader title="Edit Course" subtitle="Update course information." />

      <div className="flex flex-col sm:flex-row sm:justify-end">
        <Button
          variant="secondary"
          onClick={() => navigate(`/admin/courses/${id}`)}
          disabled={loading}
          className="w-full sm:w-auto justify-center"
        >
          <ArrowLeft size={18} className="mr-1.5" />
          Back to Details
        </Button>
      </div>

      {loading ? (
        <FormSkeleton />
      ) : (
        <CourseForm mode="edit" initialValues={course} />
      )}
    </div>
  );
}

export default EditCourse;
