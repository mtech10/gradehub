import SettingRow from "./SettingRow";
import SettingsSection from "./SettingsSection";

function UserManagementSettings({ data, onChange }) {
  const update = (key, value) => {
    onChange("userManagement", key, value);
  };

  return (
    <SettingsSection
      title="User Management"
      subtitle="Manage administrator and student account behaviour."
    >
      <SettingRow
        title="Allow Self Registration"
        description="Allow students to register accounts themselves."
        checked={data.selfRegistration}
        onValueChange={(value) => update("selfRegistration", value)}
      />

      <SettingRow
        title="Require Email Verification"
        description="Verify email addresses before account activation."
        checked={data.emailVerification}
        onValueChange={(value) => update("emailVerification", value)}
      />

      <SettingRow
        title="Administrator Approval"
        description="Require administrator approval for newly created accounts."
        checked={data.adminApproval}
        onValueChange={(value) => update("adminApproval", value)}
        bordered={false}
      />
    </SettingsSection>
  );
}

export default UserManagementSettings;
