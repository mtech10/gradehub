import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

function CourseAcademicInformation({
  formData,
  updateField,
  departments,
  levels,
  semesters = [],
}) {
  const uniqueSemesters = semesters.filter(
    (semester, index, self) =>
      index === self.findIndex((s) => s.name === semester.name),
  );

  return (
    <Card className="p-4 sm:p-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Academic Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure where this course belongs academically.
        </p>
      </div>

      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
        <Select
          label="Department"
          placeholder="Select Department"
          options={departments.map((department) => ({
            value: department.id,
            label: department.name,
          }))}
          value={formData.departmentId}
          onChange={(e) => updateField("departmentId", e.target.value)}
          required
        />

        <Select
          label="Level"
          placeholder="Select Level"
          options={levels.map((level) => ({
            value: level.id,
            label: level.name,
          }))}
          value={formData.levelId}
          onChange={(e) => updateField("levelId", e.target.value)}
          required
        />

        <Select
          label="Semester"
          placeholder="Select Semester"
          options={uniqueSemesters.map((semester) => ({
            value: semester.name,
            label: semester.name,
          }))}
          value={formData.semester}
          onChange={(e) => updateField("semester", e.target.value)}
          required
        />

        <Input
          label="Course Unit"
          type="number"
          min={1}
          max={10}
          placeholder="3"
          value={formData.creditUnit}
          onChange={(e) => updateField("creditUnit", e.target.value)}
          required
        />
      </div>
    </Card>
  );
}

export default CourseAcademicInformation;
