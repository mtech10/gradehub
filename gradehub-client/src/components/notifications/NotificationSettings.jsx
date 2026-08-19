import {
  Settings as SettingsIcon,
  FileSpreadsheet,
  Megaphone,
  CalendarDays,
  CreditCard,
} from "lucide-react";
import Card from "../ui/Card";
import Toggle from "../ui/Toggle";

function NotificationSettings({ settings, onToggle }) {
  const iconMap = {
    results: FileSpreadsheet,
    academic: Megaphone,
    reminders: CalendarDays,
    fees: CreditCard,
    system: SettingsIcon,
  };

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-5">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            Notifications
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Choose how you want to be notified.
          </p>
        </div>
        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600 shrink-0">
          <SettingsIcon size={20} />
        </button>
      </div>

      <div className="p-2">
        {settings.map((setting) => {
          const Icon = iconMap[setting.id] || SettingsIcon;
          return (
            <div
              key={setting.id}
              className="flex items-center justify-between gap-4 p-3"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                    {setting.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                    {setting.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Toggle
                  checked={setting.enabled}
                  onChange={() => onToggle(setting.id)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-100 p-4 sm:p-5">
        <button className="flex w-full items-center justify-between text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900">
          <span>Manage notification preferences</span>
          <span className="text-lg">›</span>
        </button>
      </div>
    </Card>
  );
}

export default NotificationSettings;
