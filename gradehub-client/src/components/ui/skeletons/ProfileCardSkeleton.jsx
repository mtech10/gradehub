import Card from "../Card";

function ProfileCardSkeleton() {
  return (
    <Card className="p-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="h-28 w-28 shrink-0 animate-pulse rounded-full bg-slate-200"></div>

        <div className="flex w-full flex-col items-center space-y-4 sm:items-start">
          <div className="h-8 w-3/4 max-w-[250px] animate-pulse rounded bg-slate-200"></div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200"></div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <div className="h-10 w-24 animate-pulse rounded-lg bg-slate-200"></div>
            <div className="h-10 w-24 animate-pulse rounded-lg bg-slate-200"></div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProfileCardSkeleton;
