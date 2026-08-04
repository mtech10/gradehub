import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

function CourseAssignment({ formData, updateField, courseStatuses }) {
  return (
    <Card className="p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Course Assignment
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Assign the lecturer and configure the course status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Course Lecturer"
          placeholder="e.g. Dr. Adebisi"
          value={formData.lecturer}
          onChange={(e) => updateField("lecturer", e.target.value)}
          required
        />

        <Select
          label="Course Status"
          placeholder="Select Status"
          options={courseStatuses}
          value={formData.status}
          onChange={(e) => updateField("status", e.target.value)}
        />
      </div>
    </Card>
  );
}

export default CourseAssignment;
