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
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-slate-200
          bg-white
          px-5
          py-3
          text-sm
          font-medium
          text-slate-700
          shadow-sm
          transition
          hover:border-blue-500
        "
      >
        <CalendarDays size={18} />

        <span>{value} Academic Session</span>

        <ChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-2
            w-64
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-xl
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
                px-5
                py-3
                text-left
                hover:bg-slate-50
              "
            >
              {session}

              {value === session && (
                <Check size={18} className="text-blue-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AcademicSessionSelect;
