import { recentResults } from "../../constants/recentResults";
import { CARD_HEIGHT, SCROLLBAR } from "../../constants/layout";
import Card from "../ui/Card";

function RecentResults() {
  return (
    <Card
      title="Recent Results"
      subtitle="Latest published course results"
      padding="none"
      action={
        <button className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
          View All
        </button>
      }
    >
      <div className="max-h-[500px] overflow-auto">
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
              {recentResults.map((result) => (
                <tr
                  key={result.code}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {result.code}
                      </p>

                      <p className="text-sm text-slate-500">{result.course}</p>
                    </div>
                  </td>

                  <td>{result.unit}</td>

                  <td>{result.score}%</td>

                  <td>
                    <span className="font-semibold text-blue-600">
                      {result.grade}
                    </span>
                  </td>

                  <td>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      {result.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}

export default RecentResults;
