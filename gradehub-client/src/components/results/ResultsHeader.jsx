import { useState } from "react";
import { Filter } from "lucide-react";

import Button from "../ui/Button";
import FilterDrawer from "../ui/FilterDrawer";
import AcademicSessionSelect from "./AcademicSessionSelect";
import { THEME } from "../../constants/theme";

function ResultsHeader() {
  const [session, setSession] = useState("2023/2024");
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className={THEME.typography.h2}>My Results</h1>

        <p className={`${THEME.typography.body} mt-2`}>
          View your semester results and academic performance.
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

export default ResultsHeader;
