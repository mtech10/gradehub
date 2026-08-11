import { Calendar } from "lucide-react";
import Accordion from "../ui/Accordion";
import Badge from "../ui/Badge";
import CourseRow from "./CourseRow";
import { THEME } from "../../constants/theme";

function CourseAccordion({ data }) {
  const isCurrent = data.status === "Current";

  const headerAction = (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-slate-600 hidden sm:block">
        Credit Load: {data.creditLoad}
      </span>
      {isCurrent && (
        <button
          className={`${THEME.linkButton.base} ${THEME.linkButton.primary} hidden sm:flex items-center gap-2`}
        >
          <Calendar size={16} />
          View Timetable
        </button>
      )}
    </div>
  );

  return (
    <Accordion
      title={
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-slate-900">{data.title}</span>
          <Badge variant={isCurrent ? "primary" : "success"} size="sm">
            {data.status}
          </Badge>
        </div>
      }
      defaultOpen={isCurrent}
      headerAction={headerAction}
    >
      <div className="flex flex-col">
        {data.courses.length > 0 ? (
          data.courses.map((course, index) => (
            <CourseRow key={`${course.code}-${index}`} course={course} />
          ))
        ) : (
          <div className="py-8 text-center text-slate-500">
            No course records available for this semester.
          </div>
        )}
      </div>
    </Accordion>
  );
}

export default CourseAccordion;
