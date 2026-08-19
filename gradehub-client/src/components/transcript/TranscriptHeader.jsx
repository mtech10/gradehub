import { Printer } from "lucide-react";

function TranscriptHeader() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Official Transcript
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Comprehensive chronological record of academic performance.
        </p>
      </div>

      <button
        onClick={handlePrint}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition w-full sm:w-auto"
      >
        <Printer size={18} />
        Print / Download Transcript
      </button>
    </div>
  );
}

export default TranscriptHeader;
