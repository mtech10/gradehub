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
        p-5
        shadow-sm

        flex
        flex-col
        gap-5

        xl:flex-row
        xl:items-center
        xl:justify-between
      "
    >
      {/* Left */}
      <div className="flex flex-1 flex-wrap items-center gap-4">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-80"
        />

        {filters.map((filter) => (
          <Select
            key={filter.name}
            className={filter.width || "w-48"}
            value={filter.value}
            onChange={(e) => filter.onChange(e.target.value)}
            options={filter.options}
          />
        ))}

        {leftActions}
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">{rightActions}</div>
    </div>
  );
}

export default AdminToolbar;
