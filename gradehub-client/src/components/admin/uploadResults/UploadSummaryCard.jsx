import Card from "../../ui/Card";

function SummaryRow({ label, value, color = "text-slate-900" }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-0 gap-2">
      <span className="text-xs sm:text-sm text-slate-600">{label}</span>
      <span className={`font-semibold text-xs sm:text-sm ${color}`}>
        {value}
      </span>
    </div>
  );
}

function UploadSummaryCard({ validation }) {
  const summary = validation?.summary;

  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">
          Upload Summary
        </h3>

        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Results will appear here after validation.
        </p>
      </div>

      <SummaryRow label="Total Rows" value={summary?.totalRows ?? "--"} />

      <SummaryRow
        label="Valid Records"
        value={summary?.validRows ?? "--"}
        color="text-green-600"
      />

      <SummaryRow
        label="Invalid Records"
        value={summary?.invalidRows ?? "--"}
        color="text-red-600"
      />

      <SummaryRow
        label="Ready to Upload"
        value={
          validation
            ? summary?.validRows > 0 && summary?.invalidRows === 0
              ? "Yes"
              : "No"
            : "--"
        }
        color={
          validation && summary?.validRows > 0 && summary?.invalidRows === 0
            ? "text-green-600"
            : "text-slate-900"
        }
      />
    </Card>
  );
}

export default UploadSummaryCard;
