import Card from "../../ui/Card";
import FileUpload from "../../ui/FileUpload";
import Button from "../../ui/Button";
import { Download, CheckCircle2 } from "lucide-react";

function UploadDropzone({ formData, updateField }) {
  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
          2. Upload File
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Upload your Excel result sheet.
        </p>
      </div>

      <FileUpload
        label="Excel Result Sheet"
        title="Upload Result Sheet"
        description="Drag and drop an Excel file or browse your computer."
        accept=".xlsx,.xls"
        helperText="Supported formats: .xlsx, .xls • Maximum size: 10MB"
        value={formData.file}
        onChange={(file) => updateField("file", file)}
      />

      <div className="mt-6 sm:mt-8 rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
        <h4 className="mb-3 font-semibold text-slate-900 text-sm sm:text-base">
          File Requirements
        </h4>

        <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
          <li className="flex gap-2">
            <CheckCircle2
              size={16}
              className="mt-0.5 text-green-600 shrink-0"
            />
            <span>Use the official GradeHub Excel template.</span>
          </li>

          <li className="flex gap-2">
            <CheckCircle2
              size={16}
              className="mt-0.5 text-green-600 shrink-0"
            />
            <span>The first row must contain the required column headers.</span>
          </li>

          <li className="flex gap-2">
            <CheckCircle2
              size={16}
              className="mt-0.5 text-green-600 shrink-0"
            />
            <span>
              Student matric numbers must already exist in the system.
            </span>
          </li>

          <li className="flex gap-2">
            <CheckCircle2
              size={16}
              className="mt-0.5 text-green-600 shrink-0"
            />
            <span>Scores must fall within the approved grading range.</span>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <a
          href="/templates/results_template.csv"
          download
          className="inline-block w-full sm:w-auto"
        >
          <Button
            type="button"
            variant="secondary"
            className="w-full sm:w-auto justify-center"
          >
            <Download size={18} className="mr-2" />
            Download Template
          </Button>
        </a>
      </div>
    </Card>
  );
}

export default UploadDropzone;
