// import { useEffect, useState } from "react";

// import PageHeader from "../../components/common/PageHeader";

// import UploadResultForm from "../../components/admin/uploadResults/UploadResultForm";
// import UploadPreviewCard from "../../components/admin/uploadResults/UploadPreviewCard";
// import UploadSummaryCard from "../../components/admin/uploadResults/UploadSummaryCard";
// import UploadNotesCard from "../../components/admin/uploadResults/UploadNotesCard";
// import FormSkeleton from "../../components/ui/skeletons/FormSkeleton";

// import { getSessions } from "../../services/admin/sessionService";
// import { getSemesters } from "../../services/admin/semesterService";
// import { getDepartments } from "../../services/admin/departmentService";
// import { getLevels } from "../../services/admin/levelService";
// import { getCourses } from "../../services/admin/courseService";
// import { useToast } from "../../context/ToastContext";

// function UploadResults() {
//   const { addToast } = useToast();

//   const [formData, setFormData] = useState({
//     sessionId: "",
//     semesterId: "",
//     departmentId: "",
//     courseId: "",
//     levelId: "",
//     uploadType: "new",
//     file: null,
//   });

//   const [validation, setValidation] = useState(null);

//   const [options, setOptions] = useState({
//     sessions: [],
//     semesters: [],
//     departments: [],
//     levels: [],
//     courses: [],
//   });

//   const [loadingOptions, setLoadingOptions] = useState(true);
//   const [optionsError, setOptionsError] = useState("");

//   const updateField = (field, value) => {
//     setFormData((prev) => {
//       const updated = { ...prev, [field]: value };

//       if (field === "sessionId") {
//         updated.semesterId = "";
//         updated.courseId = "";
//       }
//       if (field === "semesterId") {
//         updated.courseId = "";
//       }

//       return updated;
//     });

//     setValidation(null);
//   };

//   useEffect(() => {
//     const fetchOptions = async () => {
//       try {
//         setLoadingOptions(true);
//         setOptionsError("");

//         const [
//           sessionsResponse,
//           semestersResponse,
//           departmentsResponse,
//           levelsResponse,
//           coursesResponse,
//         ] = await Promise.all([
//           getSessions({ limit: 100 }),
//           getSemesters({ limit: 100 }),
//           getDepartments({ limit: 100 }),
//           getLevels({ limit: 100 }),
//           getCourses({ limit: 100 }),
//         ]);

//         setOptions({
//           sessions: sessionsResponse.data || [],
//           semesters: semestersResponse.data || [],
//           departments: departmentsResponse.data || [],
//           levels: levelsResponse.data || [],
//           courses: coursesResponse.courses || [],
//         });
//       } catch (error) {
//         const errorMsg =
//           error.message || "Failed to load academic information.";
//         console.error("Failed to load upload options:", error);
//         setOptionsError(errorMsg);

//         addToast({
//           title: "Network Error",
//           message: "Failed to load academic options for the upload form.",
//           type: "error",
//         });
//       } finally {
//         setLoadingOptions(false);
//       }
//     };

//     fetchOptions();
//   }, [addToast]);

//   const sessionOptions = options.sessions.map((session) => ({
//     value: session.id,
//     label: session.name,
//   }));

//   const filteredSemesters = options.semesters.filter((sem) => {
//     if (!formData.sessionId) return false;
//     const semSessionId = sem.sessionId || sem.session_id || sem.session?.id;
//     return semSessionId === formData.sessionId;
//   });

//   const semesterOptions = filteredSemesters.map((semester) => ({
//     value: semester.id,
//     label: semester.name,
//   }));

//   const departmentOptions = options.departments.map((department) => ({
//     value: department.id,
//     label: department.name,
//   }));

//   const levelOptions = options.levels.map((level) => ({
//     value: level.id,
//     label: level.name,
//   }));

//   const filteredCourses = options.courses.filter((course) => {
//     const matchesDepartment =
//       !formData.departmentId || course.department?.id === formData.departmentId;

//     const matchesLevel =
//       !formData.levelId || course.level?.id === formData.levelId;

//     const matchesSemester =
//       !formData.semesterId || course.semester?.id === formData.semesterId;

//     return matchesDepartment && matchesLevel && matchesSemester;
//   });

//   const courseOptions = filteredCourses.map((course) => ({
//     value: course.id,
//     label: `${course.code} — ${course.title}`,
//   }));

//   useEffect(() => {
//     if (!formData.courseId) return;

//     const courseStillValid = filteredCourses.some(
//       (course) => course.id === formData.courseId,
//     );

//     if (!courseStillValid) {
//       updateField("courseId", "");
//     }
//   }, [formData.departmentId, formData.levelId, formData.semesterId]);

//   return (
//     <div className="space-y-6 sm:space-y-8">
//       <PageHeader
//         title="Upload Results"
//         description="Upload and validate student results."
//       />

//       {optionsError && (
//         <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
//           {optionsError}
//         </div>
//       )}

//       <div className="grid gap-6 grid-cols-1 xl:grid-cols-[1fr_380px]">
//         {/* Left Column: Form */}
//         <div>
//           {loadingOptions ? (
//             <FormSkeleton />
//           ) : (
//             <UploadResultForm
//               formData={formData}
//               updateField={updateField}
//               sessions={sessionOptions}
//               semesters={semesterOptions}
//               departments={departmentOptions}
//               levels={levelOptions}
//               courseOptions={courseOptions}
//               loadingOptions={loadingOptions}
//               onValidationComplete={setValidation}
//             />
//           )}
//         </div>

//         {/* Right Column: Skeletons or Cards */}
//         <div className="space-y-6">
//           {loadingOptions ? (
//             <>
//               <div className="h-[400px] w-full animate-pulse rounded-2xl bg-slate-200"></div>
//               <div className="h-48 w-full animate-pulse rounded-2xl bg-slate-200"></div>
//             </>
//           ) : (
//             <>
//               <UploadPreviewCard
//                 formData={formData}
//                 validation={validation}
//                 sessions={sessionOptions}
//                 semesters={semesterOptions}
//                 departments={departmentOptions}
//                 levels={levelOptions}
//                 courseOptions={courseOptions}
//               />

//               <UploadSummaryCard validation={validation} />

//               <UploadNotesCard />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UploadResults;
import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import UploadResultForm from "../../components/admin/uploadResults/UploadResultForm";
import UploadPreviewCard from "../../components/admin/uploadResults/UploadPreviewCard";
import UploadSummaryCard from "../../components/admin/uploadResults/UploadSummaryCard";
import UploadNotesCard from "../../components/admin/uploadResults/UploadNotesCard";
import FormSkeleton from "../../components/ui/skeletons/FormSkeleton";

import { getSessions } from "../../services/admin/sessionService";
import { getSemesters } from "../../services/admin/semesterService";
import { getDepartments } from "../../services/admin/departmentService";
import { getLevels } from "../../services/admin/levelService";
import { getCourses } from "../../services/admin/courseService";
import { useToast } from "../../context/ToastContext";

function UploadResults() {
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    sessionId: "",
    semesterId: "",
    departmentId: "",
    courseId: "",
    levelId: "",
    uploadType: "new",
    file: null,
  });

  const [validation, setValidation] = useState(null);

  const [options, setOptions] = useState({
    sessions: [],
    semesters: [],
    departments: [],
    levels: [],
    courses: [],
  });

  const [loadingOptions, setLoadingOptions] = useState(true);
  const [optionsError, setOptionsError] = useState("");

  const updateField = (field, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === "sessionId") {
        updated.semesterId = "";
        updated.courseId = "";
      }
      if (field === "semesterId") {
        updated.courseId = "";
      }

      return updated;
    });

    setValidation(null);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoadingOptions(true);
        setOptionsError("");

        const [
          sessionsRes,
          semestersRes,
          departmentsRes,
          levelsRes,
          coursesRes,
        ] = await Promise.all([
          getSessions({ limit: 1000 }),
          getSemesters({ limit: 1000 }),
          getDepartments({ limit: 1000 }),
          getLevels({ limit: 1000 }),
          getCourses({ limit: 1000 }),
        ]);

        const extractArray = (res, key) => {
          if (!res) return [];
          if (Array.isArray(res)) return res;
          if (Array.isArray(res.data)) return res.data;
          if (res.data && Array.isArray(res.data[key])) return res.data[key];
          if (res.data?.data && Array.isArray(res.data.data))
            return res.data.data;
          if (Array.isArray(res[key])) return res[key];
          return [];
        };

        const extractedSessions = extractArray(sessionsRes, "sessions");
        const extractedCourses = extractArray(coursesRes, "courses");

        setOptions({
          sessions: extractedSessions,
          semesters: extractArray(semestersRes, "semesters"),
          departments: extractArray(departmentsRes, "departments"),
          levels: extractArray(levelsRes, "levels"),
          courses: extractedCourses,
        });
      } catch (error) {
        const errorMsg =
          error.message || "Failed to load academic information.";
        console.error("Failed to load upload options:", error);
        setOptionsError(errorMsg);

        addToast({
          title: "Network Error",
          message: "Failed to load academic options for the upload form.",
          type: "error",
        });
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, [addToast]);

  const sessionOptions = options.sessions.map((session) => ({
    value: session.id,
    label: session.name,
  }));

  const filteredSemesters = options.semesters.filter((sem) => {
    if (!formData.sessionId) return false;
    const semSessionId = String(
      sem.sessionId || sem.session_id || sem.sessionid || sem.session?.id || "",
    );
    return semSessionId === String(formData.sessionId);
  });

  const semesterOptions = filteredSemesters.map((semester) => ({
    value: semester.id,
    label: semester.name,
  }));

  const departmentOptions = options.departments.map((department) => ({
    value: department.id,
    label: department.name,
  }));

  const levelOptions = options.levels.map((level) => ({
    value: level.id,
    label: level.name,
  }));

  const filteredCourses = options.courses.filter((course) => {
    const courseDeptId = String(
      course.departmentId ||
        course.department_id ||
        course.departmentid ||
        course.department?.id ||
        "",
    );
    const courseLevelId = String(
      course.levelId ||
        course.level_id ||
        course.levelid ||
        course.level?.id ||
        "",
    );

    const matchesDepartment =
      !formData.departmentId || courseDeptId === String(formData.departmentId);

    const matchesLevel =
      !formData.levelId || courseLevelId === String(formData.levelId);

    // FIX: We no longer filter courses by semester, since courses are semester-independent!
    return matchesDepartment && matchesLevel;
  });

  const courseOptions = filteredCourses.map((course) => ({
    value: course.id,
    label: `${course.code} — ${course.title}`,
  }));

  useEffect(() => {
    if (!formData.courseId) return;

    const courseStillValid = filteredCourses.some(
      (course) => course.id === formData.courseId,
    );

    if (!courseStillValid) {
      updateField("courseId", "");
    }
  }, [formData.departmentId, formData.levelId, formData.semesterId]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Upload Results"
        description="Upload and validate student results."
      />

      {optionsError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {optionsError}
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-[1fr_380px]">
        {/* Left Column: Form */}
        <div>
          {loadingOptions ? (
            <FormSkeleton />
          ) : (
            <UploadResultForm
              formData={formData}
              updateField={updateField}
              sessions={sessionOptions}
              semesters={semesterOptions}
              departments={departmentOptions}
              levels={levelOptions}
              courseOptions={courseOptions}
              loadingOptions={loadingOptions}
              onValidationComplete={setValidation}
            />
          )}
        </div>

        {/* Right Column: Skeletons or Cards */}
        <div className="space-y-6">
          {loadingOptions ? (
            <>
              <div className="h-[400px] w-full animate-pulse rounded-2xl bg-slate-200"></div>
              <div className="h-48 w-full animate-pulse rounded-2xl bg-slate-200"></div>
            </>
          ) : (
            <>
              <UploadPreviewCard
                formData={formData}
                validation={validation}
                sessions={sessionOptions}
                semesters={semesterOptions}
                departments={departmentOptions}
                levels={levelOptions}
                courseOptions={courseOptions}
              />

              <UploadSummaryCard validation={validation} />

              <UploadNotesCard />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadResults;
