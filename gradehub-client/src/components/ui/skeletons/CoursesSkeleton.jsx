import CourseHeader from "../../courses/CourseHeader";
import StatCardSkeleton from "./StatCardSskeleton";
import QuickLinks from "../../courses/QuickLinks";
import CourseStatistics from "../../courses/CourseStatistics";
import HelpCard from "../../courses/HelpCard";
import Card from "../Card";

function CoursesSkeleton() {
  
  const skeletonLinks = [
    {
      title: "...",
      description: "...",
      icon: () => null,
      iconColor: "bg-slate-100",
    },
    {
      title: "...",
      description: "...",
      icon: () => null,
      iconColor: "bg-slate-100",
    },
  ];

  
  const skeletonStatistics = {
    "this-session": {
      total: 0,
      chart: [
        { name: "Passed", value: 0, color: "#E2E8F0" },
        { name: "Ongoing", value: 0, color: "#E2E8F0" },
      ],
      list: [],
    },
  };

  return (
    <div className="space-y-8 animate-pulse">
      <CourseHeader />

      {}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="h-10 w-96 rounded-lg bg-slate-200"></div>
        <div className="h-11 w-72 rounded-xl bg-slate-200"></div>
      </div>

      {}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <StatCardSkeleton key={`course-stat-skeleton-${i}`} />
        ))}
      </section>

      {}
      <section className="grid gap-8 xl:grid-cols-12">
        {}
        <div className="xl:col-span-8 space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={`accordion-skeleton-${i}`}
              className="h-24 w-full rounded-2xl bg-slate-200 border border-slate-200"
            ></div>
          ))}
        </div>

        {}
        <div className="space-y-6 xl:col-span-4">
          <QuickLinks links={skeletonLinks} />
          <CourseStatistics statistics={skeletonStatistics} />
          <HelpCard />
        </div>
      </section>
    </div>
  );
}

export default CoursesSkeleton;
