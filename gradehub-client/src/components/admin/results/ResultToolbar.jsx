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
  filters,
}) {
  const navigate = useNavigate();
  return (
    <AdminToolbar
      search={search}
      setSearch={setSearch}
      searchPlaceholder="Search student or course..."
      filters={[
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
          <Button
            variant="secondary"
            onClick={() => navigate("/admin/results/upload")}
          >
            <Upload size={18} />
            Upload Results
          </Button>

          <Button variant="secondary">
            <Download size={18} />
            Export
          </Button>
        </>
      }
    />
  );
}

export default ResultToolbar;
