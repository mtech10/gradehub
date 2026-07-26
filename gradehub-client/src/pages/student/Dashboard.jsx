import StudentLayout from "../../layouts/StudentLayout";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";

import { dashboardStats } from "../../constants/dashboard";
import CGPAChart from "../../components/dashboard/CGPAChart";
import RecentResults from "../../components/dashboard/RecentResults";

import CurrentCourses from "../../components/dashboard/CurrentCourses";
import UpcomingActivities from "../../components/dashboard/UpcomingActivities";

function Dashboard() {
  return (
    <StudentLayout>
      <DashboardHeader />

      <section className="grid gap-6 xl:grid-cols-5">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="mt-8">
        <CGPAChart />
        <div className="mt-8">
          <RecentResults />
        </div>
      </section>

      <section className="mt-8 grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <CurrentCourses />

        <UpcomingActivities />
      </section>
    </StudentLayout>
  );
}

export default Dashboard;
