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
    <section className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
          Academic Information
        </h2>

        <div className="mt-2 sm:mt-3 border-b border-slate-200" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Select
          label="Department"
          required
          placeholder="Select department"
          value={formData.department}
          onChange={(e) => handleChange("department", e.target.value)}
          options={departments}
        />

        <Select
          label="Level"
          required
          placeholder="Select level"
          value={formData.level}
          onChange={(e) => handleChange("level", e.target.value)}
          options={levels}
        />

        <Select
          label="Programme"
          required
          placeholder="Select programme"
          value={formData.programme}
          onChange={(e) => handleChange("programme", e.target.value)}
          options={programmes}
        />

        <Select
          label="Admission Year"
          required
          placeholder="Select admission year"
          value={formData.admissionYear}
          onChange={(e) => handleChange("admissionYear", e.target.value)}
          options={admissionYears}
        />

        <Select
          label="Academic Session"
          required
          placeholder="Select session"
          value={formData.session}
          onChange={(e) => handleChange("session", e.target.value)}
          options={sessions}
        />

        <Select
          label="Student Status"
          required
          placeholder="Select status"
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
          options={studentStatuses}
        />
      </div>
    </section>
  );
}

export default AcademicInformation;
