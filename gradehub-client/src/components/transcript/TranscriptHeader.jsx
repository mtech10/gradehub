import { Download, Printer } from "lucide-react";

import Button from "../ui/Button";
import { THEME } from "../../constants/theme";

function TranscriptHeader() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      {/* Left */}
      <div>
        <h1 className={THEME.typography.h2}>Academic Transcript</h1>

        <p className={`${THEME.typography.body} mt-2`}>
          Official academic record of all completed coursework and cumulative
          academic performance.
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline">
          <Download size={18} />
          Download PDF
        </Button>

        <Button variant="primary">
          <Printer size={18} />
          Print Transcript
        </Button>
      </div>
    </div>
  );
}

export default TranscriptHeader;
