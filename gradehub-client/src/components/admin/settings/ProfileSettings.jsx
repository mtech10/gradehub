import SettingRow from "./SettingRow";
import SettingsSection from "./SettingsSection";
import Button from "../../ui/Button";

function ProfileSettings() {
  return (
    <SettingsSection
      title="Administrator Profile"
      subtitle="Manage your personal account information."
    >
      <SettingRow
        title="Profile Information"
        description="Update your personal information including your name and email."
      >
        <Button>Edit Profile</Button>
      </SettingRow>

      <SettingRow
        title="Profile Picture"
        description="Upload a new profile photo."
      >
        <Button variant="outline">Change Photo</Button>
      </SettingRow>

      <SettingRow
        title="Password"
        description="Update your account password."
        bordered={false}
      >
        <Button variant="outline">Change Password</Button>
      </SettingRow>
    </SettingsSection>
  );
}

export default ProfileSettings;
