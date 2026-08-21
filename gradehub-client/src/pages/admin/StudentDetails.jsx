import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Edit } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import StudentQuickStats from "../../components/admin/studentDetails/StudentQuickStats";
import StudentInfoCard from "../../components/admin/studentDetails/StudentInfoCard";
import StudentAcademicSummary from "../../components/admin/studentDetails/StudentAcademicSummary";
import StudentProfileCard from "../../components/admin/studentDetails/StudentProfileCard";
import StudentResultsTable from "../../components/admin/studentDetails/StudentResultsTable";

import { studentService } from "../../services/admin/studentService";
import ProfileCardSkeleton from "../../components/ui/skeletons/ProfileCardSkeleton";
import StatCardSkeleton from "../../components/ui/skeletons/StatCardSskeleton";

function StudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchStudentDetails = async () => {
      setLoading(true);
      try {
        const response = await studentService.getStudentById(id);
        const rawData = response.data || response;

        const normalizedStudent = {
          ...rawData,
          fullName:
            rawData.fullName ||
            `${rawData.firstName || rawData.firstname || ""} ${rawData.lastName || rawData.lastname || ""}`.trim() ||
            "Unknown Student",

          matricNumber: rawData.matricNumber || rawData.matricnumber || "N/A",
          admissionYear:
            rawData.admissionYear || rawData.admission_year || "N/A",
          department: rawData.department || rawData.department_name || "N/A",
          level: rawData.level || rawData.level_name || "N/A",
          session: rawData.session || rawData.session_name || "N/A",
          status: rawData.status || "Active",
        };

        setStudent(normalizedStudent);
      } catch (error) {
        console.error("Failed to fetch student details:", error);
        setStudent(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudentDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 sm:space-y-8">
        <PageHeader
          title="Student Details"
          subtitle="View academic profile and records."
        />
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <Button
            variant="secondary"
            disabled
            className="w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={18} className="mr-1.5" />
            Back to Students
          </Button>
          <Button disabled className="w-full sm:w-auto justify-center">
            Edit Student
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

  if (!student) {
    return (
      <div className="space-y-6">
        <PageHeader title="Student Details" subtitle="Student not found." />

        <Button
          variant="secondary"
          onClick={() => navigate("/admin/students")}
          className="w-full sm:w-auto justify-center"
        >
          <ArrowLeft size={18} className="mr-1.5" />
          Back to Students
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Student Details"
        subtitle="View academic profile and records."
      />

      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <Button
          variant="secondary"
          onClick={() => navigate("/admin/students")}
          className="w-full sm:w-auto justify-center"
        >
          <ArrowLeft size={18} className="mr-1.5" />
          Back to Students
        </Button>

        <Button
          onClick={() => navigate(`/admin/students/${student.id}/edit`)}
          className="w-full sm:w-auto justify-center"
        >
          <Edit size={16} className="mr-1.5" />
          Edit Student
        </Button>
      </div>

      <StudentProfileCard student={student} />

      <StudentQuickStats student={student} />

      {}
      <div className="flex gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar">
        {["overview", "academic-records", "transcript", "attendance"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-4 sm:px-5 py-3 text-sm font-medium transition whitespace-nowrap ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ),
        )}
      </div>

      {activeTab === "overview" && (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <StudentInfoCard student={student} />
          <StudentAcademicSummary student={student} />
        </div>
      )}

      {activeTab === "academic-records" && (
        <div className="overflow-hidden">
          <StudentResultsTable results={student.results || []} />
        </div>
      )}

      {activeTab === "transcript" && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 sm:py-20 text-center text-sm sm:text-base text-slate-500 px-4">
          Transcript module coming next.
        </div>
      )}

      {activeTab === "attendance" && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 sm:py-20 text-center text-sm sm:text-base text-slate-500 px-4">
          Attendance module coming next.
        </div>
      )}
    </div>
  );
}

export default StudentDetails;
