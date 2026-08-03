import { useState } from "react";
import { X } from "lucide-react";

import Button from "./Button";

import {
  SEMESTERS,
  LEVELS,
  COURSE_TYPES,
  RESULT_STATUS,
} from "../../constants/resultFilters";

function FilterDrawer({ open, onClose, title = "Filter Results" }) {
  const [semester, setSemester] = useState("All");
  const [level, setLevel] = useState("400 Level");

  if (!open) return null;

  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
      />

      {/* Drawer */}

      <aside className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div className="flex-1 space-y-8 overflow-y-auto p-4">
          {/* Semester */}

          <div>
            <label className="mb-2 block font-medium">Semester</label>

            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            >
              {SEMESTERS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Level */}

          <div>
            <label className="mb-2 block font-medium">Level</label>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-3"
            >
              {LEVELS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Course Type */}

          <div>
            <h3 className="mb-3 font-medium">Course Type</h3>

            <div className="space-y-3">
              {COURSE_TYPES.map((type) => (
                <label key={type} className="flex items-center gap-3">
                  <input type="checkbox" />

                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Status */}

          <div>
            <h3 className="mb-3 font-medium">Result Status</h3>

            <div className="space-y-3">
              {RESULT_STATUS.map((status) => (
                <label key={status} className="flex items-center gap-3">
                  <input type="checkbox" />

                  {status}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="border-t border-slate-200 p-4">
          <div className="flex gap-3">
            <Button variant="outline" fullWidth>
              Reset
            </Button>

            <Button fullWidth>Apply Filters</Button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default FilterDrawer;
