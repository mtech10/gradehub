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
  const [isValidated, setIsValidated] = useState(false);

  // Use this for your inputs in UploadDetailsCard/Dropzone to auto-reset validation
  const handleFieldChange = (field, value) => {
    setIsValidated(false);
    updateField(field, value);
  };

  const handleReset = () => {
    setIsValidated(false);
    updateField("sessionId", "");
    updateField("semesterId", "");
    updateField("departmentId", "");
    updateField("courseId", "");
    updateField("levelId", "");
    updateField("uploadType", "new");
    updateField("file", null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isValidated) {
      try {
        setLoading(true);
        await resultUploadService.uploadValidatedResults(formData);
        alert("Results uploaded successfully!");
        handleReset();
      } catch (err) {
        setError(err.message || "Upload failed.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Validation Flow
    if (
      !formData.file ||
      !formData.sessionId ||
      !formData.semesterId ||
      !formData.departmentId ||
      !formData.courseId ||
      !formData.levelId
    ) {
      setError("Please fill all required fields and select a file.");
      return;
    }

    try {
      setLoading(true);
      const result = await resultUploadService.validateUpload(formData);

      onValidationComplete(result.data);
      setIsValidated(true); // <--- Crucial step
    } catch (err) {
      setError(err.message || "Failed to validate result file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <UploadDetailsCard
        formData={formData}
        updateField={handleFieldChange} // Pass the reset-aware handler
        sessions={sessions}
        semesters={semesters}
        departments={departments}
        levels={levels}
        courseOptions={courseOptions}
        loading={loadingOptions}
      />

      <UploadDropzone formData={formData} updateField={handleFieldChange} />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <UploadActions
        onReset={handleReset}
        loading={loading}
        loadingOptions={loadingOptions}
        isValidated={isValidated}
      />
    </form>
  );
}

export default UploadResultForm;
