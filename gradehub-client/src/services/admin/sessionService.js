import api from "../api";

export const getSessions = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const endpoint = query.toString()
    ? `/sessions?${query.toString()}`
    : "/sessions";

  const response = await api.get(endpoint);

  return {
    data: response.data || response.sessions, // Fallback to match mapping
    pagination: response.pagination,
  };
};

export const getSessionById = async (id) => {
  const response = await api.get(`/sessions/${id}`);
  return response.data;
};

export const createSession = async (data) => {
  const response = await api.post("/sessions", data);
  return response.data;
};

export const makeSessionCurrent = async (id) => {
  const response = await api.patch(`/sessions/${id}/current`);
  return response.data;
};

// --- New Edit & Delete Methods ---
export const updateSession = async (id, data) => {
  const response = await api.put(`/sessions/${id}`, data);
  return response.data;
};

export const deleteSession = async (id) => {
  const response = await api.patch(`/sessions/${id}/deactivate`);
  return response.data;
};

const sessionService = {
  getSessions,
  getSessionById,
  createSession,
  makeSessionCurrent,
  updateSession,
  deleteSession,
};

export default sessionService;
