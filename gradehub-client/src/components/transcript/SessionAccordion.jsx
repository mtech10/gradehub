import Accordion from "../ui/Accordion";
import SemesterAccordion from "./SemesterAccordion";
import { getSessionSummary } from "../../utils/transcriptUtils";

function SessionAccordion({ session }) {
  const summary = getSessionSummary(session);

  return (
    <Accordion
      title={`${session.session} Academic Session`}
      subtitle={`${summary.totalUnits} Credit Units • Average GPA ${summary.averageGpa.toFixed(2)}`}
      defaultOpen={session.session === "2023/2024"}
    >
      <div className="space-y-5">
        {session.semesters.map((semester) => (
          <SemesterAccordion key={semester.semester} semester={semester} />
        ))}
      </div>
    </Accordion>
  );
}

export default SessionAccordion;
