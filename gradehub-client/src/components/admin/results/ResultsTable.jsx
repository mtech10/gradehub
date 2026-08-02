import Badge from "../../ui/Badge";
import DataTable from "../../ui/DataTable";
import DropdownMenu from "../../ui/DropdownMenu";

import { resultColumns } from "../../../constants/tables/resultColumns";

function ResultsTable({
  results,
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
            <p className="font-semibold text-slate-900">{result.studentName}</p>

            <p className="text-sm text-slate-500">{result.matricNumber}</p>
          </div>
        );

      case "courseCode":
        return (
          <div>
            <p className="font-medium text-blue-600">{result.courseCode}</p>

            <p className="text-sm text-slate-500">{result.courseTitle}</p>
          </div>
        );

      case "score":
        return <span className="font-medium">{result.score}</span>;

      case "grade":
        return <span className="font-semibold">{result.grade}</span>;

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
            {result.status}
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
        return result[column.key];
    }
  };

  return (
    <DataTable
      columns={resultColumns}
      data={results}
      renderCell={renderCell}
      pagination
      currentPage={currentPage}
      onPageChange={onPageChange}
      totalItems={results.length}
      totalPages={Math.ceil(results.length / pageSize) || 1}
      pageSize={pageSize}
      itemLabel="results"
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

export default ResultsTable;
