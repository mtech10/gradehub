import Card from "../../ui/Card";
import Select from "../../ui/Select";

function UploadDetailsCard({
  formData,
  updateField,
  sessions,
  semesters,
  departments,
  levels,
  courseOptions,
}) {
  return (
    <Card>
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-900">
          1. Select Details
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Select the academic information before uploading results.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Select
          label="Academic Session"
          required
          placeholder="Select Session"
          options={sessions}
          value={formData.sessionId}
          onChange={(e) => updateField("sessionId", e.target.value)}
        />

        <Select
          label="Semester"
          required
          placeholder="Select Semester"
          options={semesters}
          value={formData.semesterId}
          onChange={(e) => updateField("semesterId", e.target.value)}
        />

        <Select
          label="Department"
          required
          placeholder="Select Department"
          options={departments}
          value={formData.departmentId}
          onChange={(e) => updateField("departmentId", e.target.value)}
        />

        <Select
          label="Course"
          required
          placeholder="Select Course"
          options={courseOptions}
          value={formData.courseId}
          onChange={(e) => updateField("courseId", e.target.value)}
          disabled={
            !formData.departmentId || !formData.levelId || !formData.semesterId
          }
        />

        <Select
          label="Level"
          required
          placeholder="Select Level"
          options={levels}
          value={formData.levelId}
          onChange={(e) => updateField("levelId", e.target.value)}
        />

        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-700">
            Upload Type
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="uploadType"
                value="new"
                checked={formData.uploadType === "new"}
                onChange={(e) => updateField("uploadType", e.target.value)}
              />

              <span>New Results</span>
            </label>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="uploadType"
                value="supplementary"
                checked={formData.uploadType === "supplementary"}
                onChange={(e) => updateField("uploadType", e.target.value)}
              />

              <span>Supplementary Results</span>
            </label>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default UploadDetailsCard;
