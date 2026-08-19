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
  const [activeTab, setActiveTab] = useState("notifications");
  const { addToast } = useToast();

  const [showResetModal, setShowResetModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [settingsState, setSettingsState] = useState(defaultSettingsState);
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

  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  const executeSave = async () => {
    setShowSaveModal(false);
    setIsSaving(true);

    try {
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

  const confirmResetToDefault = () => {
    setShowResetModal(false);
    setSettingsState(defaultSettingsState);
    setNotifSettings(initialNotifSettings);

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
      <div className="space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <PageHeader
            title="Settings"
            subtitle="Manage your account, preferences and security settings."
          />

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
            <Button
              variant="outline"
              className="bg-white w-full sm:w-auto justify-center"
              onClick={() => setShowResetModal(true)}
              disabled={isSaving}
            >
              Reset to Default
            </Button>

            <Button
              className="w-full sm:w-auto justify-center"
              onClick={handleSaveClick}
              loading={isSaving}
              disabled={isSaving}
            >
              {!isSaving && <Check size={16} className="mr-1.5" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Tabs (Horizontal scroll on mobile) */}
        <div className="flex gap-4 sm:gap-8 overflow-x-auto border-b border-slate-200 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 pb-3 sm:pb-4 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="w-full max-w-3xl">{renderActiveTab()}</div>

        <div className="flex max-w-3xl items-start sm:items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white mt-0.5 sm:mt-0">
            <Info size={14} />
          </div>
          <p className="text-xs sm:text-sm font-medium text-blue-900 leading-relaxed">
            Changes you make will be compiled and applied globally once you
            click Save Changes.
          </p>
        </div>
      </div>

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
