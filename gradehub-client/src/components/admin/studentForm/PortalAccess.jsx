import Input from "../../ui/Input";
import Select from "../../ui/Select";

function PortalAccess({ formData, handleChange }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Portal Access</h2>

        <div className="mt-3 border-b border-slate-200" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Input
          label="Username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />

        <Input
          label="Temporary Password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          placeholder="Temporary password"
        />

        <Input
          label="Confirm Password"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          placeholder="Confirm password"
        />

        <Select
          label="Portal Status"
          required
          value={formData.portalStatus}
          onChange={(e) => handleChange("portalStatus", e.target.value)}
          options={[
            {
              value: "",
              label: "Select Status",
            },
            {
              value: "Active",
              label: "Active",
            },
            {
              value: "Disabled",
              label: "Disabled",
            },
          ]}
        />

        <Input
          label="Recovery Email"
          type="email"
          placeholder="Optional"
          value={formData.recoveryEmail}
          onChange={(e) => handleChange("recoveryEmail", e.target.value)}
        />

        <Input
          label="Recovery Phone"
          placeholder="Optional"
          value={formData.recoveryPhone}
          onChange={(e) => handleChange("recoveryPhone", e.target.value)}
        />
      </div>
    </section>
  );
}

export default PortalAccess;
