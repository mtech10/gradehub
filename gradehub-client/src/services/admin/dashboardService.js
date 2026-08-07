import api from "../api";

export const dashboardService = {
  getAdminDashboard: async () => {
    const response = await api.get("/dashboard/admin");
    const payload = response.data || response;
    return payload.data || payload;
  },
};
