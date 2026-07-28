function DataTable({
  columns,
  data,
  renderCell,
  emptyMessage = "No data available.",
  className = "",
  rowClassName = "",
  onRowClick,
}) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        {/* Header */}
        <thead className="sticky top-0 z-10 border-b border-slate-200 bg-white">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  width: column.width,
                  minWidth: column.minWidth,
                }}
                className={`
                  px-6 py-4
                  text-sm
                  font-semibold
                  text-slate-600
                  whitespace-nowrap
                  ${column.align === "center" ? "text-center" : ""}
                  ${column.align === "right" ? "text-right" : "text-left"}
                  ${column.className ?? ""}
                `}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-16 text-center text-slate-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row.id ?? row.code ?? rowIndex}
                onClick={() => onRowClick?.(row)}
                className={`
                  border-b
                  border-slate-100
                  transition-colors
                  hover:bg-slate-50
                  ${onRowClick ? "cursor-pointer" : ""}
                  ${rowClassName}
                `}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    style={{
                      width: column.width,
                      minWidth: column.minWidth,
                    }}
                    className={`
                      px-6 py-5
                      whitespace-nowrap
                      ${column.align === "center" ? "text-center" : ""}
                      ${column.align === "right" ? "text-right" : ""}
                      ${column.cellClassName ?? ""}
                    `}
                  >
                    {renderCell ? renderCell(row, column) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
