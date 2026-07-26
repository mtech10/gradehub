function StatCard({
  icon: Icon,
  title,
  value,
  suffix,
  subtitle,
  footer,
  iconColor = "bg-blue-100 text-blue-600",
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex items-start justify-between">
        <div
          className={`
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            ${iconColor}
          `}
        >
          <Icon size={30} />
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-500">{title}</p>

          <div className="mt-2 flex items-end gap-1">
            <h2 className="text-4xl font-bold text-slate-900">{value}</h2>

            {suffix && (
              <span className="pb-1 text-sm text-slate-500">{suffix}</span>
            )}
          </div>

          <p className="mt-2 font-medium text-green-600">{subtitle}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4">
        <p className="text-sm text-slate-500">{footer}</p>
      </div>
    </div>
  );
}

export default StatCard;
