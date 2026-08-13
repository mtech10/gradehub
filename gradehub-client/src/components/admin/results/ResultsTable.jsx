import Badge from "../../ui/Badge";
import DataTable from "../../ui/DataTable";
import DropdownMenu from "../../ui/DropdownMenu";
import resultUploadService from "../../../services/admin/resultUploadService";

function ResultsTable({
  columns,
  results,
  onRefresh,
  totalItems,
  totalPages,
  currentPage,
  onPageChange,
  pageSize,
  loading,
  sortKey,
  sortDirection,
  onSort,
  selectable,
  selectedRows,
  onRowSelect,
  onSelectAll,
}) {
  // --- CONSISTENT ROW HANDLERS ---
  const handleApprove = async (id) => {
    try {
      await resultUploadService.approveResult(id);
      alert("Result approved successfully!");
      onRefresh?.(); // Smooth React state refresh instead of window.reload()
    } catch (error) {
      alert(error.message || "Failed to approve result.");
    }
  };

  const handleSuspend = async (id) => {
    if (!window.confirm("Are you sure you want to suspend this result?"))
      return;
    try {
      await resultUploadService.deactivateResult(id);
      alert("Result suspended successfully!");
      onRefresh?.();
    } catch (error) {
      alert(error.message || "Failed to suspend result.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this result?")) return;
    try {
      await resultUploadService.deleteResult(id);
      alert("Result deleted successfully!");
      onRefresh?.();
    } catch (error) {
      alert(error.message || "Failed to delete result.");
    }
  };

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
                onClick: () => navigate(`/admin/results/${result.id}`),
              },
              {
                label: "Edit Result",
                onClick: () => navigate(`/admin/results/${result.id}/edit`),
              },
              {
                label: "Approve Result",
                onClick: () => handleApprove(result.id),
              },
              {
                label: "Suspend Result", // <--- Added here
                onClick: () => handleSuspend(result.id),
              },
              {
                label: "Delete Result",
                onClick: () => handleDelete(result.id),
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
      loading={loading}
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
