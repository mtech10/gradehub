import api from "./api";

export const courseRegistrationService = {
  getRegistrationData: async () => {
    const response = await api.get("/course-registrations/me");

    const payload = response.data ?? response;

    return payload.data ?? payload;
  },

  submitRegistration: async ({ selectedCodes = [], droppedCodes = [] }) => {
    const response = await api.post("/course-registrations/submit", {
      registerCourseCodes: selectedCodes,
      dropCourseCodes: droppedCodes,
    });

    const payload = response.data ?? response;

    return payload.data ?? payload;
  },
};

export default courseRegistrationService;
