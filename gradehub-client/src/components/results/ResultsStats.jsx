import StatCard from "../dashboard/DashboardStats";

function ResultsStats({ stats = [] }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} valueSize="text-2xl sm:text-3xl" />
      ))}
    </section>
  );
}

export default ResultsStats;
