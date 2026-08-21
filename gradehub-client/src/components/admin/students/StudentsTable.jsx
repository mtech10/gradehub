import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Badge from "../../ui/Badge";
import DataTable from "../../ui/DataTable";
import DropdownMenu from "../../ui/DropdownMenu";
import ConfirmModal from "../../ui/ConfirmModal";

function StudentsTable({
  students,
  currentPage,
  onPageChange,
  pageSize,
  loading,
  totalItems,
  totalPages,
  onDelete,
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

  
  const [deleteConfig, setDeleteConfig] = useState({
    isOpen: false,
    studentId: null,
  });

  const executeDelete = () => {
    if (deleteConfig.studentId && onDelete) {
      onDelete(deleteConfig.studentId);
    }
    setDeleteConfig({ isOpen: false, studentId: null });
  };

  const renderCell = (student, column) => {
    const matric = student.matricNumber || student.matricnumber || "-";
    const fName =
      student.fullName ||
      `${student.firstName || student.firstname || ""} ${student.lastName || student.lastname || ""}`.trim() ||
      "Unknown Student";
    const studentStatus = student.status || "Active";
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
                onClick: () => navigate(`/admin/students/${student.id}/edit`),
              },
              {
                label: "Delete Student",
                onClick: () =>
                  setDeleteConfig({ isOpen: true, studentId: student.id }),
                className: "text-red-600 hover:bg-red-50",
              },
            ]}
          />
        );

      default:
        return student[column.key];
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={students}
        renderCell={renderCell}
        pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalItems={totalItems}
        totalPages={totalPages}
        pageSize={pageSize}
        serverPagination={true}
        itemLabel="students"
        loading={loading}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={onSort}
        selectable={selectable}
        selectedRows={selectedRows}
        onRowSelect={onRowSelect}
        onSelectAll={onSelectAll}
      />

      {}
      <ConfirmModal
        isOpen={deleteConfig.isOpen}
        onClose={() => setDeleteConfig({ isOpen: false, studentId: null })}
        onConfirm={executeDelete}
        title="Delete Student"
        message="Are you sure you want to permanently delete this student? This action cannot be undone."
        confirmText="Delete"
        isDestructive={true}
      />
    </>
  );
}

export default StudentsTable;
