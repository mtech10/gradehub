import { Building2, CheckCircle, Users, BookOpen } from "lucide-react";

export const departmentStatistics = [
  {
    title: "Total Departments",
    value: 5,
    change: "+1",
    description: "Academic departments",
    icon: Building2,
    color: "blue",
  },
  {
    title: "Active Departments",
    value: 5,
    change: "0",
    description: "Currently running",
    icon: CheckCircle,
    color: "green",
  },
  {
    title: "Total Students",
    value: 2480,
    change: "+125",
    description: "Across all departments",
    icon: Users,
    color: "purple",
  },
  {
    title: "Total Courses",
    value: 156,
    change: "+8",
    description: "Available courses",
    icon: BookOpen,
    color: "amber",
  },
];

export const departmentFilters = {
  faculties: [
    {
      value: "",
      label: "All Faculties",
    },
    {
      value: "Engineering",
      label: "Engineering",
    },
    {
      value: "Science",
      label: "Science",
    },
    {
      value: "Agriculture",
      label: "Agriculture",
    },
  ],

  status: [
    {
      value: "",
      label: "All Status",
    },
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
  ],
};
