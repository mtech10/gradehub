import { Upload, Download, Plus } from "lucide-react";

import Button from "../../ui/Button";
import AdminToolbar from "../common/AdminToolbar";
import { useNavigate } from "react-router-dom";

function StudentToolbar({
  search,
  setSearch,
  department,
  setDepartment,
  level,
  setLevel,
  status,
  setStatus,
  filters,
}) {
  const navigate = useNavigate();
  return (
    <AdminToolbar
      search={search}
      setSearch={setSearch}
      searchPlaceholder="Search student..."
      filters={[
        {
          name: "department",
          value: department,
          onChange: setDepartment,
          options: filters.departments,
          width: "w-60",
        },
        {
          name: "level",
          value: level,
          onChange: setLevel,
          options: filters.levels,
          width: "w-40",
        },
        {
          name: "status",
          value: status,
          onChange: setStatus,
          options: filters.statuses,
          width: "w-44",
        },
      ]}
      rightActions={
        <>
          <Button variant="secondary">
            <Download size={18} />
            Export
          </Button>

          <Button onClick={() => navigate("/admin/students/new")}>
            <Plus size={18} />
            Add Student
          </Button>
        </>
      }
    />
  );
}

export default StudentToolbar;
