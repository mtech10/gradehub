import { SlidersHorizontal } from "lucide-react";
import Card from "../ui/Card";
import Select from "../ui/Select";
import Toggle from "../ui/Toggle";

function PreferencesSettings({ data, onChange }) {
  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <SlidersHorizontal size={20} />
        </div>
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            Preferences
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Customize your GradeHub experience.
          </p>
        </div>
      </div>

      <div className="mb-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Select
          label="Language"
          options={[{ value: "en", label: "English" }]}
          value={data.language}
          onChange={(e) => onChange("preferences", "language", e.target.value)}
        />
        <Select
          label="Date Format"
          options={[{ value: "ddmm", label: "DD/MM/YYYY" }]}
          value={data.dateFormat}
          onChange={(e) =>
            onChange("preferences", "dateFormat", e.target.value)
          }
        />
        <Select
          label="Time Format"
          options={[{ value: "12h", label: "12-Hour (AM/PM)" }]}
          value={data.timeFormat}
          onChange={(e) =>
            onChange("preferences", "timeFormat", e.target.value)
          }
        />
        <Select
          label="Default Semester View"
          options={[{ value: "all", label: "All Semesters" }]}
          value={data.defaultSemester}
          onChange={(e) =>
            onChange("preferences", "defaultSemester", e.target.value)
          }
        />
      </div>

      <div className="space-y-4 border-t border-slate-100 pt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
              Show GPA in Dashboard
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Display CGPA on dashboard overview cards.
            </p>
          </div>
          <div className="shrink-0">
            <Toggle
              checked={data.showGpa}
              onChange={() => onChange("preferences", "showGpa", !data.showGpa)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
              Show Course Code in Results
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Display course codes alongside course titles.
            </p>
          </div>
          <div className="shrink-0">
            <Toggle
              checked={data.showCourseCode}
              onChange={() =>
                onChange("preferences", "showCourseCode", !data.showCourseCode)
              }
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default PreferencesSettings;
