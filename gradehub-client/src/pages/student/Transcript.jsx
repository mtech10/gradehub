import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import TranscriptHeader from "../../components/transcript/TranscriptHeader";
import StudentInformation from "../../components/transcript/StudentInformation";
import TranscriptRecord from "../../components/transcript/TranscriptRecord";
import OverallSummary from "../../components/transcript/OverallSummary";
import CgpaProgress from "../../components/transcript/CgpaProgress";
import TranscriptNotice from "../../components/transcript/TranscriptNotice";
import transcriptService from "../../services/transcriptService";

function Transcript() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const fullTranscript = await transcriptService.getMyTranscriptFull();
        setData(fullTranscript);
      } catch (err) {
        console.error("Failed to load transcript:", err);
        setError("Unable to load transcript data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTranscript();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500">
        Loading academic transcript...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-10 text-center text-red-500">
        {error || "Data unavailable"}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <TranscriptHeader />

      <StudentInformation profile={data.profile} />

      <TranscriptRecord transcript={data.transcript} />

      <OverallSummary summary={data.summary} />

      <CgpaProgress progress={data.progress} />

      <TranscriptNotice />
    </div>
  );
}

export default Transcript;
