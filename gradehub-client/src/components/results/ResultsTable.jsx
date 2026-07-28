import { recentResults } from "../../constants/recentResults";
import { CARD_HEIGHT, SCROLLBAR } from "../../constants/layout";
import Card from "../ui/Card";
import { THEME } from "../../constants/theme";
import { getResultStatus } from "../../utils/resultUtils";
import Badge from "../ui/Badge";
import { resultsColumns } from "../../constants/tables/resultsColumns";
import DataTable from "../ui/DataTable";

function ResultsTable({
  title = "Results",
  subtitle = "Published course results",
  showHeaderAction = false,
}) {
  const renderCell = (row, column) => {
    const status = getResultStatus(row.score);

    switch (column.key) {
      case "course":
        return (
          <div>
            <p className="font-semibold text-slate-900">{row.code}</p>

            <p className="text-sm text-slate-500">{row.course}</p>
          </div>
        );

      case "score":
        return `${row.score}%`;

      case "grade":
        return <Badge variant={status.variant}>{status.grade}</Badge>;

      case "status":
        return <Badge variant={status.variant}>{status.remark}</Badge>;

      default:
        return row[column.key];
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
        <div className={`${CARD_HEIGHT.lg} ${SCROLLBAR}`}>
          <DataTable
            columns={resultsColumns}
            data={recentResults}
            renderCell={renderCell}
          />
        </div>
      </div>
    </Card>
  );
}

export default ResultsTable;
