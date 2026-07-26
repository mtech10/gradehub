import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  helperText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-700">
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {LeftIcon && (
          <LeftIcon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            h-14
            w-full
            rounded-xl
            border
            px-4
            ${LeftIcon ? "pl-11" : ""}
            ${isPassword || RightIcon ? "pr-12" : ""}
            border-slate-300
            bg-white
            text-slate-900
            placeholder:text-slate-400
            outline-none
            transition
            focus:border-blue-600
            focus:ring-2
            focus:ring-blue-100
            disabled:bg-slate-100
            disabled:cursor-not-allowed
            ${error ? "border-red-500" : ""}
            ${className}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {!isPassword && RightIcon && (
          <RightIcon
            size={18}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}
      </div>

      {helperText && !error && (
        <p className="text-sm text-slate-500">{helperText}</p>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
