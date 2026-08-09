import { useState, useEffect } from "react";

import PageHeader from "../../components/common/PageHeader";
import RegistrationSummary from "../../components/courseRegistration/RegistrationSummary";
import CourseRegistrationTable from "../../components/courseRegistration/CourseRegistrationTable";

import { courseRegistrationService } from "../../services/courseRegistrationService";
import { courseService } from "../../services/courseService";

import { getRegistrationSummary } from "../../utils/registrationHelpers";

function CourseRegistration() {
  const [courses, setCourses] = useState([]);
  const [rules, setRules] = useState({
    minUnits: 12,
    maxUnits: 24,
    status: "Open",
    deadline: "Soon",
  });

  const [selectedCodes, setSelectedCodes] = useState([]);
  const [droppedCodes, setDroppedCodes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchRegistrationInfo = async () => {
      try {
        setLoading(true);

        const registrationData =
          await courseRegistrationService.getRegistrationData();

        const {
          student,
          session,
          semester,
          registeredCourses = [],
          rules: registrationRules,
        } = registrationData;

        console.log("Registration context:", {
          student,
          session,
          semester,
          registeredCourses,
          rules: registrationRules,
        });

        const availableCourses = await courseService.getAvailableCourses({
          departmentId: student.department.id,
          levelId: student.level.id,
          sessionId: session.id,
          semesterId: semester.id,
        });

        console.log("Available courses:", availableCourses);

        const registeredIds = new Set(
          registeredCourses.map((course) => course.id),
        );

        const mergedCourses = availableCourses.map((course) => ({
          id: course.id,
          code: course.code,
          title: course.title,

          units: Number(course.creditUnit ?? course.unit ?? 0),
          creditUnit: Number(course.creditUnit ?? course.unit ?? 0),

          semester: course.semester,

          status: registeredIds.has(course.id) ? "Registered" : "Available",
        }));

        console.log("Final courses for table:", mergedCourses);

        setCourses(mergedCourses);

        if (registrationRules) {
          setRules(registrationRules);
        }
      } catch (error) {
        console.error("Failed to load course registration details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrationInfo();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTab = true;

    if (activeTab === "available") {
      matchesTab =
        course.status === "Available" && !selectedCodes.includes(course.code);
    }

    if (activeTab === "selected") {
      matchesTab = selectedCodes.includes(course.code);
    }

    if (activeTab === "registered") {
      matchesTab = course.status === "Registered";
    }

    return matchesSearch && matchesTab;
  });

  const handleToggleSelection = (code) => {
    const course = courses.find((c) => c.code === code);

    if (!course) return;

    if (course.status === "Registered") {
      if (!isEditing) return;

      setDroppedCodes((prev) =>
        prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
      );
    } else {
      setSelectedCodes((prev) =>
        prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
      );
    }
  };

  const handleSelectAll = () => {
    const availableCodes = filteredCourses
      .filter((course) => course.status === "Available")
      .map((course) => course.code);

    setSelectedCodes((prev) => [...new Set([...prev, ...availableCodes])]);
  };

  const handleClearSelection = () => {
    setSelectedCodes([]);
  };

  const handleRowClick = (course) => {
    if (course.status === "Registered" && !isEditing) {
      return;
    }

    handleToggleSelection(course.code);
  };

  const handleSubmitRegistration = async () => {
    try {
      setSubmitting(true);

      /*
       * IMPORTANT:
       * The service expects selectedCodes and droppedCodes.
       */
      await courseRegistrationService.submitRegistration({
        selectedCodes,
        droppedCodes,
      });

      // Only update the UI after the backend confirms success.
      setCourses((prevCourses) =>
        prevCourses.map((course) => {
          if (selectedCodes.includes(course.code)) {
            return {
              ...course,
              status: "Registered",
            };
          }

          if (droppedCodes.includes(course.code)) {
            return {
              ...course,
              status: "Available",
            };
          }

          return course;
        }),
      );

      setSelectedCodes([]);
      setDroppedCodes([]);
      setIsEditing(false);

      alert("Registration updated successfully!");
    } catch (error) {
      console.error("Submission failed:", error);

      alert(
        error.response?.data?.message ||
          "Failed to submit course registration.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDroppedCodes([]);
  };

  const summary = getRegistrationSummary({
    courses,
    selectedCodes,
    droppedCodes,
    rules,
  });

  if (loading) {
    return <div>Loading course registration portal...</div>;
  }

  return (
    <div>
      <PageHeader
        title="Course Registration"
        subtitle="Register and manage your courses for the current semester."
      />

      <div className="grid gap-8 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <CourseRegistrationTable
            courses={courses}
            filteredCourses={filteredCourses}
            summary={summary}
            selectedCodes={selectedCodes}
            droppedCodes={droppedCodes}
            isEditing={isEditing}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onToggleCourse={handleToggleSelection}
            onSelectAll={handleSelectAll}
            onClearSelection={handleClearSelection}
            handleRowClick={handleRowClick}
          />
        </div>

        <div className="xl:col-span-4">
          <div className="sticky top-24">
            <RegistrationSummary
              summary={summary}
              rules={rules}
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
              onCancelEdit={handleCancelEdit}
              onSubmit={handleSubmitRegistration}
              disabled={submitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;
