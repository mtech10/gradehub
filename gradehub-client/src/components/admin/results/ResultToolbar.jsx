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
  department, // <-- Add this prop
  setDepartment, // <-- Add this prop
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
        // Add the Department filter here
        {
          name: "department",
          value: department,
          onChange: setDepartment,
          options: filters.departments,
          width: "w-52",
        },
        {
          name: "session",
          value: session,
          onChange: setSession,
          options: filters.sessions,
          width: "w-52",
        },
        {
          name: "semester",
          value: semester,
          onChange: setSemester,
          options: filters.semesters,
          width: "w-48",
        },
        {
          name: "level",
          value: level,
          onChange: setLevel,
          options: filters.levels,
          width: "w-40",
        },
      ]}
      rightActions={
        <>
          <Button variant="secondary" onClick={onExport}>
            <Download size={16} className="mr-2" />
            Export CSV
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/admin/results/upload")}
          >
            <Upload size={18} />
            Upload Results
          </Button>
        </>
      }
    />
  );
}

export default ResultToolbar;
