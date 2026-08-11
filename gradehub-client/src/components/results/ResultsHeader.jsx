import { useEffect, useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

import Button from "../ui/Button";
import PageHeader from "../ui/PageHeader";

import semesterService from "../../services/admin/semesterService";

function ResultsHeader({ selectedSemesterId, onTermChange }) {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const fetchAllTerms = async () => {
      try {
        const res = await semesterService.getSemesters({ status: "" });
        setSemesters(res.data || []);
      } catch (error) {
        console.error("Failed to load dropdown terms:", error);
      }
    };
    fetchAllTerms();
  }, []);

  const handleSelectChange = (e) => {
    const semId = e.target.value;
    const selectedSem = semesters.find((s) => s.id === semId);

    if (selectedSem) {
      const sesId =
        selectedSem.sessionId ||
        selectedSem.session_id ||
        selectedSem.session?.id;
      const sesName =
        selectedSem.sessionName ||
        selectedSem.session_name ||
        selectedSem.session?.name ||
        "Unknown Session";
      const semName = selectedSem.name;

      onTermChange(sesId, selectedSem.id, semName, sesName);
    }
  };

  return (
    <PageHeader
      title="My Results"
      description="View your semester results and academic performance."
      actions={
        <div className="flex gap-3">
          <div className="relative flex items-center">
            <CalendarDays
              size={16}
              className="absolute left-3 text-slate-500 pointer-events-none"
            />
            <select
              value={selectedSemesterId || ""}
              onChange={handleSelectChange}
              className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-10 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer shadow-sm transition-all h-[40px]"
            >
              {semesters.length === 0 && (
                <option value="">Loading terms...</option>
              )}

              {semesters.map((sem) => {
                // Safely extract the session name for the dropdown display
                const sesName =
                  sem.sessionName ||
                  sem.session_name ||
                  sem.session?.name ||
                  "Unknown Session";

                return (
                  <option key={sem.id} value={sem.id}>
                    {sesName} — {sem.name}
                  </option>
                );
              })}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 text-slate-500 pointer-events-none"
            />
          </div>
        </div>
      }
    />
  );
}

export default ResultsHeader;
