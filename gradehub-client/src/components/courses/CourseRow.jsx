// import { MoreHorizontal, User } from "lucide-react";
// import Badge from "../ui/Badge";
// import {
//   getSemesterBadge,
//   getCourseStatusBadge,
// } from "../../utils/courseUtils";

// function CourseRow({ course }) {
//   const semesterBadge = getSemesterBadge(course.semester);
//   const statusVariant = getCourseStatusBadge(course.status);

//   return (
//     <div className="flex flex-col gap-4 border-b border-slate-100 p-5 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between last:border-0">
//       {/* Left Section: Code & Title */}
//       <div className="flex items-start sm:items-center gap-4 flex-1">
//         <div className="w-24 shrink-0">
//           <Badge
//             variant="secondary"
//             className="w-full py-2 justify-center text-sm"
//           >
//             {course.code}
//           </Badge>
//         </div>

//         <div>
//           <h4 className="font-semibold text-slate-900">{course.title}</h4>
//           <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
//             <User size={14} />
//             <span>{course.lecturer}</span>
//           </div>
//         </div>
//       </div>

//       {/* Right Section: Metadata & Actions */}
//       <div className="flex items-center gap-4 sm:gap-8">
//         <div className="text-sm font-medium text-slate-700 w-16 text-center">
//           {course.units} {course.units === 1 ? "Unit" : "Units"}
//         </div>

//         <div className="hidden md:block">
//           <Badge variant={semesterBadge.variant}>{semesterBadge.label}</Badge>
//         </div>

//         <div className="w-24 text-right sm:text-center">
//           <Badge variant={statusVariant} className="capitalize">
//             {course.status}
//           </Badge>
//         </div>

//         <button
//           type="button"
//           className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
//           aria-label="More options"
//         >
//           <MoreHorizontal size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CourseRow;

import { MoreHorizontal, User } from "lucide-react";

import Badge from "../ui/Badge";

import {
  getSemesterBadge,
  getCourseStatusBadge,
} from "../../utils/courseUtils";

function CourseRow({ course }) {
  const semesterBadge = getSemesterBadge(course.semester);

  const statusVariant = getCourseStatusBadge(course.status);

  const displayStatus =
    course.status === "current"
      ? "Current"
      : course.status === "completed"
        ? "Completed"
        : course.status === "failed"
          ? "Failed"
          : course.status;

  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-4 last:border-b-0 sm:px-6">
      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600">
          {course.code}
        </div>

        <div className="min-w-0">
          <h4 className="truncate font-semibold text-slate-900">
            {course.title}
          </h4>

          <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
            <User size={14} />

            <span>{course.lecturer || "Department Faculty"}</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex shrink-0 items-center gap-4 sm:gap-8">
        <div className="w-16 text-center text-sm font-medium text-slate-700">
          {course.units} {course.units === 1 ? "Unit" : "Units"}
        </div>

        <div className="hidden md:block">
          <Badge variant={semesterBadge.variant}>{semesterBadge.label}</Badge>
        </div>

        <div className="w-24 text-center">
          <Badge variant={statusVariant} className="capitalize">
            {displayStatus}
          </Badge>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
          aria-label={`More options for ${course.code}`}
        >
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}

export default CourseRow;
