import Card from "../../ui/Card";

function StudentInfoCard({ student }) {
  return (
    <Card className="p-4 sm:p-6">
      <h3 className="mb-4 sm:mb-6 text-lg font-semibold text-slate-900">
        Student Information
      </h3>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
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
    <div className="min-w-0">
      <p className="text-xs sm:text-sm text-slate-500">{label}</p>
      <p className="mt-0.5 sm:mt-1 font-medium text-slate-900 text-sm sm:text-base break-words">
        {value || "—"}
      </p>
    </div>
  );
}

export default StudentInfoCard;
