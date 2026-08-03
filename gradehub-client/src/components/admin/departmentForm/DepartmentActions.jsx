import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function DepartmentActions({ mode = "add" }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
      <Button
        type="button"
        variant="secondary"
        onClick={() => navigate("/admin/departments")}
      >
        Cancel
      </Button>

      <Button type="submit">
        {mode === "edit" ? "Update Department" : "Create Department"}
      </Button>
    </div>
  );
}

export default DepartmentActions;
