import AdminStatCard from "./AdminStatCard";

function DashboardStats({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <AdminStatCard
          key={item.id}
          title={item.title}
          value={item.value}
          subtitle={item.subtitle}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
}

export default DashboardStats;
