import { THEME } from "../../constants/theme";

function PageHeader({ title, description, actions, className = "" }) {
  return (
    <div
      className={`
        flex flex-col gap-4
        sm:flex-row
        sm:items-end
        sm:justify-between
        ${className}
      `}
    >
      {}
      <div>
        <h1 className={THEME.typography.h2}>{title}</h1>

        {description && (
          <p className={`${THEME.typography.body} mt-2`}>{description}</p>
        )}
      </div>

      {}
      {actions && (
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          {actions}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
