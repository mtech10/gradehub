import {
  Mail,
  Phone,
  MapPin,
  IdCard,
  Building2,
  Briefcase,
  GraduationCap,
  CalendarDays,
  BarChart,
  Cake,
  User,
  Hash,
  Heart,
  Flag,
  ShieldCheck,
  Users,
  Globe,
  Clock3,
} from "lucide-react";

export const generateProfileUI = (data) => ({
  personal: {
    name: `${data.firstName} ${data.lastName}`,
    avatar: data.avatar,
    levelBadge: `${data.academic.currentLevel} Student`,
    contact: [
      { icon: Mail, value: data.email },
      { icon: Phone, value: data.phone },
      { icon: MapPin, value: data.homeAddress.substring(0, 30) + "..." },
    ],
  },
  details: [
    { label: "Matric Number", value: data.academic.matricNumber, icon: IdCard },
    { label: "Date of Birth", value: data.dob, icon: Cake },
    { label: "Department", value: data.academic.department, icon: Building2 },
    { label: "Gender", value: data.gender, icon: User },
    { label: "Programme", value: data.academic.programme, icon: GraduationCap },
    { label: "Marital Status", value: data.maritalStatus, icon: Heart },
    {
      label: "Admission Year",
      value: data.academic.admissionYear,
      icon: CalendarDays,
    },
    { label: "Nationality", value: data.nationality, icon: Flag },
    {
      label: "Current Level",
      value: data.academic.currentLevel,
      icon: BarChart,
    },
    {
      label: "Student Status",
      value: data.academic.status,
      icon: ShieldCheck,
      isBadge: true,
    },
  ],
  contactInfo: [
    { label: "Email Address", value: data.email, icon: Mail },
    { label: "Phone Number", value: data.phone, icon: Phone },
    { label: "Home Address", value: data.homeAddress, icon: MapPin },
    { label: "Permanent Address", value: data.permanentAddress, icon: Globe },
  ],
  emergencyContact: [
    { label: "Contact Name", value: data.emergency.name, icon: User },
    { label: "Phone Number", value: data.emergency.phone, icon: Phone },
    { label: "Relationship", value: data.emergency.relationship, icon: Users },
    { label: "Address", value: data.emergency.address, icon: MapPin },
  ],
  academicInfo: [
    { label: "Faculty", value: data.academic.faculty },
    { label: "Department", value: data.academic.department },
    { label: "Programme", value: data.academic.programme },
    { label: "Current Level", value: data.academic.currentLevel },
    { label: "Total Units Registered", value: data.academic.unitsRegistered },
    { label: "Total Units Earned", value: data.academic.unitsEarned },
    { label: "CGPA", value: data.academic.cgpa, highlight: true },
    { label: "Class of Degree", value: data.academic.classOfDegree },
  ],
});

export function generateAdminProfile(admin) {
  const fullName =
    admin.fullName ||
    `${admin.firstName || admin.firstname || ""} ${
      admin.lastName || admin.lastname || ""
    }`.trim() ||
    "Unknown Admin";

  const role = admin.role || "System Administrator";
  const employeeId = admin.employeeId || admin.employeeid || "N/A";
  const department = admin.department || "ICT Directorate";
  const office = admin.office || "N/A";
  const address = admin.address || "N/A";

  return {
    personal: {
      avatar:
        admin.avatar ||
        "https://ui-avatars.com/api/?name=" + encodeURIComponent(fullName),

      name: fullName,
      levelBadge: role,

      contact: [
        {
          icon: Mail,
          value: admin.email || "No email provided",
        },
        {
          icon: Phone,
          value: admin.phone || "No phone provided",
        },
      ],
    },

    details: [
      {
        icon: Hash,
        label: "Employee ID",
        value: employeeId,
      },
      {
        icon: Briefcase,
        label: "Role",
        value: role,
      },
      {
        icon: Building2,
        label: "Department",
        value: department,
      },
      {
        icon: MapPin,
        label: "Office",
        value: office,
      },
      {
        icon: ShieldCheck,
        label: "Account Status",
        value: "Active",
        isBadge: true,
      },
      {
        icon: Clock3,
        label: "Last Login",
        value: "Today • 08:42 AM",
      },
    ],

    personalInfo: [
      {
        label: "Full Name",
        value: fullName,
      },
      {
        label: "Email Address",
        value: admin.email || "N/A",
      },
      {
        label: "Phone Number",
        value: admin.phone || "N/A",
      },
      {
        label: "Address",
        value: address,
      },
    ],

    employmentInfo: [
      {
        label: "Employee ID",
        value: employeeId,
      },
      {
        label: "Role",
        value: role,
      },
      {
        label: "Department",
        value: department,
      },
      {
        label: "Office",
        value: office,
      },
    ],

    accountInfo: [
      {
        label: "Account Status",
        value: "Active",
      },
      {
        label: "Permissions",
        value: role,
      },
      {
        label: "Last Login",
        value: "Today • 08:42 AM",
      },
    ],
  };
}
