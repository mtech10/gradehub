import TranscriptHeader from "../../components/transcript/TranscriptHeader";
import StudentInformation from "../../components/transcript/StudentInformation";
import TranscriptRecord from "../../components/transcript/TranscriptRecord";
import CGPAChart from "../../components/dashboard/CGPAChart";
// import OverallSummary from "../../components/transcript/OverallSummary";
// import CgpaProgress from "../../components/transcript/CgpaProgress";
// import TranscriptNotice from "../../components/transcript/TranscriptNotice";

function Transcript() {
  return (
    <div className="space-y-8">
      <TranscriptHeader />

      <StudentInformation />

      <TranscriptRecord />

      {/* <OverallSummary /> */}

      <CGPAChart />

      {/* <TranscriptNotice /> */}
    </div>
  );
}

export default Transcript;
