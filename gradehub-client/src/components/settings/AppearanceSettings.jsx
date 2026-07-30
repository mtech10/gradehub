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
    <Card>
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Palette size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Appearance</h3>
          <p className="text-sm text-slate-500">
            Customize how GradeHub looks for you.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Theme */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900">Theme</span>
          <div className="flex overflow-hidden rounded-lg border border-slate-200">
            <button
              onClick={() => onChange("appearance", "theme", "light")}
              className={`px-4 py-1.5 text-sm font-medium transition-colors ${data.theme === "light" ? "bg-blue-50 text-blue-600" : "bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              Light
            </button>
            <button
              onClick={() => onChange("appearance", "theme", "dark")}
              className={`border-l border-slate-200 px-4 py-1.5 text-sm font-medium transition-colors ${data.theme === "dark" ? "bg-slate-800 text-white" : "bg-white text-slate-600 hover:bg-slate-50"}`}
            >
              Dark
            </button>
          </div>
        </div>

        {/* Primary Color */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900">
            Primary Color
          </span>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => onChange("appearance", "primaryColor", color.id)}
                className={`flex h-6 w-6 items-center justify-center rounded-full ${color.class} transition-transform hover:scale-110 ${data.primaryColor === color.id ? "ring-2 ring-blue-200 ring-offset-2" : ""}`}
              >
                {data.primaryColor === color.id && (
                  <Check size={12} className="text-white" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-900">
            Font Size
          </span>
          <div className="flex overflow-hidden rounded-lg border border-slate-200">
            {["Small", "Medium", "Large"].map((size) => (
              <button
                key={size}
                onClick={() =>
                  onChange("appearance", "fontSize", size.toLowerCase())
                }
                className={`border-r border-slate-200 px-3 py-1.5 text-sm font-medium transition-colors last:border-0 ${data.fontSize === size.toLowerCase() ? "bg-blue-50 text-blue-600" : "bg-white text-slate-600 hover:bg-slate-50"}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Compact Mode */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              Compact Mode
            </h4>
            <p className="text-xs text-slate-500">
              Reduce spacing for more content on screen.
            </p>
          </div>
          <Toggle
            checked={data.compactMode}
            onChange={() =>
              onChange("appearance", "compactMode", !data.compactMode)
            }
          />
        </div>
      </div>
    </Card>
  );
}

export default AppearanceSettings;
