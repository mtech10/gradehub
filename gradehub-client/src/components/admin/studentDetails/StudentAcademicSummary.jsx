import Card from "../../ui/Card";

function StudentAcademicSummary({ student }) {
  return (
    <Card className="p-4">
      <h3 className="mb-6 text-lg font-semibold">Academic Summary</h3>

      <div className="space-y-6">
        <Summary label="Current CGPA" value={student.cgpa} />

        <Summary label="Credits Earned" value={student.creditsEarned} />

        <Summary label="Courses Taken" value={student.coursesTaken} />

        <Summary
          label="Outstanding Courses"
          value={student.outstandingCourses}
        />

        <Summary label="Academic Standing" value={student.academicStanding} />
      </div>
    </Card>
  );
}

function Summary({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-none">
      <span className="text-slate-500">{label}</span>

      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}

export default StudentAcademicSummary;
