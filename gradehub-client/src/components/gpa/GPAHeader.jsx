import { RotateCcw, Calculator } from "lucide-react";
import clsx from "clsx";

import PageHeader from "../ui/PageHeader";
import Button from "../ui/Button";

const TABS = [
  { key: "semester", label: "Semester GPA" },
  { key: "cgpa", label: "CGPA Estimator" },
];

function GPAHeader({ activeTab, onTabChange, onClear, onCalculate }) {
  return (
    <div className="space-y-6">
      <PageHeader
        title="GPA Calculator"
        description="Calculate your GPA for a semester or estimate your CGPA based on your courses."
      />

      <div className="flex flex-col gap-4 border-b border-slate-200 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-8">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              className={clsx(
                "-mb-px border-b-2 pb-3 text-sm font-semibold transition-colors",
                activeTab === tab.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GPAHeader;
