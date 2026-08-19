import { Plus, Trash2, Calculator, RotateCcw } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import { GRADE_POINTS } from "../../utils/gpaUtils";

function CourseInputTable({
  courses,
  onChange,
  onAdd,
  onRemove,
  totalUnits,
  onClear,
  onCalculate,
  gradeOptions,
  unitOptions,
}) {
  const updateCourse = (id, field, value) => {
    onChange(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course,
      ),
    );
  };

  return (
    <Card title="Add your courses" padding="lg" className="p-4 sm:p-6">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[550px]">
          <thead>
            <tr className="text-left text-xs sm:text-sm font-semibold text-slate-600">
              <th className="pb-3">Course Code</th>
              <th className="pb-3">Course Title</th>
              <th className="w-20 sm:w-24 pb-3">Units</th>
              <th className="w-24 sm:w-28 pb-3">Grade</th>
              <th className="w-28 sm:w-32 pb-3">Grade Point</th>
              <th className="w-16 pb-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t border-slate-100">
                <td className="py-3 pr-2 sm:pr-3">
                  <input
                    type="text"
                    value={course.code}
                    onChange={(event) =>
                      updateCourse(course.id, "code", event.target.value)
                    }
                    placeholder="e.g. AGE405"
                    className="h-10 sm:h-11 w-full rounded-lg border border-slate-300 px-3 text-xs sm:text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </td>

                <td className="py-3 pr-2 sm:pr-3">
                  <input
                    type="text"
                    value={course.title}
                    onChange={(event) =>
                      updateCourse(course.id, "title", event.target.value)
                    }
                    placeholder="Course title"
                    className="h-10 sm:h-11 w-full rounded-lg border border-slate-300 px-3 text-xs sm:text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </td>

                <td className="py-3 pr-2 sm:pr-3">
                  <select
                    value={course.units}
                    onChange={(event) =>
                      updateCourse(
                        course.id,
                        "units",
                        Number(event.target.value),
                      )
                    }
                    className="h-10 sm:h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-300 px-2 sm:px-3 text-xs sm:text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white"
                  >
                    {unitOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="py-3 pr-2 sm:pr-3">
                  <select
                    value={course.grade}
                    onChange={(event) =>
                      updateCourse(course.id, "grade", event.target.value)
                    }
                    className="h-10 sm:h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-300 px-2 sm:px-3 text-xs sm:text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white"
                  >
                    {gradeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="py-3 pr-2 sm:pr-3">
                  <div className="flex h-10 sm:h-11 items-center justify-center rounded-lg bg-slate-100 text-xs sm:text-sm font-medium text-slate-600">
                    {GRADE_POINTS[course.grade]?.toFixed(2)}
                  </div>
                </td>

                <td className="py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onRemove(course.id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Remove course"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onAdd}
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Plus size={16} className="mr-1.5" />
            Add Course
          </Button>

          <Button variant="outline" size="sm" onClick={onClear}>
            <RotateCcw size={16} className="mr-1.5" />
            Clear All
          </Button>

          <Button size="sm" onClick={onCalculate}>
            <Calculator size={16} className="mr-1.5" />
            Calculate GPA
          </Button>
        </div>

        <p className="text-sm font-semibold text-slate-700 text-right sm:text-left">
          Total Units: <span className="text-slate-900">{totalUnits}</span>
        </p>
      </div>
    </Card>
  );
}

export default CourseInputTable;
