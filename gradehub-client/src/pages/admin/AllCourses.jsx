import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";

import CourseStats from "../../components/admin/courses/CourseStats";
import CourseToolbar from "../../components/admin/courses/CourseToolbar";
import CoursesTable from "../../components/admin/courses/CoursesTable";
import BulkActionBar from "../../components/admin/common/BulkActionBar";

import courseService from "../../services/admin/courseService";
import { getDepartments } from "../../services/admin/departmentService";
import { getLevels } from "../../services/admin/levelService";

import { courseColumns } from "../../constants/tables/courseColumns";

import { BookOpen, CheckCircle, GraduationCap, Clock3 } from "lucide-react";
import StatCardSkeleton from "../../components/ui/skeletons/StatCardSskeleton";

function AllCourses() {
  const [courses, setCourses] = useState([]);

  const [stats, setStats] = useState([
    {
      title: "Total Courses",
      value: 0,
      icon: BookOpen,
      color: "blue",
      subtitle: "Across all departments",
    },
    {
      title: "Active Courses",
      value: 0,
      icon: CheckCircle,
      color: "green",
      subtitle: "Currently active",
    },
    {
      title: "Departments",
      value: 0,
      icon: GraduationCap,
      color: "purple",
      subtitle: "Offering courses",
    },
    {
      title: "Pending Approval",
      value: 0,
      icon: Clock3,
      color: "amber",
      subtitle: "Awaiting approval",
    },
  ]);

  const [filters, setFilters] = useState({
    departments: [],
    levels: [],
    statuses: [
      { value: "", label: "All Status" },
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
  });

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });

  const [sortKey, setSortKey] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");

  const [selectedRows, setSelectedRows] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState("");

  const pageSize = 8;

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [departmentsResponse, levelsResponse] = await Promise.all([
          getDepartments({ limit: 100 }),
          getLevels({ limit: 100 }),
        ]);

        setFilters((prev) => ({
          ...prev,
          departments: [
            { value: "", label: "All Departments" },
            ...(departmentsResponse.data || []).map((department) => ({
              value: department.id,
              label: department.name,
            })),
          ],
          levels: [
            { value: "", label: "All Levels" },
            ...(levelsResponse.data || []).map((level) => ({
              value: level.id,
              label: level.name,
            })),
          ],
        }));
      } catch (error) {
        console.error("Failed to load course filters:", error);
      }
    };

    loadFilterOptions();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await courseService.getCourses({
          page: currentPage,
          limit: pageSize,
          search: search || undefined,
          departmentId: department || undefined,
          levelId: level || undefined,
          status: status || undefined,
          sort: sortKey,
          order: sortDirection,
        });

        setCourses(response.courses || []);

        setPagination(
          response.pagination || {
            total: 0,
            totalPages: 1,
          },
        );
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError(error.message || "Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchCourses, 300);

    return () => clearTimeout(debounce);
  }, [currentPage, search, department, level, status, sortKey, sortDirection]);

  useEffect(() => {
    const fetchCourseStatistics = async () => {
      try {
        const statistics = await courseService.getCourseStatistics();

        setStats((prev) =>
          prev.map((stat) => {
            switch (stat.title) {
              case "Total Courses":
                return {
                  ...stat,
                  value: statistics.totalCourses ?? 0,
                };
              case "Active Courses":
                return {
                  ...stat,
                  value: statistics.activeCourses ?? 0,
                };
              case "Departments":
                return {
                  ...stat,
                  value: statistics.departments ?? 0,
                };
              case "Pending Approval":
                return {
                  ...stat,
                  value: statistics.pendingApproval ?? 0,
                };
              default:
                return stat;
            }
          }),
        );
      } catch (error) {
        console.error("Failed to fetch course statistics:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchCourseStatistics();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [search, department, level, status]);

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
    <div>
      <PageHeader
        title="Courses"
        description="Manage courses and course assignments."
      />

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loadingStats ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <CourseStats stats={stats} />
      )}

      <CourseToolbar
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        level={level}
        setLevel={setLevel}
        status={status}
        setStatus={setStatus}
        filters={filters}
      />

      {selectedRows.length > 0 && (
        <BulkActionBar
          count={selectedRows.length}
          itemLabel="courses"
          onClearSelection={clearSelection}
          onExport={() => console.log("Export")}
          onSuspend={() => console.log("Archive")}
          onDelete={() => console.log("Delete")}
        />
      )}

      <CoursesTable
        columns={courseColumns}
        courses={courses}
        loading={loading}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        totalItems={pagination.total || 0}
        totalPages={pagination.totalPages || 1}
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

export default AllCourses;
