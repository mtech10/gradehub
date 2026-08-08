import Badge from "../../ui/Badge";
import DataTable from "../../ui/DataTable";
import DropdownMenu from "../../ui/DropdownMenu";

function ResultsTable({
  columns,
  results,
  totalItems,
  totalPages,
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
}) {
  const renderCell = (result, column) => {
    switch (column.key) {
      case "studentName":
        return (
          <div>
            <p className="font-semibold text-slate-900">
              {result.studentName || "Unknown"}
            </p>

            <p className="text-sm text-slate-500">
              {result.matricNumber || "-"}
            </p>
          </div>
        );

      case "courseCode":
        return (
          <div>
            <p className="font-medium text-blue-600">{result.code || "-"}</p>

            <p className="text-sm text-slate-500">{result.course || "-"}</p>
          </div>
        );

      case "score":
        return <span className="font-medium">{result.score ?? "-"}</span>;

      case "grade":
        return <span className="font-semibold">{result.grade || "-"}</span>;

      case "semester":
        return <span>{result.semester || "-"}</span>;

      case "session":
        return <span>{result.session || "-"}</span>;

      case "status":
        return (
          <Badge
            variant={
              result.status === "Approved"
                ? "success"
                : result.status === "Pending"
                  ? "warning"
                  : "danger"
            }
          >
            {result.status || "Pending"}
          </Badge>
        );

      case "actions":
        return (
          <DropdownMenu
            items={[
              {
                label: "View Result",
                onClick: () => {},
              },
              {
                label: "Edit Result",
                onClick: () => {},
              },
              {
                label: "Approve Result",
                onClick: () => {},
              },
              {
                label: "Delete Result",
                onClick: () => {},
              },
            ]}
          />
        );

      default:
        return result[column.key] ?? "-";
    }
  };

  return (
    <DataTable
      columns={columns}
      data={results}
      renderCell={renderCell}
      totalItems={totalItems}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={onPageChange}
      pageSize={pageSize}
      serverPagination
      sortKey={sortKey}
      sortDirection={sortDirection}
      onSort={onSort}
      selectable={selectable}
      selectedRows={selectedRows}
      onRowSelect={onRowSelect}
      onSelectAll={onSelectAll}
      getRowId={(row) => row.id}
    />
  );
}

export default ResultsTable;
