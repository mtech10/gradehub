import { Calculator, GraduationCap, Star, BarChart3 } from "lucide-react";

import Card from "../ui/Card";
import StatCard from "../dashboard/DashboardStats";
import { getGPARemark } from "../../utils/gpaUtils";

function GPAResultsSummary({
  gpa,
  totalUnits,
  totalQualityPoints,
  semesterLabel,
  classRank,
}) {
  const remark = getGPARemark(gpa);

  return (
    <Card
      title="Your Results"
      subtitle="Based on the courses you entered above."
      padding="lg"
      className="p-4 sm:p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Calculator}
          title="Semester GPA"
          value={gpa.toFixed(2)}
          subtitle={remark.label}
          footer={`For ${semesterLabel}`}
          color="primary"
          compact
          valueSize="text-2xl sm:text-3xl"
        />

        <StatCard
          icon={GraduationCap}
          title="Total Units"
          value={totalUnits}
          footer="Registered Units"
          color="success"
          compact
          valueSize="text-2xl sm:text-3xl"
        />

        <StatCard
          icon={Star}
          title="Total Quality Points"
          value={totalQualityPoints}
          footer="Sum of (Units × Grade Point)"
          color="purple"
          compact
          valueSize="text-2xl sm:text-3xl"
        />

        <StatCard
          icon={BarChart3}
          title="Class Rank (Est.)"
          value={classRank}
          footer="Top 5% of your class"
          color="warning"
          compact
          valueSize="text-2xl sm:text-3xl"
        />
      </div>
    </Card>
  );
}

export default GPAResultsSummary;
