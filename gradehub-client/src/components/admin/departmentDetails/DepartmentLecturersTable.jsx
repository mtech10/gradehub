import { useNavigate } from "react-router-dom";

import DataTable from "../../ui/DataTable";
import Badge from "../../ui/Badge";

function DepartmentLecturersTable({ lecturers }) {
  const navigate = useNavigate();

  const columns = [
    {
      key: "staffId",
      title: "Staff ID",
    },
    {
      key: "fullName",
      title: "Lecturer",
    },
    {
      key: "rank",
      title: "Rank",
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "status",
      title: "Status",
      align: "center",
    },
  ];

  const renderCell = (lecturer, column) => {
    switch (column.key) {
      case "status":
        return (
          <Badge variant={lecturer.status === "Active" ? "green" : "red"}>
            {lecturer.status}
          </Badge>
        );

      default:
        return lecturer[column.key];
    }
  };

  return (
    <DataTable
      columns={columns}
      data={lecturers}
      renderCell={renderCell}
      pagination
      pageSize={6}
      totalItems={lecturers.length}
      currentPage={1}
      totalPages={1}
      onPageChange={() => {}}
      selectable={false}
      onRowClick={(lecturer) => navigate(`/admin/lecturers/${lecturer.id}`)}
    />
  );
}

export default DepartmentLecturersTable;
