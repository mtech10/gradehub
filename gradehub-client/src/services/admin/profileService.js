import api from "../api";

export const profileService = {
  // Fetch the currently logged-in admin's profile
  getProfile: async () => {
    // Change from "/profile" to "/profile/admin"
    const response = await api.get("/profile/admin");
    return response.data || response;
  },

  // Update the admin's profile
  updateProfile: async (data) => {
    // Change from "/profile" to "/profile/admin"
    const response = await api.put("/profile/admin", data);
    return response.data || response;
  },
};
