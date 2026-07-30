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
    <Card>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
          <ShieldCheck size={20} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">Security</h3>
      </div>
      <p className="mb-6 text-sm text-slate-500">
        Manage your password and account security.
      </p>

      <div className="space-y-2">
        {securityOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div
              key={option.id}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    {option.title}
                  </h4>
                  <p className="text-xs text-slate-500">{option.description}</p>
                </div>
              </div>

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
          );
        })}
      </div>
    </Card>
  );
}

export default SecuritySettings;
