import clsx from "clsx";
import { THEME } from "../../constants/theme";

function Textarea({
  label,
  error,
  helperText,
  className = "",
  rows = 5,
  ...props
}) {
  return (
    <div className={className}>
      {label && <label className={THEME.input.label}>{label}</label>}

      <textarea
        rows={rows}
        className={clsx(
          THEME.input.base,
          THEME.radius.md,
          "w-full resize-none px-4 py-3",
          error && THEME.input.error,
        )}
        {...props}
      />

      {error ? (
        <p className={THEME.input.errorText}>{error}</p>
      ) : (
        helperText && <p className={THEME.input.helper}>{helperText}</p>
      )}
    </div>
  );
}

export default Textarea;
