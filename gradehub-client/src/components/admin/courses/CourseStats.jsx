import { courseStatistics } from "../../../constants/admin/courses";
import AdminStatCard from "../dashboard/AdminStatCard";

function CourseStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {courseStatistics.map((stat) => (
        <AdminStatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

export default CourseStats;
