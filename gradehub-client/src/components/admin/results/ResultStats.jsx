import { resultStatistics } from "../../../constants/admin/results";
import AdminStatCard from "../dashboard/AdminStatCard";

function ResultStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {resultStatistics.map((stat) => (
        <AdminStatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

export default ResultStats;
