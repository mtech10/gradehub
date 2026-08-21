















































































import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

function DropdownMenu({ items = [] }) {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const ref = useRef(null);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      
      setDropUp(spaceBelow < 200);
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={handleToggle}
        className="rounded-lg p-2 hover:bg-slate-100 transition-colors"
      >
        <MoreVertical size={18} className="text-slate-500" />
      </button>

      {open && (
        <div
          className={`
            absolute
            right-0
            z-50
            w-48
            rounded-xl
            border
            border-slate-200
            bg-white
            py-2
            shadow-xl
            ${dropUp ? "bottom-full mb-2" : "mt-2"}
          `}
        >
          {items.map((item) => (
            <button
              key={item.label}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                item.onClick?.();
              }}
              className={`
                flex
                w-full
                items-center
                gap-3
                px-4
                py-2
                text-left
                text-sm
                text-slate-700
                hover:bg-slate-50
                transition-colors
                ${item.className || ""}
              `}
            >
              {item.icon && <item.icon size={16} />}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
