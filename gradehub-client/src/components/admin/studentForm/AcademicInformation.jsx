import Input from "../../ui/Input";
import Select from "../../ui/Select";

function AcademicInformation({
  formData,
  handleChange,
  departments,
  levels,
  programmes,
  admissionYears,
  sessions,
  studentStatuses,
}) {
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
          options={departments}
        />

        <Select
          label="Level"
          required
          value={formData.level}
          onChange={(e) => handleChange("level", e.target.value)}
          options={levels}
        />

        <Select
          label="Programme"
          required
          value={formData.programme}
          onChange={(e) => handleChange("programme", e.target.value)}
          options={programmes}
        />

        <Select
          label="Admission Year"
          required
          value={formData.admissionYear}
          onChange={(e) => handleChange("admissionYear", e.target.value)}
          options={admissionYears}
        />

        <Select
          label="Academic Session"
          required
          value={formData.session}
          onChange={(e) => handleChange("session", e.target.value)}
          options={sessions}
        />

        <Select
          label="Student Status"
          required
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
          options={studentStatuses}
        />
      </div>
    </section>
  );
}

export default AcademicInformation;
