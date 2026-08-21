import StatCardSkeleton from "./StatCardSskeleton";
import Card from "../Card";

function TranscriptSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <div className="h-8 w-56 rounded bg-slate-200"></div>
          <div className="h-4 w-96 rounded bg-slate-200"></div>
        </div>
        <div className="h-11 w-52 rounded-xl bg-slate-200"></div>
      </div>

      {}
      <Card padding="lg">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`bio-skeleton-${i}`}
              className="flex items-start gap-4 rounded-2xl border border-slate-100 p-4"
            >
              <div className="h-12 w-12 rounded-xl bg-slate-200"></div>
              <div className="space-y-2 flex-1">
                <div className="h-3 w-20 rounded bg-slate-200"></div>
                <div className="h-5 w-28 rounded bg-slate-200"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-6 w-56 rounded bg-slate-200"></div>
          <div className="h-4 w-80 rounded bg-slate-200"></div>
        </div>
        <div className="grid gap-4 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StatCardSkeleton key={`summary-skeleton-${i}`} />
          ))}
        </div>
      </div>

      {}
      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={`session-skeleton-${i}`}
            className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4"
          >
            <div className="h-6 w-48 rounded bg-slate-200"></div>
            <div className="h-4 w-32 rounded bg-slate-200"></div>
            <div className="h-48 w-full rounded-xl bg-slate-100"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TranscriptSkeleton;
