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
import { dashboardService } from "../../services/admin/dashboardService";
import StatCardSkeleton from "../../components/ui/skeletons/StatCardSskeleton";
import QuickActionCardSkeleton from "../../components/ui/skeletons/QuickActionCardSkeleton";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await dashboardService.getAdminDashboard();

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

        const mappedStudents = (data.recentStudents || []).map((student) => ({
          id: student.id,
          matricNumber: student.matricNumber,
          fullName: `${student.firstName} ${student.lastName}`,
          status: "Active",
        }));

        const mappedResults = (data.recentResults || []).map((result) => ({
          id: result.id,
          courseCode: result.course?.code || "-",
          courseTitle: result.course?.title || "-",
          department: result.student?.department?.name || "-",
          level: result.student?.level?.name || "-",
          status: "Awaiting Approval",
        }));

        const mappedDepartments = (data.departmentStatistics || []).map(
          (dep) => ({
            id: dep.id,
            name: dep.name,
            students: dep.students,
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
          quickActions: dashboardQuickActions,
          recentStudents: mappedStudents,
          pendingResults: mappedResults,
          departments: mappedDepartments,
          activities: [],
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
      <div className="space-y-8">
        <PageHeader title="Dashboard" subtitle="Overview and summaries." />

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={`stat-skeleton-${i}`} />
          ))}
        </div>

        <section className="space-y-4 pt-4">
          <div>
            <div className="mb-2 h-6 w-40 animate-pulse rounded bg-slate-200"></div>
            <div className="h-4 w-64 animate-pulse rounded bg-slate-200"></div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <QuickActionCardSkeleton key={`action-skeleton-${i}`} />
            ))}
          </div>
        </section>

        {/* Responsive Skeleton Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="h-64 w-full animate-pulse rounded-2xl bg-slate-200"></div>
            <div className="h-64 w-full animate-pulse rounded-2xl bg-slate-200"></div>
          </div>
          <div className="space-y-8">
            <div className="h-96 w-full animate-pulse rounded-2xl bg-slate-200"></div>
          </div>
        </div>
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
    <div className="space-y-8">
      <PageHeader title="Dashboard" subtitle="Overview and summaries." />
      <DashboardStats stats={dashboardData.stats} />
      <DashboardQuickActions actions={dashboardData.quickActions} />

      {/* Main Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Takes up 2/3 of space on desktop) */}
        <div className="lg:col-span-2 space-y-8">
          <RecentStudentsTable students={dashboardData.recentStudents} />
          <PendingResultsTable results={dashboardData.pendingResults} />
        </div>

        {/* Right Column (Takes up 1/3 of space on desktop) */}
        <div className="space-y-8">
          <DepartmentOverview departments={dashboardData.departments} />
          {dashboardData.activities.length > 0 && (
            <UpcomingActivities activities={dashboardData.activities} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
