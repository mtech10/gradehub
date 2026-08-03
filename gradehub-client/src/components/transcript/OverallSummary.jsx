import {
  GraduationCap,
  BookOpen,
  Target,
  Trophy,
  CalendarDays,
} from "lucide-react";

import StatCard from "../dashboard/DashboardStats";

import { getCurrentStudentTranscript } from "../../utils/currentStudentTranscript";
import { getTranscriptSummary } from "../../utils/transcriptUtils";

function OverallSummary() {
  const student = getCurrentStudentTranscript();

  const summary = getTranscriptSummary(student.sessions);
  const cards = [
    {
      title: "CGPA",
      value: summary.cgpa,
      suffix: "/5.00",
      subtitle: "Excellent Performance",
      icon: GraduationCap,
      color: "primary",
    },
    {
      title: "Courses Completed",
      value: summary.totalCourses,
      subtitle: "Successfully Passed",
      icon: BookOpen,
      color: "success",
    },
    {
      title: "Credit Units",
      value: summary.totalUnits,
      subtitle: "Earned",
      icon: Target,
      color: "warning",
    },
    {
      title: "Degree Class",
      value: summary.degreeClass,
      subtitle: "Current Standing",
      icon: Trophy,
      color: "purple",
    },
    {
      title: "Academic Sessions",
      value: summary.totalSessions,
      subtitle: "Completed",
      icon: CalendarDays,
      color: "info",
    },
  ];

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Overall Academic Summary
        </h2>

        <p className="mt-1 text-slate-500">
          A snapshot of your cumulative academic performance.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        {cards.map((card) => (
          <StatCard key={card.title} compact layout="center" {...card} />
        ))}
      </div>
    </section>
  );
}

export default OverallSummary;
