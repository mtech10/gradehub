import { ShieldCheck, CalendarDays } from "lucide-react";
import Card from "../ui/Card";
import { student } from "../../constants/studentInformation";

function TranscriptNotice() {
  return (
    <Card padding="lg" className="p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
          <ShieldCheck size={24} className="sm:w-7 sm:h-7" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            Official Transcript Notice
          </h3>

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
            This transcript is generated electronically by GradeHub and
            summarizes the student's academic performance based on the
            institution's academic records. It is intended for informational
            purposes. Official verification may be required for admissions,
            employment, or scholarship applications.
          </p>

          <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
            <CalendarDays size={16} className="shrink-0" />

            <span>
              Generated on{" "}
              <strong className="text-slate-700">
                {student.transcriptDate}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default TranscriptNotice;
