import clsx from "clsx";
import { THEME } from "../../constants/theme";

function Card({
  children,
  className = "",
  shadow = "lg",
  radius = "lg",
  padding = "lg",
  width = "w-full",
  ...props
}) {
  return (
    <div
      className={clsx(
        width,
        THEME.card.background,
        THEME.card.border,
        THEME.card.padding[padding],
        THEME.shadows[shadow],
        THEME.radius[radius],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
