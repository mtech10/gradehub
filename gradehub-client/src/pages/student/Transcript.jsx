import { useEffect, useState } from "react";
import TranscriptHeader from "../../components/transcript/TranscriptHeader";
import StudentInformation from "../../components/transcript/StudentInformation";
import TranscriptRecord from "../../components/transcript/TranscriptRecord";
import OverallSummary from "../../components/transcript/OverallSummary";
import CgpaProgress from "../../components/transcript/CgpaProgress";
import TranscriptNotice from "../../components/transcript/TranscriptNotice";
import TranscriptSkeleton from "../../components/ui/skeletons/TranscriptSkeleton";
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
    return <TranscriptSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        {error || "Data unavailable"}
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 print:space-y-4 print:bg-white print:text-black">
      {/* 1. Official Print-Only Letterhead */}
      <div className="hidden print:block text-center space-y-1 mb-6 border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wider">
          GradeHub University
        </h1>
        <p className="text-xs">
          Office of the Registrar • Academic Records Division
        </p>
        <h2 className="text-md font-semibold underline uppercase mt-2">
          Official Academic Transcript
        </h2>
      </div>

      {/* 2. Web Control Header */}
      <TranscriptHeader />

      {/* 3. Student Bio Information */}
      <StudentInformation profile={data.profile} />

      {/* 4. Overall Summary */}
      <OverallSummary summary={data.summary} />

      {/* 5. Continuous Chronological Record */}
      <TranscriptRecord transcript={data.transcript} />

      {/* 6. CGPA Progress Chart */}
      <div className="print:hidden">
        <CgpaProgress progress={data.progress} />
      </div>

      {/* 7. Notice / Sign-off Footer */}
      <TranscriptNotice />

      {/* Official Print Sign-off Block */}
      <div className="mt-12 hidden print:flex justify-between items-end pt-12">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500">
            This document is electronically generated and is valid without
            signature only when bearing the official seal.
          </p>
          <p className="text-xs font-semibold">
            Date Issued: {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="text-center space-y-2">
          <div className="w-40 border-b border-black"></div>
          <p className="text-xs font-semibold">
            Registrar / Controller of Examinations
          </p>
        </div>
      </div>
    </div>
  );
}

export default Transcript;
