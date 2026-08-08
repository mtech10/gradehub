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
    data: response.data,
    pagination: response.pagination,
  };
};

export const getSessionById = async (id) => {
  const response = await api.get(`/sessions/${id}`);
  return response.data;
};

const sessionService = {
  getSessions,
  getSessionById,
};

export default sessionService;
