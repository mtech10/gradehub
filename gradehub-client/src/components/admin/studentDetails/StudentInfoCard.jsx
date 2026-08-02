import Card from "../../ui/Card";

function StudentInfoCard({ student }) {
  return (
    <Card className="p-6">
      <h3 className="mb-6 text-lg font-semibold">Student Information</h3>

      <div className="grid gap-6 md:grid-cols-2">
        <Info label="Faculty" value={student.faculty} />
        <Info label="Department" value={student.department} />
        <Info label="Level" value={student.level} />
        <Info label="Admission Year" value={student.admissionYear} />
        <Info label="Session" value={student.session} />
        <Info label="Email" value={student.email} />
        <Info label="Phone" value={student.phone} />
        <Info label="Status" value={student.status} />
      </div>
    </Card>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

export default StudentInfoCard;
