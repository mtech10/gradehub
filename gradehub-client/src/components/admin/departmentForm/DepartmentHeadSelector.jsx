import Select from "../../ui/Select";

function DepartmentHeadSelector({ formData, onChange }) {
  // Replace these with actual lecturers from your lecturers constants later.
  const hodOptions = [
    { value: "", label: "Select Head of Department" },
    { value: "Prof. A. Adeyemi", label: "Prof. A. Adeyemi" },
    { value: "Prof. J. Bello", label: "Prof. J. Bello" },
    { value: "Prof. Musa Ibrahim", label: "Prof. Musa Ibrahim" },
    { value: "Prof. Okafor", label: "Prof. Okafor" },
    { value: "Prof. Olatunji", label: "Prof. Olatunji" },
  ];

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Department Administration
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Assign the Head of Department and set the department status.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Select
          label="Head of Department"
          value={formData.hod}
          options={hodOptions}
          onChange={(e) => onChange("hod", e.target.value)}
          required
        />

        <Select
          label="Department Status"
          value={formData.status}
          options={statusOptions}
          onChange={(e) => onChange("status", e.target.value)}
        />
      </div>
    </div>
  );
}

export default DepartmentHeadSelector;
