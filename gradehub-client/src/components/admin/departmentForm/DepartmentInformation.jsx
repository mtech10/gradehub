import Input from "../../ui/Input";
import Select from "../../ui/Select";

function DepartmentInformation({ formData, onChange }) {
  const facultyOptions = [
    { value: "", label: "Select Faculty" },
    { value: "Engineering", label: "Engineering" },
    { value: "Science", label: "Science" },
    { value: "Agriculture", label: "Agriculture" },
    { value: "Arts", label: "Arts" },
    { value: "Education", label: "Education" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Department Information
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Enter the department's basic information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Department Name"
          placeholder="Agricultural Engineering"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
        />

        <Input
          label="Department Code"
          placeholder="AGE"
          value={formData.code}
          onChange={(e) => onChange("code", e.target.value)}
          required
        />

        <Select
          label="Faculty"
          value={formData.faculty}
          options={facultyOptions}
          onChange={(e) => onChange("faculty", e.target.value)}
          required
        />

        <Input
          label="Office Location"
          placeholder="Engineering Block A"
          value={formData.office}
          onChange={(e) => onChange("office", e.target.value)}
        />

        <Input
          label="Department Email"
          type="email"
          placeholder="age@gradehub.edu.ng"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
        />

        <Input
          label="Phone Number"
          placeholder="+2348012345678"
          value={formData.phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </div>
    </div>
  );
}

export default DepartmentInformation;
