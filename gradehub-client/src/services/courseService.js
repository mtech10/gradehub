import api from "./api";
import { BookOpen, CheckCircle, Clock, XCircle } from "lucide-react";

export const courseService = {
  getAvailableCourses: async (query = {}) => {
    const searchParams = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString();

    const response = await api.get(
      `/courses${queryString ? `?${queryString}` : ""}`,
    );

    const payload = response.data ?? response;
    return payload.data ?? payload;
  },

  getStudentCoursesData: async () => {
    const response = await api.get("/transcripts/me");

    const payload = response.data ?? response;
    const data = payload.data ?? payload;

    if (!data) {
      throw new Error("Course data not found");
    }

    let totalCoursesCount = 0;
    let totalUnits = 0;
    let totalUnitsEarned = 0;

    let completedCount = 0;
    let currentCount = 0;
    let failedCount = 0;

    
    let currentSessionCourseCount = 0;
    let currentSessionCompletedCount = 0;
    let currentSessionFailedCount = 0;

    const sessions = data.sessions ?? [];

    
    
    
    const groupedSessions = sessions.map((session) => {
      const sessionIsCurrent =
        session.isCurrent === true || session.isCurrent === "true";

      let sessionCourses = [];
      let sessionUnits = 0;

      
      (session.semesters ?? []).forEach((semester) => {
        (semester.courses ?? []).forEach((course) => {
          const creditUnit = Number(course.creditUnit ?? 0);

          totalCoursesCount++;
          totalUnits += creditUnit;

          let status = "current";

          if (course.resultId) {
            if (course.grade?.toUpperCase() === "F") {
              status = "failed";
              failedCount++;
            } else if (course.grade) {
              status = "completed";
              completedCount++;
              totalUnitsEarned += creditUnit;
            }
          } else {
            currentCount++;
          }

          
          if (sessionIsCurrent) {
            currentSessionCourseCount++;

            if (status === "completed") {
              currentSessionCompletedCount++;
            }
            if (status === "failed") {
              currentSessionFailedCount++;
            }
          }

          sessionCourses.push({
            id: course.id,
            registrationId: course.registrationId,

            code: course.code,
            title: course.title,

            departmentName: course.department?.name || "Department",
            lecturer:
              course.lecturer || course.department?.name || "Department",

            units: creditUnit,
            creditUnit,

            semester: semester.name, 
            semesterId: semester.id,

            session: session.name,
            sessionId: session.id,

            status,
            registeredAt: course.registeredAt,

            resultId: course.resultId ?? null,
            caScore: course.caScore ?? null,
            examScore: course.examScore ?? null,
            totalScore: course.totalScore ?? null,
            grade: course.grade ?? null,
            gradePoint: course.gradePoint ?? null,
            remark: course.remark ?? null,
          });

          sessionUnits += creditUnit;
        });
      });

      
      return {
        id: session.id,
        sessionId: session.id,

        title: `${session.name} Academic Session`,
        sessionName: session.name,

        status: sessionIsCurrent ? "Current" : "Completed",
        isCurrent: sessionIsCurrent,

        creditLoad: sessionUnits,
        courses: sessionCourses,
      };
    });

    
    
    
    const currentSession = sessions.find(
      (session) => session.isCurrent === true || session.isCurrent === "true",
    );

    if (currentSession) {
      currentCount = currentSession.semesters.reduce(
        (total, semester) =>
          total +
          (semester.courses ?? []).filter((course) => !course.resultId).length,
        0,
      );
    }

    
    
    
    const passedCourses = data.summary?.passedCourses ?? completedCount;
    const failedCourses = data.summary?.failedCourses ?? failedCount;

    return {
      student: data.student,

      
      
      
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
        {
          title: "Total Registered Units",
          value: totalUnits,
          subtitle: "All registered units",
          icon: BookOpen,
          color: "primary",
        },
      ],

      
      
      semesters: groupedSessions,

      
      
      
      statistics: {
        "this-session": {
          total: currentSessionCourseCount,
          chart: [
            {
              name: "Completed",
              value: currentSessionCompletedCount,
              color: "#10B981",
            },
            {
              name: "In Progress",
              value: currentCount,
              color: "#3B82F6",
            },
            {
              name: "Failed",
              value: currentSessionFailedCount,
              color: "#EF4444",
            },
          ],
          list: [
            {
              label: "Passed Courses",
              value: currentSessionCompletedCount,
              icon: CheckCircle,
            },
            {
              label: "Active Courses",
              value: currentCount,
              icon: Clock,
            },
            {
              label: "Dropped / Failed",
              value: currentSessionFailedCount,
              icon: XCircle,
            },
          ],
        },

        "all-time": {
          total: totalCoursesCount,
          chart: [
            {
              name: "Passed",
              value: passedCourses,
              color: "#10B981",
            },
            {
              name: "Failed",
              value: failedCourses,
              color: "#EF4444",
            },
          ],
          list: [
            {
              label: "Total Passed",
              value: passedCourses,
              icon: CheckCircle,
            },
            {
              label: "Total Failed",
              value: failedCourses,
              icon: XCircle,
            },
            {
              label: "Total Registered Units",
              value: totalUnits,
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

      summary: {
        totalCourses: totalCoursesCount,
        totalUnits,
        totalUnitsEarned,
        completedCourses: completedCount,
        currentCourses: currentCount,
        failedCourses,
      },
    };
  },
};
