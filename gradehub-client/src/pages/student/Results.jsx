import { useEffect, useState } from "react";
import {
  BookOpen,
  Layers3,
  TrendingUp,
  TrendingDown,
  GraduationCap,
} from "lucide-react";
import ResultsHeader from "../../components/results/ResultsHeader";
import ResultsStats from "../../components/results/ResultsStats";
import ResultsTable from "../../components/results/ResultsTable";
import ResultsSummary from "../../components/results/ResultsSummary";
import ReviewNotice from "../../components/results/ReviewNotice";

import resultService from "../../services/resultService";

function Results() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        const response = await resultService.getMyResults({
          page: currentPage,
          limit: 10,
        });
        setData(response);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [currentPage]);

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

      <ResultsStats
        stats={[
          {
            title: "Total Courses",
            value: data.stats.totalCourses,
            subtitle: "Completed",
            icon: BookOpen,
            color: "blue",
          },
          {
            title: "Total Units",
            value: data.stats.totalUnits,
            subtitle: "Attempted",
            icon: Layers3,
            color: "purple",
          },
          {
            title: "Highest Score",
            value: `${data.stats.highestScore}%`,
            subtitle: "Best Performance",
            icon: TrendingUp,
            color: "green",
          },
          {
            title: "Lowest Score",
            value: `${data.stats.lowestScore}%`,
            subtitle: "Lowest Performance",
            icon: TrendingDown,
            color: "red",
          },
          {
            title: "Average Grade",
            value: data.stats.averageGrade,
            subtitle: "Overall",
            icon: GraduationCap,
            color: "amber",
          },
        ]}
      />

      <ResultsTable
        title="All Results"
        subtitle="View your published course results across all semesters"
        results={data.results}
        pagination={data.pagination}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ResultsSummary
        summary={[
          {
            title: "Credit Units Earned",
            value: data.stats.totalEarnedUnits,
            subtitle: `Out of ${data.stats.totalUnits} Units`,
            footer: "Successfully completed",
            icon: GraduationCap,
          },
          {
            title: "Highest Score",
            value: `${data.stats.highestScore}%`,
            subtitle: "Best Result",
            footer: "Highest score achieved",
            icon: TrendingUp,
          },
          {
            title: "Lowest Score",
            value: `${data.stats.lowestScore}%`,
            subtitle: "Lowest Result",
            footer: "Lowest score recorded",
            icon: TrendingDown,
          },
        ]}
      />

      <ReviewNotice />
    </div>
  );
}

export default Results;
