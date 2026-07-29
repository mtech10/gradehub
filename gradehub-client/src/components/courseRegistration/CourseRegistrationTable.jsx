import { Search } from "lucide-react";
import Badge from "../ui/Badge";
import { getSemesterBadge } from "../../utils/courseUtils";
import { SCROLLBAR } from "../../constants/layout";

function CourseRegistrationTable({
  courses,
  selectedCodes,
  droppedCodes,
  isEditing,
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  onToggleCourse,
}) {
  const tabs = ["All", "Available", "Selected", "Registered"];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab.toLowerCase()
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72 shrink-0">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by code or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-4 text-sm outline-none transition-colors focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
      </div>

      <div className={`max-h-[600px] overflow-y-auto ${SCROLLBAR}`}>
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
            <tr>
              <th className="px-6 py-4 w-12"></th>
              <th className="px-6 py-4 font-semibold text-slate-900">Code</th>
              <th className="px-6 py-4 font-semibold text-slate-900">
                Course Title
              </th>
              <th className="px-6 py-4 font-semibold text-slate-900 text-right">
                Units
              </th>
              <th className="px-6 py-4 font-semibold text-slate-900 text-center">
                Semester
              </th>
              <th className="px-6 py-4 font-semibold text-slate-900 text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => {
                const semesterBadge = getSemesterBadge(course.semester);

                const isOfficiallyRegistered = course.status === "Registered";
                const isSelected = selectedCodes.includes(course.code);
                const isDropped = droppedCodes.includes(course.code); // Is it queued to drop?

                const isDisabled = isOfficiallyRegistered && !isEditing;

                // It stays checked unless it's in the dropped queue
                const isChecked =
                  (isOfficiallyRegistered && !isDropped) || isSelected;

                // Visual row feedback based on state
                let rowBg = "hover:bg-slate-50";
                if (isOfficiallyRegistered && !isDropped)
                  rowBg = "bg-slate-50/50 opacity-80";
                if (isSelected) rowBg = "bg-blue-50/40 hover:bg-blue-50/60";
                if (isDropped)
                  rowBg = "bg-red-50/20 hover:bg-red-50/40 opacity-90";

                // Dynamic Badge Status
                let badgeVariant = "secondary";
                let badgeLabel = "Available";

                if (isOfficiallyRegistered) {
                  if (isDropped) {
                    badgeVariant = "danger";
                    badgeLabel = "Dropped";
                  } else {
                    badgeVariant = "primary";
                    badgeLabel = "Registered";
                  }
                } else if (isSelected) {
                  badgeVariant = "warning";
                  badgeLabel = "Selected";
                }

                return (
                  <tr
                    key={course.code}
                    className={`border-b border-slate-100 transition-colors ${rowBg} ${!isDisabled && "cursor-pointer"}`}
                    onClick={() => !isDisabled && onToggleCourse(course.code)}
                  >
                    <td
                      className="px-6 py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={isDisabled}
                        onChange={() => onToggleCourse(course.code)}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {course.code}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {course.title}
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      {course.units}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant={semesterBadge.variant} size="sm">
                        {semesterBadge.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant={badgeVariant} size="sm">
                        {badgeLabel}
                      </Badge>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500">
                  No courses found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseRegistrationTable;
