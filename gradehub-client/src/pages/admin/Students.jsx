import PageHeader from "../../components/common/PageHeader";
import StudentStats from "../../components/admin/students/StudentStats";
import { useState, useEffect } from "react";
import StudentToolbar from "../../components/admin/students/StudentToolbar";
import StudentsTable from "../../components/admin/students/StudentsTable";
import { students } from "../../constants/admin/students";

function Students() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedRows, setSelectedRows] = useState([]);

  const pageSize = 8;

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.matricNumber.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment = !department || student.department === department;

    const matchesLevel = !level || student.level === level;

    const matchesStatus = !status || student.status === status;

    return matchesSearch && matchesDepartment && matchesLevel && matchesStatus;
  });

  const sortedStudents = [...filteredStudents];

  if (sortKey) {
    sortedStudents.sort((a, b) => {
      const first = String(a[sortKey]).toLowerCase();
      const second = String(b[sortKey]).toLowerCase();

      if (first < second) return sortDirection === "asc" ? -1 : 1;

      if (first > second) return sortDirection === "asc" ? 1 : -1;

      return 0;
    });
  }

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === sortedStudents.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sortedStudents.map((s) => s.id));
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, department, level, status]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Students"
        subtitle="Manage student records and academic information."
      />

      <StudentStats />

      <StudentToolbar
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        level={level}
        setLevel={setLevel}
        status={status}
        setStatus={setStatus}
      />

      <StudentsTable
        students={sortedStudents}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </div>
  );
}

export default Students;
