import { useState, useMemo } from "react";

import GPAHeader from "../../components/gpa/GPAHeader";
import CourseInputTable from "../../components/gpa/CourseInputTable";
import GPAResultsSummary from "../../components/gpa/GPAResultsSummary";
import GPATipsCard from "../../components/gpa/GPATipsCard";
import GradingScaleCard from "../../components/gpa/GradingScaleCard";
import GPANote from "../../components/gpa/GPANote";
import { initialCourses } from "../../constants/gpaCalculator";
import { calculateGPA, createEmptyCourse } from "../../utils/gpaUtils";

function GPACalculator() {
  const [activeTab, setActiveTab] = useState("semester");
  const [courses, setCourses] = useState(initialCourses);

  // Results only recompute when "Calculate GPA" is pressed, so the stat
  // cards don't jump around while a student is mid-edit.
  const [results, setResults] = useState(() => calculateGPA(initialCourses));

  const totalUnits = useMemo(
    () => courses.reduce((sum, course) => sum + Number(course.units || 0), 0),
    [courses],
  );

  const handleAddCourse = () => {
    const nextId =
      courses.length > 0 ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
    setCourses([...courses, createEmptyCourse(nextId)]);
  };

  const handleRemoveCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const handleClearAll = () => {
    setCourses([]);
    setResults(calculateGPA([]));
  };

  const handleCalculate = () => {
    setResults(calculateGPA(courses));
  };

  return (
    <div className="space-y-8">
      <GPAHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "semester" ? (
        <div className="grid gap-8 xl:grid-cols-3">
          <div className="space-y-8 xl:col-span-2">
            <CourseInputTable
              courses={courses}
              onChange={setCourses}
              onAdd={handleAddCourse}
              onRemove={handleRemoveCourse}
              totalUnits={totalUnits}
              onClear={handleClearAll}
              onCalculate={handleCalculate}
            />

            <GPAResultsSummary
              gpa={results.gpa}
              totalUnits={results.totalUnits}
              totalQualityPoints={results.totalQualityPoints}
              semesterLabel="2023/2024 2nd Semester"
              classRank="6 / 128"
            />

            <GPANote />
          </div>

          <div className="space-y-8">
            <GPATipsCard />
            <GradingScaleCard />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            CGPA Estimator coming soon
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            This will project your final CGPA using your existing transcript
            plus the semester you're currently planning. Wiring it up once the
            transcript data comes from the backend.
          </p>
        </div>
      )}
    </div>
  );
}

export default GPACalculator;
