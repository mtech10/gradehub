import { useState } from "react";

import Card from "../../ui/Card";

import StudentPhotoUpload from "./StudentPhotoUpload";
import PersonalInformation from "./PersonalInformation";
import AcademicInformation from "./AcademicInformation";
import PortalAccess from "./PortalAccess";
import StudentFormActions from "./StudentFormActions";

function StudentForm() {
  const [formData, setFormData] = useState({
    matricNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    state: "",
    lga: "",

    department: "",
    level: "",
    programme: "",
    admissionYear: "",
    session: "",
    status: "",

    username: "",
    password: "",
    confirmPassword: "",
    portalStatus: "Active",
    recoveryEmail: "",
    recoveryPhone: "",

    photo: null,
  });

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
          />

          <AcademicInformation
            formData={formData}
            handleChange={handleChange}
          />

          <PortalAccess formData={formData} handleChange={handleChange} />

          <StudentFormActions formData={formData} />
        </div>
      </div>
    </Card>
  );
}

export default StudentForm;
