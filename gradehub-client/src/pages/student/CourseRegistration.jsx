import { useState, useEffect } from "react";
import { useAcademic } from "../../context/AcademicContext";
import { useToast } from "../../context/ToastContext";

import PageHeader from "../../components/common/PageHeader";
import RegistrationSummary from "../../components/courseRegistration/RegistrationSummary";
import CourseRegistrationTable from "../../components/courseRegistration/CourseRegistrationTable";
import CourseRegistrationSkeleton from "../../components/ui/skeletons/CourseRegistrationSkeleton";
import Button from "../../components/ui/Button";

import { courseRegistrationService } from "../../services/courseRegistrationService";
import { courseService } from "../../services/courseService";
import { getRegistrationSummary } from "../../utils/registrationHelpers";

function CourseRegistration() {
  const { currentSession, isLoading: isAcademicLoading } = useAcademic();
  const { addToast } = useToast();

  const [courses, setCourses] = useState([]);
  const [rules, setRules] = useState({
    minUnits: 12,
    maxUnits: 48,
    status: "Open",
  });
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [droppedCodes, setDroppedCodes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [studentLevelId, setStudentLevelId] = useState(null);

  // Keep track of the current page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isAcademicLoading || !currentSession) return;

    const fetchRegistrationInfo = async () => {
      try {
        setLoading(true);

        const registrationData =
          await courseRegistrationService.getRegistrationData({
            sessionId: currentSession.id,
          });

        const {
          student,
          registeredCourses = [],
          rules: registrationRules,
        } = registrationData;

        setStudentLevelId(student.level.id);

        const courseQuery = {
          limit: 1000,
          page: 1,
        };

        if (!showAllCourses) {
          courseQuery.departmentId = student.department.id;
          courseQuery.levelId = student.level.id;
        }

        const response = await courseService.getAvailableCourses(courseQuery);
        const availableCourses =
          response.courses || response.data || response || [];

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
          levelId: course.level?.id || course.level_id || course.levelId,
        }));

        setCourses(mergedCourses);
        if (registrationRules) setRules(registrationRules);
      } catch (error) {
        console.error("Failed to load course registration details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrationInfo();
  }, [isAcademicLoading, currentSession, showAllCourses]);

  // FULL untouched array of filtered courses
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

  // Reset to page 1 if search, tabs, or view toggle changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeTab, showAllCourses]);

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
      .filter((course) => {
        if (course.status !== "Available") return false;
        if (showAllCourses && studentLevelId) {
          return course.levelId === studentLevelId;
        }
        return true;
      })
      .map((course) => course.code);

    setSelectedCodes((prev) => [...new Set([...prev, ...availableCodes])]);

    if (showAllCourses) {
      addToast({
        title: "Current Level Selected",
        message:
          "Courses for your level have been selected. Please manually select carry-overs.",
        type: "info",
      });
    }
  };

  const handleClearSelection = () => setSelectedCodes([]);

  const handleRowClick = (course) => {
    if (course.status === "Registered" && !isEditing) return;
    handleToggleSelection(course.code);
  };

  const handleSubmitRegistration = async () => {
    try {
      setSubmitting(true);
      await courseRegistrationService.submitRegistration({
        selectedCodes,
        droppedCodes,
        sessionId: currentSession.id,
      });

      setCourses((prevCourses) =>
        prevCourses.map((course) => {
          if (selectedCodes.includes(course.code))
            return { ...course, status: "Registered" };
          if (droppedCodes.includes(course.code))
            return { ...course, status: "Available" };
          return course;
        }),
      );

      setSelectedCodes([]);
      setDroppedCodes([]);
      setIsEditing(false);

      addToast({
        title: "Registration Successful",
        message: "Your course registration has been submitted and saved.",
        type: "success",
      });
    } catch (error) {
      addToast({
        title: "Registration Failed",
        message:
          error.response?.data?.message ||
          "Failed to submit course registration. Please try again.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const summary = getRegistrationSummary({
    courses,
    selectedCodes,
    droppedCodes,
    rules,
  });

  if (isAcademicLoading || loading) {
    return <CourseRegistrationSkeleton />;
  }

  if (!currentSession)
    return (
      <div className="p-10 text-center text-red-500">
        Registration is closed. No active session.
      </div>
    );

  return (
    <div>
      <PageHeader
        title="Course Registration"
        subtitle={`Register and manage your courses for the ${currentSession.name} academic session.`}
      />

      <div className="grid gap-8 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <div className="mb-4 flex justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowAllCourses(!showAllCourses)}
            >
              {showAllCourses ? "Show My Level Only" : "Register Other Courses"}
            </Button>
          </div>

          <CourseRegistrationTable
            courses={courses}
            filteredCourses={filteredCourses} // Send ALL items
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
            // Pass flat pagination props!
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className="xl:col-span-4">
          <div className="sticky top-24">
            <RegistrationSummary
              summary={summary}
              rules={rules}
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
              onCancelEdit={() => {
                setIsEditing(false);
                setDroppedCodes([]);
              }}
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
