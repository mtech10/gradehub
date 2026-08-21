import { useState } from "react";
import { MoreHorizontal, FileText } from "lucide-react";
import Card from "../ui/Card";
import { THEME } from "../../constants/theme";
import Badge from "../ui/Badge";
import { resultsColumns } from "../../constants/tables/resultsColumns";
import DataTable from "../ui/DataTable";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

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
          <div className="min-w-0 max-w-[200px] sm:max-w-none">
            <p className="font-semibold text-slate-900">
              {row.code || row.courseCode}
            </p>
            <p className="text-xs sm:text-sm text-slate-500 truncate">
              {row.course || row.title || row.courseTitle || row.name}
            </p>
          </div>
        );

      case "unit":
        
        return (
          row.unit ?? row.creditUnit ?? row.credit_unit ?? row.creditunit ?? "-"
        );

      case "score":
        return `${row.score ?? row.totalScore ?? 0}%`;

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

  const modalFooter = (
    <Button
      onClick={() => setSelectedResult(null)}
      className="w-full justify-center bg-slate-900 hover:bg-slate-800"
    >
      Close Details
    </Button>
  );

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
              className={`${THEME.linkButton.base} ${THEME.linkButton.primary} text-xs sm:text-sm`}
            >
              View All Results
            </button>
          ) : null
        }
      >
        <div className="p-3 sm:p-5">
          <DataTable
            columns={resultsColumns}
            data={results}
            renderCell={renderCell}
            pagination={Boolean(pagination)}
            currentPage={currentPage}
            totalPages={pagination?.totalPages ?? 1}
            totalItems={pagination?.total ?? results.length}
            pageSize={pagination?.limit ?? 10}
            serverPagination={true}
            itemLabel="results"
            onPageChange={onPageChange}
          />
        </div>
      </Card>

      {}
      <Modal
        isOpen={!!selectedResult}
        onClose={() => setSelectedResult(null)}
        title="Result Details"
        subtitle={
          <>
            <span className="font-semibold text-blue-600">
              {selectedResult?.code}
            </span>
            <span className="text-slate-500 ml-1.5">
              — {selectedResult?.course}
            </span>
          </>
        }
        footer={modalFooter}
        maxWidth="max-w-sm"
      >
        {selectedResult && (
          <div className="space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-600">Continuous Assessment (CA)</span>
              <span className="font-semibold text-slate-900">
                {selectedResult.caScore ?? "-"}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-600">Examination Score</span>
              <span className="font-semibold text-slate-900">
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
        )}
      </Modal>
    </>
  );
}

export default ResultsTable;
