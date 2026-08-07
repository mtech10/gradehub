import { useState, useEffect } from "react";
import PageHeader from "../../components/common/PageHeader";
import DashboardStats from "../../components/admin/dashboard/DashboardStats";
import DashboardQuickActions from "../../components/admin/dashboard/DashboardQuickActions";
import RecentStudentsTable from "../../components/admin/dashboard/RecentStudentsTable";
import PendingResultsTable from "../../components/admin/dashboard/PendingResultsTable";
import DepartmentOverview from "../../components/admin/dashboard/DepartmentOverview";
import UpcomingActivities from "../../components/admin/dashboard/UpcomingActivities";
import { Users, BookOpen, FileText, GraduationCap } from "lucide-react";
import { dashboardQuickActions } from "../../constants/admin/dashboardData";
import { dashboardService } from "../../services/admin//dashboardService";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await dashboardService.getAdminDashboard();

        // 1. Map Overview to Stat Cards
        const mappedStats = [
          {
            id: 1,
            title: "Total Students",
            value: data.overview.students.toString(),
            subtitle: "Active accounts",
            icon: Users,
            color: "blue",
          },
          {
            id: 2,
            title: "Active Courses",
            value: data.overview.courses.toString(),
            subtitle: "System wide",
            icon: BookOpen,
            color: "purple",
          },
          {
            id: 3,
            title: "Pending Results",
            value: data.overview.pendingResults.toString(),
            subtitle: "Requires approval",
            icon: FileText,
            color: "amber",
          },
          {
            id: 4,
            title: "Total Departments",
            value: data.overview.departments.toString(),
            subtitle: `Across ${data.overview.faculties} faculties`,
            icon: GraduationCap,
            color: "green",
          },
        ];

        // 2. Map Recent Students
        const mappedStudents = (data.recentStudents || []).map((student) => ({
          id: student.id,
          matricNumber: student.matricNumber,
          fullName: `${student.firstName} ${student.lastName}`,
          status: "Active",
        }));

        // 3. Map Recent Results to Pending Results Table format (FIXED)
        const mappedResults = (data.recentResults || []).map((result) => ({
          id: result.id,
          courseCode: result.course?.code || "-",
          courseTitle: result.course?.title || "-",
          department: result.student?.department?.name || "-",
          level: result.student?.level?.name || "-",
          status: "Awaiting Approval",
        }));

        // 4. Map Department Statistics
        const mappedDepartments = (data.departmentStatistics || []).map(
          (dep) => ({
            id: dep.id,
            name: dep.name,
            students: dep.students,
            // Generating safe defaults for the UI bars since these aren't in the DB query yet
            completion: Math.min(
              100,
              Math.max(
                10,
                Math.round((dep.students / data.overview.students) * 100) || 0,
              ),
            ),
            courses: "-",
            lecturers: "-",
          }),
        );

        setDashboardData({
          stats: mappedStats,
          quickActions: dashboardQuickActions, // Using local constants for static UI links
          recentStudents: mappedStudents,
          pendingResults: mappedResults,
          departments: mappedDepartments,
          activities: [], // Empty array prevents crashes; admin DB service doesn't return activities
        });
      } catch (error) {
        console.error("Failed to fetch admin dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500">
        Loading Dashboard...
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <>
      <DashboardStats stats={dashboardData.stats} />
      <DashboardQuickActions actions={dashboardData.quickActions} />
      <RecentStudentsTable students={dashboardData.recentStudents} />
      <PendingResultsTable results={dashboardData.pendingResults} />
      <DepartmentOverview departments={dashboardData.departments} />
      {dashboardData.activities.length > 0 && (
        <UpcomingActivities activities={dashboardData.activities} />
      )}
    </>
  );
}

export default Dashboard;
