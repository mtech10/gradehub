// import api from "./api";
// import { BookOpen, CheckCircle, Clock, XCircle } from "lucide-react";

// export const courseService = {
//   getAvailableCourses: async ({
//     departmentId,
//     levelId,
//     sessionId,
//     semesterId,
//   }) => {
//     const query = new URLSearchParams();

//     if (departmentId) {
//       query.append("departmentId", departmentId);
//     }

//     if (levelId) {
//       query.append("levelId", levelId);
//     }

//     if (sessionId) {
//       query.append("sessionId", sessionId);
//     }

//     if (semesterId) {
//       query.append("semesterId", semesterId);
//     }

//     const queryString = query.toString();

//     const response = await api.get(
//       `/courses${queryString ? `?${queryString}` : ""}`,
//     );

//     const payload = response.data ?? response;

//     return payload.data ?? payload;
//   },

//   getStudentCoursesData: async () => {
//     const response = await api.get("/transcripts/me");

//     const payload = response.data ?? response;
//     const data = payload.data ?? payload;

//     if (!data) {
//       throw new Error("Course data not found");
//     }

//     let totalCoursesCount = 0;
//     let totalUnits = 0;
//     let totalUnitsEarned = 0;

//     let completedCount = 0;
//     let currentCount = 0;
//     let failedCount = 0;

//     // Current-session-specific statistics
//     let currentSessionCourseCount = 0;
//     let currentSessionCompletedCount = 0;
//     let currentSessionFailedCount = 0;

//     const sessions = data.sessions ?? [];

//     // ---------------------------------------------------------
//     // Transform backend transcript structure
//     // ---------------------------------------------------------
//     const semesters = sessions.flatMap((session) => {
//       const sessionIsCurrent =
//         session.isCurrent === true || session.isCurrent === "true";

//       return (session.semesters ?? []).map((semester) => {
//         const semesterIsCurrent =
//           semester.isCurrent === true || semester.isCurrent === "true";

//         const courses = (semester.courses ?? []).map((course) => {
//           const creditUnit = Number(course.creditUnit ?? 0);

//           totalCoursesCount++;
//           totalUnits += creditUnit;

//           let status = "current";

//           if (course.resultId) {
//             if (course.grade?.toUpperCase() === "F") {
//               status = "failed";
//               failedCount++;
//             } else if (course.grade) {
//               status = "completed";
//               completedCount++;
//               totalUnitsEarned += creditUnit;
//             }
//           } else {
//             currentCount++;
//           }

//           // Current-session statistics
//           if (sessionIsCurrent) {
//             currentSessionCourseCount++;

//             if (status === "completed") {
//               currentSessionCompletedCount++;
//             }

//             if (status === "failed") {
//               currentSessionFailedCount++;
//             }
//           }

//           return {
//             id: course.id,
//             registrationId: course.registrationId,

//             code: course.code,
//             title: course.title,

//             // -------------------------------------------------
//             // Department offering the course
//             // -------------------------------------------------
//             departmentName: course.department?.name || "Department",

//             // Keep lecturer for future backend support
//             lecturer:
//               course.lecturer || course.department?.name || "Department",

//             units: creditUnit,
//             creditUnit,

//             semester: semester.name,
//             semesterId: semester.id,

//             session: session.name,
//             sessionId: session.id,

//             status,

//             registeredAt: course.registeredAt,

//             resultId: course.resultId ?? null,
//             caScore: course.caScore ?? null,
//             examScore: course.examScore ?? null,
//             totalScore: course.totalScore ?? null,
//             grade: course.grade ?? null,
//             gradePoint: course.gradePoint ?? null,
//             remark: course.remark ?? null,
//           };
//         });

//         const semesterUnits = courses.reduce(
//           (sum, course) => sum + course.units,
//           0,
//         );

//         return {
//           id: semester.id,
//           sessionId: session.id,

//           title: `${session.name} — ${semester.name}`,

//           semesterName: semester.name,
//           semesterId: semester.id,

//           sessionName: session.name,

//           status:
//             sessionIsCurrent && semesterIsCurrent ? "Current" : "Completed",

//           isCurrent: semesterIsCurrent,

//           creditLoad: semesterUnits,

//           courses,
//         };
//       });
//     });

//     // ---------------------------------------------------------
//     // Current session course count
//     // ---------------------------------------------------------
//     const currentSession = sessions.find(
//       (session) => session.isCurrent === true || session.isCurrent === "true",
//     );

//     if (currentSession) {
//       currentCount = currentSession.semesters.reduce(
//         (total, semester) =>
//           total +
//           (semester.courses ?? []).filter((course) => !course.resultId).length,
//         0,
//       );
//     }

//     // ---------------------------------------------------------
//     // Summary values
//     // ---------------------------------------------------------
//     const passedCourses = data.summary?.passedCourses ?? completedCount;

//     const failedCourses = data.summary?.failedCourses ?? failedCount;

//     return {
//       student: data.student,

//       // -------------------------------------------------------
//       // Statistics cards
//       // -------------------------------------------------------
//       stats: [
//         {
//           title: "Total Courses",
//           value: totalCoursesCount,
//           subtitle: "Registered all-time",
//           icon: BookOpen,
//           color: "primary",
//         },

//         {
//           title: "Current Courses",
//           value: currentCount,
//           subtitle: "Active this session",
//           icon: Clock,
//           color: "warning",
//         },

//         {
//           title: "Completed",
//           value: completedCount,
//           subtitle: "Successfully passed",
//           icon: CheckCircle,
//           color: "success",
//         },

//         {
//           title: "Credit Units",
//           value: totalUnitsEarned,
//           subtitle: "Total earned units",
//           icon: BookOpen,
//           color: "purple",
//         },

//         // -----------------------------------------------------
//         // NEW FIFTH CARD
//         // -----------------------------------------------------
//         {
//           title: "Total Registered Units",
//           value: totalUnits,
//           subtitle: "All registered units",
//           icon: BookOpen,
//           color: "primary",
//         },
//       ],

//       semesters,

//       // -------------------------------------------------------
//       // Course statistics
//       // -------------------------------------------------------
//       statistics: {
//         "this-session": {
//           // 3 current + 1 completed = 4 total courses
//           total: currentSessionCourseCount,

//           chart: [
//             {
//               name: "Completed",
//               value: currentSessionCompletedCount,
//               color: "#10B981",
//             },

//             {
//               name: "In Progress",
//               value: currentCount,
//               color: "#3B82F6",
//             },

//             {
//               name: "Failed",
//               value: currentSessionFailedCount,
//               color: "#EF4444",
//             },
//           ],

//           list: [
//             {
//               label: "Passed Courses",
//               value: currentSessionCompletedCount,
//               icon: CheckCircle,
//             },

//             {
//               label: "Active Courses",
//               value: currentCount,
//               icon: Clock,
//             },

//             {
//               label: "Dropped / Failed",
//               value: currentSessionFailedCount,
//               icon: XCircle,
//             },
//           ],
//         },

//         "all-time": {
//           total: totalCoursesCount,

//           chart: [
//             {
//               name: "Passed",
//               value: passedCourses,
//               color: "#10B981",
//             },

//             {
//               name: "Failed",
//               value: failedCourses,
//               color: "#EF4444",
//             },
//           ],

//           list: [
//             {
//               label: "Total Passed",
//               value: passedCourses,
//               icon: CheckCircle,
//             },

//             {
//               label: "Total Failed",
//               value: failedCourses,
//               icon: XCircle,
//             },

//             {
//               label: "Total Registered Units",
//               value: totalUnits,
//               icon: BookOpen,
//             },
//           ],
//         },
//       },

//       // -------------------------------------------------------
//       // Quick links
//       // -------------------------------------------------------
//       quickLinks: [
//         {
//           title: "Course Registration",
//           description: "Register for current semester courses",
//           icon: BookOpen,
//           iconColor: "bg-blue-50 text-blue-600",
//           path: "/student/course-registration",
//         },

//         {
//           title: "Exam Timetable",
//           description: "View upcoming examination schedules",
//           icon: Clock,
//           iconColor: "bg-purple-50 text-purple-600",
//           path: "/student/timetable",
//         },
//       ],

//       // -------------------------------------------------------
//       // Useful summary
//       // -------------------------------------------------------
//       summary: {
//         totalCourses: totalCoursesCount,
//         totalUnits,
//         totalUnitsEarned,
//         completedCourses: completedCount,
//         currentCourses: currentCount,
//         failedCourses,
//       },
//     };
//   },
// };

import api from "./api";
import { BookOpen, CheckCircle, Clock, XCircle } from "lucide-react";

export const courseService = {
  getAvailableCourses: async ({
    departmentId,
    levelId,
    sessionId,
    semesterId,
  }) => {
    const query = new URLSearchParams();

    if (departmentId) query.append("departmentId", departmentId);
    if (levelId) query.append("levelId", levelId);
    if (sessionId) query.append("sessionId", sessionId);
    if (semesterId) query.append("semesterId", semesterId);

    const queryString = query.toString();

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

    // Current-session-specific statistics
    let currentSessionCourseCount = 0;
    let currentSessionCompletedCount = 0;
    let currentSessionFailedCount = 0;

    const sessions = data.sessions ?? [];

    // ---------------------------------------------------------
    // Transform backend transcript structure to GROUP BY SESSION
    // ---------------------------------------------------------
    const groupedSessions = sessions.map((session) => {
      const sessionIsCurrent =
        session.isCurrent === true || session.isCurrent === "true";

      let sessionCourses = [];
      let sessionUnits = 0;

      // Loop through all semesters in this session and pool the courses together
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

          // Current-session statistics
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

            semester: semester.name, // Keep semester name for UI reference
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

      // Return a single unified object for the entire session
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

    // ---------------------------------------------------------
    // Current session course count (Fallback verification)
    // ---------------------------------------------------------
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

    // ---------------------------------------------------------
    // Summary values
    // ---------------------------------------------------------
    const passedCourses = data.summary?.passedCourses ?? completedCount;
    const failedCourses = data.summary?.failedCourses ?? failedCount;

    return {
      student: data.student,

      // -------------------------------------------------------
      // Statistics cards
      // -------------------------------------------------------
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

      // We still pass this as "semesters" so we don't break the main Courses.jsx file,
      // but it now contains grouped Sessions instead!
      semesters: groupedSessions,

      // -------------------------------------------------------
      // Course statistics
      // -------------------------------------------------------
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

      // -------------------------------------------------------
      // Quick links
      // -------------------------------------------------------
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
