import Card from "../../ui/Card";

function UploadPreviewCard({
  formData,
  validation,
  sessions,
  semesters,
  departments,
  levels,
  courseOptions,
}) {
  const hasFile = Boolean(formData.file);

  const getLabel = (options, value) => {
    return options?.find((option) => option.value === value)?.label || "-";
  };

  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">
          Upload Preview
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Review the selected upload details.
        </p>
      </div>

      {!hasFile ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center">
          <p className="text-sm text-slate-500">No file selected yet.</p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          <PreviewRow label="File Name" value={formData.file.name} />

          <PreviewRow
            label="Size"
            value={`${(formData.file.size / 1024).toFixed(2)} KB`}
          />

          <PreviewRow
            label="Session"
            value={getLabel(sessions, formData.sessionId)}
          />

          <PreviewRow
            label="Semester"
            value={getLabel(semesters, formData.semesterId)}
          />

          <PreviewRow
            label="Department"
            value={getLabel(departments, formData.departmentId)}
          />

          <PreviewRow
            label="Course"
            value={getLabel(courseOptions, formData.courseId)}
          />

          <PreviewRow
            label="Level"
            value={getLabel(levels, formData.levelId)}
          />

          <PreviewRow
            label="Upload Type"
            value={
              formData.uploadType === "supplementary"
                ? "Supplementary"
                : "New Results"
            }
          />

          {validation?.academic && (
            <>
              <div className="my-3 border-t border-slate-200" />

              <PreviewRow
                label="Validation Status"
                value="Validated successfully"
              />
            </>
          )}
        </div>
      )}
    </Card>
  );
}

function PreviewRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900 truncate text-right max-w-[60%]">
        {value}
      </span>
    </div>
  );
}

export default UploadPreviewCard;
