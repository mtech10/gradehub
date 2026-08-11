// import Badge from "../ui/Badge";
// import DataTable from "../ui/DataTable";

// import { transcriptColumns } from "../../constants/tables/transcriptColumns";
// import { getResultStatus } from "../../utils/resultUtils";

// function TranscriptTable({ results }) {
//   const renderCell = (course, column) => {
//     const status = getResultStatus(course.score);

//     switch (column.key) {
//       case "code":
//         return (
//           <span className="font-semibold text-slate-900">{course.code}</span>
//         );

//       case "title":
//         return course.title;

//       case "units":
//         return course.units;

//       case "score":
//         return `${course.score}%`;

//       case "grade":
//         return <Badge variant={status.variant}>{status.grade}</Badge>;

//       case "gradePoint":
//         return status.gradePoint.toFixed(2);

//       default:
//         return course[column.key];
//     }
//   };

//   return (
//     <DataTable
//       columns={transcriptColumns}
//       data={results}
//       renderCell={renderCell}
//       emptyMessage="No transcript available for this semester."
//     />
//   );
// }

// export default TranscriptTable;

import Badge from "../ui/Badge";
import DataTable from "../ui/DataTable";
import { transcriptColumns } from "../../constants/tables/transcriptColumns";

function TranscriptTable({ results }) {
  const renderCell = (course, column) => {
    switch (column.key) {
      case "code":
        return (
          <span className="font-semibold text-slate-900">{course.code}</span>
        );

      case "title":
        return course.title;

      case "units":
      case "unit":
        return course.units || course.unit || 0;

      case "score":
        return course.score !== null && course.score !== undefined
          ? `${course.score}%`
          : "-";

      case "grade": {
        const grade = course.grade || "-";
        let variant = "neutral";
        if (grade === "A" || grade === "B") variant = "success";
        else if (grade === "C" || grade === "D" || grade === "E")
          variant = "warning";
        else if (grade === "F") variant = "danger";

        return <Badge variant={variant}>{grade}</Badge>;
      }

      case "gradePoint":
        return course.gradePoint !== null && course.gradePoint !== undefined
          ? Number(course.gradePoint).toFixed(2)
          : "0.00";

      default:
        return course[column.key] ?? "-";
    }
  };

  return (
    <DataTable
      columns={transcriptColumns}
      data={results}
      renderCell={renderCell}
      emptyMessage="No transcript records available for this semester."
    />
  );
}

export default TranscriptTable;
