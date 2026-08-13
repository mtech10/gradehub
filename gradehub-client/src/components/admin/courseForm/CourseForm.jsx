import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CourseBasicInformation from "./CourseBasicInformation";
import CourseAcademicInformation from "./CourseAcademicInformation";
import CourseFormActions from "./CourseFormActions";

import departmentService from "../../../services/admin/departmentService";
import levelService from "../../../services/admin/levelService";
import sessionService from "../../../services/admin/sessionService";
import semesterService from "../../../services/admin/semesterService";
import courseService from "../../../services/admin/courseService";

function CourseForm({ mode = "create", initialValues = {} }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    code: initialValues.code ?? "",
    title: initialValues.title ?? "",
    description: initialValues.description ?? "",
    departmentId: initialValues.departmentId ?? "",
    levelId: initialValues.levelId ?? "",
    sessionId: initialValues.sessionId ?? "",
    semesterId: initialValues.semesterId ?? "",
    creditUnit: initialValues.creditUnit ?? "",
  });

  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAcademicData = async () => {
      try {
        setError("");

        const [
          departmentsResponse,
          levelsResponse,
          sessionsResponse,
          semestersResponse,
        ] = await Promise.all([
          departmentService.getDepartments({
            page: 1,
            limit: 100,
            status: "active",
          }),
          levelService.getLevels({ page: 1, limit: 100, status: "active" }),
          sessionService.getSessions({ page: 1, limit: 100, status: "active" }),
          semesterService.getSemesters({
            page: 1,
            limit: 100,
            status: "active",
          }),
        ]);

        setDepartments(
          departmentsResponse.departments ?? departmentsResponse.data ?? [],
        );
        setLevels(levelsResponse.levels ?? levelsResponse.data ?? []);
        setSessions(sessionsResponse.sessions ?? sessionsResponse.data ?? []);
        setSemesters(
          semestersResponse.semesters ?? semestersResponse.data ?? [],
        );
      } catch (error) {
        console.error("Failed to load course form data:", error);
        setError(error?.message || "Failed to load academic information.");
      } finally {
        setLoadingOptions(false);
      }
    };

    loadAcademicData();
  }, []);

  const updateField = (field, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [field]: value };

      // If the session changes, automatically clear the selected semester
      if (field === "sessionId") {
        updatedData.semesterId = "";
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    try {
      setSubmitting(true);
      setError("");

      const payload = {
        code: formData.code.trim(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        departmentId: formData.departmentId,
        levelId: formData.levelId,
        sessionId: formData.sessionId,
        semesterId: formData.semesterId,
        creditUnit: Number(formData.creditUnit),
      };

      if (mode === "edit") {
        await courseService.updateCourse(initialValues.id, payload);
      } else {
        await courseService.createCourse(payload);
      }

      navigate("/admin/courses");
    } catch (error) {
      console.error("Failed to save course:", error);
      setError(error?.message || "Failed to save course. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Dynamically filter semesters based on the currently selected Session ID
  const filteredSemesters = semesters.filter((sem) => {
    if (!formData.sessionId) return false;

    // Safely check against standard formats your backend might return
    const semSessionId = sem.sessionId || sem.session_id || sem.session?.id;
    return semSessionId === formData.sessionId;
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <CourseBasicInformation formData={formData} updateField={updateField} />

      <CourseAcademicInformation
        formData={formData}
        updateField={updateField}
        departments={departments}
        levels={levels}
        sessions={sessions}
        semesters={filteredSemesters} // ONLY pass the filtered semesters here
      />

      <CourseFormActions mode={mode} loading={submitting} />
    </form>
  );
}

export default CourseForm;
