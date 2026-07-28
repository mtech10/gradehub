import { transcript } from "../../constants/transcript";
import SessionAccordion from "./SessionAccordion";

function TranscriptRecord() {
  return (
    <div className="space-y-6">
      {transcript.map((session) => (
        <SessionAccordion key={session.session} session={session} />
      ))}
    </div>
  );
}

export default TranscriptRecord;
