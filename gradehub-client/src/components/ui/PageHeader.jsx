import { THEME } from "../../constants/theme";

function PageHeader({ title, description, actions, className = "" }) {
  return (
    <div
      className={`
        flex flex-col gap-4
        lg:flex-row
        lg:items-end
        lg:justify-between
        ${className}
      `}
    >
      {/* Left */}
      <div>
        <h1 className={THEME.typography.h2}>{title}</h1>

        {description && (
          <p className={`${THEME.typography.body} mt-2`}>{description}</p>
        )}
      </div>

      {/* Right */}
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

export default PageHeader;
