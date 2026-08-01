import Card from "../../ui/Card";

function AdminStatCard({ title, value, icon: Icon, color = "blue", subtitle }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    amber: "bg-amber-100 text-amber-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors[color]}`}
        >
          <Icon size={22} />
        </div>
      </div>
    </Card>
  );
}

export default AdminStatCard;
