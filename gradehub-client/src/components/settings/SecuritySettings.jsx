import {
  ShieldCheck,
  Lock,
  Smartphone,
  Clock,
  ChevronRight,
} from "lucide-react";
import Card from "../ui/Card";
import Toggle from "../ui/Toggle";

function SecuritySettings({ data, onChange }) {
  const securityOptions = [
    {
      id: "password",
      title: "Change Password",
      description: "Update your account password regularly.",
      icon: Lock,
      action: "arrow",
    },
    {
      id: "twoFactor",
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account.",
      icon: ShieldCheck,
      action: "toggle",
    },
    {
      id: "sessions",
      title: "Login Sessions",
      description: "Manage your active sessions across devices.",
      icon: Smartphone,
      action: "arrow",
    },
    {
      id: "activity",
      title: "Account Activity",
      description: "View recent activity on your account.",
      icon: Clock,
      action: "arrow",
    },
  ];

  return (
    <Card className="p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <ShieldCheck size={18} />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">
          Security
        </h3>
      </div>
      <p className="mb-6 text-xs sm:text-sm text-slate-500">
        Manage your password and account security.
      </p>

      <div className="space-y-3">
        {securityOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3.5 sm:p-4 transition-colors hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon size={16} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                    {option.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                    {option.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                {option.action === "arrow" ? (
                  <ChevronRight size={18} className="text-slate-400" />
                ) : (
                  <Toggle
                    checked={data.twoFactor}
                    onChange={() =>
                      onChange("security", "twoFactor", !data.twoFactor)
                    }
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default SecuritySettings;
