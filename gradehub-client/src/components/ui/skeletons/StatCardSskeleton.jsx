import Card from "../Card";

function StatCardSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-3 w-full">
          <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200"></div>
          <div className="h-8 w-1/3 animate-pulse rounded bg-slate-200"></div>
          <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200"></div>
        </div>
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-slate-200"></div>
      </div>
    </Card>
  );
}

export default StatCardSkeleton;
