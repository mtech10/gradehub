import {
  User,
  IdCard,
  GraduationCap,
  BookOpen,
  CalendarDays,
  School,
  FileText,
  Building2,
} from "lucide-react";

export const student = {
  fullName: "Ademola Oyelusi",
  matricNumber: "20/ENG/0400",
  department: "Agricultural Engineering",
  programme: "B.Eng Agricultural Engineering",
  admissionYear: "2020/2021",
  level: "400 Level",
  session: "2023/2024",
  transcriptDate: "15 May 2024",
};

export const studentInformation = [
  {
    key: "fullName",
    label: "Student Name",
    icon: User,
  },
  {
    key: "matricNumber",
    label: "Matric Number",
    icon: IdCard,
  },
  {
    key: "department",
    label: "Department",
    icon: Building2,
  },
  {
    key: "programme",
    label: "Programme",
    icon: GraduationCap,
  },
  {
    key: "admissionYear",
    label: "Admission Year",
    icon: CalendarDays,
  },
  {
    key: "level",
    label: "Current Level",
    icon: School,
  },
  {
    key: "session",
    label: "Academic Session",
    icon: BookOpen,
  },
  {
    key: "transcriptDate",
    label: "Transcript Generated",
    icon: FileText,
  },
];
