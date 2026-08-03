import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import CourseForm from "../../components/admin/courseForm/CourseForm";

function AddCourse() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Add Course"
        subtitle="Create a new course for the academic session."
      />

      <div className="flex justify-end">
        <Button variant="secondary" onClick={() => navigate("/admin/courses")}>
          <ArrowLeft size={18} />
          Back to Courses
        </Button>
      </div>

      <CourseForm mode="create" />
    </div>
  );
}

export default AddCourse;
