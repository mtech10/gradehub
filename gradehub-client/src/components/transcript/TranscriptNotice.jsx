import { ShieldCheck, CalendarDays } from "lucide-react";

import Card from "../ui/Card";
import { student } from "../../constants/studentInformation";

function TranscriptNotice() {
  return (
    <Card padding="lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
          <ShieldCheck className="text-blue-600" size={28} />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">
            Official Transcript Notice
          </h3>

          <p className="mt-3 leading-7 text-slate-600">
            This transcript is generated electronically by GradeHub and
            summarizes the student's academic performance based on the
            institution's academic records. It is intended for informational
            purposes. Official verification may be required for admissions,
            employment, or scholarship applications.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <CalendarDays size={16} />

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
