import { useEffect, useState } from "react";
import { Edit2, Trash2, X, Loader2, TrendingUp } from "lucide-react";
import sessionService from "../../../services/admin/sessionService";
import semesterService from "../../../services/admin/semesterService";
import Button from "../../ui/Button";
import ConfirmModal from "../../ui/ConfirmModal"; // Assuming this is your modal component
import { useAcademic } from "../../../context/AcademicContext";
import { useToast } from "../../../context/ToastContext"; // Import Toast

function AcademicTermSettings() {
  const { fetchActiveTerms } = useAcademic();
  const { addToast } = useToast();

  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [semesters, setSemesters] = useState([]);

  // Modal States
  const [deleteSessionModal, setDeleteSessionModal] = useState({
    isOpen: false,
    id: null,
  });
  const [deleteSemesterModal, setDeleteSemesterModal] = useState({
    isOpen: false,
    id: null,
  });
  const [promoteModal, setPromoteModal] = useState({
    isOpen: false,
    session: null,
  });

  // Session Form State
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [sessionName, setSessionName] = useState("");
  const [sessionStart, setSessionStart] = useState("");
  const [sessionEnd, setSessionEnd] = useState("");
  const [isPromoting, setIsPromoting] = useState(false);

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
        addToast({
          title: "Success",
          message: "Session updated successfully!",
          type: "success",
        });
      } else {
        await sessionService.createSession(payload);
        addToast({
          title: "Success",
          message: "Session created successfully!",
          type: "success",
        });
      }

      resetSessionForm();
      fetchSessions();
    } catch (error) {
      addToast({
        title: "Error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to save session.",
        type: "error",
      });
    }
  };

  const resetSessionForm = () => {
    setEditingSessionId(null);
    setSessionName("");
    setSessionStart("");
    setSessionEnd("");
  };

  const handleEditSession = (session, e) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setSessionName(session.name);
    setSessionStart(formatDateForInput(session.startDate || session.startdate));
    setSessionEnd(formatDateForInput(session.endDate || session.enddate));
  };

  const executeDeleteSession = async () => {
    try {
      await sessionService.deleteSession(deleteSessionModal.id);
      fetchSessions();
      if (selectedSession?.id === deleteSessionModal.id) {
        setSelectedSession(null);
        setSemesters([]);
      }
      addToast({
        title: "Deleted",
        message: "Session has been deactivated.",
        type: "success",
      });
    } catch (error) {
      addToast({
        title: "Error",
        message: "Failed to delete session.",
        type: "error",
      });
    } finally {
      setDeleteSessionModal({ isOpen: false, id: null });
    }
  };

  const handleMakeSessionCurrent = async (id) => {
    try {
      await sessionService.makeSessionCurrent(id);
      fetchSessions();
      fetchActiveTerms();
      addToast({
        title: "Updated",
        message: "Current session updated successfully.",
        type: "success",
      });
    } catch (error) {
      addToast({
        title: "Error",
        message: "Failed to update current session.",
        type: "error",
      });
    }
  };

  // --- PROMOTION HANDLER ---
  const executePromoteStudents = async () => {
    const session = promoteModal.session;
    setPromoteModal({ isOpen: false, session: null }); // Close modal immediately
    setIsPromoting(true); // Trigger loading state on the button

    try {
      const result = await sessionService.promoteStudents(session.id);
      const stats = result.data;

      addToast({
        title: "Promotion Complete!",
        message: `Evaluated: ${stats.totalEvaluated} | Promoted: ${stats.promoted} | Retained: ${stats.retained}`,
        type: "success",
      });
    } catch (error) {
      addToast({
        title: "Promotion Failed",
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to run batch promotion.",
        type: "error",
      });
    } finally {
      setIsPromoting(false);
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
        addToast({
          title: "Success",
          message: "Semester updated successfully!",
          type: "success",
        });
      } else {
        await semesterService.createSemester(payload);
        addToast({
          title: "Success",
          message: "Semester created successfully!",
          type: "success",
        });
      }

      resetSemesterForm();
      fetchSemesters(selectedSession.id);
    } catch (error) {
      addToast({
        title: "Error",
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to save semester.",
        type: "error",
      });
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

  const executeDeleteSemester = async () => {
    try {
      await semesterService.deleteSemester(deleteSemesterModal.id);
      fetchSemesters(selectedSession.id);
      addToast({
        title: "Deleted",
        message: "Semester has been deactivated.",
        type: "success",
      });
    } catch (error) {
      addToast({
        title: "Error",
        message: "Failed to delete semester.",
        type: "error",
      });
    } finally {
      setDeleteSemesterModal({ isOpen: false, id: null });
    }
  };

  const handleMakeSemesterCurrent = async (id) => {
    try {
      await semesterService.makeSemesterCurrent(id);
      fetchSemesters(selectedSession.id);
      fetchActiveTerms();
      addToast({
        title: "Updated",
        message: "Current semester updated successfully.",
        type: "success",
      });
    } catch (error) {
      addToast({
        title: "Error",
        message: "Failed to update current semester.",
        type: "error",
      });
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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* --- COLUMN 1: SESSIONS SECTION --- */}
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
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
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
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleEditSession(session, e)}
                        className="p-1 hover:text-blue-600"
                        title="Edit Session"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteSessionModal({
                            isOpen: true,
                            id: session.id,
                          });
                        }}
                        className="p-1 hover:text-red-600"
                        title="Delete Session"
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

        {/* --- COLUMN 2: SEMESTERS SECTION --- */}
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 h-fit">
          <h3 className="text-lg font-semibold text-slate-800">
            Semesters {selectedSession && `for ${selectedSession.name}`}
          </h3>

          {!selectedSession ? (
            <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
              <p className="text-sm text-slate-500 text-center px-4">
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
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
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
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditSemester(semester)}
                            className="p-1 hover:text-blue-600"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteSemesterModal({
                                isOpen: true,
                                id: semester.id,
                              })
                            }
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

        {/* --- COLUMN 3: BATCH PROMOTION SECTION --- */}
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-6 shadow-sm h-fit">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-indigo-900">
              Batch Promotion
            </h3>
            <p className="mt-2 text-sm text-indigo-700/80 leading-relaxed">
              Advance all eligible students in the selected session to their
              next academic level based on your configured department rules.
            </p>
          </div>

          {!selectedSession ? (
            <div className="rounded-xl border border-dashed border-indigo-200 bg-white p-6 text-center text-sm text-indigo-400 mt-6">
              Select a session from the left column to run promotions.
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5 rounded-xl border border-indigo-100 bg-white p-6 text-center shadow-sm mt-6">
              <div className="text-sm text-slate-600">
                Target Session: <br />
                <span className="font-bold text-lg text-slate-900 mt-1 block">
                  {selectedSession.name}
                </span>
              </div>

              <Button
                onClick={() =>
                  setPromoteModal({ isOpen: true, session: selectedSession })
                }
                disabled={isPromoting}
                className="flex w-full items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 py-3"
              >
                {isPromoting ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <TrendingUp size={18} />
                )}
                {isPromoting ? "Running Engine..." : `Promote Students`}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* --- MODALS --- */}
      <ConfirmModal
        isOpen={deleteSessionModal.isOpen}
        onClose={() => setDeleteSessionModal({ isOpen: false, id: null })}
        onConfirm={executeDeleteSession}
        title="Deactivate Session"
        message="Are you sure you want to deactivate this session? This action may hide related records from active views."
        confirmText="Deactivate"
        cancelText="Cancel"
        isDestructive={true}
      />

      <ConfirmModal
        isOpen={deleteSemesterModal.isOpen}
        onClose={() => setDeleteSemesterModal({ isOpen: false, id: null })}
        onConfirm={executeDeleteSemester}
        title="Deactivate Semester"
        message="Are you sure you want to deactivate this semester?"
        confirmText="Deactivate"
        cancelText="Cancel"
        isDestructive={true}
      />

      <ConfirmModal
        isOpen={promoteModal.isOpen}
        onClose={() => setPromoteModal({ isOpen: false, session: null })}
        onConfirm={executePromoteStudents}
        title={`Batch Promote: ${promoteModal.session?.name}`}
        message="CRITICAL ACTION: Are you sure you want to run the batch promotion? This will evaluate all active students and move them to their next academic level based on department rules."
        confirmText="Run Promotion"
        cancelText="Cancel"
        isDestructive={false}
      />
    </div>
  );
}

export default AcademicTermSettings;
