import { useState, useMemo } from "react";

import CourseInputTable from "../../components/gpa/CourseInputTable";
import GPAResultsSummary from "../../components/gpa/GPAResultsSummary";
import GPATipsCard from "../../components/gpa/GPATipsCard";
import GradingScaleCard from "../../components/gpa/GradingScaleCard";
import GPANote from "../../components/gpa/GPANote";
import GPACalculatorSkeleton from "../../components/ui/skeletons/GPACalculatorSkeleton";
import { calculateGPA, createEmptyCourse } from "../../utils/gpaUtils";
import PageHeader from "../../components/ui/PageHeader";

import {
  initialCourses,
  GRADE_OPTIONS,
  UNIT_OPTIONS,
  gradingScale,
  gpaTips,
} from "../../constants/gpaCalculator";

function GPACalculator() {
  const [courses, setCourses] = useState(initialCourses);
  const [results, setResults] = useState(() => calculateGPA(initialCourses));
  const [loading, setLoading] = useState(false); // Toggle to true if fetching initial preset data asynchronously

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

  if (loading) {
    return <GPACalculatorSkeleton />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="GPA Calculator"
        description="Calculate your GPA for a semester or estimate your CGPA based on your courses."
      />

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
            gradeOptions={GRADE_OPTIONS}
            unitOptions={UNIT_OPTIONS}
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
          <GPATipsCard tips={gpaTips} />
          <GradingScaleCard gradingScale={gradingScale} />
        </div>
      </div>
    </div>
  );
}

export default GPACalculator;
