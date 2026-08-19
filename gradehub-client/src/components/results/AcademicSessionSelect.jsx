import { useState } from "react";
import { CalendarDays, ChevronDown, Check } from "lucide-react";

const sessions = ["2024/2025", "2023/2024", "2022/2023", "2021/2022"];

function AcademicSessionSelect({ value = "2023/2024", onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (session) => {
    onChange?.(session);
    setOpen(false);
  };

  return (
    <div className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full sm:w-auto
          items-center
          justify-between sm:justify-start
          gap-3
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4 sm:px-5
          py-2.5 sm:py-3
          text-xs sm:text-sm
          font-medium
          text-slate-700
          shadow-sm
          transition
          hover:border-blue-500
        "
      >
        <div className="flex items-center gap-2.5">
          <CalendarDays size={16} className="text-slate-500 shrink-0" />
          <span>{value} Academic Session</span>
        </div>

        <ChevronDown
          size={16}
          className={`transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-2
            w-full sm:w-64
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-xl
            animate-in fade-in zoom-in-95 duration-100
          "
        >
          {sessions.map((session) => (
            <button
              key={session}
              onClick={() => handleSelect(session)}
              className="
                flex
                w-full
                items-center
                justify-between
                px-4 sm:px-5
                py-2.5 sm:py-3
                text-left
                text-xs sm:text-sm
                hover:bg-slate-50
                transition-colors
              "
            >
              <span>{session}</span>

              {value === session && (
                <Check size={16} className="text-blue-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AcademicSessionSelect;
