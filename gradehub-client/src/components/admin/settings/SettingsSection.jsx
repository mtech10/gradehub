import Card from "../../ui/Card";

function SettingsSection({ title, subtitle, children }) {
  return (
    <Card className="p-4 sm:p-6 lg:p-8">
      {(title || subtitle) && (
        <div className="mb-4 sm:mb-6 border-b border-slate-100 pb-4">
          {title && (
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-1 text-xs sm:text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
      )}
      <div>{children}</div>
    </Card>
  );
}

export default SettingsSection;
