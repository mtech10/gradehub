import { Info } from "lucide-react";

function ReviewNotice() {
  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Info size={18} className="sm:w-5 sm:h-5" />
        </div>

        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
            Academic Review
          </h3>

          <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">
            These results are provisional and subject to approval by the
            University Senate. If you notice any discrepancies, please contact
            your department or the Exams and Records Unit.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewNotice;
