import Card from "../Card";
import PageHeader from "../PageHeader";
import StatCardSkeleton from "./StatCardSskeleton";

function GPACalculatorSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {}
      <PageHeader
        title="GPA Calculator"
        description="Calculate your GPA for a semester or estimate your CGPA based on your courses."
      />

      <div className="grid gap-8 xl:grid-cols-3">
        {}
        <div className="space-y-8 xl:col-span-2">
          {}
          <Card title="Add your courses" padding="lg">
            <div className="space-y-4">
              <div className="h-10 w-full rounded bg-slate-100"></div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`input-row-${i}`}
                  className="h-14 w-full rounded-xl bg-slate-100"
                ></div>
              ))}
              <div className="flex justify-between pt-4">
                <div className="h-10 w-28 rounded-lg bg-slate-200"></div>
                <div className="h-10 w-28 rounded-lg bg-slate-200"></div>
              </div>
            </div>
          </Card>

          {}
          <Card
            title="Your Results"
            subtitle="Based on the courses you entered above."
            padding="lg"
          >
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <StatCardSkeleton key={`gpa-stat-${i}`} />
              ))}
            </div>
          </Card>

          {}
          <div className="h-20 w-full rounded-2xl bg-blue-50/50 border border-blue-100"></div>
        </div>

        {}
        <div className="space-y-8">
          <Card padding="lg">
            <div className="h-6 w-24 rounded bg-slate-200 mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`tip-${i}`}
                  className="h-4 w-full rounded bg-slate-100"
                ></div>
              ))}
            </div>
          </Card>

          <Card title="Grading Scale" padding="lg">
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={`scale-${i}`}
                  className="h-8 w-full rounded bg-slate-100"
                ></div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GPACalculatorSkeleton;
