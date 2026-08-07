import api from "./api";
import { BookOpen, CheckCircle, Clock, XCircle } from "lucide-react";

export const courseService = {
  getStudentCoursesData: async () => {
    const response = await api.get("/transcripts/me");
    const payload = response.data || response;
    const data = payload.data || payload;

    if (!data) throw new Error("Course data not found");

    let totalCoursesCount = 0;
    let totalUnitsEarned = 0;
    let completedCount = 0;
    let currentCount = 0;

    // Map sessions and courses from backend structure
    const semestersList =
      data.sessions?.map((session, sIndex) => {
        let sessionCreditLoad = 0;

        const sessionSemesters =
          session.semesters?.map((semester) => {
            let semesterUnits = 0;

            const courses =
              semester.courses?.map((course) => {
                totalCoursesCount++;
                sessionCreditLoad += course.creditUnit || 0;
                semesterUnits += course.creditUnit || 0;

                if (course.grade && course.grade !== "F") {
                  completedCount++;
                  totalUnitsEarned += course.creditUnit || 0;
                }

                return {
                  id: course.id,
                  code: course.code,
                  title: course.title,
                  lecturer: course.lecturer || "Department Faculty", // Fallback if not in DB yet
                  units: course.creditUnit || 0,
                  semester: semester.name,
                  status:
                    course.grade && course.grade !== "F"
                      ? "completed"
                      : "current",
                  grade: course.grade,
                };
              }) || [];

            return {
              semesterName: semester.name,
              units: semesterUnits,
              courses,
            };
          }) || [];

        // Determine if this is the current active session
        const isCurrentSession = session.isCurrent || sIndex === 0;
        if (isCurrentSession)
          currentCount += sessionSemesters.reduce(
            (acc, sem) => acc + sem.courses.length,
            0,
          );

        return {
          id: session.id || sIndex,
          title: `${session.name} Academic Session`,
          status: isCurrentSession ? "Current" : "Completed",
          creditLoad: sessionCreditLoad,
          courses: sessionSemesters.flatMap((sem) => sem.courses),
        };
      }) || [];

    return {
      stats: [
        {
          title: "Total Courses",
          value: totalCoursesCount,
          subtitle: "Registered all-time",
          icon: BookOpen,
          color: "primary",
        },
        {
          title: "Current Courses",
          value: currentCount,
          subtitle: "Active this session",
          icon: Clock,
          color: "warning",
        },
        {
          title: "Completed",
          value: completedCount,
          subtitle: "Successfully passed",
          icon: CheckCircle,
          color: "success",
        },
        {
          title: "Credit Units",
          value: totalUnitsEarned,
          subtitle: "Total earned units",
          icon: BookOpen,
          color: "purple",
        },
      ],
      semesters: semestersList,
      statistics: {
        "this-session": {
          total: currentCount || totalCoursesCount,
          chart: [
            { name: "Completed", value: completedCount, color: "#10B981" },
            { name: "In Progress", value: currentCount, color: "#3B82F6" },
          ],
          list: [
            {
              label: "Passed Courses",
              value: completedCount,
              icon: CheckCircle,
            },
            { label: "Active Courses", value: currentCount, icon: Clock },
            {
              label: "Dropped / Failed",
              value: data.summary?.failedCourses || 0,
              icon: XCircle,
            },
          ],
        },
        "all-time": {
          total: totalCoursesCount,
          chart: [
            {
              name: "Passed",
              value: data.summary?.passedCourses || 0,
              color: "#10B981",
            },
            {
              name: "Failed",
              value: data.summary?.failedCourses || 0,
              color: "#EF4444",
            },
          ],
          list: [
            {
              label: "Total Passed",
              value: data.summary?.passedCourses || 0,
              icon: CheckCircle,
            },
            {
              label: "Total Failed",
              value: data.summary?.failedCourses || 0,
              icon: XCircle,
            },
            {
              label: "Total Earned Units",
              value: totalUnitsEarned,
              icon: BookOpen,
            },
          ],
        },
      },
      quickLinks: [
        {
          title: "Course Registration",
          description: "Register for current semester courses",
          icon: BookOpen,
          iconColor: "bg-blue-50 text-blue-600",
          path: "/student/course-registration",
        },
        {
          title: "Exam Timetable",
          description: "View upcoming examination schedules",
          icon: Clock,
          iconColor: "bg-purple-50 text-purple-600",
          path: "/student/timetable",
        },
      ],
    };
  },
};
