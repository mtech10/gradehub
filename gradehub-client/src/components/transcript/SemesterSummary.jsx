import { GraduationCap, BookOpen, Trophy, Percent } from "lucide-react";
import StatCard from "../dashboard/DashboardStats";

function SemesterSummary({ semester }) {
  const gpa = semester?.gpa ?? 0;

  const totalUnits =
    semester?.totalCredits ?? semester?.totalUnits ?? semester?.units ?? 0;

  const totalCourses = semester?.totalCourses ?? semester?.courses?.length ?? 0;
  const averageScore = semester?.averageScore ?? 0;

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
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
          value={Number(gpa).toFixed(2)}
          icon={GraduationCap}
          color="primary"
        />

        <StatCard
          compact
          layout="center"
          title="Credit Units"
          value={totalUnits}
          icon={BookOpen}
          color="success"
        />

        <StatCard
          compact
          layout="center"
          title="Courses"
          value={totalCourses}
          icon={Trophy}
          color="purple"
        />

        <StatCard
          compact
          layout="center"
          title="Average Score"
          value={`${Number(averageScore).toFixed(1)}%`}
          icon={Percent}
          color="warning"
        />
      </div>
    </div>
  );
}

export default SemesterSummary;
