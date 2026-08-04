import SettingRow from "./SettingRow";
import SettingsSection from "./SettingsSection";
import Select from "../../ui/Select";

const themeOptions = [
  { value: "system", label: "System Default" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const densityOptions = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
];

function AppearanceSettings({ data, onChange }) {
  const update = (key, value) => {
    onChange("appearance", key, value);
  };

  return (
    <SettingsSection
      title="Appearance"
      subtitle="Customize the look and feel of the administrator portal."
    >
      <SettingRow
        title="Dark Mode"
        description="Use a darker colour theme throughout the application."
        checked={data.darkMode}
        onValueChange={(value) => update("darkMode", value)}
      />

      <SettingRow
        title="Use System Theme"
        description="Automatically match your device theme."
        checked={data.useSystemTheme}
        onValueChange={(value) => update("useSystemTheme", value)}
      />

      <SettingRow
        title="Theme"
        description="Choose your preferred application theme."
      >
        <div className="max-w-sm">
          <Select
            value={data.theme}
            options={themeOptions}
            onChange={(value) => update("theme", value)}
          />
        </div>
      </SettingRow>

      <SettingRow
        title="Display Density"
        description="Adjust spacing throughout the interface."
        bordered={false}
      >
        <div className="max-w-sm">
          <Select
            value={data.density}
            options={densityOptions}
            onChange={(value) => update("density", value)}
          />
        </div>
      </SettingRow>
    </SettingsSection>
  );
}

export default AppearanceSettings;
