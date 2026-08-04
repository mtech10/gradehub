import { useState } from "react";

import Card from "../../ui/Card";

import StudentPhotoUpload from "./StudentPhotoUpload";
import PersonalInformation from "./PersonalInformation";
import AcademicInformation from "./AcademicInformation";
import PortalAccess from "./PortalAccess";
import StudentFormActions from "./StudentFormActions";
import {
  GENDERS,
  STATES,
  DEPARTMENTS,
  LEVELS,
  PROGRAMMES,
  ADMISSION_YEARS,
  SESSIONS,
  STUDENT_STATUS,
} from "../../../constants/options";

function StudentForm({ mode = "create", initialValues = {} }) {
  const [formData, setFormData] = useState({
    matricNumber: initialValues.matricNumber ?? "",
    firstName: initialValues.firstName ?? "",
    lastName: initialValues.lastName ?? "",
    email: initialValues.email ?? "",
    phone: initialValues.phone ?? "",
    dateOfBirth: initialValues.dateOfBirth ?? "",
    gender: initialValues.gender ?? "",
    state: initialValues.state ?? "",
    lga: initialValues.lga ?? "",

    department: initialValues.department ?? "",
    level: initialValues.level ?? "",
    programme: initialValues.programme ?? "",
    admissionYear: initialValues.admissionYear ?? "",
    session: initialValues.session ?? "",
    status: initialValues.status ?? "",

    username: initialValues.username ?? "",
    password: "",
    confirmPassword: "",
    portalStatus: initialValues.portalStatus ?? "Active",
    recoveryEmail: initialValues.recoveryEmail ?? "",
    recoveryPhone: initialValues.recoveryPhone ?? "",

    photo: initialValues.photo ?? null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "create") {
      console.log("Creating student...", formData);
    } else {
      console.log("Updating student...", formData);
    }

    // API integration comes later
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Card className="p-8">
      <div className="grid gap-10 xl:grid-cols-[280px_1fr]">
        <StudentPhotoUpload formData={formData} handleChange={handleChange} />

        <div className="space-y-10">
          <PersonalInformation
            formData={formData}
            handleChange={handleChange}
            genders={GENDERS}
            states={STATES}
          />

          <AcademicInformation
            formData={formData}
            handleChange={handleChange}
            departments={DEPARTMENTS}
            levels={LEVELS}
            programmes={PROGRAMMES}
            admissionYears={ADMISSION_YEARS}
            sessions={SESSIONS}
            studentStatuses={STUDENT_STATUS}
          />

          <PortalAccess formData={formData} handleChange={handleChange} />

          <StudentFormActions formData={formData} mode={mode} />
        </div>
      </div>
    </Card>
  );
}

export default StudentForm;
