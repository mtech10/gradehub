import Card from "../Card";

function QuickActionCardSkeleton() {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-slate-200"></div>

      <div className="w-full space-y-2">
        <div className="h-5 w-1/2 animate-pulse rounded bg-slate-200"></div>
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200"></div>
      </div>
    </Card>
  );
}

export default QuickActionCardSkeleton;
