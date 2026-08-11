import { useState } from "react";
import { Check, Info } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import ProfileSettings from "../../components/admin/settings/ProfileSettings";
import SystemPreferenceSettings from "../../components/admin/settings/SystemPreferenceSettings";
import NotificationSettings from "../../components/admin/settings/NotificationSettings";
import SecuritySettings from "../../components/admin/settings/SecuritySettings";
import AppearanceSettings from "../../components/admin/settings/AppearanceSettings";
import UserManagementSettings from "../../components/admin/settings/UserManagementSettings";
import BackupSettings from "../../components/admin/settings/BackupSettings";

import AcademicTermSettings from "../../components/admin/settings/AcademicTermSettings";

import { adminSettingsData } from "../../constants/admin/adminSettingsData";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState(adminSettingsData);

  const settingTabs = [
    {
      id: "profile",
      label: "Profile",
      component: ProfileSettings,
      section: "profile",
    },
    {
      id: "preferences",
      label: "System Preferences",
      component: SystemPreferenceSettings,
      section: "system",
    },
    {
      id: "academicTerms",
      label: "Academic Terms",
      component: AcademicTermSettings,
      section: "academicTerms",
    },
    {
      id: "notifications",
      label: "Notifications",
      component: NotificationSettings,
      section: "notifications",
    },
    {
      id: "security",
      label: "Security",
      component: SecuritySettings,
      section: "security",
    },
    {
      id: "appearance",
      label: "Appearance",
      component: AppearanceSettings,
      section: "appearance",
    },
    {
      id: "users",
      label: "User Management",
      component: UserManagementSettings,
      section: "userManagement",
    },
    {
      id: "backup",
      label: "Backup & Maintenance",
      component: BackupSettings,
      section: "backup",
    },
  ];

  const updateSection = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const activeSetting =
    settingTabs.find((tab) => tab.id === activeTab) ?? settingTabs[0];

  const ActiveComponent = activeSetting.component;

  const handleSave = () => {
    console.log(settings);
    alert("Settings saved successfully.");
  };

  const handleReset = () => {
    if (window.confirm("Reset all settings back to their default values?")) {
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <PageHeader
          title="Settings"
          subtitle="Configure your administrator account and system preferences."
        />

        <div className="flex gap-3">
          <Button variant="outline" className="bg-white" onClick={handleReset}>
            Reset
          </Button>

          <Button onClick={handleSave}>
            <Check size={16} />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="flex gap-8 overflow-x-auto border-b border-slate-200">
        {settingTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`whitespace-nowrap border-b-2 pb-4 text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-4xl">
        <ActiveComponent
          data={settings[activeSetting.section] || {}}
          onChange={updateSection}
        />
      </div>

      <div className="flex max-w-4xl items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
          <Info size={15} />
        </div>

        <p className="text-sm font-medium text-blue-900">
          Changes made here affect the administrator workspace and system
          behaviour. Remember to save your changes before leaving this page.
        </p>
      </div>
    </div>
  );
}

export default Settings;
