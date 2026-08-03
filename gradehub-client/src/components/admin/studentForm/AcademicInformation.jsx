import Input from "../../ui/Input";
import Select from "../../ui/Select";

import {
  DEPARTMENTS,
  LEVELS,
  PROGRAMMES,
  ADMISSION_YEARS,
  SESSIONS,
  STUDENT_STATUS,
} from "../../../constants/options";

function AcademicInformation({ formData, handleChange }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Academic Information
        </h2>

        <div className="mt-3 border-b border-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Select
          label="Department"
          required
          value={formData.department}
          onChange={(e) => handleChange("department", e.target.value)}
          options={DEPARTMENTS}
        />

        <Select
          label="Level"
          required
          value={formData.level}
          onChange={(e) => handleChange("level", e.target.value)}
          options={LEVELS}
        />

        <Select
          label="Programme"
          required
          value={formData.programme}
          onChange={(e) => handleChange("programme", e.target.value)}
          options={PROGRAMMES}
        />

        <Select
          label="Admission Year"
          required
          value={formData.admissionYear}
          onChange={(e) => handleChange("admissionYear", e.target.value)}
          options={ADMISSION_YEARS}
        />

        <Select
          label="Academic Session"
          required
          value={formData.session}
          onChange={(e) => handleChange("session", e.target.value)}
          options={SESSIONS}
        />

        <Select
          label="Student Status"
          required
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
          options={STUDENT_STATUS}
        />
      </div>
    </section>
  );
}

export default AcademicInformation;
