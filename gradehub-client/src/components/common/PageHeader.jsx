import { THEME } from "../../constants/theme";

function PageHeader({ title, subtitle, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <h1 className={THEME.typography.h3}>{title}</h1>

      {subtitle && (
        <p className={`${THEME.typography.bodySmall} mt-2`}>{subtitle}</p>
      )}
    </div>
  );
}

export default PageHeader;
