import { useState } from "react";
import { Filter } from "lucide-react";

import AcademicSessionSelect from "../results/AcademicSessionSelect";
import FilterDrawer from "../ui/FilterDrawer";
import Button from "../ui/Button";

function TranscriptFilterBar() {
  const [session, setSession] = useState("2023/2024");
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Transcript Record
        </h2>

        <p className="mt-1 text-slate-500">
          View your academic history by session or semester.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <AcademicSessionSelect value={session} onChange={setSession} />

        <Button variant="outline" onClick={() => setOpenFilter(true)}>
          <Filter size={18} />
          Filter
        </Button>

        <FilterDrawer open={openFilter} onClose={() => setOpenFilter(false)} />
      </div>
    </div>
  );
}

export default TranscriptFilterBar;
