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

export const departments = [
  {
    id: 1,
    name: "Agricultural Engineering",
    code: "AGE",
    faculty: "Engineering",
    hod: "Prof. A. Adeyemi",
    students: 420,
    lecturers: 28,
    courses: 36,
    office: "Block A",
    email: "age@gradehub.edu.ng",
    phone: "+2348012345678",
    status: "Active",
  },

  {
    id: 2,
    name: "Civil Engineering",
    code: "CVE",
    faculty: "Engineering",
    hod: "Prof. J. Bello",
    students: 510,
    lecturers: 34,
    courses: 40,
    office: "Block B",
    email: "civil@gradehub.edu.ng",
    phone: "+2348011111111",
    status: "Active",
  },

  {
    id: 3,
    name: "Mechanical Engineering",
    code: "MEE",
    faculty: "Engineering",
    hod: "Prof. Musa Ibrahim",
    students: 480,
    lecturers: 31,
    courses: 38,
    office: "Block C",
    email: "mech@gradehub.edu.ng",
    phone: "+2348022222222",
    status: "Active",
  },

  {
    id: 4,
    name: "Electrical Engineering",
    code: "EEE",
    faculty: "Engineering",
    hod: "Prof. Okafor",
    students: 550,
    lecturers: 36,
    courses: 42,
    office: "Block D",
    email: "eee@gradehub.edu.ng",
    phone: "+2348033333333",
    status: "Active",
  },

  {
    id: 5,
    name: "Computer Engineering",
    code: "CPE",
    faculty: "Engineering",
    hod: "Prof. Olatunji",
    students: 520,
    lecturers: 30,
    courses: 39,
    office: "Block E",
    email: "cpe@gradehub.edu.ng",
    phone: "+2348044444444",
    status: "Active",
  },
];
