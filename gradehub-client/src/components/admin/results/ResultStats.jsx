import { FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";

import AdminStatCard from "../dashboard/AdminStatCard";

function ResultStats({ stats }) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <AdminStatCard
        title="Total Results"
        value={stats.totalResults}
        icon={FileText}
        color="blue"
        subtitle="All submitted results"
      />

      <AdminStatCard
        title="Approved"
        value={stats.approved}
        icon={CheckCircle}
        color="green"
        subtitle="Approved results"
      />

      <AdminStatCard
        title="Pending"
        value={stats.pending}
        icon={Clock}
        color="amber"
        subtitle="Awaiting approval"
      />

      <AdminStatCard
        title="Missing"
        value={stats.missing}
        icon={AlertTriangle}
        color="red"
        subtitle="Results not submitted"
      />
    </section>
  );
}

export default ResultStats;
