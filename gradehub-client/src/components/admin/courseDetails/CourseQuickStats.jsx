import { Users, Trophy, BarChart3, ClipboardCheck } from "lucide-react";
import AdminStatCard from "../dashboard/AdminStatCard";

function CourseQuickStats({ students, results }) {
  const totalStudents = students.length;

  const averageScore =
    results.length > 0
      ? (
          results.reduce((sum, item) => sum + item.score, 0) / results.length
        ).toFixed(1)
      : 0;

  const passCount = results.filter((item) => item.score >= 45).length;

  const passRate =
    results.length > 0
      ? `${Math.round((passCount / results.length) * 100)}%`
      : "0%";

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <AdminStatCard
        title="Enrolled Students"
        value={totalStudents}
        subtitle="Registered students"
        icon={Users}
        color="blue"
      />

      <AdminStatCard
        title="Result Entries"
        value={results.length}
        subtitle="Uploaded assessments"
        icon={ClipboardCheck}
        color="green"
      />

      <AdminStatCard
        title="Average Score"
        value={averageScore}
        subtitle="Overall performance"
        icon={BarChart3}
        color="purple"
      />

      <AdminStatCard
        title="Pass Rate"
        value={passRate}
        subtitle="Students passed"
        icon={Trophy}
        color="amber"
      />
    </div>
  );
}

export default CourseQuickStats;
