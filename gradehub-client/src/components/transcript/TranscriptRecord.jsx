// import SessionAccordion from "./SessionAccordion";

// import { getCurrentStudentTranscript } from "../../utils/currentStudentTranscript";

// function TranscriptRecord({ transcript }) {
//   return (
//     <div className="space-y-6">
//       {transcript.sessions.map((session) => (
//         <SessionAccordion key={session.session} session={session} />
//       ))}
//     </div>
//   );
// }

// export default TranscriptRecord;

import SemesterSummary from "./SemesterSummary";
import TranscriptTable from "./TranscriptTable";
import Card from "../ui/Card";

function TranscriptRecord({ transcript }) {
  const sessions = transcript?.sessions || [];

  return (
    <div className="space-y-8">
      {sessions.map((session) => (
        <div key={session.session} className="space-y-6">
          {/* Session Document Header */}
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-slate-900">
              {session.session} Academic Session
            </h2>
            <p className="text-sm text-slate-500">
              Total Units:{" "}
              <span className="font-semibold text-slate-700">
                {session.totalUnits}
              </span>{" "}
              • Average GPA:{" "}
              <span className="font-semibold text-slate-700">
                {session.averageGpa?.toFixed(2)}
              </span>
            </p>
          </div>

          {/* Semesters inside this session */}
          <div className="space-y-6 pl-0 sm:pl-4">
            {session.semesters?.map((semester) => (
              <Card
                key={semester.id || semester.semester}
                padding="lg"
                className="border border-slate-200 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {semester.semester} Semester
                  </h3>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                      SGPA: {Number(semester.gpa || 0).toFixed(2)}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">
                      Units: {semester.totalCredits || semester.totalUnits || 0}
                    </span>
                  </div>
                </div>

                {/* Semester Summary Cards */}
                <SemesterSummary semester={semester} />

                {/* Course List Table */}
                <div className="mt-6">
                  <TranscriptTable results={semester.courses} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {sessions.length === 0 && (
        <Card padding="lg">
          <p className="py-8 text-center text-slate-500">
            No academic records available to display.
          </p>
        </Card>
      )}
    </div>
  );
}

export default TranscriptRecord;
