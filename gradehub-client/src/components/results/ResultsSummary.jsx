import StatCard from "../dashboard/DashboardStats";
import { resultSummary } from "../../constants/resultSummary";

function ResultsSummary() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
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
          valueSize="text-3xl"
        />
      ))}
    </section>
  );
}

export default ResultsSummary;
