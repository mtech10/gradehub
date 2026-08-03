import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

function Row({ label, value, isBadge = false }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-4 last:border-none">
      <span className="text-slate-500">{label}</span>

      {isBadge ? (
        <Badge variant={value === "Active" ? "green" : "red"}>{value}</Badge>
      ) : (
        <span className="font-semibold text-slate-900">{value}</span>
      )}
    </div>
  );
}

function DepartmentInformationCard({ department }) {
  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-semibold">Department Information</h3>

      <div>
        <Row label="Department Name" value={department.name} />

        <Row label="Department Code" value={department.code} />

        <Row label="Faculty" value={department.faculty} />

        <Row label="Head of Department" value={department.hod} />

        <Row label="Office" value={department.office} />

        <Row label="Email" value={department.email} />

        <Row label="Phone Number" value={department.phone} />

        <Row label="Students" value={department.students} />

        <Row label="Lecturers" value={department.lecturers} />

        <Row label="Courses" value={department.courses} />

        <Row label="Status" value={department.status} isBadge />
      </div>
    </Card>
  );
}

export default DepartmentInformationCard;
