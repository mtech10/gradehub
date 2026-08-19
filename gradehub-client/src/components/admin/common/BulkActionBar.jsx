import Button from "../../ui/Button";
import { Download, Trash2, Ban, CheckCircle2 } from "lucide-react";

function BulkActionBar({
  count = 0,
  itemLabel = "items",
  onExport,
  onApprove,
  onSuspend,
  onDelete,
  onClearSelection,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
          ✓
        </div>

        <div>
          <p className="font-semibold text-slate-900">
            {count} {itemLabel} selected
          </p>

          <button
            onClick={onClearSelection}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear selection
          </button>
        </div>
      </div>

      {/* Responsive button group: wraps on tablets, stacks or stays inline depending on count */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {onExport && (
          <Button
            variant="secondary"
            onClick={onExport}
            size="sm"
            className="flex-1 sm:flex-none justify-center"
          >
            <Download size={16} className="mr-1.5" />
            Export
          </Button>
        )}

        {onApprove && (
          <Button
            variant="secondary"
            onClick={onApprove}
            size="sm"
            className="flex-1 sm:flex-none justify-center"
          >
            <CheckCircle2 size={16} className="mr-1.5 text-green-600" />
            Approve
          </Button>
        )}

        {onSuspend && (
          <Button
            variant="secondary"
            onClick={onSuspend}
            size="sm"
            className="flex-1 sm:flex-none justify-center"
          >
            <Ban size={16} className="mr-1.5 text-amber-600" />
            Suspend
          </Button>
        )}

        {onDelete && (
          <Button
            variant="danger"
            onClick={onDelete}
            size="sm"
            className="flex-1 sm:flex-none justify-center"
          >
            <Trash2 size={16} className="mr-1.5" />
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}

export default BulkActionBar;
