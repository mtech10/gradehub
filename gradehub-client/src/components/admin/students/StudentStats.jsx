import AdminStatCard from "../dashboard/AdminStatCard";

function StudentStats({ stats }) {
  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <AdminStatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

export default StudentStats;
