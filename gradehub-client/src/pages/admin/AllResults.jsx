import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";

import ResultStats from "../../components/admin/results/ResultStats";
import ResultToolbar from "../../components/admin/results/ResultToolbar";
import ResultsTable from "../../components/admin/results/ResultsTable";

import BulkActionBar from "../../components/admin/common/BulkActionBar";

import { results } from "../../constants/admin/results";
import { students } from "../../constants/admin/students";
import { courses } from "../../constants/admin/courses";

function AllResults() {
  const [search, setSearch] = useState("");

  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");
  const [level, setLevel] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const [selectedRows, setSelectedRows] = useState([]);

  const pageSize = 8;

  const resultsWithDetails = results.map((result) => {
    const student = students.find((s) => s.id === result.studentId);

    const course = courses.find((course) => course.code === result.courseCode);

    return {
      ...result,

      studentName: student?.fullName,

      matricNumber: student?.matricNumber,

      department: student?.department,

      level: student?.level,

      courseTitle: course?.title,

      unit: course?.unit,
    };
  });

  const filteredResults = resultsWithDetails.filter((result) => {
    const matchesSearch =
      result.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      result.matricNumber?.toLowerCase().includes(search.toLowerCase()) ||
      result.courseCode?.toLowerCase().includes(search.toLowerCase()) ||
      result.courseTitle?.toLowerCase().includes(search.toLowerCase());

    const matchesSession = !session || result.session === session;

    const matchesSemester = !semester || result.semester === semester;

    const matchesLevel = !level || result.level === level;
    return matchesSearch && matchesSession && matchesSemester && matchesLevel;
  });

  const sortedResults = [...filteredResults];

  if (sortKey) {
    sortedResults.sort((a, b) => {
      const first = String(a[sortKey]).toLowerCase();
      const second = String(b[sortKey]).toLowerCase();

      if (first < second) return sortDirection === "asc" ? -1 : 1;

      if (first > second) return sortDirection === "asc" ? 1 : -1;

      return 0;
    });
  }

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

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [search, session, semester, level]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Results"
        subtitle="Manage and review students' academic results."
      />

      <ResultStats />

      <ResultToolbar
        search={search}
        setSearch={setSearch}
        session={session}
        setSession={setSession}
        semester={semester}
        setSemester={setSemester}
        level={level}
        setLevel={setLevel}
      />

      {selectedRows.length > 0 && (
        <BulkActionBar
          count={selectedRows.length}
          itemLabel="results"
          onClearSelection={clearSelection}
          onExport={() => console.log("Export")}
          onSuspend={() => console.log("Approve")}
          onDelete={() => console.log("Delete")}
        />
      )}

      <ResultsTable
        results={sortedResults}
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
