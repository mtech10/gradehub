import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import Card from "../../ui/Card";

function CourseFormActions({ mode }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-end gap-4 p-4">
      <Button
        type="button"
        variant="secondary"
        onClick={() => navigate("/admin/courses")}
      >
        Cancel
      </Button>

      <Button type="submit">
        {mode === "edit" ? "Update Course" : "Create Course"}
      </Button>
    </div>
  );
}

export default CourseFormActions;
