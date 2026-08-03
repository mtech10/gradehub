import Card from "../../ui/Card";

function SummaryRow({ label, value, color = "text-slate-900" }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-none">
      <span className="text-sm text-slate-500">{label}</span>

      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  );
}

function UploadSummaryCard() {
  return (
    <Card className="p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Upload Summary</h3>

        <p className="mt-1 text-sm text-slate-500">
          Results will appear here after validation.
        </p>
      </div>

      <SummaryRow label="Students Found" value="--" />

      <SummaryRow label="Valid Records" value="--" color="text-green-600" />

      <SummaryRow label="Warnings" value="--" color="text-amber-600" />

      <SummaryRow label="Errors" value="--" color="text-red-600" />

      <SummaryRow label="Ready to Upload" value="No" />
    </Card>
  );
}

export default UploadSummaryCard;
