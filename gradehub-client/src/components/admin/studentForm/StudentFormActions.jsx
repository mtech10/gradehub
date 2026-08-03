import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";

function StudentFormActions({ formData, mode = "create" }) {
  const navigate = useNavigate();

  const handleSave = () => {
    console.log(formData);
  };

  return (
    <div className="flex justify-end gap-4 border-t border-slate-200 pt-8">
      <Button variant="secondary" onClick={() => navigate("/admin/students")}>
        Cancel
      </Button>
      <Button onClick={handleSave}>
        {mode === "edit" ? "Update Student" : "Save Student"}
      </Button>{" "}
    </div>
  );
}

export default StudentFormActions;
