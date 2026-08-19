import SettingRow from "./SettingRow";
import SettingsSection from "./SettingsSection";
import Button from "../../ui/Button";
import Select from "../../ui/Select";

const frequencyOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

function BackupSettings({ data, onChange }) {
  const update = (key, value) => {
    onChange("backup", key, value);
  };

  return (
    <SettingsSection
      title="Backup & Recovery"
      subtitle="Configure automatic backups and recovery options."
    >
      <SettingRow
        title="Automatic Backup"
        description="Automatically backup system data."
        checked={data.autoBackup}
        onValueChange={(value) => update("autoBackup", value)}
      />

      <SettingRow
        title="Backup Frequency"
        description="Choose how often backups are performed."
      >
        <div className="w-full sm:max-w-sm">
          <Select
            value={data.frequency}
            options={frequencyOptions}
            onChange={(value) => update("frequency", value)}
          />
        </div>
      </SettingRow>

      <SettingRow
        title="Manual Backup"
        description="Create a backup immediately."
        bordered={false}
      >
        <Button className="w-full sm:w-auto justify-center">
          Create Backup
        </Button>
      </SettingRow>
    </SettingsSection>
  );
}

export default BackupSettings;
