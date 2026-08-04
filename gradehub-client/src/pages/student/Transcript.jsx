import PageHeader from "../../components/common/PageHeader";
import TranscriptHeader from "../../components/transcript/TranscriptHeader";
import StudentInformation from "../../components/transcript/StudentInformation";
import TranscriptRecord from "../../components/transcript/TranscriptRecord";
import OverallSummary from "../../components/transcript/OverallSummary";
import CgpaProgress from "../../components/transcript/CgpaProgress";
import TranscriptNotice from "../../components/transcript/TranscriptNotice";

import {
  getCurrentStudentProfile,
  getCurrentStudentTranscript,
} from "../../utils/transcriptHelpers";

import {
  getTranscriptSummary,
  getCgpaProgress,
} from "../../utils/transcriptUtils";

function Transcript() {
  const profile = getCurrentStudentProfile();

  const transcript = getCurrentStudentTranscript();

  const summary = getTranscriptSummary(transcript.sessions);

  const progress = getCgpaProgress(transcript.sessions);

  return (
    <div className="space-y-8">
      <TranscriptHeader />

      <StudentInformation profile={profile} />

      <TranscriptRecord transcript={transcript} />

      <OverallSummary summary={summary} />

      <CgpaProgress progress={progress} />

      <TranscriptNotice />
    </div>
  );
}

export default Transcript;
