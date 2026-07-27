import { Award, BookOpen, GraduationCap } from "lucide-react";
import ResultsHeader from "../../components/results/ResultsHeader";
import ResultsStats from "../../components/results/ResultsStats";
import ResultsTable from "../../components/results/ResultsTable";
import ResultsSummary from "../../components/results/ResultsSummary";
import ReviewNotice from "../../components/results/ReviewNotice";

function Results() {
  return (
    <div className="space-y-8">
      <ResultsHeader />
      <ResultsStats />

      <ResultsTable
        title="All Results"
        subtitle="View your published course results across all semesters"
      />

      <ResultsSummary />
      <ReviewNotice />
    </div>
  );
}

export default Results;
