import Accordion from "../ui/Accordion";
import SemesterAccordion from "./SemesterAccordion";
import { getSessionSummary } from "../../utils/transcriptUtils";

function SessionAccordion({ session = {} }) {
  const summary = getSessionSummary(session);

  const semesters = session.semesters || [];

  return (
    <Accordion
      title={`${session.session || "Unknown Session"} Academic Session`}
      subtitle={`${summary.totalUnits} Credit Units • Average GPA ${summary.averageGpa.toFixed(2)}`}
      defaultOpen={session.session === "2023/2024"}
    >
      <div className="space-y-5">
        {semesters.length > 0 ? (
          semesters.map((semester, index) => (
            <SemesterAccordion
              key={
                semester.id ??
                semester.semester ??
                `${session.session}-${index}`
              }
              semester={semester}
            />
          ))
        ) : (
          <p className="py-6 text-center text-sm text-slate-500">
            No semester records available.
          </p>
        )}
      </div>
    </Accordion>
  );
}

export default SessionAccordion;
