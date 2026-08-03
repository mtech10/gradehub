import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";

import StudentQuickStats from "../../components/admin/studentDetails/StudentQuickStats";
import StudentInfoCard from "../../components/admin/studentDetails/StudentInfoCard";
import StudentAcademicSummary from "../../components/admin/studentDetails/StudentAcademicSummary";

import { students } from "../../constants/admin/students";
import StudentProfileCard from "../../components/admin/studentDetails/StudentProfileCard";
import StudentResultsTable from "../../components/admin/studentDetails/StudentResultsTable";
import { results } from "../../constants/admin/results";
import { transcripts } from "../../constants/admin/transcripts";

function StudentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("overview");

  const student = useMemo(() => {
    return students.find((s) => String(s.id) === id);
  }, [id]);

  if (!student) {
    return (
      <div className="space-y-6">
        <PageHeader title="Student Details" subtitle="Student not found." />

        <Button variant="secondary" onClick={() => navigate("/admin/students")}>
          <ArrowLeft size={18} />
          Back to Students
        </Button>
      </div>
    );
  }

  const studentResults = results.filter(
    (result) => result.studentId === student.id,
  );

  const studentTranscript = transcripts.find(
    (transcript) => transcript.studentId === student.id,
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Student Details"
        subtitle="View academic profile and records."
      />

      <div className="flex justify-between">
        <Button variant="secondary" onClick={() => navigate("/admin/students")}>
          <ArrowLeft size={18} />
          Back to Students
        </Button>

        <Button onClick={() => navigate(`/admin/students/${student.id}/edit`)}>
          Edit Student
        </Button>
      </div>

      <StudentProfileCard student={student} />

      <StudentQuickStats student={student} />

      {/* Tabs */}

      <div className="flex gap-2 border-b border-slate-200">
        {["overview", "academic-records", "transcript", "attendance"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-5 py-3 text-sm font-medium transition ${
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
        <div className="grid gap-4 xl:grid-cols-2">
          <StudentInfoCard student={student} />

          <StudentAcademicSummary student={student} />
        </div>
      )}

      {activeTab === "academic-records" && (
        <StudentResultsTable results={studentResults} />
      )}

      {activeTab === "transcript" && (
        <StudentTranscript transcript={studentTranscript} />
      )}

      {activeTab === "attendance" && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-20 text-center text-slate-500">
          Attendance module coming next.
        </div>
      )}
    </div>
  );
}

export default StudentDetails;
