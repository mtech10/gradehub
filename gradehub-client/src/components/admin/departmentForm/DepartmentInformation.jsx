import { useState, useEffect } from "react";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import facultyService from "../../../services/admin/facultyService";

function DepartmentInformation({ formData, onChange }) {
  const [faculties, setFaculties] = useState([
    { value: "", label: "Loading faculties..." },
  ]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await facultyService.getFaculties();

        // Extract the array safely, accommodating different possible backend structures
        const data = response.data || response.faculties || response;

        if (Array.isArray(data)) {
          const options = data.map((f) => ({ value: f.id, label: f.name }));
          setFaculties([{ value: "", label: "Select Faculty" }, ...options]);
        }
      } catch (error) {
        console.error("Failed to load faculties:", error);
        setFaculties([{ value: "", label: "Failed to load faculties" }]);
      }
    };

    fetchFaculties();
  }, []);

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

        {/* Dynamic Faculty Dropdown */}
        <Select
          label="Faculty"
          value={formData.facultyId || formData.faculty || ""}
          options={faculties}
          onChange={(e) => onChange("facultyId", e.target.value)}
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
