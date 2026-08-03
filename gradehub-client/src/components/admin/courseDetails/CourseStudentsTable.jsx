import { useNavigate } from "react-router-dom";
import Badge from "../../ui/Badge";
import DataTable from "../../ui/DataTable";

function CourseStudentsTable({ students }) {
  const navigate = useNavigate();

  const columns = [
    {
      key: "matricNumber",
      title: "Matric No",
      sortable: true,
      render: (student) => (
        <button
          onClick={() => navigate(`/admin/students/${student.id}`)}
          className="font-medium text-blue-600 hover:underline"
        >
          {student.matricNumber}
        </button>
      ),
    },
    {
      key: "fullName",
      title: "Student",
      sortable: true,
      render: (student) => (
        <div>
          <button
            onClick={() => navigate(`/admin/students/${student.id}`)}
            className="font-semibold text-slate-900 hover:text-blue-600"
          >
            {student.fullName}
          </button>

          <p className="text-sm text-slate-500">{student.email}</p>
        </div>
      ),
    },
    {
      key: "level",
      title: "Level",
      sortable: true,
      render: (student) => `${student.level} Level`,
    },
    {
      key: "status",
      title: "Status",
      render: (student) => (
        <Badge variant={student.status === "Active" ? "green" : "amber"}>
          {student.status}
        </Badge>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={students}
      searchable
      selectable={false}
      pagination
      pageSize={6}
    />
  );
}

export default CourseStudentsTable;
