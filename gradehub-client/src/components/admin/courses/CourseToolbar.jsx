import { Upload, Download, Plus } from "lucide-react";

import Button from "../../ui/Button";
import AdminToolbar from "../common/AdminToolbar";

import { courseFilters } from "../../../constants/admin/courses";

function CourseToolbar({
  search,
  setSearch,
  department,
  setDepartment,
  level,
  setLevel,
  status,
  setStatus,
}) {
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
          options: courseFilters.departments,
          width: "w-60",
        },
        {
          name: "level",
          value: level,
          onChange: setLevel,
          options: courseFilters.levels,
          width: "w-40",
        },
        {
          name: "status",
          value: status,
          onChange: setStatus,
          options: courseFilters.statuses,
          width: "w-44",
        },
      ]}
      rightActions={
        <>
          <Button variant="secondary">
            <Upload size={18} />
            Import
          </Button>

          <Button variant="secondary">
            <Download size={18} />
            Export
          </Button>

          <Button>
            <Plus size={18} />
            Add Course
          </Button>
        </>
      }
    />
  );
}

export default CourseToolbar;
