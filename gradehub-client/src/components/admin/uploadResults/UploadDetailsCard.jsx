import Card from "../../ui/Card";
import Select from "../../ui/Select";

import {
  SESSIONS,
  SEMESTERS,
  DEPARTMENTS,
  LEVELS,
} from "../../../constants/options";

import { courses } from "../../../constants/admin/courses";
import { getCourseOptions } from "../../../utils/courseOptions";

function UploadDetailsCard({ formData, updateField }) {
  const courseOptions = getCourseOptions(courses);
  return (
    <Card className="p-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-slate-900">
          1. Select Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select the academic information before uploading results.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Select
          label="Academic Session"
          required
          options={SESSIONS}
          value={formData.session}
          onChange={(e) => updateField("session", e.target.value)}
        />

        <Select
          label="Semester"
          required
          options={SEMESTERS}
          value={formData.semester}
          onChange={(e) => updateField("semester", e.target.value)}
        />

        <Select
          label="Department"
          required
          options={DEPARTMENTS}
          value={formData.department}
          onChange={(e) => updateField("department", e.target.value)}
        />

        <Select
          label="Course"
          required
          options={courseOptions}
          value={formData.course}
          onChange={(e) => updateField("course", e.target.value)}
        />

        <Select
          label="Level"
          required
          options={LEVELS}
          value={formData.level}
          onChange={(e) => updateField("level", e.target.value)}
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
