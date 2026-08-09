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

  const [loadingOptions, setLoadingOptions] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAcademicData = async () => {
      try {
        setLoadingOptions(true);
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

          levelService.getLevels({
            page: 1,
            limit: 100,
            status: "active",
          }),

          sessionService.getSessions({
            page: 1,
            limit: 100,
            status: "active",
          }),

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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

      console.log("Course payload:", payload);

      const result =
        mode === "edit"
          ? await courseService.updateCourse(initialValues.id, payload)
          : await courseService.createCourse(payload);

      console.log("Course saved successfully:", result);

      navigate("/admin/courses");
    } catch (error) {
      console.error("Failed to save course:", error);

      setError(error?.message || "Failed to save course. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingOptions) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">
          Loading academic information...
        </p>
      </div>
    );
  }

  if (error && !submitting) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">{error}</p>
        </div>

        {/* Don't completely block the form if saving failed */}
      </div>
    );
  }

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
        semesters={semesters}
      />

      {/* <CourseAssignment formData={formData} updateField={updateField} /> */}

      <CourseFormActions mode={mode} loading={submitting} />
    </form>
  );
}

export default CourseForm;
