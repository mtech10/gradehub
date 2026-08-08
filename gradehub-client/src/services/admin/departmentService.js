import api from "../api";

export const getDepartments = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const endpoint = query.toString()
    ? `/departments?${query.toString()}`
    : "/departments";

  const response = await api.get(endpoint);

  return {
    data: response.data,
    pagination: response.pagination,
  };
};

export const getDepartmentById = async (id) => {
  const response = await api.get(`/departments/${id}`);
  return response.data;
};

const departmentService = {
  getDepartments,
  getDepartmentById,
};

export default departmentService;
