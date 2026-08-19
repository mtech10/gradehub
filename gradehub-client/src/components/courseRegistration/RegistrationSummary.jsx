import { useState } from "react";
import { CheckCircle2, AlertCircle, Edit3 } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import ConfirmModal from "../ui/ConfirmModal";

function RegistrationSummary({
  summary,
  rules,
  isEditing,
  onEdit,
  onCancelEdit,
  onSubmit,
  disabled,
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirmSubmission = () => {
    setShowConfirm(false);
    onSubmit();
  };

  return (
    <>
      <Card padding="lg" className="border-slate-200 p-4 sm:p-6">
        <div className="mb-4 sm:mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
              Registration Status
            </p>

            <h3 className="mt-1 sm:mt-2 text-base sm:text-lg font-bold text-slate-900">
              {rules.status === "Open" ? "🟢 OPEN" : "🔴 CLOSED"}
            </h3>
          </div>

          {summary.hasRegisteredCourses && !isEditing && (
            <button
              onClick={onEdit}
              className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs sm:text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
            >
              <Edit3 size={15} />
              Edit
            </button>
          )}
        </div>

        <div className="space-y-4 sm:space-y-5 text-xs sm:text-sm">
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
              <span className="font-medium text-slate-600">
                Projected Units
              </span>

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

            <p className="mt-1.5 text-right text-[11px] sm:text-xs text-slate-500">
              Minimum Required: {rules.minUnits} Units
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-3 sm:pt-4">
            <span className="text-slate-600">First Semester</span>
            <span className="font-semibold text-slate-900">
              {summary.firstSemesterUnits} Units
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-600">Second Semester</span>
            <span className="font-semibold text-slate-900">
              {summary.secondSemesterUnits} Units
            </span>
          </div>
        </div>

        <div
          className={`mt-5 sm:mt-6 flex items-start gap-3 rounded-xl p-3.5 sm:p-4 ${
            summary.isValid
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          }`}
        >
          {summary.isValid ? (
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-green-600"
            />
          ) : (
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
          )}

          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            {summary.isValid
              ? "Valid course load. Ready for submission."
              : `Select between ${rules.minUnits} and ${rules.maxUnits} units.`}
          </p>
        </div>

        <Button
          fullWidth
          size="lg"
          className="mt-5 sm:mt-6 justify-center"
          disabled={!summary.isValid || !summary.hasChanges || disabled}
          loading={disabled}
          onClick={() => setShowConfirm(true)}
        >
          Submit Registration
        </Button>

        {isEditing && (
          <Button
            variant="ghost"
            fullWidth
            className="mt-2"
            onClick={onCancelEdit}
            disabled={disabled}
          >
            Cancel Edit
          </Button>
        )}
      </Card>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmSubmission}
        title="Confirm Registration"
        message={`Are you sure you want to submit your course registration? You are about to register for a total of ${summary.totalUnits} units.`}
        confirmText="Yes, Submit"
        cancelText="Review Courses"
        isDestructive={false}
      />
    </>
  );
}

export default RegistrationSummary;
