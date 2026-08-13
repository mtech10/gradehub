import DashboardHeader from "../../dashboard/DashboardHeader";
import StatCardSkeleton from "./StatCardSskeleton";
import Card from "../Card";

function DashboardSkeleton({ hasTrend = true }) {
  return (
    <div className="animate-pulse">
      <div className="mb-8 flex items-start justify-between">
        <div className="space-y-3">
          <div className="h-10 w-72 rounded-lg bg-slate-200"></div>
          <div className="h-5 w-96 rounded-lg bg-slate-200"></div>
        </div>
        <div className="text-right space-y-2">
          <div className="h-6 w-32 ml-auto rounded bg-slate-200"></div>
          <div className="h-5 w-16 ml-auto rounded bg-slate-200"></div>
        </div>
      </div>

      <section className="grid gap-4 xl:grid-cols-5 mt-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <StatCardSkeleton key={`stat-skeleton-${i}`} />
        ))}
      </section>

      <section className="mt-8 space-y-8">
        {hasTrend && (
          <Card
            title="CGPA Trend"
            subtitle="Academic performance over time"
            padding="none"
          >
            <div className="h-[420px] p-4 flex items-center justify-center">
              <div className="h-[320px] w-full rounded-xl bg-slate-100"></div>
            </div>
          </Card>
        )}

        <Card
          title="Current Semester Courses"
          subtitle="Active registered courses"
          padding="none"
        >
          <div className="p-4 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`course-row-${i}`}
                className="h-12 w-full rounded-lg bg-slate-100"
              ></div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-8 grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <Card
            title="Recent Results"
            subtitle="Latest published course results"
            padding="none"
          >
            <div className="p-4 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`result-row-${i}`}
                  className="h-12 w-full rounded-lg bg-slate-100"
                ></div>
              ))}
            </div>
          </Card>
        </div>

        <div className="col-span-2">
          <Card
            title="Upcoming Activities"
            subtitle="Academic calendar and deadlines"
          >
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`activity-row-${i}`}
                  className="h-20 w-full rounded-xl bg-slate-100 border border-slate-200"
                ></div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default DashboardSkeleton;
