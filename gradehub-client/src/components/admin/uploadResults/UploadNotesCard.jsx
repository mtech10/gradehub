import Card from "../../ui/Card";
import { CircleAlert, Info, TriangleAlert } from "lucide-react";

function Note({ icon: Icon, title, description, color }) {
  return (
    <div className="flex gap-3">
      <div className={`mt-1 rounded-lg p-2 ${color}`}>
        <Icon size={16} />
      </div>

      <div>
        <h4 className="font-semibold text-slate-900">{title}</h4>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function UploadNotesCard() {
  return (
    <Card className="p-4">
      <h3 className="mb-6 text-lg font-semibold text-slate-900">
        Important Notes
      </h3>

      <div className="space-y-6">
        <Note
          icon={Info}
          color="bg-blue-100 text-blue-600"
          title="Automatic Validation"
          description="Every uploaded sheet is validated before results can be published."
        />

        <Note
          icon={TriangleAlert}
          color="bg-amber-100 text-amber-600"
          title="Duplicate Uploads"
          description="Uploading the same course twice will require administrator confirmation."
        />

        <Note
          icon={CircleAlert}
          color="bg-red-100 text-red-600"
          title="Invalid Records"
          description="Rows with invalid matric numbers or scores will be skipped during processing."
        />
      </div>
    </Card>
  );
}

export default UploadNotesCard;
