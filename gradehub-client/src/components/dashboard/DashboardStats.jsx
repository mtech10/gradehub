import { THEME } from "../../constants/theme";

function DashboardStats({
  icon: Icon,
  title,
  value,
  suffix,
  subtitle,
  footer,
  color = "primary",
  compact = false,
  layout = "horizontal",
  valueSize,
}) {
  const colors = THEME.statCard[color] ?? THEME.statCard.primary;
  const isCentered = layout === "center";

  const valueTextSize = valueSize ?? (compact ? "text-2xl" : "text-4xl");

  return (
    <div
      className={`
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        hover:shadow-md
        ${compact ? "p-5" : "p-4"}
      `}
    >
      {isCentered ? (
        <>
          <div className="flex flex-col items-center text-center">
            <div
              className={`
                mb-5
                flex
                items-center
                justify-center
                rounded-full
                ${compact ? "h-12 w-12" : "h-16 w-16"}
                ${colors.bg}
              `}
            >
              <Icon size={compact ? 22 : 30} className={colors.icon} />
            </div>

            <p className="text-sm text-slate-500">{title}</p>

            <div className="mt-2 flex items-end gap-1">
              <h2 className={`font-bold text-slate-900 ${valueTextSize}`}>
                {value}
              </h2>

              {suffix && (
                <span className="pb-1 text-sm text-slate-500">{suffix}</span>
              )}
            </div>

            {subtitle && (
              <p className="mt-2 font-medium text-green-600">{subtitle}</p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start justify-between">
            <div
              className={`flex items-center justify-center rounded-full ${compact ? "h-12 w-12" : "h-16 w-16"} ${colors.bg}`}
            >
              <Icon size={compact ? 22 : 30} className={colors.icon} />
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-500">{title}</p>

              <div className="mt-2 flex items-end justify-end gap-1">
                <h2 className={`font-bold text-slate-900 ${valueTextSize}`}>
                  {value}
                </h2>

                {suffix && (
                  <span className="pb-1 text-sm text-slate-500">{suffix}</span>
                )}
              </div>

              {subtitle && (
                <p className="mt-2 font-medium text-green-600">{subtitle}</p>
              )}
            </div>
          </div>
        </>
      )}

      {footer && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">{footer}</p>
        </div>
      )}
    </div>
  );
}

export default DashboardStats;
