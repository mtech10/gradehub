import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

function CourseBasicInformation({ formData, updateField }) {
  return (
    <Card className="p-4 sm:p-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Basic Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter the basic details of the course.
        </p>
      </div>

      <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
        <Input
          label="Course Code"
          placeholder="e.g. AGE401"
          value={formData.code}
          onChange={(e) => updateField("code", e.target.value)}
          required
        />

        <Input
          label="Course Title"
          placeholder="e.g. Soil Mechanics"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          required
        />
      </div>

      <div className="mt-6">
        <Textarea
          label="Course Description"
          placeholder="Provide a short description of this course..."
          rows={5}
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
        />
      </div>
    </Card>
  );
}

export default CourseBasicInformation;
