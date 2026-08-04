import StudentLayout from "../../layouts/StudentLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/DashboardStats";
import ResultsTable from "../../components/results/ResultsTable";
import { dashboardStats } from "../../constants/dashboard";
import CGPAChart from "../../components/dashboard/CGPAChart";

import CurrentCourses from "../../components/dashboard/CurrentCourses";
import UpcomingActivities from "../../components/dashboard/UpcomingActivities";
import { cgpaTrend } from "../../constants/chartData";
import { recentResults } from "../../constants/recentResults";
import { currentCourses } from "../../constants/currentCourses";
import { upcomingActivities } from "../../constants/upcomingActivities";

function Dashboard() {
  return (
    <>
      <DashboardHeader />

      <section className="grid gap-4 xl:grid-cols-5">
        {dashboardStats.map((stat) => (
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
            results={recentResults}
          />
        </div>
      </section>

      <section className="mt-8 grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <CurrentCourses courses={currentCourses} />
        </div>

        <div className="col-span-2">
          <UpcomingActivities activities={upcomingActivities} />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
