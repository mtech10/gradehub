import StatCard from "../dashboard/DashboardStats";
import { courseStats } from "../../constants/courses/courseStats";

function CourseStats() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {courseStats.map((stat) => (
        <StatCard
          key={stat.title}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          color={stat.color}
          compact
        />
      ))}
    </section>
  );
}

export default CourseStats;
