import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import CourseProfileCard from "../../components/admin/courseDetails/CourseProfileCard";
import CourseQuickStats from "../../components/admin/courseDetails/CourseQuickStats";
import CourseStudentsTable from "../../components/admin/courseDetails/CourseStudentsTable";

import { courses } from "../../constants/admin/courses";
import { students } from "../../constants/admin/students";
import { results } from "../../constants/admin/results";

function CourseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const course = useMemo(() => {
    return courses.find((course) => String(course.id) === id);
  }, [id]);

  if (!course) {
    return (
      <div className="space-y-6">
        <PageHeader title="Course Details" subtitle="Course not found." />

        <Button variant="secondary" onClick={() => navigate("/admin/courses")}>
          <ArrowLeft size={18} />
          Back to Courses
        </Button>
      </div>
    );
  }

  const courseResults = results.filter(
    (result) => result.courseCode === course.code,
  );

  const enrolledStudents = students.filter(
    (student) => student.department === course.department,
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Course Details"
        subtitle="View complete course information."
      />

      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={() => navigate("/admin/courses")}>
          <ArrowLeft size={18} />
          Back to Courses
        </Button>

        <Button onClick={() => navigate(`/admin/courses/${course.id}/edit`)}>
          Edit Course
        </Button>
      </div>

      <CourseProfileCard course={course} />

      <CourseQuickStats
        course={course}
        results={courseResults}
        students={enrolledStudents}
      />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Enrolled Students
            </h3>

            <p className="text-sm text-slate-500">
              Students currently registered for this course.
            </p>
          </div>
        </div>

        <CourseStudentsTable students={enrolledStudents} />
      </div>
    </div>
  );
}

export default CourseDetails;
