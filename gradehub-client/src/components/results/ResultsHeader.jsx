import { useEffect, useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import PageHeader from "../ui/PageHeader";
import sessionService from "../../services/admin/sessionService";

function ResultsHeader({ selectedSessionId, onTermChange }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchAllSessions = async () => {
      try {
        const res = await sessionService.getSessions({ status: "all" });
        setSessions(res.data || []);
      } catch (error) {
        console.error("Failed to load sessions for dropdown:", error);
      }
    };
    fetchAllSessions();
  }, []);

  const handleSelectChange = (e) => {
    const sesId = e.target.value;
    const selectedSes = sessions.find((s) => s.id === sesId);

    if (selectedSes) {
      const sesName = selectedSes.name;
      onTermChange(sesId, null, null, sesName);
    }
  };

  return (
    <PageHeader
      title="My Results"
      description="View your session results and academic performance."
      actions={
        <div className="flex w-full sm:w-auto">
          <div className="relative flex items-center w-full sm:w-auto">
            <CalendarDays
              size={16}
              className="absolute left-3 text-slate-500 pointer-events-none"
            />
            <select
              value={selectedSessionId || ""}
              onChange={handleSelectChange}
              className="w-full sm:w-auto appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-10 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer shadow-sm transition-all h-[40px]"
            >
              {sessions.length === 0 && (
                <option value="">Loading sessions...</option>
              )}

              {sessions.map((ses) => (
                <option key={ses.id} value={ses.id}>
                  {ses.name} Session
                </option>
              ))}
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
