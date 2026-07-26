import clsx from "clsx";
import { THEME } from "../../constants/theme";

function Badge({
  children,
  variant = "info",
  size = "md",
  rounded = "full",
  className = "",
}) {
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={clsx(
        THEME.badge.base,
        THEME.badge.variants[variant],
        sizes[size],
        rounded === "full" ? "rounded-full" : "rounded-lg",
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
