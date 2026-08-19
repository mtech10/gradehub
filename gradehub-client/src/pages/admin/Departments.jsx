import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, LayoutGrid, Sliders } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import Select from "../../components/ui/Select";
import AdminStatCard from "../../components/admin/dashboard/AdminStatCard";
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";
import StatCardSkeleton from "../../components/ui/skeletons/StatCardSskeleton";

import departmentService from "../../services/admin/departmentService";
import facultyService from "../../services/admin/facultyService";
import {
  departmentStatistics,
  departmentFilters,
} from "../../constants/admin/departments";
import RegistrationRulesSettings from "./RegistrationRulesSettings";

function Departments() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("departments");

  const [departments, setDepartments] = useState([]);
  const [facultyOptions, setFacultyOptions] = useState(
    departmentFilters.faculties,
  );

  const [stats, setStats] = useState({
    "Total Departments": 0,
    "Active Departments": 0,
    "Total Students": 0,
    "Total Courses": 0,
  });

  const [loading, setLoading] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });

  const [search, setSearch] = useState("");
  const [faculty, setFaculty] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const statsRes = await departmentService.getDepartmentStats();
        const statData = statsRes.data || statsRes;

        setStats({
          "Total Departments": parseInt(statData.total_departments, 10) || 0,
          "Active Departments": parseInt(statData.active_departments, 10) || 0,
          "Total Students": parseInt(statData.total_students, 10) || 0,
          "Total Courses": parseInt(statData.total_courses, 10) || 0,
        });

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
      } finally {
        setLoadingStats(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (activeTab !== "departments") return;

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
  }, [search, status, faculty, currentPage, activeTab]);

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
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Departments"
        subtitle="Manage academic departments and configuration."
      />

      {/* --- TAB NAVIGATION (Horizontal scroll on mobile) --- */}
      <div className="flex gap-4 sm:gap-6 border-b border-slate-200 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("departments")}
          className={`flex items-center gap-2 pb-3 sm:pb-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "departments"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
        >
          <LayoutGrid size={16} />
          All Departments
        </button>
        <button
          onClick={() => setActiveTab("rules")}
          className={`flex items-center gap-2 pb-3 sm:pb-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "rules"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
          }`}
        >
          <Sliders size={16} />
          Unit Limits / Rules
        </button>
      </div>

      {/* --- TAB CONTENT --- */}
      {activeTab === "departments" ? (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {loadingStats
              ? Array.from({ length: 4 }).map((_, i) => (
                  <StatCardSkeleton key={i} />
                ))
              : departmentStatistics.map((stat) => (
                  <AdminStatCard
                    key={stat.title}
                    {...stat}
                    value={stats[stat.title] || 0}
                    change=""
                  />
                ))}
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:flex-row lg:items-center lg:justify-between shadow-sm">
            <div className="grid flex-1 gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <SearchInput
                placeholder="Search departments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />

              <Select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value)}
                options={facultyOptions}
                className="w-full"
              />

              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={departmentFilters.status}
                className="w-full sm:col-span-2 lg:col-span-1"
              />
            </div>

            <Button
              onClick={() => navigate("/admin/departments/add")}
              className="w-full sm:w-auto justify-center shrink-0"
            >
              <Plus size={18} className="mr-1.5" />
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
            totalItems={pagination.total || departments.length || 0}
            currentPage={currentPage}
            totalPages={pagination.totalPages || 1}
            onPageChange={setCurrentPage}
            loading={loading}
            serverPagination={true}
            onRowClick={(department) =>
              navigate(`/admin/departments/${department.id}`)
            }
          />
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <RegistrationRulesSettings />
        </div>
      )}
    </div>
  );
}

export default Departments;
