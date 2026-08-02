import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import TableSkeleton from "./TableSkeleton";
import { ArrowUpDown, ArrowUp, ArrowDown, Check } from "lucide-react";
import Checkbox from "./Checkbox";

function DataTable({
  columns = [],
  data = [],
  renderCell,
  emptyMessage = "No data available.",
  className = "",
  rowClassName = "",
  getRowClassName,
  onRowClick,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,

  onPageChange,
  pagination = true,
  itemLabel = "items",
  loading = false,
  sortKey,
  sortDirection,
  onSort,
  selectable = false,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
}) {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = pagination ? data.slice(startIndex, endIndex) : data;

  const currentPageIds = paginatedData.map((row) => row.id);

  const allCurrentPageSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedRows.includes(id));

  const someCurrentPageSelected =
    currentPageIds.some((id) => selectedRows.includes(id)) &&
    !allCurrentPageSelected;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10 border-b border-slate-200 bg-white">
            <tr>
              {selectable && (
                <th className="w-14 px-4 py-4 text-center">
                  <Checkbox
                    checked={allCurrentPageSelected}
                    indeterminate={someCurrentPageSelected}
                    onChange={() => onSelectAll(currentPageIds)}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{
                    width: column.width,
                    minWidth: column.minWidth,
                  }}
                  className={` px-6 py-4  text-sm font-semibold text-slate-600 whitespace-nowrap ${column.align === "center" ? "text-center" : ""} ${column.align === "right" ? "text-right" : "text-left"} ${column.className ?? ""}`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      column.sortable ? "cursor-pointer select-none" : ""
                    }`}
                    onClick={() => column.sortable && onSort?.(column.key)}
                  >
                    <span>{column.title}</span>

                    {column.sortable &&
                      (sortKey !== column.key ? (
                        <ArrowUpDown size={16} className="text-slate-400" />
                      ) : sortDirection === "asc" ? (
                        <ArrowUp size={16} className="text-blue-600" />
                      ) : (
                        <ArrowDown size={16} className="text-blue-600" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {loading ? (
            <TableSkeleton rows={pageSize} columns={columns.length} />
          ) : (
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <EmptyState
                      title={emptyMessage}
                      description="Try adjusting your search or filters."
                    />
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <tr
                    key={row.id ?? row.code ?? rowIndex}
                    onClick={(e) => {
                      if (e.target.closest("button") || e.target.closest("a")) {
                        return;
                      }

                      onRowClick?.(row);
                    }}
                    className={`border-bborder-slate-100 transition-all duration-200 ${selectable && selectedRows.includes(row.id) ? "bg-blue-50" : "hover:bg-slate-50"}
                    ${onRowClick ? "cursor-pointer" : ""}
                    ${typeof rowClassName === "function" ? rowClassName(row) : rowClassName}`}
                  >
                    {selectable && (
                      <td className="px-4 text-center">
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onChange={() => onRowSelect?.(row.id)}
                          className="mx-auto"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        style={{
                          width: column.width,
                          minWidth: column.minWidth,
                        }}
                        className={`px-6 py-5 whitespace-nowrap
                          ${column.align === "center" ? "text-center" : ""}
                          ${column.align === "right" ? "text-right" : ""}
                          ${column.cellClassName ?? ""}`}
                      >
                        {renderCell ? renderCell(row, column) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          )}
        </table>
      </div>
      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          itemLabel={itemLabel}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}

export default DataTable;
