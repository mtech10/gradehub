import { useNavigate } from "react-router-dom";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";
import DataTable from "../../ui/DataTable";
import { recentStudentsColumns } from "../../../constants/tables/recentStudentsColumns";
import React from "react";

function RecentStudentsTable({ students = [] }) {
  const navigate = useNavigate();

  const renderCell = (student, column) => {
    switch (column.key) {
      case "matricNumber":
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/students/${student.id}`);
            }}
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            {student.matricNumber}
          </button>
        );
      case "fullName":
        return (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/admin/students/${student.id}`);
            }}
            className="font-semibold text-slate-900 hover:text-blue-600 transition-colors"
          >
            {student.fullName}
          </button>
        );
      case "status":
        return (
          <Badge variant={student.status === "Active" ? "success" : "warning"}>
            {student.status}
          </Badge>
        );
      default:
        return student[column.key];
    }
  };

  return (
    <div className="pt-0 lg:pt-5">
      <Card padding="none">
        {/* Responsive Header */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 px-4 py-4 sm:px-6 sm:py-5">
          <div>
            <h3 className="text-lg font-semibold">Recent Students</h3>
            <p className="text-sm text-slate-500">Latest registered students</p>
          </div>
          <Button
            size="sm"
            onClick={() => navigate("/admin/students")}
            className="w-full sm:w-auto"
          >
            View All
          </Button>
        </div>

        <DataTable
          columns={recentStudentsColumns}
          data={students}
          renderCell={renderCell}
          onRowClick={(student) => navigate(`/admin/students/${student.id}`)}
          totalItems={students.length}
        />
      </Card>
    </div>
  );
}

export default RecentStudentsTable;
