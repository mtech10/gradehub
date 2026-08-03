import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import SearchInput from "../../components/ui/SearchInput";
import Select from "../../components/ui/Select";
import AdminStatCard from "../../components/admin/dashboard/AdminStatCard";
import DataTable from "../../components/ui/DataTable";
import Badge from "../../components/ui/Badge";

import {
  departments,
  departmentStatistics,
  departmentFilters,
} from "../../constants/admin/departments";

function Departments() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [faculty, setFaculty] = useState("");
  const [status, setStatus] = useState("");

  const filteredDepartments = useMemo(() => {
    return departments.filter((department) => {
      const matchesSearch =
        department.name.toLowerCase().includes(search.toLowerCase()) ||
        department.code.toLowerCase().includes(search.toLowerCase()) ||
        department.hod.toLowerCase().includes(search.toLowerCase());

      const matchesFaculty = !faculty || department.faculty === faculty;

      const matchesStatus = !status || department.status === status;

      return matchesSearch && matchesFaculty && matchesStatus;
    });
  }, [search, faculty, status]);

  const columns = [
    {
      key: "name",
      title: "Department",
    },
    {
      key: "code",
      title: "Code",
      align: "center",
    },
    {
      key: "hod",
      title: "Head of Department",
    },
    {
      key: "students",
      title: "Students",
      align: "center",
    },
    {
      key: "courses",
      title: "Courses",
      align: "center",
    },
    {
      key: "status",
      title: "Status",
      align: "center",
    },
  ];

  const renderCell = (department, column) => {
    switch (column.key) {
      case "status":
        return (
          <Badge variant={department.status === "Active" ? "green" : "red"}>
            {department.status}
          </Badge>
        );

      default:
        return department[column.key];
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
          <AdminStatCard key={stat.title} {...stat} />
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
            options={departmentFilters.faculties}
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
        data={filteredDepartments}
        renderCell={renderCell}
        selectable
        pagination
        pageSize={10}
        totalItems={filteredDepartments.length}
        currentPage={1}
        totalPages={1}
        onPageChange={() => {}}
        onRowClick={(department) =>
          navigate(`/admin/departments/${department.id}`)
        }
      />
    </div>
  );
}

export default Departments;
