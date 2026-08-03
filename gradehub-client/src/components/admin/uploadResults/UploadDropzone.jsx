import Card from "../../ui/Card";
import FileUpload from "../../ui/FileUpload";
import Button from "../../ui/Button";
import { Download, CheckCircle2 } from "lucide-react";

function UploadDropzone({ formData, updateField }) {
  return (
    <Card className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">2. Upload File</h2>

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

      <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
        <h4 className="mb-4 font-semibold text-slate-900">File Requirements</h4>

        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex gap-2">
            <CheckCircle2 size={16} className="mt-0.5 text-green-600" />
            Use the official GradeHub Excel template.
          </li>

          <li className="flex gap-2">
            <CheckCircle2 size={16} className="mt-0.5 text-green-600" />
            The first row must contain the required column headers.
          </li>

          <li className="flex gap-2">
            <CheckCircle2 size={16} className="mt-0.5 text-green-600" />
            Student matric numbers must already exist in the system.
          </li>

          <li className="flex gap-2">
            <CheckCircle2 size={16} className="mt-0.5 text-green-600" />
            Scores must fall within the approved grading range.
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <Button type="button" variant="secondary">
          <Download size={18} />
          Download Template
        </Button>
      </div>
    </Card>
  );
}

export default UploadDropzone;
