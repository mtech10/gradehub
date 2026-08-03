import UploadDetailsCard from "./UploadDetailsCard";
import UploadDropzone from "./UploadDropzone";
import UploadActions from "./UploadActions";

function UploadResultForm({ formData, updateField }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // Backend integration later
  };

  const initialFormData = {
    session: "",
    semester: "",
    department: "",
    course: "",
    level: "",
    uploadType: "new",
    file: null,
  };

  const handleReset = () => {
    Object.entries(initialFormData).forEach(([key, value]) => {
      updateField(key, value);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <UploadDetailsCard formData={formData} updateField={updateField} />
      <UploadDropzone formData={formData} updateField={updateField} />
      <UploadActions formData={formData} onReset={handleReset} />{" "}
    </form>
  );
}

export default UploadResultForm;
