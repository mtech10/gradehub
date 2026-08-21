import PageHeader from "../../common/PageHeader";
import Card from "../Card";

function CourseRegistrationSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {}
      <PageHeader
        title="Course Registration"
        subtitle="Register and manage your courses for the current academic session."
      />

      <div className="grid gap-8 xl:grid-cols-12">
        {}
        <div className="xl:col-span-8">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {}
            <div className="border-b border-slate-200 bg-slate-50 p-5 space-y-4">
              <div className="h-11 w-full rounded-xl bg-slate-200"></div>
              <div className="h-20 w-full rounded-xl bg-slate-200"></div>
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={`tab-${i}`}
                    className="h-9 w-24 rounded-lg bg-slate-200"
                  ></div>
                ))}
              </div>
            </div>

            {}
            <div className="p-4 space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`row-${i}`}
                  className="h-14 w-full rounded-lg bg-slate-100"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="xl:col-span-4">
          <div className="sticky top-24">
            <Card padding="lg" className="border-slate-200">
              <div className="space-y-6">
                <div className="h-16 w-full rounded-xl bg-slate-100"></div>
                <div className="space-y-4">
                  <div className="h-6 w-full rounded bg-slate-100"></div>
                  <div className="h-6 w-full rounded bg-slate-100"></div>
                  <div className="h-12 w-full rounded bg-slate-100"></div>
                </div>
                <div className="h-12 w-full rounded-xl bg-slate-200"></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistrationSkeleton;
