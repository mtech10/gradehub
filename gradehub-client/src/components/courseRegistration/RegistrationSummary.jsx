import { CheckCircle2, AlertCircle, Edit3 } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

function RegistrationSummary({
  summary,
  rules,
  isEditing,
  onEdit,
  onCancelEdit,
  onSubmit,
}) {
  return (
    <Card padding="lg" className="border-slate-200">
      <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Registration Status
          </p>

          <h3 className="mt-2 text-lg font-bold text-slate-900">
            {rules.status === "Open" ? "🟢 OPEN" : "🔴 CLOSED"}
          </h3>
        </div>

        {summary.hasRegisteredCourses && !isEditing && (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
          >
            <Edit3 size={16} />
            Edit
          </button>
        )}
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Selected in Cart</span>

          <span className="font-bold text-slate-900">
            {summary.selectedCount}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600">Registered Courses</span>

          <span className="font-bold text-slate-900">
            {summary.registeredCount}
          </span>
        </div>

        {/* Unit Progress */}

        <div className="pt-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-slate-600">Projected Units</span>

            <span className="font-bold text-slate-900">
              {summary.totalUnits} / {rules.maxUnits}
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full transition-all duration-300 ${
                summary.totalUnits > rules.maxUnits
                  ? "bg-red-500"
                  : summary.isValid
                    ? "bg-green-500"
                    : "bg-blue-500"
              }`}
              style={{
                width: `${summary.progressPercentage}%`,
              }}
            />
          </div>

          <p className="mt-2 text-right text-xs text-slate-500">
            Minimum Required: {rules.minUnits} Units
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-slate-600">First Semester</span>

          <span className="font-semibold">
            {summary.firstSemesterUnits} Units
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600">Second Semester</span>

          <span className="font-semibold">
            {summary.secondSemesterUnits} Units
          </span>
        </div>
      </div>

      <div
        className={`mt-6 flex items-start gap-3 rounded-xl p-4 ${
          summary.isValid
            ? "bg-green-50 text-green-800"
            : "bg-red-50 text-red-800"
        }`}
      >
        {summary.isValid ? (
          <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-green-600" />
        ) : (
          <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-600" />
        )}

        <p className="text-sm font-medium leading-relaxed">
          {summary.isValid
            ? "Valid course load. Ready for submission."
            : `Select between ${rules.minUnits} and ${rules.maxUnits} units.`}
        </p>
      </div>

      <Button
        fullWidth
        size="lg"
        className="mt-6"
        disabled={!summary.isValid || !summary.hasChanges}
        onClick={onSubmit}
      >
        Submit Registration
      </Button>

      {isEditing && (
        <Button
          variant="ghost"
          fullWidth
          className="mt-2"
          onClick={onCancelEdit}
        >
          Cancel Edit
        </Button>
      )}
    </Card>
  );
}

export default RegistrationSummary;
