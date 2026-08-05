import PageHeader from "../../components/common/PageHeader";
import DashboardStats from "../../components/admin/dashboard/DashboardStats";
import {
  dashboardStats,
  dashboardQuickActions,
  recentStudents,
  pendingResults,
  departmentOverview,
  upcomingActivities,
} from "../../constants/admin/dashboardData";
import DashboardQuickActions from "../../components/admin/dashboard/DashboardQuickActions";
import RecentStudentsTable from "../../components/admin/dashboard/RecentStudentsTable";
import PendingResultsTable from "../../components/admin/dashboard/PendingResultsTable";
import DepartmentOverview from "../../components/admin/dashboard/DepartmentOverview";
import UpcomingActivities from "../../components/admin/dashboard/UpcomingActivities";
import { useState } from "react";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    stats: dashboardStats,
    quickActions: dashboardQuickActions,
    recentStudents,
    pendingResults,
    departments: departmentOverview,
    activities: upcomingActivities,
  });

  return (
    <>
      <DashboardStats stats={dashboardData.stats} />

      <DashboardQuickActions actions={dashboardData.quickActions} />

      <RecentStudentsTable students={dashboardData.recentStudents} />

      <PendingResultsTable results={dashboardData.pendingResults} />

      <DepartmentOverview departments={dashboardData.departments} />

      <UpcomingActivities activities={dashboardData.activities} />
    </>
  );
}

export default Dashboard;
