export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  // Extract headers from the first object's keys
  const headers = Object.keys(data[0]);

  // Map the data rows
  const csvRows = [
    headers.join(","), // Add the header row
    ...data.map((row) =>
      headers
        .map((header) => {
          let value = row[header];

          // Handle nulls and undefined
          if (value === null || value === undefined) {
            value = "";
          }
          // Handle nested objects (like row.department)
          else if (typeof value === "object") {
            value = value.name || value.code || JSON.stringify(value);
          }

          // Escape double quotes and wrap in quotes to handle commas within values safely
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(","),
    ),
  ];

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
