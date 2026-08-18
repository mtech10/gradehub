import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { exportToCSV } from "../../utils/exportCsv";
import PageHeader from "../../components/common/PageHeader";
import ResultStats from "../../components/admin/results/ResultStats";
import ResultToolbar from "../../components/admin/results/ResultToolbar";
import ResultsTable from "../../components/admin/results/ResultsTable";
import BulkActionBar from "../../components/admin/common/BulkActionBar";

import { resultService } from "../../services/admin/resultService";
import { resultFilters } from "../../constants/admin/results";
import { resultColumns } from "../../constants/tables/resultColumns";
import sessionService from "../../services/admin/sessionService";
import levelService from "../../services/admin/levelService";
import departmentService from "../../services/admin/departmentService";
import semesterService from "../../services/admin/semesterService";
import resultUploadService from "../../services/admin/resultUploadService";
import StatCardSkeleton from "../../components/ui/skeletons/StatCardSskeleton";

function AllResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  const [department, setDepartment] = useState(""); // <-- Add this state

  const [filterOptions, setFilterOptions] = useState({
    sessions: [],
    semesters: [
      { label: "First Semester", value: "First" },
      { label: "Second Semester", value: "Second" },
    ],
    levels: [],
    departments: [],
  });

  const [resultStats, setResultStats] = useState({
    totalResults: 0,
    approved: 0,
    pending: 0,
    missing: 0,
  });
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");
  const [level, setLevel] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("createdat");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedRows, setSelectedRows] = useState([]);

  const pageSize = 8;

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [sessionsRes, levelsRes, deptsRes, semestersRes] =
          await Promise.all([
            sessionService.getSessions({ status: "all" }),
            levelService.getLevels
              ? levelService.getLevels()
              : Promise.resolve([]),
            departmentService.getDepartments
              ? departmentService.getDepartments({ status: "all" })
              : Promise.resolve([]),
            semesterService.getSemesters
              ? semesterService.getSemesters({ status: "all" })
              : Promise.resolve([]),
          ]);

        const rawSessions = sessionsRes.data || sessionsRes || [];
        const rawLevels = levelsRes.data || levelsRes || [];
        const rawDepts = deptsRes.data || deptsRes || [];
        const rawSemesters = semestersRes.data || semestersRes || [];

        // --- NEW: Deduplicate semesters by their name ---
        const uniqueSemesters = rawSemesters.filter(
          (sem, index, self) =>
            index === self.findIndex((s) => s.name === sem.name),
        );

        setFilterOptions((prev) => ({
          ...prev,
          sessions: [
            { label: "All Sessions", value: "" },
            ...rawSessions.map((s) => ({ label: s.name, value: s.id })),
          ],
          levels: [
            { label: "All Levels", value: "" },
            ...rawLevels.map((l) => ({ label: l.name, value: l.id })),
          ],
          departments: [
            { label: "All Departments", value: "" },
            ...rawDepts.map((d) => ({ label: d.name, value: d.id })),
          ],
          semesters: [
            { label: "All Semesters", value: "" },
            // Use the uniqueSemesters array here instead of rawSemesters
            ...uniqueSemesters.map((sem) => ({
              label: sem.name,
              value: sem.id,
            })),
          ],
        }));
      } catch (error) {
        console.error("Failed to load filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  const fetchResults = async () => {
    setLoading(true);
    try {
      // Inside fetchResults:
      const queryParams = {
        page: currentPage,
        limit: pageSize,
        search: search || undefined,
        sessionId: session || undefined,
        semesterId: semester || undefined, // <-- Change this back to semesterId
        levelId: level || undefined,
        departmentId: department || undefined,
        sort: sortKey,
        order: sortDirection,
      };

      const cleanParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, v]) => v !== undefined),
      );

      const response = await resultService.getResults(cleanParams);

      setResults(response.data || response.results || []);
      if (response.pagination) {
        setPagination(response.pagination);
      }
      const statistics = await resultService.getResultStatistics({
        search: search || undefined,
        sessionId: session || undefined,
        semester: semester || undefined,
        departmentId: department || undefined, // <-- Add this line
      });

      setResultStats(statistics);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    } finally {
      setLoading(false);
      setIsInitialLoad(false); // Prevents the skeleton from flashing again
    }
  };

  // The fetch effect:
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [
    search,
    session,
    semester,
    level,
    department,
    currentPage,
    sortKey,
    sortDirection,
  ]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [search, session, semester, level, department]); // <-- Added department

  const handleBulkApprove = async () => {
    if (!selectedRows.length) return;
    if (
      !window.confirm(
        `Are you sure you want to approve ${selectedRows.length} selected results?`,
      )
    )
      return;

    try {
      await resultUploadService.bulkApproveResults(selectedRows);
      alert("Selected results approved successfully!");
      setSelectedRows([]);
      fetchResults();
    } catch (error) {
      alert(error.message || "Failed to bulk approve results.");
    }
  };

  const handleBulkSuspend = async () => {
    if (!selectedRows.length) return;
    if (
      !window.confirm(
        `Are you sure you want to suspend ${selectedRows.length} selected results?`,
      )
    )
      return;

    try {
      await resultUploadService.bulkDeactivateResults(selectedRows);
      alert("Selected results suspended successfully!");
      setSelectedRows([]);
      fetchResults();
    } catch (error) {
      alert(error.message || "Failed to bulk suspend results.");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedRows.length) return;
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedRows.length} selected results?`,
      )
    )
      return;

    try {
      await resultUploadService.bulkDeleteResults(selectedRows);
      alert("Selected results deleted successfully!");
      setSelectedRows([]);
      fetchResults();
    } catch (error) {
      alert(error.message || "Failed to bulk delete results.");
    }
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (pageIds) => {
    const allSelected = pageIds.every((id) => selectedRows.includes(id));
    if (allSelected) {
      setSelectedRows((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedRows((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  const clearSelection = () => {
    setSelectedRows([]);
  };

  const handleExport = async () => {
    try {
      addToast({
        title: "Exporting...",
        message: "Preparing your download, please wait.",
        type: "info",
      });

      const queryParams = {
        search: search || undefined,
        sessionId: session || undefined,
        semesterId: semester || undefined,
        levelId: level || undefined,
        departmentId: department || undefined,
        sort: sortKey,
        order: sortDirection,
        page: 1,
        limit: 100000, // Fetch enough to cover the entire filtered dataset
      };

      const cleanParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, v]) => v !== undefined),
      );

      // 2. Fetch the full filtered data from your result service
      const response = await resultService.getResults(cleanParams);
      const payload = response.data?.pagination ? response.data : response;
      let dataToExport = payload.data || payload.results || [];

      if (dataToExport.length === 0) {
        addToast({
          title: "Export Failed",
          message: "No results found to export matching the current filters.",
          type: "error",
        });
        return;
      }

      // 3. If checkboxes are used, restrict the export to ONLY the selected rows
      if (selectedRows && selectedRows.length > 0) {
        dataToExport = dataToExport.filter((item) =>
          selectedRows.includes(item.id),
        );
      }

      // 4. Format the records cleanly for Excel/CSV using your flat object structure
      const exportData = dataToExport.map((r) => ({
        "Student Name": r.studentName || "N/A",
        "Matric No": r.matricNumber || "N/A",
        "Course Code": r.code || "N/A",
        "Course Title": r.course || "N/A",
        Units: r.unit || 0,
        "CA Score": r.caScore || 0,
        "Exam Score": r.examScore || 0,
        "Total Score": r.score || 0,
        Grade: r.grade || "N/A",
        "Grade Point": r.gradePoint || 0,
        Remark: r.remark || "N/A",
        Session: r.session || "N/A",
        Semester: r.semester || "N/A",
        Status: r.status || "N/A",
      }));

      // 5. Trigger the download
      exportToCSV(exportData, "All_Results_Export");

      addToast({
        title: "Export Successful",
        message: `Successfully exported ${exportData.length} result records.`,
        type: "success",
      });
    } catch (error) {
      console.error("Export error:", error);
      addToast({
        title: "Export Failed",
        message: "An error occurred while generating the export.",
        type: "error",
      });
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Results"
        subtitle="Manage and review students' academic results."
      />

      {isInitialLoad ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={`stat-${i}`} />
          ))}
        </div>
      ) : (
        <ResultStats stats={resultStats} />
      )}

      <ResultToolbar
        search={search}
        setSearch={setSearch}
        session={session}
        setSession={setSession}
        semester={semester}
        setSemester={setSemester}
        level={level}
        setLevel={setLevel}
        department={department} // <-- Add this
        setDepartment={setDepartment} // <-- Add this
        filters={filterOptions}
        onExport={handleExport}
      />

      {selectedRows.length > 0 && (
        <BulkActionBar
          count={selectedRows.length}
          itemLabel="results"
          onClearSelection={clearSelection}
          onExport={handleExport}
          onApprove={handleBulkApprove}
          onSuspend={handleBulkSuspend}
          onDelete={handleBulkDelete}
        />
      )}

      <ResultsTable
        columns={resultColumns}
        results={results}
        loading={loading}
        onRefresh={fetchResults}
        totalItems={pagination.total || 0}
        totalPages={pagination.totalPages || 1}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
        selectable
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
}

export default AllResults;
