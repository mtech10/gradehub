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

  const valueTextSize =
    valueSize ??
    (compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl lg:text-4xl");

  return (
    <div
      className={`
        rounded-2xl sm:rounded-3xl
        border border-slate-200
        bg-white shadow-sm
        transition-all hover:shadow-md
        ${compact ? "p-4" : "p-4 sm:p-5"}
      `}
    >
      {isCentered ? (
        <div className="flex flex-col items-center text-center">
          <div
            className={`
              mb-3 sm:mb-4 flex items-center justify-center rounded-full
              ${compact ? "h-10 w-10 sm:h-12 sm:w-12" : "h-12 w-12 sm:h-16 sm:w-16"}
              ${colors.bg}
            `}
          >
            {Icon && <Icon size={compact ? 20 : 26} className={colors.icon} />}
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {title}
          </p>

          <div className="mt-1 sm:mt-2 flex items-baseline gap-1">
            <h2 className={`font-bold text-slate-900 ${valueTextSize}`}>
              {value}
            </h2>

            {suffix && (
              <span className="text-xs sm:text-sm text-slate-500 font-normal">
                {suffix}
              </span>
            )}
          </div>

          {subtitle && (
            <p className="mt-1 text-xs sm:text-sm font-medium text-green-600 truncate">
              {subtitle}
            </p>
          )}
        </div>
      ) : (
        <div className="flex items-start justify-between gap-3">
          <div
            className={`flex items-center justify-center rounded-full shrink-0 ${
              compact
                ? "h-10 w-10 sm:h-12 sm:w-12"
                : "h-12 w-12 sm:h-14 sm:w-14"
            } ${colors.bg}`}
          >
            {Icon && <Icon size={compact ? 20 : 24} className={colors.icon} />}
          </div>

          <div className="text-right min-w-0">
            <p className="text-xs sm:text-sm text-slate-500 font-medium truncate">
              {title}
            </p>

            <div className="mt-1 flex items-baseline justify-end gap-1">
              <h2 className={`font-bold text-slate-900 ${valueTextSize}`}>
                {value}
              </h2>

              {suffix && (
                <span className="text-xs sm:text-sm text-slate-500 font-normal">
                  {suffix}
                </span>
              )}
            </div>

            {subtitle && (
              <p className="mt-1 text-xs sm:text-sm font-medium text-green-600 truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {footer && (
        <div className="mt-3 sm:mt-4 border-t border-slate-100 pt-3">
          <p className="text-xs sm:text-sm text-slate-500 truncate">{footer}</p>
        </div>
      )}
    </div>
  );
}

export default DashboardStats;
