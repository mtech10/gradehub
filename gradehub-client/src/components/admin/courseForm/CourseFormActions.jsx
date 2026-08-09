import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";

function CourseFormActions({ mode, loading = false }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end gap-3">
      <Button
        type="button"
        variant="secondary"
        onClick={() => navigate("/admin/courses")}
        disabled={loading}
      >
        Cancel
      </Button>

      <Button type="submit" disabled={loading}>
        {loading
          ? mode === "edit"
            ? "Updating..."
            : "Creating..."
          : mode === "edit"
            ? "Update Course"
            : "Create Course"}
      </Button>
    </div>
  );
}

export default CourseFormActions;
