import Accordion from "../ui/Accordion";
import SemesterSummary from "./SemesterSummary";
import TranscriptTable from "./TranscriptTable";

function SemesterAccordion({ semester }) {
  return (
    <Accordion
      title={semester.semester}
      subtitle={`GPA ${semester.gpa} • ${semester.units} Units`}
      defaultOpen={semester.semester === "First Semester"}
    >
      <>
        <SemesterSummary semester={semester} />

        <TranscriptTable results={semester.results} />
      </>{" "}
    </Accordion>
  );
}

export default SemesterAccordion;
