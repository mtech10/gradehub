import Card from "../../ui/Card";

function StudentAcademicSummary({ student }) {
  return (
    <Card className="p-4 sm:p-6">
      <h3 className="mb-4 sm:mb-6 text-lg font-semibold text-slate-900">
        Academic Summary
      </h3>

      <div className="space-y-4 sm:space-y-6">
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
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-none gap-2">
      <span className="text-xs sm:text-sm text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900 text-sm sm:text-base">
        {value || "—"}
      </span>
    </div>
  );
}

export default StudentAcademicSummary;
