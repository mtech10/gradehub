import { useState, useRef } from "react";
import { UploadCloud, FileSpreadsheet, X, Download } from "lucide-react";
import Button from "../../ui/Button";

function BulkUploadModal({
  isOpen,
  onClose,
  onUpload,
  title = "Upload Excel File",
  entityName = "records",
  templateUrl,
  departments = [],
  levels = [],
  requireContext = false,
}) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [departmentId, setDepartmentId] = useState("");
  const [levelId, setLevelId] = useState("");

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (selectedFile) => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
      "text/csv",
    ];

    if (
      !validTypes.includes(selectedFile.type) &&
      !selectedFile.name.match(/\.(xlsx|xls|csv)$/i)
    ) {
      alert("Please upload a valid Excel or CSV file.");
      return;
    }
    setFile(selectedFile);
  };

  const handleUploadClick = async () => {
    console.log(
      "Submitting modal with - Dept:",
      departmentId,
      "Level:",
      levelId,
    ); // <-- Check browser console
    if (!file) return;
    try {
      setIsUploading(true);
      await onUpload(file, { departmentId, levelId });
      handleClose();
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setDepartmentId("");
    setLevelId("");
    setIsUploading(false);
    onClose();
  };

  // Validates that file is chosen AND if context is required, both dropdowns are selected
  const isFormValid = file && (!requireContext || (departmentId && levelId));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <button
            onClick={handleClose}
            disabled={isUploading}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <p className="mb-6 text-sm text-slate-600">
            Select the destination department and level, then upload your file
            to bulk import {entityName}.
          </p>

          {/* --- DEPARTMENT & LEVEL DROPDOWNS --- */}
          {requireContext && (
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Department
                </label>
                <select
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Department...</option>
                  {departments.map((d) => (
                    <option key={d.value || d.id} value={d.value || d.id}>
                      {d.label || d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Level
                </label>
                <select
                  value={levelId}
                  onChange={(e) => setLevelId(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Level...</option>
                  {levels.map((l) => (
                    <option key={l.value || l.id} value={l.value || l.id}>
                      {l.label || l.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* File Upload Area */}
          {!file ? (
            <div
              className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadCloud
                size={40}
                className={`mb-4 ${isDragging ? "text-blue-500" : "text-slate-400"}`}
              />
              <p className="mb-1 text-sm font-medium text-slate-700">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-slate-500">
                XLSX, XLS, or CSV (max. 5MB)
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xlsx, .xls, .csv"
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 p-4">
              <div className="flex items-center space-x-3 overflow-hidden">
                <FileSpreadsheet
                  size={24}
                  className="flex-shrink-0 text-blue-600"
                />
                <div className="truncate">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={() => setFile(null)}
                disabled={isUploading}
                className="p-1 text-slate-400 hover:text-red-500"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {templateUrl && (
            <div className="mt-6 flex justify-center">
              <a
                href={templateUrl}
                download
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                <Download size={16} className="mr-2" />
                Download Template
              </a>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 rounded-b-2xl border-t border-slate-100 bg-slate-50 px-6 py-4">
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUploadClick}
            disabled={!isFormValid || isUploading}
          >
            {isUploading ? "Uploading..." : `Upload ${entityName}`}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BulkUploadModal;
