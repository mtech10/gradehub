import { Palette, Check } from "lucide-react";
import Card from "../ui/Card";
import Toggle from "../ui/Toggle";

function AppearanceSettings({ data, onChange }) {
  const colors = [
    { id: "blue", class: "bg-blue-600" },
    { id: "purple", class: "bg-purple-600" },
    { id: "green", class: "bg-emerald-500" },
    { id: "orange", class: "bg-orange-500" },
    { id: "pink", class: "bg-pink-500" },
  ];

  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Palette size={20} />
        </div>
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            Appearance
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Customize how GradeHub looks for you.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs sm:text-sm font-semibold text-slate-900">
            Theme
          </span>
          <div className="flex overflow-hidden rounded-lg border border-slate-200 w-full sm:w-auto">
            <button
              onClick={() => onChange("appearance", "theme", "light")}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${data.theme === "light" ? "bg-blue-50 text-blue-600" : "bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              Light
            </button>
            <button
              onClick={() => onChange("appearance", "theme", "dark")}
              className={`flex-1 sm:flex-none border-l border-slate-200 px-4 py-2 text-xs sm:text-sm font-medium transition-colors ${data.theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              Dark
            </button>
          </div>
        </div>

        {}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs sm:text-sm font-semibold text-slate-900">
            Primary Color
          </span>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => onChange("appearance", "primaryColor", color.id)}
                className={`flex h-7 w-7 sm:h-6 sm:w-6 items-center justify-center rounded-full ${color.class} transition-transform hover:scale-110 ${data.primaryColor === color.id ? "ring-2 ring-blue-200 ring-offset-2" : ""}`}
              >
                {data.primaryColor === color.id && (
                  <Check size={12} className="text-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs sm:text-sm font-semibold text-slate-900">
            Font Size
          </span>
          <div className="flex overflow-hidden rounded-lg border border-slate-200 w-full sm:w-auto">
            {["Small", "Medium", "Large"].map((size) => (
              <button
                key={size}
                onClick={() =>
                  onChange("appearance", "fontSize", size.toLowerCase())
                }
                className={`flex-1 sm:flex-none border-r border-slate-200 px-3 py-2 text-xs sm:text-sm font-medium transition-colors last:border-0 ${data.fontSize === size.toLowerCase() ? "bg-blue-50 text-blue-600" : "bg-white text-slate-600 hover:bg-slate-50"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {}
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-semibold text-slate-900">
              Compact Mode
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Reduce spacing for more content on screen.
            </p>
          </div>
          <div className="shrink-0">
            <Toggle
              checked={data.compactMode}
              onChange={() =>
                onChange("appearance", "compactMode", !data.compactMode)
              }
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AppearanceSettings;
