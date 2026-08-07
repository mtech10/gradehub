import api from "./api";

export const courseRegistrationService = {
  // Fetch registration data (available courses, already registered ones, and rules)
  getRegistrationData: async () => {
    const response = await api.get("/course-registrations/current");
    const payload = response.data || response;
    return payload.data || payload;
  },

  // Submit selected courses or drops
  submitRegistration: async ({ selectedCodes, droppedCodes }) => {
    const response = await api.post("/course-registrations/submit", {
      registerCourseCodes: selectedCodes,
      dropCourseCodes: droppedCodes,
    });
    return response.data || response;
  },
};
