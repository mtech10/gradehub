export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  
  const headers = Object.keys(data[0]);

  
  const csvRows = [
    headers.join(","), 
    ...data.map((row) =>
      headers
        .map((header) => {
          let value = row[header];

          
          if (value === null || value === undefined) {
            value = "";
          }
          
          else if (typeof value === "object") {
            value = value.name || value.code || JSON.stringify(value);
          }

          
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
