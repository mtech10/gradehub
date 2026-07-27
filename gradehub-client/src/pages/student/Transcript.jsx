import TranscriptHeader from "../../components/transcript/TranscriptHeader";
import StudentInformation from "../../components/transcript/StudentInformation";
import TranscriptFilterBar from "../../components/transcript/TranscriptFilterBar";
// import TranscriptRecord from "../../components/transcript/TranscriptRecord";
// import OverallSummary from "../../components/transcript/OverallSummary";
// import CgpaProgress from "../../components/transcript/CgpaProgress";
// import TranscriptNotice from "../../components/transcript/TranscriptNotice";

function Transcript() {
  return (
    <div className="space-y-8">
      <TranscriptHeader />

      <StudentInformation />

      <TranscriptFilterBar />

      {/* <TranscriptRecord /> */}

      {/* <OverallSummary /> */}

      {/* <CgpaProgress /> */}

      {/* <TranscriptNotice /> */}
    </div>
  );
}

export default Transcript;
