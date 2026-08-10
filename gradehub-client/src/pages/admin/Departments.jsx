import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import Select from "../../components/ui/Select";
import AdminStatCard from "../../components/admin/dashboard/AdminStatCard";
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";

import departmentService from "../../services/admin/departmentService";
import facultyService from "../../services/admin/facultyService";
import {
  departmentStatistics,
  departmentFilters,
} from "../../constants/admin/departments";

function Departments() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [facultyOptions, setFacultyOptions] = useState(
    departmentFilters.faculties,
  );

  // Real-time stats state mapped directly to the card titles
  const [stats, setStats] = useState({
    "Total Departments": 0,
    "Active Departments": 0,
    "Total Students": 0,
    "Total Courses": 0,
  });

  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
  });

  const [search, setSearch] = useState("");
  const [faculty, setFaculty] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch Stats and Faculties on Mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch stats
        const statsRes = await departmentService.getDepartmentStats();
        const statData = statsRes.data || statsRes;

        setStats({
          "Total Departments": parseInt(statData.total_departments, 10) || 0,
          "Active Departments": parseInt(statData.active_departments, 10) || 0,
          "Total Students": parseInt(statData.total_students, 10) || 0,
          "Total Courses": parseInt(statData.total_courses, 10) || 0,
        });

        // Fetch faculties for the search filter dropdown
        const facultyRes = await facultyService.getFaculties();
        const facData = facultyRes.data || facultyRes;
        if (Array.isArray(facData)) {
          const formattedFaculties = facData.map((f) => ({
            value: f.id,
            label: f.name,
          }));
          setFacultyOptions([
            { value: "", label: "All Faculties" },
            ...formattedFaculties,
          ]);
        }
      } catch (error) {
        console.error("Failed to load initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch Departments Table Data
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: pageSize,
          search: search || undefined,
          status:
            status === "Active"
              ? "active"
              : status === "Inactive"
                ? "inactive"
                : undefined,
          facultyId: faculty || undefined,
        };

        const response = await departmentService.getDepartments(params);
        setDepartments(response.data || []);
        if (response.pagination) {
          setPagination(response.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchDepartments();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, status, faculty, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, faculty]);

  const columns = [
    { key: "name", title: "Department" },
    { key: "code", title: "Code", align: "center" },
    { key: "hod", title: "Head of Department" },
    { key: "faculty_name", title: "Faculty" },
    { key: "status", title: "Status", align: "center" },
  ];

  const renderCell = (department, column) => {
    switch (column.key) {
      case "status":
        // Map the backend boolean 'isactive' or 'isActive' to a UI string
        const isActive = department.isActive || department.isactive;
        return (
          <Badge variant={isActive ? "green" : "red"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );

      case "faculty_name":
        return department.faculty_name || department.faculty?.name || "-";

      default:
        return department[column.key] || "-";
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Departments"
        subtitle="Manage all academic departments."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {departmentStatistics.map((stat) => (
          <AdminStatCard
            key={stat.title}
            {...stat}
            value={stats[stat.title] || 0}
            change=""
          />
        ))}
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid flex-1 gap-4 md:grid-cols-3">
          <SearchInput
            placeholder="Search departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            options={facultyOptions}
          />

          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={departmentFilters.status}
          />
        </div>

        <Button onClick={() => navigate("/admin/departments/add")}>
          <Plus size={18} />
          Add Department
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={departments}
        renderCell={renderCell}
        selectable
        pagination
        pageSize={pageSize}
        totalItems={pagination.totalItems || departments.length}
        currentPage={currentPage}
        totalPages={pagination.totalPages || 1}
        onPageChange={setCurrentPage}
        loading={loading}
        onRowClick={(department) =>
          navigate(`/admin/departments/${department.id}`)
        }
      />
    </div>
  );
}

export default Departments;
