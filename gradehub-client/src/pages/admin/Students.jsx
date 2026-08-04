import PageHeader from "../../components/common/PageHeader";
import StudentStats from "../../components/admin/students/StudentStats";
import { useState, useEffect } from "react";
import StudentToolbar from "../../components/admin/students/StudentToolbar";
import StudentsTable from "../../components/admin/students/StudentsTable";
import BulkActionBar from "../../components/admin/common/BulkActionBar";
import {
  students,
  studentStatistics,
  studentFilters,
} from "../../constants/admin/students";
import { studentColumns } from "../../constants/tables/studentColumns";
import { filterStudents, sortStudents } from "../../utils/studentFilters";

function Students() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);

  const pageSize = 8;

  const filteredStudents = filterStudents(students, {
    search,
    department,
    level,
    status,
  });

  const sortedStudents = sortStudents(filteredStudents, sortKey, sortDirection);

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
  }, [search, department, level, status]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Students"
        subtitle="Manage student records and academic information."
      />

      <StudentStats stats={studentStatistics} />

      <StudentToolbar
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        level={level}
        setLevel={setLevel}
        status={status}
        setStatus={setStatus}
        filters={studentFilters}
      />

      {selectedRows.length > 0 && (
        <BulkActionBar
          count={selectedRows.length}
          itemLabel="students"
          onClearSelection={clearSelection}
          onExport={() => console.log("Export")}
          onSuspend={() => console.log("Suspend")}
          onDelete={() => console.log("Delete")}
        />
      )}

      <StudentsTable
        columns={studentColumns}
        students={sortedStudents}
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

export default Students;
