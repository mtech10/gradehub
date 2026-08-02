import { SearchX } from "lucide-react";

function EmptyState({
  title = "No records found",
  description = "Try adjusting your search or filters.",
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="mb-4 rounded-full bg-slate-100 p-4">
        <SearchX size={36} className="text-slate-400" />
      </div>

      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 text-center text-sm text-slate-500">{description}</p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export default EmptyState;
