import { useState } from "react";

import Card from "../../ui/Card";

import DepartmentInformation from "./DepartmentInformation";
import DepartmentHeadSelector from "./DepartmentHeadSelector";
import DepartmentActions from "./DepartmentActions";

function DepartmentForm({ mode = "add", initialValues = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    code: initialValues.code || "",
    faculty: initialValues.faculty || "",
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
      onSubmit(formData);
      return;
    }

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="p-8">
        <DepartmentInformation formData={formData} onChange={handleChange} />
      </Card>

      <Card className="p-8">
        <DepartmentHeadSelector formData={formData} onChange={handleChange} />
      </Card>

      <DepartmentActions mode={mode} />
    </form>
  );
}

export default DepartmentForm;
