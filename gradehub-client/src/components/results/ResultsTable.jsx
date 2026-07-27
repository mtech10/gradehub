import { recentResults } from "../../constants/recentResults";
import { CARD_HEIGHT, SCROLLBAR } from "../../constants/layout";
import Card from "../ui/Card";
import { THEME } from "../../constants/theme";
import { getResultStatus } from "../../utils/resultUtils";
import Badge from "../ui/Badge";

function ResultsTable({
  title = "Results",
  subtitle = "Published course results",
  showHeaderAction = false,
}) {
  return (
    <Card
      title="Recent Results"
      subtitle="Latest published course results"
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
          {" "}
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Course
                </th>

                <th className="text-left text-sm font-semibold text-slate-600">
                  Unit
                </th>

                <th className="text-left text-sm font-semibold text-slate-600">
                  Score
                </th>

                <th className="text-left text-sm font-semibold text-slate-600">
                  Grade
                </th>

                <th className="text-left text-sm font-semibold text-slate-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentResults.map((result) => {
                const status = getResultStatus(result.score);

                return (
                  <tr
                    key={result.code}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {result.code}
                        </p>

                        <p className="text-sm text-slate-500">
                          {result.course}
                        </p>
                      </div>
                    </td>

                    <td>{result.unit}</td>

                    <td>{result.score}%</td>

                    <td>
                      <Badge variant={status.variant}>{status.grade}</Badge>
                    </td>

                    <td>
                      <Badge variant={status.variant}>{status.remark}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

export default ResultsTable;
