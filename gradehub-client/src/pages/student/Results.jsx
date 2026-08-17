import { useEffect, useState } from "react";
import { useAcademic } from "../../context/AcademicContext";
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
import ReviewNotice from "../../components/results/ReviewNotice";
import ResultsSkeleton from "../../components/ui/skeletons/ResultsSkeleton";

import resultService from "../../services/resultService";

function Results() {
  const { currentSession, isLoading: isAcademicLoading } = useAcademic();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [viewSessionId, setViewSessionId] = useState(null);
  const [viewSessionName, setViewSessionName] = useState("");

  // Initialize view state when academic context loads
  useEffect(() => {
    if (!isAcademicLoading && currentSession && !viewSessionId) {
      setViewSessionId(currentSession.id);
      setViewSessionName(currentSession.name);
    }
  }, [isAcademicLoading, currentSession, viewSessionId]);

  // Fetch results based ONLY on session ID
  useEffect(() => {
    if (!viewSessionId) return;

    const fetchResults = async () => {
      try {
        setLoading(true);

        const response = await resultService.getMyResults({
          page: currentPage,
          limit: 10,
          sessionId: viewSessionId, // <-- Session-only filtering
        });

        setData(response);
      } catch (error) {
        console.error("Failed to fetch results:", error);
        alert(
          error.response?.data?.message ||
            error.message ||
            "Failed to load results.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [currentPage, viewSessionId]);

  const handleTermChange = (
    newSessionId,
    _newSemesterId,
    _semName,
    sesName,
  ) => {
    setViewSessionId(newSessionId);
    setViewSessionName(sesName);
    setCurrentPage(1);
  };

  if (isAcademicLoading || loading) {
    return <ResultsSkeleton />;
  }

  if (!viewSessionId) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 max-w-md text-amber-800">
          <h3 className="font-bold text-base mb-1">
            No Active Session Configured
          </h3>
          <p className="text-sm">
            Please set an active academic session under your settings.
          </p>
        </div>
      </div>
    );
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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ResultsHeader
          selectedSessionId={viewSessionId}
          onTermChange={handleTermChange}
        />

        {viewSessionName && (
          <div className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 border border-blue-100">
            Viewing Session: {viewSessionName}
          </div>
        )}
      </div>

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
        title="Session Results"
        subtitle={`Published course results for the ${viewSessionName} session`}
        results={data.results}
        pagination={data.pagination}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <ReviewNotice />
    </div>
  );
}

export default Results;
