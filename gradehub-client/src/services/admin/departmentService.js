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

// New integration methods
export const createDepartment = async (data) => {
  const response = await api.post("/departments", data);
  return response.data;
};

export const updateDepartment = async (id, data) => {
  const response = await api.put(`/departments/${id}`, data);
  return response.data;
};

export const deactivateDepartment = async (id) => {
  const response = await api.patch(`/departments/${id}/deactivate`);
  return response.data;
};

export const restoreDepartment = async (id) => {
  const response = await api.patch(`/departments/${id}/restore`);
  return response.data;
};

export const getDepartmentStats = async () => {
  const response = await api.get("/departments/stats");
  return response.data;
};

const departmentService = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deactivateDepartment,
  restoreDepartment,
  getDepartmentStats,
};

export default departmentService;
