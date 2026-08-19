import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import DepartmentProfileCard from "../../components/admin/departmentDetails/DepartmentProfileCard";
import DepartmentQuickStats from "../../components/admin/departmentDetails/DepartmentQuickStats";
import DepartmentInformationCard from "../../components/admin/departmentDetails/DepartmentInformationCard";
import DepartmentLecturersTable from "../../components/admin/departmentDetails/DepartmentLecturersTable";

import departmentService from "../../services/admin/departmentService";
import ProfileCardSkeleton from "../../components/ui/skeletons/ProfileCardSkeleton";
import StatCardSkeleton from "../../components/ui/skeletons/StatCardSskeleton";

function DepartmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      try {
        const response = await departmentService.getDepartmentById(id);
        const data = response.data || response;

        // Inside DepartmentDetails.jsx
        setDepartment({
          id: data.id,
          name: data.name,
          code: data.code,
          faculty: data.faculty_name || data.faculty?.name || "N/A",
          hod: data.hod || "Not Assigned",
          status: data.isactive || data.isActive ? "Active" : "Inactive",
          office: data.description || "N/A",
          email: data.email || "N/A",
          phone: data.phone || "N/A",
          students: data.student_count ?? data.students ?? 0,
          courses: data.course_count ?? data.courses ?? 0,
          lecturers: data.lecturer_count ?? data.lecturers ?? 0,
          lecturersList: data.lecturersList || [], // Store the real lecturers array here
        });
      } catch (error) {
        console.error("Failed to fetch department details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDepartmentDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <PageHeader
          title="Department Details"
          subtitle="View complete department information."
        />
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button
            variant="secondary"
            disabled
            className="w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={18} className="mr-1.5" />
            Back to Departments
          </Button>
          <Button disabled className="w-full sm:w-auto justify-center">
            Edit Department
          </Button>
        </div>

        <ProfileCardSkeleton />

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={`stat-${i}`} />
          ))}
        </div>

        <div className="h-64 w-full animate-pulse rounded-2xl bg-slate-200"></div>
      </div>
    );
  }

  if (!department && !loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Department Details"
          subtitle="Department not found."
        />

        <Button
          variant="secondary"
          onClick={() => navigate("/admin/departments")}
          className="w-full sm:w-auto justify-center"
        >
          <ArrowLeft size={18} className="mr-1.5" />
          Back to Departments
        </Button>
      </div>
    );
  }

  // Replace `const lecturers = [];` with:
  const lecturers = (department.lecturersList || []).map((l) => ({
    id: l.id,
    staffId: l.staffid || l.staffId || "N/A",
    fullName: `${l.firstname || ""} ${l.lastname || ""}`.trim() || "Unknown",
    rank: l.rank || "Lecturer",
    email: l.email || "N/A",
    status: l.isactive || l.isActive ? "Active" : "Inactive",
  }));

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Department Details"
        subtitle="View complete department information."
      />

      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <Button
          variant="secondary"
          onClick={() => navigate("/admin/departments")}
          className="w-full sm:w-auto justify-center"
        >
          <ArrowLeft size={18} className="mr-1.5" />
          Back to Departments
        </Button>

        <Button
          onClick={() => navigate(`/admin/departments/${department.id}/edit`)}
          className="w-full sm:w-auto justify-center"
        >
          <Edit size={16} className="mr-1.5" />
          Edit Department
        </Button>
      </div>

      <DepartmentProfileCard department={department} />

      <DepartmentQuickStats department={department} />

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-[380px_1fr]">
        <DepartmentInformationCard department={department} />

        <Card className="p-4 sm:p-6 overflow-hidden">
          <h3 className="mb-4 sm:mb-6 text-lg font-semibold text-slate-900">
            Department Lecturers
          </h3>
          <DepartmentLecturersTable lecturers={lecturers} />
        </Card>
      </div>
    </div>
  );
}

export default DepartmentDetails;
