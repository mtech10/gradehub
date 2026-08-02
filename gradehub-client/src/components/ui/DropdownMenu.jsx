import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

function DropdownMenu({ items = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

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
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="rounded-lg p-2 hover:bg-slate-100"
      >
        <MoreVertical size={18} className="text-slate-500" />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-2
            w-48
            rounded-xl
            border
            border-slate-200
            bg-white
            py-2
            shadow-lg
          "
        >
          {items.map((item) => (
            <button
              key={item.label}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                item.onClick?.();
              }}
              className="
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
              "
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
