import { useEffect, useState } from "react";
import ResultsHeader from "../../components/results/ResultsHeader";
import ResultsStats from "../../components/results/ResultsStats";
import ResultsTable from "../../components/results/ResultsTable";
import ResultsSummary from "../../components/results/ResultsSummary";
import ReviewNotice from "../../components/results/ReviewNotice";
import transcriptService from "../../services/transcriptService";
import { useAuth } from "../../context/AuthContext"; // Assuming you have AuthContext for the current user

function Results() {
  const { user } = useAuth(); // Retrieve the logged-in student's info
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const transcriptData = await transcriptService.getMyTranscript();
        setData(transcriptData);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading your results...</div>;
  }

  if (!data) {
    return (
      <div className="p-10 text-center text-red-500">
        Unable to load results.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ResultsHeader />

      {/* Live Data Injected Here */}
      <ResultsStats stats={data.topStats} />

      <ResultsTable
        title="All Results"
        subtitle="View your published course results across all semesters"
        results={data.resultsList}
      />

      {/* Live Data Injected Here */}
      <ResultsSummary summary={data.bottomSummary} />
      <ReviewNotice />
    </div>
  );
}

export default Results;
