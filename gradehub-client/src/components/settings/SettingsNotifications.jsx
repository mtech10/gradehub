import { useState } from "react";
import {
  Bell,
  FileSpreadsheet,
  Megaphone,
  CalendarDays,
  Settings,
} from "lucide-react";
import Card from "../ui/Card";
import Toggle from "../ui/Toggle";

function SettingsNotifications() {
  const [toggles, setToggles] = useState({
    results: true,
    academic: true,
    reminders: true,
    system: false,
  });

  const handleToggle = (key) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const items = [
    {
      id: "results",
      title: "Results & Grades",
      desc: "Get notified when results are published.",
      icon: FileSpreadsheet,
    },
    {
      id: "academic",
      title: "Academic Updates",
      desc: "Receive important academic announcements.",
      icon: Megaphone,
    },
    {
      id: "reminders",
      title: "Course Reminders",
      desc: "Get reminders for registrations and deadlines.",
      icon: CalendarDays,
    },
    {
      id: "system",
      title: "System Updates",
      desc: "Notifications about system maintenance and updates.",
      icon: Settings,
    },
  ];

  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
          <Bell size={20} />
        </div>
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            Notifications
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Choose what you want to be notified about.
          </p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-600">
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <Toggle
                  checked={toggles[item.id]}
                  onChange={() => handleToggle(item.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default SettingsNotifications;
