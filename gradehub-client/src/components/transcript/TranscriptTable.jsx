import Badge from "../ui/Badge";
import DataTable from "../ui/DataTable";

import { transcriptColumns } from "../../constants/tables/transcriptColumns";
import { getResultStatus } from "../../utils/resultUtils";

function TranscriptTable({ results }) {
  const renderCell = (course, column) => {
    const status = getResultStatus(course.score);

    switch (column.key) {
      case "code":
        return (
          <span className="font-semibold text-slate-900">{course.code}</span>
        );

      case "title":
        return course.title;

      case "units":
        return course.units;

      case "score":
        return `${course.score}%`;

      case "grade":
        return <Badge variant={status.variant}>{status.grade}</Badge>;

      case "gradePoint":
        return status.gradePoint.toFixed(2);

      default:
        return course[column.key];
    }
  };

  return (
    <DataTable
      columns={transcriptColumns}
      data={results}
      renderCell={renderCell}
      emptyMessage="No transcript available for this semester."
    />
  );
}

export default TranscriptTable;
