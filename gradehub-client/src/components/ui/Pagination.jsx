import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  itemLabel = "items",
  onPageChange,
}) {
  
  const safePage = Math.min(Math.max(currentPage, 1), totalPages || 1);

  
  const firstItem = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;

  const lastItem = Math.min(safePage * pageSize, totalItems);

  const canGoPrevious = safePage > 1;
  const canGoNext = safePage < totalPages;

  
  const pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    const start = Math.max(2, safePage - 1);
    const end = Math.min(totalPages - 1, safePage + 1);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 bg-white px-6 py-4 md:flex-row md:items-center md:justify-between">
      {}
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-900">{firstItem}</span> to{" "}
        <span className="font-semibold text-slate-900">{lastItem}</span> of{" "}
        <span className="font-semibold text-slate-900">{totalItems}</span>{" "}
        {itemLabel}
      </p>

      {}
      <div className="flex items-center gap-2">
        {}
        <button
          onClick={() => onPageChange?.(1)}
          disabled={!canGoPrevious}
          className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronsLeft size={18} />
        </button>

        {}
        <button
          onClick={() => onPageChange?.(safePage - 1)}
          disabled={!canGoPrevious}
          className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        {}
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-slate-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange?.(page)}
              className={`h-10 w-10 rounded-lg font-medium transition ${
                safePage === page
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ),
        )}

        {}
        <button
          onClick={() => onPageChange?.(safePage + 1)}
          disabled={!canGoNext}
          className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>

        {}
        <button
          onClick={() => onPageChange?.(totalPages)}
          disabled={!canGoNext}
          className="rounded-lg border border-slate-200 p-2 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
