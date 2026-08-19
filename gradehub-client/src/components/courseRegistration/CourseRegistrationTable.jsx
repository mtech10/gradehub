import DataTable from "../ui/DataTable";
import Badge from "../ui/Badge";
import Checkbox from "../ui/Checkbox";

import {
  getSemesterBadge,
  isCourseChecked,
} from "../../utils/registrationHelpers";
import { courseRegistrationColumns } from "../../constants/tables/courseRegistrationColumns";
import RegistrationToolbar from "./RegistrationToolbar";
import { SCROLLBAR } from "../../constants/layout";

function CourseRegistrationTable({
  courses,
  summary,
  rules,
  selectedCodes,
  droppedCodes,
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  onToggleCourse,
  onSelectAll,
  onClearSelection,
  filteredCourses,
  handleRowClick,
  currentPage,
  onPageChange,
}) {
  const getRowClassName = (course) => {
    const checked = isCourseChecked(course, selectedCodes, droppedCodes);
    if (checked) {
      return `
        bg-blue-50
        hover:bg-blue-100
        border-l-4
        border-blue-500
      `;
    }

    return "hover:bg-slate-50";
  };

  const renderCell = (course, column) => {
    switch (column.key) {
      case "select": {
        const checked = isCourseChecked(course, selectedCodes, droppedCodes);
        return (
          <Checkbox
            checked={checked}
            onClick={(e) => e.stopPropagation()}
            onChange={() => onToggleCourse(course.code)}
          />
        );
      }

      case "code":
        return (
          <div className="min-w-0">
            <p className="font-semibold text-slate-900">{course.code}</p>
            <p className="text-xs sm:text-sm text-slate-500 truncate">
              {course.title}
            </p>
          </div>
        );

      case "semester": {
        const semester = getSemesterBadge(course.semester);
        return (
          <Badge variant={semester.variant} size="sm">
            {semester.label}
          </Badge>
        );
      }

      case "status":
        return (
          <Badge
            variant={course.status === "Registered" ? "success" : "warning"}
            size="sm"
          >
            {course.status}
          </Badge>
        );
      default:
        return course[column.key];
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 p-4 sm:p-5">
        <RegistrationToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={{
            all: courses.length,
            available: courses.filter((c) => c.status === "Available").length,
            registered: courses.filter((c) => c.status === "Registered").length,
            selected: selectedCodes.length,
          }}
          summary={summary}
          rules={rules}
          onSelectAll={onSelectAll}
          onClearSelection={onClearSelection}
        />
      </div>

      <div
        className={`max-h-[500px] sm:max-h-[600px] overflow-y-auto ${SCROLLBAR}`}
      >
        <DataTable
          columns={courseRegistrationColumns}
          data={filteredCourses}
          renderCell={renderCell}
          rowClassName={getRowClassName}
          onRowClick={handleRowClick}
          pagination={true}
          currentPage={currentPage}
          onPageChange={onPageChange}
          pageSize={10}
          totalItems={filteredCourses.length}
          totalPages={Math.ceil(filteredCourses.length / 10)}
        />
      </div>
    </div>
  );
}

export default CourseRegistrationTable;
