import { useState } from "react";
import { Filter, Search } from "lucide-react";
import Button from "../ui/Button";
import FilterDrawer from "../ui/FilterDrawer";

function CourseFilterBar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) {
  const [openFilter, setOpenFilter] = useState(false);

  const tabs = [
    { id: "all", label: "All Courses" },
    { id: "current", label: "Current Session" },
    { id: "completed", label: "Completed" },
    { id: "failed", label: "Failed" },
  ];

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex flex-wrap gap-4 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 pb-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="h-11 w-72 rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500"
          />
        </div>

        <Button variant="outline" onClick={() => setOpenFilter(true)}>
          <Filter size={18} />
          Filter
        </Button>

        <FilterDrawer open={openFilter} onClose={() => setOpenFilter(false)} />
      </div>
    </div>
  );
}

export default CourseFilterBar;
