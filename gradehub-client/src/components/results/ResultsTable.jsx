import { useState } from "react";
import { MoreHorizontal, FileText, X } from "lucide-react";
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
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

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

      case "actions": {
        const uniqueKey = row.id || row.code;
        const isOpen = openDropdownId === uniqueKey;

        return (
          <div className="relative flex justify-end">
            <button
              type="button"
              onClick={() => setOpenDropdownId(isOpen ? null : uniqueKey)}
              className={`rounded-lg p-2 transition-colors hover:bg-slate-200 hover:text-slate-700 ${
                isOpen ? "bg-slate-200 text-slate-700" : "text-slate-400"
              }`}
            >
              <MoreHorizontal size={20} />
            </button>

            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setOpenDropdownId(null)}
                />

                <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg animate-in fade-in zoom-in-95 duration-100">
                  <button
                    onClick={() => {
                      setOpenDropdownId(null);
                      setSelectedResult(row);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600"
                  >
                    <FileText size={16} />
                    View Details
                  </button>
                </div>
              </>
            )}
          </div>
        );
      }

      default:
        return row[column.key] ?? "-";
    }
  };

  return (
    <>
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
        <div className="h-fit max-h-[420px] overflow-auto">
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

      {/* --- RESULT DETAILS MODAL --- */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Result Details
                </h3>
                <p className="text-sm font-medium text-blue-600 mt-1">
                  {selectedResult.code}
                </p>
                <p className="text-xs text-slate-500 line-clamp-1">
                  {selectedResult.course}
                </p>
              </div>
              <button
                onClick={() => setSelectedResult(null)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Score Breakdown */}
            <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm mt-6">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-600">
                  Continuous Assessment (CA)
                </span>
                <span className="font-medium text-slate-900">
                  {selectedResult.caScore ?? "-"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-600">Examination Score</span>
                <span className="font-medium text-slate-900">
                  {selectedResult.examScore ?? "-"}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-bold text-slate-900">Total Score</span>
                <span className="font-bold text-slate-900">
                  {selectedResult.score ?? "-"}%
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-bold text-slate-900">Final Grade</span>
                <span className="font-bold text-blue-600">
                  {selectedResult.grade ?? "-"}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedResult(null)}
                className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResultsTable;
