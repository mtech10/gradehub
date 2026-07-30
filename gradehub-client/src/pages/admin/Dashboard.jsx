import PageHeader from "../../components/common/PageHeader";
import AdminStatsCard from "../../components/admin/AdminStatsCard";
import { dashboardStats } from "../../data/admin/dashboardData";

function Dashboard() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage students, courses and academic records."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <AdminStatsCard key={stat.id} {...stat} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
