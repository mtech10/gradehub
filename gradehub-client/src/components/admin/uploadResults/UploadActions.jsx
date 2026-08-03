import { useNavigate } from "react-router-dom";
import { RotateCcw, Upload } from "lucide-react";

import Card from "../../ui/Card";
import Button from "../../ui/Button";

function UploadActions({ formData, onReset }) {
  const navigate = useNavigate();

  const isDisabled =
    !formData.session ||
    !formData.semester ||
    !formData.department ||
    !formData.course ||
    !formData.level ||
    !formData.file;

  return (
    <div className="flex items-center gap-3 justify-end">
      <Button
        type="button"
        variant="secondary"
        onClick={() => navigate("/admin/results")}
      >
        Cancel
      </Button>
      <Button type="button" variant="secondary" onClick={onReset}>
        <RotateCcw size={18} />
        Reset
      </Button>

      <Button type="submit" disabled={isDisabled}>
        <Upload size={18} />

        {formData.file ? "Upload Results" : "Select File to Continue"}
      </Button>
    </div>
  );
}

export default UploadActions;
