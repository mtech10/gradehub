import { CalendarDays, Filter, ChevronDown } from "lucide-react";

import Button from "../ui/Button";
import PageHeader from "../ui/PageHeader";

function ResultsHeader() {
  return (
    <PageHeader
      title="My Results"
      description="View your semester results and academic performance."
      actions={
        <>
          <Button variant="outline">
            <CalendarDays size={18} />
            2023/2024 Academic Session
            <ChevronDown size={18} />
          </Button>

          <Button variant="outline">
            <Filter size={18} />
            Filter
          </Button>
        </>
      }
    />
  );
}

export default ResultsHeader;
