export const courseColumns = [
  {
    key: "code",
    title: "Course Code",
    sortable: true,
  },
  {
    key: "title",
    title: "Course Title",
    sortable: true,
  },
  {
    // Note: Ensure this key matches your mapper.
    // Your mapper outputs 'creditUnit', so if Units are ever blank, change key to "creditUnit"
    key: "unit",
    title: "Units",
    align: "center",
    sortable: true,
    render: (row) => row.creditUnit || row.unit || "-",
  },
  {
    key: "level",
    title: "Level",
    align: "center",
    sortable: true,
    render: (row) => row.level?.name || "-",
  },
  {
    key: "semester",
    title: "Semester",
    sortable: true,
    // Add this render function to explicitly display the text
    render: (row) => (row.semester ? `${row.semester} Semester` : "-"),
  },
  {
    key: "status",
    title: "Status",
    align: "center",
    sortable: true,
    render: (row) => {
      const isActive = row.isActive;
      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            isActive
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  },
  {
    key: "actions",
    title: "",
    align: "center",
  },
];
