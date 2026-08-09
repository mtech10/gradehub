// import { useNavigate } from "react-router-dom";

// import Badge from "../../ui/Badge";
// import DataTable from "../../ui/DataTable";

// function CourseStudentsTable({ students }) {
//   const navigate = useNavigate();

//   const columns = [
//     {
//       key: "matricNumber",
//       title: "Matric No",
//       sortable: true,
//       render: (registration) => (
//         <button
//           onClick={() => navigate(`/admin/students/${registration.student.id}`)}
//           className="font-medium text-blue-600 hover:underline"
//         >
//           {registration.student.matricNumber}
//         </button>
//       ),
//     },

//     {
//       key: "student",
//       title: "Student",
//       sortable: true,
//       render: (registration) => {
//         const { student } = registration;

//         const fullName = [student.firstName, student.lastName]
//           .filter(Boolean)
//           .join(" ");

//         return (
//           <button
//             onClick={() => navigate(`/admin/students/${student.id}`)}
//             className="text-left"
//           >
//             <p className="font-semibold text-slate-900 hover:text-blue-600">
//               {fullName}
//             </p>
//           </button>
//         );
//       },
//     },

//     {
//       key: "session",
//       title: "Session",
//       sortable: true,
//       render: (registration) => registration.session?.name || "—",
//     },

//     {
//       key: "semester",
//       title: "Semester",
//       sortable: true,
//       render: (registration) => registration.semester?.name || "—",
//     },

//     {
//       key: "registeredAt",
//       title: "Registered",
//       sortable: true,
//       render: (registration) =>
//         registration.registeredAt
//           ? new Date(registration.registeredAt).toLocaleDateString()
//           : "—",
//     },

//     {
//       key: "status",
//       title: "Status",
//       render: (registration) => (
//         <Badge variant={registration.isActive ? "green" : "amber"}>
//           {registration.isActive ? "Active" : "Inactive"}
//         </Badge>
//       ),
//     },
//   ];

//   return <DataTable columns={columns} data={students} />;
// }

// export default CourseStudentsTable;

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
      render: (registration) => (
        <button
          onClick={() => navigate(`/admin/students/${registration.student.id}`)}
          className="font-medium text-blue-600 hover:underline"
        >
          {registration.student.matricNumber}
        </button>
      ),
    },

    {
      key: "student",
      title: "Student",
      sortable: true,
      render: (registration) => {
        const { student } = registration;

        const fullName = [student.firstName, student.lastName]
          .filter(Boolean)
          .join(" ");

        return (
          <button
            onClick={() => navigate(`/admin/students/${student.id}`)}
            className="text-left"
          >
            <p className="font-semibold text-slate-900 hover:text-blue-600">
              {fullName}
            </p>
          </button>
        );
      },
    },

    {
      key: "session",
      title: "Session",
      sortable: true,
      render: (registration) => registration.session?.name || "—",
    },

    {
      key: "semester",
      title: "Semester",
      sortable: true,
      render: (registration) => registration.semester?.name || "—",
    },

    {
      key: "registeredAt",
      title: "Registered",
      sortable: true,
      render: (registration) => {
        if (!registration.registeredAt) return "—";

        return new Date(registration.registeredAt).toLocaleDateString();
      },
    },

    {
      key: "status",
      title: "Status",
      render: (registration) => (
        <Badge variant={registration.isActive ? "green" : "amber"}>
          {registration.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={students}
      emptyMessage="No students are registered for this course."
      pagination={false}
    />
  );
}

export default CourseStudentsTable;
