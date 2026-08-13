import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function CourseFormActions({ mode = "create", isSubmitting = false }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant="secondary"
        onClick={() => navigate("/admin/courses")}
        disabled={isSubmitting}
      >
        Cancel
      </Button>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? mode === "edit"
            ? "Updating Course..."
            : "Creating Course..."
          : mode === "edit"
            ? "Update Course"
            : "Create Course"}
      </Button>
    </div>
  );
}

export default CourseFormActions;
