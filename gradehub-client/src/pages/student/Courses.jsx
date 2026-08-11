import { useState, useEffect } from "react";
import { useAcademic } from "../../context/AcademicContext"; // Added context import

import CourseHeader from "../../components/courses/CourseHeader";
import CourseFilterBar from "../../components/courses/CourseFilterBar";
import CourseStats from "../../components/courses/CourseStats";
import CourseAccordion from "../../components/courses/CourseAccordion";
import QuickLinks from "../../components/courses/QuickLinks";
import CourseStatistics from "../../components/courses/CourseStatistics";
import HelpCard from "../../components/courses/HelpCard";
import { courseService } from "../../services/courseService";

function Courses() {
  const {
    currentSession,
    currentSemester,
    isLoading: isAcademicLoading,
  } = useAcademic();

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAcademicLoading) return;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const result = await courseService.getStudentCoursesData({
          sessionId: currentSession?.id,
          semesterId: currentSemester?.id,
        });
        setData(result);
      } catch (error) {
        console.error("Failed to load courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [isAcademicLoading, currentSession, currentSemester]); // Re-run if active terms change

  if (isAcademicLoading || loading) {
    return (
      <div className="p-10 text-center text-slate-500 font-medium">
        Loading courses...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-10 text-center text-red-500">
        Unable to load course details.
      </div>
    );
  }

  const filteredSemesters = data.semesters
    .map((session) => {
      const filteredCourses = session.courses.filter((course) => {
        const matchesSearch =
          !searchQuery ||
          course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.title.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTab =
          activeTab === "all" ||
          course.status === activeTab ||
          (activeTab === "current" && session.status === "Current");

        return matchesSearch && matchesTab;
      });

      return { ...session, courses: filteredCourses };
    })
    .filter((session) => session.courses.length > 0);

  return (
    <div className="space-y-8">
      <CourseHeader />

      <CourseFilterBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <CourseStats stats={data.stats} />

      <section className="grid gap-8 xl:grid-cols-12">
        <div className="xl:col-span-8 space-y-6">
          {filteredSemesters.length > 0 ? (
            filteredSemesters.map((sessionData) => (
              <CourseAccordion key={sessionData.id} data={sessionData} />
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
              No courses found matching your criteria.
            </div>
          )}
        </div>

        <div className="space-y-6 xl:col-span-4">
          <QuickLinks links={data.quickLinks} />
          <CourseStatistics statistics={data.statistics} />
          <HelpCard />
        </div>
      </section>
    </div>
  );
}

export default Courses;
