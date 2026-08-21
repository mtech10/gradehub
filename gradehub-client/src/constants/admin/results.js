import {
  FileSpreadsheet,
  CheckCircle,
  Clock3,
  AlertTriangle,
} from "lucide-react";

export const resultStatistics = [
  {
    title: "Total Results",
    value: 50,
    change: "+10",
    description: "Uploaded this session",
    icon: FileSpreadsheet,
    color: "blue",
  },
  {
    title: "Approved",
    value: 42,
    change: "+6",
    description: "Ready for students",
    icon: CheckCircle,
    color: "green",
  },
  {
    title: "Pending",
    value: 6,
    change: "+2",
    description: "Awaiting approval",
    icon: Clock3,
    color: "amber",
  },
  {
    title: "Missing",
    value: 2,
    change: "-1",
    description: "Outstanding uploads",
    icon: AlertTriangle,
    color: "red",
  },
];

export const resultFilters = {
  sessions: [
    { value: "", label: "All Sessions" },
    { value: "2024/2025", label: "2024/2025" },
  ],

  semesters: [
    { value: "", label: "All Semesters" },
    { value: "First", label: "First Semester" },
    { value: "Second", label: "Second Semester" },
  ],

  levels: [
    { value: "", label: "All Levels" },
    { value: "100", label: "100 Level" },
    { value: "200", label: "200 Level" },
    { value: "300", label: "300 Level" },
    { value: "400", label: "400 Level" },
    { value: "500", label: "500 Level" },
  ],
};
