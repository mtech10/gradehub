import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { THEME } from "../../constants/theme";

function Select({
  label,
  error,
  helperText,
  options = [],
  placeholder = null,
  className = "",
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className={THEME.input.label}>
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          className={clsx(
            THEME.input.base,
            THEME.radius.md,
            "w-full appearance-none px-4 pr-10 cursor-pointer",
            error && THEME.input.error,
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            pointer-events-none
          "
        />
      </div>

      {error ? (
        <p className={THEME.input.errorText}>{error}</p>
      ) : (
        helperText && <p className={THEME.input.helper}>{helperText}</p>
      )}
    </div>
  );
}

export default Select;
