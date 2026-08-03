import Accordion from "../ui/Accordion";
import SemesterSummary from "./SemesterSummary";
import TranscriptTable from "./TranscriptTable";

function SemesterAccordion({ semester }) {
  return (
    <Accordion
      title={`${semester.semester} Semester`}
      subtitle={`GPA ${semester.gpa} • ${semester.totalUnits} Units`}
      defaultOpen={semester.semester === "First"}
    >
      <>
        <SemesterSummary semester={semester} />

        <TranscriptTable results={semester.courses} />
      </>
    </Accordion>
  );
}

export default SemesterAccordion;
