import QuickActionCard from "./QuickActionCard";

function DashboardQuickActions({ actions }) {
  return (
    <section className="space-y-4 pt-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>

        <p className="text-sm text-slate-500">
          Frequently used administrative tasks.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => (
          <QuickActionCard key={action.title} action={action} />
        ))}
      </div>
    </section>
  );
}

export default DashboardQuickActions;
