import StatCard from "../dashboard/StatCard";
import { resultStats } from "../../constants/resultStats";

function ResultsStats() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {resultStats.map((stat) => (
        <StatCard
          key={stat.title}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          suffix={stat.suffix}
          subtitle={stat.subtitle}
          footer={stat.footer}
          color={stat.color}
          valueSize="text-3xl"
        />
      ))}
    </section>
  );
}

export default ResultsStats;
