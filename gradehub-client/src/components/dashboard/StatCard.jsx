import { THEME } from "../../constants/theme";

function StatCard({
  icon: Icon,
  title,
  value,
  suffix,
  subtitle,
  footer,
  color = "blue",
}) {
  const colors = THEME.statCard[color] || THEME.statCard.blue;

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full ${colors.bg}`}
        >
          <Icon size={28} className={colors.icon} />
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">{title}</p>

          <div className="mt-2 flex items-end justify-end gap-1">
            <h2 className="text-3xl font-bold text-slate-900">{value}</h2>

            {suffix && (
              <span className="pb-1 text-sm text-slate-500">{suffix}</span>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        {subtitle && (
          <p className="mt-2 font-medium text-blue-600">{subtitle}</p>
        )}
      </div>

      {footer && (
        <div className="mt-2 border-t border-slate-100 pt-2">
          <p className="text-sm text-slate-500">{footer}</p>
        </div>
      )}
    </div>
  );
}

export default StatCard;
