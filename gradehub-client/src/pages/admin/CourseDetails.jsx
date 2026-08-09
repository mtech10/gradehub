// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// import PageHeader from "../../components/common/PageHeader";
// import Button from "../../components/ui/Button";

// import CourseProfileCard from "../../components/admin/courseDetails/CourseProfileCard";
// import CourseQuickStats from "../../components/admin/courseDetails/CourseQuickStats";
// import CourseStudentsTable from "../../components/admin/courseDetails/CourseStudentsTable";

// import courseService from "../../services/admin/courseService";
// import courseRegistrationService from "../../services/admin/courseRegistrationService";
// import resultService from "../../services/admin/resultService";

// function CourseDetails() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [course, setCourse] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [results, setResults] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const [courseResponse, registrationsResponse, resultsResponse] =
//           await Promise.all([
//             courseService.getCourseById(id),

//             courseRegistrationService.getCourseRegistrations({
//               courseId: id,
//               limit: 100,
//             }),

//             resultService.getResults({
//               courseId: id,
//               limit: 100,
//             }),
//           ]);

//         setCourse(courseResponse);
//         setStudents(registrationsResponse.data || []);
//         setResults(resultsResponse.data || []);
//       } catch (error) {
//         console.error("Failed to fetch course details:", error);

//         setError(error.message || "Failed to load course details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchCourseDetails();
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="p-6 text-sm text-slate-500">
//         Loading course details...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="space-y-4">
//         <Button variant="secondary" onClick={() => navigate("/admin/courses")}>
//           <ArrowLeft size={18} />
//           Back to Courses
//         </Button>

//         <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="space-y-4">
//         <Button variant="secondary" onClick={() => navigate("/admin/courses")}>
//           <ArrowLeft size={18} />
//           Back to Courses
//         </Button>

//         <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">
//           Course not found.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <PageHeader
//         title="Course Details"
//         description="View course information, enrolled students and performance."
//       />

//       <div className="flex items-center justify-between">
//         <Button variant="secondary" onClick={() => navigate("/admin/courses")}>
//           <ArrowLeft size={18} />
//           Back to Courses
//         </Button>

//         <Button onClick={() => navigate(`/admin/courses/${course.id}/edit`)}>
//           Edit Course
//         </Button>
//       </div>

//       <CourseProfileCard course={course} />

//       <CourseQuickStats students={students} results={results} />

//       <div className="space-y-4">
//         <div>
//           <h3 className="text-lg font-semibold text-slate-900">
//             Enrolled Students
//           </h3>

//           <p className="text-sm text-slate-500">
//             Students currently registered for this course.
//           </p>
//         </div>

//         <CourseStudentsTable students={students} />
//       </div>
//     </div>
//   );
// }

// export default CourseDetails;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Button from "../../components/ui/Button";

import CourseProfileCard from "../../components/admin/courseDetails/CourseProfileCard";
import CourseQuickStats from "../../components/admin/courseDetails/CourseQuickStats";
import CourseStudentsTable from "../../components/admin/courseDetails/CourseStudentsTable";

import courseService from "../../services/admin/courseService";
import courseRegistrationService from "../../services/admin/courseRegistrationService";
import resultService from "../../services/admin/resultService";

function CourseDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const [courseResponse, registrationResponse, resultResponse] =
          await Promise.all([
            courseService.getCourseById(id),

            courseRegistrationService.getCourseRegistrations({
              courseId: id,
              status: "active",
              limit: 100,
            }),

            resultService.getResults({
              courseId: id,
              status: "active",
              limit: 100,
            }),
          ]);

        setCourse(courseResponse);
        setRegistrations(registrationResponse.data || []);
        setResults(resultResponse.data || []);
      } catch (error) {
        console.error("Failed to load course details:", error);

        setError(
          error?.message || "Unable to load course details. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-slate-100" />

        <div className="h-56 animate-pulse rounded-xl bg-slate-100" />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-xl bg-slate-100"
            />
          ))}
        </div>

        <div className="h-80 animate-pulse rounded-xl bg-slate-100" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="space-y-6">
        <Button variant="secondary" onClick={() => navigate("/admin/courses")}>
          <ArrowLeft size={18} />
          Back to Courses
        </Button>

        <div className="rounded-xl border border-red-100 bg-red-50 p-6">
          <h2 className="font-semibold text-red-800">Unable to load course</h2>

          <p className="mt-1 text-sm text-red-600">
            {error || "Course not found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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

      <CourseQuickStats students={registrations} results={results} />

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Enrolled Students
          </h3>

          <p className="text-sm text-slate-500">
            Students currently registered for this course.
          </p>
        </div>

        <CourseStudentsTable students={registrations} />
      </div>
    </div>
  );
}

export default CourseDetails;
