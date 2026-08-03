import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

function UploadPreviewCard({ formData }) {
  const hasFile = Boolean(formData.file);

  return (
    <Card className="p-4">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-slate-900">Upload Preview</h3>

        <p className="mt-1 text-sm text-slate-500">
          Review the selected upload.
        </p>
      </div>

      {!hasFile ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
          <p className="text-sm text-slate-500">No file selected yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <PreviewRow label="File Name" value={formData.file.name} />

          <PreviewRow
            label="Size"
            value={`${(formData.file.size / 1024).toFixed(2)} KB`}
          />

          <PreviewRow label="Session" value={formData.session || "-"} />

          <PreviewRow label="Semester" value={formData.semester || "-"} />

          <PreviewRow label="Department" value={formData.department || "-"} />

          <PreviewRow label="Course" value={formData.course || "-"} />

          <PreviewRow label="Level" value={formData.level || "-"} />
          <PreviewRow
            label="Upload Type"
            value={
              formData.uploadType === "supplementary"
                ? "Supplementary"
                : "New Results"
            }
          />
        </div>
      )}
    </Card>
  );
}

function PreviewRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-none">
      <span className="text-sm text-slate-500">{label}</span>

      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}

export default UploadPreviewCard;
