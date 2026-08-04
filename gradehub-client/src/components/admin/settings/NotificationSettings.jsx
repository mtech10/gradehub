import SettingRow from "./SettingRow";
import SettingsSection from "./SettingsSection";

function NotificationSettings({ data, onChange }) {
  const update = (key, value) => {
    onChange("notifications", key, value);
  };

  return (
    <SettingsSection
      title="Notification Settings"
      subtitle="Control how administrators receive important updates."
    >
      <SettingRow
        title="Result Upload Notifications"
        description="Notify administrators whenever examination results are uploaded."
        checked={data.resultUploads}
        onValueChange={(value) => update("resultUploads", value)}
      />

      <SettingRow
        title="Student Registration Alerts"
        description="Receive notifications whenever a new student account is created."
        checked={data.studentRegistrations}
        onValueChange={(value) => update("studentRegistrations", value)}
      />

      <SettingRow
        title="Department Updates"
        description="Notify administrators whenever department information changes."
        checked={data.departmentUpdates}
        onValueChange={(value) => update("departmentUpdates", value)}
      />

      <SettingRow
        title="Course Updates"
        description="Receive alerts whenever courses are created or modified."
        checked={data.courseUpdates}
        onValueChange={(value) => update("courseUpdates", value)}
      />

      <SettingRow
        title="Failed Login Alerts"
        description="Receive notifications for suspicious administrator login attempts."
        checked={data.failedLogins}
        onValueChange={(value) => update("failedLogins", value)}
      />

      <SettingRow
        title="System Maintenance"
        description="Receive notifications before scheduled maintenance."
        checked={data.systemMaintenance}
        onValueChange={(value) => update("systemMaintenance", value)}
        bordered={false}
      />
    </SettingsSection>
  );
}

export default NotificationSettings;
