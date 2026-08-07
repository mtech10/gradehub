import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../ui/Card";
import StudentPhotoUpload from "./StudentPhotoUpload";
import PersonalInformation from "./PersonalInformation";
import AcademicInformation from "./AcademicInformation";
import PortalAccess from "./PortalAccess";
import StudentFormActions from "./StudentFormActions";
import { studentService } from "../../../services/admin/studentService";

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
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingOptions, setIsLoadingOptions] = useState(true);

  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);
  const [sessions, setSessions] = useState([]);

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

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [deptRes, levelRes, sessionRes] = await Promise.all([
          studentService.getDepartments(),
          studentService.getLevels(),
          studentService.getSessions(),
        ]);

        // Map the backend data into the { label, value } format your Select component expects
        setDepartments(
          deptRes.data.map((d) => ({ label: d.name, value: d.id })),
        );
        setLevels(levelRes.data.map((l) => ({ label: l.name, value: l.id })));
        setSessions(
          sessionRes.data.map((s) => ({ label: s.name, value: s.id })),
        );
      } catch (error) {
        console.error("Failed to load form options:", error);
      } finally {
        setIsLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const handleSave = async () => {
    setIsSubmitting(true);

    try {
      if (mode === "create") {
        const payload = {
          matricNumber: formData.matricNumber,
          firstName: formData.firstName,
          lastName: formData.lastName,

          // Only parse if it actually has a value, otherwise send empty string
          admissionYear: formData.admissionYear
            ? parseInt(formData.admissionYear, 10)
            : "",

          departmentId: formData.department,
          levelId: formData.level,
          sessionId: formData.session,
          gender: formData.gender,
          photo: "https://example.com/default-avatar.png",

          ...(formData.email && { email: formData.email }),
          ...(formData.phone && { phone: formData.phone }),
          ...(formData.dateOfBirth && { dateOfBirth: formData.dateOfBirth }),
          ...(formData.middleName && { middleName: formData.middleName }),
        };
        // Fire the API call
        console.log("React is sending this payload:", payload);
        await studentService.createStudent(payload);

        // Redirect to the students list upon success
        navigate("/admin/students");
      } else {
        console.log("Updating student...", formData);
      }
      // Inside StudentForm.jsx -> handleSave()
    } catch (error) {
      console.error("Failed to save student:", error);

      // ✅ ADD THIS: Extract the exact backend validation errors
      if (error.response && error.response.data) {
        console.error("Backend Validation Details:", error.response.data);

        // Show a more descriptive alert
        const errorDetails =
          error.response.data.message || error.response.data.errors;
        alert(`Validation Error: ${JSON.stringify(errorDetails)}`);
      } else {
        alert("Failed to save student. Check console for details.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoadingOptions) {
    return (
      <div className="p-8 text-center text-slate-500">Loading form data...</div>
    );
  }

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
            departments={departments}
            levels={levels}
            sessions={sessions}
            programmes={PROGRAMMES}
            admissionYears={ADMISSION_YEARS}
            studentStatuses={STUDENT_STATUS}
          />

          <PortalAccess formData={formData} handleChange={handleChange} />

          {/* ✅ Pass down the handler and loading state */}
          <StudentFormActions
            mode={mode}
            onSave={handleSave}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </Card>
  );
}

export default StudentForm;
