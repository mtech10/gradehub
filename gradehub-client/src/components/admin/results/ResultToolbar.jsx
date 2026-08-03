import { Upload, Download } from "lucide-react";

import Button from "../../ui/Button";
import AdminToolbar from "../common/AdminToolbar";

import { resultFilters } from "../../../constants/admin/results";
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
          options: resultFilters.sessions,
          width: "w-52",
        },
        {
          name: "semester",
          value: semester,
          onChange: setSemester,
          options: resultFilters.semesters,
          width: "w-48",
        },
        {
          name: "level",
          value: level,
          onChange: setLevel,
          options: resultFilters.levels,
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
