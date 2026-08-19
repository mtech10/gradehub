import SettingRow from "./SettingRow";
import SettingsSection from "./SettingsSection";
import Select from "../../ui/Select";
import Button from "../../ui/Button";

const passwordExpiryOptions = [
  { value: 30, label: "30 Days" },
  { value: 60, label: "60 Days" },
  { value: 90, label: "90 Days" },
  { value: 180, label: "180 Days" },
];

const sessionTimeoutOptions = [
  { value: 15, label: "15 Minutes" },
  { value: 30, label: "30 Minutes" },
  { value: 60, label: "1 Hour" },
  { value: 120, label: "2 Hours" },
];

function SecuritySettings({ data, onChange }) {
  const update = (key, value) => {
    onChange("security", key, value);
  };

  return (
    <SettingsSection
      title="Security Settings"
      subtitle="Manage authentication and administrator security."
    >
      <SettingRow
        title="Two-Factor Authentication"
        description="Require administrators to verify their identity during login."
        checked={data.twoFactorAuth}
        onValueChange={(value) => update("twoFactorAuth", value)}
      />

      <SettingRow
        title="Login Notifications"
        description="Receive email notifications whenever your account is accessed."
        checked={data.loginNotifications}
        onValueChange={(value) => update("loginNotifications", value)}
      />

      <SettingRow
        title="API Access"
        description="Allow third-party systems to access GradeHub APIs."
        checked={data.apiAccess}
        onValueChange={(value) => update("apiAccess", value)}
      />

      <SettingRow
        title="Password Expiry"
        description="Choose how often administrators should update their passwords."
      >
        <div className="w-full sm:max-w-sm">
          <Select
            value={data.passwordExpiry}
            options={passwordExpiryOptions}
            onChange={(value) => update("passwordExpiry", value)}
          />
        </div>
      </SettingRow>

      <SettingRow
        title="Session Timeout"
        description="Automatically sign out inactive administrators."
      >
        <div className="w-full sm:max-w-sm">
          <Select
            value={data.sessionTimeout}
            options={sessionTimeoutOptions}
            onChange={(value) => update("sessionTimeout", value)}
          />
        </div>
      </SettingRow>

      <SettingRow
        title="Account Actions"
        description="Manage your administrator account."
        bordered={false}
      >
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
          <Button variant="outline" className="w-full sm:w-auto justify-center">
            Change Password
          </Button>
          <Button variant="outline" className="w-full sm:w-auto justify-center">
            View Active Sessions
          </Button>
          <Button variant="outline" className="w-full sm:w-auto justify-center">
            Audit Logs
          </Button>
        </div>
      </SettingRow>
    </SettingsSection>
  );
}

export default SecuritySettings;
