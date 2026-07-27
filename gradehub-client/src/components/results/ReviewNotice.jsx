import { Info } from "lucide-react";

function ReviewNotice() {
  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <Info size={20} className="text-blue-600" />
        </div>

        <div>
          <h3 className="font-semibold text-slate-900">Academic Review</h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
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
