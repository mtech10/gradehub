import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import RegistrationSummary from "../../components/courseRegistration/RegistrationSummary";
import CourseRegistrationTable from "../../components/courseRegistration/CourseRegistrationTable";
import {
  initialRegistrationCourses,
  registrationRules,
} from "../../constants/courseRegistration/registrationData";
import { getRegistrationSummary } from "../../utils/registrationHelpers";

function CourseRegistration() {
  const [courses, setCourses] = useState(initialRegistrationCourses);
  const [selectedCodes, setSelectedCodes] = useState([]); // Courses to ADD
  const [droppedCodes, setDroppedCodes] = useState([]); // Courses to DROP
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isEditing, setIsEditing] = useState(false); // Edit Mode Flag

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTab = true;
    if (activeTab === "available")
      matchesTab =
        course.status === "Available" && !selectedCodes.includes(course.code);
    if (activeTab === "selected")
      matchesTab = selectedCodes.includes(course.code);
    if (activeTab === "registered") matchesTab = course.status === "Registered";

    return matchesSearch && matchesTab;
  });

  const handleToggleSelection = (code) => {
    const course = courses.find((c) => c.code === code);

    if (course.status === "Registered") {
      // If it's already registered, they must be in Edit mode to toggle it
      if (!isEditing) return;

      // Toggle it in the dropped cart
      setDroppedCodes((prev) => {
        const next = prev.includes(code)
          ? prev.filter((c) => c !== code)
          : [...prev, code];

        return next;
      });
    } else {
      // If it's available, toggle it in the selected cart
      setSelectedCodes((prev) => {
        const next = prev.includes(code)
          ? prev.filter((c) => c !== code)
          : [...prev, code];

        return next;
      });
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

  const handleSubmitRegistration = () => {
    setCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (selectedCodes.includes(course.code)) {
          return { ...course, status: "Registered" };
        }
        if (droppedCodes.includes(course.code)) {
          return { ...course, status: "Available" }; // Resets it to available
        }
        return course;
      }),
    );
    // Clear carts and exit edit mode
    setSelectedCodes([]);
    setDroppedCodes([]);
    setIsEditing(false);
    alert("Registration updated successfully!");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDroppedCodes([]); // Revert any drops they made
  };

  const summary = getRegistrationSummary({
    courses,
    selectedCodes,
    droppedCodes,
    rules: registrationRules,
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Course Registration"
        subtitle="Register your courses for the 2024/2025 academic session."
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
              rules={registrationRules}
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
              onCancelEdit={handleCancelEdit}
              onSubmit={handleSubmitRegistration}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;
