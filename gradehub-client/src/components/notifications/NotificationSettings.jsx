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
  // Map icons to the settings items
  const iconMap = {
    results: FileSpreadsheet,
    academic: Megaphone,
    reminders: CalendarDays,
    fees: CreditCard,
    system: SettingsIcon,
  };

  return (
    <Card padding="none">
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Notifications
          </h3>
          <p className="text-sm text-slate-500">
            Choose how you want to be notified.
          </p>
        </div>
        <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-600">
          <SettingsIcon size={20} />
        </button>
      </div>

      <div className="p-2">
        {settings.map((setting) => {
          const Icon = iconMap[setting.id] || SettingsIcon;
          return (
            <div
              key={setting.id}
              className="flex items-center justify-between p-3"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {setting.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {setting.description}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <Toggle
                checked={setting.enabled}
                onChange={() => onToggle(setting.id)}
              />
            </div>
          );
        })}
      </div>

      <div className="border-t border-slate-100 p-5">
        <button className="flex w-full items-center justify-between text-sm font-medium text-slate-600 hover:text-slate-900">
          Manage notification preferences
          <span className="text-lg">›</span>
        </button>
      </div>
    </Card>
  );
}

export default NotificationSettings;
