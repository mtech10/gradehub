function Divider({ text = "OR" }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-slate-200" />

      <span className="text-sm font-medium uppercase tracking-wider text-slate-400">
        {text}
      </span>

      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

export default Divider;
