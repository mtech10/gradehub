import clsx from "clsx";
import { THEME } from "../../constants/theme";

function Select({
  label,
  error,
  helperText,
  options = [],
  placeholder = "Select an option",
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      {label && <label className={THEME.input.label}>{label}</label>}

      <select
        className={clsx(
          THEME.input.base,
          THEME.radius.md,
          "px-4 appearance-none cursor-pointer",
          error && THEME.input.error,
          className,
        )}
        {...props}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error ? (
        <p className={THEME.input.errorText}>{error}</p>
      ) : (
        helperText && <p className={THEME.input.helper}>{helperText}</p>
      )}
    </div>
  );
}

export default Select;
