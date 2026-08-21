import { useRef } from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";

import Button from "./Button";

function FileUpload({
  label,
  title = "Drag & Drop File",
  description = "or click below to browse.",
  helperText,
  accept,
  value,
  onChange,
  required = false,
}) {
  const fileInputRef = useRef(null);

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onChange(file);
  };

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-sm font-semibold text-slate-700">
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      {}
      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept={accept}
        onChange={handleFileChange}
      />

      <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 transition hover:border-blue-500 hover:bg-blue-50">
        <div className="flex flex-col items-center text-center">
          <UploadCloud size={54} className="mb-5 text-slate-400" />

          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

          <p className="mt-2 text-sm text-slate-500">{description}</p>

          <Button
            type="button"
            variant="secondary"
            className="mt-6"
            onClick={handleBrowse}
          >
            Browse File
          </Button>

          {helperText && (
            <p className="mt-4 text-xs text-slate-500">{helperText}</p>
          )}
        </div>
      </div>

      {value && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={22} className="text-green-600" />

            <div>
              <p className="font-semibold text-green-700">{value.name}</p>

              <p className="text-sm text-green-600">
                {(value.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
