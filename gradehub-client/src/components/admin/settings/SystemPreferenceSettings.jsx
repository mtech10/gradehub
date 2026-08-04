import SettingRow from "./SettingRow";
import SettingsSection from "./SettingsSection";

function SystemPreferenceSettings({ data, onChange }) {
  const update = (key, value) => {
    onChange("system", key, value);
  };

  return (
    <SettingsSection
      title="System Preferences"
      subtitle="Configure system-wide behaviour."
    >
      <SettingRow
        title="Maintenance Mode"
        description="Temporarily disable access for maintenance."
        checked={data.maintenanceMode}
        onValueChange={(value) => update("maintenanceMode", value)}
      />

      <SettingRow
        title="Debug Mode"
        description="Enable detailed logging for troubleshooting."
        checked={data.debugMode}
        onValueChange={(value) => update("debugMode", value)}
      />

      <SettingRow
        title="Automatic Updates"
        description="Install updates automatically."
        checked={data.autoUpdates}
        onValueChange={(value) => update("autoUpdates", value)}
        bordered={false}
      />
    </SettingsSection>
  );
}

export default SystemPreferenceSettings;
