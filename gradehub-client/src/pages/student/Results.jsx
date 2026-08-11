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

import resultService from "../../services/resultService";

function Results() {
  const {
    currentSession,
    currentSemester,
    isLoading: isAcademicLoading,
  } = useAcademic();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [viewSessionId, setViewSessionId] = useState(null);
  const [viewSemesterId, setViewSemesterId] = useState(null);
  const [viewLabels, setViewLabels] = useState({ semester: "", session: "" });

  useEffect(() => {
    if (
      !isAcademicLoading &&
      currentSession &&
      currentSemester &&
      !viewSemesterId
    ) {
      setViewSessionId(currentSession.id);
      setViewSemesterId(currentSemester.id);
      setViewLabels({
        semester: currentSemester.name,
        session: currentSession.name,
      });
    }
  }, [isAcademicLoading, currentSession, currentSemester, viewSemesterId]);

  useEffect(() => {
    if (!viewSessionId || !viewSemesterId) return;

    const fetchResults = async () => {
      try {
        setLoading(true);

        const response = await resultService.getMyResults({
          page: currentPage,
          limit: 10,
          sessionId: viewSessionId,
          semesterId: viewSemesterId,
        });

        setData(response);
      } catch (error) {
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [currentPage, viewSessionId, viewSemesterId]);

  const handleTermChange = (newSessionId, newSemesterId, semName, sesName) => {
    setViewSessionId(newSessionId);
    setViewSemesterId(newSemesterId);
    setViewLabels({ semester: semName, session: sesName });
    setCurrentPage(1); // Reset to page 1 on term change
  };

  if (isAcademicLoading) {
    return (
      <div className="p-10 text-center text-slate-500 font-medium">
        Loading academic portal...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Pass the state and handler to the Header */}
        <ResultsHeader
          selectedSemesterId={viewSemesterId}
          onTermChange={handleTermChange}
        />

        {/* Dynamic badge showing the current scope */}
        {viewLabels.semester && (
          <div className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700 border border-blue-100">
            Viewing: {viewLabels.semester} ({viewLabels.session})
          </div>
        )}
      </div>

      {loading ? (
        <div className="p-10 text-center text-slate-500">
          Fetching records...
        </div>
      ) : !data ? (
        <div className="p-10 text-center text-red-500">
          Unable to load results.
        </div>
      ) : (
        <>
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
            title="Term Results"
            subtitle={`Published course results for ${viewLabels.semester}`}
            results={data.results}
            pagination={data.pagination}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <ReviewNotice />
    </div>
  );
}

export default Results;
