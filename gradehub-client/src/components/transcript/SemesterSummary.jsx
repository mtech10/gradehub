import { GraduationCap, BookOpen, Trophy, Percent } from "lucide-react";

import StatCard from "../dashboard/DashboardStats";
import { getSemesterSummary } from "../../utils/transcriptUtils";

function SemesterSummary({ semester }) {
  const summary = getSemesterSummary(semester);

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Semester Summary
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Academic performance overview for this semester.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          compact
          layout="center"
          title="Semester GPA"
          value={summary.gpa.toFixed(2)}
          icon={GraduationCap}
          color="primary"
        />

        <StatCard
          compact
          layout="center"
          title="Credit Units"
          value={summary.units}
          icon={BookOpen}
          color="success"
        />

        <StatCard
          compact
          layout="center"
          title="Courses"
          value={summary.totalCourses}
          icon={Trophy}
          color="purple"
        />

        <StatCard
          compact
          layout="center"
          title="Average Score"
          value={`${summary.averageScore.toFixed(1)}%`}
          icon={Percent}
          color="warning"
        />
      </div>
    </div>
  );
}

export default SemesterSummary;
