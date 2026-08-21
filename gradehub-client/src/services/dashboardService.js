





















































































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
      id: result.id,
      code: result.code,
      course: result.course,
      unit: Number(result.unit),
      score: Number(result.score),
      grade: result.grade,
      status: result.status || "Approved",
    })),

    currentCourses: data.currentCourses.map((course) => ({
      id: course.id,
      code: course.code,
      title: course.title,
      units: Number(course.creditUnit || 0),
      creditUnit: Number(course.creditUnit || 0),
      progress: course.progress || 80,
    })),
    activities: data.activities,
  };
};

export const getStudentDashboard = async () => {
  const response = await api.get("/dashboard/student");

  const mapped = mapStudentDashboard(response.data.data || response.data);

  return mapped;
};

export const getAdminDashboard = async () => {
  const response = await api.get("/dashboard/admin");

  return response.data.data || response.data;
};

export default {
  getStudentDashboard,
  getAdminDashboard,
};
