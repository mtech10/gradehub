import { useNavigate } from "react-router-dom";

import Badge from "../../ui/Badge";
import DataTable from "../../ui/DataTable";
import DropdownMenu from "../../ui/DropdownMenu";

function CoursesTable({
  courses,
  columns,

  currentPage,
  onPageChange,
  pageSize,

  totalItems,
  totalPages,

  sortKey,
  sortDirection,
  onSort,

  selectable,
  selectedRows,
  onRowSelect,
  onSelectAll,

  loading,
}) {
  const navigate = useNavigate();

  const renderCell = (course, column) => {
    switch (column.key) {
      case "code":
        return (
          <button
            onClick={() => navigate(`${course.id}`)}
            className="font-medium text-blue-600 hover:underline"
          >
            {course.code}
          </button>
        );

      case "title":
        return (
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`${course.id}`);
              }}
              className="font-semibold text-slate-900 transition-colors hover:text-blue-600"
            >
              {course.title}
            </button>

            <p className="text-sm text-slate-500">
              {course.department?.name || course.department_name || "-"}
            </p>
          </div>
        );

      case "unit":
        return course.creditUnit ?? course.creditunit ?? "-";

      case "level":
        return course.level?.name || course.level_name || "-";

      case "semester":
        return course.semester?.name || course.semester_name || "-";

      case "status":
        const isActive = course.isActive ?? course.isactive ?? true;
        return (
          <Badge variant={isActive ? "success" : "danger"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );

      case "actions":
        return (
          <DropdownMenu
            items={[
              {
                label: "View Course",
                onClick: () => navigate(`/admin/courses/${course.id}`),
              },
              {
                label: "Edit Course",
                onClick: () => navigate(`/admin/courses/${course.id}/edit`),
              },
              {
                label: "Assign Lecturer",
                onClick: () => {},
              },
              {
                label:
                  (course.isActive ?? course.isactive)
                    ? "Archive Course"
                    : "Restore Course",
                onClick: () => {},
              },
            ]}
          />
        );

      default:
        return course[column.key] ?? "-";
    }
  };

  return (
    <DataTable
      columns={columns}
      data={courses}
      renderCell={renderCell}
      loading={loading}
      currentPage={currentPage}
      onPageChange={onPageChange}
      pageSize={pageSize}
      totalItems={totalItems}
      totalPages={totalPages}
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={onSort}
      selectable={selectable}
      selectedRows={selectedRows}
      onRowSelect={onRowSelect}
      onSelectAll={onSelectAll}
      serverPagination
      itemLabel="courses"
    />
  );
}

export default CoursesTable;
