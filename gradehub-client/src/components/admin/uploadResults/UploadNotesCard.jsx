import Card from "../../ui/Card";
import { CircleAlert, Info, TriangleAlert } from "lucide-react";

function Note({ icon: Icon, title, description, color }) {
  return (
    <div className="flex gap-3">
      <div className={`mt-0.5 rounded-lg p-2 shrink-0 ${color}`}>
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
          {title}
        </h4>
        <p className="mt-0.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function UploadNotesCard() {
  return (
    <Card className="p-4 sm:p-6">
      <h3 className="mb-4 sm:mb-6 text-base sm:text-lg font-semibold text-slate-900">
        Important Notes
      </h3>

      <div className="space-y-4 sm:space-y-6">
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
