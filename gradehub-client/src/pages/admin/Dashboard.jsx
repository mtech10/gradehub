import PageHeader from "../../components/common/PageHeader";
import DashboardStats from "../../components/admin/dashboard/DashboardStats";
import { dashboardStats } from "../../constants/admin/dashboardData";
import DashboardQuickActions from "../../components/admin/dashboard/DashboardQuickActions";
import RecentStudentsTable from "../../components/admin/dashboard/RecentStudentsTable";
import PendingResultsTable from "../../components/admin/dashboard/PendingResultsTable";
import DepartmentOverview from "../../components/admin/dashboard/DepartmentOverview";
import UpcomingActivities from "../../components/admin/dashboard/UpcomingActivities";

function Dashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Overview of students, departments, courses and academic activities."
      />

      <DashboardStats stats={dashboardStats} />
      <DashboardQuickActions />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <RecentStudentsTable />
          <PendingResultsTable />
        </div>

        <div className="space-y-6">
          <DepartmentOverview />
          <UpcomingActivities />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
