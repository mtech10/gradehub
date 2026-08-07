import { useState, useEffect } from "react";
import PageHeader from "../../components/common/PageHeader";
import StudentStats from "../../components/admin/students/StudentStats";
import StudentToolbar from "../../components/admin/students/StudentToolbar";
import StudentsTable from "../../components/admin/students/StudentsTable";
import BulkActionBar from "../../components/admin/common/BulkActionBar";

import {
  studentStatistics,
  studentFilters,
} from "../../constants/admin/students";
import { studentColumns } from "../../constants/tables/studentColumns";

import { Users, UserCheck, UserMinus, Building } from "lucide-react";
import { studentService } from "../../services/admin/studentService";

function Students() {
  // --- States ---
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  // --- Filter & Sort States ---
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("lastname"); // Matches your backend default
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);
  const pageSize = 8;

  // Update your stats state to this:
  const [stats, setStats] = useState([
    {
      title: "Total Students",
      value: "0",
      subtitle: "All registered students",
      icon: Users,
      color: "blue",
    },
    {
      title: "Active Students",
      value: "0",
      subtitle: "Currently enrolled",
      icon: UserCheck,
      color: "green",
    },
    {
      title: "Inactive Students",
      value: "0",
      subtitle: "Graduated or deferred",
      icon: UserMinus,
      color: "amber",
    },
    {
      title: "Departments",
      value: "0",
      subtitle: "Represented departments",
      icon: Building,
      color: "purple",
    },
  ]);
  // --- Fetch Data from Express API ---
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        // Build the query parameters exactly as your Express controller expects them
        const queryParams = {
          page: currentPage,
          limit: pageSize,
          search: search || undefined,
          status: status || undefined,
          departmentId: department || undefined,
          levelId: level || undefined,
          sort: sortKey,
          order: sortDirection,
        };

        // Remove undefined keys so they don't bloat the URL
        const cleanParams = Object.fromEntries(
          Object.entries(queryParams).filter(([_, v]) => v !== undefined),
        );

        const response = await studentService.getStudents(cleanParams);

        setStudents(response.data);
        setPagination(response.pagination);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    // Use a debounce for search if you type fast, otherwise standard timeout
    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 300); // 300ms delay prevents spamming the database on every keystroke

    return () => clearTimeout(delayDebounceFn);
  }, [search, department, level, status, currentPage, sortKey, sortDirection]);

  // Reset to page 1 and clear selections when filters change
  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [search, department, level, status]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await studentService.getStudentStats();
        const dbStats = response.data;

        // Map the database row to your AdminStatCard format
        const mappedStats = [
          {
            title: "Total Students",
            value: dbStats.total_students.toString(),
            subtitle: "All registered students",
            icon: Users,
            color: "blue",
          },
          {
            title: "Active Students",
            value: dbStats.active_students.toString(),
            subtitle: "Currently enrolled",
            icon: UserCheck,
            color: "green",
          },
          {
            title: "Inactive Students",
            value: dbStats.inactive_students.toString(),
            subtitle: "Graduated or deferred",
            icon: UserMinus,
            color: "amber",
          },
          {
            title: "Departments",
            value: dbStats.total_departments.toString(),
            subtitle: "Represented departments",
            icon: Building,
            color: "purple",
          },
        ];

        setStats(mappedStats);
      } catch (error) {
        console.error("Failed to fetch student stats:", error);
      }
    };

    fetchStats();
  }, []);

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

  return (
    <div className="space-y-8">
      <PageHeader
        title="Students"
        subtitle="Manage student records and academic information."
      />

      {/* Note: If you want these stats to be dynamic, you will need a separate API call for them! */}
      <StudentStats stats={stats} />

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
        students={students}
        loading={loading} // Pass the loading state so DataTable can show skeletons
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        totalItems={pagination.total}
        totalPages={pagination.totalPages}
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
