import api from "./api";

export const mapStudentProfile = (data) => ({
  id: data.id,
  matricNumber: data.matricNumber,
  firstName: data.firstName,
  middleName: data.middleName,
  lastName: data.lastName,
  fullName: data.fullName,
  gender: data.gender,
  email: data.email,
  phone: data.phone,
  photo: data.photo,
  admissionYear: data.admissionYear,
  // Added optional chaining (?) to prevent crashes if relational data isn't joined properly yet
  department: data.department?.name || data.department,
  faculty: data.faculty?.name || data.faculty,
  level: data.level?.name || data.level,
  session: data.session?.name || data.session,
});

export const mapStudentProfileForUI = (student) => ({
  firstName: student.firstName,
  middleName: student.middleName,
  lastName: student.lastName,
  email: student.email,
  phone: student.phone,
  avatar: student.photo,
  gender: student.gender,
  dob: "", // To be wired
  maritalStatus: "",
  nationality: "Nigerian",
  homeAddress: "",
  permanentAddress: "",
  emergency: {
    name: "",
    phone: "",
    relationship: "",
    address: "",
  },
  academic: {
    matricNumber: student.matricNumber,
    department: student.department,
    programme: "",
    faculty: student.faculty,
    admissionYear: student.admissionYear,
    currentLevel: student.level,
    status: "Active",
    unitsRegistered: "",
    unitsEarned: "",
    cgpa: "",
    classOfDegree: "",
  },
});

const profileService = {
  getStudentProfile: async () => {
    const response = await api.get("/profile/student");

    const payload = response.data || response;
    const profileData = payload.data || payload;

    if (!profileData) {
      throw new Error("Profile not found in the database.");
    }

    const profile = mapStudentProfile(profileData);
    return mapStudentProfileForUI(profile);
  },

  updateStudentProfile: async (updatedFields) => {
    const response = await api.put("/profile/student", updatedFields);

    const payload = response.data || response;
    const profileData = payload.data || payload;

    if (!profileData) {
      throw new Error("Failed to return updated profile data.");
    }

    const profile = mapStudentProfile(profileData);
    return mapStudentProfileForUI(profile);
  },
};

export default profileService;
