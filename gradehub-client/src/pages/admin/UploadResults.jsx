import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import UploadResultForm from "../../components/admin/uploadResults/UploadResultForm";
import UploadPreviewCard from "../../components/admin/uploadResults/UploadPreviewCard";
import UploadSummaryCard from "../../components/admin/uploadResults/UploadSummaryCard";
import UploadNotesCard from "../../components/admin/uploadResults/UploadNotesCard";

import { getSessions } from "../../services/admin/sessionService";
import { getSemesters } from "../../services/admin/semesterService";
import { getDepartments } from "../../services/admin/departmentService";
import { getLevels } from "../../services/admin/levelService";
import { getCourses } from "../../services/admin/courseService";

function UploadResults() {
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
          sessionsResponse,
          semestersResponse,
          departmentsResponse,
          levelsResponse,
          coursesResponse,
        ] = await Promise.all([
          getSessions({ limit: 100 }),
          getSemesters({ limit: 100 }),
          getDepartments({ limit: 100 }),
          getLevels({ limit: 100 }),
          getCourses({ limit: 100 }),
        ]);

        setOptions({
          sessions: sessionsResponse.data || [],
          semesters: semestersResponse.data || [],
          departments: departmentsResponse.data || [],
          levels: levelsResponse.data || [],
          courses: coursesResponse.courses || [],
        });
      } catch (error) {
        console.error("Failed to load upload options:", error);
        setOptionsError(
          error.message || "Failed to load academic information.",
        );
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const sessionOptions = options.sessions.map((session) => ({
    value: session.id,
    label: session.name,
  }));

  const filteredSemesters = options.semesters.filter((sem) => {
    if (!formData.sessionId) return false;
    // Safely check against standard formats your backend might return
    const semSessionId = sem.sessionId || sem.session_id || sem.session?.id;
    return semSessionId === formData.sessionId;
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
    const matchesDepartment =
      !formData.departmentId || course.department?.id === formData.departmentId;

    const matchesLevel =
      !formData.levelId || course.level?.id === formData.levelId;

    const matchesSemester =
      !formData.semesterId || course.semester?.id === formData.semesterId;

    return matchesDepartment && matchesLevel && matchesSemester;
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
    <div>
      <PageHeader
        title="Upload Results"
        description="Upload and validate student results."
      />

      {optionsError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {optionsError}
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
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

        <div className="space-y-6">
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
        </div>
      </div>
    </div>
  );
}

export default UploadResults;
