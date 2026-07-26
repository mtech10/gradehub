import clsx from "clsx";
import { THEME } from "../../constants/theme";

function Card({
  children,
  title,
  subtitle,
  headerAction,
  className = "",
  shadow = "lg",
  radius = "lg",
  padding = "lg",
  width = "w-full",
  bodyClassName = "",
  ...props
}) {
  return (
    <div
      className={clsx(
        width,
        THEME.card.background,
        THEME.card.border,
        THEME.shadows[shadow],
        THEME.radius[radius],
        className,
      )}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-start justify-between border-b border-slate-200 p-6">
          <div>
            {title && (
              <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            )}
          </div>

          {headerAction}
        </div>
      )}

      <div
        className={clsx(
          padding !== "none" && THEME.card.padding[padding],
          bodyClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Card;
