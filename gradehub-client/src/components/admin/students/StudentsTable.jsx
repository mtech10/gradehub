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

  // Inside StudentsTable.jsx
  const renderCell = (student, column) => {
    switch (column.key) {
      case "matricNumber":
        return (
          <button
            onClick={() => navigate(`/admin/students/${student.id}`)}
            className="font-medium text-blue-600 hover:underline"
          >
            {student.matricNumber}
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
              {student.fullName}
            </button>
            <p className="text-sm text-slate-500">{student.email}</p>
          </div>
        );

      case "status":
        return (
          <Badge
            variant={
              student.status === "Active"
                ? "success"
                : student.status === "Graduated"
                  ? "info"
                  : student.status === "Deferred"
                    ? "warning"
                    : "danger"
            }
          >
            {student.status}
          </Badge>
        );

      // ✅ ADD THESE CASES to extract the string values from your backend objects
      case "department":
        return student.department?.name || "-";

      case "level":
        return student.level?.name || "-";

      case "session":
        return student.session?.name || "-";

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
        // If it reaches here with an object, React will crash.
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
