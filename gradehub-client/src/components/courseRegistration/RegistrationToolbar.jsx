import SearchInput from "../ui/SearchInput";
import Button from "../ui/Button";

function RegistrationToolbar({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  counts,
  summary,
  onSelectAll,
  onClearSelection,
}) {
  const tabs = [
    { key: "all", label: "All", count: counts.all },
    { key: "available", label: "Available", count: counts.available },
    { key: "registered", label: "Registered", count: counts.registered },
    { key: "selected", label: "Selected", count: counts.selected },
  ];

  return (
    <div className="sticky top-0 z-10 space-y-4 sm:space-y-5 border-b border-slate-200 bg-slate-50 pb-4 sm:pb-5">
      <div className="relative">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by course code or title..."
        />
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div
          className="
            flex
            flex-col
            gap-3 sm:gap-4
            rounded-xl
            border
            border-slate-200
            bg-white
            p-3.5 sm:p-4
            lg:flex-row
            lg:items-center
            lg:justify-between
            shadow-sm
          "
        >
          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500">Selected:</span>{" "}
              <span className="font-semibold text-slate-900">
                {summary.totalUnits} Units
              </span>
            </div>

            <div>
              <span className="text-slate-500">Registered:</span>{" "}
              <span className="font-semibold text-slate-900">
                {summary.registeredCount} Courses
              </span>
            </div>

            <div>
              <span className="text-slate-500">Maximum:</span>{" "}
              <span className="font-semibold text-slate-900">
                {summary.rules.maxUnits} Units
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onSelectAll}
              className="flex-1 sm:flex-none justify-center bg-white"
            >
              Select All
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onClearSelection}
              className="flex-1 sm:flex-none justify-center bg-white"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Filter Tabs (Horizontal scroll on mobile) */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RegistrationToolbar;
