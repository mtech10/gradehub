import api from "./api";
import { mapTranscriptToResultsUI } from "../utils/resultHelpers";

const formatForTranscriptPage = (data) => {
  if (!data) return null;

  return {
    profile: {
      name: `${data.student?.firstName || ""} ${data.student?.middleName || ""} ${data.student?.lastName || ""}`.trim(),
      matricNumber: data.student?.matricNumber,
      department: data.student?.department?.name,
      programme: data.student?.programme || "B.Eng",
      admissionYear: "2025",
      level: data.student?.level?.name,
      session: data.student?.session?.name,
    },

    summary: {
      cgpa: data.summary?.cgpa?.toFixed(2) || "0.00",
      totalUnits: data.summary?.earnedCredits || 0,
      totalCourses:
        (data.summary?.passedCourses || 0) + (data.summary?.failedCourses || 0),
      degreeClass:
        data.summary?.cgpa >= 4.5 ? "First Class" : "Second Class Upper",
      totalSessions: data.sessions?.length || 0,
    },

    transcript: {
      sessions: data.sessions?.map((session) => {
        let sessionTotalUnits = 0;
        let sessionGpaSum = 0;
        let semesterCount = 0;

        const mappedSemesters = session.semesters?.map((semester) => {
          sessionTotalUnits += semester.totalCredits || 0;
          sessionGpaSum += semester.gpa || 0;
          semesterCount += 1;

          const totalScoreSum =
            semester.courses?.reduce(
              (acc, course) => acc + (course.totalScore || 0),
              0,
            ) || 0;
          const courseCount = semester.courses?.length || 0;
          const averageScore =
            courseCount > 0 ? totalScoreSum / courseCount : 0;

          return {
            semester: semester.name?.replace(" Semester", ""),

            gpa: semester.gpa || 0,
            units: semester.totalCredits || 0,
            totalUnits: semester.totalCredits || 0,
            averageScore: averageScore,
            totalCourses: courseCount,

            courses: semester.courses?.map((course) => ({
              id: course.id,
              code: course.code,
              title: course.title,
              units: course.creditUnit || 0,
              unit: course.creditUnit || 0,
              score: course.totalScore || 0,
              grade: course.grade,
              gradePoint: course.gradePoint,
            })),
          };
        });

        return {
          session: session.name,
          units: sessionTotalUnits,
          totalUnits: sessionTotalUnits,
          averageGpa: semesterCount > 0 ? sessionGpaSum / semesterCount : 0,
          gpa: semesterCount > 0 ? sessionGpaSum / semesterCount : 0,
          semesters: mappedSemesters,
        };
      }),
    },

    progress: data.sessions?.map((session) => ({
      session: session.name.split("/")[0],
      gpa: session.semesters?.[0]?.gpa || 0,
    })),
  };
};

const transcriptService = {
  getMyResults: async () => {
    const response = await api.get("/transcripts/me");
    const payload = response.data || response;
    return mapTranscriptToResultsUI(payload.data || payload);
  },

  getMyTranscriptFull: async () => {
    const response = await api.get("/transcripts/me");
    const payload = response.data || response;
    return formatForTranscriptPage(payload.data || payload);
  },
};

export default transcriptService;
