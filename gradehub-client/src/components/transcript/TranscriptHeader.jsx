import { Download, Printer } from "lucide-react";

import Button from "../ui/Button";
import PageHeader from "../ui/PageHeader";

function TranscriptHeader() {
  return (
    <PageHeader
      title="Academic Transcript"
      description="Official academic record of completed coursework and cumulative performance."
      actions={
        <>
          <Button variant="outline">
            <Download size={18} />
            Download PDF
          </Button>

          <Button>
            <Printer size={18} />
            Print Transcript
          </Button>
        </>
      }
    />
  );
}

export default TranscriptHeader;
