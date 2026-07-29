import StudentLayout from "../../layouts/StudentLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import ResultsTable from "../../components/results/ResultsTable";
import { dashboardStats } from "../../constants/dashboard";
import CGPAChart from "../../components/dashboard/CGPAChart";

import CurrentCourses from "../../components/dashboard/CurrentCourses";
import UpcomingActivities from "../../components/dashboard/UpcomingActivities";
import { cgpaTrend } from "../../constants/chartData";

function Dashboard() {
  return (
    <>
      <DashboardHeader />

      <section className="grid gap-6 xl:grid-cols-5">
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
          />
        </div>
      </section>

      <section className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-4">
          <CurrentCourses />
        </div>

        <div className="col-span-2">
          <UpcomingActivities />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
