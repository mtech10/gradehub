import { useState } from "react";

import CourseBasicInformation from "./CourseBasicInformation";
import CourseAcademicInformation from "./CourseAcademicInformation";
import CourseAssignment from "./CourseAssignment";
import CourseFormActions from "./CourseFormActions";

import {
  DEPARTMENTS,
  LEVELS,
  SEMESTERS,
  COURSE_STATUS,
} from "../../../constants/options";

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
        departments={DEPARTMENTS}
        levels={LEVELS}
        semesters={SEMESTERS}
      />

      <CourseAssignment
        formData={formData}
        updateField={updateField}
        courseStatuses={COURSE_STATUS}
      />
      <CourseFormActions mode={mode} />
    </form>
  );
}

export default CourseForm;
