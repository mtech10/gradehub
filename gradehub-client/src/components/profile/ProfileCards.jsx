import { GraduationCap, Info } from "lucide-react";
import Card from "../ui/Card";

export function ContactInfoCard({ title, items }) {
  return (
    <Card title={title} className="h-full">
      <div className="space-y-6">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-start gap-4">
              {Icon && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon size={18} />
                </div>
              )}

              <div>
                <p className="mb-1 text-xs font-medium text-slate-500">
                  {item.label}
                </p>

                <p className="text-sm font-semibold leading-relaxed text-slate-900">
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
    <Card title={title} className="h-full relative overflow-hidden">
      {/* Background Watermark Icon */}
      <GraduationCap
        size={140}
        className="absolute -right-6 -top-4 text-slate-50 opacity-50 pointer-events-none"
      />

      <div className="space-y-4 relative z-10">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              {item.label}
            </span>
            <span
              className={`text-sm font-semibold ${item.highlight ? "text-green-600" : "text-slate-900"}`}
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
    <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
        <Info size={20} className="text-blue-600" />
      </div>
      <div>
        <h3 className="font-semibold text-slate-900">Important Note</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Ensure your information is accurate and up to date. Contact the
          Academic Affairs Office for any changes.
        </p>
      </div>
    </div>
  );
}
