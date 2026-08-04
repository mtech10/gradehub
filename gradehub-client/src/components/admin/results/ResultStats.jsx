import AdminStatCard from "../dashboard/AdminStatCard";

function ResultStats({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <AdminStatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

export default ResultStats;
