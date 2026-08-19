// import { useEffect, useState } from "react";
// import { useToast } from "../../context/ToastContext";
// import { exportToCSV } from "../../utils/exportCsv";
// import PageHeader from "../../components/common/PageHeader";
// import ResultStats from "../../components/admin/results/ResultStats";
// import ResultToolbar from "../../components/admin/results/ResultToolbar";
// import ResultsTable from "../../components/admin/results/ResultsTable";
// import BulkActionBar from "../../components/admin/common/BulkActionBar";

// import { resultService } from "../../services/admin/resultService";
// import { resultColumns } from "../../constants/tables/resultColumns";
// import sessionService from "../../services/admin/sessionService";
// import levelService from "../../services/admin/levelService";
// import departmentService from "../../services/admin/departmentService";
// import semesterService from "../../services/admin/semesterService";
// import resultUploadService from "../../services/admin/resultUploadService";
// import StatCardSkeleton from "../../components/ui/skeletons/StatCardSskeleton";

// function AllResults() {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isInitialLoad, setIsInitialLoad] = useState(true);
//   const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

//   const [department, setDepartment] = useState("");

//   const [filterOptions, setFilterOptions] = useState({
//     sessions: [],
//     semesters: [
//       { label: "First Semester", value: "First" },
//       { label: "Second Semester", value: "Second" },
//     ],
//     levels: [],
//     departments: [],
//   });

//   const [resultStats, setResultStats] = useState({
//     totalResults: 0,
//     approved: 0,
//     pending: 0,
//     missing: 0,
//   });
//   const { addToast } = useToast();
//   const [search, setSearch] = useState("");
//   const [session, setSession] = useState("");
//   const [semester, setSemester] = useState("");
//   const [level, setLevel] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortKey, setSortKey] = useState("createdat");
//   const [sortDirection, setSortDirection] = useState("desc");
//   const [selectedRows, setSelectedRows] = useState([]);

//   const pageSize = 8;

//   useEffect(() => {
//     const fetchFilterOptions = async () => {
//       try {
//         const [sessionsRes, levelsRes, deptsRes, semestersRes] =
//           await Promise.all([
//             sessionService.getSessions({ status: "all" }),
//             levelService.getLevels
//               ? levelService.getLevels()
//               : Promise.resolve([]),
//             departmentService.getDepartments
//               ? departmentService.getDepartments({ status: "all" })
//               : Promise.resolve([]),
//             semesterService.getSemesters
//               ? semesterService.getSemesters({ status: "all" })
//               : Promise.resolve([]),
//           ]);

//         const rawSessions = sessionsRes.data || sessionsRes || [];
//         const rawLevels = levelsRes.data || levelsRes || [];
//         const rawDepts = deptsRes.data || deptsRes || [];
//         const rawSemesters = semestersRes.data || semestersRes || [];

//         const uniqueSemesters = rawSemesters.filter(
//           (sem, index, self) =>
//             index === self.findIndex((s) => s.name === sem.name),
//         );

//         setFilterOptions((prev) => ({
//           ...prev,
//           sessions: [
//             { label: "All Sessions", value: "" },
//             ...rawSessions.map((s) => ({ label: s.name, value: s.id })),
//           ],
//           levels: [
//             { label: "All Levels", value: "" },
//             ...rawLevels.map((l) => ({ label: l.name, value: l.id })),
//           ],
//           departments: [
//             { label: "All Departments", value: "" },
//             ...rawDepts.map((d) => ({ label: d.name, value: d.id })),
//           ],
//           semesters: [
//             { label: "All Semesters", value: "" },
//             ...uniqueSemesters.map((sem) => ({
//               label: sem.name,
//               value: sem.id,
//             })),
//           ],
//         }));
//       } catch (error) {
//         console.error("Failed to load filter options:", error);
//       }
//     };

//     fetchFilterOptions();
//   }, []);

//   const fetchResults = async () => {
//     setLoading(true);
//     try {
//       const queryParams = {
//         page: currentPage,
//         limit: pageSize,
//         search: search || undefined,
//         sessionId: session || undefined,
//         semesterId: semester || undefined,
//         levelId: level || undefined,
//         departmentId: department || undefined,
//         sort: sortKey,
//         order: sortDirection,
//       };

//       const cleanParams = Object.fromEntries(
//         Object.entries(queryParams).filter(([_, v]) => v !== undefined),
//       );

//       const response = await resultService.getResults(cleanParams);

//       setResults(response.data || response.results || []);
//       if (response.pagination) {
//         setPagination(response.pagination);
//       }
//       const statistics = await resultService.getResultStatistics({
//         search: search || undefined,
//         sessionId: session || undefined,
//         semester: semester || undefined,
//         departmentId: department || undefined,
//       });

//       setResultStats(statistics);
//     } catch (error) {
//       console.error("Failed to fetch results:", error);
//     } finally {
//       setLoading(false);
//       setIsInitialLoad(false);
//     }
//   };

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       fetchResults();
//     }, 300);

//     return () => clearTimeout(delayDebounceFn);
//   }, [
//     search,
//     session,
//     semester,
//     level,
//     department,
//     currentPage,
//     sortKey,
//     sortDirection,
//   ]);

//   useEffect(() => {
//     setCurrentPage(1);
//     setSelectedRows([]);
//   }, [search, session, semester, level, department]);

//   const handleBulkApprove = async () => {
//     if (!selectedRows.length) return;
//     if (
//       !window.confirm(
//         `Are you sure you want to approve ${selectedRows.length} selected results?`,
//       )
//     )
//       return;

//     try {
//       await resultUploadService.bulkApproveResults(selectedRows);
//       alert("Selected results approved successfully!");
//       setSelectedRows([]);
//       fetchResults();
//     } catch (error) {
//       alert(error.message || "Failed to bulk approve results.");
//     }
//   };

//   const handleBulkSuspend = async () => {
//     if (!selectedRows.length) return;
//     if (
//       !window.confirm(
//         `Are you sure you want to suspend ${selectedRows.length} selected results?`,
//       )
//     )
//       return;

//     try {
//       await resultUploadService.bulkDeactivateResults(selectedRows);
//       alert("Selected results suspended successfully!");
//       setSelectedRows([]);
//       fetchResults();
//     } catch (error) {
//       alert(error.message || "Failed to bulk suspend results.");
//     }
//   };

//   const handleBulkDelete = async () => {
//     if (!selectedRows.length) return;
//     if (
//       !window.confirm(
//         `Are you sure you want to delete ${selectedRows.length} selected results?`,
//       )
//     )
//       return;

//     try {
//       await resultUploadService.bulkDeleteResults(selectedRows);
//       alert("Selected results deleted successfully!");
//       setSelectedRows([]);
//       fetchResults();
//     } catch (error) {
//       alert(error.message || "Failed to bulk delete results.");
//     }
//   };

//   const handleSort = (key) => {
//     if (sortKey === key) {
//       setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
//     } else {
//       setSortKey(key);
//       setSortDirection("asc");
//     }
//   };

//   const handleRowSelect = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
//     );
//   };

//   const handleSelectAll = (pageIds) => {
//     const allSelected = pageIds.every((id) => selectedRows.includes(id));
//     if (allSelected) {
//       setSelectedRows((prev) => prev.filter((id) => !pageIds.includes(id)));
//     } else {
//       setSelectedRows((prev) => [...new Set([...prev, ...pageIds])]);
//     }
//   };

//   const clearSelection = () => {
//     setSelectedRows([]);
//   };

//   const handleExport = async () => {
//     try {
//       addToast({
//         title: "Exporting...",
//         message: "Preparing your download, please wait.",
//         type: "info",
//       });

//       const queryParams = {
//         search: search || undefined,
//         sessionId: session || undefined,
//         semesterId: semester || undefined,
//         levelId: level || undefined,
//         departmentId: department || undefined,
//         sort: sortKey,
//         order: sortDirection,
//         page: 1,
//         limit: 100000,
//       };

//       const cleanParams = Object.fromEntries(
//         Object.entries(queryParams).filter(([_, v]) => v !== undefined),
//       );

//       const response = await resultService.getResults(cleanParams);
//       const payload = response.data?.pagination ? response.data : response;
//       let dataToExport = payload.data || payload.results || [];

//       if (dataToExport.length === 0) {
//         addToast({
//           title: "Export Failed",
//           message: "No results found to export matching the current filters.",
//           type: "error",
//         });
//         return;
//       }

//       if (selectedRows && selectedRows.length > 0) {
//         dataToExport = dataToExport.filter((item) =>
//           selectedRows.includes(item.id),
//         );
//       }

//       const exportData = dataToExport.map((r) => ({
//         "Student Name": r.studentName || "N/A",
//         "Matric No": r.matricNumber || "N/A",
//         "Course Code": r.code || "N/A",
//         "Course Title": r.course || "N/A",
//         Units: r.unit || 0,
//         "CA Score": r.caScore || 0,
//         "Exam Score": r.examScore || 0,
//         "Total Score": r.score || 0,
//         Grade: r.grade || "N/A",
//         "Grade Point": r.gradePoint || 0,
//         Remark: r.remark || "N/A",
//         Session: r.session || "N/A",
//         Semester: r.semester || "N/A",
//         Status: r.status || "N/A",
//       }));

//       exportToCSV(exportData, "All_Results_Export");

//       addToast({
//         title: "Export Successful",
//         message: `Successfully exported ${exportData.length} result records.`,
//         type: "success",
//       });
//     } catch (error) {
//       console.error("Export error:", error);
//       addToast({
//         title: "Export Failed",
//         message: "An error occurred while generating the export.",
//         type: "error",
//       });
//     }
//   };

//   return (
//     <div className="space-y-6 sm:space-y-8">
//       <PageHeader
//         title="Results"
//         subtitle="Manage and review students' academic results."
//       />

//       {isInitialLoad ? (
//         <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
//           {Array.from({ length: 4 }).map((_, i) => (
//             <StatCardSkeleton key={`stat-${i}`} />
//           ))}
//         </div>
//       ) : (
//         <ResultStats stats={resultStats} />
//       )}

//       <ResultToolbar
//         search={search}
//         setSearch={setSearch}
//         session={session}
//         setSession={setSession}
//         semester={semester}
//         setSemester={setSemester}
//         level={level}
//         setLevel={setLevel}
//         department={department}
//         setDepartment={setDepartment}
//         filters={filterOptions}
//         onExport={handleExport}
//       />

//       {selectedRows.length > 0 && (
//         <BulkActionBar
//           count={selectedRows.length}
//           itemLabel="results"
//           onClearSelection={clearSelection}
//           onExport={handleExport}
//           onApprove={handleBulkApprove}
//           onSuspend={handleBulkSuspend}
//           onDelete={handleBulkDelete}
//         />
//       )}

//       <ResultsTable
//         columns={resultColumns}
//         results={results}
//         loading={loading}
//         onRefresh={fetchResults}
//         totalItems={pagination.total || 0}
//         totalPages={pagination.totalPages || 1}
//         currentPage={currentPage}
//         onPageChange={setCurrentPage}
//         pageSize={pageSize}
//         sortKey={sortKey}
//         sortDirection={sortDirection}
//         onSort={handleSort}
//         selectable
//         selectedRows={selectedRows}
//         onRowSelect={handleRowSelect}
//         onSelectAll={handleSelectAll}
//       />
//     </div>
//   );
// }

// export default AllResults;

import { useEffect, useState } from "react";
import { useToast } from "../../context/ToastContext";
import { exportToCSV } from "../../utils/exportCsv";
import PageHeader from "../../components/common/PageHeader";
import ResultStats from "../../components/admin/results/ResultStats";
import ResultToolbar from "../../components/admin/results/ResultToolbar";
import ResultsTable from "../../components/admin/results/ResultsTable";
import BulkActionBar from "../../components/admin/common/BulkActionBar";

import { resultService } from "../../services/admin/resultService";
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

  const [department, setDepartment] = useState("");

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
      const queryParams = {
        page: currentPage,
        limit: pageSize,
        search: search || undefined,
        sessionId: session || undefined,
        semesterId: semester || undefined,
        levelId: level || undefined,
        departmentId: department || undefined,
        sort: sortKey,
        order: sortDirection,
      };

      const cleanParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, v]) => v !== undefined),
      );

      const response = await resultService.getResults(cleanParams);

      // === SMART MAPPING ===
      const rawData = response.data || response.results || [];
      const formattedResults = rawData.map((r) => {
        // Check if the data is nested (backend raw) or flattened (frontend mapped)
        const isNested = r.student && typeof r.student === "object";

        return {
          ...r, // Keep existing flat properties intact to prevent UI blanks!
          id: r.id,

          // Required IDs for the Edit Payload
          studentId: isNested ? r.student.id : r.studentId || r.student_id,
          courseId: isNested ? r.course.id : r.courseId || r.course_id,
          sessionId: isNested ? r.session.id : r.sessionId || r.session_id,
          semesterId: isNested ? r.semester.id : r.semesterId || r.semester_id,

          // Safely map UI properties
          studentName: isNested
            ? `${r.student.firstName || ""} ${r.student.lastName || ""}`.trim()
            : r.studentName,
          matricNumber: isNested ? r.student.matricNumber : r.matricNumber,
          code: isNested ? r.course.code : r.code,
          course: isNested ? r.course.title : r.course,
          unit: isNested ? r.course.creditUnit : r.unit,
          caScore: r.caScore,
          examScore: r.examScore,
          score: isNested ? r.totalScore : r.score || r.totalScore,
          grade: r.grade,
          gradePoint: r.gradePoint,
          remark: r.remark,
          status: isNested ? (r.isApproved ? "Approved" : "Pending") : r.status,
          session: isNested ? r.session.name : r.session || r.sessionName,
          semester: isNested ? r.semester.name : r.semester || r.semesterName,
        };
      });

      setResults(formattedResults);

      if (response.pagination) {
        setPagination(response.pagination);
      }

      const statistics = await resultService.getResultStatistics({
        search: search || undefined,
        sessionId: session || undefined,
        semester: semester || undefined,
        departmentId: department || undefined,
      });

      setResultStats(statistics);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  };

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
  }, [search, session, semester, level, department]);

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
        limit: 100000,
      };

      const cleanParams = Object.fromEntries(
        Object.entries(queryParams).filter(([_, v]) => v !== undefined),
      );

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

      if (selectedRows && selectedRows.length > 0) {
        dataToExport = dataToExport.filter((item) =>
          selectedRows.includes(item.id),
        );
      }

      const exportData = dataToExport.map((r) => {
        const isNested = r.student && typeof r.student === "object";
        return {
          "Student Name": isNested
            ? `${r.student.firstName || ""} ${r.student.lastName || ""}`.trim()
            : r.studentName || "N/A",
          "Matric No": isNested
            ? r.student.matricNumber
            : r.matricNumber || "N/A",
          "Course Code": isNested ? r.course.code : r.code || "N/A",
          "Course Title": isNested ? r.course.title : r.course || "N/A",
          Units: isNested ? r.course.creditUnit : r.unit || 0,
          "CA Score": r.caScore || 0,
          "Exam Score": r.examScore || 0,
          "Total Score": isNested ? r.totalScore : r.score || 0,
          Grade: r.grade || "N/A",
          "Grade Point": r.gradePoint || 0,
          Remark: r.remark || "N/A",
          Session: isNested ? r.session.name : r.session || "N/A",
          Semester: isNested ? r.semester.name : r.semester || "N/A",
          Status: isNested
            ? r.isApproved
              ? "Approved"
              : "Pending"
            : r.status || "N/A",
        };
      });

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
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Results"
        subtitle="Manage and review students' academic results."
      />

      {isInitialLoad ? (
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
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
        department={department}
        setDepartment={setDepartment}
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
