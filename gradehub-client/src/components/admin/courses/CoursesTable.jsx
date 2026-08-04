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

            <p className="text-sm text-slate-500">{course.department}</p>
          </div>
        );

      case "status":
        return (
          <Badge variant={course.status === "Active" ? "success" : "danger"}>
            {course.status}
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
                onClick: () => {},
              },
              {
                label: "Assign Lecturer",
                onClick: () => {},
              },
              {
                label: "Archive Course",
                onClick: () => {},
              },
            ]}
          />
        );

      default:
        return course[column.key];
    }
  };

  return (
    <DataTable
      columns={columns}
      data={courses}
      renderCell={renderCell}
      pagination
      currentPage={currentPage}
      onPageChange={onPageChange}
      totalItems={totalItems}
      totalItems={totalItems}
      pageSize={pageSize}
      itemLabel="courses"
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

export default CoursesTable;
