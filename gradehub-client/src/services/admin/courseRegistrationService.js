import api from "../api";

export const getCourseRegistrations = async (params = {}) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const endpoint = query.toString()
    ? `/course-registrations?${query.toString()}`
    : "/course-registrations";

  const response = await api.get(endpoint);

  return {
    data: response.data,
    pagination: response.pagination,
  };
};

export const getCourseRegistrationById = async (id) => {
  const response = await api.get(`/course-registrations/${id}`);
  return response.data;
};

const courseRegistrationService = {
  getCourseRegistrations,
  getCourseRegistrationById,
};

export default courseRegistrationService;
