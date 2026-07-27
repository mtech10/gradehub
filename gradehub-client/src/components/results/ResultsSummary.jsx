import StatCard from "../dashboard/StatCard";
import { resultSummary } from "../../constants/resultSummary";

function ResultsSummary() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {resultSummary.map((item) => (
        <StatCard
          key={item.title}
          icon={item.icon}
          title={item.title}
          value={item.value}
          suffix={item.suffix}
          subtitle={item.subtitle}
          footer={item.footer}
          color={item.color}
        />
      ))}
    </section>
  );
}

export default ResultsSummary;
