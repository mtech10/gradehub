import { Download, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import AdminToolbar from "../common/AdminToolbar";

function CourseToolbar({
  search,
  setSearch,
  department,
  setDepartment,
  level,
  setLevel,
  status,
  setStatus,
  filters,
  onExport,
}) {
  const navigate = useNavigate();

  return (
    <AdminToolbar
      search={search}
      setSearch={setSearch}
      searchPlaceholder="Search course..."
      filters={[
        {
          name: "department",
          value: department,
          onChange: setDepartment,
          options: filters.departments,
          width: "w-full sm:w-60",
        },
        {
          name: "level",
          value: level,
          onChange: setLevel,
          options: filters.levels,
          width: "w-full sm:w-40",
        },
        {
          name: "status",
          value: status,
          onChange: setStatus,
          options: filters.statuses,
          width: "w-full sm:w-44",
        },
      ]}
      rightActions={
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="secondary"
            onClick={onExport}
            className="w-full sm:w-auto justify-center"
          >
            <Download size={18} className="mr-2" />
            Export
          </Button>

          <Button
            onClick={() => navigate("/admin/courses/new")}
            className="w-full sm:w-auto justify-center"
          >
            <Plus size={18} className="mr-2" />
            Add Course
          </Button>
        </div>
      }
    />
  );
}

export default CourseToolbar;
