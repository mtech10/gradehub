import Card from "../../ui/Card";

function SettingsSection({ title, subtitle, children }) {
  return (
    <Card title={title} subtitle={subtitle}>
      <div>{children}</div>
    </Card>
  );
}

export default SettingsSection;
