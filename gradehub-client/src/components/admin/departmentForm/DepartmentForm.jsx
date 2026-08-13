import { useState, useEffect } from "react";

import Card from "../../ui/Card";
import DepartmentInformation from "./DepartmentInformation";
import DepartmentHeadSelector from "./DepartmentHeadSelector";
import DepartmentActions from "./DepartmentActions";
import FormSkeleton from "../../ui/skeletons/FormSkeleton";

// Assuming you have a facultyService to fetch the faculties dropdown options
import facultyService from "../../../services/admin/facultyService";

function DepartmentForm({
  mode = "add",
  initialValues = {},
  onSubmit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    code: initialValues.code || "",
    facultyId: initialValues.facultyId || initialValues.faculty_id || "",
    description: initialValues.description || "",
    office: initialValues.office || "",
    email: initialValues.email || "",
    phone: initialValues.phone || "",
    hod: initialValues.hod || "",
    status: initialValues.status || "Active",
  });

  const [isLoadingOptions, setIsLoadingOptions] = useState(true);
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const facultyRes = await facultyService.getFaculties();
        const data = facultyRes.data || facultyRes;

        // Map the backend data into { label, value } for your select dropdown
        if (Array.isArray(data)) {
          setFaculties(data.map((f) => ({ label: f.name, value: f.id })));
        }
      } catch (error) {
        console.error("Failed to load faculties:", error);
      } finally {
        setIsLoadingOptions(false); // ✅ Turns off the skeleton!
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      const payload = {
        name: formData.name,
        code: formData.code,
        facultyId: formData.facultyId,
        hod: formData.hod,
        description: formData.description || formData.office,
      };

      onSubmit(payload);
    }
  };

  if (isLoadingOptions) {
    return <FormSkeleton />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card className="p-8">
        <DepartmentInformation
          formData={formData}
          onChange={handleChange}
          faculties={faculties} // ✅ Pass the fetched faculties down to the child
        />
      </Card>

      <Card className="p-8">
        <DepartmentHeadSelector formData={formData} onChange={handleChange} />
      </Card>

      <DepartmentActions mode={mode} isSubmitting={isSubmitting} />
    </form>
  );
}

export default DepartmentForm;
