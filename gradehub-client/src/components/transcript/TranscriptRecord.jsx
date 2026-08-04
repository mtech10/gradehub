import SessionAccordion from "./SessionAccordion";

import { getCurrentStudentTranscript } from "../../utils/currentStudentTranscript";

function TranscriptRecord({ transcript }) {
  return (
    <div className="space-y-6">
      {transcript.sessions.map((session) => (
        <SessionAccordion key={session.session} session={session} />
      ))}
    </div>
  );
}

export default TranscriptRecord;
