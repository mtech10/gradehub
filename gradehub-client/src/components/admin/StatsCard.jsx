import Card from "../../ui/Card";

function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = "text-blue-600",
  iconBackground = "bg-blue-100",
}) {
  return (
    <Card className="border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h2 className="text-3xl font-bold text-slate-900">{value}</h2>

          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconBackground}`}
        >
          <Icon className={`h-7 w-7 ${iconColor}`} />
        </div>
      </div>
    </Card>
  );
}

export default StatsCard;
