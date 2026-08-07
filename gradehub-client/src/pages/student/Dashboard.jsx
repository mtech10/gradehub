import StudentLayout from "../../layouts/StudentLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/DashboardStats";
import ResultsTable from "../../components/results/ResultsTable";
import CGPAChart from "../../components/dashboard/CGPAChart";

import CurrentCourses from "../../components/dashboard/CurrentCourses";
import UpcomingActivities from "../../components/dashboard/UpcomingActivities";
import { cgpaTrend } from "../../constants/chartData";
import { useEffect, useState } from "react";
import dashboardService from "../../services/dashboardService";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await dashboardService.getStudentDashboard();

        setDashboard(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <p>Loading dashboard...</p>
      </StudentLayout>
    );
  }

  return (
    <>
      <DashboardHeader />

      <section className="grid gap-4 xl:grid-cols-5">
        {dashboard.stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="mt-8">
        <CGPAChart
          title="CGPA Trend"
          subtitle="Academic performance over time"
          data={cgpaTrend}
        />
        <div className="mt-8">
          <ResultsTable
            title="Recent Results"
            subtitle="Latest published course results"
            showHeaderAction
            results={dashboard.recentResults}
          />
        </div>
      </section>

      <section className="mt-8 grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <CurrentCourses courses={dashboard.currentCourses} />
        </div>

        <div className="col-span-2">
          <UpcomingActivities activities={dashboard.activities} />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
