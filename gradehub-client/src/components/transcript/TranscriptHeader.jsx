// import { Download, Printer } from "lucide-react";

// import Button from "../ui/Button";
// import PageHeader from "../ui/PageHeader";

// function TranscriptHeader() {
//   return (
//     <PageHeader
//       title="Academic Transcript"
//       description="Official academic record of completed coursework and cumulative performance."
//       actions={
//         <>
//           <Button variant="outline">
//             <Download size={18} />
//             Download PDF
//           </Button>

//           <Button>
//             <Printer size={18} />
//             Print Transcript
//           </Button>
//         </>
//       }
//     />
//   );
// }

// export default TranscriptHeader;

import Button from "../ui/Button"; // Or your standard button path
import { Printer } from "lucide-react";

function TranscriptHeader() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center print:hidden">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Official Transcript
        </h1>
        <p className="text-slate-500">
          Comprehensive chronological record of academic performance.
        </p>
      </div>

      <button
        onClick={handlePrint}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
      >
        <Printer size={18} />
        Print / Download Transcript
      </button>
    </div>
  );
}

export default TranscriptHeader;
