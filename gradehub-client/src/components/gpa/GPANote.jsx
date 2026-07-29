import { Info } from "lucide-react";

function GPANote() {
  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
      <div className="flex items-start gap-3">
        <Info size={18} className="mt-0.5 shrink-0 text-blue-600" />

        <p className="text-sm leading-6 text-slate-700">
          <span className="font-semibold text-slate-900">Note:</span> This
          calculator provides an estimate based on the grades entered. Official
          results are subject to review by the academic office.
        </p>
      </div>
    </div>
  );
}

export default GPANote;
