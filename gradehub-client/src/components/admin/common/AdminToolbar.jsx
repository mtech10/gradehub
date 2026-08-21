import SearchInput from "../../ui/SearchInput";
import Select from "../../ui/Select";

function AdminToolbar({
  search,
  setSearch,
  searchPlaceholder = "Search...",
  filters = [],
  leftActions,
  rightActions,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4 sm:p-5
        shadow-sm

        flex
        flex-col
        gap-4 sm:gap-5

        xl:flex-row
        xl:items-center
        xl:justify-between
      "
    >
      {}
      <div className="flex flex-1 flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full xl:w-80"
        />

        {filters.map((filter) => (
          <Select
            key={filter.name}
            
            className={`w-full sm:${filter.width || "w-48"}`}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            options={filter.options}
          />
        ))}

        {leftActions}
      </div>

      {}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
        {rightActions}
      </div>
    </div>
  );
}

export default AdminToolbar;
