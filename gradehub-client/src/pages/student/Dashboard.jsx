import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/DashboardStats";
import ResultsTable from "../../components/results/ResultsTable";
import CGPAChart from "../../components/dashboard/CGPAChart";
import CurrentCourses from "../../components/dashboard/CurrentCourses";
import UpcomingActivities from "../../components/dashboard/UpcomingActivities";
import DashboardSkeleton from "../../components/ui/skeletons/DashboardSkeleton";
import { useEffect, useState } from "react";
import dashboardService from "../../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await dashboardService.getStudentDashboard();
        setDashboard(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error || !dashboard) {
    return (
      <div className="p-8 text-center text-red-500">
        {error || "No data available."}
      </div>
    );
  }

  return (
    <>
      <DashboardHeader />

      <section className="grid gap-4 xl:grid-cols-5 mt-8">
        {dashboard?.stats?.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="mt-8">
        {dashboard?.cgpaTrend && dashboard.cgpaTrend.length > 0 && (
          <CGPAChart
            title="CGPA Trend"
            subtitle="Academic performance over time"
            data={dashboard.cgpaTrend}
          />
        )}
        <div className="mt-8 ">
          <CurrentCourses courses={dashboard?.currentCourses || []} />
        </div>
      </section>

      <section className="mt-8 grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <ResultsTable
            title="Recent Results"
            subtitle="Latest published course results"
            showHeaderAction
            results={dashboard?.recentResults || []}
          />
        </div>

        <div className="col-span-2">
          <UpcomingActivities activities={dashboard?.activities || []} />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
