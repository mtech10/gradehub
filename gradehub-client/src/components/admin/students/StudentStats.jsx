import { studentStatistics } from "../../../constants/admin/students";
import AdminStatCard from "../dashboard/AdminStatCard";

function StudentStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {studentStatistics.map((stat) => (
        <AdminStatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

export default StudentStats;
