import Card from "../ui/Card";
import { studentInformation } from "../../constants/studentInformation";

function StudentInformation({ profile }) {
  const student = {
    name: profile?.name,
    matricNumber: profile?.matricNumber,
    department: profile?.department,
    programme: profile?.programme,
    admissionYear: profile?.admissionYear,
    level: profile?.level,
    session: profile?.session ?? "—",
    transcriptDate: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };

  return (
    <Card padding="lg" className="p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {studentInformation.map(({ key, icon: Icon, label }) => (
          <div
            key={key}
            className="flex items-start gap-3 sm:gap-4 rounded-2xl border border-slate-100 p-3.5 sm:p-4 hover:border-blue-200 hover:bg-slate-50 transition-colors min-w-0"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Icon size={20} className="sm:w-[22px] sm:h-[22px]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm text-slate-500">{label}</p>

              <h3 className="mt-0.5 sm:mt-1 font-semibold text-slate-900 text-sm sm:text-base truncate">
                {student[key] || "—"}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default StudentInformation;
