import api from "./api";
import {
  GraduationCap,
  BookOpen,
  ClipboardList,
  CalendarDays,
  School,
} from "lucide-react";
const mapStudentDashboard = (data) => {
  return {
    student: data.student,

    stats: [
      {
        icon: GraduationCap,
        title: "Current GPA",
        value: data.overview.currentGPA,
        subtitle: "Current Semester",
        color: "primary",
      },

      {
        icon: BookOpen,
        title: "Total Credits",
        value: data.overview.totalCredits,
        subtitle: "Completed",
        color: "success",
      },

      {
        icon: ClipboardList,
        title: "Registered Courses",
        value: data.overview.registeredCourses,
        subtitle: data.overview.currentSemester?.name ?? "-",
        color: "warning",
      },

      {
        icon: CalendarDays,
        title: "Current Session",
        value: data.overview.currentSession?.name ?? "-",
        compact: true,
        color: "info",
      },

      {
        icon: School,
        title: "Current Semester",
        value: data.overview.currentSemester?.name ?? "-",
        compact: true,
        color: "secondary",
      },
    ],

    recentResults: data.recentResults.map((result) => ({
      code: result.course.code,
      course: result.course.title,
      score: result.score,
      grade: result.grade,
    })),

    currentCourses: data.currentCourses,

    activities: data.activities,
  };
};

export const getStudentDashboard = async () => {
  const response = await api.get("/dashboard/student");

  const mapped = mapStudentDashboard(response.data);

  return mapped;
};

export const getAdminDashboard = async () => {
  const response = await api.get("/dashboard/admin");

  return response.data;
};

export default {
  getStudentDashboard,
  getAdminDashboard,
};
