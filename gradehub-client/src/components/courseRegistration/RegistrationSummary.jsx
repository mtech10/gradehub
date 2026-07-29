import { CheckCircle2, AlertCircle, Edit3 } from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";

function RegistrationSummary({
  rules,
  courses,
  selectedCodes,
  droppedCodes,
  isEditing,
  onEdit,
  onCancelEdit,
  onSubmit,
}) {
  // Calculate active courses: (Officially Registered MINUS Dropped) PLUS (Newly Selected)
  const allActiveCourses = courses.filter(
    (c) =>
      (c.status === "Registered" && !droppedCodes.includes(c.code)) ||
      selectedCodes.includes(c.code),
  );

  const totalUnits = allActiveCourses.reduce((sum, c) => sum + c.units, 0);
  const firstSemUnits = allActiveCourses
    .filter((c) => c.semester === 1)
    .reduce((sum, c) => sum + c.units, 0);
  const secondSemUnits = allActiveCourses
    .filter((c) => c.semester === 2)
    .reduce((sum, c) => sum + c.units, 0);

  const isValid = totalUnits >= rules.minUnits && totalUnits <= rules.maxUnits;
  const progressPercentage = Math.min((totalUnits / rules.maxUnits) * 100, 100);

  // Can only submit if the student actually made a change
  const hasChanges = selectedCodes.length > 0 || droppedCodes.length > 0;

  // Check if they have existing registered courses to edit
  const hasRegisteredCourses = courses.some((c) => c.status === "Registered");

  return (
    <Card padding="lg" className="border-slate-200">
      <div className="mb-6 border-b border-slate-100 pb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Registration Status
          </p>
          <div className="mt-2 flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-900">
              {rules.status === "Open" ? "🟢 OPEN" : "🔴 CLOSED"}
            </h3>
          </div>
        </div>

        {/* EDIT BUTTON */}
        {hasRegisteredCourses && !isEditing && (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg"
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
            {selectedCodes.length}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600">Officially Registered</span>
          <span className="font-bold text-slate-900">
            {courses.filter((c) => c.status === "Registered").length -
              droppedCodes.length}
          </span>
        </div>

        {/* Progress Bar Section */}
        <div className="pt-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-slate-600 font-medium">
              Total Projected Units
            </span>
            <span className="font-bold text-slate-900">
              {totalUnits} / {rules.maxUnits}
            </span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full transition-all duration-300 ${
                totalUnits > rules.maxUnits
                  ? "bg-red-500"
                  : isValid
                    ? "bg-green-500"
                    : "bg-blue-500"
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="mt-2 text-right text-xs text-slate-500">
            Min: {rules.minUnits} Units
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-slate-600">First Semester</span>
          <span className="font-medium text-slate-900">
            {firstSemUnits} Units
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-600">Second Semester</span>
          <span className="font-medium text-slate-900">
            {secondSemUnits} Units
          </span>
        </div>
      </div>

      {/* Validation Alert */}
      <div
        className={`mt-6 flex items-start gap-3 rounded-xl p-4 ${isValid ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
      >
        {isValid ? (
          <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-green-600" />
        ) : (
          <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-600" />
        )}
        <p className="text-sm leading-relaxed font-medium">
          {isValid
            ? "✓ Valid Load. Ready to submit."
            : `Invalid Load. Total must be between ${rules.minUnits} and ${rules.maxUnits} units.`}
        </p>
      </div>

      <Button
        fullWidth
        size="lg"
        className="mt-6"
        disabled={!isValid || !hasChanges}
        onClick={onSubmit}
      >
        Submit Registration
      </Button>

      {/* CANCEL EDIT BUTTON */}
      {isEditing && (
        <Button
          variant="ghost"
          fullWidth
          className="mt-2 text-slate-500 hover:text-slate-700"
          onClick={onCancelEdit}
        >
          Cancel Edit
        </Button>
      )}
    </Card>
  );
}

export default RegistrationSummary;
