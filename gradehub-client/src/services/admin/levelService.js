import api from "../api";

export const getLevels = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const endpoint = query.toString() ? `/levels?${query.toString()}` : "/levels";

  const response = await api.get(endpoint);

  return {
    data: response.data,
    pagination: response.pagination,
  };
};

export const getLevelById = async (id) => {
  const response = await api.get(`/levels/${id}`);
  return response.data;
};

const levelService = {
  getLevels,
  getLevelById,
};

export default levelService;
