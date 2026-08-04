import Card from "../../ui/Card";
import Select from "../../ui/Select";
import Toggle from "../../ui/Toggle";

const sessionOptions = [
  { value: "2024/2025", label: "2024/2025" },
  { value: "2023/2024", label: "2023/2024" },
  { value: "2022/2023", label: "2022/2023" },
];

const dashboardOptions = [
  { value: "Overview", label: "Overview" },
  { value: "Students", label: "Students" },
  { value: "Results", label: "Results" },
  { value: "Departments", label: "Departments" },
];

const timezoneOptions = [
  { value: "Africa/Lagos", label: "Africa/Lagos (GMT+1)" },
  { value: "UTC", label: "UTC" },
];

const dateFormatOptions = [
  {
    value: "DD/MM/YYYY",
    label: "DD/MM/YYYY",
  },
  {
    value: "MM/DD/YYYY",
    label: "MM/DD/YYYY",
  },
  {
    value: "YYYY-MM-DD",
    label: "YYYY-MM-DD",
  },
];

const recordOptions = [
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

const timeoutOptions = [
  { value: 15, label: "15 Minutes" },
  { value: 30, label: "30 Minutes" },
  { value: 60, label: "1 Hour" },
];

function SystemPreferenceSettings({ data, onChange }) {
  const handleChange = (key, value) => {
    onChange("preferences", key, value);
  };

  return (
    <Card
      title="System Preferences"
      subtitle="Configure how the GradeHub administrator workspace behaves."
    >
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Select
            label="Default Academic Session"
            value={data.defaultSession}
            options={sessionOptions}
            onChange={(value) => handleChange("defaultSession", value)}
          />

          <Select
            label="Default Dashboard"
            value={data.dashboard}
            options={dashboardOptions}
            onChange={(value) => handleChange("dashboard", value)}
          />

          <Select
            label="Time Zone"
            value={data.timezone}
            options={timezoneOptions}
            onChange={(value) => handleChange("timezone", value)}
          />

          <Select
            label="Date Format"
            value={data.dateFormat}
            options={dateFormatOptions}
            onChange={(value) => handleChange("dateFormat", value)}
          />

          <Select
            label="Records Per Page"
            value={data.recordsPerPage}
            options={recordOptions}
            onChange={(value) => handleChange("recordsPerPage", value)}
          />

          <Select
            label="Auto Logout"
            value={data.autoLogout}
            options={timeoutOptions}
            onChange={(value) => handleChange("autoLogout", value)}
          />
        </div>

        <div className="space-y-5 border-t border-slate-200 pt-6">
          <Toggle
            label="Enable Bulk Actions"
            description="Allow bulk editing, deletion and export operations."
            checked={data.enableBulkActions}
            onChange={(value) => handleChange("enableBulkActions", value)}
          />

          <Toggle
            label="Confirm Before Delete"
            description="Require confirmation before permanently deleting records."
            checked={data.confirmBeforeDelete}
            onChange={(value) => handleChange("confirmBeforeDelete", value)}
          />
        </div>
      </div>
    </Card>
  );
}

export default SystemPreferenceSettings;
