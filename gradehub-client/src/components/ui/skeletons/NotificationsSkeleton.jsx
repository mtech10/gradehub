import Card from "../Card";
import PageHeader from "../PageHeader";

function NotificationsSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          title="Notifications"
          subtitle="Stay updated with your academic activities and important announcements."
        />
        <div className="h-10 w-40 rounded-xl bg-slate-200"></div>
      </div>

      <div className="grid gap-8 xl:grid-cols-12">
        {}
        <div className="xl:col-span-8">
          <Card padding="none" className="overflow-hidden">
            {}
            <div className="flex items-center gap-4 border-b border-slate-200 px-6 pt-4 pb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`tab-skel-${i}`}
                  className="h-8 w-20 rounded bg-slate-200"
                ></div>
              ))}
            </div>

            {}
            <div className="p-4 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`notif-row-${i}`}
                  className="flex items-start gap-4 border-b border-slate-100 pb-4"
                >
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-slate-200"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-3/4 rounded bg-slate-200"></div>
                    <div className="h-3 w-1/2 rounded bg-slate-100"></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {}
        <div className="space-y-6 xl:col-span-4">
          <Card title="Notification Summary">
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`summary-skel-${i}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-slate-200"></div>
                    <div className="h-4 w-28 rounded bg-slate-200"></div>
                  </div>
                  <div className="h-4 w-8 rounded bg-slate-200"></div>
                </div>
              ))}
            </div>
          </Card>

          <Card padding="lg">
            <div className="h-6 w-28 rounded bg-slate-200 mb-2"></div>
            <div className="h-12 w-full rounded bg-slate-100 mb-6"></div>
            <div className="h-11 w-full rounded-xl bg-slate-200"></div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default NotificationsSkeleton;
