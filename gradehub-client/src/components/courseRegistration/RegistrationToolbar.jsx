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
    <div className="sticky top-0 z-10 space-y-5 border-b border-slate-200 bg-white pb-5">
      <div className="relative">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by course code or title..."
        />
      </div>

      <div className="space-y-4">
        <div
          className="
    flex
    flex-col
    gap-4
    rounded-xl
    border
    border-slate-200
    bg-slate-50
    p-4
    lg:flex-row
    lg:items-center
    lg:justify-between
  "
        >
          <div className="flex flex-wrap gap-4 text-sm">
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
              onClick={onSelectAll}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Select All
            </Button>

            <Button
              onClick={onClearSelection}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Clear
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "bg-slate-400 text-slate-700 hover:bg-slate-500"
              }`}
            >
              {tab.label} ({tab.count})
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RegistrationToolbar;
