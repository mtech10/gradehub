import { useNavigate } from "react-router-dom";

import Badge from "../../ui/Badge";
import DataTable from "../../ui/DataTable";
import DropdownMenu from "../../ui/DropdownMenu";

function StudentsTable({
  students,
  currentPage,
  onPageChange,
  pageSize,

  sortKey,
  sortDirection,
  onSort,

  selectable,
  selectedRows,
  onRowSelect,
  onSelectAll,
  columns,
}) {
  const navigate = useNavigate();

  const renderCell = (student, column) => {
    // 1. Safely extract and normalize the data from PostgreSQL
    const matric = student.matricNumber || student.matricnumber || "-";
    const fName =
      student.fullName ||
      `${student.firstName || student.firstname || ""} ${student.lastName || student.lastname || ""}`.trim() ||
      "Unknown Student";
    const studentStatus = student.status || "Active"; // Fallback if status is null/empty in DB
    const studentCgpa = student.cgpa || student.cgpi || "0.00";

    switch (column.key) {
      case "matricNumber":
        return (
          <button
            onClick={() => navigate(`/admin/students/${student.id}`)}
            className="font-medium text-blue-600 hover:underline"
          >
            {matric}
          </button>
        );

      case "fullName":
        return (
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/admin/students/${student.id}`);
              }}
              className="font-semibold text-slate-900 transition-colors hover:text-blue-600"
            >
              {fName}
            </button>
            <p className="text-sm text-slate-500">{student.email}</p>
          </div>
        );

      case "status":
        return (
          <Badge
            variant={
              studentStatus === "Active"
                ? "success"
                : studentStatus === "Graduated"
                  ? "info"
                  : studentStatus === "Deferred"
                    ? "warning"
                    : "danger"
            }
          >
            {studentStatus}
          </Badge>
        );

      // Handle both object-style (student.department.name) and raw SQL alias (student.department_name)
      case "department":
        return (
          student.department?.name ||
          student.department_name ||
          student.department ||
          "-"
        );

      case "level":
        return (
          student.level?.name || student.level_name || student.level || "-"
        );

      case "session":
        return (
          student.session?.name ||
          student.session_name ||
          student.session ||
          "-"
        );

      // 2. Add the missing CGPA case
      case "cgpa":
        return (
          <span className="font-medium text-slate-700">{studentCgpa}</span>
        );

      case "actions":
        return (
          <DropdownMenu
            items={[
              {
                label: "View Profile",
                onClick: () => navigate(`/admin/students/${student.id}`),
              },
              {
                label: "Edit Student",
                onClick: () => {},
              },
              {
                label: "View Transcript",
                onClick: () => {},
              },
              {
                label: "View Results",
                onClick: () => {},
              },
            ]}
          />
        );

      default:
        return student[column.key];
    }
  };
  return (
    <DataTable
      columns={columns}
      data={students}
      renderCell={renderCell}
      pagination
      currentPage={currentPage}
      onPageChange={onPageChange}
      totalItems={students.length}
      totalPages={Math.ceil(students.length / pageSize) || 1}
      pageSize={pageSize}
      itemLabel="students"
      loading={false}
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={onSort}
      selectable={selectable}
      selectedRows={selectedRows}
      onRowSelect={onRowSelect}
      onSelectAll={onSelectAll}
    />
  );
}

export default StudentsTable;
