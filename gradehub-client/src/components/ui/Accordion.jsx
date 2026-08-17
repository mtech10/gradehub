import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

function Accordion({
  title,
  subtitle,
  children,
  defaultOpen = false,
  headerAction,
}) {
  const [open, setOpen] = useState(defaultOpen);

  const handleToggle = (e) => {
    // Prevent accordion from toggling if the user clicked an inner button/link
    if (e.target.closest("button, a")) return;
    setOpen(!open);
  };

  const handleKeyDown = (e) => {
    // Enable keyboard accessibility (Enter or Space to toggle)
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(!open);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header (Changed from <button> to <div role="button"> to fix nesting errors) */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="
          flex
          w-full
          cursor-pointer
          items-center
          justify-between
          px-6
          py-5
          text-left
          transition-colors
          hover:bg-slate-50
        "
      >
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {headerAction}

          <ChevronDown
            size={22}
            className={clsx(
              "transition-transform duration-300",
              open && "rotate-180",
            )}
          />
        </div>
      </div>

      {/* Body */}
      <div
        className={clsx(
          "grid transition-all duration-300 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-200 p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
