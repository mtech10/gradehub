import StatCard from "../dashboard/DashboardStats";

function CourseStats({ stats = [] }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} compact />
      ))}
    </section>
  );
}

export default CourseStats;
