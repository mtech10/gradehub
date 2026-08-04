import StatCard from "../dashboard/DashboardStats";

function ResultsStats({ stats = [] }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} valueSize="text-3xl" />
      ))}
    </section>
  );
}

export default ResultsStats;
