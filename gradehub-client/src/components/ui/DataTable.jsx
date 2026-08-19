import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import TableSkeleton from "./TableSkeleton";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
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
  totalItems,
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

  serverPagination = false,
}) {
  const resolvedTotalItems =
    totalItems !== undefined ? totalItems : data.length;

  const resolvedTotalPages =
    totalPages !== undefined && totalPages > 0
      ? totalPages
      : Math.max(1, Math.ceil(resolvedTotalItems / pageSize));

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = serverPagination
    ? data
    : pagination
      ? data.slice(startIndex, endIndex)
      : data;
  const currentPageIds = paginatedData.map((row) => row.id);

  const allCurrentPageSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedRows.includes(id));

  const someCurrentPageSelected =
    currentPageIds.some((id) => selectedRows.includes(id)) &&
    !allCurrentPageSelected;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10 border-b border-slate-200 bg-white">
            <tr>
              {selectable && (
                <th
                  key="select-all-header"
                  className="w-10 sm:w-14 px-3 py-3 sm:px-4 sm:py-4 text-center"
                >
                  <Checkbox
                    checked={allCurrentPageSelected}
                    indeterminate={someCurrentPageSelected}
                    onChange={() => onSelectAll(currentPageIds)}
                  />
                </th>
              )}
              {columns.map((column, colIdx) => {
                const colKey =
                  column.key || column.accessor || column.header || colIdx;

                return (
                  <th
                    key={`th-${colIdx}-${colKey}`}
                    style={{
                      width: column.width,
                      minWidth: column.minWidth,
                    }}
                    className={`px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm font-semibold text-slate-600 whitespace-nowrap ${
                      column.align === "center" ? "text-center" : ""
                    } ${column.align === "right" ? "text-right" : "text-left"} ${
                      column.className ?? ""
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 ${
                        column.sortable ? "cursor-pointer select-none" : ""
                      }`}
                      onClick={() =>
                        column.sortable &&
                        onSort?.(column.accessor || column.key)
                      }
                    >
                      <span>{column.title || column.header}</span>

                      {column.sortable &&
                        (sortKey !== column.key &&
                        sortKey !== column.accessor ? (
                          <ArrowUpDown
                            size={14}
                            className="text-slate-400 sm:w-4 sm:h-4"
                          />
                        ) : sortDirection === "asc" ? (
                          <ArrowUp
                            size={14}
                            className="text-blue-600 sm:w-4 sm:h-4"
                          />
                        ) : (
                          <ArrowDown
                            size={14}
                            className="text-blue-600 sm:w-4 sm:h-4"
                          />
                        ))}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {loading ? (
            <TableSkeleton
              rows={pageSize}
              columns={columns.length + (selectable ? 1 : 0)}
            />
          ) : (
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0)}>
                    <EmptyState
                      title={emptyMessage}
                      description="Try adjusting your search or filters."
                    />
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => (
                  <tr
                    key={row.id ?? row.matricNumber ?? row.code ?? rowIndex}
                    onClick={(e) => {
                      if (e.target.closest("button") || e.target.closest("a")) {
                        return;
                      }
                      onRowClick?.(row);
                    }}
                    className={`border-b border-slate-100 transition-all duration-200 ${
                      selectable && selectedRows.includes(row.id)
                        ? "bg-blue-50"
                        : "hover:bg-slate-50"
                    }
                    ${onRowClick ? "cursor-pointer" : ""}
                    ${
                      typeof rowClassName === "function"
                        ? rowClassName(row)
                        : rowClassName
                    }`}
                  >
                    {selectable && (
                      <td
                        key={`select-${row.id || rowIndex}`}
                        className="px-3 sm:px-4 text-center"
                      >
                        <Checkbox
                          checked={selectedRows.includes(row.id)}
                          onChange={() => onRowSelect?.(row.id)}
                          className="mx-auto"
                        />
                      </td>
                    )}
                    {columns.map((column, colIdx) => {
                      const colKey =
                        column.key ||
                        column.accessor ||
                        column.header ||
                        colIdx;
                      const cellValue = column.accessor
                        ? row[column.accessor]
                        : row[column.key];

                      return (
                        <td
                          key={`${row.id || rowIndex}-${colKey}`}
                          style={{
                            width: column.width,
                            minWidth: column.minWidth,
                          }}
                          className={`px-4 py-4 sm:px-6 sm:py-5 text-sm whitespace-nowrap ${
                            column.align === "center" ? "text-center" : ""
                          } ${column.align === "right" ? "text-right" : ""} ${
                            column.cellClassName ?? ""
                          }`}
                        >
                          {column.render
                            ? column.render(row)
                            : renderCell
                              ? renderCell(row, column)
                              : cellValue}
                        </td>
                      );
                    })}
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
          totalPages={resolvedTotalPages}
          totalItems={resolvedTotalItems}
          pageSize={pageSize}
          itemLabel={itemLabel}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}

export default DataTable;
