import Button from "../../ui/Button";
import { Download, Trash2, Ban } from "lucide-react";

function BulkActionBar({
  count = 0,
  itemLabel = "items",
  onExport,
  onSuspend,
  onDelete,
  onClearSelection,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
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

      <div className="flex items-center gap-3">
        <Button variant="secondary" onClick={onExport}>
          <Download size={18} />
          Export
        </Button>

        <Button variant="secondary" onClick={onSuspend}>
          <Ban size={18} />
          Suspend
        </Button>

        <Button variant="danger" onClick={onDelete}>
          <Trash2 size={18} />
          Delete
        </Button>
      </div>
    </div>
  );
}

export default BulkActionBar;
