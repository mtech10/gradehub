import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import { courses } from "../../constants/admin/courses";
import CourseForm from "../../components/admin/courseForm/CourseForm";

function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const course = useMemo(() => {
    return courses.find((course) => String(course.id) === id);
  }, [id]);

  if (!course) {
    return (
      <div className="space-y-6">
        <PageHeader title="Edit Course" subtitle="Course not found." />

        <Button variant="secondary" onClick={() => navigate("/admin/courses")}>
          <ArrowLeft size={18} />
          Back to Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Edit Course" subtitle="Update course information." />

      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={() => navigate(`/admin/courses/${course.id}`)}
        >
          <ArrowLeft size={18} />
          Back to Details
        </Button>
      </div>

      <CourseForm mode="edit" initialValues={course} />
    </div>
  );
}

export default EditCourse;
