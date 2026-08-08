import { SCROLLBAR } from "../../constants/layout";
import Card from "../ui/Card";
import { THEME } from "../../constants/theme";
import Badge from "../ui/Badge";
import { resultsColumns } from "../../constants/tables/resultsColumns";
import DataTable from "../ui/DataTable";

function ResultsTable({
  title = "Results",
  subtitle = "Published course results",
  showHeaderAction = false,
  results = [],
  pagination,
  currentPage = 1,
  onPageChange,
}) {
  const renderCell = (row, column) => {
    switch (column.key) {
      case "course":
        return (
          <div>
            <p className="font-semibold text-slate-900">{row.code}</p>

            <p className="text-sm text-slate-500">{row.course}</p>
          </div>
        );

      case "unit":
        return row.unit ?? "-";

      case "score":
        return `${row.score ?? 0}%`;

      case "grade":
        return <Badge variant="success">{row.grade ?? "-"}</Badge>;

      case "status":
        return (
          <Badge variant={row.status === "Approved" ? "success" : "warning"}>
            {row.status ?? "Pending"}
          </Badge>
        );

      default:
        return row[column.key] ?? "-";
    }
  };
  return (
    <Card
      title={title}
      subtitle={subtitle}
      padding="none"
      headerAction={
        showHeaderAction ? (
          <button
            type="button"
            className={`${THEME.linkButton.base} ${THEME.linkButton.primary}`}
          >
            View All Results
          </button>
        ) : null
      }
    >
      <div className="max-h-[560px] overflow-auto">
        <div className={`${SCROLLBAR}`}>
          <DataTable
            columns={resultsColumns}
            data={results}
            renderCell={renderCell}
            pagination
            currentPage={currentPage}
            totalPages={pagination?.totalPages ?? 1}
            totalItems={pagination?.total ?? results.length}
            pageSize={pagination?.limit ?? 10}
            serverPagination={true}
            itemLabel="results"
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </Card>
  );
}

export default ResultsTable;
