import api from "../api";

export const profileService = {
  // Fetch the currently logged-in admin's profile
  getProfile: async () => {
    const response = await api.get("/admin/profile");
    return response.data || response;
  },

  // Update the admin's profile
  updateProfile: async (data) => {
    const response = await api.put("/admin/profile", data);
    return response.data || response;
  },
};
