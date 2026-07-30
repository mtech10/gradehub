function Checkbox({ checked, onChange, disabled = false, className = "" }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      className={`
        h-4
        w-4
        cursor-pointer
        rounded
        border-slate-300
        text-blue-600
        focus:ring-2
        focus:ring-blue-500
        ${className}
      `}
    />
  );
}

export default Checkbox;
