import { Menu, Bell, CalendarDays, Search, ChevronDown } from "lucide-react";

function TopNavbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        <button className="rounded-lg p-2 hover:bg-slate-100">
          <Menu size={22} className="text-slate-600" />
        </button>

        {/* Search */}
        <div className="relative hidden lg:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search for courses, results, CGPA..."
            className="
              h-12
              w-[430px]
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pl-12
              pr-14
              outline-none
              transition
              focus:border-blue-500
              focus:bg-white
            "
          />

          <span
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-sm
              text-slate-400
            "
          >
            ⌘ K
          </span>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex items-center gap-6">
        {/* Notification */}

        <button className="relative rounded-lg p-2 hover:bg-slate-100">
          <Bell size={22} className="text-slate-600" />

          <span
            className="
              absolute
              right-1
              top-1
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              bg-blue-600
              text-[11px]
              font-semibold
              text-white
            "
          >
            3
          </span>
        </button>

        {/* Calendar */}

        <button className="rounded-lg p-2 hover:bg-slate-100">
          <CalendarDays size={22} className="text-slate-600" />
        </button>

        {/* User */}

        <button className="flex items-center gap-3 border-l border-slate-200 pl-6">
          <img
            src="https://i.pravatar.cc/80"
            alt="Profile"
            className="h-11 w-11 rounded-full object-cover"
          />

          <div className="text-left">
            <p className="font-semibold text-slate-900">Ademola Oyelusi</p>

            <p className="text-sm text-slate-500">Student</p>
          </div>

          <ChevronDown size={18} className="text-slate-500" />
        </button>
      </div>
    </header>
  );
}

export default TopNavbar;
