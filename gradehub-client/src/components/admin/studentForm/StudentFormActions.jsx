import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function StudentFormActions({ mode = "create", onSave, isSubmitting }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end gap-4 border-t border-slate-200 pt-8">
      <Button
        variant="secondary"
        onClick={() => navigate("/admin/students")}
        disabled={isSubmitting}
      >
        Cancel
      </Button>

      {/* ✅ Trigger the parent's onSave function */}
      <Button onClick={onSave} disabled={isSubmitting}>
        {isSubmitting
          ? "Saving..."
          : mode === "edit"
            ? "Update Student"
            : "Save Student"}
      </Button>
    </div>
  );
}

export default StudentFormActions;
