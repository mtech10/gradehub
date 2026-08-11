import { useEffect, useState } from "react";
import { Edit2, Trash2, X } from "lucide-react"; // Make sure lucide-react is installed!
import sessionService from "../../../services/admin/sessionService";
import semesterService from "../../../services/admin/semesterService";
import Button from "../../ui/Button";
import { useAcademic } from "../../../context/AcademicContext";

function AcademicTermSettings() {
  const { fetchActiveTerms } = useAcademic();
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [semesters, setSemesters] = useState([]);

  // Session Form State
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [sessionName, setSessionName] = useState("");
  const [sessionStart, setSessionStart] = useState("");
  const [sessionEnd, setSessionEnd] = useState("");

  // Semester Form State
  const [editingSemesterId, setEditingSemesterId] = useState(null);
  const [semesterName, setSemesterName] = useState("");
  const [semesterStart, setSemesterStart] = useState("");
  const [semesterEnd, setSemesterEnd] = useState("");

  const fetchSessions = async () => {
    try {
      const res = await sessionService.getSessions({ status: "all" });
      setSessions(res.data || []);
    } catch (error) {
      console.error("Failed to load sessions.");
    }
  };

  const fetchSemesters = async (sessionId) => {
    try {
      const res = await semesterService.getSemesters({
        sessionId,
        status: "all",
      });
      setSemesters(res.data || []);
    } catch (error) {
      console.error("Failed to load semesters.");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // --- Date Formatter for HTML Inputs ---
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  // --- Session Handlers ---
  const handleSessionSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: sessionName,
        startdate: sessionStart,
        enddate: sessionEnd,
      };

      if (editingSessionId) {
        await sessionService.updateSession(editingSessionId, payload);
        alert("Session updated successfully!");
      } else {
        await sessionService.createSession(payload);
        alert("Session created successfully!");
      }

      resetSessionForm();
      fetchSessions();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to save session.",
      );
    }
  };

  const resetSessionForm = () => {
    setEditingSessionId(null);
    setSessionName("");
    setSessionStart("");
    setSessionEnd("");
  };

  const handleEditSession = (session, e) => {
    e.stopPropagation(); // Prevents opening the semester list when clicking edit
    setEditingSessionId(session.id);
    setSessionName(session.name);
    setSessionStart(formatDateForInput(session.startDate || session.startdate));
    setSessionEnd(formatDateForInput(session.endDate || session.enddate));
  };

  const handleDeleteSession = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to deactivate this session?"))
      return;
    try {
      await sessionService.deleteSession(id);
      fetchSessions();
      if (selectedSession?.id === id) {
        setSelectedSession(null);
        setSemesters([]);
      }
    } catch (error) {
      alert("Failed to delete session.");
    }
  };

  const handleMakeSessionCurrent = async (id) => {
    try {
      await sessionService.makeSessionCurrent(id);
      fetchSessions();
      fetchActiveTerms();
    } catch (error) {
      alert("Failed to update current session.");
    }
  };

  // --- Semester Handlers ---
  const handleSemesterSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSession) return;
    try {
      const payload = {
        sessionId: selectedSession.id,
        name: semesterName,
        startDate: semesterStart,
        endDate: semesterEnd,
      };

      if (editingSemesterId) {
        await semesterService.updateSemester(editingSemesterId, payload);
        alert("Semester updated successfully!");
      } else {
        await semesterService.createSemester(payload);
        alert("Semester created successfully!");
      }

      resetSemesterForm();
      fetchSemesters(selectedSession.id);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to save semester.",
      );
    }
  };

  const resetSemesterForm = () => {
    setEditingSemesterId(null);
    setSemesterName("");
    setSemesterStart("");
    setSemesterEnd("");
  };

  const handleEditSemester = (semester) => {
    setEditingSemesterId(semester.id);
    setSemesterName(semester.name);
    setSemesterStart(
      formatDateForInput(semester.startDate || semester.startdate),
    );
    setSemesterEnd(formatDateForInput(semester.endDate || semester.enddate));
  };

  const handleDeleteSemester = async (id) => {
    if (!window.confirm("Are you sure you want to deactivate this semester?"))
      return;
    try {
      await semesterService.deleteSemester(id);
      fetchSemesters(selectedSession.id);
    } catch (error) {
      alert("Failed to delete semester.");
    }
  };

  const handleMakeSemesterCurrent = async (id) => {
    try {
      await semesterService.makeSemesterCurrent(id);
      fetchSemesters(selectedSession.id);
      fetchActiveTerms();
    } catch (error) {
      alert("Failed to update current semester.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-900">Academic Terms</h2>
        <p className="text-sm text-slate-500">
          Manage institution sessions, semesters, and active academic periods.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* --- SESSIONS SECTION --- */}
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-800">Sessions</h3>

          {/* SESSION FORM */}
          <form
            onSubmit={handleSessionSubmit}
            className="space-y-3 rounded-xl bg-white p-4 shadow-sm border border-slate-100"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium text-slate-700">
                {editingSessionId ? "Edit Session" : "Add New Session"}
              </h4>
              {editingSessionId && (
                <button
                  type="button"
                  onClick={resetSessionForm}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <input
              type="text"
              placeholder="Name (e.g. 2026/2027)"
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              required
            />
            <div className="flex gap-2">
              <input
                type="date"
                value={sessionStart}
                onChange={(e) => setSessionStart(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm text-slate-600"
                required
              />
              <input
                type="date"
                value={sessionEnd}
                onChange={(e) => setSessionEnd(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm text-slate-600"
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              {editingSessionId ? "Update Session" : "Create Session"}
            </Button>
          </form>

          {/* SESSIONS LIST */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {sessions.map((session) => {
              const sessionStartVal = session.startDate || session.startdate;
              const sessionEndVal = session.endDate || session.enddate;
              const isCurrent = session.isCurrent || session.iscurrent;

              return (
                <div
                  key={session.id}
                  onClick={() => {
                    setSelectedSession(session);
                    fetchSemesters(session.id);
                    resetSemesterForm();
                  }}
                  className={`flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-colors ${
                    selectedSession?.id === session.id
                      ? "border-blue-500 bg-blue-50/50"
                      : "border-slate-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-slate-900">
                      {session.name}
                    </p>
                    {isCurrent ? (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                        CURRENT
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMakeSessionCurrent(session.id);
                        }}
                        className="text-xs font-semibold text-blue-600 hover:underline"
                      >
                        Set as Current
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div>
                      {sessionStartVal
                        ? new Date(sessionStartVal).toLocaleDateString()
                        : "No Date"}{" "}
                      -{" "}
                      {sessionEndVal
                        ? new Date(sessionEndVal).toLocaleDateString()
                        : "No Date"}
                    </div>
                    {/* EDIT & DELETE BUTTONS */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => handleEditSession(session, e)}
                        className="p-1 hover:text-blue-600"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={(e) => handleDeleteSession(session.id, e)}
                        className="p-1 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- SEMESTERS SECTION --- */}
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-800">
            Semesters {selectedSession && `for ${selectedSession.name}`}
          </h3>

          {!selectedSession ? (
            <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
              <p className="text-sm text-slate-500">
                Select a session to view/manage semesters.
              </p>
            </div>
          ) : (
            <>
              {/* SEMESTER FORM */}
              <form
                onSubmit={handleSemesterSubmit}
                className="space-y-3 rounded-xl bg-white p-4 shadow-sm border border-slate-100"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-slate-700">
                    {editingSemesterId ? "Edit Semester" : "Add New Semester"}
                  </h4>
                  {editingSemesterId && (
                    <button
                      type="button"
                      onClick={resetSemesterForm}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Name (e.g. First Semester)"
                  value={semesterName}
                  onChange={(e) => setSemesterName(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={semesterStart}
                    onChange={(e) => setSemesterStart(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 text-sm text-slate-600"
                    required
                  />
                  <input
                    type="date"
                    value={semesterEnd}
                    onChange={(e) => setSemesterEnd(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 text-sm text-slate-600"
                    required
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  {editingSemesterId ? "Update Semester" : "Create Semester"}
                </Button>
              </form>

              {/* SEMESTERS LIST */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {semesters.map((semester) => {
                  const semesterStartVal =
                    semester.startDate || semester.startdate;
                  const semesterEndVal = semester.endDate || semester.enddate;
                  const isCurrent = semester.isCurrent || semester.iscurrent;

                  return (
                    <div
                      key={semester.id}
                      className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-slate-900">
                          {semester.name}
                        </p>
                        {isCurrent ? (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
                            CURRENT
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              handleMakeSemesterCurrent(semester.id)
                            }
                            className="text-xs font-semibold text-blue-600 hover:underline"
                          >
                            Set as Current
                          </button>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div>
                          {semesterStartVal
                            ? new Date(semesterStartVal).toLocaleDateString()
                            : "No Date"}{" "}
                          -{" "}
                          {semesterEndVal
                            ? new Date(semesterEndVal).toLocaleDateString()
                            : "No Date"}
                        </div>
                        {/* EDIT & DELETE BUTTONS */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditSemester(semester)}
                            className="p-1 hover:text-blue-600"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteSemester(semester.id)}
                            className="p-1 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {semesters.length === 0 && (
                  <p className="py-4 text-center text-sm text-slate-500">
                    No semesters configured for this session.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AcademicTermSettings;
