import { useState, useEffect } from "react";

import PageHeader from "../../components/common/PageHeader";

import CourseStats from "../../components/admin/courses/CourseStats";
import CourseToolbar from "../../components/admin/courses/CourseToolbar";
import CoursesTable from "../../components/admin/courses/CoursesTable";

import BulkActionBar from "../../components/admin/common/BulkActionBar";

import { courses } from "../../constants/admin/courses";

function AllCourses() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const [selectedRows, setSelectedRows] = useState([]);

  const pageSize = 8;

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.title.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment = !department || course.department === department;

    const matchesLevel = !level || course.level === level;

    const matchesStatus = !status || course.status === status;

    return matchesSearch && matchesDepartment && matchesLevel && matchesStatus;
  });

  const sortedCourses = [...filteredCourses];

  if (sortKey) {
    sortedCourses.sort((a, b) => {
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

  const handleSelectAll = (pageIds) => {
    const allSelected = pageIds.every((id) => selectedRows.includes(id));

    if (allSelected) {
      setSelectedRows((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedRows((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  const clearSelection = () => {
    setSelectedRows([]);
  };

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [search, department, level, status]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Courses"
        subtitle="Manage courses across all departments."
      />

      <CourseStats />

      <CourseToolbar
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        level={level}
        setLevel={setLevel}
        status={status}
        setStatus={setStatus}
      />

      {selectedRows.length > 0 && (
        <BulkActionBar
          count={selectedRows.length}
          itemLabel="courses"
          onClearSelection={clearSelection}
          onExport={() => console.log("Export")}
          onSuspend={() => console.log("Archive")}
          onDelete={() => console.log("Delete")}
        />
      )}

      <CoursesTable
        courses={sortedCourses}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
        selectable
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
      />
    </div>
  );
}

export default AllCourses;
