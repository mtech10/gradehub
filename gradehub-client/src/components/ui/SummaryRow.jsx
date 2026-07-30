function SummaryRow({ label, value, bordered = true }) {
  return (
    <div
      className={`
        flex
        items-center
        justify-between
        py-3
        ${bordered ? "border-b border-slate-100" : ""}
      `}
    >
      <span className="text-sm text-slate-500">{label}</span>

      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}

export default SummaryRow;
