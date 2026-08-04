import Card from "../ui/Card";
import { studentInformation } from "../../constants/studentInformation";

function StudentInformation({ profile }) {
  const transcript = profile?.transcript;

  const student = {
    name: profile?.name,
    matricNumber: profile?.matricNumber,
    department: profile?.department,
    programme: profile?.programme,
    admissionYear: profile?.admissionYear,
    level: profile?.level,
    session:
      transcript?.sessions?.[transcript.sessions.length - 1]?.session ?? "—",
    transcriptDate: "15 May 2024",
  };

  return (
    <Card padding="lg">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {studentInformation.map(({ key, icon: Icon, label }) => (
          <div
            key={key}
            className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4 hover:border-blue-200 hover:bg-slate-50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Icon size={22} className="text-blue-600" />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-slate-500">{label}</p>

              <h3 className="mt-1 font-semibold text-slate-900">
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
