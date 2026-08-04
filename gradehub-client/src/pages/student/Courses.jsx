import { useState } from "react";
import CourseHeader from "../../components/courses/CourseHeader";
import CourseFilterBar from "../../components/courses/CourseFilterBar";
import CourseStats from "../../components/courses/CourseStats";
import RegisteredCourses from "../../components/courseRegistration/RegisteredCourses";
import QuickLinks from "../../components/courses/QuickLinks";
import CourseStatistics from "../../components/courses/CourseStatistics";
import HelpCard from "../../components/courses/HelpCard";

import { courseStats } from "../../constants/courses/courseStats";
import { registeredSemesters } from "../../constants/courses/courseData";
import { quickLinks } from "../../constants/courses/quickLinks";
import { courseStatistics } from "../../constants/courses/courseStatistics";

function Courses() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      <CourseHeader />

      <CourseFilterBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <CourseStats stats={courseStats} />

      <section className="grid gap-8 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <RegisteredCourses
            semesters={registeredSemesters}
            activeTab={activeTab}
            searchQuery={searchQuery}
          />
        </div>

        <div className="space-y-6 xl:col-span-4">
          <QuickLinks links={quickLinks} />
          <CourseStatistics statistics={courseStatistics} />
          <HelpCard />
        </div>
      </section>
    </div>
  );
}

export default Courses;
