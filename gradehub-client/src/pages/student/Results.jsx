import { Award, BookOpen, GraduationCap } from "lucide-react";
import ResultsHeader from "../../components/results/ResultsHeader";
import ResultsStats from "../../components/results/ResultsStats";
import ResultsTable from "../../components/results/ResultsTable";
import ResultsSummary from "../../components/results/ResultsSummary";
import ReviewNotice from "../../components/results/ReviewNotice";
import { resultStats } from "../../constants/resultStats";
import { resultSummary } from "../../constants/resultSummary";
import { recentResults } from "../../constants/recentResults";

function Results() {
  return (
    <div className="space-y-8">
      <ResultsHeader />
      <ResultsStats stats={resultStats} />

      <ResultsTable
        title="All Results"
        subtitle="View your published course results across all semesters"
        results={recentResults}
      />

      <ResultsSummary summary={resultSummary} />
      <ReviewNotice />
    </div>
  );
}

export default Results;
