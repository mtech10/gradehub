import { useState } from "react";

import UploadDetailsCard from "./UploadDetailsCard";
import UploadDropzone from "./UploadDropzone";
import UploadActions from "./UploadActions";
import resultUploadService from "../../../services/admin/resultUploadService";

function UploadResultForm({
  formData,
  updateField,
  sessions,
  semesters,
  departments,
  levels,
  courseOptions,
  loadingOptions,
  onValidationComplete,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initialFormData = {
    sessionId: "",
    semesterId: "",
    departmentId: "",
    courseId: "",
    levelId: "",
    uploadType: "new",
    file: null,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.file) {
      setError("Please select an Excel file.");
      return;
    }

    if (!formData.sessionId) {
      setError("Please select an academic session.");
      return;
    }

    if (!formData.semesterId) {
      setError("Please select a semester.");
      return;
    }

    if (!formData.departmentId) {
      setError("Please select a department.");
      return;
    }

    if (!formData.courseId) {
      setError("Please select a course.");
      return;
    }

    if (!formData.levelId) {
      setError("Please select a level.");
      return;
    }

    if (!formData.uploadType) {
      setError("Please select an upload type.");
      return;
    }

    try {
      setLoading(true);

      const result = await resultUploadService.validateUpload({
        file: formData.file,
        sessionId: formData.sessionId,
        semesterId: formData.semesterId,
        departmentId: formData.departmentId,
        courseId: formData.courseId,
        levelId: formData.levelId,
        uploadType: formData.uploadType,
      });

      onValidationComplete(result.data);
    } catch (error) {
      setError(error.message || "Failed to validate result file.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    Object.entries(initialFormData).forEach(([key, value]) => {
      updateField(key, value);
    });

    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <UploadDetailsCard
        formData={formData}
        updateField={updateField}
        sessions={sessions}
        semesters={semesters}
        departments={departments}
        levels={levels}
        courseOptions={courseOptions}
        loading={loadingOptions}
      />

      <UploadDropzone formData={formData} updateField={updateField} />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <UploadActions
        formData={formData}
        onReset={handleReset}
        loading={loading}
        loadingOptions={loadingOptions}
      />
    </form>
  );
}

export default UploadResultForm;
