import Card from "../Card";
import PageHeader from "../PageHeader";

function ProfileSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* 1. Header Skeleton */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          title="My Profile"
          subtitle="View and manage your personal information."
        />
        <div className="h-10 w-32 rounded-xl bg-slate-200"></div>
      </div>

      {/* 2. Profile Main Card Skeleton */}
      <Card padding="none" className="overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="flex w-full flex-col items-center border-b border-slate-100 p-8 lg:w-1/3 lg:border-b-0 lg:border-r space-y-4">
            <div className="h-32 w-32 rounded-full bg-slate-200"></div>
            <div className="h-6 w-48 rounded bg-slate-200"></div>
            <div className="h-6 w-24 rounded-full bg-slate-200"></div>
            <div className="w-full space-y-3 mt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`avatar-info-${i}`}
                  className="h-5 w-full rounded bg-slate-100"
                ></div>
              ))}
            </div>
          </div>
          <div className="w-full p-8 lg:w-2/3">
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`detail-grid-${i}`}
                  className="flex items-start gap-4"
                >
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-200"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-20 rounded bg-slate-200"></div>
                    <div className="h-4 w-32 rounded bg-slate-200"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 3. Three Info Cards Grid Skeletons */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`info-card-skeleton-${i}`}
            className="h-72 w-full rounded-2xl bg-slate-200"
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ProfileSkeleton;
