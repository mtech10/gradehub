import Accordion from "../ui/Accordion";
import SemesterAccordion from "./SemesterAccordion";

function SessionAccordion({ session }) {
  const totalSemesters = session.semesters.length;

  const totalUnits = session.semesters.reduce(
    (sum, semester) => sum + semester.units,
    0,
  );

  const averageGpa =
    session.semesters.reduce((sum, semester) => sum + semester.gpa, 0) /
    totalSemesters;

  return (
    <Accordion
      title={`${session.session} Academic Session`}
      subtitle={`${totalUnits} Credit Units • Average GPA ${averageGpa.toFixed(2)}`}
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
