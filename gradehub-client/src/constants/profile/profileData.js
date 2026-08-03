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

// 1. The raw database-style object (Ready for API integration)
export const initialStudentData = {
  firstName: "Ademola",
  lastName: "Oyelusi",
  email: "adeyelusi20@stu.gradehub.edu.ng",
  phone: "+234 801 234 5678",
  avatar: "https://i.pravatar.cc/150?u=ade",
  dob: "12 January 2002",
  gender: "Male",
  maritalStatus: "Single",
  nationality: "Nigerian",
  homeAddress: "23, Ajayi Street, Bodija Estate, Ibadan, Oyo State.",
  permanentAddress: "23, Ajayi Street, Bodija Estate, Ibadan, Oyo State.",
  emergency: {
    name: "Mr. John Oyelusi (Father)",
    phone: "+234 803 456 7890",
    relationship: "Father",
    address: "23, Ajayi Street, Bodija Estate, Ibadan, Oyo State.",
  },
  academic: {
    matricNumber: "20/ENG/0400",
    department: "Agricultural Engineering",
    programme: "B.Eng (Agricultural Engineering)",
    faculty: "Technology",
    admissionYear: "2020/2021",
    currentLevel: "400 Level",
    status: "Active",
    unitsRegistered: "17",
    unitsEarned: "98",
    cgpa: "4.58 / 5.00",
    classOfDegree: "Second Class Upper",
  },
};

// 2. Mapper function that feeds your UI components dynamically
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

export const initialAdminData = {
  fullName: "Dr. John Adewale",
  role: "System Administrator",
  employeeId: "ADM001",
  department: "ICT Directorate",

  email: "john.adewale@gradehub.edu",
  phone: "+2348012345678",

  office: "Administrative Building",
  address: "University of Ibadan",

  avatar: "",
};

export function generateAdminProfile(admin) {
  return {
    personal: {
      avatar:
        admin.avatar ||
        "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(admin.fullName),

      name: admin.fullName,

      levelBadge: admin.role,

      contact: [
        {
          icon: Mail,
          value: admin.email,
        },
        {
          icon: Phone,
          value: admin.phone,
        },
      ],
    },

    details: [
      {
        icon: Hash,
        label: "Employee ID",
        value: admin.employeeId,
      },

      {
        icon: Briefcase,
        label: "Role",
        value: admin.role,
      },

      {
        icon: Building2,
        label: "Department",
        value: admin.department,
      },

      {
        icon: MapPin,
        label: "Office",
        value: admin.office,
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
        value: admin.fullName,
      },
      {
        label: "Email Address",
        value: admin.email,
      },
      {
        label: "Phone Number",
        value: admin.phone,
      },
      {
        label: "Address",
        value: admin.address,
      },
    ],

    employmentInfo: [
      {
        label: "Employee ID",
        value: admin.employeeId,
      },
      {
        label: "Role",
        value: admin.role,
      },
      {
        label: "Department",
        value: admin.department,
      },
      {
        label: "Office",
        value: admin.office,
      },
    ],

    accountInfo: [
      {
        label: "Account Status",
        value: "Active",
      },
      {
        label: "Permissions",
        value: "Administrator",
      },
      {
        label: "Last Login",
        value: "Today • 08:42 AM",
      },
    ],
  };
}
