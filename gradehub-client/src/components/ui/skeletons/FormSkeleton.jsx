import Card from "../Card";

function FormSkeleton() {
  return (
    <Card className="p-8">
      <div className="mb-8 space-y-2">
        <div className="h-6 w-1/4 animate-pulse rounded bg-slate-200"></div>
        <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-1/4 animate-pulse rounded bg-slate-200"></div>
            <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200"></div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-end gap-4 border-t border-slate-100 pt-6">
        <div className="h-11 w-28 animate-pulse rounded-xl bg-slate-200"></div>
        <div className="h-11 w-32 animate-pulse rounded-xl bg-slate-200"></div>
      </div>
    </Card>
  );
}

export default FormSkeleton;
