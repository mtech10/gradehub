import { GraduationCap, Info } from "lucide-react";
import Card from "../ui/Card";

export function ContactInfoCard({ title, items }) {
  return (
    <Card title={title} className="h-full p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-start gap-3 sm:gap-4 min-w-0"
            >
              {Icon && (
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon size={16} />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="mb-0.5 text-xs font-medium text-slate-500">
                  {item.label}
                </p>

                <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-900 break-words">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function InfoCard({ title, items }) {
  return (
    <Card title={title} className="h-full relative overflow-hidden p-4 sm:p-6">
      <GraduationCap
        size={120}
        className="absolute -right-6 -top-4 text-slate-50 opacity-50 pointer-events-none"
      />

      <div className="space-y-3.5 relative z-10">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3"
          >
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              {item.label}
            </span>
            <span
              className={`text-xs sm:text-sm font-semibold text-right ${item.highlight ? "text-green-600" : "text-slate-900"}`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ProfileNotice() {
  return (
    <div className="flex items-start gap-3 sm:gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm text-blue-600">
        <Info size={18} />
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
          Important Note
        </h3>
        <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-600">
          Ensure your information is accurate and up to date. Contact the
          Academic Affairs Office for any changes.
        </p>
      </div>
    </div>
  );
}
