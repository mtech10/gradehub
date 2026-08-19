import { Upload, Download } from "lucide-react";
import Button from "../../ui/Button";
import AdminToolbar from "../common/AdminToolbar";
import { useNavigate } from "react-router-dom";

function ResultToolbar({
  search,
  setSearch,
  session,
  setSession,
  semester,
  setSemester,
  level,
  setLevel,
  department,
  setDepartment,
  filters,
  onExport,
}) {
  const navigate = useNavigate();

  return (
    <AdminToolbar
      search={search}
      setSearch={setSearch}
      searchPlaceholder="Search student or course..."
      filters={[
        {
          name: "department",
          value: department,
          onChange: setDepartment,
          options: filters.departments,
          width: "w-full sm:w-52",
        },
        {
          name: "session",
          value: session,
          onChange: setSession,
          options: filters.sessions,
          width: "w-full sm:w-52",
        },
        {
          name: "semester",
          value: semester,
          onChange: setSemester,
          options: filters.semesters,
          width: "w-full sm:w-48",
        },
        {
          name: "level",
          value: level,
          onChange: setLevel,
          options: filters.levels,
          width: "w-full sm:w-40",
        },
      ]}
      rightActions={
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="secondary"
            onClick={onExport}
            className="w-full sm:w-auto justify-center"
          >
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate("/admin/results/upload")}
            className="w-full sm:w-auto justify-center"
          >
            <Upload size={18} className="mr-2" />
            Upload Results
          </Button>
        </div>
      }
    />
  );
}

export default ResultToolbar;
