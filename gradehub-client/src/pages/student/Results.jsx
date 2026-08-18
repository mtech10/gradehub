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
import sessionService from "../../services/admin/sessionService"; // <-- Added session service

function Results() {
  const { currentSession, isLoading: isAcademicLoading } = useAcademic();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [viewSessionId, setViewSessionId] = useState(null);
  const [viewSessionName, setViewSessionName] = useState("");
  const [noSessionsExist, setNoSessionsExist] = useState(false);

  // Initialize view state: Use current session, or fallback to the latest available session
  useEffect(() => {
    const initializeView = async () => {
      if (isAcademicLoading) return;

      if (currentSession && !viewSessionId) {
        setViewSessionId(currentSession.id);
        setViewSessionName(currentSession.name);
      } else if (!currentSession && !viewSessionId) {
        try {
          // Fallback: If no current session is active, fetch all sessions
          const res = await sessionService.getSessions({ status: "all" });
          const sessions = res.data || res || [];

          if (sessions.length > 0) {
            // Automatically select the first (most recent) session so the page isn't blocked
            setViewSessionId(sessions[0].id);
            setViewSessionName(sessions[0].name);
          } else {
            setNoSessionsExist(true);
            setLoading(false);
          }
        } catch (error) {
          console.error("Failed to load fallback session", error);
          setLoading(false);
        }
      }
    };

    initializeView();
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
          sessionId: viewSessionId,
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

  // Only show an error if there are literally zero sessions created in the entire system
  if (noSessionsExist) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 max-w-md text-amber-800">
          <h3 className="font-bold text-base mb-1">
            No Academic Sessions Found
          </h3>
          <p className="text-sm">
            There are currently no academic sessions recorded in the system.
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
