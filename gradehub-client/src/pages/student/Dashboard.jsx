import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/DashboardStats";
import ResultsTable from "../../components/results/ResultsTable";
import CGPAChart from "../../components/dashboard/CGPAChart";
import CurrentCourses from "../../components/dashboard/CurrentCourses";
import UpcomingActivities from "../../components/dashboard/UpcomingActivities";
import DashboardSkeleton from "../../components/ui/skeletons/DashboardSkeleton";
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
      } catch (err) {
        console.error(err);
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
    <div className="space-y-6 sm:space-y-8">
      <DashboardHeader />

      {}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {dashboard?.stats?.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      {}
      <section className="space-y-6 sm:space-y-8">
        {dashboard?.cgpaTrend && dashboard.cgpaTrend.length > 0 && (
          <CGPAChart
            title="CGPA Trend"
            subtitle="Academic performance over time"
            data={dashboard.cgpaTrend}
          />
        )}
        <CurrentCourses courses={dashboard?.currentCourses || []} />
      </section>

      {}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ResultsTable
            title="Recent Results"
            subtitle="Latest published course results"
            showHeaderAction
            results={dashboard?.recentResults || []}
          />
        </div>

        <div className="lg:col-span-1">
          <UpcomingActivities activities={dashboard?.activities || []} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
