import { Check, Minus } from "lucide-react";

function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`
        flex h-5 w-5 items-center justify-center
        rounded border-2 transition-all duration-200

        ${
          checked || indeterminate
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-slate-400 bg-white hover:border-blue-500"
        }

        ${className}
      `}
    >
      {checked && <Check size={13} strokeWidth={3} />}

      {!checked && indeterminate && <Minus size={13} strokeWidth={3} />}
    </button>
  );
}

export default Checkbox;
