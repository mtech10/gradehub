import { useState } from "react";
import { Info, Check } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import SecuritySettings from "../../components/settings/SecuritySettings";
import PreferencesSettings from "../../components/settings/PreferencesSettings";
import AppearanceSettings from "../../components/settings/AppearanceSettings";
import NotificationSettings from "../../components/notifications/NotificationSettings";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { notificationSettings as initialNotifSettings } from "../../constants/notifications/notificationData";
import { useToast } from "../../context/ToastContext";

// Define default settings outside to use for both initialization and resetting
const defaultSettingsState = {
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
};

function Settings() {
  const [activeTab, setActiveTab] = useState("preferences");
  const { addToast } = useToast();

  // Modal States
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Master State for all Settings
  const [settingsState, setSettingsState] = useState(defaultSettingsState);

  // Reusing the notification settings array state
  const [notifSettings, setNotifSettings] = useState(initialNotifSettings);

  const handleNotifToggle = (id) => {
    setNotifSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  const tabs = [
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

  // 1. Intercept the save click
  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  // 2. Execute the actual save when confirmed
  const executeSave = async () => {
    setShowSaveModal(false); // Close modal immediately
    setIsSaving(true);

    try {
      const payload = {
        ...settingsState,
        notifications: notifSettings,
      };

      // Simulated API call (replace with your actual service)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      addToast({
        title: "Settings Saved",
        message: "Your preferences have been successfully updated.",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to save settings:", error);

      addToast({
        title: "Update Failed",
        message:
          "Failed to save your settings. Please check your connection and try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // 3. Reset settings to default without reloading the page
  const confirmResetToDefault = () => {
    setShowResetModal(false);

    // Reset local states to their defaults
    setSettingsState(defaultSettingsState);
    setNotifSettings(initialNotifSettings);

    // Fire the toast
    addToast({
      title: "Settings Reset",
      message: "All settings have been restored to their default values.",
      type: "info",
    });
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      default:
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
    }
  };

  return (
    <>
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
              onClick={() => setShowResetModal(true)}
              disabled={isSaving}
            >
              Reset to Default
            </Button>

            <Button
              className="gap-2"
              onClick={handleSaveClick}
              loading={isSaving}
              disabled={isSaving}
            >
              {!isSaving && <Check size={16} />}
              {isSaving ? "Saving..." : "Save Changes"}
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
            Changes you make will be compiled and applied globally once you
            click Save Changes.
          </p>
        </div>
      </div>

      {/* Save Settings Confirmation Modal */}
      <ConfirmModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onConfirm={executeSave}
        title="Apply Settings"
        message="Are you sure you want to apply these changes globally to your account?"
        confirmText="Yes, Save Changes"
        cancelText="Cancel"
        isDestructive={false}
      />

      {/* Reset Settings Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={confirmResetToDefault}
        title="Reset Settings"
        message="Are you sure you want to reset all settings to their default values? Any unsaved changes will be lost."
        confirmText="Yes, Reset"
        cancelText="Cancel"
        isDestructive={true}
      />
    </>
  );
}

export default Settings;
