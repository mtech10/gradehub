import StatCardSkeleton from "./StatCardSskeleton";
import Card from "../Card";

function ResultsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header and Term Selector Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded bg-slate-200"></div>
          <div className="h-4 w-72 rounded bg-slate-200"></div>
        </div>
        <div className="h-10 w-48 rounded-xl bg-slate-200"></div>
      </div>

      {/* Stats Cards Grid Skeletons */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StatCardSkeleton key={`result-stat-skeleton-${i}`} />
        ))}
      </section>

      {/* Results Table Skeleton */}
      <Card
        title="Term Results"
        subtitle="Published course results"
        padding="none"
      >
        <div className="p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`result-row-skeleton-${i}`}
              className="h-12 w-full rounded-lg bg-slate-100"
            ></div>
          ))}
        </div>
      </Card>

      {/* Review Notice Skeleton */}
      <div className="h-28 w-full rounded-2xl bg-blue-50/60 border border-blue-100 p-5"></div>
    </div>
  );
}

export default ResultsSkeleton;
