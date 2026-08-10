import { useState } from "react";

import Card from "../../ui/Card";
import DepartmentInformation from "./DepartmentInformation";
import DepartmentHeadSelector from "./DepartmentHeadSelector";
import DepartmentActions from "./DepartmentActions";

function DepartmentForm({
  mode = "add",
  initialValues = {},
  onSubmit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    code: initialValues.code || "",
    facultyId: initialValues.facultyId || initialValues.faculty_id || "", // Adjusted for backend
    description: initialValues.description || "", // Added for backend
    office: initialValues.office || "",
    email: initialValues.email || "",
    phone: initialValues.phone || "",
    hod: initialValues.hod || "",
    status: initialValues.status || "Active",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      // Build the strict payload your Express controller requires
      const payload = {
        name: formData.name,
        code: formData.code,
        facultyId: formData.facultyId,
        hod: formData.hod,
        description: formData.description || formData.office, // Fallback if you want to repurpose 'office'
      };

      onSubmit(payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="p-8">
        <DepartmentInformation formData={formData} onChange={handleChange} />
      </Card>

      <Card className="p-8">
        <DepartmentHeadSelector formData={formData} onChange={handleChange} />
      </Card>

      {/* 2. Pass it down to the Actions component */}
      <DepartmentActions mode={mode} isSubmitting={isSubmitting} />
    </form>
  );
}

export default DepartmentForm;
