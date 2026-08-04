import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

function CourseAcademicInformation({
  formData,
  updateField,
  departments,
  levels,
  semesters,
}) {
  return (
    <Card className="p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Academic Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure where this course belongs academically.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Select
          label="Department"
          placeholder="Select Department"
          options={departments}
          value={formData.department}
          onChange={(e) => updateField("department", e.target.value)}
        />

        <Select
          label="Level"
          placeholder="Select Level"
          options={levels}
          value={formData.level}
          onChange={(e) => updateField("level", e.target.value)}
        />

        <Select
          label="Semester"
          placeholder="Select Semester"
          options={semesters}
          value={formData.semester}
          onChange={(e) => updateField("semester", e.target.value)}
        />

        <Input
          label="Course Unit"
          type="number"
          min={1}
          placeholder="3"
          value={formData.unit}
          onChange={(e) => updateField("unit", e.target.value)}
        />
      </div>
    </Card>
  );
}

export default CourseAcademicInformation;
