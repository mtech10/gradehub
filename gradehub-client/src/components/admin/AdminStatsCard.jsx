import Card from "../ui/Card";

function AdminStatsCard({
  title,
  value,
  icon: Icon,
  color = "blue",
  subtitle,
  trend,
}) {
  const colorClasses = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    green: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },
    amber: {
      bg: "bg-amber-100",
      text: "text-amber-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
  };

  const styles = colorClasses[color] || colorClasses.blue;

  return (
    <Card className="border border-slate-200">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="text-3xl font-bold text-slate-900">{value}</h3>

          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}

          {trend && (
            <p className="text-sm font-medium text-emerald-600">{trend}</p>
          )}
        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            ${styles.bg}
          `}
        >
          <Icon className={`h-7 w-7 ${styles.text}`} />
        </div>
      </div>
    </Card>
  );
}

export default AdminStatsCard;
