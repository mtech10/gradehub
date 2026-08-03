import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import DepartmentProfileCard from "../../components/admin/departmentDetails/DepartmentProfileCard";
import DepartmentQuickStats from "../../components/admin/departmentDetails/DepartmentQuickStats";
import DepartmentInformationCard from "../../components/admin/departmentDetails/DepartmentInformationCard";
import DepartmentLecturersTable from "../../components/admin/departmentDetails/DepartmentLecturersTable";

import { departments } from "../../constants/admin/departments";
import { students } from "../../constants/admin/students";

function DepartmentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const department = useMemo(() => {
    return departments.find((department) => String(department.id) === id);
  }, [id]);

  if (!department) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Department Details"
          subtitle="Department not found."
        />

        <Button
          variant="secondary"
          onClick={() => navigate("/admin/departments")}
        >
          <ArrowLeft size={18} />
          Back to Departments
        </Button>
      </div>
    );
  }

  // Temporary lecturer data until a Lecturer module is created.
  const lecturers = students
    .filter(
      (student) =>
        student.department === department.name ||
        student.department === department.code,
    )
    .slice(0, 6)
    .map((student, index) => ({
      id: student.id,
      staffId: `STF${String(index + 1).padStart(3, "0")}`,
      fullName: student.fullName,
      rank: "Senior Lecturer",
      email: student.email,
      status: "Active",
    }));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Department Details"
        subtitle="View complete department information."
      />

      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={() => navigate("/admin/departments")}
        >
          <ArrowLeft size={18} />
          Back to Department
        </Button>

        <Button
          onClick={() => navigate(`/admin/departments/${department.id}/edit`)}
        >
          Edit Department
        </Button>
      </div>

      <DepartmentProfileCard department={department} />

      <DepartmentQuickStats department={department} />

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <DepartmentInformationCard department={department} />

        <Card className="p-6">
          <h3 className="mb-6 text-lg font-semibold">Department Lecturers</h3>

          <DepartmentLecturersTable lecturers={lecturers} />
        </Card>
      </div>
    </div>
  );
}

export default DepartmentDetails;
