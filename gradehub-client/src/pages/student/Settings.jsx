import { useState } from "react";
import { Info, Check } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import SecuritySettings from "../../components/settings/SecuritySettings";
import PreferencesSettings from "../../components/settings/PreferencesSettings";
import AppearanceSettings from "../../components/settings/AppearanceSettings";
import NotificationSettings from "../../components/notifications/NotificationSettings";
import { notificationSettings as initialNotifSettings } from "../../constants/notifications/notificationData";

function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  // Master State for all Settings
  const [settingsState, setSettingsState] = useState({
    preferences: {
      language: "en",
      dateFormat: "ddmm",
      timeFormat: "12h",
      defaultSemester: "all",
      showGpa: true,
      showCourseCode: true,
    },
    security: {
      twoFactor: true,
    },
    appearance: {
      theme: "light",
      primaryColor: "blue",
      fontSize: "medium",
      compactMode: false,
    },
  });

  // Reusing the notification settings array state
  const [notifSettings, setNotifSettings] = useState(initialNotifSettings);

  const handleNotifToggle = (id) => {
    setNotifSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  const tabs = [
    { id: "preferences", label: "Preferences" },
    { id: "notifications", label: "Notifications" },
    { id: "security", label: "Security" },
    { id: "appearance", label: "Appearance" },
  ];

  const updateSectionState = (section, key, value) => {
    setSettingsState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSaveChanges = () => {
    alert("Settings saved successfully!");
  };

  const handleResetToDefault = () => {
    if (window.confirm("Are you sure you want to reset settings to default?")) {
      window.location.reload();
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "notifications":
        return (
          <NotificationSettings
            settings={notifSettings}
            onToggle={handleNotifToggle}
          />
        );
      case "security":
        return (
          <SecuritySettings
            data={settingsState.security}
            onChange={updateSectionState}
          />
        );
      case "appearance":
        return (
          <AppearanceSettings
            data={settingsState.appearance}
            onChange={updateSectionState}
          />
        );
      default:
        return (
          <PreferencesSettings
            data={settingsState.preferences}
            onChange={updateSectionState}
          />
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <PageHeader
          title="Settings"
          subtitle="Manage your account, preferences and security settings."
        />

        <div className="flex shrink-0 items-center gap-3">
          <Button
            variant="outline"
            className="bg-white"
            onClick={handleResetToDefault}
          >
            Reset to Default
          </Button>
          <Button className="gap-2" onClick={handleSaveChanges}>
            <Check size={16} /> Save Changes
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-8 overflow-x-auto border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap border-b-2 pb-4 text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-3xl">{renderActiveTab()}</div>

      <div className="flex max-w-3xl items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <Info size={14} />
        </div>
        <p className="text-sm font-medium text-blue-900">
          Changes you make will be compiled and applied globally once you click
          Save Changes.
        </p>
      </div>
    </div>
  );
}

export default Settings;
