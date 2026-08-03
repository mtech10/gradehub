import { useState } from "react";

import CourseBasicInformation from "./CourseBasicInformation";
import CourseAcademicInformation from "./CourseAcademicInformation";
import CourseAssignment from "./CourseAssignment";
import CourseFormActions from "./CourseFormActions";

function CourseForm({ mode = "create", initialValues = {} }) {
  const [formData, setFormData] = useState({
    code: initialValues.code ?? "",
    title: initialValues.title ?? "",
    description: initialValues.description ?? "",

    department: initialValues.department ?? "",
    level: initialValues.level ?? "",
    semester: initialValues.semester ?? "",
    unit: initialValues.unit ?? "",

    lecturer: initialValues.lecturer ?? "",
    status: initialValues.status ?? "Active",
  });

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Backend integration comes later
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <CourseBasicInformation formData={formData} updateField={updateField} />

      <CourseAcademicInformation
        formData={formData}
        updateField={updateField}
      />

      <CourseAssignment formData={formData} updateField={updateField} />

      <CourseFormActions mode={mode} />
    </form>
  );
}

export default CourseForm;
