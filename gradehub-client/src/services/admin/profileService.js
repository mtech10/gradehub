import api from "../api";

export const profileService = {
  
  getProfile: async () => {
    
    const response = await api.get("/profile/admin");
    return response.data || response;
  },

  
  updateProfile: async (data) => {
    
    const response = await api.put("/profile/admin", data);
    return response.data || response;
  },
};
