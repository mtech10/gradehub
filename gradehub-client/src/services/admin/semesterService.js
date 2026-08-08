import api from "../api";

export const getSemesters = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const endpoint = query.toString()
    ? `/semesters?${query.toString()}`
    : "/semesters";

  const response = await api.get(endpoint);

  return {
    data: response.data,
    pagination: response.pagination,
  };
};

export const getSemesterById = async (id) => {
  const response = await api.get(`/semesters/${id}`);
  return response.data;
};

const semesterService = {
  getSemesters,
  getSemesterById,
};

export default semesterService;
