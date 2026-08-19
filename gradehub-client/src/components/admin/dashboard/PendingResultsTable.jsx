import { useNavigate } from "react-router-dom";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";
import DataTable from "../../ui/DataTable";
import { pendingResultsColumns } from "../../../constants/tables/pendingResultsColumns";

function PendingResultsTable({ results }) {
  const navigate = useNavigate();

  const renderCell = (result, column) => {
    switch (column.key) {
      case "courseCode":
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/results/${result.id}`);
            }}
            className="font-semibold text-blue-600 hover:underline"
          >
            {result.courseCode}
          </button>
        );
      case "status":
        return (
          <Badge
            variant={
              result.status === "Approved"
                ? "success"
                : result.status === "Awaiting Approval"
                  ? "primary"
                  : "warning"
            }
          >
            {result.status}
          </Badge>
        );
      default:
        return result[column.key];
    }
  };

  return (
    <div className="pt-0 lg:pt-5">
      <Card padding="none">
        {/* Responsive Header */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
          <div>
            <h3 className="text-lg font-semibold">
              Results Requiring Attention
            </h3>
            <p className="text-sm text-slate-500">
              Upload, approve or review academic results.
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => navigate("/admin/results")}
            className="w-full sm:w-auto"
          >
            View All
          </Button>
        </div>

        <DataTable
          columns={pendingResultsColumns}
          data={results}
          renderCell={renderCell}
          onRowClick={(result) => navigate(`/admin/results/${result.id}`)}
          totalItems={results?.length || 0}
        />
      </Card>
    </div>
  );
}

export default PendingResultsTable;
