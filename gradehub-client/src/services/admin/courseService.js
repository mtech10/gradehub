import api from "../api";

export const getCourses = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const endpoint = query.toString()
    ? `/courses?${query.toString()}`
    : "/courses";

  const response = await api.get(endpoint);

  return {
    courses: response.data ?? [],
    pagination: response.pagination ?? null,
  };
};

export const getCourseStatistics = async () => {
  const response = await api.get("/courses/statistics");

  return response.data;
};

export const getCourseById = async (id) => {
  const response = await api.get(`/courses/${id}`);

  return response.data;
};

export const createCourse = async (data) => {
  const response = await api.post("/courses", data);

  return response.data;
};

export const updateCourse = async (id, data) => {
  const response = await api.put(`/courses/${id}`, data);

  return response.data;
};

export const deactivateCourse = async (id) => {
  const response = await api.patch(`/courses/${id}/deactivate`);

  return response.data;
};

export const restoreCourse = async (id) => {
  const response = await api.patch(`/courses/${id}/restore`);

  return response.data;
};

const courseService = {
  getCourses,
  getCourseStatistics,
  getCourseById,
  createCourse,
  updateCourse,
  deactivateCourse,
  restoreCourse,
};

export default courseService;
