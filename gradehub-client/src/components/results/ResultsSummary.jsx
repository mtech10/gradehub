import StatCard from "../dashboard/DashboardStats";

function ResultsSummary({ summary = [] }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {summary.map((item) => (
        <StatCard key={item.title} {...item} valueSize="text-3xl" />
      ))}
    </section>
  );
}

export default ResultsSummary;
