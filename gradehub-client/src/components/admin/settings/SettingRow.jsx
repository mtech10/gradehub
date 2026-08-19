import Toggle from "../../ui/Toggle";

function SettingRow({
  title,
  description,
  checked,
  onValueChange,
  children,
  bordered = true,
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 sm:gap-8 py-4 sm:py-6 ${
        bordered ? "border-b border-slate-200" : ""
      }`}
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>

        {description && (
          <p className="mt-1 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-500">
            {description}
          </p>
        )}

        {children && <div className="mt-3 sm:mt-4">{children}</div>}
      </div>

      {typeof checked === "boolean" && (
        <div className="shrink-0 pt-0.5 sm:pt-0">
          <Toggle checked={checked} onCheckedChange={onValueChange} />
        </div>
      )}
    </div>
  );
}

export default SettingRow;
