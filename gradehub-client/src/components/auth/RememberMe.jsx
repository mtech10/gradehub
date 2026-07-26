function RememberMe({ checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="
          h-5
          w-5
          rounded
          border-slate-300
          text-blue-600
          focus:ring-blue-500
        "
      />

      <span className="text-sm text-slate-600">Remember me</span>
    </label>
  );
}

export default RememberMe;
