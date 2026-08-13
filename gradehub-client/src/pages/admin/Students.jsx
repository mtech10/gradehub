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
import StatCardSkeleton from "../../components/ui/skeletons/StatCardSskeleton";

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("lastname");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);
  const pageSize = 8;

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

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
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

        const cleanParams = Object.fromEntries(
          Object.entries(queryParams).filter(([_, v]) => v !== undefined),
        );

        const response = await studentService.getStudents(cleanParams);
        const payload = response.data?.pagination ? response.data : response;

        setStudents(payload.data || []);
        setPagination(payload.pagination || { total: 0, totalPages: 1 });
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchStudents();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, department, level, status, currentPage, sortKey, sortDirection]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [search, department, level, status]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await studentService.getStudentStats();
        const dbStats = response.data;

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
      } finally {
        setLoadingStats(false);
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

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete/deactivate this student?",
      )
    )
      return;
    try {
      await studentService.deleteStudent(id);
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Failed to delete student:", error);
      alert("Failed to delete student.");
    }
  };

  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedRows.length} students?`,
      )
    )
      return;

    try {
      for (const studentId of selectedRows) {
        await studentService.deleteStudent(studentId);
      }

      setStudents((prev) =>
        prev.filter((student) => !selectedRows.includes(student.id)),
      );
      setSelectedRows([]);
    } catch (error) {
      console.error("Failed to bulk delete students:", error);
      alert("Failed to delete selected students.");
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Students"
        subtitle="Manage student records and academic information."
      />

      {loadingStats ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <StudentStats stats={stats} />
      )}

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
          onDelete={handleBulkDelete}
        />
      )}

      <StudentsTable
        columns={studentColumns}
        students={students}
        loading={loading}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        totalItems={pagination?.total || 0}
        totalPages={pagination?.totalPages || 1}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
        onDelete={handleDelete}
        selectable
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
}

export default Students;
