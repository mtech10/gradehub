import { Plus, Trash2, Calculator, RotateCcw } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import { GRADE_OPTIONS, UNIT_OPTIONS } from "../../constants/gpaCalculator";
import { GRADE_POINTS } from "../../utils/gpaUtils";

function CourseInputTable({
  courses,
  onChange,
  onAdd,
  onRemove,
  totalUnits,
  onClear,
  onCalculate,
}) {
  const updateCourse = (id, field, value) => {
    onChange(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course,
      ),
    );
  };

  return (
    <Card title="Add your courses" padding="lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm font-semibold text-slate-600">
              <th className="pb-3">Course Code</th>
              <th className="pb-3">Course Title</th>
              <th className="w-24 pb-3">Units</th>
              <th className="w-28 pb-3">Grade</th>
              <th className="w-32 pb-3">Grade Point</th>
              <th className="w-16 pb-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t border-slate-100">
                <td className="py-3 pr-3">
                  <input
                    type="text"
                    value={course.code}
                    onChange={(event) =>
                      updateCourse(course.id, "code", event.target.value)
                    }
                    placeholder="e.g. AGE405"
                    className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </td>

                <td className="py-3 pr-3">
                  <input
                    type="text"
                    value={course.title}
                    onChange={(event) =>
                      updateCourse(course.id, "title", event.target.value)
                    }
                    placeholder="Course title"
                    className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </td>

                <td className="py-3 pr-3">
                  <select
                    value={course.units}
                    onChange={(event) =>
                      updateCourse(
                        course.id,
                        "units",
                        Number(event.target.value),
                      )
                    }
                    className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >
                    {UNIT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="py-3 pr-3">
                  <select
                    value={course.grade}
                    onChange={(event) =>
                      updateCourse(course.id, "grade", event.target.value)
                    }
                    className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >
                    {GRADE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="py-3 pr-3">
                  <div className="flex h-11 items-center justify-center rounded-lg bg-slate-100 text-sm font-medium text-slate-600">
                    {GRADE_POINTS[course.grade]?.toFixed(2)}
                  </div>
                </td>

                <td className="py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onRemove(course.id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
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

      <div className="mt-4 flex items-center justify-between gap-3 pb-3 sm:pb-0">
        <Button
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          <Plus size={16} />
          Add Course
        </Button>

        <Button variant="outline" size="sm" onClick={onClear}>
          <RotateCcw size={16} />
          Clear All
        </Button>

        <Button size="sm" onClick={onCalculate}>
          <Calculator size={16} />
          Calculate GPA
        </Button>

        <p className="text-sm font-semibold text-slate-700">
          Total Units: <span className="text-slate-900">{totalUnits}</span>
        </p>
      </div>
    </Card>
  );
}

export default CourseInputTable;
