function AuthToggle({ options, value, onChange }) {
  return (
    <div className="grid grid-cols-2 rounded-xl border border-slate-200 bg-white p-1">
      {options.map((option) => {
        const active = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              flex h-14 items-center justify-center gap-2
              rounded-lg
              border
              text-sm
              font-semibold
              transition-all
              ${
                active
                  ? "border-blue-200 bg-blue-50 text-blue-600 shadow-sm"
                  : "border-transparent text-slate-600 hover:bg-slate-50"
              }
            `}
          >
            <option.icon size={18} />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default AuthToggle;
